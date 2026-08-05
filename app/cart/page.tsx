import { FloatingWhatsApp, Footer, Header, SectionHead } from "../site-common";

export default function CartPage() {
  return (
    <>
      <Header active="Cart" />
      <main>
        <section id="cart">
          <SectionHead
            eyebrow="Reservation Cart"
            title="Review Your Reservation"
            sub="No online payment. Submit your reservation and pay after the treatment at One Spa."
          />
          <div className="container">
            <div className="cart-shell" data-cart-page data-locale="en">
              <div className="cart-loading">Loading your cart...</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
