import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { formatCategoryPrice } from "@/config/catalog";
import { alternates, href, type Locale } from "@/i18n";
import { getCatalog } from "@/lib/data/catalog";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { Container, PageHeader } from "@/components/ui/primitives";
import { jsonLd } from "@/lib/seo";

const copy = {
  fr: {
    metaTitle: "Tarifs : accompagnement administratif à prix fixe, de 29 € à 59 €",
    metaDescription:
      "Appel découverte gratuit, puis un prix fixe par catégorie : logement 59 €, impôts 49 €, immigration 49 €, santé, banque et emploi 39 €, installation 29 €. Offre entreprises dès 199 €.",
    eyebrow: "Tarifs",
    title: "Des prix clairs, fixés à l'avance",
    description: "Un prix par catégorie, quel que soit le service choisi. Vous savez exactement ce que vous payez avant de réserver.",
    free: "Appel découverte",
    freePrice: "Gratuit",
    freeText: "15 minutes, sans engagement, pour comprendre votre besoin et vous orienter.",
    category: "Catégorie",
    price: "Prix",
    book: "Réserver",
    see: "Voir les services",
    included: "Dans chaque accompagnement",
    terms: "Conditions générales de vente",
  },
  en: {
    metaTitle: "Pricing: fixed-price administrative support, from €29 to €59",
    metaDescription:
      "Free discovery call, then one fixed price per category: housing €59, tax €49, immigration €49, health, banking and jobs €39, settling in €29. Business offer from €199.",
    eyebrow: "Pricing",
    title: "Clear prices, set in advance",
    description: "One price per category, whichever service you choose. You know exactly what you pay before booking.",
    free: "Discovery call",
    freePrice: "Free",
    freeText: "15 minutes, no commitment, to understand your need and guide you.",
    category: "Category",
    price: "Price",
    book: "Book",
    see: "See the services",
    included: "In every support session",
    terms: "Terms of sale",
  },
};

export function pricingMetadata(locale: Locale): Metadata {
  const c = copy[locale];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/tarifs", locale) };
}

export async function PricingView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const { categories } = await getCatalog(locale);
  const booking = href("/rendez-vous", locale);
  const includes = categories.find((cat) => cat.kind === "particulier")?.includes ?? [];

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: c.title,
    itemListElement: categories.map((cat) => ({ "@type": "Offer", name: cat.name, price: cat.price, priceCurrency: "EUR" })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(catalogJsonLd)} />
      <PageHeader eyebrow={c.eyebrow} title={c.title} description={c.description} />
      <Container className="space-y-12 py-12 sm:py-16">
        <div className="overflow-hidden rounded-[1.5rem] border border-line bg-white">
          <table className="w-full text-left">
            <caption className="sr-only">{c.title}</caption>
            <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  {c.category}
                </th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">
                  {c.price}
                </th>
                <th scope="col" className="hidden px-5 py-3 sm:table-cell">
                  <span className="sr-only">{c.book}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="bg-accent-50/40">
                <th scope="row" className="px-5 py-4">
                  <span className="flex items-center gap-3 font-semibold text-ink">
                    <Phone className="h-5 w-5 text-accent-700" aria-hidden="true" /> {c.free}
                  </span>
                  <span className="mt-1 block pl-8 text-sm font-normal text-muted">{c.freeText}</span>
                </th>
                <td className="px-5 py-4 text-right font-display text-xl font-medium text-ink">{c.freePrice}</td>
                <td className="hidden px-5 py-4 text-right sm:table-cell">
                  <Link href={`${booking}?mode=appel`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                    {c.book} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <th scope="row" className="px-5 py-4">
                    <Link href={href(`/services/${cat.id}`, locale)} className="flex items-center gap-3 font-semibold text-ink hover:text-brand-700">
                      <CategoryIcon icon={cat.icon} className="h-5 w-5 text-brand-700" /> {cat.name}
                    </Link>
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-display text-xl font-medium text-ink">{formatCategoryPrice(cat, locale)}</td>
                  <td className="hidden px-5 py-4 text-right sm:table-cell">
                    <Link
                      href={cat.kind === "business" ? `${booking}?mode=appel&categorie=${cat.id}` : `${booking}?mode=accompagnement&categorie=${cat.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
                    >
                      {c.book} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {includes.length > 0 && (
          <section className="rounded-[1.5rem] bg-brand-950 p-8 text-white sm:p-10" aria-labelledby="inclus">
            <h2 id="inclus" className="font-display text-2xl font-medium">
              {c.included}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {includes.map((i) => (
                <li key={i} className="flex gap-3 text-brand-100">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
            <Link href={href("/services", locale)} className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold-300 px-6 text-sm font-semibold text-brand-950 hover:bg-gold-200">
              {c.see} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        )}

        <p className="text-center text-sm text-muted">
          <Link href={href("/cgv", locale)} className="font-medium text-brand-700 underline">
            {c.terms}
          </Link>
        </p>
      </Container>
    </>
  );
}
