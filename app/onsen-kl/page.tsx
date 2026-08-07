import { FloatingWhatsApp, Footer, Header, Hero, SectionHead } from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Onsen KL | 吉隆坡24小时汤泉SPA · One Spa 南海龙宫",
  description:
    "One Spa 南海龙宫 is a 24-hour onsen-style hot spring and spa in Kuala Lumpur with warm pools, sauna, steam, dining and 12-hour packages.",
  path: "/onsen-kl/",
  keywords: ["onsen KL", "吉隆坡汤泉", "吉隆坡温泉", "南海龙宫", "24 hour spa KL"],
});

export default function OnsenKLPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="24-Hour Onsen in KL"
          title={<>Warm Spring Retreat in Kuala Lumpur</>}
          copy="Pools, steam, sauna, dining and rest lounges in one 12-hour ticket."
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
                <h4>Arrive Any Time</h4>
                <p>Check in, change, soak, steam, eat, rest and repeat within your 12-hour stay.</p>
              </div>
              <div className="row">
                <h4>Hot, Steam, Cold</h4>
                <p>Alternate herbal pool, steam or sauna, and cold plunge for the bathhouse routine.</p>
              </div>
              <div className="row">
                <h4>Add Treatments</h4>
                <p>Body scrub and massage treatments are available from the packages page.</p>
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
