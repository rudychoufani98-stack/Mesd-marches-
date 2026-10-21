import "server-only";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabaseEnv } from "./config";

/**
 * Client « visiteur » sans cookie : lecture des contenus publiés et dépôt des demandes.
 * Utilisable dans les fonctions mises en cache ("use cache"), car il ne lit pas la session.
 * Les règles d'accès (RLS) de la base limitent ce qu'il peut faire.
 */
export function createPublicClient() {
  if (!isSupabaseConfigured()) return null;
  const { url, anonKey } = supabaseEnv();
  return createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}
