import postgres from "postgres";

type CartItem = {
  code?: string;
  name?: string;
  locale?: "en" | "cn";
  date?: string;
  time?: string;
  qty?: number;
};

const holidays = new Set([
  "2026-01-01",
  "2026-02-01",
  "2026-02-02",
  "2026-02-03",
  "2026-02-17",
  "2026-02-18",
  "2026-03-07",
  "2026-03-20",
  "2026-03-21",
  "2026-03-22",
  "2026-03-23",
  "2026-05-01",
  "2026-05-27",
  "2026-05-31",
  "2026-06-01",
  "2026-06-17",
  "2026-08-25",
  "2026-08-31",
  "2026-09-16",
  "2026-11-08",
  "2026-11-09",
  "2026-12-25",
]);

const products = {
  b1f1: {
    en: "Twin 12-Hour Pass",
    cn: "双人 12 小时门票",
    unit: "/ 2 adults",
    weekday: 169,
    weekend: 199,
    fee: { sc: 0.1, sst: 0.08 },
  },
  solo: {
    en: "Solo 12-Hour Pass + Free 30-min Massage",
    cn: "单人 12 小时门票 + 送 30 分钟按摩",
    unit: "/ person",
    weekday: 169,
    weekend: 199,
    fee: { sc: 0.1, sst: 0.08 },
  },
  daytime: {
    en: "Daytime Massage Package",
    cn: "日间按摩配套",
    unit: "/ person",
    single: 199,
    fee: { sc: 0.1, sst: 0.08 },
  },
  scrub: {
    en: "Yangzhou Body Scrub Package",
    cn: "扬州搓澡配套",
    unit: "/ person",
    weekday: 199,
    weekend: 239,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "allday-sm": {
    en: "All-Day Scrub & Massage Package",
    cn: "沐净舒养套餐",
    unit: "/ person",
    single: 379,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "daytime-duo": {
    en: "Daytime Duo Package",
    cn: "日间双人套餐",
    unit: "/ 2 people",
    single: 379,
    fee: { sc: 0.1, sst: 0.08 },
  },
  kids: {
    en: "Kids Ticket",
    cn: "儿童票",
    unit: "/ child",
    weekday: 58,
    weekend: 88,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "outcall-classic": {
    en: "Classic 2-Hour Home Massage",
    cn: "经典 2 小时上门按摩",
    unit: "/ 2-hour session",
    single: 699,
    fee: { sc: 0, sst: 0.08 },
  },
  "outcall-anytime": {
    en: "Anytime Hourly Home Massage (2h)",
    cn: "随时 2 小时上门按摩",
    unit: "/ 2-hour session",
    single: 798,
    fee: { sc: 0, sst: 0.08 },
  },
  "outcall-fourhands": {
    en: "Four-Hands Indulgence · 2h",
    cn: "四手尊宠 · 2 小时",
    unit: "/ 2-hour session",
    single: 1699,
    fee: { sc: 0, sst: 0.08 },
  },
} as const;

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

function isWeekendOrHoliday(date: string) {
  const day = new Date(`${date}T12:00:00+08:00`).getDay();
  return day === 5 || day === 6 || holidays.has(date);
}

function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function cents(value: number) {
  return Math.round(value * 100);
}

function makeRef() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `OS${stamp}${suffix}`;
}

function calculate(items: CartItem[]) {
  const normalized = items.map((item) => {
    const product = products[item.code as keyof typeof products];
    if (!product) throw new Error("Unknown package selected.");
    if (!item.date || !validDate(item.date)) throw new Error("Visit date is required.");
    if (!item.time || !/^\d{2}:\d{2}$/.test(item.time)) throw new Error("Visit time is required.");

    const qty = Math.max(1, Math.min(20, Math.floor(Number(item.qty) || 1)));
    const tier = "single" in product ? "single" : isWeekendOrHoliday(item.date) ? "weekend" : "weekday";
    const price = "single" in product ? product.single : product[tier];
    const lineSubtotal = price * qty;
    const sc = Math.round(lineSubtotal * product.fee.sc * 100) / 100;
    const sst = Math.round((lineSubtotal + sc) * product.fee.sst * 100) / 100;
    const total = lineSubtotal + sc + sst;

    return {
      code: item.code,
      name: item.locale === "cn" ? product.cn : product.en,
      nameEn: product.en,
      nameCn: product.cn,
      unit: product.unit,
      date: item.date,
      time: item.time,
      qty,
      tier,
      price,
      subtotal: lineSubtotal,
      serviceCharge: sc,
      sst,
      total,
    };
  });

  const subtotal = normalized.reduce((sum, item) => sum + item.subtotal, 0);
  const serviceCharge = normalized.reduce((sum, item) => sum + item.serviceCharge, 0);
  const sst = normalized.reduce((sum, item) => sum + item.sst, 0);
  const total = normalized.reduce((sum, item) => sum + item.total, 0);

  return { items: normalized, subtotal, serviceCharge, sst, total };
}

async function ensureTable(sql: postgres.Sql) {
  await sql`
    create table if not exists reservations (
      id bigserial primary key,
      reservation_ref text not null unique,
      status text not null default 'pending',
      locale text not null default 'en',
      customer_name text not null,
      customer_phone text not null,
      customer_email text,
      customer_notes text,
      visit_date date not null,
      items jsonb not null,
      subtotal_cents integer not null,
      service_charge_cents integer not null,
      sst_cents integer not null,
      total_cents integer not null,
      payment_status text not null default 'pay_after_treatment',
      payment_timing text not null default 'after_treatment',
      created_at timestamptz not null default now()
    )
  `;
}

function errorResponse(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cfEnv = await runtimeEnv();
  const token = process.env.ADMIN_TOKEN || cfEnv.ADMIN_TOKEN || "";
  if (token && url.searchParams.get("token") !== token) {
    return errorResponse("Unauthorized", 401);
  }

  const urlValue = await databaseUrl();
  if (!urlValue) return errorResponse("DATABASE_URL is not configured.", 503);

  const sql = postgres(urlValue, { max: 1 });
  try {
    await ensureTable(sql);
    const rows = await sql`
      select reservation_ref, status, customer_name, customer_phone, visit_date,
        items, total_cents, payment_status, created_at
      from reservations
      order by created_at desc
      limit 50
    `;
    return Response.json({ reservations: rows });
  } finally {
    await sql.end({ timeout: 1 });
  }
}

export async function POST(request: Request) {
  const urlValue = await databaseUrl();
  if (!urlValue) return errorResponse("DATABASE_URL is not configured.", 503);

  let payload: {
    locale?: "en" | "cn";
    customer?: { name?: string; phone?: string; email?: string; notes?: string };
    items?: CartItem[];
  };

  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return errorResponse("Invalid JSON body.");
  }

  const customer = payload.customer ?? {};
  const name = customer.name?.trim() ?? "";
  const phone = customer.phone?.trim() ?? "";
  if (!name) return errorResponse("Customer name is required.");
  if (!phone) return errorResponse("Customer phone is required.");
  if (!payload.items?.length) return errorResponse("Cart is empty.");

  let totals: ReturnType<typeof calculate>;
  try {
    totals = calculate(payload.items);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Invalid reservation.");
  }

  const ref = makeRef();
  const visitDate = totals.items[0].date;
  const sql = postgres(urlValue, { max: 1 });

  try {
    await ensureTable(sql);
    const [reservation] = await sql`
      insert into reservations (
        reservation_ref, locale, customer_name, customer_phone, customer_email,
        customer_notes, visit_date, items, subtotal_cents, service_charge_cents,
        sst_cents, total_cents
      )
      values (
        ${ref}, ${payload.locale ?? "en"}, ${name}, ${phone}, ${customer.email?.trim() || null},
        ${customer.notes?.trim() || null}, ${visitDate}, ${sql.json(totals.items)},
        ${cents(totals.subtotal)}, ${cents(totals.serviceCharge)}, ${cents(totals.sst)},
        ${cents(totals.total)}
      )
      returning reservation_ref, status, total_cents, payment_status, created_at
    `;

    return Response.json(
      {
        reservation,
        totals,
        payment: "pay_after_treatment",
        message:
          payload.locale === "cn"
            ? "预约已记录。付款安排为护理完成后付款。"
            : "Reservation recorded. Payment is due after treatment.",
      },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Could not save reservation.", 500);
  } finally {
    await sql.end({ timeout: 1 });
  }
}
