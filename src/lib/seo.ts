/**
 * Sérialise des données structurées (JSON-LD) pour une balise <script>.
 * Le caractère « < » est échappé pour qu'aucun contenu ne puisse fermer la balise.
 */
export function jsonLd(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
