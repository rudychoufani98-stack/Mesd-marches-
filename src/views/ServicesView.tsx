import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import { getCategorySeo } from "@/config/catalog-seo";
import { siteConfig } from "@/config/site";
import { alternates, href, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";
import { CategoryPanel } from "@/components/catalog/CategoryPanel";
import { ServicesExplorer } from "@/components/catalog/ServicesExplorer";
import { buttonClasses, Container, FaqList } from "@/components/ui/primitives";
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
    faqText: "Une question qui n'est pas ici ? Posez-la lors de l'appel offert.",
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
    faqText: "A question that isn't here? Ask it during the free call.",
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
        <Container className="py-16 sm:py-20 lg:py-24">
          <h1 className="max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[2.75rem]">{c.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-100/85">{c.intro}</p>
          <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-100/75">
            {c.promises.map((p, i) => (
              <li key={p} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden="true" className="h-3.5 w-px bg-white/25" />}
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`${booking}?mode=accompagnement`} className={buttonClasses("light", "lg")}>
              {c.bookCta}
            </Link>
            <Link href={`${booking}?mode=appel`} className={buttonClasses("onDark", "lg")}>
              {c.callCta}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="particuliers">
        <Container>
          <h2 id="particuliers" className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
            {c.personal}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{c.personalText}</p>
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
                <p className="text-sm font-medium text-brand-700">{c.businessEyebrow}</p>
                <h2 id="business-titre" className="mt-4 font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
                  {business.name}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{business.description}</p>
              </div>
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
      <section className="bg-brand-950 text-white">
        <Container className="py-14 sm:py-20">
          <nav aria-label={c.breadcrumb} className="text-sm text-brand-100/70">
            <Link href={href("/services", locale)} className="underline decoration-white/25 underline-offset-4 hover:text-white">
              {c.allServices}
            </Link>{" "}
            <span aria-hidden="true">/</span> <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="mt-7 max-w-4xl font-display text-[2.1rem] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-[2.75rem]">{category.name}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-brand-100/85">{seo?.lead ?? category.description}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={category.kind === "business" ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?mode=accompagnement&categorie=${category.id}`}
              className={buttonClasses("light", "lg")}
            >
              {category.kind === "business" ? c.businessCta : `${c.ctaBook} · ${formatCategoryPrice(category, locale)}`}
            </Link>
            <Link href={`${booking}?mode=appel&categorie=${category.id}`} className={buttonClasses("onDark", "lg")}>
              {c.ctaCall}
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <CategoryPanel category={category} services={services} locale={locale} />
      </Container>

      <section className="border-t border-line bg-surface py-20 sm:py-24" aria-labelledby="faq-categorie">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <h2 id="faq-categorie" className="font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
              {c.faqTitle}
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">{c.faqText}</p>
          </div>
          <FaqList items={faq} />
        </Container>
      </section>

      <section className="bg-brand-950 py-20 text-white sm:py-24">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">{c.ctaTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-100/80">{c.ctaText}</p>
          </div>
          <Link href={`${booking}?mode=appel&categorie=${category.id}`} className={buttonClasses("light", "lg", "shrink-0")}>
            {c.ctaCall}
          </Link>
        </Container>
      </section>
    </>
  );
}
