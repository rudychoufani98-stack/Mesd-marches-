import type { CatalogCategory, CatalogService, CategoryIcon } from "@/config/catalog";

/** Conversions entre les lignes de la base (snake_case) et le catalogue de l'application. */

const ICONS: CategoryIcon[] = ["logement", "fiscalite", "sante", "banque", "emploi", "immigration", "quotidien", "business"];

export type CategoryRow = {
  id: string;
  kind: "particulier" | "business";
  name: string;
  description: string;
  price: number | string;
  price_from: boolean;
  icon: string;
  includes: string[] | null;
  texts_en: CatalogCategory["en"] | null;
  sort: number;
  active: boolean;
};

export type ServiceRow = {
  id: string;
  category_id: string;
  name: string;
  question: string;
  texts_en: CatalogService["en"] | null;
  sort: number;
  active: boolean;
};

export function categoryFromRow(r: CategoryRow): CatalogCategory {
  return {
    id: r.id,
    kind: r.kind === "business" ? "business" : "particulier",
    name: r.name,
    description: r.description ?? "",
    price: Number(r.price),
    priceFrom: Boolean(r.price_from),
    icon: (ICONS as string[]).includes(r.icon) ? (r.icon as CategoryIcon) : "quotidien",
    includes: r.includes ?? [],
    sort: r.sort,
    active: r.active,
    ...(r.texts_en ? { en: r.texts_en } : {}),
  };
}

export function categoryToRow(c: CatalogCategory): CategoryRow {
  return {
    id: c.id,
    kind: c.kind,
    name: c.name,
    description: c.description,
    price: c.price,
    price_from: c.priceFrom,
    icon: c.icon,
    includes: c.includes,
    texts_en: c.en ?? null,
    sort: c.sort,
    active: c.active,
  };
}

export function serviceFromRow(r: ServiceRow): CatalogService {
  return {
    id: r.id,
    categoryId: r.category_id,
    name: r.name,
    question: r.question ?? "",
    sort: r.sort,
    active: r.active,
    ...(r.texts_en ? { en: r.texts_en } : {}),
  };
}

export function serviceToRow(s: CatalogService): ServiceRow {
  return {
    id: s.id,
    category_id: s.categoryId,
    name: s.name,
    question: s.question,
    texts_en: s.en ?? null,
    sort: s.sort,
    active: s.active,
  };
}
