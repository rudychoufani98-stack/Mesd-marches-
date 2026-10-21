import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultOffers, type Offer } from "@/config/pricing";
import type { CategoryId } from "@/content/categories";
import { defaultGuides, type Guide } from "@/content/guides";
import { serviceDomains, type ServiceDomain } from "@/content/services";
import { createPublicClient } from "@/lib/supabase/public";
import { guideFromRow, offerFromRow, type GuideRow, type OfferRow } from "./mappers";
import type { Locale } from "@/i18n";
import { localizeDomain, localizeGuide, localizeOffer } from "@/content/translations";

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

async function loadOffers(): Promise<Offer[]> {
  "use cache";
  cacheTag(CONTENT_TAGS.offers);
  cacheLife("hours");
  const supabase = createPublicClient();
  if (!supabase) return defaultOffers;
  const { data, error } = await supabase.from("offers").select("*").eq("active", true).order("sort");
  if (error || !data || data.length === 0) return defaultOffers;
  return (data as OfferRow[]).map(offerFromRow);
}

export async function getOffers(locale: Locale = "fr"): Promise<Offer[]> {
  return (await loadOffers()).map((o) => localizeOffer(o, locale));
}

export async function getOffer(id: string, locale: Locale = "fr"): Promise<Offer | undefined> {
  return (await getOffers(locale)).find((o) => o.id === id);
}

/** Guides visibles du public (en français), depuis la base ou le contenu par défaut. */
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

/**
 * Guides visibles dans une langue. En anglais, seuls les guides traduits apparaissent ;
 * leur statut, leur date de vérification et leurs sources restent ceux de la version française.
 */
export async function getVisibleGuides(locale: Locale = "fr"): Promise<Guide[]> {
  return (await loadGuides()).guides.map((g) => localizeGuide(g, locale)).filter((g): g is Guide => g !== null);
}

export async function getPublishedGuides(locale: Locale = "fr"): Promise<Guide[]> {
  return (await getVisibleGuides(locale)).filter((g) => g.status === "published");
}

export async function getPublishedGuideSlugs(locale: Locale = "fr"): Promise<string[]> {
  return (await getPublishedGuides(locale)).map((g) => g.slug);
}

export async function getGuide(slug: string, locale: Locale = "fr"): Promise<Guide | undefined> {
  return (await getVisibleGuides(locale)).find((g) => g.slug === slug);
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

export async function getActiveDomains(locale: Locale = "fr"): Promise<ServiceDomain[]> {
  const [visibility, published] = await Promise.all([loadVisibility(), getPublishedGuideSlugs(locale)]);
  const isOn = (id: string, fallback: boolean) => visibility[id] ?? fallback;
  // Un lien vers un guide dépublié (ou non traduit) est retiré plutôt que de mener à une page introuvable.
  const linkIfAvailable = (href?: string) =>
    href?.startsWith("/guides/") && !published.includes(href.slice("/guides/".length)) ? undefined : href;
  return serviceDomains
    .filter((d) => isOn(`domain:${d.slug}`, d.active))
    .map((d) =>
      localizeDomain(
        {
          ...d,
          items: d.items.filter((i) => isOn(`item:${i.id}`, i.active)).map((i) => ({ ...i, href: linkIfAvailable(i.href) })),
        },
        locale,
      ),
    );
}

export async function getDomainBySlug(slug: string, locale: Locale = "fr"): Promise<ServiceDomain | undefined> {
  return (await getActiveDomains(locale)).find((d) => d.slug === slug);
}

export async function getDomainByCategory(category: CategoryId, locale: Locale = "fr"): Promise<ServiceDomain | undefined> {
  return (await getActiveDomains(locale)).find((d) => d.category === category);
}
