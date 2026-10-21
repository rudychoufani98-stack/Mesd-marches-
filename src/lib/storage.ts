/**
 * Stockage local dans le navigateur (aucune donnée envoyée au serveur).
 * Utilisé pour la progression des checklists, le dernier plan d'action, le budget
 * et le choix de masquer l'information sur les cookies.
 * Toutes les lectures/écritures sont protégées : le site fonctionne même si le stockage est bloqué.
 */
const PREFIX = "mesdemarches:";

export function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocal(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Stockage indisponible (navigation privée, quota…) : on ignore.
  }
}

export function removeLocal(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

/** Efface toutes les données MesDémarches enregistrées dans ce navigateur. Retourne le nombre d'éléments supprimés. */
export function clearAllLocal(): number {
  try {
    const keys = Object.keys(window.localStorage).filter((k) => k.startsWith(PREFIX));
    keys.forEach((k) => window.localStorage.removeItem(k));
    return keys.length;
  } catch {
    return 0;
  }
}
