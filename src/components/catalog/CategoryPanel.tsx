import Link from "next/link";
import { Check } from "lucide-react";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import { href, type Locale } from "@/i18n";
import { buttonClasses } from "@/components/ui/primitives";
import { ServiceDescription } from "./ServiceDescription";

const copy = {
  fr: {
    included: "Ce qui est compris",
    services: "Tout ce que couvre votre accompagnement",
    allIncluded: (price: string) =>
      `Un seul prix, ${price}, et l'accès à toute la liste : pendant votre accompagnement, vous pouvez poser toutes vos questions sur ces sujets.`,
    start: "Commencer par ce sujet",
    book: "Réserver",
    free: "Pas sûr·e ? Appel découverte gratuit (15 min)",
    fixed: "Prix fixe : tous les services de la catégorie sont inclus.",
    business: "Découvrir nos solutions entreprises",
  },
  en: {
    included: "What's included",
    services: "Everything your support covers",
    allIncluded: (price: string) =>
      `One price, ${price}, and access to the whole list: during your support, you can ask all your questions on these topics.`,
    start: "Start with this topic",
    book: "Book",
    free: "Not sure? Free discovery call (15 min)",
    fixed: "Fixed price: every service in the category is included.",
    business: "Discover our business solutions",
  },
};

/** Détail d'une catégorie : prix, périmètre, services et boutons de réservation. */
export function CategoryPanel({ category, services, locale }: { category: CatalogCategory; services: CatalogService[]; locale: Locale }) {
  const t = copy[locale];
  const booking = href("/rendez-vous", locale);
  const isBusiness = category.kind === "business";
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-ink">{t.services}</h3>
        {!isBusiness && (
          <p className="mt-4 border-l-2 border-brand-700 bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink">
            {t.allIncluded(formatCategoryPrice(category, locale))}
          </p>
        )}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="flex flex-col rounded-card border border-line bg-white p-6 transition-colors hover:border-ink/30">
              <p className="font-display text-[1.15rem] font-semibold leading-snug text-ink">{s.name}</p>
              <p className="mt-1.5 text-sm italic leading-relaxed text-muted">{s.question}</p>
              <div className="flex-1">{s.description && <ServiceDescription text={s.description} locale={locale} />}</div>
              <Link
                href={isBusiness ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?categorie=${category.id}&service=${s.id}`}
                className="mt-5 self-start text-[15px] font-semibold text-brand-900 underline decoration-brand-300 underline-offset-[6px] transition-colors hover:decoration-brand-900"
              >
                {isBusiness ? t.business : t.start}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-card bg-brand-950 p-7 text-white lg:sticky lg:top-28">
        <p className={`font-display font-semibold ${category.priceFrom ? "text-[1.6rem] leading-tight" : "text-[2.1rem] leading-none"}`}>{formatCategoryPrice(category, locale)}</p>
        {!isBusiness && <p className="mt-2 text-sm text-brand-100/75">{t.fixed}</p>}
        <div aria-hidden="true" className="mt-6 h-px bg-white/15" />
        <p className="mt-6 font-display text-lg font-semibold">{t.included}</p>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-brand-100/90">
          {category.includes.map((i) => (
            <li key={i} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" /> {i}
            </li>
          ))}
        </ul>
        <Link
          href={isBusiness ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?mode=accompagnement&categorie=${category.id}`}
          className={buttonClasses("light", "md", "mt-7 w-full")}
        >
          {isBusiness ? t.business : t.book}
        </Link>
        {!isBusiness && (
          <Link
            href={`${booking}?mode=appel&categorie=${category.id}`}
            className="mt-4 block text-center text-sm text-brand-100/80 underline decoration-white/30 underline-offset-4 hover:text-white"
          >
            {t.free}
          </Link>
        )}
      </aside>
    </div>
  );
}
