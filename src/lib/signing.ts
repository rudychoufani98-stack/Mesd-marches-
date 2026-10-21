import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signature des liens privés (guides clients, liens de paiement).
 * Le secret est la variable Vercel GUIDES_LINK_SECRET : sans elle, aucun lien signé n'est valide.
 */
const secret = () => process.env.GUIDES_LINK_SECRET?.trim() || null;

export function signingEnabled(): boolean {
  return secret() !== null;
}

export function sign(purpose: string, value: string): string | null {
  const s = secret();
  if (!s) return null;
  return createHmac("sha256", s).update(`${purpose}:${value}`).digest("base64url").slice(0, 24);
}

export function verify(purpose: string, value: string, signature: unknown): boolean {
  const expected = sign(purpose, value);
  if (!expected || typeof signature !== "string" || signature.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
