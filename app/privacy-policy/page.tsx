import { FloatingWhatsApp, Footer, Header, SectionHead } from "../site-common";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <SectionHead eyebrow="Policy" title="Privacy Policy" />
        <div className="container prose">
          <div className="pblock"><h3>Booking Information</h3><p>Customer details are used to manage bookings, answer questions and support visit changes.</p></div>
          <div className="pblock"><h3>Contact</h3><p>For privacy or booking questions, contact the team through WhatsApp.</p></div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
