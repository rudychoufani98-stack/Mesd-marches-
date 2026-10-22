/**
 * Paramètres de protection des données.
 * Toute modification de la politique de confidentialité doit changer PRIVACY_VERSION :
 * chaque demande enregistre la version acceptée par la personne.
 */
export const PRIVACY_VERSION = "2026-10-22";

/** Durée de conservation des demandes (contact, rendez-vous), en mois. Doit rester alignée avec la migration SQL. */
export const REQUEST_RETENTION_MONTHS = 12;

export function retentionCutoff(now = new Date()): Date {
  const d = new Date(now);
  d.setMonth(d.getMonth() - REQUEST_RETENTION_MONTHS);
  return d;
}
