import { FloatingWhatsApp, Footer, Header, SectionHead, telegramHrefCn } from "../../site-common";

export default function CartPageCn() {
  return (
    <>
      <Header active="Cart" locale="cn" />
      <main>
        <section id="cart">
          <SectionHead
            eyebrow="预约购物车"
            title="确认你的预约"
            sub="无需线上付款。提交预约后，到店完成护理后付款。"
          />
          <div className="container">
            <div className="cart-shell" data-cart-page data-locale="cn">
              <div className="cart-loading">正在读取购物车...</div>
            </div>
          </div>
        </section>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ONE_SPA_TELEGRAM_URL=${JSON.stringify(telegramHrefCn)};`,
        }}
      />
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}
