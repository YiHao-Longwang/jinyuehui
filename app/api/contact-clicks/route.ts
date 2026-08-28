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

function channelFilter(value: unknown) {
  return cleanChannel(value) || "all";
}

function intParam(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value || "", 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function isIgnoredPath(path: string) {
  return /^\/(?:admin|codex-healthcheck)(?:\/|$)/.test(path);
}

const MALAYSIA_OFFSET_MS = 8 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function localTodayStartMs() {
  const klNow = new Date(Date.now() + MALAYSIA_OFFSET_MS);
  klNow.setUTCHours(0, 0, 0, 0);
  return klNow.getTime();
}

function localMonthStartMs() {
  const klNow = new Date(Date.now() + MALAYSIA_OFFSET_MS);
  return Date.UTC(klNow.getUTCFullYear(), klNow.getUTCMonth(), 1);
}

function localPeriodWindow(periodValue: unknown, dayValue?: string | null) {
  const period = clean(periodValue, 20).toLowerCase();
  const todayMs = localTodayStartMs();
  const day = new Date(todayMs).getUTCDay();
  const daysSinceMonday = (day + 6) % 7;

  if (period === "day") {
    return {
      period: "day",
      days: 1,
      startIso: new Date(todayMs - MALAYSIA_OFFSET_MS).toISOString(),
    };
  }

  if (period === "week") {
    const startLocalMs = todayMs - daysSinceMonday * DAY_MS;
    return {
      period: "week",
      days: daysSinceMonday + 1,
      startIso: new Date(startLocalMs - MALAYSIA_OFFSET_MS).toISOString(),
    };
  }

  if (period === "month") {
    const startLocalMs = localMonthStartMs();
    return {
      period: "month",
      days: Math.floor((todayMs - startLocalMs) / DAY_MS) + 1,
      startIso: new Date(startLocalMs - MALAYSIA_OFFSET_MS).toISOString(),
    };
  }

  const days = intParam(dayValue ?? null, 30, 7, 90);
  return {
    period: "days",
    days,
    startIso: new Date(todayMs - MALAYSIA_OFFSET_MS - (days - 1) * DAY_MS).toISOString(),
  };
}

function localDayKey(startIso: string, offsetDays: number) {
  const utcMs = new Date(startIso).getTime() + offsetDays * DAY_MS;
  return new Date(utcMs + MALAYSIA_OFFSET_MS).toISOString().slice(0, 10);
}

async function clickHistory(sql: ReturnType<typeof neon>, url: URL) {
  const channel = channelFilter(url.searchParams.get("channel"));
  const limit = intParam(url.searchParams.get("limit"), 25, 10, 100);
  const offset = intParam(url.searchParams.get("offset"), 0, 0, 100000);

  if (channel === "all") {
    const [count] = await sql`select count(*)::int as total from contact_clicks`;
    const clicks = await sql`
      select id, channel, path, href, label, created_at
      from contact_clicks
      order by created_at desc
      limit ${limit}
      offset ${offset}
    `;
    return { clicks, total: count?.total ?? 0, limit, offset };
  }

  const [count] = await sql`select count(*)::int as total from contact_clicks where channel = ${channel}`;
  const clicks = await sql`
    select id, channel, path, href, label, created_at
    from contact_clicks
    where channel = ${channel}
    order by created_at desc
    limit ${limit}
    offset ${offset}
  `;
  return { clicks, total: count?.total ?? 0, limit, offset };
}

async function clickSeries(sql: ReturnType<typeof neon>, url: URL) {
  const channel = channelFilter(url.searchParams.get("channel"));
  const { period, days, startIso } = localPeriodWindow(url.searchParams.get("period"), url.searchParams.get("days"));
  const rows =
    channel === "all"
      ? await sql`
          select
            to_char(created_at at time zone 'Asia/Kuala_Lumpur', 'YYYY-MM-DD') as day,
            channel,
            count(*)::int as count
          from contact_clicks
          where created_at >= ${startIso}
          group by day, channel
          order by day asc
        `
      : await sql`
          select
            to_char(created_at at time zone 'Asia/Kuala_Lumpur', 'YYYY-MM-DD') as day,
            channel,
            count(*)::int as count
          from contact_clicks
          where created_at >= ${startIso} and channel = ${channel}
          group by day, channel
          order by day asc
        `;

  const byDay = new Map<string, { day: string; whatsapp: number; telegram: number; total: number }>();
  for (let index = 0; index < days; index += 1) {
    const day = localDayKey(startIso, index);
    byDay.set(day, { day, whatsapp: 0, telegram: 0, total: 0 });
  }

  rows.forEach((row) => {
    const item = byDay.get(String(row.day));
    if (!item) return;
    if (row.channel === "whatsapp") item.whatsapp = Number(row.count || 0);
    if (row.channel === "telegram") item.telegram = Number(row.count || 0);
    item.total = item.whatsapp + item.telegram;
  });

  return { series: Array.from(byDay.values()), days, period };
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
  const view = clean(url.searchParams.get("view"), 20).toLowerCase();
  if (view === "history") return Response.json(await clickHistory(sql, url));
  if (view === "series") return Response.json(await clickSeries(sql, url));

  const todayIso = localPeriodWindow("day").startIso;
  const weekIso = localPeriodWindow("week").startIso;
  const monthIso = localPeriodWindow("month").startIso;
  const summary = await sql`
    select
      channel,
      count(*)::int as total,
      count(*) filter (where created_at >= ${todayIso})::int as today,
      count(*) filter (where created_at >= ${weekIso})::int as this_week,
      count(*) filter (where created_at >= ${monthIso})::int as this_month
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
