import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Tant que NEXT_PUBLIC_ALLOW_INDEXING n'est pas à "true", le site n'est pas indexé (pré-production).
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    // Pages privées (connexion, paiement, guides clients, confirmation) : exclues par leur balise « noindex »,
    // que Google doit pouvoir lire — on ne bloque donc que l'espace admin.
    rules: allowIndexing ? { userAgent: "*", allow: "/", disallow: ["/admin"] } : { userAgent: "*", disallow: "/" },
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
