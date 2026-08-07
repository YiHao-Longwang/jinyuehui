import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the One Spa page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>onepsa<\/title>/i);
  assert.match(html, /Give Yourself 12 Hours/);
  assert.match(html, /Pick Yours, Book in Minutes/);
  assert.match(html, /One-Stop Hot-Spring Retreat/);
  assert.match(html, /\+60 14-315 5632/);
  assert.match(html, /Telegram Us/);
  assert.match(html, /https:\/\/wa\.me\/60143155632/);
  assert.match(html, /https:\/\/t\.me\/nhlg09/);
  assert.match(html, /href="\/packages\/#pk-b1f1"/);
  assert.match(html, /href="\/packages\/#pk-solo"/);
  assert.match(html, /href="\/packages\/#pk-daytime"/);
  assert.match(html, /href="\/packages\/#pk-scrub"/);
  assert.match(html, /href="\/packages\/#pk-allday-sm"/);
  assert.match(html, /href="\/packages\/#pk-daytime-duo"/);
  assert.match(html, /href="\/facilities\/"/);
  assert.match(html, /href="\/packages\/#treatments"/);
  assert.match(html, /href="\/packages\/#combos"/);
  assert.match(html, /href="\/faq\/"/);
  assert.match(html, /href="\/cart\/"/);
  assert.doesNotMatch(html, /onespadw@gmail\.com|react-loading-skeleton|codex-preview/i);
});

test("server-renders Chinese routes", async () => {
  for (const path of ["/cn", "/cn/packages", "/cn/facilities", "/cn/tcm", "/cn/contact", "/cn/cart"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);

    const html = await response.text();
    assert.match(html, /中文/);
    assert.match(html, /\+60 14-315 5632/);
    assert.match(html, /Telegram/);
    assert.match(html, /href="\/cn\/packages\/"/);
  }

  const packages = await (await render("/cn/packages")).text();
  assert.match(packages, /img-b1f1\.jpg/);
  assert.match(packages, /class="cards"/);
  assert.match(packages, /class="tlist"/);
  assert.match(packages, /fac-golf\.jpg/);

  const facilities = await (await render("/cn/facilities")).text();
  assert.match(facilities, /fac-icefire\.jpg/);

  const tcm = await (await render("/cn/tcm")).text();
  assert.match(tcm, /tcm-meridian\.jpg/);
});

test("server-renders reservation cart", async () => {
  const cart = await (await render("/cart")).text();
  assert.match(cart, /Review Your Reservation/);
  assert.match(cart, /data-cart-page/);
  assert.match(cart, /ONE_SPA_TELEGRAM_URL/);
  assert.match(cart, /booking-cart\.js/);

  const admin = await (await render("/admin")).text();
  assert.match(admin, /Live Booking Dashboard/);
  assert.match(admin, /data-admin-page/);
  assert.match(admin, /admin-reservations\.js\?v=20260807-token-only/);
  assert.match(admin, /data-admin-token/);
  assert.match(admin, /data-admin-filter/);
  assert.doesNotMatch(admin, /API base|data-admin-api-base/);

  const packages = await (await render("/packages")).text();
  assert.match(packages, /data-book="b1f1"/);
  assert.match(packages, /data-book="kids"/);

  const cartScript = await readFile(new URL("../public/booking-cart.js", import.meta.url), "utf8");
  assert.match(cartScript, /data-booking-day/);
  assert.match(cartScript, /data-booking-time/);
  assert.match(cartScript, /booking-stepper/);
  assert.match(cartScript, /setActiveSubnavLink/);
  assert.match(cartScript, /aria-current/);
  assert.match(cartScript, /Fri, Sat & Public Holidays/);
  assert.match(cartScript, /Home massage is subject to 8% SST only/);
  assert.match(cartScript, /basePrice/);
  assert.match(cartScript, /bookingNotes/);
  assert.match(cartScript, /booking-open/);
  assert.match(cartScript, /Add to Cart/);
  assert.match(cartScript, /Checkout Details/);
  assert.match(cartScript, /ONE_SPA_TELEGRAM_URL/);
  assert.match(cartScript, /Contact Staff on Telegram/);
  assert.match(cartScript, /cart-confirm-modal/);
  assert.doesNotMatch(cartScript, /confirm\(/);
  assert.doesNotMatch(cartScript, /alert\(/);
  assert.doesNotMatch(cartScript, /booking-backdrop" data-booking-close/);
});

test("keeps starter preview removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /whatsappHref/);
  assert.match(page, /telegramHref/);
  assert.match(layout, /applicationName: "onepsa"/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
