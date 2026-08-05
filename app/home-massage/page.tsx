import { FloatingWhatsApp, Footer, Header, Hero, SectionHead, whatsappHref } from "../site-common";

export default function HomeMassagePage() {
  return (
    <>
      <Header active="Home Service" />
      <main>
        <Hero
          eyebrow="One Spa · Home Service"
          title={<>Home Massage Service</>}
          copy="Book a therapist to your place for a private two-hour massage session. The team confirms address and timing by WhatsApp."
          image="img-daytime.jpg"
        >
          <a className="btn clay" href={whatsappHref} target="_blank" rel="noopener">
            WhatsApp to Book
          </a>
        </Hero>
        <section>
          <SectionHead eyebrow="Outcall" title="Massage at Your Address" />
          <div className="container">
            <div className="cards">
              {[
                ["Classic Home Massage", "2-hour session", "RM699"],
                ["Anytime Home Massage", "2-hour session", "RM798"],
                ["Four Hands Home Massage", "2 therapists · 2-hour session", "RM1699"],
              ].map(([title, desc, price]) => (
                <article className="mini-card" key={title}>
                  <h3>{title}</h3>
                  <p className="desc">{desc}</p>
                  <div className="price"><span className="rm">{price}</span></div>
                  <a className="btn sm line" href={whatsappHref} target="_blank" rel="noopener">Book</a>
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
