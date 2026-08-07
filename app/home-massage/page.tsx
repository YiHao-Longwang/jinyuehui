import {
  assetBase,
  ContactButtons,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Home Massage KL | 吉隆坡上门按摩 · One Spa 南海龙宫",
  description:
    "Book One Spa 南海龙宫 home massage in Kuala Lumpur. KL massage therapists for hotel, condo and home sessions with clear prices and reservation online.",
  path: "/home-massage/",
  keywords: ["吉隆坡上门按摩", "吉隆坡按摩", "klmassage", "home massage KL", "南海龙宫按摩"],
  image: "/assets/outcall-hero.jpg",
});

const chips = [
  "Same therapists as in-store",
  "Linens, towels and oil brought in",
  "Hotel · condo · home",
  "Buy and pay online",
];

const homePlans = [
  {
    code: "outcall-classic",
    title: "Classic 2-Hour Home Massage",
    tag: "Daytime Pick",
    image: "outcall-plan-warm.jpg?osw=0.9.23",
    desc:
      "Oil first to melt the back loose, then traditional Thai to stretch you through - two hours straight, like a full night's sleep.",
    price: "RM699",
    features: [
      "60 min oil massage + 60 min traditional Thai - in that order, on purpose",
      "Start anytime 9:00 AM-10:00 PM - sleepy afternoons and evenings both fit",
      "For the daytime you set aside to properly unwind, at your hotel or home",
      "Earliest online slot is 3 hours from booking; sooner than that, WhatsApp us",
    ],
  },
  {
    code: "outcall-anytime",
    title: "Anytime Hourly Home Massage (2h)",
    tag: "Your Mix",
    image: "outcall-plan-classic.jpg?osw=0.9.23",
    desc:
      "A fixed two-hour session at one clear price - tell us whether you prefer oil, tuina, Thai or foot work; duration is not selected at checkout.",
    price: "RM798",
    features: [
      "Fixed 120 minutes at RM798 flat",
      "Tell us your preferred mix of oil, tuina, Thai or foot work",
      "Bookable round the clock - earliest slot 3 hours from booking",
      "Message us directly for a longer session",
    ],
  },
  {
    code: "outcall-fourhands",
    title: "Four-Hands Indulgence · 2h",
    tag: "Four Hands",
    image: "outcall-plan-duo.jpg?osw=0.9.23",
    desc:
      "Two therapists on you at once - shoulders and legs cared for together. Two hours, four hours of hands-on work.",
    price: "RM1,699",
    night: true,
    features: [
      "Four hands in sync, one guest only",
      "Back and legs at the same time - deeper, faster release",
      "Start daily from 9:00 am to 10:00 pm; one RM100 travel fee covers both therapists",
      "Earliest online slot is 3 hours from booking; sooner than that, WhatsApp us",
    ],
  },
];

const flow = [
  [
    "1 · Pick a package",
    "Choose the package, date and start time on the website, then add it to your cart.",
  ],
  [
    "2 · Pay online",
    "Checkout covers the package price and 8% SST. The travel fee is not charged online.",
  ],
  [
    "3 · Confirm on WhatsApp",
    "After payment, our team confirms the service address, arrival time and the 30km service radius.",
  ],
  [
    "4 · Therapist arrives",
    "Arrives at the confirmed time, lays fresh single-use linens over your own bed, and begins. The RM100 travel fee is paid in cash on arrival.",
  ],
];

const faqs = [
  [
    "How is the total worked out?",
    "Classic is RM699 + 8% SST; Anytime is RM798 + 8% SST; Four-Hands is RM1,699 + 8% SST. The RM100 travel fee is not charged online and is paid in cash on arrival.",
  ],
  [
    "How is my address confirmed after payment?",
    "After payment, our team contacts you on WhatsApp to confirm the service address and arrival time, then checks the 30km radius manually.",
  ],
  [
    "Which areas do you cover?",
    "Within 30km of the store, confirmed manually from your exact address after payment.",
  ],
  [
    "What do I need to prepare - and what does the therapist bring?",
    "Nothing to clear, no furniture to move - just a spot where you can lie flat, undisturbed. Your therapist brings massage oil and fresh single-use linens and towels.",
  ],
  [
    "How soon can someone be here?",
    "The earliest start time you can pick online is 3 hours after booking. Sooner than that? WhatsApp us the address and time you want.",
  ],
  [
    "Late-night bookings?",
    "The Anytime package can be booked at any hour, including 3 a.m. Classic and Four-Hands run start times from 9:00 am to 10:00 pm daily.",
  ],
  [
    "How do I pay?",
    "Pay the package price and 8% SST at checkout or arrange manually through WhatsApp. The RM100 travel fee is paid in cash on arrival.",
  ],
];

export default function HomeMassagePage() {
  return (
    <>
      <div className="osw-outcall">
        <Header active="Home Service" />
        <main>
          <Hero
            eyebrow="One Spa · Home Service · Kuala Lumpur"
            title={
              <>
                Our spa massage,
                <br />
                at your door
              </>
            }
            copy="Our spa therapists, working out of your place instead of ours - hotel, condo or home. They bring the oil and fresh single-use linens and towels, spread them over your own bed, and start. No clearing up beforehand, no furniture to shift. You lie down, that is all."
            image="outcall-hero.jpg?osw=0.9.23"
          >
            <a className="btn clay" href="#outcall-plans">
              Buy Online
            </a>
            <ContactButtons className="hero-contact-pair" whatsappLabel="Questions? WhatsApp us" />
          </Hero>

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

          <section id="outcall-plans">
            <SectionHead
              eyebrow="Packages & Prices"
              title="Three packages, priced upfront"
              sub="What you see is what you pay. Only 8% SST is added - there is no service charge. Within 30km, the RM100 travel fee is settled in cash when the therapist arrives."
            />
            <div className="container">
              <div className="cards">
                {homePlans.map((plan) => (
                  <article className={`card${plan.night ? " night" : ""}`} key={plan.title}>
                    <div className="ph">
                      <img src={`${assetBase}/${plan.image}`} alt={plan.title} />
                    </div>
                    <div className="body">
                      <div className="tagrow">
                        <span className={`tag${plan.night ? " hot" : ""}`}>{plan.tag}</span>
                      </div>
                      <h3>{plan.title}</h3>
                      <p className="desc">{plan.desc}</p>
                      <div className="grow">
                        <div className="price">
                          <span className="rm">{plan.price}</span>
                        </div>
                        <p className="taxnote">
                          Prices are subject to 8% SST only - no service charge. RM100 travel fee
                          is paid in cash on arrival.
                        </p>
                        <ul className="feat">
                          {plan.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="btnrow outcall-actions">
                        <button className="btn" type="button" data-book={plan.code}>
                          Buy Online · {plan.price}
                        </button>
                        <ContactButtons className="outcall-contact-pair" whatsappLabel="Ask on WhatsApp" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <p className="fine">
                Prices are subject to 8% SST only - no service charge. The RM100 travel fee within
                30km is paid in cash on arrival.
              </p>
            </div>
          </section>

          <section id="outcall-flow">
            <SectionHead eyebrow="Purchase Flow" title="Pay online, then confirm by WhatsApp" />
            <div className="container">
              <div className="minis">
                {flow.map(([title, desc]) => (
                  <article className="mini-card" key={title}>
                    <h3>{title}</h3>
                    <p className="desc">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="outcall-faq">
            <SectionHead eyebrow="Before you book" title="Home service FAQ" />
            <div className="container">
              <div className="faqwrap">
                <div className="faq">
                  {faqs.map(([question, answer]) => (
                    <details key={question}>
                      <summary>
                        {question}
                        <span className="plus" />
                      </summary>
                      <div className="a">{answer}</div>
                    </details>
                  ))}
                </div>
                <div className="center-cta faq-cta">
                  <p className="fine">Anything else?</p>
                  <ContactButtons whatsappLabel="Ask on WhatsApp" />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}
