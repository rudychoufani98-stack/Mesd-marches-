import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/content/categories";
import { serviceFormatLabels, type ServiceFormat } from "@/content/services";
import { getActiveDomains } from "@/lib/data/content";
import { Badge, ButtonLink, Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Guides gratuits, outils et accompagnement humain pour organiser vos démarches en France : installation, logement, banque, travail, santé, impôts, famille et numérique.",
  alternates: { canonical: "/services" },
};

const formats = Object.keys(serviceFormatLabels) as ServiceFormat[];

function filterHref(domaine?: string, format?: string) {
  const params = new URLSearchParams();
  if (domaine) params.set("domaine", domaine);
  if (format) params.set("format", format);
  const qs = params.toString();
  return qs ? `/services?${qs}` : "/services";
}

const chip =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white border-line bg-white text-ink hover:border-brand-300";

export default function ServicesPage({ searchParams }: PageProps<"/services">) {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Nos services"
        description="Des guides et outils gratuits pour comprendre et organiser vos démarches, et un accompagnement humain en option."
      />
      <Suspense fallback={<Container className="py-10 sm:py-14"><div className="h-96 animate-pulse rounded-card bg-surface" /></Container>}>
        <ServicesCatalog searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ServicesCatalog({ searchParams }: Pick<PageProps<"/services">, "searchParams">) {
  const sp = await searchParams;
  const domaine = typeof sp.domaine === "string" ? sp.domaine : undefined;
  const format = typeof sp.format === "string" && formats.includes(sp.format as ServiceFormat) ? (sp.format as ServiceFormat) : undefined;

  const domains = await getActiveDomains();
  const visible = domains
    .filter((d) => !domaine || d.slug === domaine)
    .map((d) => ({ ...d, items: d.items.filter((i) => i.active && (!format || i.format === format)) }))
    .filter((d) => d.items.length > 0);

  return (
      <Container className="py-10 sm:py-14">
        <div className="space-y-4" aria-label="Filtres">
          <div className="flex flex-wrap gap-2">
            <Link href={filterHref(undefined, format)} aria-current={!domaine} className={chip}>
              Tous les domaines
            </Link>
            {domains.map((d) => (
              <Link key={d.slug} href={filterHref(d.slug, format)} aria-current={domaine === d.slug} className={chip}>
                {getCategory(d.category)?.shortTitle}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={filterHref(domaine)} aria-current={!format} className={chip}>
              Tous les formats
            </Link>
            {formats.map((f) => (
              <Link key={f} href={filterHref(domaine, f)} aria-current={format === f} className={chip}>
                {serviceFormatLabels[f]}
              </Link>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="mt-12 rounded-card border border-dashed border-line p-10 text-center">
            <p className="font-medium text-ink">Aucun service ne correspond à ces filtres.</p>
            <ButtonLink href="/services" variant="secondary" className="mt-4">
              Réinitialiser les filtres
            </ButtonLink>
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {visible.map((d) => {
              const category = getCategory(d.category)!;
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
                    <Link href={`/services/${d.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                      Voir le détail du domaine <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {d.items.map((item) => (
                      <li key={item.id} className="flex flex-col rounded-card border border-line bg-white p-5">
                        <Badge tone={item.format === "accompagnement" ? "accent" : "brand"}>{serviceFormatLabels[item.format]}</Badge>
                        <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
                        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                        {item.href && (
                          <Link href={item.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                            {item.format === "accompagnement" ? "Voir les offres" : item.format === "outil" ? "Utiliser l'outil" : "Lire le guide"}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        )}
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
