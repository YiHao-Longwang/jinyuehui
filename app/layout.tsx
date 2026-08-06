import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "onepsa",
  applicationName: "onepsa",
  description:
    "A warm 24-hour hot-spring spa page with packages, facilities, FAQ, and WhatsApp booking.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "onepsa",
    description:
      "Pools, steam, sauna, massage and dining - one ticket, a full 12-hour stay.",
    images: [
      {
        url: "/assets/hero-onsen-warm.jpg",
        width: 1280,
        height: 853,
      },
    ],
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
        <script src="/booking-cart.js" defer />
      </body>
    </html>
  );
}
