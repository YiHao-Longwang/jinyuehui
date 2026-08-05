import { FloatingWhatsApp, Footer, Header, Hero } from "../site-common";

export default function ChinesePage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="壹号汤泉 · 吉隆坡 · 24小时营业"
          title={<>给自己 12 小时<br />泡进暖汤里</>}
          copy="温泉池、蒸房、桑拿、按摩与餐饮，一张票可停留 12 小时。"
          image="hero-onsen-warm.jpg"
        >
          <a className="btn clay" href="/packages/">查看配套</a>
          <a className="btn cream-line" href="/facilities/">查看设施</a>
        </Hero>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
