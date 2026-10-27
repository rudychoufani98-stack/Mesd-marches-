import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";

const STATIC_PAGES = [
  "/",
  "/services",
  "/comment-ca-marche",
  "/tarifs",
  "/professionnels",
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
  const entry = (path: string, locales: Locale[]): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: url(path, locale),
      alternates: { languages: Object.fromEntries(locales.map((l) => [l === "en" ? "en-GB" : "fr-FR", url(path, l)])) },
    }));

  const { categories } = await getCatalog();

  return [
    ...STATIC_PAGES.flatMap((p) => entry(p, ["fr", "en"])),
    ...categories.flatMap((c) => entry(`/services/${c.id}`, ["fr", "en"])),
  ];
}
