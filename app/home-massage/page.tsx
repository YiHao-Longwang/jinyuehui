import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHref,
} from "../site-common";

const homePlans = [
  [
    "Classic 2-Hour Home Massage",
    "outcall-plan-warm.jpg?osw=0.9.23",
    "Warm, steady two-hour session with travel arranged after booking.",
    "RM699",
  ],
  [
    "Anytime Hourly Home Massage (2h)",
    "outcall-plan-classic.jpg?osw=0.9.23",
    "A flexible two-hour home session, including late-night timing by arrangement.",
    "RM798",
  ],
  [
    "Four-Hands Indulgence · 2h",
    "outcall-plan-duo.jpg?osw=0.9.23",
    "Two therapists working in sync on one guest for deeper, faster release.",
    "RM1699",
  ],
];

export default function HomeMassagePage() {
  return (
    <>
      <Header active="Home Service" />
      <main>
        <Hero
          eyebrow="One Spa · Home Service"
          title={<>Home Massage in Kuala Lumpur</>}
          copy="Book a therapist to your place for a private two-hour massage session. The team confirms address and timing by WhatsApp."
          image="outcall-hero.jpg?osw=0.9.23"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">
            WhatsApp to Book
          </a>
        </Hero>
        <section>
          <SectionHead eyebrow="Outcall" title="Massage at Your Address" />
          <div className="container">
            <div className="cards service-cards">
              {homePlans.map(([title, image, desc, price]) => (
                <article className="card service-card" key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={title} />
                  </div>
                  <div className="body">
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                    <div className="price"><span className="rm">{price}</span></div>
                    <a className="btn sm line" href={whatsappHref} target="_blank" rel="noopener">
                      Ask us on WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
