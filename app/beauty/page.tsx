import { FloatingWhatsApp, Footer, Header, Hero, SectionHead, whatsappHref } from "../site-common";

const beauty = [
  ["Hydrating Facial", "Cleanse, massage, mask and glow finish."],
  ["Body Care", "Warm room body care for a slower spa-day routine."],
  ["Grooming", "Wash, preparation and refresh before leaving."],
];

export default function BeautyPage() {
  return (
    <>
      <Header active="Beauty" />
      <main>
        <Hero
          eyebrow="One Spa · Beauty"
          title={<>Beauty & Care</>}
          copy="Beauty treatments and body-care rituals inside the same warm 24-hour spa environment."
          image="fac-treatment.jpg?osw=0.9.23"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
        </Hero>
        <section>
          <SectionHead eyebrow="Beauty" title="Treatment Highlights" />
          <div className="container">
            <div className="minis">
              {beauty.map(([title, desc]) => (
                <article className="mini-card" key={title}>
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                  <a className="btn sm line" href={whatsappHref} target="_blank" rel="noopener">Ask Price</a>
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
