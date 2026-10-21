import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getActiveDomains, getPublishedGuides } from "@/lib/data/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...(await getActiveDomains()).map((d) => ({ url: `${base}/services/${d.slug}` })),
    ...(await getPublishedGuides()).map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: g.updatedAt })),
  ];
}
