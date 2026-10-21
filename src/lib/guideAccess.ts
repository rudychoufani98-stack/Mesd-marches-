import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Accès aux guides réservé aux clients.
 *
 * Les guides ne sont plus publics : chaque guide s'ouvre avec un lien client
 * `/guides/<slug>?cle=<clé>`, que l'admin copie depuis l'espace admin et envoie au client.
 * La clé est une signature HMAC du slug avec le secret GUIDES_LINK_SECRET (variable Vercel).
 * Sans ce secret, aucun guide n'est accessible.
 */
const secret = () => process.env.GUIDES_LINK_SECRET?.trim() || null;

export function guideLinksEnabled(): boolean {
  return secret() !== null;
}

export function guideKey(slug: string): string | null {
  const s = secret();
  if (!s) return null;
  return createHmac("sha256", s).update(`guide:${slug}`).digest("base64url").slice(0, 24);
}

export function canReadGuide(slug: string, key: unknown): boolean {
  const expected = guideKey(slug);
  if (!expected || typeof key !== "string" || key.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(key), Buffer.from(expected));
}

/** Chemin du lien client (sans le domaine), en français ou en anglais. */
export function guideClientPath(slug: string, locale: "fr" | "en"): string | null {
  const key = guideKey(slug);
  if (!key) return null;
  return `${locale === "en" ? "/en" : ""}/guides/${slug}?cle=${key}`;
}
