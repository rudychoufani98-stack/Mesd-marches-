import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { jsonLd } from "@/lib/seo";
import { defaultLocale, localeDirection } from "@/i18n";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/** Police d'affichage (titres de l'accueil) pour un rendu plus haut de gamme. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Organisez vos démarches en France`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: ["en_GB"],
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MesDémarches — Perdu dans les démarches en France ? On vous guide." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  // Code de vérification Google Search Console (à renseigner dans Vercel le jour de l'ouverture à Google).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

/** Données structurées : qui est MesDémarches (organisation + site), pour les moteurs de recherche. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organisation`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/brand/mesdemarches-symbole.png`,
      description: siteConfig.description,
      areaServed: { "@type": "Country", name: "France" },
      knowsLanguage: ["fr", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#site`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: ["fr-FR", "en-GB"],
      publisher: { "@id": `${siteConfig.url}/#organisation` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#1c3a7a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={defaultLocale} dir={localeDirection[defaultLocale]} className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd)} />
        {children}
      </body>
    </html>
  );
}
