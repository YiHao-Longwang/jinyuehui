import {
  assetBase,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
} from "../site-common";

const facilities = [
  ["Fire & Ice Pools", "fac-icefire.jpg", "The icy pool sits at 13°C, the herbal pool at 43°C - alternate between them under the starlit ceiling."],
  ["Salt-Crystal Steam Room", "fac-steam.jpg", "A salt-crystal steam room in warm light - sit back, sweat it out and circulate better."],
  ["Massage Rooms", "fac-massage.jpg", "Private massage rooms with three beds for friends and family."],
  ["Yangzhou Body Scrub", "fac-scrub.jpg", "A dedicated scrub room for the Yangzhou body-scrub craft."],
  ["Movie & Rest Lounge", "fac-movie.jpg", "A screening hall joined to the rest lounge, with a headset for every seat."],
  ["Immersive Light Walk", "fac-immersive.jpg", "A starlit light corridor for a slow walk and photos after soaking."],
  ["Foot Bath Room", "fac-recliner.jpg", "Power recliners made for foot work, grooming and a nap after."],
  ["Salt-Stone Sweat Room", "fac-onsen.jpg", "Warm stone, gentle heat and a slower sweat routine."],
  ["Treatment Rooms", "fac-treatment.jpg", "Care rooms for spa rituals, massage and beauty treatments."],
  ["Yihe Private Dining Room", "fac-vip.jpg", "A private dining room for group visits and celebrations."],
  ["Golf Theme Room", "fac-golf.jpg", "A private room with a golf theme for small groups."],
  ["Changing Room", "fac-locker.jpg", "Lockers, changing areas and bath preparation spaces."],
  ["Grooming & Wash Area", "fac-grooming.jpg", "Clean-up and grooming stations before leaving."],
  ["Dining Hall", "fac-dining.jpg", "Buffet dining included with the main 12-hour spa tickets."],
];

export default function FacilitiesPage() {
  return (
    <>
      <Header active="Facilities" />
      <main>
        <Hero
          eyebrow="One Spa · Facilities"
          title={<>Hot Springs, Sauna & 24H Lounge</>}
          copy="A one-stop hot-spring retreat with pools, steam, sauna, massage rooms, dining and rest lounges."
          image="fac-hero-immersive.jpg?osw=0.9.23"
        >
          <a className="btn clay" href="/packages/">
            View Packages
          </a>
        </Hero>

        <section id="facilities">
          <SectionHead eyebrow="What's Inside" title="One-Stop Hot-Spring Retreat" />
          <div className="container">
            <div className="fac-grid">
              {facilities.map(([title, image, copy], index) => (
                <article className={`fac${index === 0 ? " lead" : ""}`} key={title}>
                  <div className="ph">
                    <img src={`${assetBase}/${image}`} alt={title} />
                  </div>
                  <div className="fb">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    {["Massage Rooms", "Yangzhou Body Scrub", "Foot Bath Room"].includes(title) ? (
                      <a className="more" href="/packages/#treatments">
                        See Treatments & Prices &rsaquo;
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
            <div className="center-cta">
              <a className="btn" href="/packages/">
                View Packages
              </a>
            </div>
          </div>
        </section>

        <section id="treatments-teaser">
          <SectionHead
            eyebrow="Treatment Menu"
            title="20 Massage & Care Treatments"
            sub="Foot therapy, ear spa, cupping, gua sha and signature rituals are listed openly on the packages page."
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
