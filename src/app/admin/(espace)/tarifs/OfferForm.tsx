"use client";

import { ChevronDown } from "lucide-react";
import type { Offer } from "@/config/pricing";
import { getDemarcheGoal } from "@/content/demarcheGoals";
import { offersEn } from "@/content/en/offers";
import { saveOffer } from "@/lib/admin/actions";
import { adminInput, adminLabel, AdminForm, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

const kindLabels = { decouverte: "Appel gratuit", demarche: "Démarche", pack: "Pack", abonnement: "Abonnement" } as const;

const sectionTitle = "text-sm font-semibold text-ink";

/**
 * Une offre = une carte repliable : nom, prix et visibilité en un coup d'œil,
 * puis les textes affichés (français et anglais) et le détail de l'offre.
 * Les champs sont pré-remplis avec les textes actuellement affichés sur le site.
 */
export function OfferForm({ offer, sort, active }: { offer: Offer; sort: number; active: boolean }) {
  const id = (name: string) => `${offer.id}-${name}`;
  const goalFr = getDemarcheGoal(offer.id, "fr");
  const goalEn = getDemarcheGoal(offer.id, "en");
  const codeEn = offersEn[offer.id];
  const en = offer.en ?? {};
  const price = offer.price === 0 ? "Gratuit" : `${String(offer.price).replace(".", ",")} €${offer.billing === "mensuel" ? " / mois" : ""}`;

  const field = (name: string, label: string, value: string | undefined, opts: { max: number; rows?: number; hint?: string } = { max: 160 }) => (
    <div>
      <label htmlFor={id(name)} className={adminLabel}>
        {label} {opts.hint && <span className="font-normal text-muted">({opts.hint})</span>}
      </label>
      {opts.rows ? (
        <textarea id={id(name)} name={name} rows={opts.rows} defaultValue={value ?? ""} maxLength={opts.max} className={adminInput} />
      ) : (
        <input id={id(name)} name={name} defaultValue={value ?? ""} maxLength={opts.max} className={adminInput} />
      )}
    </div>
  );

  return (
    <details className="group rounded-card border border-line bg-white open:shadow-sm">
      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 px-5 py-4">
        <span className="min-w-0">
          <span className="font-semibold text-ink">{offer.name}</span>{" "}
          <span className="ml-1 rounded-full bg-surface px-2 py-0.5 align-middle text-xs font-medium text-muted">{kindLabels[offer.kind]}</span>
          {!active && <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-xs font-medium text-amber-900">Masquée</span>}
        </span>
        <span className="flex items-center gap-3">
          <span className="font-semibold text-ink">{price}</span>
          <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
        </span>
      </summary>

      <AdminForm action={saveOffer} className="border-t border-line px-5 pb-5 pt-4">
        {(r) => (
          <>
            <input type="hidden" name="id" value={offer.id} />
            <input type="hidden" name="sort" value={sort} />
            <input type="hidden" name="kind" value={offer.kind} />
            <input type="hidden" name="category" value={offer.category ?? ""} />

            {/* Essentiel */}
            <div className="grid gap-4 sm:grid-cols-[1fr_160px_160px]">
              <div>
                <label htmlFor={id("name")} className={adminLabel}>
                  Nom du service
                </label>
                <input id={id("name")} name="name" defaultValue={offer.name} className={adminInput} required maxLength={80} />
                <FieldError result={r} name="name" />
              </div>
              <div>
                <label htmlFor={id("price")} className={adminLabel}>
                  Prix TTC (€)
                </label>
                <input id={id("price")} name="price" inputMode="decimal" defaultValue={String(offer.price).replace(".", ",")} className={adminInput} required />
                <FieldError result={r} name="price" />
              </div>
              <div>
                <label htmlFor={id("billing")} className={adminLabel}>
                  Facturation
                </label>
                <select id={id("billing")} name="billing" defaultValue={offer.billing} className={adminInput}>
                  <option value="unique">Paiement unique</option>
                  <option value="mensuel">Par mois</option>
                </select>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-6">
              <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="active" defaultChecked={active} className="h-4 w-4 accent-brand-700" />
                Visible sur le site
              </label>
              <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
                <input type="checkbox" name="highlighted" defaultChecked={offer.highlighted} className="h-4 w-4 accent-brand-700" />
                Mettre en avant sur la page Tarifs
              </label>
            </div>

            {/* Textes affichés */}
            <h3 className={`mt-5 ${sectionTitle}`}>Textes affichés sur l&apos;accueil et les tarifs</h3>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              {field("headline", "Titre affiché", offer.headline ?? goalFr?.goal, { max: 120, hint: "ex. Obtenir votre titre de séjour" })}
              {field("why", "Pourquoi c'est important", offer.why ?? goalFr?.why, { max: 300, rows: 2 })}
              {field("tagline", "Description courte", offer.tagline, { max: 160 })}
            </div>

            <details className="mt-5 rounded-xl border border-line">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink">
                <span aria-hidden="true">🇬🇧</span> Version anglaise
              </summary>
              <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
                {field("nameEn", "Name", en.name ?? codeEn?.name, { max: 80 })}
                {field("headlineEn", "Displayed title", en.headline ?? goalEn?.goal, { max: 120 })}
                {field("whyEn", "Why it matters", en.why ?? goalEn?.why, { max: 300, rows: 2 })}
                {field("taglineEn", "Short description", en.tagline ?? codeEn?.tagline, { max: 160 })}
              </div>
            </details>

            <details className="mt-3 rounded-xl border border-line">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink">Détail de l&apos;offre (page Tarifs et CGV)</summary>
              <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
                {field("duration", "Durée", offer.duration, { max: 120 })}
                <div />
                <div>
                  <label htmlFor={id("includes")} className={adminLabel}>
                    Inclus <span className="font-normal text-muted">(une ligne par élément)</span>
                  </label>
                  <textarea id={id("includes")} name="includes" rows={5} defaultValue={offer.includes.join("\n")} className={adminInput} />
                  <FieldError result={r} name="includes" />
                </div>
                <div>
                  <label htmlFor={id("excludes")} className={adminLabel}>
                    Non inclus <span className="font-normal text-muted">(une ligne par élément)</span>
                  </label>
                  <textarea id={id("excludes")} name="excludes" rows={5} defaultValue={offer.excludes.join("\n")} className={adminInput} />
                </div>
                {field("responseTime", "Délai de réponse", offer.responseTime, { max: 300, rows: 2 })}
                {field("cancellation", offer.billing === "mensuel" ? "Résiliation" : "Annulation", offer.cancellation, { max: 300, rows: 2 })}
              </div>
            </details>

            <div className="mt-5 space-y-3">
              <ResultMessage result={r} />
              <SubmitButton>Enregistrer</SubmitButton>
            </div>
          </>
        )}
      </AdminForm>
    </details>
  );
}
