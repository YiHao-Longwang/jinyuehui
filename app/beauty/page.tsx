import {
  assetBase,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHref,
} from "../site-common";

const chips = [
  "RM599 with spa ticket included",
  "For men & women",
  "One-on-one specialists",
  "Book ahead on WhatsApp",
];

const lightTreatments = [
  [
    "Photon Skin Brightening",
    "beauty-photon.jpg?osw=0.9.23",
    "Gentle light-based facial care for dullness, rough texture and uneven tone - skin looks clearer and more luminous.",
  ],
  [
    "Spot Care",
    "beauty-spot.jpg?osw=0.9.23",
    "Targeted brightening care for facial pigmentation; plan and pricing set after an in-store skin assessment.",
  ],
  [
    "Ice-Point Hair Removal",
    "beauty-hair.jpg?osw=0.9.23",
    "810nm ice-point technology - low-temperature and gentle on skin; priced by area, with multi-area combinations available.",
  ],
];

const signature = [
  ["What it is", "Start with a soak and steam, then move to the studio: a full-body botanical brightening treatment, with the aqua-glow facial and hand ritual completed while the body mask settles."],
  ["Made for", "Dull or uneven-looking tone, dry dehydrated skin, rough hands - anyone who wants to look one shade fresher before a big occasion."],
  ["Good to know", "Tell your specialist about sensitive skin or recent sun exposure; check with us first if pregnant. Keep up sunscreen and moisturiser for 48 hours after."],
];

const facial = [
  ["What it is", "Deep cleansing, blackhead removal, skin-spatula exfoliation, serum infusion, facial gua sha, ice-hammer soothing and a repair mask."],
  ["Made for", "Clogged pores, visible blackheads, makeup that will not sit right, or skin overdue for a proper deep clean."],
  ["Good to know", "Please reschedule if you have open wounds or an active breakout; go easy on heavy makeup and keep up sunscreen afterwards."],
];

const faqs = [
  ["How does the included spa ticket work?", "The Body Glow & Aqua Package includes a same-day spa ticket: soak and steam first, then head to the studio for your treatments."],
  ["Can men book these treatments?", "Yes. The signature package suits men and women alike, and the light-based treatments are open to everyone after a skin assessment."],
  ["Do I need to book ahead?", "Yes - every session is one-on-one. Message us on WhatsApp to lock in your slot."],
  ["Why is there no price on the light-based treatments?", "Photon brightening, spot care and hair removal are tailored to your skin and area. Your full quote is confirmed at consultation."],
  ["How do I pay?", "These treatments are currently paid in-store. A WhatsApp booking is all you need to hold your slot."],
];

function MiniGrid({ items }: { items: string[][] }) {
  return (
    <div className="minis">
      {items.map(([title, desc]) => (
        <article className="mini-card" key={title}>
          <h3>{title}</h3>
          <p className="desc">{desc}</p>
        </article>
      ))}
    </div>
  );
}

export default function BeautyPage() {
  return (
    <>
      <Header active="Beauty" />
      <main>
        <Hero
          eyebrow="One Spa · Beauty Studio · Kuala Lumpur"
          title={<>The Beauty Studio, now at One Spa</>}
          copy="Launching with the Body Glow & Aqua Package at RM599, spa ticket included - plus photon skin brightening, spot care and ice-point hair removal, all by appointment."
          image="beauty-hero.jpg?osw=0.9.23"
        />

        <div className="chips">
          <div className="container">
            {chips.map((chip) => (
              <span className="c" key={chip}>
                <Diamond />
                {chip}
              </span>
            ))}
          </div>
        </div>

        <section id="beauty-signature">
          <SectionHead
            eyebrow="Signature launch offer"
            title="Body Glow & Aqua Package"
            sub="Three treatments in one visit - body brightening, needle-free aqua-glow facial and hand care - with a same-day spa ticket included."
          />
          <div className="container">
            <MiniGrid items={signature} />
            <div className="deal"><b>RM599</b> · Body brightening + aqua-glow facial + hand care + same-day spa ticket</div>
            <div className="center-cta"><a className="btn" href={whatsappHref} target="_blank" rel="noopener">Book on WhatsApp</a></div>
          </div>
        </section>

        <section id="beauty-light">
          <SectionHead
            eyebrow="Light-based treatments"
            title="Three treatments, tailored after consultation"
            sub="Each is customised to your skin and area - pricing is confirmed at an in-store consultation, with no hidden fees."
          />
          <div className="container">
            <div className="fac-grid">
              {lightTreatments.map(([title, image, desc]) => (
                <article className="fac" key={title}>
                  <div className="ph"><img src={`${assetBase}/${image}`} alt={title} /></div>
                  <div className="fb">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="beauty-facial">
          <SectionHead eyebrow="Deep care" title="Complete Facial Management" sub="A full reset for your face, from deep cleansing to final mask." />
          <div className="container">
            <MiniGrid items={facial} />
            <div className="deal">Pricing and slots on WhatsApp</div>
            <div className="center-cta"><a className="btn" href={whatsappHref} target="_blank" rel="noopener">Ask on WhatsApp</a></div>
          </div>
        </section>

        <section id="beauty-team">
          <SectionHead eyebrow="Your specialists" title="Dedicated beauty specialists, one-on-one" />
          <div className="container">
            <div className="deal text-left">Every treatment is performed one-on-one by resident beauty specialists, with a skin assessment before any light-based treatment.</div>
          </div>
        </section>

        <section id="beauty-faq">
          <SectionHead eyebrow="Before you book" title="Beauty Studio FAQ" />
          <div className="container">
            <div className="faqwrap">
              <div className="faq">
                {faqs.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}<span className="plus" /></summary>
                    <div className="a">{answer}</div>
                  </details>
                ))}
              </div>
              <div className="center-cta faq-cta">
                <p className="fine">Anything else?</p>
                <a className="btn" href={whatsappHref} target="_blank" rel="noopener">Ask us on WhatsApp</a>
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
