import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  telegramHref,
  whatsappHref,
  whatsappNumberDisplay,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "One Spa Packages | 吉隆坡SPA按摩价格 · 南海龙宫",
  description:
    "View One Spa 南海龙宫 packages in Kuala Lumpur: 12-hour spa pass, KL massage package, body scrub, daytime duo, kids ticket and private room prices.",
  path: "/packages/",
  keywords: ["吉隆坡SPA价格", "吉隆坡按摩价格", "南海龙宫配套", "KL spa package", "KL massage package"],
  image: "/assets/hero-packages-rain.jpg",
});

const packageCards = [
  {
    id: "pk-b1f1",
    title: "Twin 12-Hour Pass",
    tag: "2 Adults · Buy 1 Free 1",
    image: "img-b1f1.jpg",
    desc: "One order admits 2 adults together",
    prices: [
      { label: "Sun-Thu", price: "169", per: "/ 2 adults" },
      { label: "Fri, Sat & Public Holidays", price: "199", per: "/ 2 adults" },
    ],
    features: [
      "Pools, steam, sauna & rest lounges",
      "Buffet dinner 6-9pm + light meals at other hours",
      "A full 12-hour stay - best value for two",
    ],
    notes: [
      "Sunday counts as a weekday here - Sun-Thu all get the lower price.",
      "Total for 2 adults - not per person.",
    ],
    button: "Book",
  },
  {
    id: "pk-solo",
    title: "Solo 12-Hour Pass + Free 30-min Massage",
    tag: "Solo · Online Bonus",
    image: "img-solo.jpg",
    desc: "A full 12 hours plus a massage, just for you",
    prices: [
      { label: "Sun-Thu", price: "169", per: "/ person" },
      { label: "Fri, Sat & Public Holidays", price: "199", per: "/ person" },
    ],
    features: [
      "Pools, steam, sauna, rest lounges + buffet dinner",
      "Free 30-min massage: foot & leg, or Chinese partial - your pick",
      "Coming as 3 or 5? Pair this with Buy 1 Free 1 (see combos below)",
    ],
    notes: [
      "Sunday counts as a weekday here - Sun-Thu all get the lower price.",
      "Online booking only - walk-ins don't get the bonus. We register the bonus on your order automatically.",
    ],
    button: "Book",
  },
  {
    id: "pk-daytime",
    title: "Daytime Massage Package",
    tag: "Daytime · 9am-5pm",
    image: "img-daytime.jpg",
    desc: "Enter 9am-5pm daily · solo-friendly",
    prices: [
      { label: "Per person - same price daily", was: "RM498", price: "199", per: "/ person" },
    ],
    features: [
      "Pick 1 of 3: 60-min massage / 60-min foot therapy / detox (2 of 5)",
      "Pools, steam & sauna",
      "Dining, fruits & ice cream",
    ],
    notes: ["Booking time = entry time; staying past 5pm needs a top-up ticket."],
    button: "Book · RM199 / person",
  },
  {
    id: "pk-scrub",
    title: "Yangzhou Body Scrub Package",
    tag: "Deep Cleanse · Scrub + Pass",
    image: "img-scrub.jpg",
    desc: "Traditional scrub, 12-hour pass included",
    prices: [
      { label: "Sun-Thu", was: "RM319", price: "199", per: "/ person" },
      { label: "Fri, Sat & Public Holidays", was: "RM349", price: "239", per: "/ person" },
    ],
    features: [
      "A 30-min traditional Yangzhou scrub - soak first, then scrub",
      "12-hour entry: pools, steam & sauna",
      "Dining, fruits & ice cream",
    ],
    notes: ["12-hour entry already included - no separate ticket needed."],
    button: "Book",
  },
  {
    id: "pk-allday-sm",
    title: "All-Day Scrub & Massage Package",
    tag: "Scrub + Massage · All Day",
    image: "img-scrub.jpg",
    desc: "12-hour pass + 30-min scrub + 60-min massage",
    prices: [{ label: "Package", price: "379", per: "/ person" }],
    features: [
      "12-hour spa access with buffet",
      "30-min Yangzhou body scrub",
      "60-min tuina or foot massage",
    ],
    notes: ["One ticket includes spa access, scrub and massage."],
    button: "Book · RM379 / person",
  },
  {
    id: "pk-daytime-duo",
    title: "Daytime Duo Package",
    tag: "For Two · Daytime",
    image: "img-daytime.jpg",
    desc: "Daytime entry for two + one 60-min treatment each",
    prices: [{ label: "Package for two", price: "379", per: "/ 2 people" }],
    features: [
      "Two daytime passes",
      "One 60-min treatment each",
      "Choose massage, foot therapy or detox care",
    ],
    notes: ["Daily 9:00-17:00 · one package covers two guests."],
    button: "Book · RM379 / 2 people",
  },
];

const treatmentGroups = [
  {
    cn: "全身项目",
    en: "SPA / Full Body",
    rows: [
      ["Soothing Touch Therapy", "60 min", "RM369++"],
      ["Deep Detox Stone Therapy★", "80 min", "RM499++"],
      ["French Indulgence Therapy★", "100 min", "RM699++"],
      ["Five Elements Supreme Spa★", "110 min", "RM799++"],
    ],
  },
  {
    cn: "足疗项目",
    en: "Foot Massage",
    rows: [
      ["Classic Foot Massage", "60 min", "RM299++"],
      ["Foot Massage Package★", "80 min", "RM499++"],
    ],
  },
  {
    cn: "指压项目",
    en: "Shiatsu Massage",
    rows: [
      ["Localized Therapy", "30 min", "RM199++"],
      ["Tui Na Chinese Massage", "60 min", "RM299++"],
      ["Traditional Thai Massage", "70 min", "RM399++"],
    ],
  },
  {
    cn: "小项目",
    en: "Other Treatment",
    rows: [
      ["Serenity Ear Spa", "Per session", "RM150++"],
      ["Tang Dynasty Ear Bath", "60 min", "RM299++"],
      ["Yangzhou Foot Grooming", "Per session", "RM150++"],
      ["Acupoint Cupping", "Per session", "RM150++"],
      ["Meridian Gua Sha", "Per session", "RM150++"],
      ["Yangzhou Body Scrub", "Per session", "RM150++"],
      ["Fancy Back Stepping", "30 min", "RM199++"],
      ["Eye Spa Wash", "Per session", "RM150++"],
    ],
  },
  {
    cn: "保养项目",
    en: "Maintenance · Signature",
    rows: [
      ["Harmonic Four Hands Ritual★", "70 min", "RM999++"],
      ["Deep Lower Body Therapy★", "90 min", "RM699++"],
      ["Pelvic Energy Alignment★", "90 min", "RM699++"],
    ],
  },
];

const drinkRows = [
  ["Whisky Cola Barrel", "1.5L RM59", "3L RM99"],
  ["Mojito Barrel", "1.5L RM59", "3L RM99"],
  ["Jager Barrel", "1.5L RM59", "3L RM99"],
  ["Tequila Sunrise", "1.5L RM69", "3L RM118"],
  ["Plum & Pineapple Ice Wine", "1.5L RM69", "3L RM118"],
  ["Sangria", "1.5L RM69", "3L RM118"],
  ["Long Island Iced Tea", "1.5L RM79", "3L RM138"],
  ["Lovestruck (Grapefruit Rum)", "1.5L RM79", "3L RM128"],
];

const rooms = [
  {
    id: "room-golf",
    title: "Golf Room",
    image: "fac-golf.jpg",
    big: "199",
    cap: "3-hour block · Best value",
    hourly: [
      ["2 hours", "RM139"],
      ["Or rent by the hour", "RM99 / hour"],
    ],
    features: [
      "Close the door and take a swing - a private golf-simulator room with 4 massage chairs waiting beside you",
      "Charged by room, not per person - the booker decides how to use it",
      "RM99 / 1 hour · RM139 / 2 hours · RM199 / 3 hours",
      "WhatsApp booking only - message us for details & scheduling",
    ],
  },
  {
    id: "room-storm",
    title: "Storm Shower Room",
    image: "fac-storm.jpg",
    big: "699",
    cap: "Book 3, get 1 free · 4 hours · up to 15 guests · Best value",
    hourly: [["Or rent by the hour", "RM499 / hour"]],
    features: [
      "Book 3 hours, get 1 free - 4 hours in total",
      "Private room for up to 15 pax",
      "Priced per room; the massage 20%-off offer doesn't apply to rooms",
      "RM499 free-entry rule covers 1 person only - other guests buy entry tickets as usual",
    ],
  },
];

function Money({
  was,
  price,
  per,
}: {
  was?: string;
  price: string;
  per?: string;
}) {
  return (
    <span>
      {was ? <span className="was">{was}</span> : null}
      <span className="rm">
        <span className="cur">RM</span>
        {price}
        <sup className="osw-pp">++</sup>
        {per ? <span className="per">{per}</span> : null}
      </span>
    </span>
  );
}

function Band({ cn, en }: { cn: string; en: string }) {
  return (
    <div className="bandwrap-t">
      <div className="band">
        <b>{cn}</b>
        <span>{en}</span>
      </div>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <>
      <Header active="Packages" />
      <main>
        <Hero
          eyebrow="One Spa · Kuala Lumpur · Open 24 Hours"
          title={<>Sink Into a Warm Spring</>}
          copy="One ticket, a full 12-hour stay - pools, steam, massage & dining all included."
          image="hero-packages-rain.jpg?osw=0.9.23"
        />

        <nav className="subnav" aria-label="Sections">
          <div className="row">
            <a className="pill on" href="#featured">Packages</a>
            <a className="pill" href="#combos">Group Combos</a>
            <a className="pill" href="#treatments">Massage</a>
            <a className="pill" href="#drinks">Drink Barrels</a>
            <a className="pill" href="#room">Private Room</a>
            <a className="pill" href="#know">Good to Know</a>
          </div>
        </nav>

        <section className="trust">
          <div className="container">
            <div className="t"><span className="dia" />Pay and get a confirmation email - show your order at the front desk</div>
            <div className="t"><span className="dia" />12 hours from check-in - pools, steam, lounges & dining all included</div>
            <div className="t"><span className="dia" />Reschedule free up to 1 day ahead, unlimited times · <a href="#know">Policy</a></div>
          </div>
        </section>

        <div className="osw-onsen-crosslink">
          <div className="container crosslinks">
            <a className="osw-product-text-link" href="/onsen-kl/">24-hour onsen in KL</a>
            <a className="osw-product-text-link" href="/facilities/">full price & facility list</a>
          </div>
        </div>

        <section id="featured">
          <SectionHead eyebrow="Featured Packages" title="Pick Yours, Book in Minutes" />
          <div className="container">
            <div className="cards">
              {packageCards.map((item) => (
                <article className="card" id={item.id} key={item.id}>
                  <div className="ph">
                    <img src={`${assetBase}/${item.image}`} alt={`${item.title} - One Spa KL spa package, Kuala Lumpur`} />
                  </div>
                  <div className="body">
                    <div className="tagrow"><span className="tag">{item.tag}</span></div>
                    <h3>{item.title}</h3>
                    <p className="desc">{item.desc}</p>
                    <div className="prices">
                      {item.prices.map((row) => (
                        <div className="prow" key={row.label}>
                          <span className="lbl">{row.label}</span>
                          <span className="dots" />
                          <Money was={row.was} price={row.price} per={row.per} />
                        </div>
                      ))}
                    </div>
                    <p className="taxnote">++ = 10% service charge + 8% SST; the all-in price shows once you pick a date</p>
                    <ul className="feat">
                      {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                    {item.notes.map((note) => <div className="note soft" key={note}>{note}</div>)}
                    <div className="grow" />
                    <button
                      className="btn wide"
                      type="button"
                      data-book={item.id.replace("pk-", "")}
                    >
                      {item.button}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="combos">
          <SectionHead eyebrow="Group Combos" title="Coming With Friends or Family?" />
          <div className="container">
            <div className="combo">
              <div className="grid2">
                <div className="row"><h4>2 adults</h4><p>One Buy 1 Free 1 order covers you both.</p></div>
                <div className="row"><h4>3 or 5 adults</h4><p>Pairs take Buy 1 Free 1; the extra person takes a Solo Pass - and still gets the free 30-min massage. E.g. 3 adults Sun-Thu: RM169 + RM169.</p></div>
                <div className="row">
                  <h4>With kids</h4>
                  <p>Adults book as above; each child adds a Kids Ticket (age 12 & under, with an adult; under 2 free at the front desk).</p>
                  <div className="osw-detail-links">
                    <a href="/packages/#know">Weekday ticket details</a><span aria-hidden="true">·</span><a href="/packages/#know">Weekend / PH details</a>
                  </div>
                  <button className="mini" type="button" data-book="kids">Kids Ticket · Book</button>
                </div>
                <div className="row">
                  <h4>10+ / company groups</h4>
                  <p>Message us - group deals are negotiable.</p>
                  <div className="mini-contact-row">
                    <a className="mini contact-wa" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
                    <a className="mini contact-tg" href={telegramHref} target="_blank" rel="noopener">Telegram Us</a>
                  </div>
                </div>
              </div>
            </div>
            <p className="fine">Examples use Sun-Thu rates; ++ = 10% service charge + 8% SST.</p>
          </div>
        </section>

        <section id="treatments">
          <SectionHead
            eyebrow="Massage & Treatments"
            title="Add a Treatment"
            sub="Treatments need an entry ticket; spend RM499+ in one bill and entry is free."
          />
          <div className="container">
            <div className="deal">
              Booking the <b>Buy-1-Free-1</b> or a <b>Solo Pass</b>? <b>Add same-day treatments under RM499 to the same order and they&apos;re 20% off</b> - applied automatically at checkout. Treatments at RM499 and above (★) aren&apos;t discounted - <b>each one already covers free entry for one guest</b>, so book the treatment alone, no ticket needed.
            </div>
            {treatmentGroups.map((group) => (
              <div key={group.en}>
                <Band cn={group.cn} en={group.en} />
                <div className="tlist">
                  {group.rows.map(([name, time, price]) => (
                    <div className="trow" key={name}>
                      <span className="nm">{name}</span>
                      <span className="min">{time}</span>
                      <span className="dots" />
                      <span className="rm">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p className="legend">★ RM499 & above: covers free entry for one guest and is not part of the 20% off (one benefit per treatment, not both) · ++ = 10% service charge + 8% SST; the all-in price shows once you pick a date</p>
          </div>
        </section>

        <section id="drinks">
          <SectionHead
            eyebrow="Drink Barrels"
            title="Party Drink Barrels"
            sub="Skip the single glass - barrels from 1.5L, made for match nights, private rooms and parties."
          />
          <div className="container">
            <Band cn="酒水桶" en="Drink Barrels · 1.5L / 3L" />
            <div className="tlist">
              {drinkRows.map(([name, small, large]) => (
                <div className="trow" key={name}>
                  <span className="nm">{name}</span>
                  <span className="min">{small}</span>
                  <span className="dots" />
                  <span className="rm">{large}</span>
                </div>
              ))}
            </div>
            <p className="legend">Order on-site or via WhatsApp · enjoy in the dining lounge, movie lounge or private rooms · no outside alcohol · prices exclude 10% service charge & 8% SST</p>
          </div>
        </section>

        <section id="room">
          <SectionHead eyebrow="Private Rooms" title="Private Room Experience" />
          <div className="container">
            <div className="cards rooms">
              {rooms.map((room) => (
                <article className="card" id={room.id} key={room.id}>
                  <div className="ph"><img src={`${assetBase}/${room.image}`} alt={`${room.title} - private room at One Spa Kuala Lumpur`} /></div>
                  <div className="body">
                    <h3>{room.title}</h3>
                    <div className="roomprice">
                      <span className="big"><span className="cur">RM</span>{room.big}</span>
                      <span className="cap">{room.cap}</span>
                    </div>
                    {room.hourly.map(([label, price]) => (
                      <div className="hourly" key={label}>
                        <span>{label}</span><span className="dots" /><span className="rm">{price}</span>
                      </div>
                    ))}
                    <p className="taxnote">Prices exclude 10% service charge & 8% SST - settled on site</p>
                    <ul className="feat">{room.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                    <div className="grow" />
                    <div className="contact-pair room-contact-pair">
                      <a className="btn contact-wa wide" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Room</a>
                      <a className="btn contact-tg wide" href={telegramHref} target="_blank" rel="noopener">Telegram Room</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <ul className="knowrules">
              <li>Private rooms are booked via WhatsApp only ({whatsappNumberDisplay}) - not sold online</li>
              <li>Priced per room; a RM499+ room fee covers 1 person&apos;s entry - other guests buy tickets as usual</li>
              <li>Room bookings don&apos;t combine with the ticket + massage 20% off offer</li>
            </ul>
          </div>
        </section>

        <section id="know">
          <SectionHead eyebrow="Good to Know" title="Before You Book" />
          <div className="container">
            <div className="knowwrap">
              <div className="know">
                <div className="t"><span className="dia" />All packages: book online at least 1 hour ahead.</div>
                <div className="t"><span className="dia" />Prices exclude 10% service charge & 8% SST - the final amount is shown at checkout. No hidden fees.</div>
                <div className="t"><span className="dia" />After payment you&apos;ll get a confirmation email - show it at the front desk to check in.</div>
                <div className="t"><span className="dia" />Plans changed? Reschedule free up to 1 day before your visit, unlimited times; refunds go back the original way within 14 days.</div>
              </div>
              <div className="policylinks">
                <a href="/cancellation-and-refund-policy-on-service/"><span>Cancellation & Rescheduling</span></a>
                <a href="/terms-conditions/"><span>Terms & Conditions</span></a>
                <a href="/privacy-policy/"><span>Privacy Policy</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
