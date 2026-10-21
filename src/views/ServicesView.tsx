import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, href, type Locale } from "@/i18n";
import { getActiveDomains } from "@/lib/data/content";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";
import { servicesCopy } from "./services-copy";


const chip =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white border-line bg-white text-ink hover:border-brand-300";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function servicesMetadata(locale: Locale): Metadata {
  const c = servicesCopy[locale];
  return { title: c.title, description: c.metaDescription, alternates: alternates("/services", locale) };
}

export function ServicesView({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = servicesCopy[locale];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Suspense fallback={<Container className="py-10 sm:py-14"><div className="h-96 animate-pulse rounded-card bg-surface" /></Container>}>
        <ServicesCatalog locale={locale} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ServicesCatalog({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = servicesCopy[locale];
  const sp = await searchParams;
  const domaine = typeof sp.domaine === "string" ? sp.domaine : undefined;

  const filterHref = (d?: string) => {
    const params = new URLSearchParams();
    if (d) params.set("domaine", d);
    const qs = params.toString();
    return href("/services", locale) + (qs ? `?${qs}` : "");
  };

  const domains = await getActiveDomains(locale);
  const visible = domains
    .filter((d) => !domaine || d.slug === domaine)
    .map((d) => ({ ...d, items: d.items.filter((i) => i.active) }))
    .filter((d) => d.items.length > 0);

  return (
    <Container className="py-10 sm:py-14">
      <div className="space-y-4" aria-label={c.filters}>
        <div className="flex flex-wrap gap-2">
          <Link href={filterHref(undefined)} aria-current={!domaine} className={chip}>
            {c.allDomains}
          </Link>
          {domains.map((d) => {
            const cat = getCategory(d.category);
            return (
              <Link key={d.slug} href={filterHref(d.slug)} aria-current={domaine === d.slug} className={chip}>
                {cat && localizeCategory(cat, locale).shortTitle}
              </Link>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-12 rounded-card border border-dashed border-line p-10 text-center">
          <p className="font-medium text-ink">{c.empty}</p>
          <ButtonLink href={href("/services", locale)} variant="secondary" className="mt-4">
            {c.reset}
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {visible.map((d) => {
            const category = localizeCategory(getCategory(d.category)!, locale);
            return (
              <section key={d.slug} aria-labelledby={`domaine-${d.slug}`}>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl" aria-hidden="true">
                      {category.emoji}
                    </span>
                    <h2 id={`domaine-${d.slug}`} className="text-xl font-bold text-ink">
                      {category.title}
                    </h2>
                  </div>
                  <Link href={href(`/services/${d.slug}`, locale)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                    {c.domainDetail} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {d.items.map((item) => (
                    <li key={item.id} className="flex flex-col rounded-card border border-line bg-white p-5">
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                      <Link href={`${href("/rendez-vous", locale)}?offre=decouverte`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                        {c.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </Container>
  );
}
