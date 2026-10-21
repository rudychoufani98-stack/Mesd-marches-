import type { Locale } from "@/i18n";
import type { Offer } from "@/config/pricing";
import type { Category, CategoryId } from "./categories";
import type { Guide } from "./guides";
import type { ServiceDomain } from "./services";
import type { OfficialSource, SourceId } from "./sources";
import { categoriesEn } from "./en/categories";
import { servicesEn } from "./en/services";
import { guidesEn } from "./en/guides";
import { offersEn } from "./en/offers";
import { sourcesEn } from "./en/sources";

/**
 * Traductions du contenu éditorial.
 * Le français reste la langue de référence (code + base de données).
 * Les traductions anglaises sont indexées par identifiant ; si une traduction manque,
 * le texte français est utilisé (sauf pour les guides : un guide non traduit n'apparaît pas en anglais).
 */

export type CategoryText = Pick<Category, "title" | "shortTitle" | "description">;

export type ServiceDomainText = {
  seoTitle: string;
  seoDescription: string;
  intro: string;
  limits: string[];
  items: Record<string, { title: string; description: string }>;
};

/** Mêmes étapes, même nombre de cases (mêmes identifiants) que la version française. */
export type GuideText = Pick<Guide, "title" | "description" | "intro" | "steps" | "glossary"> & {
  /** Libellés traduits, indexés par l'identifiant de la case de la version française. */
  checklist: Record<string, string>;
};

export type OfferText = Pick<Offer, "name" | "tagline" | "duration" | "includes" | "excludes" | "responseTime" | "cancellation">;

export type SourceText = Pick<OfficialSource, "label">;

export function localizeCategory(c: Category, locale: Locale): Category {
  if (locale === "fr") return c;
  return { ...c, ...categoriesEn[c.id as CategoryId] };
}

export function localizeDomain(d: ServiceDomain, locale: Locale): ServiceDomain {
  const t = locale === "en" ? servicesEn[d.slug] : undefined;
  if (!t) return d;
  return {
    ...d,
    seoTitle: t.seoTitle,
    seoDescription: t.seoDescription,
    intro: t.intro,
    limits: t.limits,
    items: d.items.map((i) => ({ ...i, ...(t.items[i.id] ?? {}) })),
  };
}

/** Retourne null si le guide n'a pas de traduction anglaise. */
export function localizeGuide(g: Guide, locale: Locale): Guide | null {
  if (locale === "fr") return g;
  const t = guidesEn[g.slug];
  if (!t) return null;
  return {
    ...g,
    title: t.title,
    description: t.description,
    intro: t.intro,
    steps: t.steps,
    glossary: t.glossary,
    checklist: g.checklist.map((c) => ({ id: c.id, label: t.checklist[c.id] ?? c.label })),
  };
}

/** Le prix et la facturation viennent toujours de la base ; seuls les textes sont traduits. */
export function localizeOffer(o: Offer, locale: Locale): Offer {
  const t = locale === "en" ? offersEn[o.id] : undefined;
  return t ? { ...o, ...t } : o;
}

export function localizeSource(s: OfficialSource, locale: Locale): OfficialSource {
  const t = locale === "en" ? sourcesEn[s.id as SourceId] : undefined;
  return t ? { ...s, ...t } : s;
}
