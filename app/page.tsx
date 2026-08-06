import { Fragment } from "react";

const siteBase = "";
const assetBase = "/assets";
const whatsappHref =
  "https://wa.me/60126702560?text=Hi%2C%20I%20would%20like%20to%20ask%20about%20the%20packages";
const telegramHref = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/onespaofficial";

const navItems = [
  ["Home", `${siteBase}/`],
  ["Packages", `${siteBase}/packages/`],
  ["Facilities", `${siteBase}/facilities/`],
  ["Home Service", `${siteBase}/home-massage/`],
  ["Beauty", `${siteBase}/beauty/`],
  ["TCM", `${siteBase}/tcm/`],
  ["FAQ", `${siteBase}/faq/`],
  ["Contact", `${siteBase}/contact/`],
];

const chips = [
  "Open 24 hours",
  "12-hour stay",
  "Pools, steam & dining - one ticket",
  "Free reschedule up to 1 day ahead",
];

const packages = [
  {
    title: "Twin · Buy 1 Free 1",
    desc: "One order, two adults · a full 12 hours",
    price: "From RM169++ / 2 adults",
    href: `${siteBase}/packages/#pk-b1f1`,
    featured: true,
  },
  {
    title: "Solo 12-Hour Pass",
    desc: "12 hours for one + a free 30-min massage",
    price: "From RM169++ / person",
    href: `${siteBase}/packages/#pk-solo`,
  },
  {
    title: "Daytime Massage Package",
    desc: "Daytime unwind · 9am-5pm · solo-friendly",
    price: "RM199++ / person",
    href: `${siteBase}/packages/#pk-daytime`,
  },
  {
    title: "Yangzhou Body Scrub",
    desc: "Traditional scrub · 12-hour pass included",
    price: "From RM199++",
    href: `${siteBase}/packages/#pk-scrub`,
  },
  {
    title: "All-Day Scrub & Massage",
    desc: "12-hour pass · scrub · 60-min massage",
    price: "RM379++ / person",
    href: `${siteBase}/packages/#pk-allday-sm`,
  },
  {
    title: "Daytime Duo",
    desc: "Entry for two · one 60-min treatment each",
    price: "RM379++ / 2 people",
    href: `${siteBase}/packages/#pk-daytime-duo`,
  },
];

const facilities = [
  {
    title: "Fire & Ice Pools",
    image: "fac-icefire.jpg",
    lead: true,
    copy:
      "The icy pool sits at 13°C, the herbal pool at 43°C - alternate between them under the starlit ceiling and walk out completely refreshed.",
  },
  {
    title: "Salt-Crystal Steam Room",
    image: "fac-steam.jpg",
    copy:
      "A salt-crystal steam room in warm light - sit back, sweat it out, circulate better.",
  },
  {
    title: "Massage Rooms",
    image: "fac-massage.jpg",
    copy:
      "Private massage rooms with three beds - family and friends can share a room. Tui Na, Thai, aroma oil and more: 20 treatments arranged here.",
    more: true,
  },
  {
    title: "Yangzhou Body Scrub",
    image: "fac-scrub.jpg",
    copy:
      "A dedicated scrub room with the Yangzhou craft written on its walls - scrub away the day, as a single treatment or a scrub-plus-entry package.",
    more: true,
  },
  {
    title: "Movie & Rest Lounge",
    image: "fac-movie.jpg",
    copy:
      "The screening hall joins the rest lounge, with a headset for every seat - watch your film or sleep in peace; overnight guests usually settle here.",
  },
  {
    title: "Immersive Light Walk",
    image: "fac-immersive.jpg",
    copy:
      "A starlit light corridor - drift through after your soak, and take a photo while you are at it.",
  },
  {
    title: "Foot Bath Room",
    image: "fac-recliner.jpg",
    copy:
      "A recliner room made for foot work - foot therapy and grooming happen here; power recliners tilt right back for a nap after.",
    more: true,
  },
];

const faqs = [
  [
    "Can I really stay 12 hours?",
    "Yes - 12 hours from check-in, all facilities included.",
  ],
  [
    "Is Sunday a weekday or weekend rate?",
    "Weekday rate. Sun-Thu are all weekday; Fri, Sat and public holidays are the other tier.",
  ],
  [
    "How are public holidays priced?",
    "Weekend rate. The price shows right on the calendar when you pick a date - no maths needed.",
  ],
];

const footerPolicies = [
  ["Cancellation & Rescheduling", `${siteBase}/cancellation-and-refund-policy-on-service/`],
  ["Terms & Conditions", `${siteBase}/terms-conditions/`],
  ["Privacy Policy", `${siteBase}/privacy-policy/`],
];

function Diamond() {
  return <span className="dia" aria-hidden="true" />;
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M21 11.6a8.4 8.4 0 0 1-12.3 7.4L4 20l1.1-4.4A8.4 8.4 0 1 1 21 11.6Z" />
      <path d="M8.8 10.2c.5 1.9 2.1 3.5 4 4l1.3-1.2 2.1 1" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M21 4 3.7 10.8c-.8.3-.8 1.4.1 1.6l4.3 1.3 1.7 5.2c.3.8 1.3 1 1.8.3l2.5-3.3 4.7 3.5c.7.5 1.7.1 1.9-.8L23 5.2c.2-.9-.9-1.6-1.6-1.2Z" />
      <path d="m8.2 13.7 6.7-4.2-5.1 5.8" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="topbar" id="home">
        <div className="container">
          <a className="brand" href={`${siteBase}/`} aria-label="One Spa home">
            <img
              className="brand-lockup"
              src={`${assetBase}/logo-duo.svg`}
              alt="One Spa"
            />
          </a>
          <nav className="nav" aria-label="Primary navigation">
            {navItems.map(([label, href], index) => (
              <a className={index === 0 ? "on" : undefined} href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
          <div className="top-right">
            <a className="cart-link" href={`${siteBase}/cart/`} aria-label="Cart">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1" />
                <circle cx="17" cy="20" r="1" />
                <path d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" />
              </svg>
              <span className="cart-count" data-cart-count hidden>
                0
              </span>
            </a>
            <div className="lang" aria-label="Language">
              <a href={`${siteBase}/cn/`}>中文</a>
              <span className="on">EN</span>
            </div>
            <details className="mnav">
              <summary aria-label="Menu">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <nav className="mnav-list" aria-label="Mobile navigation">
                {navItems.map(([label, href]) => (
                  <a href={href} key={label}>
                    {label}
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main>
        <section className="hero home">
          <img
            className="hero-img"
            src={`${assetBase}/hero-onsen-warm.jpg`}
            alt=""
            fetchPriority="high"
          />
          <div className="container">
            <div className="k">One Spa · Kuala Lumpur · Open 24 Hours</div>
            <h1>
              Give Yourself 12 Hours
              <br />
              In a Warm Spring
            </h1>
            <p>
              A 24-hour hot-spring retreat in Kuala Lumpur. Pools, steam, sauna,
              massage & dining - one ticket, a full 12-hour stay.
            </p>
            <div className="cta">
              <a className="btn clay" href={`${siteBase}/packages/`}>
                View Packages
              </a>
              <a className="btn cream-line" href={`${siteBase}/facilities/`}>
                See All Facilities
              </a>
            </div>
          </div>
        </section>

        <div className="chips">
          <div className="container">
            {chips.map((chip) => (
              <span className="c" key={chip}>
                <Diamond />
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="osw-onsen-crosslink">
          <div className="container">
            <a className="osw-product-text-link" href={`${siteBase}/onsen-kl/`}>
              24-hour onsen in KL
            </a>
          </div>
        </div>

        <section id="featured">
          <div className="sec-head">
            <div className="k">Featured</div>
            <h2>Pick Yours, Book in Minutes</h2>
            <div className="divider">
              <Diamond />
            </div>
          </div>
          <div className="container">
            <div className="minis">
              {packages.map((pkg) => (
                <article
                  className={`mini-card${pkg.featured ? " night" : ""}`}
                  key={pkg.title}
                >
                  {pkg.featured ? (
                    <span className="tag hot">Featured</span>
                  ) : null}
                  <h3>{pkg.title}</h3>
                  <p className="desc">{pkg.desc}</p>
                  <div className="grow" />
                  <div className="price">
                    <span className="rm">{pkg.price}</span>
                  </div>
                  <a
                    className={`btn sm${pkg.featured ? "" : " line"}`}
                    href={pkg.href}
                  >
                    View Packages
                  </a>
                </article>
              ))}
            </div>
            <p className="taxnote osw-home-tax">
              ++ = 10% service charge + 8% SST; the all-in price shows once you
              pick a date
            </p>
            <div className="center-cta">
              <a className="btn" href={`${siteBase}/packages/`}>
                View Packages
              </a>
            </div>
          </div>
        </section>

        <section id="facilities">
          <div className="sec-head">
            <div className="k">What&apos;s Inside</div>
            <h2>One-Stop Hot-Spring Retreat</h2>
            <div className="divider">
              <Diamond />
            </div>
          </div>
          <div className="container">
            <div className="fac-grid">
              {facilities.map((facility, index) => (
                <Fragment key={facility.title}>
                  <article
                    className={`fac${facility.lead ? " lead" : ""}`}
                  >
                    <div className="ph">
                      <img
                        src={`${assetBase}/${facility.image}`}
                        alt={facility.title}
                        loading="eager"
                      />
                    </div>
                    <div className="fb">
                      <h3>{facility.title}</h3>
                      <p>{facility.copy}</p>
                      {facility.more ? (
                        <a className="more" href={`${siteBase}/packages/#treatments`}>
                          See Treatments & Prices &rsaquo;
                        </a>
                      ) : null}
                    </div>
                  </article>
                  {index === 0 ? (
                    <section className="osw-home-sauna" key="sauna">
                      <h3>Steam Room & Sauna</h3>
                      <p>
                        Beyond the pools, One Spa has a{" "}
                        <strong>salt-crystal steam room</strong> and both{" "}
                        <strong>dry and wet saunas</strong>. The salt room runs
                        at a gentler heat - good for staying in longer, and
                        where most guests head right after a soak.
                      </p>
                      <p>
                        The Chinese bathhouse way is to alternate:{" "}
                        <strong>hot pool, steam or sauna, cold plunge</strong>.
                        Each round opens and closes your pores once; two or
                        three rounds does more for tired muscles than simply
                        soaking.
                      </p>
                      <p>
                        Steam room and sauna access is included in the 12-hour
                        ticket, available 24 hours, at no extra charge.
                      </p>
                    </section>
                  ) : null}
                </Fragment>
              ))}
            </div>
            <div className="center-cta">
              <a className="btn line" href={`${siteBase}/facilities/`}>
                See All Facilities
              </a>
            </div>

            <div className="banner">
              <div>
                <h3>Coming With Friends or Family?</h3>
                <p>
                  Two go Buy-1-Free-1; odd numbers add a Solo Pass; kids add a
                  Kids Ticket. Full combos are available through WhatsApp.
                </p>
              </div>
              <a className="btn" href={`${siteBase}/packages/#combos`}>
                See Group Combos
              </a>
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="sec-head">
            <div className="k">Before You Book</div>
            <h2>Prices, booking, changes, arrival - the common questions are here.</h2>
            <div className="divider">
              <Diamond />
            </div>
          </div>
          <div className="container">
            <div className="faqwrap">
              <div className="faq">
                {faqs.map(([question, answer], index) => (
                  <details open={index === 0} key={question}>
                    <summary>
                      {question}
                      <span className="plus" />
                    </summary>
                    <div className="a">{answer}</div>
                  </details>
                ))}
              </div>
              <div className="center-cta">
                <a className="btn line" href={`${siteBase}/faq/`}>
                  Read the FAQ
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site" id="contact">
        <div className="container fwrap">
          <img
            className="flogo"
            src={`${assetBase}/logo-cream.svg`}
            alt="One Spa"
          />
          <div className="slogan">
            Give Yourself 12 Hours
            <br />
            In a Warm Spring
          </div>
          <div className="contact-pair footer-contact-pair">
            <a className="btn contact-wa" href={whatsappHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              WhatsApp +60 12-670 2560
            </a>
            <a className="btn contact-tg" href={telegramHref} target="_blank" rel="noopener">
              <TelegramIcon />
              Telegram Us
            </a>
          </div>

          <div className="cols">
            <div className="col footer-link-col">
              <h6>Explore</h6>
              {navItems.slice(0, 8).map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
            <div className="col footer-policy-col">
              <h6>Policies</h6>
              {footerPolicies.map(([label, href]) => (
                <a href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
            <div className="col footer-visit-col">
              <h6>Contact</h6>
              <p>
                WhatsApp +60 12-670 2560
                <br />
                Telegram @onespaofficial
                <br />
                Open 24 Hours
                <br />
                Lot No. 2-53 & 2-56, Level 2, Viva Home Mall,
                <br />
                85, Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur
              </p>
            </div>
          </div>
          <div className="bottom">One Spa · © 2026 One Spa. All rights reserved.</div>
        </div>
      </footer>

      <div className="fab-stack" aria-label="Contact One Spa">
        <a className="fab whatsapp" href={whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp">
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a className="fab telegram" href={telegramHref} target="_blank" rel="noopener" aria-label="Telegram">
          <TelegramIcon />
          Telegram
        </a>
      </div>
    </>
  );
}
