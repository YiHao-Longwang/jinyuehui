import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHref,
} from "../site-common";

const packageCards = [
  {
    id: "pk-b1f1",
    title: "Twin 12-Hour Pass",
    tag: "Buy 1 Free 1",
    image: "img-b1f1.jpg",
    desc: "One order, two adults, entering together on the same day and time.",
    prices: ["Sun-Thu RM169++ / 2 adults", "Fri, Sat & Public Holidays RM199++ / 2 adults"],
    features: [
      "12-hour spa access for two adults",
      "Pools, steam, sauna, rest lounges + buffet dinner",
      "Add same-day treatments under RM499 and get 20% off",
    ],
  },
  {
    id: "pk-solo",
    title: "Solo 12-Hour Pass + Free 30-min Massage",
    tag: "Solo · Online Bonus",
    image: "img-solo.jpg",
    desc: "12 hours for one guest with a free online-booking massage bonus.",
    prices: ["Sun-Thu RM169++ / person", "Fri, Sat & Public Holidays RM199++ / person"],
    features: [
      "Choose 30-min foot & leg or Chinese partial massage on arrival",
      "Great for odd-number groups",
      "12-hour facilities, lounge and buffet access included",
    ],
  },
  {
    id: "pk-daytime",
    title: "Daytime Massage Package",
    tag: "Daytime · 9am-5pm",
    image: "img-daytime.jpg",
    desc: "Daytime unwind for one with one selected 60-minute treatment.",
    prices: ["Daily RM199++ / person"],
    features: [
      "Entry time between 9am and 5pm",
      "Pick one 60-minute treatment on arrival",
      "Built for a compact weekday reset",
    ],
  },
  {
    id: "pk-scrub",
    title: "Yangzhou Body Scrub Package",
    tag: "Deep Cleanse · Scrub + Pass",
    image: "img-scrub.jpg",
    desc: "Traditional Yangzhou body scrub with 12-hour spa access included.",
    prices: ["Sun-Thu RM199++", "Fri, Sat & Public Holidays RM239++"],
    features: [
      "12-hour entry already included",
      "Steam before scrub for a cleaner result",
      "Good as a single treatment or with friends",
    ],
  },
  {
    id: "pk-allday-sm",
    title: "All-Day Scrub & Massage Package",
    tag: "Scrub + Massage · All Day",
    image: "img-scrub.jpg",
    desc: "12-hour pass, 30-minute Yangzhou scrub and 60-minute massage.",
    prices: ["Daily RM379++ / person"],
    features: [
      "Spa entry, buffet, scrub and massage in one package",
      "Choose tuina or foot therapy for the massage",
      "A fuller half-day or overnight routine",
    ],
  },
  {
    id: "pk-daytime-duo",
    title: "Daytime Duo Package",
    tag: "For Two · Daytime",
    image: "img-daytime.jpg",
    desc: "Daytime entry for two plus one 60-minute treatment each.",
    prices: ["Daily RM379++ / 2 people"],
    features: [
      "One package covers two guests",
      "Book daily from 9am to 5pm",
      "Good for couples or friends",
    ],
  },
];

const treatments = [
  ["Classic Foot Massage", "60 min", "RM159++"],
  ["Foot Massage Package", "90 min", "RM499++"],
  ["Tui Na Chinese Massage", "60 min", "RM239++"],
  ["Traditional Thai Massage", "60 min", "RM239++"],
  ["Aroma Oil Massage", "60 min", "RM269++"],
  ["Yangzhou Body Scrub", "30 min", "RM159++"],
  ["Ear Spa", "45 min", "RM159++"],
  ["Cupping / Gua Sha", "30 min", "RM99++"],
];

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

        <nav className="subnav" aria-label="Package sections">
          <div className="row">
            <a className="pill on" href="#featured">
              Packages
            </a>
            <a className="pill" href="#combos">
              Group Combos
            </a>
            <a className="pill" href="#treatments">
              Massage
            </a>
            <a className="pill" href="#drinks">
              Drink Barrels
            </a>
            <a className="pill" href="#room">
              Private Room
            </a>
            <a className="pill" href="#know">
              Good to Know
            </a>
          </div>
        </nav>

        <section className="trust">
          <div className="container">
            <div className="t"><span className="dia" />Pay and get a confirmation email - show your order at the front desk</div>
            <div className="t"><span className="dia" />12 hours from check-in - pools, steam, lounges & dining all included</div>
            <div className="t"><span className="dia" />Reschedule free up to 1 day ahead, unlimited times</div>
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
                    <img src={`${assetBase}/${item.image}`} alt={item.title} />
                  </div>
                  <div className="body">
                    <div className="tagrow">
                      <span className="tag">{item.tag}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="desc">{item.desc}</p>
                    <div className="prices">
                      {item.prices.map((price) => (
                        <div className="prow" key={price}>
                          <span className="lbl">{price}</span>
                        </div>
                      ))}
                    </div>
                    <ul className="feat">
                      {item.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <a className="btn wide" href={whatsappHref} target="_blank" rel="noopener">
                      Book on WhatsApp
                    </a>
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
                <div className="row">
                  <h4>2 Adults</h4>
                  <p>Take the Twin Buy 1 Free 1 pass.</p>
                </div>
                <div className="row">
                  <h4>3 or 5 Adults</h4>
                  <p>Pairs take Buy 1 Free 1; the extra person takes a Solo Pass.</p>
                </div>
                <div className="row">
                  <h4>Kids</h4>
                  <p>Each child adds a Kids Ticket. Age 2 and under register free at the front desk.</p>
                </div>
                <div className="row">
                  <h4>Need Help?</h4>
                  <p>Message the team and they will combine the order for you.</p>
                  <a className="mini" href={whatsappHref} target="_blank" rel="noopener">
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
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
              Booking Buy-1-Free-1 or Solo Pass? Add same-day treatments under RM499
              to the same order and they are 20% off.
            </div>
            <div className="tlist">
              {treatments.map(([name, time, price]) => (
                <div className="trow" key={name}>
                  <span className="nm">{name}</span>
                  <span className="min">{time}</span>
                  <span className="dots" />
                  <span className="rm">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="drinks">
          <SectionHead eyebrow="Drink Barrels" title="Herbal Drinks & Refreshments" />
          <div className="container">
            <div className="minis">
              {[
                ["Fruit Tea Barrel", "A sharing barrel for groups between soaks."],
                ["Herbal Tea", "Warm herbal tea options from the TCM side."],
                ["Dining & Dessert", "Light meals, fruits and ice cream are part of the spa rhythm."],
              ].map(([title, desc]) => (
                <article className="mini-card" key={title}>
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="room">
          <SectionHead eyebrow="Private Rooms" title="Private Room Experience" />
          <div className="container">
            <div className="cards rooms">
              {[
                ["Golf Room", "fac-golf.jpg", "A themed private room for small groups."],
                ["Storm Shower Room", "fac-storm.jpg", "Private shower room booked by the hour."],
              ].map(([title, image, desc]) => (
                <article className="card room" key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={title} />
                  </div>
                  <div className="body">
                    <h3>{title}</h3>
                    <p className="desc">{desc}</p>
                    <a className="btn line wide" href={whatsappHref} target="_blank" rel="noopener">
                      WhatsApp to Book the Room
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="know">
          <SectionHead eyebrow="Good to Know" title="Before You Buy" />
          <div className="container knowwrap">
            <div className="know">
              {[
                "Sunday counts as weekday rate; Fri, Sat and public holidays use weekend rate.",
                "A standard ticket gives up to 12 hours from check-in.",
                "Free rescheduling is available up to 1 day before your visit.",
                "Kids age 12 and under need a Kids Ticket; age 2 and under register free at the front desk.",
                "Show your booking on your phone when you arrive.",
              ].map((item) => (
                <div className="t" key={item}><span className="dia" />{item}</div>
              ))}
            </div>
            <div className="center-cta">
              <a className="btn" href={whatsappHref} target="_blank" rel="noopener">Ask on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
