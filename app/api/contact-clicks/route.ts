import { neon } from "@neondatabase/serverless";

type ClickPayload = {
  channel?: string;
  path?: string;
  href?: string;
  label?: string;
};

async function runtimeEnv() {
  try {
    return ((await import("cloudflare:workers")) as { env?: Record<string, string> }).env ?? {};
  } catch {
    return {};
  }
}

async function databaseUrl() {
  const cfEnv = await runtimeEnv();
  return process.env.DATABASE_URL || cfEnv.DATABASE_URL || "";
}

async function adminToken() {
  const cfEnv = await runtimeEnv();
  return process.env.ADMIN_TOKEN || cfEnv.ADMIN_TOKEN || "";
}

async function ensureTable(sql: ReturnType<typeof neon>) {
  await sql`
    create table if not exists contact_clicks (
      id bigserial primary key,
      channel text not null check (channel in ('whatsapp', 'telegram')),
      path text,
      href text,
      label text,
      created_at timestamptz not null default now()
    )
  `;
  await sql`create index if not exists contact_clicks_created_at_idx on contact_clicks (created_at desc)`;
  await sql`create index if not exists contact_clicks_channel_idx on contact_clicks (channel)`;
}

function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function clean(value: unknown, max = 240) {
  return String(value ?? "").trim().slice(0, max);
}

function cleanChannel(value: unknown) {
  const channel = clean(value, 20).toLowerCase();
  return channel === "whatsapp" || channel === "telegram" ? channel : "";
}

function isIgnoredPath(path: string) {
  return /^\/(?:admin|codex-healthcheck)(?:\/|$)/.test(path);
}

export async function GET(request: Request) {
  const token = await adminToken();
  const url = new URL(request.url);
  if (token && url.searchParams.get("token") !== token) {
    return errorResponse("Unauthorized", 401);
  }

  const urlValue = await databaseUrl();
  if (!urlValue) return errorResponse("DATABASE_URL is not configured.", 503);

  const sql = neon(urlValue);
  await ensureTable(sql);
  const summary = await sql`
    select
      channel,
      count(*)::int as total,
      count(*) filter (where created_at >= date_trunc('day', now()))::int as today,
      count(*) filter (where created_at >= now() - interval '7 days')::int as last_7_days
    from contact_clicks
    group by channel
    order by channel
  `;
  const recent = await sql`
    select channel, path, label, created_at
    from contact_clicks
    order by created_at desc
    limit 20
  `;

  return Response.json({ summary, recent });
}

export async function POST(request: Request) {
  const urlValue = await databaseUrl();
  if (!urlValue) return errorResponse("DATABASE_URL is not configured.", 503);

  let payload: ClickPayload;
  try {
    payload = (await request.json()) as ClickPayload;
  } catch {
    return errorResponse("Invalid JSON body.");
  }

  const channel = cleanChannel(payload.channel);
  if (!channel) return errorResponse("Invalid contact channel.");
  const path = clean(payload.path, 180);
  if (isIgnoredPath(path)) return Response.json({ ok: true, ignored: true }, { status: 202 });

  const sql = neon(urlValue);
  await ensureTable(sql);
  await sql`
    insert into contact_clicks (channel, path, href, label)
    values (${channel}, ${path || null}, ${clean(payload.href, 300) || null}, ${clean(payload.label, 120) || null})
  `;

  return Response.json({ ok: true }, { status: 201 });
}
