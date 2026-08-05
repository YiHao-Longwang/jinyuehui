import { FloatingWhatsApp, Footer, Header, SectionHead } from "../site-common";

export default function CancellationPage() {
  return (
    <>
      <Header />
      <main>
        <SectionHead eyebrow="Policy" title="Cancellation & Rescheduling" />
        <div className="container prose">
          <div className="pblock"><h3>Rescheduling</h3><p>Free rescheduling is available up to 1 day before your visit via WhatsApp.</p></div>
          <div className="pblock"><h3>Refunds</h3><p>Message the team with your order details. Approved refunds are returned to the original payment method.</p></div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
