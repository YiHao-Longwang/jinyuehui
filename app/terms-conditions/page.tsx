import { FloatingWhatsApp, Footer, Header, SectionHead } from "../site-common";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <SectionHead eyebrow="Policy" title="Terms & Conditions" />
        <div className="container prose">
          <div className="pblock"><h3>Tickets</h3><p>Tickets and packages are valid for the selected visit date and time. A standard ticket gives up to 12 hours inside.</p></div>
          <div className="pblock"><h3>Arrival</h3><p>Show your booking on your phone at the front desk. House rules and safety guidance apply inside the spa.</p></div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
