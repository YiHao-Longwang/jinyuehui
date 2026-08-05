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
);
