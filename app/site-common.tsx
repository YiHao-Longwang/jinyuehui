import type { ReactNode } from "react";

export const assetBase = "https://onespa.com.my/wp-content/themes/onespa-warm/assets";
export const whatsappHref =
  "https://wa.me/60126702560?text=Hi%2C%20I%20would%20like%20to%20ask%20about%20the%20packages";
export const whatsappHrefCn =
  "https://wa.me/60126702560?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E4%BA%86%E8%A7%A3%E9%85%8D%E5%A5%97";

export const navItems = [
  ["Home", "/"],
  ["Packages", "/packages/"],
  ["Facilities", "/facilities/"],
  ["Home Service", "/home-massage/"],
  ["Beauty", "/beauty/"],
  ["TCM", "/tcm/"],
  ["FAQ", "/faq/"],
  ["Contact", "/contact/"],
];

const cnNavItems = [
  ["Home", "首页", "/cn/"],
  ["Packages", "配套", "/cn/packages/"],
  ["Facilities", "设施", "/cn/facilities/"],
  ["Home Service", "上门服务", "/cn/home-massage/"],
  ["Beauty", "美容部", "/cn/beauty/"],
  ["TCM", "中医部", "/cn/tcm/"],
  ["FAQ", "常见问题", "/cn/faq/"],
  ["Contact", "联系我们", "/cn/contact/"],
];

export const footerPolicies = [
  ["Cancellation & Rescheduling", "/cancellation-and-refund-policy-on-service/"],
  ["Terms & Conditions", "/terms-conditions/"],
  ["Privacy Policy", "/privacy-policy/"],
];

const footerPoliciesCn = [
  ["取消与改期", "/cn/cancellation-and-refund-policy-on-service/"],
  ["条款与细则", "/cn/terms-conditions/"],
  ["隐私政策", "/cn/privacy-policy/"],
];

const footerHighlights = ["Open 24 Hours", "12-Hour Stay", "Viva Home Mall KL"];
const footerHighlightsCn = ["24 小时营业", "12 小时任你待", "Viva Home Mall KL"];

const footerExperienceLinks = [
  ["Packages", "/packages/"],
  ["Facilities", "/facilities/"],
  ["Home Massage", "/home-massage/"],
  ["Beauty Studio", "/beauty/"],
  ["TCM Wellness", "/tcm/"],
];

const footerExperienceLinksCn = [
  ["配套", "/cn/packages/"],
  ["设施", "/cn/facilities/"],
  ["上门按摩", "/cn/home-massage/"],
  ["美容部", "/cn/beauty/"],
  ["中医部", "/cn/tcm/"],
];

type Locale = "en" | "cn";

export function Diamond() {
  return <span className="dia" aria-hidden="true" />;
}

export function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M21 11.6a8.4 8.4 0 0 1-12.3 7.4L4 20l1.1-4.4A8.4 8.4 0 1 1 21 11.6Z" />
      <path d="M8.8 10.2c.5 1.9 2.1 3.5 4 4l1.3-1.2 2.1 1" />
    </svg>
  );
}

export function Header({ active = "Home", locale = "en" }: { active?: string; locale?: Locale }) {
  const isCn = locale === "cn";
  const items = isCn
    ? cnNavItems.map(([key, label, href]) => ({ key, label, href }))
    : navItems.map(([label, href]) => ({ key: label, label, href }));
  const englishHref = navItems.find(([label]) => label === active)?.[1] ?? "/";
  const chineseHref = cnNavItems.find(([key]) => key === active)?.[2] ?? "/cn/";

  return (
    <header className="topbar">
      <div className="container">
        <a className="brand" href={isCn ? "/cn/" : "/"} aria-label="One Spa home">
          <img className="brand-lockup" src={`${assetBase}/logo-duo.svg`} alt={isCn ? "One Spa 壹号汤泉" : "One Spa"} />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {items.map(({ key, label, href }) => (
            <a className={key === active ? "on" : undefined} href={href} key={key}>
              {label}
            </a>
          ))}
        </nav>
        <div className="top-right">
          <div className="lang" aria-label="Language">
            {isCn ? (
              <>
                <span className="on">中文</span>
                <a href={englishHref}>EN</a>
              </>
            ) : (
              <>
                <a href={chineseHref}>中文</a>
                <span className="on">EN</span>
              </>
            )}
          </div>
          <details className="mnav">
            <summary aria-label="Menu">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <nav className="mnav-list" aria-label="Mobile navigation">
              {items.map(({ key, label, href }) => (
                <a href={href} key={key}>
                  {label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function Hero({
  eyebrow,
  title,
  copy,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero">
      <img className="hero-img" src={`${assetBase}/${image}`} alt="" fetchPriority="high" />
      <div className="container">
        <div className="k">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{copy}</p>
        {children ? <div className="cta">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="sec-head">
      <div className="k">{eyebrow}</div>
      <h2>{title}</h2>
      {sub ? <p className="sub">{sub}</p> : null}
      <div className="divider">
        <Diamond />
      </div>
    </div>
  );
}

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const isCn = locale === "cn";
  const items = isCn ? cnNavItems.map(([, label, href]) => [label, href]) : navItems;
  const policies = isCn ? footerPoliciesCn : footerPolicies;
  const highlights = isCn ? footerHighlightsCn : footerHighlights;
  const experiences = isCn ? footerExperienceLinksCn : footerExperienceLinks;
  const waHref = isCn ? whatsappHrefCn : whatsappHref;

  return (
    <footer className="site" id="contact">
      <div className="container fwrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img className="flogo" src={`${assetBase}/logo-cream.svg`} alt={isCn ? "One Spa 壹号汤泉" : "One Spa"} />
            <div>
              <div className="slogan">
                {isCn ? "给自己 12 小时" : "Give Yourself 12 Hours"}
                <br />
                {isCn ? "泡进一池温汤" : "In a Warm Spring"}
              </div>
              <p className="footer-copy">
                {isCn
                  ? "吉隆坡 24 小时温泉会所，集合泡汤、按摩、美容、中医调理与私人养生护理。"
                  : "A warm, all-hours retreat for hot spring, massage, beauty, TCM and private wellness sessions in Kuala Lumpur."}
              </p>
            </div>
          </div>

          <div className="footer-cta">
            <a className="wa footer-wa" href={waHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              WhatsApp +60 12-670 2560
            </a>
            <a className="footer-secondary" href={isCn ? "/cn/packages/" : "/packages/"}>
              {isCn ? "看配套" : "View Packages"}
            </a>
          </div>
        </div>

        <div className="footer-highlights" aria-label="One Spa highlights">
          {highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="cols footer-grid">
          <div className="col">
            <h6>{isCn ? "浏览" : "Explore"}</h6>
            {items.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col">
            <h6>{isCn ? "项目" : "Experiences"}</h6>
            {experiences.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col">
            <h6>{isCn ? "地址" : "Visit"}</h6>
            <p>
              Lot No. 2-53 & 2-56, Level 2, Viva Home Mall,
              <br />
              85, Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur
            </p>
            <a href={waHref} target="_blank" rel="noopener">
              {isCn ? "WhatsApp 预约" : "Book on WhatsApp"}
            </a>
          </div>
          <div className="col">
            <h6>{isCn ? "政策" : "Policies"}</h6>
            {policies.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>One Spa · © 2026 One Spa. All rights reserved.</span>
          <span>{isCn ? "通过 WhatsApp 预约" : "Bookings handled through WhatsApp"}</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp({ locale = "en" }: { locale?: Locale }) {
  const isCn = locale === "cn";

  return (
    <a className="fab" href={isCn ? whatsappHrefCn : whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp">
      <WhatsAppIcon />
      WhatsApp
    </a>
  );
}
