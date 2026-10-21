import { siteConfig } from "@/config/site";

/**
 * security.txt (RFC 9116) : indique aux chercheurs en sécurité comment signaler une faille.
 * La date d'expiration doit être renouvelée chaque année.
 */
export function GET() {
  const base = siteConfig.url.replace(/\/$/, "");
  const body = [
    `Contact: ${base}/contact`,
    ...(siteConfig.contactEmail ? [`Contact: mailto:${siteConfig.contactEmail}`] : []),
    "Expires: 2027-10-21T00:00:00.000Z",
    "Preferred-Languages: fr, en",
    `Canonical: ${base}/.well-known/security.txt`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
