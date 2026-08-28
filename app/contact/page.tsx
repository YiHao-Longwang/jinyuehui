import {
  ContactButtons,
  FloatingWhatsApp,
  Footer,
  Header,
  SectionHead,
  telegramDisplay,
  telegramHref,
  whatsappHref,
  whatsappNumberDisplay,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Contact 金悦汇 Indulgence | 吉隆坡SPA Viva Home Mall",
  description:
    "Contact 金悦汇 Indulgence at Level 2, Viva Home Mall Kuala Lumpur. Open 24 hours for KL spa, massage, hot spring and wellness reservations.",
  path: "/contact/",
  keywords: ["金悦汇地址", "金悦汇 Indulgence contact", "吉隆坡SPA地址", "Viva Home Mall spa", "KL massage contact"],
});

const visitNotes: [string, string][] = [
  [
    "Where we are",
    "Level 2, Viva Home Mall, 85 Jalan Loke Yew, Taman Miharja, 52200 Kuala Lumpur - on the Cheras side of KL, a short drive from Bukit Bintang and KLCC.",
  ],
  ["Opening hours", "Open 24 hours a day, every day of the year, including weekends and public holidays."],
  ["Parking", "Park at Viva Home Mall and take the lift to Level 2. Grab and taxi drop-off is at the main mall entrance."],
  [
    "How to book",
    "Pick a package and date online and pay, or message us on WhatsApp. Book at least 1 hour ahead, then show your order at the front desk on arrival.",
  ],
  [
    "What your ticket covers",
    "A 12-hour stay from check-in with the hot spring pools, steam room, sauna, rest lounges and dining areas included. Towels and basic bathing wear are provided.",
  ],
  ["Massage and treatments", "Massage, body scrub, beauty and TCM sessions are booked on top of entry, or bundled into a package - prices are listed on each page."],
  ["Changes and refunds", "Reschedule free of charge up to 1 day before your visit via WhatsApp. Eligible refunds go back to the original payment method."],
];

export default function ContactPage() {
  return (
    <>
      <Header active="Contact" />
      <main>
        <section id="contact">
          <SectionHead eyebrow="金悦汇 Indulgence · Contact" title="Come See Us" />
          <div className="container">
            <div className="cinfo-wrap">
              <div className="cinfo">
                <span className="ck">Address</span>
                <span className="cv">
                  Lot No. 2-69 & 2-70, Level 2, Viva Home Mall, 85, Jalan Loke
                  Yew, Taman Miharja, 52200 Kuala Lumpur
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
                    {whatsappNumberDisplay} (tap to chat)
                  </a>
                </span>
              </div>
              <div className="cinfo">
                <span className="ck">Telegram</span>
                <span className="cv">
                  <a href={telegramHref} target="_blank" rel="noopener">
                    {telegramDisplay} (tap to chat)
                  </a>
                </span>
              </div>
            </div>
            <ContactButtons className="contact-page-pair" />
            <div className="btnrow contact-actions">
              <a
                className="btn"
                href="https://www.google.com/maps/search/?api=1&query=%E9%87%91%E6%82%A6%E6%B1%87%20Indulgence&query_place_id=ChIJEa1Xrew3zDEROXX0qPz4IdA"
                target="_blank"
                rel="noopener"
              >
                Open in Google Maps
              </a>
              <a
                className="btn line"
                href="https://waze.com/ul?q=%E9%87%91%E6%82%A6%E6%B1%87%20Indulgence%20Viva%20Home%20Mall"
                target="_blank"
                rel="noopener"
              >
                Open in Waze
              </a>
            </div>
            <div className="deal contact-note">
              <b>Our Only Outlet</b> - 金悦汇 Indulgence has just this one location - Level 2,
              Viva Home Mall, Taman Miharja, Kuala Lumpur. We have no branches;
              please navigate to the address above.
            </div>
          </div>
        </section>

        <section id="visit">
          <SectionHead
            eyebrow="Planning Your Visit"
            title="Getting to 金悦汇 Indulgence Kuala Lumpur"
            sub="Hours, parking, booking steps and what your ticket covers."
          />
          <div className="container">
            <div className="knowwrap">
              <div className="know">
                {visitNotes.map(([head, body]) => (
                  <div className="t" key={head}>
                    <span className="dia" />
                    <b>{head}</b>: {body}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
