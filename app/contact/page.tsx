import {
  ContactButtons,
  FloatingWhatsApp,
  Footer,
  Header,
  SectionHead,
  telegramHref,
  whatsappHref,
} from "../site-common";

export default function ContactPage() {
  return (
    <>
      <Header active="Contact" />
      <main>
        <section id="contact">
          <SectionHead eyebrow="One Spa · Contact" title="Come See Us" />
          <div className="container">
            <div className="cinfo-wrap">
              <div className="cinfo">
                <span className="ck">Address</span>
                <span className="cv">
                  Lot No. 2-53 & 2-56, Level 2, Viva Home Mall, 85, Jalan Loke
                  Yew, Taman Miharja, 55200 Kuala Lumpur
                </span>
              </div>
              <div className="cinfo">
                <span className="ck">Hours</span>
                <span className="cv">Open 24 hours, every day</span>
              </div>
              <div className="cinfo">
                <span className="ck">WhatsApp</span>
                <span className="cv">
                  <a href={whatsappHref} target="_blank" rel="noopener">
                    +60 12-670 2560 (tap to chat)
                  </a>
                </span>
              </div>
              <div className="cinfo">
                <span className="ck">Telegram</span>
                <span className="cv">
                  <a href={telegramHref} target="_blank" rel="noopener">
                    @onespaofficial (tap to chat)
                  </a>
                </span>
              </div>
            </div>
            <ContactButtons className="contact-page-pair" />
            <div className="btnrow contact-actions">
              <a
                className="btn"
                href="https://www.google.com/maps/search/?api=1&query=One%20Spa%20%E5%A3%B9%E5%8F%B7%E6%B1%A4%E6%B3%89&query_place_id=ChIJEa1Xrew3zDEROXX0qPz4IdA"
                target="_blank"
                rel="noopener"
              >
                Open in Google Maps
              </a>
              <a
                className="btn line"
                href="https://waze.com/ul?q=One%20Spa%20Viva%20Home%20Mall"
                target="_blank"
                rel="noopener"
              >
                Open in Waze
              </a>
            </div>
            <div className="deal contact-note">
              <b>Our Only Outlet</b> - One Spa has just this one location - Level 2,
              Viva Home Mall, Taman Miharja, Kuala Lumpur. We have no branches;
              please navigate to the address above.
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
