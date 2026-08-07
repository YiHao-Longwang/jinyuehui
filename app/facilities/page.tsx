import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "One Spa Facilities | 吉隆坡SPA娱乐设施 · 南海龙宫",
  description:
    "Explore One Spa 南海龙宫 facilities at Viva Home Mall KL: hot spring pools, sauna, steam room, massage rooms, scrub room, lounge, dining and private rooms.",
  path: "/facilities/",
  keywords: ["吉隆坡娱乐", "吉隆坡SPA设施", "南海龙宫设施", "KL entertainment", "KL spa facilities"],
  image: "/assets/fac-hero-immersive.jpg",
});

const facilities = [
  ["Fire & Ice Pools", "fac-icefire.jpg?osw=0.9.23", "The icy pool sits at 13°C, the herbal pool at 43°C - alternate between them under the starlit ceiling and walk out completely refreshed."],
  ["Salt-Crystal Steam Room", "fac-steam.jpg?osw=0.9.23", "A salt-crystal steam room in warm light - sit back, sweat it out, circulate better."],
  ["Massage Rooms", "fac-massage.jpg?osw=0.9.23", "Private massage rooms with three beds - family and friends can share a room. Tui Na, Thai, aroma oil and more: 20 treatments arranged here."],
  ["Yangzhou Body Scrub", "fac-scrub.jpg?osw=0.9.23", "A dedicated scrub room with the Yangzhou craft written on its walls - scrub away the day, as a single treatment or a scrub-plus-entry package."],
  ["Movie & Rest Lounge", "fac-movie.jpg?osw=0.9.23", "The screening hall joins the rest lounge, with a headset for every seat - watch your film or sleep in peace; overnight guests usually settle here."],
  ["Immersive Light Walk", "fac-immersive.jpg?osw=0.9.23", "A starlit light corridor - drift through after your soak, and take a photo while you are at it."],
  ["Foot Bath Room", "fac-recliner.jpg?osw=0.9.23", "A recliner room made for foot work - foot therapy and grooming happen here; power recliners tilt right back for a nap after."],
  ["Salt-Stone Sweat Room", "fac-onsen.jpg?osw=0.9.23", "Lie back on warmed salt-stone beds ringed by glowing salt bricks, and let the heat slowly work through you - best right before or after a soak."],
  ["Treatment Rooms", "fac-treatment.jpg?osw=0.9.23", "Deeper rituals - hot-stone detox, French indulgence, Five Elements - are arranged in these dedicated treatment rooms. See the packages page for treatments and prices."],
  ["Yihe Private Dining Room", "fac-vip.jpg?osw=0.9.23", "Book the Yihe room for a proper gathering - order signature dishes a la carte around one big table. Reservation required."],
  ["Golf Theme Room", "fac-golf.jpg?osw=0.9.23", "A golf-themed private room, from RM99/hour per room - bookable directly."],
  ["Changing Room", "fac-locker.jpg?osw=0.9.23", "A lockable locker for every guest and wide benches - settle in comfortably before your soak."],
  ["Grooming & Wash Area", "fac-grooming.jpg?osw=0.9.23", "Wash stations and vanity seating - freshen up properly after steam and soak, and step out feeling crisp."],
  ["Dining Hall", "fac-dining.jpg?osw=0.9.23", "Dinner buffet 6-9pm, light meals at other hours; fruits and ice cream on hand."],
];

export default function FacilitiesPage() {
  return (
    <>
      <Header active="Facilities" />
      <main>
        <Hero
          eyebrow="One Spa · Facilities"
          title={<>One-Stop Hot-Spring Retreat</>}
          copy="One ticket covers pools, steam, sauna, lounges, the movie area and dining - a full 12-hour stay."
          image="fac-hero-immersive.jpg?osw=0.9.23"
        />

        <section id="facilities">
          <div className="container fac-page-grid">
            <div className="fac-grid">
              {facilities.map(([title, image, copy], index) => (
                <article className={`fac${index === 0 ? " lead" : ""}`} key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={title} />
                  </div>
                  <div className="fb">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    {["Massage Rooms", "Yangzhou Body Scrub", "Foot Bath Room", "Treatment Rooms"].includes(title) ? (
                      <a className="more" href="/packages/#treatments">
                        See Treatments & Prices &rsaquo;
                      </a>
                    ) : null}
                    {title === "Golf Theme Room" ? (
                      <a className="more" href="/packages/#room">
                        See room rates &rsaquo;
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="treatments-teaser">
          <SectionHead
            eyebrow="Treatments"
            title="20 Massage & Care Treatments"
            sub="Foot therapy, ear spa, cupping, gua sha and our signature rituals - every price listed openly on the packages page."
          />
          <div className="center-cta">
            <a className="btn line" href="/packages/#treatments">
              See Treatments & Prices
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
