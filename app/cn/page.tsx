import { Fragment } from "react";
import {
  assetBase,
  Diamond,
  FloatingWhatsApp,
  Footer,
  Header,
  SectionHead,
} from "../site-common";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "One Spa 南海龙宫 | 吉隆坡SPA · 吉隆坡按摩娱乐",
  description:
    "One Spa 南海龙宫位于吉隆坡 Viva Home Mall，24 小时营业，提供吉隆坡SPA、吉隆坡按摩、汤泉汗蒸、美容、中医调理与休闲娱乐。",
  path: "/cn/",
  keywords: ["吉隆坡SPA", "吉隆坡按摩", "吉隆坡娱乐", "南海龙宫", "klspa", "klmassage", "klentertainment"],
});

const siteBase = "/cn";

const chips = [
  "24 小时营业",
  "12 小时任你待",
  "泡汤汗蒸餐饮一票全包",
  "提前 1 天免费改期",
];

const packages = [
  {
    title: "双人同行 · 买一送一",
    desc: "一张订单两位大人 · 待足 12 小时",
    price: "RM169++ 起 / 2 位",
    href: `${siteBase}/packages/#pk-b1f1`,
    featured: true,
  },
  {
    title: "单人 12 小时门票",
    desc: "一个人也享 12 小时 · 送 30 分钟按摩",
    price: "RM169++ 起 / 人",
    href: `${siteBase}/packages/#pk-solo`,
  },
  {
    title: "日间按摩配套",
    desc: "白天放松 · 9AM-5PM · 一个人也能买",
    price: "RM199++ / 人",
    href: `${siteBase}/packages/#pk-daytime`,
  },
  {
    title: "扬州搓澡配套",
    desc: "传统搓澡 · 已含 12 小时门票",
    price: "RM199++ 起 / 人",
    href: `${siteBase}/packages/#pk-scrub`,
  },
  {
    title: "沐净舒养套餐",
    desc: "12 小时门票 · 搓澡 · 60 分钟按摩",
    price: "RM379++ / 人",
    href: `${siteBase}/packages/#pk-allday-sm`,
  },
  {
    title: "日间双人套餐",
    desc: "双人门票 · 每人 60 分钟护理",
    price: "RM379++ / 2 人",
    href: `${siteBase}/packages/#pk-daytime-duo`,
  },
];

const facilities = [
  {
    title: "冰火两重天",
    image: "fac-icefire.jpg",
    lead: true,
    copy:
      "左手玄冰池 13°C，右手中药池 43°C。星空顶下冷热交替着泡，泡完通体舒畅，整个人都醒了。",
  },
  {
    title: "盐晶汗蒸",
    image: "fac-steam.jpg",
    copy: "盐晶墙汗蒸房，暖光裹着热气，坐着发一身透汗，循环更舒畅。",
  },
  {
    title: "按摩房",
    image: "fac-massage.jpg",
    copy:
      "独立按摩房，三张床位，家人朋友可同房一起做；推拿、泰式、精油，20 项按摩护理都在这里安排。",
    more: true,
  },
  {
    title: "扬州搓澡",
    image: "fac-scrub.jpg",
    copy:
      "专设搓澡房，墙上写着扬州搓澡的门道。传统手艺搓出一身轻，单项或含门票的套餐都有。",
    more: true,
  },
  {
    title: "影视厅 · 休息厅",
    image: "fac-movie.jpg",
    copy:
      "影视厅连着休息厅，人手一副耳机。爱看的看片，想睡的安睡，互不打扰；通宵过夜的客人多半就歇在这里。",
  },
  {
    title: "沉浸光影区",
    image: "fac-immersive.jpg",
    copy: "星幕光影长廊，泡完在流动的光影里慢慢回神，顺手就是一张大片。",
  },
  {
    title: "足浴房",
    image: "fac-recliner.jpg",
    copy:
      "足浴专用躺椅房，足疗、修脚都在这里做；电动躺椅可调，做完顺势眯一会。",
    more: true,
  },
];

const faqs = [
  ["真的可以待 12 小时？", "可以，从进场算起 12 小时，设施随便用。"],
  [
    "星期日算平日还是周末？",
    "平日价。星期日到星期四都是平日档；星期五、六和公共假期一个档。",
  ],
  ["公共假期怎么算钱？", "按周末价。日历选日期时价格直接显示，不用自己算。"],
];

export default function ChinesePage() {
  return (
    <>
      <Header active="Home" locale="cn" />
      <main>
        <section className="hero home">
          <img
            className="hero-img"
            src={`${assetBase}/hero-onsen-warm.jpg`}
            alt=""
            fetchPriority="high"
          />
          <div className="container">
            <div className="k">One Spa · 南海龙宫 · 吉隆坡 · 24 小时营业</div>
            <h1>
              给自己 12 小时
              <br />
              泡进一池温汤
            </h1>
            <p>
              One Spa 南海龙宫是位于吉隆坡 Viva Home Mall 的 24 小时SPA水疗温泉会所。
              吉隆坡SPA、吉隆坡水疗、吉隆坡按摩与休闲娱乐一次满足：泡汤 · 汗蒸 · 桑拿 · 餐饮，
              一张门票泡足 12 小时。
            </p>
            <div className="cta">
              <a className="btn clay" href={`${siteBase}/packages/`}>
                看配套
              </a>
              <a className="btn cream-line" href={`${siteBase}/facilities/`}>
                看全部设施
              </a>
            </div>
          </div>
        </section>

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

        <div className="osw-onsen-crosslink">
          <div className="container">
            <a className="osw-product-text-link" href={`${siteBase}/wenquan/`}>
              中式汤泉
            </a>
          </div>
        </div>

        <section id="featured">
          <SectionHead eyebrow="线上主推" title="吉隆坡SPA按摩配套 · 挑好配套，几分钟订完" />
          <div className="container">
            <div className="minis">
              {packages.map((pkg) => (
                <article className={`mini-card${pkg.featured ? " night" : ""}`} key={pkg.title}>
                  {pkg.featured ? <span className="tag hot">线上主推</span> : null}
                  <h3>{pkg.title}</h3>
                  <p className="desc">{pkg.desc}</p>
                  <div className="grow" />
                  <div className="price">
                    <span className="rm">{pkg.price}</span>
                  </div>
                  <a className={`btn sm${pkg.featured ? "" : " line"}`} href={pkg.href}>
                    看配套
                  </a>
                </article>
              ))}
            </div>
            <p className="taxnote osw-home-tax">
              ++ = 10% 服务费 + 8% SST；选完日期即显示到手价
            </p>
            <div className="center-cta">
              <a className="btn" href={`${siteBase}/packages/`}>
                看配套
              </a>
            </div>
          </div>
        </section>

        <section id="facilities">
          <SectionHead eyebrow="店里有什么" title="一站式吉隆坡温泉水疗会所" />
          <div className="container">
            <div className="fac-grid">
              {facilities.map((facility, index) => (
                <Fragment key={facility.title}>
                  <article className={`fac${facility.lead ? " lead" : ""}`}>
                    <div className="ph">
                      <img
                        src={`${assetBase}/${facility.image}`}
                        alt={facility.title}
                        loading="eager"
                      />
                    </div>
                    <div className="fb">
                      <h3>{facility.title}</h3>
                      <p>{facility.copy}</p>
                      {facility.more ? (
                        <a className="more" href={`${siteBase}/packages/#treatments`}>
                          看按摩项目与价格 &rsaquo;
                        </a>
                      ) : null}
                    </div>
                  </article>
                  {index === 0 ? (
                    <section className="osw-home-sauna" key="sauna">
                      <h3>汗蒸与桑拿</h3>
                      <p>
                        泡池之外，壹号汤泉设有<strong>盐晶汗蒸房</strong>与
                        <strong>干湿桑拿</strong>。盐晶房温度较缓，适合久待，喜欢慢慢出汗、边聊天边放松的人通常泡完汤就直接进来。
                      </p>
                      <p>
                        中式汤泉的用法讲究交替：<strong>热汤 → 汗蒸或桑拿 → 冰池</strong>
                        。一轮下来毛孔开合一次，循环两三轮，比单纯泡着更解乏。
                      </p>
                      <p>汗蒸房与桑拿全部包含在 12 小时门票内，24 小时开放，不额外收费。</p>
                    </section>
                  ) : null}
                </Fragment>
              ))}
            </div>
            <div className="center-cta">
              <a className="btn line" href={`${siteBase}/facilities/`}>
                看全部设施
              </a>
            </div>

            <div className="banner">
              <div>
                <h3>几个人来？这样买最划算</h3>
                <p>2 位买一送一；单数人配单人票；带小孩加儿童票。详细组合看配套页。</p>
              </div>
              <a className="btn" href={`${siteBase}/packages/#combos`}>
                看组合推荐
              </a>
            </div>
          </div>
        </section>

        <section id="faq">
          <SectionHead
            eyebrow="常见问题"
            title="价格、预约、改期、到店流程，想问的这里都答好了。"
          />
          <div className="container">
            <div className="faqwrap">
              <div className="faq">
                {faqs.map(([question, answer], index) => (
                  <details open={index === 0} key={question}>
                    <summary>
                      {question}
                      <span className="plus" />
                    </summary>
                    <div className="a">{answer}</div>
                  </details>
                ))}
              </div>
              <div className="center-cta">
                <a className="btn line" href={`${siteBase}/faq/`}>
                  看常见问题
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale="cn" />
      <FloatingWhatsApp locale="cn" />
    </>
  );
}
