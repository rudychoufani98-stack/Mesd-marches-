import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** Pages publiques, avec leur importance pour les moteurs de recherche (1 = page clé). */
const STATIC_PAGES: { path: string; priority: number; freq: Freq }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/services", priority: 0.95, freq: "weekly" },
  { path: "/tarifs", priority: 0.9, freq: "monthly" },
  { path: "/rendez-vous", priority: 0.85, freq: "monthly" },
  { path: "/comment-ca-marche", priority: 0.7, freq: "monthly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/professionnels", priority: 0.5, freq: "monthly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/outils/budget", priority: 0.4, freq: "yearly" },
  { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
  { path: "/confidentialite", priority: 0.2, freq: "yearly" },
  { path: "/cookies", priority: 0.1, freq: "yearly" },
  { path: "/mes-donnees", priority: 0.1, freq: "yearly" },
  { path: "/cgv", priority: 0.2, freq: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = (path: string, locale: Locale) => {
    const p = href(path, locale);
    return p === "/" ? base : `${base}${p}`;
  };
  /** Une entrée par langue, chacune déclarant ses versions alternatives (hreflang). */
  const entry = (path: string, priority: number, freq: Freq): MetadataRoute.Sitemap =>
    (["fr", "en"] as Locale[]).map((locale) => ({
      url: url(path, locale),
      changeFrequency: freq,
      // L'anglais est légèrement moins prioritaire : le français reste la version de référence.
      priority: locale === "fr" ? priority : Math.round(priority * 90) / 100,
      alternates: { languages: { "fr-FR": url(path, "fr"), "en-GB": url(path, "en"), "x-default": url(path, "fr") } },
    }));

  const { categories } = await getCatalog();

  return [
    ...STATIC_PAGES.flatMap((p) => entry(p.path, p.priority, p.freq)),
    ...categories.flatMap((c) => entry(`/services/${c.id}`, 0.9, "monthly")),
  ];
}
