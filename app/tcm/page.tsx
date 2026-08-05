import { FloatingWhatsApp, Footer, Header, Hero, SectionHead, whatsappHref } from "../site-common";

const tcm = [
  ["Tui Na Chinese Massage", "Pressure-point bodywork for tired shoulders, back and legs."],
  ["Cupping", "Traditional cupping support arranged by trained therapists."],
  ["Gua Sha", "Scraping therapy for a stronger traditional-care routine."],
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
          image="fac-massage.jpg"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">WhatsApp Us</a>
        </Hero>
        <section>
          <SectionHead eyebrow="TCM" title="Care Menu" />
          <div className="container">
            <div className="minis">
              {tcm.map(([title, desc]) => (
                <article className="mini-card" key={title}>
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                  <a className="btn sm line" href="/packages/#treatments">See Treatments</a>
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
