"use client";

import { useEffect, useRef, useState } from "react";
import { formatCategoryPrice, type CatalogCategory, type CatalogService } from "@/config/catalog";
import type { Locale } from "@/i18n";
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
              className={`group flex h-full w-full flex-col rounded-md border bg-white p-7 text-left transition-colors hover:border-ink/40 ${
                open === c.id ? "border-brand-950 ring-1 ring-brand-950" : "border-line"
              }`}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[1.3rem] font-semibold leading-tight text-ink">{c.name}</span>
                <span className="whitespace-nowrap text-[15px] font-semibold tabular-nums text-ink">{formatCategoryPrice(c, locale)}</span>
              </span>
              <span className="mt-3 block flex-1 text-[15px] leading-relaxed text-muted">{c.description}</span>
              <span className="mt-6 self-start text-[15px] font-semibold text-brand-900 underline decoration-brand-300 underline-offset-[6px] group-hover:decoration-brand-900">
                {t.discover}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div ref={panelRef} className="mt-10 scroll-mt-28 animate-fade-up rounded-md border border-line bg-surface p-5 sm:p-8">
          <nav aria-label={t.nav} className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => select(c.id)}
                aria-current={c.id === current.id}
                className="inline-flex shrink-0 items-center rounded-[3px] border border-line bg-white px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-ink/40 aria-[current=true]:border-brand-950 aria-[current=true]:bg-brand-950 aria-[current=true]:text-white"
              >
                {c.name}
              </button>
            ))}
          </nav>
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-display text-[1.7rem] font-semibold leading-tight text-ink">{current.name}</h2>
            <button type="button" onClick={() => setOpen(null)} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
              {t.close}
            </button>
          </div>
          <CategoryPanel category={current} services={services.filter((s) => s.categoryId === current.id)} locale={locale} />
        </div>
      )}
    </>
  );
}
