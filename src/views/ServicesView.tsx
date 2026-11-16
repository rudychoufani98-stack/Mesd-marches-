import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, Check, Phone } from "lucide-react";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import { getCategorySeo } from "@/config/catalog-seo";
import { siteConfig } from "@/config/site";
import { alternates, href, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";
import { CategoryPanel } from "@/components/catalog/CategoryPanel";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { ServicesExplorer } from "@/components/catalog/ServicesExplorer";
import { Container } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

const copy = {
  fr: {
    title: "Nos services — Simplifiez vos démarches en France",
    metaTitle: "Nos services : accompagnement administratif en France pour étrangers et expatriés",
    metaDescription:
      "Logement, impôts, santé, banque, emploi, titre de séjour, installation : un accompagnement personnalisé à prix fixe, en français ou en anglais. Offre entreprises.",
    eyebrow: "Nos services",
    intro:
      "Vous souhaitez vous installer en France, mieux comprendre vos obligations administratives ou organiser vos démarches personnelles et professionnelles ? MesDémarches vous accompagne à chaque étape avec des solutions adaptées à votre situation.",
    callCta: "Appel découverte gratuit",
    bookCta: "Réserver un accompagnement",
    personal: "Pour les particuliers",
    personalText: "Un prix fixe par catégorie. Choisissez votre domaine, puis le service qui correspond à votre besoin.",
    businessEyebrow: "Entreprises",
    businessCta: "Découvrir nos solutions entreprises",
    promises: ["Un conseiller dédié, humain", "Un périmètre clair, annoncé avant de payer", "En français ou en anglais"],
    breadcrumb: "Fil d'Ariane",
    allServices: "Nos services",
    home: "Accueil",
    faqTitle: "Vos questions",
    priceQuestion: (name: string) => `Combien coûte l'accompagnement « ${name} » ?`,
    priceAnswer: (price: string, list: string) => `${price}, pour l'ensemble des services de la catégorie : ${list}. Le premier appel de 15 minutes est offert.`,
    businessPriceAnswer: (price: string) => `${price}, selon vos besoins. Nous établissons un devis après un premier échange avec votre équipe.`,
    ctaTitle: "Parlons de votre situation",
    ctaText: "15 minutes offertes avec un conseiller, sans engagement.",
    ctaBook: "Réserver un accompagnement",
    ctaCall: "Appel découverte gratuit",
  },
  en: {
    title: "Our services — Make your paperwork in France simple",
    metaTitle: "Our services: administrative support in France for foreigners and expats",
    metaDescription:
      "Housing, tax, health, banking, jobs, residence permit, settling in: personal support at a fixed price, in English or French. Business offer.",
    eyebrow: "Our services",
    intro:
      "Planning to settle in France, want to better understand your administrative obligations, or organise your personal and professional paperwork? MesDémarches supports you at every step with solutions tailored to your situation.",
    callCta: "Free discovery call",
    bookCta: "Book personal support",
    personal: "For individuals",
    personalText: "One fixed price per category. Choose your area, then the service that matches your need.",
    businessEyebrow: "Companies",
    businessCta: "Discover our business solutions",
    promises: ["A dedicated, human advisor", "A clear scope, announced before you pay", "In English or French"],
    breadcrumb: "Breadcrumb",
    allServices: "Our services",
    home: "Home",
    faqTitle: "Your questions",
    priceQuestion: (name: string) => `How much does "${name}" support cost?`,
    priceAnswer: (price: string, list: string) => `${price}, for every service in the category: ${list}. The first 15-minute call is free.`,
    businessPriceAnswer: (price: string) => `${price}, depending on your needs. We draw up a quote after a first call with your team.`,
    ctaTitle: "Let's talk about your situation",
    ctaText: "15 free minutes with an advisor, no commitment.",
    ctaBook: "Book personal support",
    ctaCall: "Free discovery call",
  },
};

export function servicesMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: { absolute: `${c.metaTitle} | MesDémarches` }, description: c.metaDescription, alternates: alternates("/services", locale) };
}

export async function ServicesView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const { categories, services } = await getCatalog(locale);
  const personal = categories.filter((cat) => cat.kind === "particulier");
  const business = categories.find((cat) => cat.kind === "business");
  const booking = href("/rendez-vous", locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: c.title,
    itemListElement: categories.map((cat) => ({
      "@type": "Offer",
      name: cat.name,
      description: cat.description,
      price: cat.price,
      priceCurrency: "EUR",
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="bg-brand-950 text-white">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{c.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/90">{c.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {c.promises.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold-300" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`${booking}?mode=accompagnement`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-300 px-6 text-sm font-semibold text-brand-950 hover:bg-gold-200">
              {c.bookCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`${booking}?mode=appel`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10">
              <Phone className="h-4 w-4" aria-hidden="true" /> {c.callCta}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="particuliers">
        <Container>
          <h2 id="particuliers" className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {c.personal}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{c.personalText}</p>
          <div className="mt-10">
            <ServicesExplorer categories={personal} services={services} locale={locale} />
          </div>
        </Container>
      </section>

      {business && (
        <section id="entreprises" className="scroll-mt-20 border-t border-line bg-surface py-16 sm:py-20" aria-labelledby="business-titre">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-700">
                  <Building2 className="h-4 w-4" aria-hidden="true" /> {c.businessEyebrow}
                </p>
                <h2 id="business-titre" className="mt-3 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {business.name}
                </h2>
                <p className="mt-3 text-muted">{business.description}</p>
              </div>
              <p className="font-display text-2xl font-medium text-ink">{formatCategoryPrice(business, locale)}</p>
            </div>
            <div className="mt-10">
              <CategoryPanel category={business} services={services.filter((s) => s.categoryId === business.id)} locale={locale} />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

/* ------------------------------------------------------------- /services/[slug] */

export async function categoryMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const category = (await getCatalog(locale)).categories.find((cat) => cat.id === slug);
  if (!category) return {};
  const seo = getCategorySeo(category.id, locale);
  const title = seo?.title ?? `${category.name} — ${formatCategoryPrice(category, locale)}`;
  const description = seo?.description ?? category.description;
  return {
    title,
    description,
    alternates: alternates(`/services/${category.id}`, locale),
    openGraph: { title, description, type: "website" },
  };
}

/** Questions fréquentes d'une catégorie : questions rédigées + question « prix » générée avec le prix réel. */
function categoryFaq(category: CatalogCategory, services: CatalogService[], locale: Locale) {
  const c = copy[locale];
  const price = formatCategoryPrice(category, locale);
  const list = services.slice(0, 5).map((s) => s.name.toLowerCase()).join(", ");
  return [
    ...(getCategorySeo(category.id, locale)?.faq ?? []),
    {
      q: c.priceQuestion(category.name),
      a: category.kind === "business" ? c.businessPriceAnswer(price) : c.priceAnswer(price, list),
    },
  ];
}

export async function CategoryView({ slug, locale }: { slug: string; locale: Locale }) {
  const c = copy[locale];
  const { categories, services: all } = await getCatalog(locale);
  const category = categories.find((cat) => cat.id === slug);
  if (!category) notFound();
  const services = all.filter((s) => s.categoryId === category.id);
  const seo = getCategorySeo(category.id, locale);
  const faq = categoryFaq(category, services, locale);
  const base = siteConfig.url.replace(/\/$/, "");
  const pageUrl = base + href(`/services/${category.id}`, locale);
  const booking = href("/rendez-vous", locale);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: category.name,
        serviceType: seo?.title ?? category.name,
        description: seo?.description ?? category.description,
        url: pageUrl,
        provider: { "@id": `${base}/#organisation` },
        areaServed: { "@type": "Country", name: "France" },
        availableLanguage: ["fr", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: category.name,
          itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.question } })),
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          ...(category.priceFrom
            ? { priceSpecification: { "@type": "PriceSpecification", minPrice: category.price, priceCurrency: "EUR" } }
            : { price: category.price }),
          url: `${base}${booking}`,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale === "en" ? "en-GB" : "fr-FR",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.home, item: base + href("/", locale) },
          { "@type": "ListItem", position: 2, name: c.allServices, item: base + href("/services", locale) },
          { "@type": "ListItem", position: 3, name: category.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
        <Container className="relative py-14 sm:py-20">
          <nav aria-label={c.breadcrumb} className="text-sm text-brand-100/80">
            <Link href={href("/services", locale)} className="hover:text-white">
              {c.allServices}
            </Link>{" "}
            / <span className="text-white">{category.name}</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-300">
              <CategoryIcon icon={category.icon} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{category.name}</h1>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100/90">{seo?.lead ?? category.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={category.kind === "business" ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?mode=accompagnement&categorie=${category.id}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-300 px-6 text-sm font-semibold text-brand-950 hover:bg-gold-200"
            >
              {category.kind === "business" ? c.businessCta : `${c.ctaBook} · ${formatCategoryPrice(category, locale)}`} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={`${booking}?mode=appel&categorie=${category.id}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {c.ctaCall}
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <CategoryPanel category={category} services={services} locale={locale} />
      </Container>

      <section className="border-t border-line bg-surface py-16 sm:py-20" aria-labelledby="faq-categorie">
        <Container>
          <h2 id="faq-categorie" className="text-center font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {c.faqTitle}
          </h2>
          <div className="reveal mx-auto mt-10 max-w-3xl divide-y divide-line rounded-[1.5rem] border border-line bg-white shadow-[0_20px_50px_-30px_rgba(22,32,58,0.25)]">
            {faq.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  <h3 className="text-base">{f.q}</h3>
                  <span className="text-xl text-brand-700 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="font-display text-2xl font-medium text-ink">{c.ctaTitle}</p>
            <p className="mt-2 text-muted">{c.ctaText}</p>
            <Link
              href={`${booking}?mode=appel&categorie=${category.id}`}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-700 px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(28,58,122,0.7)] hover:bg-brand-800"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {c.ctaCall}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
