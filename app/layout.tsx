import type { Metadata } from "next";
import "./globals.css";
import { localBusinessJsonLd, pageMetadata, siteUrl } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({
    title: "One Spa 南海龙宫 | 吉隆坡SPA · KL Spa & Massage",
    description:
      "One Spa 南海龙宫 at Viva Home Mall Kuala Lumpur: 24-hour spa, hot spring, KL massage, beauty, TCM wellness, private rooms and home massage booking.",
    path: "/",
    keywords: ["南海龙宫 SPA", "吉隆坡按摩推荐", "Kuala Lumpur spa", "Viva Home Mall massage"],
  }),
  applicationName: "onepsa",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script src="/booking-cart.js?v=20260807-live-modal-copy" defer />
      </body>
    </html>
  );
}
