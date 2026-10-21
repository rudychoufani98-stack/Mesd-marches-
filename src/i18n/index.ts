import { fr, type Dictionary } from "./fr";
import { en } from "./en";

/**
 * Langues du site public.
 * - Français : URL sans préfixe (/services, /guides…)
 * - Anglais : URL préfixées par /en (/en/services, /en/guides…)
 * L'espace admin reste en français.
 * Pour ajouter une langue (ex. arabe) : créer le dictionnaire, l'ajouter ici, créer les routes /ar
 * et penser à dir="rtl".
 */
export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = { fr: "ltr", en: "ltr" };
export const localeTags: Record<Locale, string> = { fr: "fr-FR", en: "en-GB" };

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

/** Langue d'une URL : /en ou /en/... → anglais, sinon français. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}

/** Retire le préfixe de langue : /en/services → /services. */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

/** Construit un lien interne dans la langue voulue : href("/services", "en") → /en/services. */
export function href(path: string, locale: Locale): string {
  if (locale === "fr") return path;
  if (path === "/") return "/en";
  return path.startsWith("/") ? `/en${path}` : path;
}

/** Équivalent de la page courante dans l'autre langue (pour le bouton de langue). */
export function switchLocalePath(pathname: string, target: Locale): string {
  return href(stripLocale(pathname), target);
}

/** Métadonnées hreflang : chaque page déclare ses deux versions linguistiques. */
export function alternates(path: string, locale: Locale) {
  return {
    canonical: href(path, locale),
    languages: { "fr-FR": href(path, "fr"), "en-GB": href(path, "en"), "x-default": href(path, "fr") },
  };
}

export type { Dictionary };
