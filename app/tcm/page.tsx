import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHref,
} from "../site-common";

const tcm = [
  [
    "Full-Body Herbal Meridian Care",
    "tcm-meridian.jpg?osw=0.9.23",
    "72 herbal poultices glide along the meridians with professional technique - you leave warm, loose and light.",
    "RM699",
  ],
  [
    "Moxibustion",
    "tcm-moxa.jpg?osw=0.9.23",
    "Warming moxa therapy that sinks in layer by layer - made for cold hands and feet and lingering chill.",
    "RM199",
  ],
  [
    "Herbal Mud Therapy",
    "tcm-mud.jpg?osw=0.9.23",
    "A warm herbal mud wrap with a gentle enveloping heat - deeply comforting from the first minute.",
    "RM199",
  ],
  [
    "Bone-Setting",
    "tcm-bone.jpg?osw=0.9.23",
    "Traditional bone-setting technique to ease joint tightness and postural fatigue.",
    "RM598",
  ],
  [
    "Women's Intimate Wellness",
    "tcm-intimate.jpg?osw=0.9.23",
    "A private, gentle care ritual for women - dedicated room, female specialists throughout.",
    "Ask on WhatsApp",
  ],
];

export default function TCMPage() {
  return (
    <>
      <Header active="TCM" />
      <main>
        <Hero
          eyebrow="One Spa · TCM"
          title={<>Traditional Chinese Care</>}
          copy="Tui Na, cupping, gua sha and warm recovery routines inside One Spa."
          image="tcm-hero.jpg?osw=0.9.23"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
        </Hero>
        <section>
          <SectionHead
            eyebrow="TCM"
            title="Five traditional treatments, first booked first served"
            sub="Every session is one-on-one; listed prices are what you pay in store. Book ahead on WhatsApp."
          />
          <div className="container">
            <div className="cards service-cards">
              {tcm.map(([title, image, desc, price]) => (
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
                      Book on WhatsApp
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
