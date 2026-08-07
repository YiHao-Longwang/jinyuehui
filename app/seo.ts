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
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

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

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "One Spa",
  alternateName: ["oneSPA", "壹号汤泉", "南海龙宫", "KL Spa"],
  url: siteUrl,
  image: `${siteUrl}/assets/hero-onsen-warm.jpg`,
  telephone: "+60 14-315 5632",
  priceRange: "RM58-RM1699",
  description:
    "One Spa 南海龙宫 is a 24-hour spa, massage, hot-spring and wellness destination in Kuala Lumpur at Viva Home Mall.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lot No. 2-53 & 2-56, Level 2, Viva Home Mall, 85, Jalan Loke Yew, Taman Miharja",
    addressLocality: "Kuala Lumpur",
    postalCode: "55200",
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
  knowsAbout: ["吉隆坡SPA", "吉隆坡按摩", "吉隆坡娱乐", "klspa", "klmassage", "klentertainment"],
};
