import {
  assetBase,
  ContactButtons,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "TCM Wellness KL | 吉隆坡中医调理 · One Spa 南海龙宫",
  description:
    "One Spa 南海龙宫 TCM wellness in Kuala Lumpur: pulse reading, moxibustion, herbal mud therapy, bone-setting and meridian care with listed prices.",
  path: "/tcm/",
  keywords: ["吉隆坡中医", "吉隆坡SPA", "中医按摩KL", "南海龙宫中医", "TCM KL"],
  image: "/assets/tcm-hero.jpg",
});

const chips = [
  "Free TCM pulse reading",
  "Resident physicians",
  "One-on-one specialists",
  "Book ahead on WhatsApp",
];

const treatments = [
  [
    "Full-Body Herbal Meridian Care",
    "tcm-meridian.jpg?osw=0.9.23",
    "72 herbal poultices glide along the meridians with professional technique - you leave warm, loose and light.",
    "RM699",
  ],
  [
    "Moxibustion",
    "tcm-moxa.jpg?osw=0.9.23",
    "Warming moxa therapy that sinks in layer by layer - made for cold hands and feet and that lingering chill.",
    "RM199",
  ],
  [
    "Herbal Mud Therapy",
    "tcm-mud.jpg?osw=0.9.23",
    "A warm herbal mud wrap with a gentle enveloping heat - deeply comforting from the first minute.",
    "RM199",
  ],
  [
    "Bone-Setting",
    "tcm-bone.jpg?osw=0.9.23",
    "Traditional bone-setting technique to ease joint tightness and postural fatigue, after a TCM physician assessment.",
    "RM598",
  ],
  [
    "Women's Intimate Wellness",
    "tcm-intimate.jpg?osw=0.9.23",
    "A private, gentle care ritual for women - dedicated room, female specialists throughout.",
    "",
  ],
];

const specialties = [
  ["01 · Moxibustion / Herbal Mud Moxibustion · 艾灸 / 泥灸 · RM199 · 每项", "温经散寒，行气通络，扶阳固本，适合寒湿性体质"],
  ["02 · Full-Body Herbal Meridian Care · 全身经络药拓调理 · RM699 · 特价", "72种中草药药包配合专业技法疏通经络，进行全身舒缓养护"],
  ["03 · Traditional Bone Setting · 中医正骨调理 · RM598", "经中医师评估，调理筋骨关节，改善疼痛"],
  ["04 · Herbal Fascia Care · 药液筋膜松解（肩颈腰背） · RM499", "针对肩颈、腰背筋膜紧绷、酸麻胀痛进行专项调理"],
  ["05 · Posture & Upper-Back Care · 体态与富贵包调理 · RM499", "驼背、圆肩、高低肩、富贵包及肩背体态调理"],
  ["06 · Collateral Pricking · 刺络 · RM338", "减轻局部组织压力，疏通经络，调和气血，改善不适"],
  ["07 · Acupuncture · 针灸 · RM598", "刺激穴位，缓解疼痛，改善功能失调，促进自我修复"],
  ["08 · Acupotomy · 小针刀 · RM878", "用于松解慢性软组织黏连，针对肌肉骨骼疼痛进行松解调理"],
];

const physician = [
  ["Acupuncture · RM598", "Fine-needle stimulation of meridian points, selected by the physician for your condition."],
  ["Acupotomy · RM878", "Deep release work for stubborn strain and adhesions, performed one-on-one after assessment."],
  ["Collateral Pricking · RM338", "Traditional therapy for localised stagnation, soreness and heaviness."],
];

const infoBlocks = {
  meridian: [
    ["What it is", "Seventy-two herbal poultices are heated, then pressed, rolled and glided along the meridians."],
    ["Made for", "Long days sitting or standing, tight shoulders and lower back, cold hands and feet, or a heavy blocked feeling."],
    ["Good to know", "This is a relaxation and wellness session, not medical treatment. Let us know in advance about pregnancy, high blood pressure or heart conditions."],
  ],
  intimate: [
    ["What it is", "A gentle intimate-care ritual centred on cleansing, nourishing and relaxation, one-on-one in a private room."],
    ["Made for", "Postpartum recovery care, everyday dryness or discomfort, or staying on top of intimate wellness."],
    ["Good to know", "Avoid period days; not available during pregnancy. For ongoing symptoms, see a doctor first."],
  ],
};

const faqs = [
  ["Do I need to book ahead?", "Yes. Every session is one-on-one - message us on WhatsApp to lock in your slot."],
  ["Is the pulse reading really free?", "Yes - the assessment is free with no obligation. After it, we explain what suits you and what it costs."],
  ["Are the listed prices final?", "Yes. Listed prices match the in-store menu and are paid in store, with your total confirmed before anything starts."],
  ["Who performs acupuncture and acupotomy?", "Our TCM physicians - always personally, and always after a pulse-reading assessment."],
  ["Is intimate wellness a medical service?", "No. It is everyday comfort care and does not involve medical diagnosis or treatment."],
  ["How do I pay?", "These treatments are currently paid in-store. A WhatsApp booking holds your slot."],
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

export default function TCMPage() {
  return (
    <>
      <Header active="TCM" />
      <main>
        <Hero
          eyebrow="One Spa · TCM Wellness · Kuala Lumpur"
          title={<>TCM Wellness, now at One Spa</>}
          copy="Resident TCM physicians with a free pulse-reading assessment - acupuncture, moxibustion, herbal mud therapy and bone-setting, all with listed prices. Book on WhatsApp."
          image="tcm-hero.jpg?osw=0.9.23"
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

        <section id="tcm-pulse">
          <SectionHead
            eyebrow="Free experience"
            title="Free TCM Pulse Reading"
            sub="A one-on-one assessment of your constitution and current state - assessment first, then a plan made for you."
          />
          <div className="container">
            <div className="deal">
              <b>Full-body herbal compress · Neck, shoulder & spine care · Sleep & stress care · Food-as-medicine pairing</b>
            </div>
            <div className="center-cta">
              <ContactButtons whatsappLabel="Book a free pulse reading" />
            </div>
          </div>
        </section>

        <section id="tcm-services">
          <SectionHead
            eyebrow="Wellness treatments"
            title="Five traditional treatments, first booked first served"
            sub="Every session is one-on-one; listed prices are what you pay in store. Book ahead on WhatsApp."
          />
          <div className="container">
            <div className="fac-grid">
              {treatments.map(([title, image, desc, price]) => (
                <article className="fac" key={title}>
                  <div className="ph"><img src={`${assetBase}/${image}`} alt={title} /></div>
                  <div className="fb">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    {price ? <p><b>{price}</b></p> : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="targeted-care">
          <SectionHead eyebrow="中医调理 · CHINESE MEDICINE CARE" title="Traditional Chinese Medicine Specialties" sub="One-on-one traditional care, assessed by our TCM physicians" />
          <div className="container">
            <MiniGrid items={specialties} />
            <div className="deal">具体项目、时长及适用情况，以中医师现场评估为准</div>
            <div className="center-cta"><ContactButtons whatsappLabel="Book on WhatsApp" /></div>
          </div>
        </section>

        <section id="physician">
          <SectionHead eyebrow="Physician services" title="Physician Treatment Services" sub="Performed personally by our TCM physicians, always after a pulse-reading assessment." />
          <div className="container">
            <MiniGrid items={physician} />
            <div className="deal">Listed prices are final and paid in store - free pulse reading first, and we only proceed where it suits you.</div>
            <div className="center-cta"><ContactButtons whatsappLabel="Book physician services" /></div>
          </div>
        </section>

        <section id="meridian">
          <SectionHead eyebrow="Signature treatment" title="Full-Body Herbal Meridian Care" sub="A whole-body warming ritual guided by the twelve meridians - from tight to loose, cold to warm." />
          <div className="container">
            <MiniGrid items={infoBlocks.meridian} />
            <div className="deal"><b>RM699</b> · Special price · paid in store; book ahead on WhatsApp</div>
            <div className="center-cta"><ContactButtons whatsappLabel="Book on WhatsApp" /></div>
          </div>
        </section>

        <section id="intimate">
          <SectionHead eyebrow="Ladies only" title="Women's Intimate Wellness" sub="Clean, professional and completely private care for women." />
          <div className="container">
            <MiniGrid items={infoBlocks.intimate} />
            <div className="deal">Pricing and slots on WhatsApp</div>
            <div className="center-cta"><ContactButtons whatsappLabel="Book on WhatsApp" /></div>
          </div>
        </section>

        <section id="tea">
          <SectionHead eyebrow="Food as medicine" title="TCM Herbal Teas" sub="Freshly brewed herbal teas from the TCM studio - order in store between soaks, no booking needed." />
          <div className="container">
            <div className="deal">Liver-Care Tea RM29 · Damp-Clearing Tea RM29 · Kidney-Nourish Tea RM39 · Lung-Clear Tea RM28 · Womb-Warming Tea RM28</div>
          </div>
        </section>

        <section id="tcm-team">
          <SectionHead eyebrow="Your practitioners" title="Physicians and rehabilitation therapists" />
          <div className="container">
            <div className="deal text-left">The TCM studio is staffed by physicians and rehabilitation therapists. Physician treatments are performed personally by the physician after a pulse-reading assessment.</div>
          </div>
        </section>

        <section id="tcm-faq">
          <SectionHead eyebrow="Before you book" title="TCM Wellness FAQ" />
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
                <ContactButtons whatsappLabel="Ask us on WhatsApp" />
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
