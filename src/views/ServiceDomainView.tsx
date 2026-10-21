import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Ban } from "lucide-react";
import { getCategory } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, href, type Locale } from "@/i18n";
import { getDomainBySlug, getPublishedGuides } from "@/lib/data/content";
import { GuideCard, SourceList } from "@/components/guides/shared";
import { Badge, ButtonLink, Container } from "@/components/ui/primitives";
import { servicesCopy } from "./services-copy";

export async function serviceDomainMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const domain = await getDomainBySlug(slug, locale);
  if (!domain) return {};
  return {
    title: domain.seoTitle,
    description: domain.seoDescription,
    alternates: alternates(`/services/${domain.slug}`, locale),
    openGraph: { title: domain.seoTitle, description: domain.seoDescription },
  };
}

export async function ServiceDomainView({ slug, locale }: { slug: string; locale: Locale }) {
  const c = servicesCopy[locale];
  const domain = await getDomainBySlug(slug, locale);
  if (!domain) notFound();
  const category = localizeCategory(getCategory(domain.category)!, locale);
  const relatedGuides = (await getPublishedGuides(locale)).filter((g) => g.category === domain.category);

  return (
    <>
      <div className="border-b border-line bg-surface">
        <Container className="py-12 sm:py-16">
          <nav aria-label={c.breadcrumb} className="text-sm text-muted">
            <Link href={href("/services", locale)} className="inline-block py-2 hover:text-brand-700">
              {c.title}
            </Link>{" "}
            / <span className="text-ink">{category.title}</span>
          </nav>
          <div className="mt-5 flex items-start gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-line" aria-hidden="true">
              {category.emoji}
            </span>
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{category.title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-muted">{domain.intro}</p>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <section aria-labelledby="ce-que-nous-proposons">
            <h2 id="ce-que-nous-proposons" className="text-xl font-bold text-ink">
              {c.whatWeOffer}
            </h2>
            <ul className="mt-5 space-y-3">
              {domain.items
                .filter((i) => i.active)
                .map((item) => (
                  <li key={item.id} className="rounded-card border border-line bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <Badge tone={item.format === "accompagnement" ? "accent" : "brand"}>{c.formats[item.format]}</Badge>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                    {item.href && (
                      <Link href={href(item.href, locale)} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                        {c.cta[item.format]}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </section>

          {relatedGuides.length > 0 && (
            <section aria-labelledby="guides-associes">
              <h2 id="guides-associes" className="text-xl font-bold text-ink">
                {c.relatedGuides}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedGuides.map((g) => (
                  <GuideCard key={g.slug} guide={g} locale={locale} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="sources">
            <h2 id="sources" className="text-xl font-bold text-ink">
              {c.sources}
            </h2>
            <div className="mt-5">
              <SourceList ids={domain.sourceIds} locale={locale} />
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 font-semibold text-ink">
              <Ban className="h-4 w-4 text-muted" aria-hidden="true" /> {c.limits}
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {domain.limits.map((l) => (
                <li key={l} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-brand-900 p-5 text-white">
            <h2 className="font-semibold">{c.helpTitle}</h2>
            <p className="mt-2 text-sm text-brand-200">{c.helpText}</p>
            <ButtonLink href={href("/plan-action", locale)} variant="secondary" className="mt-4 w-full">
              {c.helpCta}
            </ButtonLink>
          </div>
        </aside>
      </Container>
    </>
  );
}
