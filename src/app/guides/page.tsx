import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { categories } from "@/content/categories";
import { getVisibleGuides } from "@/content/guides";
import { GuideCard } from "@/components/guides/shared";
import { ButtonLink, Container, Notice, PageHeader } from "@/components/ui/primitives";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Guides pratiques",
  description:
    "Des guides pratiques gratuits pour comprendre et organiser vos démarches en France, avec des checklists et des liens vers les sources officielles.",
  alternates: { canonical: "/guides" },
};

const chip =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white border-line bg-white text-ink hover:border-brand-300";

export default function GuidesPage({ searchParams }: PageProps<"/guides">) {
  return (
    <>
      <PageHeader
        eyebrow="Bibliothèque"
        title="Guides pratiques"
        description="Des explications claires, des checklists à cocher et les liens vers les sites officiels qui font référence."
      />
      <Suspense fallback={<Container className="py-10 sm:py-14"><div className="h-96 animate-pulse rounded-card bg-surface" /></Container>}>
        <GuideLibrary searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function GuideLibrary({ searchParams }: Pick<PageProps<"/guides">, "searchParams">) {
  const sp = await searchParams;
  const selected = typeof sp.categorie === "string" ? sp.categorie : undefined;
  const all = getVisibleGuides();
  const list = selected ? all.filter((g) => g.category === selected) : all;
  const usedCategories = categories.filter((c) => all.some((g) => g.category === c.id));

  return (
      <Container className="py-10 sm:py-14">
        <Notice tone="info">
          Nos guides sont généraux et pédagogiques. Ils ne remplacent pas l&apos;information officielle, qui peut évoluer : en
          cas de doute, référez-vous toujours à l&apos;organisme compétent. Lorsqu&apos;un guide n&apos;a pas encore été relu
          face à ses sources, il l&apos;indique : « {siteConfig.unverifiedNotice} »
        </Notice>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrer par domaine">
          <Link href="/guides" aria-current={!selected} className={chip}>
            Tous
          </Link>
          {usedCategories.map((c) => (
            <Link key={c.id} href={`/guides?categorie=${c.id}`} aria-current={selected === c.id} className={chip}>
              {c.shortTitle}
            </Link>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-10 rounded-card border border-dashed border-line p-10 text-center">
            <p className="font-medium text-ink">Aucun guide n&apos;est encore disponible dans ce domaine.</p>
            <ButtonLink href="/guides" variant="secondary" className="mt-4">
              Voir tous les guides
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        )}
      </Container>
  );
}
