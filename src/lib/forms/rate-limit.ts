/**
 * Limitation simple du nombre d'envois par adresse IP, en mémoire.
 * Suffisant pour un MVP sur une seule instance ; à remplacer par un stockage partagé
 * (ex. Redis) si l'application tourne sur plusieurs instances.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}
