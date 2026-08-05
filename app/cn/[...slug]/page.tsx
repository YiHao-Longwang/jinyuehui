import {
  assetBase,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  Hero,
  SectionHead,
  whatsappHrefCn,
} from "../../site-common";

type CnPage = {
  active: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  sections: {
    id: string;
    eyebrow: string;
    title: string;
    sub?: string;
    kind: "cards" | "faq" | "notice";
    items: string[][];
  }[];
};

const pages: Record<string, CnPage> = {
  packages: {
    active: "Packages",
    eyebrow: "One Spa · 配套",
    title: "泡进一池温汤",
    copy: "一张票，12 小时。泡池、汗蒸、桑拿、休息区与餐饮都包含在内。",
    image: "hero-packages-rain.jpg?osw=0.9.23",
    sections: [
      {
        id: "featured",
        eyebrow: "主推配套",
        title: "挑好配套，几分钟订完",
        kind: "cards",
        items: [
          ["双人 12 小时门票", "2 位大人同行 · 买一送一 · RM169++ 起 / 2 位", "泡池、汗蒸、桑拿、休息区与晚餐都包含。", "img-b1f1.jpg?osw=0.9.23"],
          ["单人 12 小时门票", "RM169++ 起 / 人 · 送 30 分钟按摩", "一个人也能完整享受 12 小时，适合独自放松。", "img-solo.jpg?osw=0.9.23"],
          ["日间按摩配套", "RM199++ / 人 · 9AM-5PM", "任选按摩、足疗或排毒护理，白天进场最划算。", "img-daytime.jpg?osw=0.9.23"],
          ["扬州搓澡配套", "RM199++ 起 / 人", "传统搓澡，已含 12 小时门票，不需要另买入场券。", "img-scrub.jpg?osw=0.9.23"],
          ["沐净舒养套餐", "RM379++ / 人", "12 小时门票、30 分钟搓澡、60 分钟按摩一次安排好。", "img-scrub.jpg?osw=0.9.23"],
          ["日间双人套餐", "RM379++ / 2 人", "两位日间入场，每人一项 60 分钟护理。", "img-daytime.jpg?osw=0.9.23"],
        ],
      },
      {
        id: "combos",
        eyebrow: "组合推荐",
        title: "几个人来？这样买最划算",
        kind: "notice",
        items: [
          ["2 位大人", "一张买一送一订单就覆盖两个人。"],
          ["3 位或 5 位大人", "成双的买买一送一，多出来的一位买单人票，还能拿 30 分钟按摩赠送。"],
          ["带小孩", "大人按人数买票，小孩加儿童票；2 岁以下到店免费。"],
          ["10 人以上或公司团", "直接 WhatsApp 联系我们，团体价可另外安排。"],
        ],
      },
      {
        id: "treatments",
        eyebrow: "按摩与护理",
        title: "加一项护理",
        sub: "护理项目需要入场券；单笔消费 RM499++ 以上可含一位免费入场。",
        kind: "cards",
        items: [
          ["全身项目", "舒缓触感、热石排毒、法式尊宠、五行至尊 SPA。", "价格 RM369++ 起。", "fac-treatment.jpg?osw=0.9.23"],
          ["足疗项目", "经典足疗与足疗配套。", "价格 RM299++ 起。", "fac-recliner.jpg?osw=0.9.23"],
          ["指压项目", "局部调理、推拿、传统泰式按摩。", "价格 RM199++ 起。", "fac-massage.jpg?osw=0.9.23"],
          ["小项目", "耳疗、修脚、拔罐、刮痧、扬州搓澡、背踩等。", "价格 RM150++ 起。", "fac-scrub.jpg?osw=0.9.23"],
        ],
      },
      {
        id: "know",
        eyebrow: "预约前须知",
        title: "价格、税费、改期都先讲清楚",
        kind: "notice",
        items: [
          ["提前预约", "所有配套请至少提前 1 小时线上预约。"],
          ["税费", "价格未含 10% 服务费与 8% SST；选日期后显示最终价格。"],
          ["入场", "付款后会收到确认邮件，到前台出示即可。"],
          ["改期", "到店前 1 天可免费改期，不限次数。"],
        ],
      },
    ],
  },
  facilities: {
    active: "Facilities",
    eyebrow: "One Spa · 设施",
    title: "一站式温泉会所",
    copy: "一张票包含泡池、汗蒸、桑拿、休息厅、影视区与餐饮，完整 12 小时。",
    image: "fac-hero-immersive.jpg?osw=0.9.23",
    sections: [
      {
        id: "facilities",
        eyebrow: "店里有什么",
        title: "所有设施一次看完",
        kind: "cards",
        items: [
          ["冰火两重天", "13°C 玄冰池与 43°C 中药池冷热交替。", "星空顶下泡完通体舒畅。", "fac-icefire.jpg?osw=0.9.23"],
          ["盐晶汗蒸", "暖光盐晶墙汗蒸房。", "泡完汤后坐着发汗，循环更舒畅。", "fac-steam.jpg?osw=0.9.23"],
          ["按摩房", "独立三床按摩房。", "家人朋友可同房安排推拿、泰式、精油等护理。", "fac-massage.jpg?osw=0.9.23"],
          ["扬州搓澡", "专设搓澡房。", "传统手艺搓出一身轻，可单项或配套购买。", "fac-scrub.jpg?osw=0.9.23"],
          ["影视厅 · 休息厅", "每个座位配耳机。", "看电影或睡觉互不打扰。", "fac-movie.jpg?osw=0.9.23"],
          ["足浴房", "电动躺椅足浴房。", "足疗、修脚后顺势休息。", "fac-recliner.jpg?osw=0.9.23"],
          ["餐厅", "晚餐自助 6PM-9PM。", "其他时段有简餐、水果与冰淇淋。", "fac-dining.jpg?osw=0.9.23"],
          ["私人房", "高尔夫主题房与包间。", "适合聚会、比赛夜与团体使用。", "fac-golf.jpg?osw=0.9.23"],
        ],
      },
    ],
  },
  "home-massage": {
    active: "Home Service",
    eyebrow: "One Spa · 上门服务",
    title: "店里的按摩，到你家",
    copy: "同一批 One Spa 技师，上门到酒店、公寓或住家。技师带按摩油、一次性床单与毛巾，你只需要躺下。",
    image: "outcall-hero.jpg?osw=0.9.23",
    sections: [
      {
        id: "outcall-plans",
        eyebrow: "配套与价格",
        title: "三个上门按摩配套",
        kind: "cards",
        items: [
          ["经典 2 小时上门按摩", "RM699 · 60 分钟精油 + 60 分钟泰式。", "9AM-10PM 可预约，适合白天或晚上完整放松。", "outcall-plan-warm.jpg?osw=0.9.23"],
          ["随时 2 小时上门按摩", "RM798 · 固定 120 分钟。", "可告诉我们想混合精油、推拿、泰式或足疗。", "outcall-plan-classic.jpg?osw=0.9.23"],
          ["四手尊宠 2 小时", "RM1,699 · 两位技师同步。", "肩背和腿部同时护理，释放更快更深。", "outcall-plan-duo.jpg?osw=0.9.23"],
        ],
      },
      {
        id: "outcall-flow",
        eyebrow: "预约流程",
        title: "线上付款，WhatsApp 确认地址",
        kind: "notice",
        items: [
          ["1 · 选配套", "选择日期与开始时间后加入购物车。"],
          ["2 · 线上付款", "线上支付配套价与 8% SST；交通费不在线上收取。"],
          ["3 · WhatsApp 确认", "团队会确认服务地址、到达时间与 30km 服务范围。"],
          ["4 · 技师到达", "技师到达后铺好一次性床单并开始服务；RM100 交通费到场现金支付。"],
        ],
      },
    ],
  },
  beauty: {
    active: "Beauty",
    eyebrow: "One Spa · 美容部",
    title: "美容护理，现在也在 One Spa",
    copy: "主推身体焕亮水光配套 RM599，含同日温泉门票；另有光子嫩肤、淡斑护理与冰点脱毛。",
    image: "beauty-hero.jpg?osw=0.9.23",
    sections: [
      {
        id: "beauty-signature",
        eyebrow: "主推配套",
        title: "身体焕亮水光配套",
        kind: "cards",
        items: [
          ["项目内容", "身体焕亮、水光面部护理、手部护理。", "同日温泉门票已包含。", "beauty-hero.jpg?osw=0.9.23"],
          ["适合人群", "肤色暗沉、干燥缺水、手部粗糙。", "适合重要场合前想让状态更亮的人。", "beauty-photon.jpg?osw=0.9.23"],
          ["价格", "RM599", "先泡汤汗蒸，再到美容部完成护理。", "beauty-spot.jpg?osw=0.9.23"],
        ],
      },
      {
        id: "beauty-light",
        eyebrow: "光电项目",
        title: "现场咨询后定制",
        kind: "cards",
        items: [
          ["光子嫩肤", "针对暗沉、粗糙与肤色不均。", "护理后肤色看起来更透亮。", "beauty-photon.jpg?osw=0.9.23"],
          ["淡斑护理", "针对面部色素沉着。", "现场皮肤评估后确认方案与价格。", "beauty-spot.jpg?osw=0.9.23"],
          ["冰点脱毛", "810nm 冰点技术。", "按部位报价，也可组合多部位。", "beauty-hair.jpg?osw=0.9.23"],
        ],
      },
    ],
  },
  tcm: {
    active: "TCM",
    eyebrow: "One Spa · 中医部",
    title: "中医养生，现在也在 One Spa",
    copy: "驻店中医师免费把脉评估，针灸、艾灸、泥灸、正骨与经络调理，价格公开，WhatsApp 预约。",
    image: "tcm-hero.jpg?osw=0.9.23",
    sections: [
      {
        id: "tcm-services",
        eyebrow: "中医调理",
        title: "传统项目，先约先得",
        kind: "cards",
        items: [
          ["全身经络药拓调理", "72 种中草药药包配合专业技法疏通经络。", "RM699", "tcm-meridian.jpg?osw=0.9.23"],
          ["艾灸", "温经散寒，行气通络，扶阳固本。", "RM199", "tcm-moxa.jpg?osw=0.9.23"],
          ["草本泥灸", "温热草本泥包覆调理，第一分钟就很舒服。", "RM199", "tcm-mud.jpg?osw=0.9.23"],
          ["中医正骨调理", "经中医师评估后调理筋骨关节。", "RM598", "tcm-bone.jpg?osw=0.9.23"],
          ["女性私密养护", "独立房间，女性专员一对一服务。", "价格 WhatsApp 咨询。", "tcm-intimate.jpg?osw=0.9.23"],
        ],
      },
      {
        id: "physician",
        eyebrow: "医师项目",
        title: "针灸、小针刀与刺络",
        kind: "cards",
        items: [
          ["针灸", "由中医师按体质与情况选穴。", "RM598", "tcm-hero.jpg?osw=0.9.23"],
          ["小针刀", "针对慢性软组织黏连与顽固疼痛。", "RM878", "tcm-bone.jpg?osw=0.9.23"],
          ["刺络", "疏通局部经络，调和气血。", "RM338", "tcm-moxa.jpg?osw=0.9.23"],
        ],
      },
    ],
  },
  faq: {
    active: "FAQ",
    eyebrow: "One Spa · 常见问题",
    title: "预约前先看这里",
    copy: "价格、预约、改期、到店流程和配套规则，常见问题都整理好了。",
    image: "hero-onsen-warm.jpg?osw=0.9.23",
    sections: [
      {
        id: "faq",
        eyebrow: "常见问题",
        title: "你想问的，大多在这里",
        kind: "faq",
        items: [
          ["真的可以待 12 小时？", "可以，从进场算起 12 小时，设施随便用。"],
          ["星期日算平日还是周末？", "平日价。星期日到星期四都是平日档。"],
          ["公共假期怎么算钱？", "按周末价。日历选日期时价格直接显示。"],
          ["可以改期吗？", "到店前 1 天可以免费改期，不限次数。"],
          ["怎么预约？", "线上下单或直接 WhatsApp +60 12-670 2560。"],
        ],
      },
    ],
  },
  contact: {
    active: "Contact",
    eyebrow: "One Spa · 联系我们",
    title: "预约或询问，直接 WhatsApp",
    copy: "24 小时营业。到店、上门按摩、美容与中医项目都可以先 WhatsApp 询问。",
    image: "fac-dining.jpg?osw=0.9.23",
    sections: [
      {
        id: "contact",
        eyebrow: "地址",
        title: "Viva Home Mall, Kuala Lumpur",
        kind: "notice",
        items: [
          ["WhatsApp", "+60 12-670 2560"],
          ["营业时间", "24 小时营业"],
          ["地址", "Lot No. 2-53 & 2-56, Level 2, Viva Home Mall, 85, Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur"],
        ],
      },
    ],
  },
  wenquan: {
    active: "Facilities",
    eyebrow: "One Spa · 中式汤泉",
    title: "冷热交替的中式汤泉体验",
    copy: "热汤、汗蒸、桑拿与冰池交替循环，泡完再休息、用餐或加做护理。",
    image: "fac-icefire.jpg?osw=0.9.23",
    sections: [
      {
        id: "method",
        eyebrow: "泡法",
        title: "热汤 → 汗蒸或桑拿 → 冰池",
        kind: "notice",
        items: [
          ["热汤", "先让身体慢慢暖起来。"],
          ["汗蒸或桑拿", "出一身透汗，放松紧绷感。"],
          ["冰池", "短暂冷却，整个人更清醒。"],
        ],
      },
    ],
  },
  "cancellation-and-refund-policy-on-service": {
    active: "FAQ",
    eyebrow: "One Spa · 政策",
    title: "取消与改期",
    copy: "预约、改期与退款规则整理在这里。",
    image: "hero-onsen-warm.jpg?osw=0.9.23",
    sections: [
      {
        id: "policy",
        eyebrow: "政策",
        title: "改期与退款",
        kind: "notice",
        items: [
          ["免费改期", "到店前 1 天可免费改期，不限次数。"],
          ["退款", "符合条件的退款会退回原支付方式，通常 14 天内处理。"],
          ["需要协助", "直接 WhatsApp 联系我们处理。"],
        ],
      },
    ],
  },
  "terms-conditions": {
    active: "FAQ",
    eyebrow: "One Spa · 政策",
    title: "条款与细则",
    copy: "使用网站与预约服务前，请先了解基本条款。",
    image: "hero-onsen-warm.jpg?osw=0.9.23",
    sections: [
      {
        id: "terms",
        eyebrow: "条款",
        title: "服务条款",
        kind: "notice",
        items: [
          ["预约", "所有预约以付款确认或 WhatsApp 确认为准。"],
          ["价格", "线上显示价格可能未含服务费与 SST，最终价格以下单页面为准。"],
          ["到店", "请按预约时间到达并出示确认记录。"],
        ],
      },
    ],
  },
  "privacy-policy": {
    active: "FAQ",
    eyebrow: "One Spa · 政策",
    title: "隐私政策",
    copy: "我们只收集处理预约与联系所需的信息。",
    image: "hero-onsen-warm.jpg?osw=0.9.23",
    sections: [
      {
        id: "privacy",
        eyebrow: "隐私",
        title: "资料使用",
        kind: "notice",
        items: [
          ["预约资料", "用于确认订单、联系客户与安排服务。"],
          ["联系资料", "用于 WhatsApp 沟通与售后协助。"],
          ["安全", "我们不会在页面展示不必要的个人资料。"],
        ],
      },
    ],
  },
};

function SectionContent({ section }: { section: CnPage["sections"][number] }) {
  if (section.kind === "faq") {
    return (
      <div className="faqwrap">
        <div className="faq">
          {section.items.map(([question, answer], index) => (
            <details open={index === 0} key={question}>
              <summary>
                {question}
                <span className="plus" />
              </summary>
              <div className="a">{answer}</div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (section.kind === "cards") {
    return (
      <div className="fac-grid">
        {section.items.map(([title, desc, note, image]) => (
          <article className="fac" key={title}>
            {image ? (
              <div className="ph">
                <img src={`${assetBase}/${image}`} alt={title} />
              </div>
            ) : null}
            <div className="fb">
              <h3>{title}</h3>
              <p>{desc}</p>
              {note ? <p><b>{note}</b></p> : null}
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="knowwrap">
      {section.items.map(([title, desc, note]) => (
        <article className="know" key={title}>
          <h3>{title}</h3>
          <p className="desc">{desc}</p>
          {note ? <p className="fine">{note}</p> : null}
        </article>
      ))}
    </div>
  );
}

export default async function ChineseSubPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = pages[key] ?? pages.faq;

  return (
    <>
      <Header active={page.active} locale="cn" />
      <main>
        <Hero
          eyebrow={page.eyebrow}
          title={page.title}
          copy={page.copy}
          image={page.image}
        >
          <a className="btn clay" href={whatsappHrefCn} target="_blank" rel="noopener">
            WhatsApp 预约
          </a>
          <a className="btn cream-line" href="/cn/packages/">
            看配套
          </a>
        </Hero>

        <div className="chips">
          <div className="container">
            {["24 小时营业", "12 小时任你待", "WhatsApp 预约", "价格公开"].map((chip) => (
              <span className="c" key={chip}>
                <Diamond />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {page.sections.map((section) => (
          <section id={section.id} key={section.id}>
            <SectionHead eyebrow={section.eyebrow} title={section.title} sub={section.sub} />
            <div className="container">
              <SectionContent section={section} />
            </div>
          </section>
        ))}
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}
