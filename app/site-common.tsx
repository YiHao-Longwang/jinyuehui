import type { ReactNode } from "react";

/** Renders a structured-data block (see faqJsonLd / localBusinessJsonLd in seo.ts). */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const assetBase = "/assets";
export const whatsappNumberDisplay = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+60 14-315 5632";
const whatsappDigits = whatsappNumberDisplay.replace(/\D/g, "");
const whatsappBase = `https://wa.me/${whatsappDigits}`;
export const whatsappCartBase = `${whatsappBase}?text=`;
export const whatsappHref = `${whatsappBase}?text=Hi%2C%20I%20would%20like%20to%20ask%20about%20the%20packages`;
export const whatsappHrefCn = `${whatsappBase}?text=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E4%BA%86%E8%A7%A3%E9%85%8D%E5%A5%97`;
export const telegramHref = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/nhlg09";
export const telegramHrefCn = process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me/nhlg09";
export const telegramDisplay = telegramHref.replace(/^https?:\/\/t\.me\//, "@").replace(/\/$/, "");

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

/**
 * Public profiles for this outlet. Keep in sync with sameAsProfiles in seo.ts.
 * The jinyuehuiofficial accounts are deliberately absent - they belong to the
 * other operator trading under the 金悦汇 Indulgence name.
 */
const socialLinks = [
  ["Instagram", "https://www.instagram.com/vivadespa/"],
  ["Telegram", telegramHref],
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

export function TelegramIcon() {
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
      <path d="M21 4 3.7 10.8c-.8.3-.8 1.4.1 1.6l4.3 1.3 1.7 5.2c.3.8 1.3 1 1.8.3l2.5-3.3 4.7 3.5c.7.5 1.7.1 1.9-.8L23 5.2c.2-.9-.9-1.6-1.6-1.2Z" />
      <path d="m8.2 13.7 6.7-4.2-5.1 5.8" />
    </svg>
  );
}

export function ContactButtons({
  locale = "en",
  className = "",
  whatsappLabel,
  telegramLabel,
}: {
  locale?: Locale;
  className?: string;
  whatsappLabel?: string;
  telegramLabel?: string;
}) {
  const isCn = locale === "cn";
  return (
    <div className={`contact-pair ${className}`.trim()}>
      <a className="btn contact-wa" href={isCn ? whatsappHrefCn : whatsappHref} target="_blank" rel="noopener">
        <WhatsAppIcon />
        {whatsappLabel ?? (isCn ? "WhatsApp 咨询" : "WhatsApp Us")}
      </a>
      <a className="btn contact-tg" href={isCn ? telegramHrefCn : telegramHref} target="_blank" rel="noopener">
        <TelegramIcon />
        {telegramLabel ?? (isCn ? "Telegram 咨询" : "Telegram Us")}
      </a>
    </div>
  );
}

export function Header({ active = "Home", locale = "en" }: { active?: string; locale?: Locale }) {
  const isCn = locale === "cn";
  const items = isCn
    ? cnNavItems.map(([key, label, href]) => ({ key, label, href }))
    : navItems.map(([label, href]) => ({ key: label, label, href }));
  const englishHref = active === "Cart" ? "/cart/" : navItems.find(([label]) => label === active)?.[1] ?? "/";
  const chineseHref = active === "Cart" ? "/cn/cart/" : cnNavItems.find(([key]) => key === active)?.[2] ?? "/cn/";
  const cartHref = isCn ? "/cn/cart/" : "/cart/";

  return (
    <header className="topbar">
      <div className="container">
        <a className="brand" href={isCn ? "/cn/" : "/"} aria-label="金悦汇 Indulgence home">
          <img className="brand-lockup" src={`${assetBase}/jinyuehui-logo.png`} alt="金悦汇 Indulgence" />
        </a>
        <a className="seo-header-link" href={isCn ? "/cn/packages/#treatments" : "/packages/#treatments"}>
          吉隆坡下水 · 吉隆坡莞式按摩服务
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {items.map(({ key, label, href }) => (
            <a className={key === active ? "on" : undefined} href={href} key={key}>
              {label}
            </a>
          ))}
        </nav>
        <div className="top-right">
          <a className="cart-link" href={cartHref} aria-label={isCn ? "购物车" : "Cart"}>
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
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
              <path d="M3 4h2l2.1 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" />
            </svg>
            <span className="cart-count" data-cart-count hidden>
              0
            </span>
          </a>
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
              <a href={isCn ? "/cn/packages/#treatments" : "/packages/#treatments"}>
                吉隆坡下水 · 吉隆坡莞式按摩服务
              </a>
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
  imageAlt,
  locale = "en",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: string;
  image: string;
  imageAlt?: string;
  locale?: Locale;
  children?: ReactNode;
}) {
  const defaultAlt =
    locale === "cn"
      ? "金悦汇 Indulgence — 吉隆坡 24 小时SPA汤泉会所"
      : "金悦汇 Indulgence - 24 hour spa and hot spring in Kuala Lumpur";

  return (
    <section className="hero">
      <img className="hero-img" src={`${assetBase}/${image}`} alt={imageAlt ?? defaultAlt} fetchPriority="high" />
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

  return (
    <footer className="site" id="contact">
      <div className="container fwrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img className="flogo" src={`${assetBase}/jinyuehui-logo.png`} alt="金悦汇 Indulgence" />
            <div>
              <div className="slogan">
                {isCn ? "泡足 12 小时" : "Twelve Hours in a"}
                <br />
                {isCn ? "吉隆坡 24 小时温泉会所" : "Kuala Lumpur Hot Spring"}
              </div>
              <p className="footer-copy">
                {isCn
                  ? "金悦汇 Indulgence，吉隆坡 24 小时温泉会所，集合泡汤、按摩、美容、中医调理与私人养生护理。"
                  : "金悦汇 Indulgence is a warm, all-hours retreat for hot spring, massage, beauty, TCM and private wellness sessions in Kuala Lumpur."}
              </p>
            </div>
          </div>

          <div className="footer-cta">
            <ContactButtons
              locale={locale}
              className="footer-contact-pair"
              whatsappLabel={`WhatsApp ${whatsappNumberDisplay}`}
              telegramLabel={isCn ? "Telegram 咨询" : "Telegram Us"}
            />
            <a className="footer-secondary" href={isCn ? "/cn/packages/" : "/packages/"}>
              {isCn ? "看配套" : "View Packages"}
            </a>
          </div>
        </div>

        <div className="footer-highlights" aria-label="金悦汇 Indulgence highlights">
          {highlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="cols footer-grid">
          <div className="col footer-link-col">
            <h6>{isCn ? "浏览" : "Explore"}</h6>
            {items.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col footer-link-col">
            <h6>{isCn ? "项目" : "Experiences"}</h6>
            {experiences.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col footer-visit-col">
            <h6>{isCn ? "地址" : "Visit"}</h6>
            <p>
              Lot No. 2-69 & 2-70, Level 2, Viva Home Mall,
              <br />
              85, Jalan Loke Yew, Taman Miharja, 52200 Kuala Lumpur
            </p>
            <ContactButtons locale={locale} className="footer-mini-contact" />
            <div className="footer-social">
              <h6>{isCn ? "关注我们" : "Follow Us"}</h6>
              <div className="footer-social-row">
                {socialLinks.map(([label, href]) => (
                  // rel="me" marks these as profiles of the same entity, which
                  // backs up the sameAs claim in the business structured data.
                  <a href={href} key={label} target="_blank" rel="me noopener">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col footer-policy-col">
            <h6>{isCn ? "政策" : "Policies"}</h6>
            {policies.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>金悦汇 Indulgence · © 2026 金悦汇 Indulgence. All rights reserved.</span>
          <span>{isCn ? "通过 WhatsApp 预约" : "Bookings handled through WhatsApp"}</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp({ locale = "en" }: { locale?: Locale }) {
  const isCn = locale === "cn";

  return (
    <div className="fab-stack" aria-label={isCn ? "联系 金悦汇 Indulgence" : "Contact 金悦汇 Indulgence"}>
      <a className="fab whatsapp" href={isCn ? whatsappHrefCn : whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp">
        <WhatsAppIcon />
        WhatsApp
      </a>
      <a className="fab telegram" href={isCn ? telegramHrefCn : telegramHref} target="_blank" rel="noopener" aria-label="Telegram">
        <TelegramIcon />
        Telegram
      </a>
    </div>
  );
}
