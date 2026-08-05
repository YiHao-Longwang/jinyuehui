import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "24-Hour Onsen Spa & Sauna in Kuala Lumpur · One Spa",
  description:
    "A warm 24-hour hot-spring spa page with packages, facilities, FAQ, and WhatsApp booking.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "24-Hour Onsen Spa & Sauna in Kuala Lumpur · One Spa",
    description:
      "Pools, steam, sauna, massage and dining - one ticket, a full 12-hour stay.",
    images: [
      {
        url: "https://onespa.com.my/wp-content/themes/onespa-warm/assets/hero-onsen-warm.jpg",
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
      <body>{children}</body>
    </html>
  );
}
