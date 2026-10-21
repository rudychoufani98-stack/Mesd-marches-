import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedGuides } from "@/content/guides";
import { getActiveDomains } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticPages = [
    "",
    "/services",
    "/guides",
    "/comment-ca-marche",
    "/tarifs",
    "/plan-action",
    "/outils/budget",
    "/rendez-vous",
    "/contact",
    "/faq",
    "/mentions-legales",
    "/confidentialite",
    "/cgv",
  ];

  return [
    ...staticPages.map((path) => ({ url: `${base}${path}` })),
    ...getActiveDomains().map((d) => ({ url: `${base}/services/${d.slug}` })),
    ...getPublishedGuides().map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: g.updatedAt })),
  ];
}
