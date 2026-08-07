import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

const routes = [
  "",
  "/packages",
  "/facilities",
  "/home-massage",
  "/beauty",
  "/tcm",
  "/onsen-kl",
  "/faq",
  "/contact",
  "/cn",
  "/cn/packages",
  "/cn/facilities",
  "/cn/home-massage",
  "/cn/beauty",
  "/cn/tcm",
  "/cn/wenquan",
  "/cn/faq",
  "/cn/contact",
  "/cancellation-and-refund-policy-on-service",
  "/terms-conditions",
  "/privacy-policy",
  "/cn/cancellation-and-refund-policy-on-service",
  "/cn/terms-conditions",
  "/cn/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}/`,
    lastModified: new Date(),
    changeFrequency: route.includes("packages") ? "weekly" : "monthly",
    priority: route === "" || route === "/cn" ? 1 : route.includes("packages") ? 0.9 : 0.75,
  }));
}
