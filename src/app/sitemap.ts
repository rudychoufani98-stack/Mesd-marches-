import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n";
import { getActiveDomains, getPublishedGuides } from "@/lib/data/content";

const STATIC_PAGES = [
  "/",
  "/services",
  "/guides",
  "/comment-ca-marche",
  "/tarifs",
  "/professionnels",
  "/plan-action",
  "/outils/budget",
  "/rendez-vous",
  "/contact",
  "/faq",
  "/mentions-legales",
  "/confidentialite",
  "/cookies",
  "/mes-donnees",
  "/cgv",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = (path: string, locale: Locale) => {
    const p = href(path, locale);
    return p === "/" ? base : `${base}${p}`;
  };
  /** Une entrée par langue, chacune déclarant ses versions alternatives (hreflang). */
  const entry = (path: string, locales: Locale[], lastModified?: string): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: url(path, locale),
      lastModified,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l === "en" ? "en-GB" : "fr-FR", url(path, l)])) },
    }));

  const [domains, guidesFr, guidesEn] = await Promise.all([getActiveDomains(), getPublishedGuides("fr"), getPublishedGuides("en")]);
  const englishSlugs = new Set(guidesEn.map((g) => g.slug));

  return [
    ...STATIC_PAGES.flatMap((p) => entry(p, ["fr", "en"])),
    ...domains.flatMap((d) => entry(`/services/${d.slug}`, ["fr", "en"])),
    ...guidesFr.flatMap((g) => entry(`/guides/${g.slug}`, englishSlugs.has(g.slug) ? ["fr", "en"] : ["fr"], g.updatedAt)),
  ];
}
