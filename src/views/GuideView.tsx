import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, getDictionary, href, localeTags, type Locale } from "@/i18n";
import { getDomainByCategory, getGuide, getOffers, getVisibleGuides } from "@/lib/data/content";
import { formatPrice } from "@/config/pricing";
import { Checklist } from "@/components/guides/Checklist";
import { formatDate, SourceList, VerificationStatus } from "@/components/guides/shared";
import { Badge, ButtonLink, Container, Notice } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

/** Démarche payante correspondant à chaque guide (les autres guides renvoient vers l'appel gratuit). */
const GUIDE_OFFERS: Record<string, string> = {
  "permis-de-conduire-etranger": "d-permis",
  "preparer-dossier-locatif": "d-dossier-location",
  "comprendre-ouverture-compte-bancaire": "d-compte-bancaire",
  "s-orienter-protection-sociale": "d-assurance-maladie",
  "preparer-sa-declaration-de-revenus": "d-impots",
  "comprendre-sa-fiche-de-paie": "d-emploi",
  "checklist-demenagement": "d-emmenagement",
  "organiser-ses-documents-numeriques": "d-comptes-en-ligne",
};

const copy = {
  fr: {
    breadcrumbLabel: "Fil d'Ariane",
    guides: "Guides pratiques",
    draft: "Brouillon — non publié",
    minRead: "min de lecture",
    updated: "Mis à jour le",
    unverifiedText:
      "Ce guide présente des informations générales qui n'ont pas encore été relues face aux sources officielles citées ci-dessous. Les règles peuvent dépendre de votre situation et évoluer : vérifiez toujours auprès de l'organisme compétent.",
    steps: "Les étapes",
    glossary: "Glossaire",
    sources: "Sources officielles",
    sourcesText: "Consultez ces sites pour obtenir l'information à jour et adaptée à votre situation.",
    helpTitle: "Besoin d'un coup de main ?",
    helpText: "Un rendez-vous permet de faire le point sur vos priorités et de construire un plan adapté.",
    book: "Poser ma question (appel gratuit)",
    checklist: "Ma checklist",
    seeDomain: "Voir le domaine",
    home: "Accueil",
    related: "À lire aussi",
    helpWith: "Être aidé·e pour cette démarche",
    translationNote: null as string | null,
  },
  en: {
    breadcrumbLabel: "Breadcrumb",
    guides: "Practical guides",
    draft: "Draft — not published",
    minRead: "min read",
    updated: "Updated on",
    unverifiedText:
      "This guide gives general information that has not yet been reviewed against the official sources listed below. Rules may depend on your situation and change over time: always check with the relevant authority.",
    steps: "Step by step",
    glossary: "Glossary",
    sources: "Official sources",
    sourcesText: "These official websites are in French. Check them for up-to-date information that fits your situation.",
    helpTitle: "Need a hand?",
    helpText: "An appointment helps you review your priorities and build a plan that suits you.",
    book: "Ask my question (free call)",
    checklist: "My checklist",
    seeDomain: "See the topic",
    home: "Home",
    related: "Related guides",
    helpWith: "Get help with this procedure",
    translationNote: "This guide is a translation of the French version, which is the reference.",
  },
};

export async function guideMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const guide = await getGuide(slug, locale);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: alternates(`/guides/${guide.slug}`, locale),
    robots: guide.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title: guide.title, description: guide.description, modifiedTime: guide.updatedAt },
  };
}

export async function GuideView({ slug, locale }: { slug: string; locale: Locale }) {
  const c = copy[locale];
  const dict = getDictionary(locale);
  const guide = await getGuide(slug, locale);
  if (!guide) notFound();
  const category = localizeCategory(getCategory(guide.category)!, locale);
  const domain = await getDomainByCategory(guide.category, locale);
  const [allGuides, offers] = await Promise.all([getVisibleGuides(locale), getOffers(locale)]);
  const related = allGuides
    .filter((g) => g.slug !== guide.slug && g.status !== "draft")
    .sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category))
    .slice(0, 3);
  const stepOffer = offers.find((o) => o.kind === "demarche" && o.id === GUIDE_OFFERS[guide.slug]);
  const base = siteConfig.url.replace(/\/$/, "");
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.home, item: base + href("/", locale) },
      { "@type": "ListItem", position: 2, name: c.guides, item: base + href("/guides", locale) },
      { "@type": "ListItem", position: 3, name: guide.title, item: base + href(`/guides/${guide.slug}`, locale) },
    ],
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    inLanguage: localeTags[locale],
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd)} />
      <div className="border-b border-line bg-surface">
        <Container className="py-10 sm:py-14">
          <nav aria-label={c.breadcrumbLabel} className="text-sm text-muted">
            <Link href={href("/guides", locale)} className="inline-block py-2 hover:text-brand-700">
              {c.guides}
            </Link>{" "}
            / <span className="text-ink">{category.shortTitle}</span>
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>
              <span aria-hidden="true" className="mr-1">
                {category.emoji}
              </span>
              {category.title}
            </Badge>
            {guide.status === "draft" && <Badge tone="warning">{c.draft}</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{guide.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {guide.readingMinutes} {c.minRead}
            </span>
            <span>
              {c.updated} {formatDate(guide.updatedAt, locale)}
            </span>
            <VerificationStatus lastVerified={guide.lastVerified} locale={locale} />
          </div>
          {c.translationNote && (
            <p className="mt-3 text-xs text-muted">
              {c.translationNote}{" "}
              <Link href={`/guides/${guide.slug}`} hrefLang="fr" className="font-medium text-brand-700 underline">
                Version française
              </Link>
            </p>
          )}
        </Container>
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-10">
          {!guide.lastVerified && <Notice title={dict.site.unverifiedNotice}>{c.unverifiedText}</Notice>}

          <p className="text-lg leading-relaxed text-ink">{guide.intro}</p>

          <section aria-labelledby="etapes">
            <h2 id="etapes" className="text-2xl font-bold text-ink">
              {c.steps}
            </h2>
            <ol className="mt-6 space-y-6">
              {guide.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {guide.glossary && guide.glossary.length > 0 && (
            <section aria-labelledby="glossaire">
              <h2 id="glossaire" className="text-2xl font-bold text-ink">
                {c.glossary}
              </h2>
              <dl className="mt-5 divide-y divide-line rounded-card border border-line bg-white">
                {guide.glossary.map((entry) => (
                  <div key={entry.term} className="grid gap-1 p-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                    <dt className="font-semibold text-ink">{entry.term}</dt>
                    <dd className="text-sm leading-relaxed text-muted">{entry.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section aria-labelledby="sources">
            <h2 id="sources" className="text-2xl font-bold text-ink">
              {c.sources}
            </h2>
            <p className="mt-2 text-sm text-muted">{c.sourcesText}</p>
            <div className="mt-5">
              <SourceList ids={guide.sourceIds} locale={locale} />
            </div>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="a-lire-aussi">
              <h2 id="a-lire-aussi" className="text-2xl font-bold text-ink">
                {c.related}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={href(`/guides/${g.slug}`, locale)}
                      className="block h-full rounded-card border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)]"
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {getCategory(g.category)?.emoji}
                      </span>
                      <span className="mt-2 block font-semibold leading-snug text-ink">{g.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-line bg-surface p-5">
            <h2 className="font-semibold text-ink">{c.helpTitle}</h2>
            <p className="mt-2 text-sm text-muted">{c.helpText}</p>
            <div className="mt-4 flex flex-col gap-2">
              {stepOffer ? (
                <ButtonLink href={`${href("/rendez-vous", locale)}?offre=${stepOffer.id}`}>
                  {c.helpWith} · {formatPrice(stepOffer, locale)}
                </ButtonLink>
              ) : (
                <ButtonLink href={`${href("/rendez-vous", locale)}?offre=decouverte`}>{c.book}</ButtonLink>
              )}
              {domain && (
                <ButtonLink href={href(`/services/${domain.slug}`, locale)} variant="secondary">
                  {c.seeDomain} {category.shortTitle}
                </ButtonLink>
              )}
            </div>
          </div>
          <details className="group rounded-card border border-line bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 font-semibold text-ink">
              <span>
                <span aria-hidden="true">✅</span> {c.checklist} ({guide.checklist.length})
              </span>
              <span className="text-xl text-brand-700 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="px-2 pb-2">
              <Checklist storageKey={`guide:${guide.slug}`} items={guide.checklist} locale={locale} />
            </div>
          </details>
        </aside>
      </Container>
    </article>
  );
}
