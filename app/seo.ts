import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://onespa.klyihao.com").replace(/\/$/, "");

export const seoKeywords = [
  "One Spa",
  "oneSPA",
  "onepsa",
  "壹号汤泉",
  "南海龙宫",
  "吉隆坡SPA",
  "吉隆坡按摩",
  "吉隆坡下水",
  "吉隆坡莞式按摩服务",
  "莞式按摩吉隆坡",
  "吉隆坡娱乐",
  "吉隆坡温泉",
  "吉隆坡汤泉",
  "KL spa",
  "klspa",
  "KL massage",
  "klmassage",
  "KL entertainment",
  "klentertainment",
  "24 hour spa KL",
  "onsen KL",
  "massage KL",
  "Viva Home Mall spa",
  "Kuala Lumpur spa",
  "KL onsen spa",
  "massage Kuala Lumpur",
  "spa Kuala Lumpur 24 hours",
  "吉隆坡水疗",
  "南海龙宫 spa 会所",
  "吉隆坡spa会所",
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

/** Slugs that differ between the English and Chinese trees. */
const localisedSlugs: Record<string, string> = {
  "/onsen-kl/": "/cn/wenquan/",
};

/**
 * Returns the en <-> cn hreflang pair for a canonical path, so Google serves the
 * right language version instead of treating the two trees as duplicates.
 * Returns undefined for pages that only exist in one language.
 */
function alternateLanguages(canonicalPath: string) {
  const isCn = canonicalPath === "/cn/" || canonicalPath.startsWith("/cn/");
  const en = isCn
    ? Object.entries(localisedSlugs).find(([, cn]) => cn === canonicalPath)?.[0] ??
      (canonicalPath === "/cn/" ? "/" : canonicalPath.replace(/^\/cn/, ""))
    : canonicalPath;
  const cn = isCn ? canonicalPath : localisedSlugs[canonicalPath] ?? (canonicalPath === "/" ? "/cn/" : `/cn${canonicalPath}`);

  if (!bilingualPaths.has(en)) return undefined;

  return {
    "en-MY": en,
    "zh-MY": cn,
    "x-default": en,
  };
}

/** English canonical paths that have a Chinese counterpart. */
const bilingualPaths = new Set([
  "/",
  "/packages/",
  "/facilities/",
  "/home-massage/",
  "/beauty/",
  "/tcm/",
  "/onsen-kl/",
  "/faq/",
  "/contact/",
  "/cancellation-and-refund-policy-on-service/",
  "/terms-conditions/",
  "/privacy-policy/",
]);

export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  image = "/assets/hero-onsen-warm.jpg",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;

  return {
    title,
    description,
    keywords: [...keywords, ...seoKeywords],
    alternates: {
      canonical: canonicalPath,
      languages: alternateLanguages(canonicalPath),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "One Spa 南海龙宫",
      type: "website",
      images: [
        {
          url: image,
          width: 1280,
          height: 853,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** The Google Business Profile this site belongs to (南海龙宫SPA会所, Viva Home Mall). */
const googlePlaceUrl =
  "https://www.google.com/maps/search/?api=1&query=One%20Spa%20%E5%A3%B9%E5%8F%B7%E6%B1%A4%E6%B3%89&query_place_id=ChIJEa1Xrew3zDEROXX0qPz4IdA";

/**
 * Profiles that represent this same business. `sameAs` is how Google ties the
 * site, the Business Profile and the social accounts together as one entity -
 * which matters here because another operator trades under the One Spa name.
 */
const sameAsProfiles = [
  "https://www.instagram.com/vivadespa/",
  "https://t.me/nhlg09",
  googlePlaceUrl,
  // Deliberately excludes the onespaofficial accounts: they are linked from
  // onespa.com.my, so claiming them here would tell Google this site and that
  // operator's site are one business - the opposite of what we want.
];

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${siteUrl}/#business`,
  name: "One Spa 南海龙宫",
  alternateName: ["oneSPA", "壹号汤泉", "南海龙宫", "南海龙宫SPA会所", "KL Spa", "吉隆坡莞式按摩服务"],
  url: siteUrl,
  image: `${siteUrl}/assets/hero-onsen-warm.jpg`,
  sameAs: sameAsProfiles,
  hasMap: googlePlaceUrl,
  telephone: "+60 14-315 5632",
  priceRange: "RM58-RM1699",
  description:
    "One Spa 南海龙宫 is a 24-hour spa, massage, hot-spring and wellness destination in Kuala Lumpur at Viva Home Mall.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lot No. 2-69 & 2-70, Level 2, Viva Home Mall, 85, Jalan Loke Yew, Taman Miharja",
    addressLocality: "Kuala Lumpur",
    postalCode: "52200",
    addressCountry: "MY",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: ["Kuala Lumpur", "Cheras", "Taman Miharja", "Viva Home Mall"],
  knowsAbout: [
    "吉隆坡SPA",
    "吉隆坡水疗",
    "吉隆坡按摩",
    "吉隆坡下水",
    "吉隆坡莞式按摩服务",
    "莞式按摩吉隆坡",
    "吉隆坡温泉",
    "吉隆坡娱乐",
    "klspa",
    "klmassage",
    "klentertainment",
    "Kuala Lumpur spa",
    "KL onsen spa",
  ],
};

/**
 * FAQPage structured data. Google can surface these as expandable answers in
 * search results, so the FAQ copy on the page must match the copy passed here.
 */
export function faqJsonLd(faqs: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
