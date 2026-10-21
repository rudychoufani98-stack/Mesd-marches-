import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/content/categories";
import { getGuide, getVisibleGuides } from "@/content/guides";
import { getDomainByCategory } from "@/content/services";
import { Checklist } from "@/components/guides/Checklist";
import { formatDate, SourceList, VerificationStatus } from "@/components/guides/shared";
import { Badge, ButtonLink, Container, Notice } from "@/components/ui/primitives";

export function generateStaticParams() {
  return getVisibleGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    robots: guide.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title: guide.title, description: guide.description, modifiedTime: guide.updatedAt },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const category = getCategory(guide.category)!;
  const domain = getDomainByCategory(guide.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    inLanguage: "fr-FR",
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="border-b border-line bg-surface">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
            <Link href="/guides" className="inline-block py-2 hover:text-brand-700">
              Guides pratiques
            </Link>{" "}
            / <span className="text-ink">{category.shortTitle}</span>
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>{category.title}</Badge>
            {guide.status === "draft" && <Badge tone="warning">Brouillon — non publié</Badge>}
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{guide.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {guide.readingMinutes} min de lecture
            </span>
            <span>Mis à jour le {formatDate(guide.updatedAt)}</span>
            <VerificationStatus lastVerified={guide.lastVerified} />
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-10">
          {!guide.lastVerified && (
            <Notice title={siteConfig.unverifiedNotice}>
              Ce guide présente des informations générales qui n&apos;ont pas encore été relues face aux sources officielles
              citées ci-dessous. Les règles peuvent dépendre de votre situation et évoluer : vérifiez toujours auprès de
              l&apos;organisme compétent.
            </Notice>
          )}

          <p className="text-lg leading-relaxed text-ink">{guide.intro}</p>

          <section aria-labelledby="etapes">
            <h2 id="etapes" className="text-2xl font-bold text-ink">
              Les étapes
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
                Glossaire
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
              Sources officielles
            </h2>
            <p className="mt-2 text-sm text-muted">Consultez ces sites pour obtenir l&apos;information à jour et adaptée à votre situation.</p>
            <div className="mt-5">
              <SourceList ids={guide.sourceIds} />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Checklist storageKey={`guide:${guide.slug}`} items={guide.checklist} />
          <div className="rounded-card border border-line bg-surface p-5">
            <h2 className="font-semibold text-ink">Besoin d&apos;un coup de main ?</h2>
            <p className="mt-2 text-sm text-muted">Un rendez-vous permet de faire le point sur vos priorités et de construire un plan adapté.</p>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href="/rendez-vous">Demander un rendez-vous</ButtonLink>
              {domain && (
                <ButtonLink href={`/services/${domain.slug}`} variant="secondary">
                  Voir le domaine {category.shortTitle}
                </ButtonLink>
              )}
            </div>
          </div>
        </aside>
      </Container>
    </article>
  );
}
