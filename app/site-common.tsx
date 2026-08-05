import type { ReactNode } from "react";

export const assetBase = "https://onespa.com.my/wp-content/themes/onespa-warm/assets";
export const whatsappHref =
  "https://wa.me/60126702560?text=Hi%2C%20I%20would%20like%20to%20ask%20about%20the%20packages";

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

export const footerPolicies = [
  ["Cancellation & Rescheduling", "/cancellation-and-refund-policy-on-service/"],
  ["Terms & Conditions", "/terms-conditions/"],
  ["Privacy Policy", "/privacy-policy/"],
];

const footerHighlights = ["Open 24 Hours", "12-Hour Stay", "Viva Home Mall KL"];

const footerExperienceLinks = [
  ["Packages", "/packages/"],
  ["Facilities", "/facilities/"],
  ["Home Massage", "/home-massage/"],
  ["Beauty Studio", "/beauty/"],
  ["TCM Wellness", "/tcm/"],
];

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

export function Header({ active = "Home" }: { active?: string }) {
  return (
    <header className="topbar">
      <div className="container">
        <a className="brand" href="/" aria-label="One Spa home">
          <img className="brand-lockup" src={`${assetBase}/logo-duo.svg`} alt="One Spa" />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a className={label === active ? "on" : undefined} href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
        <div className="top-right">
          <div className="lang" aria-label="Language">
            <a href="/cn/">中文</a>
            <span className="on">EN</span>
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
              {navItems.map(([label, href]) => (
                <a href={href} key={label}>
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

export function Footer() {
  return (
    <footer className="site" id="contact">
      <div className="container fwrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img className="flogo" src={`${assetBase}/logo-cream.svg`} alt="One Spa" />
            <div>
              <div className="slogan">
                Give Yourself 12 Hours
                <br />
                In a Warm Spring
              </div>
              <p className="footer-copy">
                A warm, all-hours retreat for hot spring, massage, beauty, TCM and private
                wellness sessions in Kuala Lumpur.
              </p>
            </div>
          </div>

          <div className="footer-cta">
            <a className="wa footer-wa" href={whatsappHref} target="_blank" rel="noopener">
              <WhatsAppIcon />
              WhatsApp +60 12-670 2560
            </a>
            <a className="footer-secondary" href="/packages/">
              View Packages
            </a>
          </div>
        </div>

        <div className="footer-highlights" aria-label="One Spa highlights">
          {footerHighlights.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="cols footer-grid">
          <div className="col">
            <h6>Explore</h6>
            {navItems.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col">
            <h6>Experiences</h6>
            {footerExperienceLinks.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
          <div className="col">
            <h6>Visit</h6>
            <p>
              Lot No. 2-53 & 2-56, Level 2, Viva Home Mall,
              <br />
              85, Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur
            </p>
            <a href={whatsappHref} target="_blank" rel="noopener">
              Book on WhatsApp
            </a>
          </div>
          <div className="col">
            <h6>Policies</h6>
            {footerPolicies.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>One Spa · © 2026 One Spa. All rights reserved.</span>
          <span>Bookings handled through WhatsApp</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a className="fab" href={whatsappHref} target="_blank" rel="noopener" aria-label="WhatsApp">
      <WhatsAppIcon />
      WhatsApp
    </a>
  );
}
