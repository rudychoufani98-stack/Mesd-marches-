/** Vrai quand les deux variables Supabase sont renseignées (.env.local ou Vercel). */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function supabaseEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

/**
 * Cookies de session de l'admin : illisibles par JavaScript (httpOnly), envoyés uniquement en HTTPS
 * en production, et non envoyés par les requêtes venant d'autres sites (sameSite lax).
 * Possible car l'application n'utilise jamais Supabase depuis le navigateur.
 */
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
