/**
 * Stockage local dans le navigateur (aucune donnée envoyée au serveur).
 * Utilisé pour la progression des checklists et le dernier plan d'action.
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
