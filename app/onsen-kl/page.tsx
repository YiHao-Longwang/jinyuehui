import { FloatingWhatsApp, Footer, Header, Hero, SectionHead } from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Onsen KL | 吉隆坡24小时汤泉SPA · 金悦汇 Indulgence",
  description:
    "金悦汇 Indulgence is a 24-hour onsen-style hot spring and spa in Kuala Lumpur with warm pools, sauna, steam, dining and 12-hour packages.",
  path: "/onsen-kl/",
  keywords: ["onsen KL", "吉隆坡汤泉", "吉隆坡温泉", "金悦汇", "24 hour spa KL"],
});

export default function OnsenKLPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="24-Hour Onsen in KL"
          title={<>A 24-Hour Onsen in Kuala Lumpur</>}
          copy="Soak, sweat, cool off, eat, sleep it off in a lounge - all of it inside a single 12-hour ticket."
          image="hero-onsen-warm.jpg"
        >
          <a className="btn clay" href="/packages/">View Packages</a>
          <a className="btn cream-line" href="/facilities/">See Facilities</a>
        </Hero>
        <section>
          <SectionHead eyebrow="Onsen KL" title="How the 12-Hour Visit Works" />
          <div className="container">
            <div className="combo">
              <div className="row">
                <h4>Come Whenever</h4>
                <p>Check in, get changed, and then soak, steam, eat and rest in whatever order suits you - as many times round as your 12 hours allow.</p>
              </div>
              <div className="row">
                <h4>Hot, Then Steam, Then Cold</h4>
                <p>Herbal pool, steam room or sauna, cold plunge, repeat. That cycle is the whole bathhouse tradition in three steps.</p>
              </div>
              <div className="row">
                <h4>Add Something On</h4>
                <p>Body scrubs and massages can be booked alongside your visit - they are listed on the packages page.</p>
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
