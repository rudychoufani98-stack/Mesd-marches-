import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import { href, type Locale } from "@/i18n";
import { CategoryIcon } from "./CategoryIcon";

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
        <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted">{t.services}</h3>
        {!isBusiness && (
          <p className="mt-3 flex items-start gap-2 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
            {t.allIncluded(formatCategoryPrice(category, locale))}
          </p>
        )}
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="flex flex-col rounded-card border border-line bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(22,32,58,0.07)]">
              <p className="font-display text-lg font-medium leading-snug text-ink">{s.name}</p>
              <p className="mt-2 text-sm italic leading-relaxed text-muted">{s.question}</p>
              {s.description && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink">{s.description}</p>}
              <Link
                href={isBusiness ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?categorie=${category.id}&service=${s.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
              >
                {isBusiness ? t.business : t.start} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-card bg-brand-950 p-6 text-white lg:sticky lg:top-24">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-gold-300">
          <CategoryIcon icon={category.icon} />
        </span>
        <p className="mt-4 font-display text-3xl font-medium">{formatCategoryPrice(category, locale)}</p>
        {!isBusiness && <p className="mt-1 text-xs text-brand-100/80">{t.fixed}</p>}
        <p className="mt-5 text-sm font-semibold">{t.included}</p>
        <ul className="mt-2 space-y-2 text-sm text-brand-100/90">
          {category.includes.map((i) => (
            <li key={i} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /> {i}
            </li>
          ))}
        </ul>
        <Link
          href={isBusiness ? `${booking}?mode=appel&categorie=${category.id}` : `${booking}?mode=accompagnement&categorie=${category.id}`}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gold-300 px-5 text-sm font-semibold text-brand-950 hover:bg-gold-200"
        >
          {isBusiness ? t.business : t.book} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {!isBusiness && (
          <Link href={`${booking}?mode=appel&categorie=${category.id}`} className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-100/80 hover:text-white">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {t.free}
          </Link>
        )}
      </aside>
    </div>
  );
}
