import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultOffers, type Offer } from "@/config/pricing";
import type { CategoryId } from "@/content/categories";
import { defaultGuides, type Guide } from "@/content/guides";
import { serviceDomains, type ServiceDomain } from "@/content/services";
import { createPublicClient } from "@/lib/supabase/public";
import { guideFromRow, offerFromRow, type GuideRow, type OfferRow } from "./mappers";

/**
 * Accès aux contenus publics (offres, guides, visibilité des services).
 *
 * - Supabase configuré et contenu présent : les données viennent de la base.
 * - Sinon (pas de configuration, table vide, erreur) : contenu par défaut du code.
 *
 * Les résultats sont mis en cache et invalidés par l'espace admin (updateTag).
 */
export const CONTENT_TAGS = {
  offers: "offres",
  guides: "guides",
  services: "services",
} as const;

/** Brouillons visibles uniquement en développement et en mode « contenu par défaut ». */
const SHOW_DEFAULT_DRAFTS = process.env.NODE_ENV !== "production";

export async function getOffers(): Promise<Offer[]> {
  "use cache";
  cacheTag(CONTENT_TAGS.offers);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (!supabase) return defaultOffers;
  const { data, error } = await supabase.from("offers").select("*").eq("active", true).order("sort");
  if (error || !data || data.length === 0) return defaultOffers;
  return (data as OfferRow[]).map(offerFromRow);
}

export async function getOffer(id: string): Promise<Offer | undefined> {
  return (await getOffers()).find((o) => o.id === id);
}

/** Guides visibles du public, avec `source: "db"` si la base est utilisée. */
async function loadGuides(): Promise<{ guides: Guide[]; fromDb: boolean }> {
  "use cache";
  cacheTag(CONTENT_TAGS.guides);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (supabase) {
    const { data, error } = await supabase.from("guides").select("*").eq("status", "published").order("title");
    if (!error && data && data.length > 0) {
      return {
        guides: (data as GuideRow[]).map(guideFromRow).filter((g): g is Guide => g !== null),
        fromDb: true,
      };
    }
  }
  return {
    guides: defaultGuides.filter((g) => g.status === "published" || SHOW_DEFAULT_DRAFTS),
    fromDb: false,
  };
}

export async function getVisibleGuides(): Promise<Guide[]> {
  return (await loadGuides()).guides;
}

export async function getPublishedGuides(): Promise<Guide[]> {
  return (await loadGuides()).guides.filter((g) => g.status === "published");
}

export async function getPublishedGuideSlugs(): Promise<string[]> {
  return (await getPublishedGuides()).map((g) => g.slug);
}

export async function getGuide(slug: string): Promise<Guide | undefined> {
  return (await getVisibleGuides()).find((g) => g.slug === slug);
}

/** Identifiants masqués (domaines et services) enregistrés dans l'espace admin. */
async function loadVisibility(): Promise<Record<string, boolean>> {
  "use cache";
  cacheTag(CONTENT_TAGS.services);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (!supabase) return {};
  const { data, error } = await supabase.from("service_visibility").select("id, active");
  if (error || !data) return {};
  return Object.fromEntries(data.map((r: { id: string; active: boolean }) => [r.id, r.active]));
}

export async function getActiveDomains(): Promise<ServiceDomain[]> {
  const [visibility, published] = await Promise.all([loadVisibility(), getPublishedGuideSlugs()]);
  const isOn = (id: string, fallback: boolean) => visibility[id] ?? fallback;
  // Un lien vers un guide dépublié est retiré plutôt que de mener à une page introuvable.
  const linkIfAvailable = (href?: string) =>
    href?.startsWith("/guides/") && !published.includes(href.slice("/guides/".length)) ? undefined : href;
  return serviceDomains
    .filter((d) => isOn(`domain:${d.slug}`, d.active))
    .map((d) => ({
      ...d,
      items: d.items.filter((i) => isOn(`item:${i.id}`, i.active)).map((i) => ({ ...i, href: linkIfAvailable(i.href) })),
    }));
}

export async function getDomainBySlug(slug: string): Promise<ServiceDomain | undefined> {
  return (await getActiveDomains()).find((d) => d.slug === slug);
}

export async function getDomainByCategory(category: CategoryId): Promise<ServiceDomain | undefined> {
  return (await getActiveDomains()).find((d) => d.category === category);
}
