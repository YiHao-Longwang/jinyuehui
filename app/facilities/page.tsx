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
  title: "金悦汇 Indulgence Facilities | 吉隆坡SPA娱乐设施 · 金悦汇",
  description:
    "Explore 金悦汇 Indulgence facilities at Viva Home Mall KL: hot spring pools, sauna, steam room, massage rooms, scrub room, lounge, dining and private rooms.",
  path: "/facilities/",
  keywords: ["吉隆坡娱乐", "吉隆坡SPA设施", "金悦汇设施", "KL entertainment", "KL spa facilities"],
  image: "/assets/fac-hero-immersive.jpg",
});

const facilities = [
  ["Fire & Ice Pools", "fac-icefire.jpg?osw=0.9.23", "Drop into the 13°C plunge, then back into the 43°C herbal pool, over and over beneath a ceiling of false stars. You leave wide awake."],
  ["Salt-Crystal Steam Room", "fac-steam.jpg?osw=0.9.23", "Walls of salt crystal, low amber light, and enough heat to sweat the week out of you."],
  ["Massage Rooms", "fac-massage.jpg?osw=0.9.23", "Three beds to a room, so nobody has to be separated from their group. Twenty treatments run out of these rooms - Tui Na, Thai, aroma oil and the rest."],
  ["Yangzhou Body Scrub", "fac-scrub.jpg?osw=0.9.23", "A room built for one thing: the Yangzhou scrub, its history painted across the walls. Book it on its own or bundled with entry."],
  ["Movie & Rest Lounge", "fac-movie.jpg?osw=0.9.23", "Screening hall and rest lounge share a space, and every seat has its own headset - so one guest watches a film while the next one sleeps through it. This is where the overnight crowd ends up."],
  ["Immersive Light Walk", "fac-immersive.jpg?osw=0.9.23", "A corridor of drifting light to wander through after your soak. Most people stop halfway for a photo."],
  ["Foot Bath Room", "fac-recliner.jpg?osw=0.9.23", "The room where feet get looked after - foot therapy and grooming both. The recliners go all the way flat when you would rather nap than talk."],
  ["Salt-Stone Sweat Room", "fac-onsen.jpg?osw=0.9.23", "Warmed salt-stone beds inside a ring of glowing salt brick. The heat takes its time getting through you, which is why it works best either side of a soak."],
  ["Treatment Rooms", "fac-treatment.jpg?osw=0.9.23", "The longer rituals happen in here - hot-stone detox, French indulgence, Five Elements. Treatments and prices are set out on the packages page."],
  ["Yihe Private Dining Room", "fac-vip.jpg?osw=0.9.23", "For a proper sit-down, take the Yihe room: one large table, signature dishes ordered a la carte. It has to be reserved in advance."],
  ["Golf Theme Room", "fac-golf.jpg?osw=0.9.23", "A private room done out in golf, from RM99 an hour for the room. Book it straight through us."],
  ["Changing Room", "fac-locker.jpg?osw=0.9.23", "Everyone gets a locker that locks, and the benches are wide enough to get changed without knocking elbows."],
  ["Grooming & Wash Area", "fac-grooming.jpg?osw=0.9.23", "Wash stations and seated vanities, so you can put yourself back together after the heat and walk out looking it."],
  ["Dining Hall", "fac-dining.jpg?osw=0.9.23", "The buffet runs 6 to 9pm; outside those hours there are lighter dishes, with fruit and ice cream always out."],
];

export default function FacilitiesPage() {
  return (
    <>
      <Header active="Facilities" />
      <main>
        <Hero
          eyebrow="金悦汇 Indulgence · Facilities"
          title={<>Everything Inside 金悦汇 Indulgence KL</>}
          copy="Pools, steam room, saunas, the lounges, the screening area, the food - one ticket covers all of it, for twelve hours."
          image="fac-hero-immersive.jpg?osw=0.9.23"
        />

        <section id="facilities">
          <div className="container fac-page-grid">
            <div className="fac-grid">
              {facilities.map(([title, image, copy], index) => (
                <article className={`fac${index === 0 ? " lead" : ""}`} key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={`${title} - 金悦汇 Indulgence, Kuala Lumpur`} />
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
            sub="Foot therapy, ear spa, cupping, gua sha and the signature rituals. Every price is written out on the packages page."
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
