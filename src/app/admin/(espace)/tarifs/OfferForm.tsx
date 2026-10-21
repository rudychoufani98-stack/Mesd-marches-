"use client";

import type { Offer } from "@/config/pricing";
import { saveOffer } from "@/lib/admin/actions";
import { adminInput, adminLabel, AdminForm, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

export function OfferForm({ offer, sort, active }: { offer: Offer; sort: number; active: boolean }) {
  const id = (name: string) => `${offer.id}-${name}`;
  return (
    <AdminForm action={saveOffer} className="rounded-card border border-line bg-white p-5 sm:p-6">
      {(r) => (
        <>
          <input type="hidden" name="id" value={offer.id} />
          <input type="hidden" name="sort" value={sort} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">{offer.name}</h2>
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="active" defaultChecked={active} className="h-4 w-4 accent-brand-700" />
              Offre visible sur le site
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("name")} className={adminLabel}>
                Nom
              </label>
              <input id={id("name")} name="name" defaultValue={offer.name} className={adminInput} required maxLength={80} />
              <FieldError result={r} name="name" />
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-3">
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
            <div>
              <label htmlFor={id("tagline")} className={adminLabel}>
                Accroche
              </label>
              <input id={id("tagline")} name="tagline" defaultValue={offer.tagline} className={adminInput} maxLength={160} />
            </div>
            <div>
              <label htmlFor={id("duration")} className={adminLabel}>
                Durée
              </label>
              <input id={id("duration")} name="duration" defaultValue={offer.duration} className={adminInput} maxLength={120} />
            </div>
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
            <div>
              <label htmlFor={id("responseTime")} className={adminLabel}>
                Délai de réponse
              </label>
              <textarea id={id("responseTime")} name="responseTime" rows={2} defaultValue={offer.responseTime} className={adminInput} />
            </div>
            <div>
              <label htmlFor={id("cancellation")} className={adminLabel}>
                {offer.billing === "mensuel" ? "Résiliation" : "Annulation"}
              </label>
              <textarea id={id("cancellation")} name="cancellation" rows={2} defaultValue={offer.cancellation} className={adminInput} />
            </div>
          </div>

          <label className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm text-ink">
            <input type="checkbox" name="highlighted" defaultChecked={offer.highlighted} className="h-4 w-4 accent-brand-700" />
            Mettre en avant sur la page Tarifs
          </label>

          <div className="mt-4 space-y-3">
            <ResultMessage result={r} />
            <SubmitButton>Enregistrer cette offre</SubmitButton>
          </div>
        </>
      )}
    </AdminForm>
  );
}
