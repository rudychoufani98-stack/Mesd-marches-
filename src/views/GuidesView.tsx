import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { categories } from "@/content/categories";
import { localizeCategory } from "@/content/translations";
import { alternates, href, type Locale } from "@/i18n";
import { getVisibleGuides } from "@/lib/data/content";
import { GuideCard } from "@/components/guides/shared";
import { ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

const copy = {
  fr: {
    eyebrow: "Bibliothèque",
    title: "Guides pratiques",
    description: "Des explications claires, des checklists à cocher et les liens vers les sites officiels qui font référence.",
    metaDescription:
      "Des guides pratiques gratuits pour comprendre et organiser vos démarches en France, avec des checklists et des liens vers les sources officielles.",
    notice:
      "Nos guides sont généraux et pédagogiques. Ils ne remplacent pas l'information officielle, qui peut évoluer : en cas de doute, référez-vous toujours à l'organisme compétent. Lorsqu'un guide n'a pas encore été relu face à ses sources, il l'indique :",
    filterLabel: "Filtrer par domaine",
    all: "Tous",
    empty: "Aucun guide n'est encore disponible dans ce domaine.",
    seeAll: "Voir tous les guides",
  },
  en: {
    eyebrow: "Library",
    title: "Practical guides",
    description: "Clear explanations, tick-off checklists and links to the official websites that are the reference.",
    metaDescription:
      "Free practical guides to understand and organise your procedures in France, with checklists and links to official sources.",
    notice:
      "Our guides are general and educational. They do not replace official information, which can change: if in doubt, always refer to the relevant authority. When a guide has not yet been reviewed against its sources, it says so:",
    filterLabel: "Filter by topic",
    all: "All",
    empty: "No guide is available for this topic yet.",
    seeAll: "See all guides",
  },
};

const chip =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white border-line bg-white text-ink hover:border-brand-300";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export function guidesMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.title, description: c.metaDescription, alternates: alternates("/guides", locale) };
}

export function GuidesView({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = copy[locale];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Suspense fallback={<Container className="py-10 sm:py-14"><div className="h-96 animate-pulse rounded-card bg-surface" /></Container>}>
        <GuideLibrary locale={locale} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function GuideLibrary({ locale, searchParams }: { locale: Locale; searchParams: SearchParams }) {
  const c = copy[locale];
  const sp = await searchParams;
  const selected = typeof sp.categorie === "string" ? sp.categorie : undefined;
  const all = await getVisibleGuides(locale);
  const list = selected ? all.filter((g) => g.category === selected) : all;
  const usedCategories = categories.filter((cat) => all.some((g) => g.category === cat.id)).map((cat) => localizeCategory(cat, locale));
  const base = href("/guides", locale);

  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-wrap gap-2" aria-label={c.filterLabel}>
        <Link href={base} aria-current={!selected} className={chip}>
          {c.all}
        </Link>
        {usedCategories.map((cat) => (
          <Link key={cat.id} href={`${base}?categorie=${cat.id}`} aria-current={selected === cat.id} className={chip}>
            <span aria-hidden="true" className="mr-1">
              {cat.emoji}
            </span>
            {cat.shortTitle}
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-line p-10 text-center">
          <p className="font-medium text-ink">{c.empty}</p>
          <ButtonLink href={base} variant="secondary" className="mt-4">
            {c.seeAll}
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <GuideCard key={g.slug} guide={g} locale={locale} />
          ))}
        </div>
      )}
    </Container>
  );
}
