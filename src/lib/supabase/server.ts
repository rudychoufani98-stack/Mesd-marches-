import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { isSupabaseConfigured, supabaseEnv } from "./config";

/** Client lié à la session de l'utilisateur connecté (cookies). Les règles RLS s'appliquent. */
export async function createSessionClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = supabaseEnv();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Appelé depuis un Server Component : le proxy (src/proxy.ts) rafraîchit la session.
        }
      },
    },
  });
}

/**
 * Vérifie que la personne connectée est administratrice.
 * À appeler au début de CHAQUE page et action de l'espace admin.
 * `cache` évite de refaire la vérification plusieurs fois pendant un même rendu.
 */
export const requireAdmin = cache(async () => {
  // Toujours évalué à la requête, jamais figé au moment du build.
  await connection();
  if (!isSupabaseConfigured()) redirect("/admin/connexion");
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/connexion?erreur=acces");
  return { supabase, user, email: user.email ?? "admin" };
});
