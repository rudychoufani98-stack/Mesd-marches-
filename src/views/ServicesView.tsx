import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Building2, Check, Phone } from "lucide-react";
import { formatCategoryPrice } from "@/config/catalog";
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
  return {
    title: `${category.name} — ${formatCategoryPrice(category, locale)}`,
    description: category.description,
    alternates: alternates(`/services/${category.id}`, locale),
  };
}

export async function CategoryView({ slug, locale }: { slug: string; locale: Locale }) {
  const c = copy[locale];
  const { categories, services } = await getCatalog(locale);
  const category = categories.find((cat) => cat.id === slug);
  if (!category) notFound();
  return (
    <>
      <section className="bg-brand-950 text-white">
        <Container className="py-14 sm:py-16">
          <nav aria-label={c.breadcrumb} className="text-sm text-brand-100/80">
            <Link href={href("/services", locale)} className="hover:text-white">
              {c.allServices}
            </Link>{" "}
            / <span className="text-white">{category.name}</span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold-300">
              <CategoryIcon icon={category.icon} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{category.name}</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-brand-100/90">{category.description}</p>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <CategoryPanel category={category} services={services.filter((s) => s.categoryId === category.id)} locale={locale} />
      </Container>
    </>
  );
}
