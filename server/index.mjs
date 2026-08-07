import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { neon } from "@neondatabase/serverless";
import { Server } from "socket.io";

dotenv.config({ path: ".env.local" });
dotenv.config();

const PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 4000);
const DATABASE_URL = process.env.DATABASE_URL || "";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "*";

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
    kind: "spa-tiered",
    leadHours: 0,
    fee: { sc: 0.1, sst: 0.08 },
  },
  solo: {
    en: "Solo 12-Hour Pass + Free 30-min Massage",
    cn: "单人 12 小时门票 + 送 30 分钟按摩",
    unit: "/ person",
    weekday: 169,
    weekend: 199,
    kind: "spa-tiered",
    leadHours: 0,
    fee: { sc: 0.1, sst: 0.08 },
  },
  daytime: {
    en: "Daytime Massage Package",
    cn: "日间按摩配套",
    unit: "/ person",
    single: 199,
    kind: "spa-daily",
    leadHours: 0,
    hours: [9, 17],
    fee: { sc: 0.1, sst: 0.08 },
  },
  scrub: {
    en: "Yangzhou Body Scrub Package",
    cn: "扬州搓澡配套",
    unit: "/ person",
    weekday: 199,
    weekend: 239,
    kind: "spa-tiered",
    leadHours: 0,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "allday-sm": {
    en: "All-Day Scrub & Massage Package",
    cn: "沐净舒养套餐",
    unit: "/ person",
    single: 379,
    kind: "spa-daily",
    leadHours: 0,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "daytime-duo": {
    en: "Daytime Duo Package",
    cn: "日间双人套餐",
    unit: "/ 2 people",
    single: 379,
    kind: "spa-daily",
    leadHours: 0,
    hours: [9, 17],
    fee: { sc: 0.1, sst: 0.08 },
  },
  kids: {
    en: "Kids Ticket",
    cn: "儿童票",
    unit: "/ child",
    weekday: 58,
    weekend: 88,
    kind: "spa-tiered",
    leadHours: 0,
    fee: { sc: 0.1, sst: 0.08 },
  },
  "outcall-classic": {
    en: "Classic 2-Hour Home Massage",
    cn: "经典 2 小时上门按摩",
    unit: "/ 2-hour session",
    single: 699,
    kind: "home",
    leadHours: 3,
    hours: [9, 22],
    fee: { sc: 0, sst: 0.08 },
  },
  "outcall-anytime": {
    en: "Anytime Hourly Home Massage (2h)",
    cn: "随时 2 小时上门按摩",
    unit: "/ 2-hour session",
    single: 798,
    kind: "home",
    leadHours: 3,
    fee: { sc: 0, sst: 0.08 },
  },
  "outcall-fourhands": {
    en: "Four-Hands Indulgence · 2h",
    cn: "四手尊宠 · 2 小时",
    unit: "/ 2-hour session",
    single: 1699,
    kind: "home",
    leadHours: 3,
    hours: [9, 22],
    fee: { sc: 0, sst: 0.08 },
  },
};

function db() {
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  return neon(DATABASE_URL);
}

function cents(value) {
  return Math.round(value * 100);
}

function errorResponse(res, message, status = 400) {
  return res.status(status).json({ error: message });
}

function isWeekendOrHoliday(date) {
  const day = new Date(`${date}T12:00:00+08:00`).getDay();
  return day === 5 || day === 6 || holidays.has(date);
}

function selectedDateTime(date, time) {
  return new Date(`${date}T${time}:00+08:00`);
}

function tierFor(product, date) {
  return "single" in product ? "single" : isWeekendOrHoliday(date) ? "weekend" : "weekday";
}

function priceFor(product, date) {
  if ("single" in product) return product.single;
  return product[isWeekendOrHoliday(date) ? "weekend" : "weekday"];
}

function validateSlot(product, date, time) {
  const [hour] = time.split(":").map(Number);
  if (product.hours) {
    const [start, end] = product.hours;
    if (hour < start || hour > end) throw new Error("Selected time is outside this package's booking hours.");
  }

  const earliest = new Date();
  earliest.setHours(earliest.getHours() + product.leadHours);
  if (selectedDateTime(date, time) < earliest) {
    throw new Error(`This package must be booked at least ${product.leadHours} hour(s) ahead.`);
  }
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function makeRef() {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `OS${stamp}${suffix}`;
}

function normalizeStatus(status) {
  return ["pending", "confirmed", "completed", "cancelled", "no_show"].includes(status)
    ? status
    : "";
}

function verifyAdmin(req) {
  if (!ADMIN_TOKEN) return true;
  return (
    req.query.token === ADMIN_TOKEN ||
    req.get("x-admin-token") === ADMIN_TOKEN ||
    req.body?.token === ADMIN_TOKEN
  );
}

function calculate(items) {
  const normalized = items.map((item) => {
    const product = products[item.code];
    if (!product) throw new Error("Unknown package selected.");
    if (!item.date || !validDate(item.date)) throw new Error("Visit date is required.");
    if (!item.time || !/^\d{2}:\d{2}$/.test(item.time)) throw new Error("Visit time is required.");

    validateSlot(product, item.date, item.time);

    const qty = Math.max(1, Math.min(20, Math.floor(Number(item.qty) || 1)));
    const tier = tierFor(product, item.date);
    const price = priceFor(product, item.date);
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
      pricingKind: product.kind,
      leadHours: product.leadHours,
      price,
      subtotal: lineSubtotal,
      serviceCharge: sc,
      sst,
      total,
    };
  });

  return {
    items: normalized,
    subtotal: normalized.reduce((sum, item) => sum + item.subtotal, 0),
    serviceCharge: normalized.reduce((sum, item) => sum + item.serviceCharge, 0),
    sst: normalized.reduce((sum, item) => sum + item.sst, 0),
    total: normalized.reduce((sum, item) => sum + item.total, 0),
  };
}

async function ensureTable(sql) {
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
      reminder_sent_at timestamptz,
      created_at timestamptz not null default now()
    )
  `;
  await sql`alter table reservations add column if not exists reminder_sent_at timestamptz`;
  await sql`create index if not exists reservations_created_at_idx on reservations (created_at desc)`;
  await sql`create index if not exists reservations_status_idx on reservations (status)`;
}

async function listReservations(sql) {
  return sql`
    select reservation_ref, status, locale, customer_name, customer_phone,
      customer_email, customer_notes, visit_date, items, subtotal_cents,
      service_charge_cents, sst_cents, total_cents, payment_status,
      payment_timing, reminder_sent_at, created_at
    from reservations
    order by created_at desc
    limit 50
  `;
}

async function notifyTelegram(reservation) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const first = Array.isArray(reservation.items) ? reservation.items[0] : null;
  const text = [
    "New One Spa reservation",
    `Ref: ${reservation.reservation_ref}`,
    `Name: ${reservation.customer_name}`,
    `Phone: ${reservation.customer_phone}`,
    first ? `Visit: ${first.date} ${first.time}` : "",
    `Total: RM${(Number(reservation.total_cents || 0) / 100).toFixed(2)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!response.ok) {
    console.warn("Telegram notification failed:", await response.text());
  }
}

const app = express();
const allowedOrigin = FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN.split(",").map((item) => item.trim());

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: allowedOrigin, credentials: true },
});

io.use((socket, next) => {
  if (!ADMIN_TOKEN || socket.handshake.auth?.token === ADMIN_TOKEN) return next();
  return next(new Error("Unauthorized"));
});

io.on("connection", (socket) => {
  socket.join("admins");
  socket.emit("admin:ready", { ok: true });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/reservations", async (req, res) => {
  if (!verifyAdmin(req)) return errorResponse(res, "Unauthorized", 401);
  try {
    const sql = db();
    await ensureTable(sql);
    res.json({ reservations: await listReservations(sql) });
  } catch (error) {
    errorResponse(res, error instanceof Error ? error.message : "Could not load reservations.", 500);
  }
});

app.post("/api/reservations", async (req, res) => {
  const payload = req.body || {};
  const customer = payload.customer || {};
  const name = String(customer.name || "").trim();
  const phone = String(customer.phone || "").trim();

  if (!name) return errorResponse(res, "Customer name is required.");
  if (!phone) return errorResponse(res, "Customer phone is required.");
  if (!Array.isArray(payload.items) || !payload.items.length) return errorResponse(res, "Cart is empty.");

  let totals;
  try {
    totals = calculate(payload.items);
  } catch (error) {
    return errorResponse(res, error instanceof Error ? error.message : "Invalid reservation.");
  }

  try {
    const sql = db();
    await ensureTable(sql);
    const ref = makeRef();
    const [reservation] = await sql`
      insert into reservations (
        reservation_ref, locale, customer_name, customer_phone, customer_email,
        customer_notes, visit_date, items, subtotal_cents, service_charge_cents,
        sst_cents, total_cents
      )
      values (
        ${ref}, ${payload.locale || "en"}, ${name}, ${phone}, ${String(customer.email || "").trim() || null},
        ${String(customer.notes || "").trim() || null}, ${totals.items[0].date}, ${JSON.stringify(totals.items)}::jsonb,
        ${cents(totals.subtotal)}, ${cents(totals.serviceCharge)}, ${cents(totals.sst)},
        ${cents(totals.total)}
      )
      returning reservation_ref, status, locale, customer_name, customer_phone,
        customer_email, customer_notes, visit_date, items, subtotal_cents,
        service_charge_cents, sst_cents, total_cents, payment_status,
        payment_timing, reminder_sent_at, created_at
    `;

    io.to("admins").emit("reservation:created", reservation);
    notifyTelegram(reservation).catch((error) => console.warn("Telegram notification error:", error));

    res.status(201).json({
      reservation,
      totals,
      payment: "pay_after_treatment",
      message:
        payload.locale === "cn"
          ? "预约已记录。付款安排为护理完成后付款。"
          : "Reservation recorded. Payment is due after treatment.",
    });
  } catch (error) {
    errorResponse(res, error instanceof Error ? error.message : "Could not save reservation.", 500);
  }
});

app.patch("/api/reservations", async (req, res) => {
  if (!verifyAdmin(req)) return errorResponse(res, "Unauthorized", 401);

  const reservationRef = String(req.body?.reservationRef || "").trim();
  const status = normalizeStatus(String(req.body?.status || ""));
  if (!reservationRef) return errorResponse(res, "Reservation reference is required.");
  if (!status) return errorResponse(res, "Invalid status.");

  try {
    const sql = db();
    await ensureTable(sql);
    const [reservation] = await sql`
      update reservations
      set status = ${status}
      where reservation_ref = ${reservationRef}
      returning reservation_ref, status
    `;

    if (!reservation) return errorResponse(res, "Reservation not found.", 404);
    io.to("admins").emit("reservation:updated", reservation);
    res.json({ reservation });
  } catch (error) {
    errorResponse(res, error instanceof Error ? error.message : "Could not update reservation.", 500);
  }
});

httpServer.listen(PORT, () => {
  console.log(`One Spa reservation websocket backend running on http://localhost:${PORT}`);
});
