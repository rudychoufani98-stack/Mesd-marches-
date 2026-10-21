import "server-only";
import { sign, signingEnabled, verify } from "@/lib/signing";

/**
 * Accès aux guides réservé aux clients.
 *
 * Les guides ne sont plus publics : chaque guide s'ouvre avec un lien client
 * `/guides/<slug>?cle=<clé>`, que l'admin copie depuis l'espace admin et envoie au client.
 * La clé est une signature du slug (voir `signing.ts`). Sans secret configuré, aucun guide n'est accessible.
 */
export const guideLinksEnabled = signingEnabled;

export function guideKey(slug: string): string | null {
  return sign("guide", slug);
}

export function canReadGuide(slug: string, key: unknown): boolean {
  return verify("guide", slug, key);
}

/** Chemin du lien client (sans le domaine), en français ou en anglais. */
export function guideClientPath(slug: string, locale: "fr" | "en"): string | null {
  const key = guideKey(slug);
  if (!key) return null;
  return `${locale === "en" ? "/en" : ""}/guides/${slug}?cle=${key}`;
}
