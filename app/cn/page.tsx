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
  title: "金悦汇 Indulgence | 吉隆坡SPA · 吉隆坡按摩娱乐",
  description:
    "金悦汇 Indulgence位于吉隆坡 Viva Home Mall，24 小时营业，提供吉隆坡SPA、吉隆坡按摩、汤泉汗蒸、美容、中医调理与休闲娱乐。",
  path: "/cn/",
  keywords: ["吉隆坡SPA", "吉隆坡按摩", "吉隆坡娱乐", "金悦汇", "klspa", "klmassage", "klentertainment"],
});

const siteBase = "/cn";

const chips = [
  "全天候不打烊",
  "一次待满 12 小时",
  "泡汤、汗蒸与用餐，一张票走完",
  "到店前 1 天改期不收费",
];

const packages = [
  {
    title: "双人同行 · 买一送一",
    desc: "一张订单进两位大人，每人都是完整 12 小时",
    price: "RM169++ 起 / 2 位",
    href: `${siteBase}/packages/#pk-b1f1`,
    featured: true,
  },
  {
    title: "单人 12 小时门票",
    desc: "自己一个人来，12 小时之外再送 30 分钟按摩",
    price: "RM169++ 起 / 人",
    href: `${siteBase}/packages/#pk-solo`,
  },
  {
    title: "日间按摩配套",
    desc: "白天 9AM-5PM 人少好泡，单人也能下单",
    price: "RM199++ / 人",
    href: `${siteBase}/packages/#pk-daytime`,
  },
  {
    title: "扬州搓澡配套",
    desc: "扬州老手艺搓澡，12 小时门票已经算在里面",
    price: "RM199++ 起 / 人",
    href: `${siteBase}/packages/#pk-scrub`,
  },
  {
    title: "沐净舒养套餐",
    desc: "门票、搓澡、一小时按摩，一次订齐",
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
      "一边是 13°C 的玄冰池，一边是 43°C 的中药池。在星空顶下来回换着泡，几轮下来整个人是清醒的。",
  },
  {
    title: "盐晶汗蒸",
    image: "fac-steam.jpg",
    copy: "整面盐晶墙，暖黄的灯，热气不烈但够久，坐着坐着一周的疲劳就出汗排掉了。",
  },
  {
    title: "按摩房",
    image: "fac-massage.jpg",
    copy:
      "一间房三张床，一家人或一群朋友不必分开做。推拿、泰式、精油等 20 项护理，都是在这几间房里进行。",
    more: true,
  },
  {
    title: "扬州搓澡",
    image: "fac-scrub.jpg",
    copy:
      "这间房只做一件事：扬州搓澡，来龙去脉都写在墙上。可以单独做，也可以选含门票的套餐。",
    more: true,
  },
  {
    title: "影视厅 · 休息厅",
    image: "fac-movie.jpg",
    copy:
      "影视厅和休息厅连在一起，每个位子配一副耳机，所以这边在看片、隔壁照样睡得着。想通宵的客人，最后基本都待在这里。",
  },
  {
    title: "沉浸光影区",
    image: "fac-immersive.jpg",
    copy: "一条会流动的光影长廊，泡完走进去慢慢回神。多数人走到一半就停下来拍照。",
  },
  {
    title: "足浴房",
    image: "fac-recliner.jpg",
    copy:
      "专门照顾脚的一间房，足疗和修脚都在这做。电动躺椅能放到全平，不想说话就直接睡过去。",
    more: true,
  },
];

const faqs = [
  ["真的可以待 12 小时？", "可以。从进场那一刻开始算 12 小时，这段时间里所有设施都能用。"],
  [
    "星期日算平日还是周末？",
    "算平日。星期日到星期四都属于低价档，星期五、星期六和公共假期属于另一档。",
  ],
  ["公共假期怎么算钱？", "按周末那一档收。不用自己算，选好日期后日历上会直接显示该天的价格。"],
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
            <div className="k">金悦汇 Indulgence · 金悦汇 · 吉隆坡 · 24 小时营业</div>
            <h1>
              在吉隆坡泡足 12 小时
              <br />
              金悦汇温泉会所
            </h1>
            <p>
              金悦汇 Indulgence开在吉隆坡 Viva Home Mall 二楼，一天 24 小时都不关门。
              一张门票就是 12 小时：吉隆坡SPA水疗、汤池、汗蒸、桑拿、按摩，
              饿了还有餐饮，慢慢泡不用赶。
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
                        泡池之外，金悦汇设有<strong>盐晶汗蒸房</strong>与
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
