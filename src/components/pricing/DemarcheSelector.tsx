"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Plus, ShoppingBag } from "lucide-react";
import { bundleDiscounts, computeSelection, formatEuros, formatPrice, type Offer } from "@/config/pricing";
import { getCategory } from "@/content/categories";
import { getDemarcheGoal } from "@/content/demarcheGoals";
import { href, type Locale } from "@/i18n";

const copy = {
  fr: {
    select: "Ajouter",
    selected: "Ajoutée",
    summary: "Votre sélection",
    empty: "Cochez les démarches pour lesquelles vous voulez être aidé·e.",
    count: (n: number) => `${n} démarche${n > 1 ? "s" : ""}`,
    subtotal: "Sous-total",
    discount: (p: number) => `Remise ${p} %`,
    total: "Total",
    book: "Réserver ces démarches",
    noPayment: "Aucun paiement en ligne : on vous recontacte pour confirmer.",
    tiers: "Plus vous en prenez, moins c'est cher :",
    tier: (min: number, percent: number) => `−${percent} % dès ${min}`,
    packHint: (price: string) => `Astuce : le Pack Arrivée (${price}) inclut jusqu'à 5 démarches et un appel de 60 min.`,
    seePack: "Voir le pack",
    clear: "Tout retirer",
  },
  en: {
    select: "Add",
    selected: "Added",
    summary: "Your selection",
    empty: "Tick the procedures you would like help with.",
    count: (n: number) => `${n} procedure${n > 1 ? "s" : ""}`,
    subtotal: "Subtotal",
    discount: (p: number) => `${p}% discount`,
    total: "Total",
    book: "Book these procedures",
    noPayment: "No online payment: we'll get back to you to confirm.",
    tiers: "The more you take, the less you pay:",
    tier: (min: number, percent: number) => `−${percent}% from ${min}`,
    packHint: (price: string) => `Tip: the Moving to France bundle (${price}) includes up to 5 procedures and a 60-minute call.`,
    seePack: "See the bundle",
    clear: "Remove all",
  },
};

/** Sélecteur « à la carte » : on coche ses démarches, le total (avec remise dégressive) se met à jour. */
export function DemarcheSelector({ offers, pack, locale }: { offers: Offer[]; pack?: Offer; locale: Locale }) {
  const t = copy[locale];
  const [selected, setSelected] = useState<string[]>([]);
  const totals = useMemo(() => computeSelection(offers, selected), [offers, selected]);
  const toggle = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const bookUrl = `${href("/rendez-vous", locale)}?offre=selection&offres=${selected.join(",")}`;
  const showPackHint = pack && totals.count >= 4 && pack.price < totals.total;
  const tiers = [...bundleDiscounts].sort((a, b) => a.min - b.min);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <p className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="font-medium text-ink">{t.tiers}</span>
          {tiers.map((d) => (
            <span key={d.min} className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">
              {t.tier(d.min, d.percent)}
            </span>
          ))}
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {offers.map((o) => {
            const isOn = selected.includes(o.id);
            const category = o.category ? getCategory(o.category) : undefined;
            const goal = getDemarcheGoal(o.id, locale);
            return (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => toggle(o.id)}
                  aria-pressed={isOn}
                  className={`flex h-full w-full items-start gap-3 rounded-card border-2 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)] ${
                    isOn ? "border-brand-600 bg-brand-50/60" : "border-line hover:border-brand-200"
                  }`}
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl" aria-hidden="true">
                    {category?.emoji ?? "📌"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold leading-snug text-ink">{goal?.goal ?? o.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">{goal?.why ?? o.tagline}</span>
                    <span className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-lg font-extrabold text-ink">{formatPrice(o, locale)}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          isOn ? "bg-brand-700 text-white" : "bg-surface text-brand-700"
                        }`}
                      >
                        {isOn ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                        {isOn ? t.selected : t.select}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-card border border-line bg-white p-5 shadow-[0_12px_32px_rgba(22,32,58,0.08)]">
          <h3 className="flex items-center gap-2 font-semibold text-ink">
            <ShoppingBag className="h-5 w-5 text-brand-700" aria-hidden="true" /> {t.summary}
          </h3>
          {totals.count === 0 ? (
            <p className="mt-3 text-sm text-muted">{t.empty}</p>
          ) : (
            <>
              <ul className="mt-3 space-y-1.5 text-sm">
                {offers
                  .filter((o) => selected.includes(o.id))
                  .map((o) => (
                    <li key={o.id} className="flex justify-between gap-3">
                      <span className="text-ink">{o.name}</span>
                      <span className="shrink-0 text-muted">{formatPrice(o, locale)}</span>
                    </li>
                  ))}
              </ul>
              <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">
                    {t.subtotal} ({t.count(totals.count)})
                  </dt>
                  <dd className="text-ink">{formatEuros(totals.subtotal, locale)}</dd>
                </div>
                {totals.discountPercent > 0 && (
                  <div className="flex justify-between font-medium text-accent-700">
                    <dt>{t.discount(totals.discountPercent)}</dt>
                    <dd>−{formatEuros(totals.discount, locale)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-line pt-2 text-base font-bold text-ink">
                  <dt>{t.total}</dt>
                  <dd>{formatEuros(totals.total, locale)}</dd>
                </div>
              </dl>
              {showPackHint && pack && (
                <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  <span aria-hidden="true">💡</span> {t.packHint(formatPrice(pack, locale))}{" "}
                  <a href="#formules" className="font-semibold underline">
                    {t.seePack}
                  </a>
                </p>
              )}
            </>
          )}
          <Link
            href={totals.count ? bookUrl : "#"}
            aria-disabled={totals.count === 0}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
              totals.count ? "bg-brand-700 text-white hover:bg-brand-800" : "pointer-events-none bg-line text-muted"
            }`}
          >
            {t.book} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {totals.count > 0 && (
            <button type="button" onClick={() => setSelected([])} className="mt-2 w-full text-center text-xs text-muted hover:text-ink">
              {t.clear}
            </button>
          )}
          <p className="mt-3 text-center text-xs text-muted">{t.noPayment}</p>
        </div>
      </aside>
    </div>
  );
}
