import type { Metadata } from "next";
import "./globals.css";
import { localBusinessJsonLd, pageMetadata, siteUrl } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata({
    title: "金悦汇 Indulgence | 吉隆坡SPA · KL Spa & Massage",
    description:
      "金悦汇 Indulgence at Viva Home Mall Kuala Lumpur: 24-hour spa, hot spring, KL massage, 吉隆坡下水, 吉隆坡莞式按摩服务, beauty, TCM wellness and home massage booking.",
    path: "/",
    keywords: ["金悦汇 SPA", "吉隆坡按摩推荐", "吉隆坡下水", "吉隆坡莞式按摩服务", "Kuala Lumpur spa", "Viva Home Mall massage"],
  }),
  applicationName: "jinyuehui",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-48x48.png",
    apple: "/apple-touch-icon.png",
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
        <script src="/contact-clicks.js?v=20260824-contact-clicks" defer />
        <script src="/booking-cart.js?v=20260809-cart-rehydrate" defer />
      </body>
    </html>
  );
}
