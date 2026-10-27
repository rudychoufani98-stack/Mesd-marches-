"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import type { Locale } from "@/i18n";
import { CategoryIcon } from "./CategoryIcon";
import { CategoryPanel } from "./CategoryPanel";

const copy = {
  fr: { discover: "Découvrir les services", close: "Fermer", nav: "Catégories" },
  en: { discover: "Discover the services", close: "Close", nav: "Categories" },
};

/** Cartes des catégories : un clic affiche les services de la catégorie, sans changer de page. */
export function ServicesExplorer({ categories, services, locale }: { categories: CatalogCategory[]; services: CatalogService[]; locale: Locale }) {
  const t = copy[locale];
  const [open, setOpen] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Ouverture directe via l'ancre (#fiscalite, etc.).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture de l'ancre après le montage
    if (categories.some((c) => c.id === id)) setOpen(id);
  }, [categories]);

  const select = (id: string) => {
    setOpen(id);
    history.replaceState(null, "", `#${id}`);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const current = categories.find((c) => c.id === open);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => select(c.id)}
              aria-expanded={open === c.id}
              className={`group flex h-full w-full flex-col rounded-[1.25rem] border bg-white p-6 text-left transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(22,32,58,0.10)] ${
                open === c.id ? "border-brand-700 ring-2 ring-brand-700/20" : "border-line"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-brand-700 transition-colors group-hover:from-brand-700 group-hover:to-brand-800 group-hover:text-white">
                  <CategoryIcon icon={c.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-ink">{formatCategoryPrice(c, locale)}</span>
              </span>
              <span className="mt-5 block font-display text-xl font-medium leading-snug text-ink">{c.name}</span>
              <span className="mt-2 block flex-1 text-sm leading-relaxed text-muted">{c.description}</span>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                {t.discover} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div ref={panelRef} className="mt-10 scroll-mt-24 animate-fade-up rounded-[1.5rem] border border-line bg-surface p-5 sm:p-8">
          <nav aria-label={t.nav} className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => select(c.id)}
                aria-current={c.id === current.id}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink aria-[current=true]:border-brand-700 aria-[current=true]:bg-brand-700 aria-[current=true]:text-white"
              >
                <CategoryIcon icon={c.icon} className="h-4 w-4" /> {c.name}
              </button>
            ))}
          </nav>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-3xl font-medium text-ink">{current.name}</h2>
            <button type="button" onClick={() => setOpen(null)} className="text-sm text-muted hover:text-ink">
              {t.close}
            </button>
          </div>
          <CategoryPanel category={current} services={services.filter((s) => s.categoryId === current.id)} locale={locale} />
        </div>
      )}
    </>
  );
}
