import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHref,
} from "../site-common";

const beauty = [
  [
    "Photon Skin Brightening",
    "beauty-photon.jpg?osw=0.9.23",
    "A focused brightening treatment for dullness and tired-looking skin.",
    "Ask on WhatsApp",
  ],
  [
    "Spot Care",
    "beauty-spot.jpg?osw=0.9.23",
    "Targeted care for visible spots and uneven-looking areas.",
    "Ask on WhatsApp",
  ],
  [
    "Ice-Point Hair Removal",
    "beauty-hair.jpg?osw=0.9.23",
    "Cooling hair-removal care arranged by the Beauty Studio team.",
    "Ask on WhatsApp",
  ],
];

export default function BeautyPage() {
  return (
    <>
      <Header active="Beauty" />
      <main>
        <Hero
          eyebrow="One Spa · Beauty"
          title={<>The Beauty Studio, now at One Spa</>}
          copy="Body glow, aqua care, brightening, spot care and ice-point hair removal inside the same warm 24-hour spa environment."
          image="beauty-hero.jpg?osw=0.9.23"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
        </Hero>
        <section>
          <SectionHead
            eyebrow="Beauty"
            title="Beauty Studio Highlights"
            sub="Care treatments are arranged by WhatsApp so the team can match the session to your skin and timing."
          />
          <div className="container">
            <div className="cards service-cards">
              {beauty.map(([title, image, desc, price]) => (
                <article className="card service-card" key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={title} />
                  </div>
                  <div className="body">
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                    <div className="price">
                      <span className="rm">{price}</span>
                    </div>
                    <a className="btn sm line" href={whatsappHref} target="_blank" rel="noopener">
                      Ask Price
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
