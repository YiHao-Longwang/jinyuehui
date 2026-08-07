import { FloatingWhatsApp, Footer, Header, SectionHead, telegramHref, whatsappCartBase } from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Reservation Cart | One Spa 南海龙宫",
  description: "Review your One Spa reservation cart.",
  path: "/cart/",
  noIndex: true,
});

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
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ONE_SPA_TELEGRAM_URL=${JSON.stringify(telegramHref)};window.ONE_SPA_WHATSAPP_URL=${JSON.stringify(whatsappCartBase)};`,
        }}
      />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
