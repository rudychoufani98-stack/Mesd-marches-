"use client";

import { ChevronDown } from "lucide-react";
import type { CatalogCategory, CatalogService } from "@/config/catalog";
import { deleteCategory, deleteService, importCatalog, saveCategory, saveService } from "@/lib/admin/catalog-actions";
import { ActionButton, adminInput, adminLabel, AdminForm, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

const ICON_LABELS: Record<CatalogCategory["icon"], string> = {
  logement: "Maison (logement)",
  fiscalite: "Reçu (impôts)",
  sante: "Cœur (santé)",
  banque: "Banque",
  emploi: "Mallette (emploi)",
  immigration: "Document (immigration)",
  quotidien: "Canapé (quotidien)",
  business: "Immeuble (entreprises)",
};

export function ImportCatalogForm() {
  return (
    <AdminForm action={importCatalog} className="mt-4 space-y-3">
      {(r) => (
        <>
          <ResultMessage result={r} />
          <SubmitButton pendingLabel="Import en cours…">Importer le catalogue</SubmitButton>
        </>
      )}
    </AdminForm>
  );
}

function Input({ id, name, label, value, max, hint, required }: { id: string; name: string; label: string; value?: string; max: number; hint?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className={adminLabel}>
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      <input id={id} name={name} defaultValue={value ?? ""} maxLength={max} required={required} className={adminInput} />
    </div>
  );
}

function Area({ id, name, label, value, rows = 2, hint }: { id: string; name: string; label: string; value?: string; rows?: number; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className={adminLabel}>
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      <textarea id={id} name={name} rows={rows} defaultValue={value ?? ""} className={adminInput} />
    </div>
  );
}

/** Création (category absente) ou modification d'une catégorie. */
export function CategoryForm({ category, nextSort }: { category?: CatalogCategory; nextSort: number }) {
  const key = category?.id ?? "nouvelle";
  const id = (n: string) => `cat-${key}-${n}`;
  return (
    <AdminForm action={saveCategory} className="space-y-4">
      {(r) => (
        <>
          <input type="hidden" name="mode" value={category ? "edit" : "create"} />
          <input type="hidden" name="id" value={category?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-[1fr_140px_220px]">
            <div>
              <Input id={id("name")} name="name" label="Nom de la catégorie" value={category?.name} max={80} required />
              <FieldError result={r} name="name" />
            </div>
            <div>
              <Input id={id("price")} name="price" label="Prix TTC (€)" value={category ? String(category.price).replace(".", ",") : ""} max={10} required />
              <FieldError result={r} name="price" />
            </div>
            <div>
              <label htmlFor={id("icon")} className={adminLabel}>
                Icône
              </label>
              <select id={id("icon")} name="icon" defaultValue={category?.icon ?? "quotidien"} className={adminInput}>
                {Object.entries(ICON_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Input id={id("description")} name="description" label="Courte description" value={category?.description} max={300} />
          <div className="flex flex-wrap gap-x-6">
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="active" defaultChecked={category?.active ?? true} className="h-4 w-4 accent-brand-700" /> Visible sur le site
            </label>
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="priceFrom" defaultChecked={category?.priceFrom ?? false} className="h-4 w-4 accent-brand-700" /> Afficher « À partir de »
            </label>
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              Public :
              <select name="kind" defaultValue={category?.kind ?? "particulier"} className="rounded-lg border border-line px-2 py-1 text-sm">
                <option value="particulier">Particuliers (paiement en ligne)</option>
                <option value="business">Entreprises (sur devis)</option>
              </select>
            </label>
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              Ordre :
              <input name="sort" type="number" min={0} max={999} defaultValue={category?.sort ?? nextSort} className="w-20 rounded-lg border border-line px-2 py-1 text-sm" />
            </label>
          </div>
          <Area id={id("includes")} name="includes" label="Ce qui est compris" hint="une ligne par élément" value={category?.includes.join("\n")} rows={4} />
          <details className="rounded-xl border border-line">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink">Version anglaise</summary>
            <div className="space-y-4 px-4 pb-4">
              <Input id={id("nameEn")} name="nameEn" label="Name" value={category?.en?.name} max={80} />
              <Input id={id("descriptionEn")} name="descriptionEn" label="Short description" value={category?.en?.description} max={300} />
              <Area id={id("includesEn")} name="includesEn" label="What's included" hint="one line per item" value={category?.en?.includes?.join("\n")} rows={4} />
            </div>
          </details>
          <ResultMessage result={r} />
          <SubmitButton>{category ? "Enregistrer la catégorie" : "Créer la catégorie"}</SubmitButton>
        </>
      )}
    </AdminForm>
  );
}

/** Création (service absent) ou modification d'un service d'une catégorie. */
export function ServiceForm({ service, categoryId, nextSort }: { service?: CatalogService; categoryId: string; nextSort: number }) {
  const key = service?.id ?? `${categoryId}-nouveau`;
  const id = (n: string) => `srv-${key}-${n}`;
  return (
    <AdminForm action={saveService} className="space-y-3">
      {(r) => (
        <>
          <input type="hidden" name="mode" value={service ? "edit" : "create"} />
          <input type="hidden" name="id" value={service?.id ?? ""} />
          <input type="hidden" name="categoryId" value={categoryId} />
          <div>
            <Input id={id("name")} name="name" label="Nom du service" value={service?.name} max={120} required />
            <FieldError result={r} name="name" />
          </div>
          <Area id={id("question")} name="question" label="Question d'identification du besoin" value={service?.question} />
          <Area id={id("description")} name="description" label="Description" hint="1re ligne : la promesse ; lignes suivantes : ce que le client obtient" value={service?.description} rows={5} />
          <div className="flex flex-wrap gap-x-6">
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              <input type="checkbox" name="active" defaultChecked={service?.active ?? true} className="h-4 w-4 accent-brand-700" /> Visible
            </label>
            <label className="inline-flex min-h-10 items-center gap-2 text-sm text-ink">
              Ordre :
              <input name="sort" type="number" min={0} max={999} defaultValue={service?.sort ?? nextSort} className="w-20 rounded-lg border border-line px-2 py-1 text-sm" />
            </label>
          </div>
          <details className="rounded-xl border border-line">
            <summary className="cursor-pointer px-4 py-2 text-sm font-semibold text-ink">Version anglaise</summary>
            <div className="space-y-3 px-4 pb-4">
              <Input id={id("nameEn")} name="nameEn" label="Name" value={service?.en?.name} max={120} />
              <Area id={id("questionEn")} name="questionEn" label="Question" value={service?.en?.question} />
              <Area id={id("descriptionEn")} name="descriptionEn" label="Description" hint="1st line: the promise; next lines: what the client gets" value={service?.en?.description} rows={5} />
            </div>
          </details>
          <ResultMessage result={r} />
          <SubmitButton variant={service ? "secondary" : "primary"}>{service ? "Enregistrer" : "Ajouter le service"}</SubmitButton>
        </>
      )}
    </AdminForm>
  );
}

export function ServiceRow({ service, categoryId }: { service: CatalogService; categoryId: string }) {
  return (
    <details className="group rounded-xl border border-line bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
        <span className="min-w-0">
          <span className="font-medium text-ink">{service.name}</span>
          {!service.active && <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">Masqué</span>}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="space-y-3 border-t border-line px-4 py-4">
        <ServiceForm service={service} categoryId={categoryId} nextSort={service.sort} />
        <ActionButton action={deleteService} fields={{ id: service.id }} variant="ghost" confirmMessage={`Supprimer définitivement le service « ${service.name} » ?`}>
          Supprimer ce service
        </ActionButton>
      </div>
    </details>
  );
}

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  return (
    <ActionButton
      action={deleteCategory}
      fields={{ id }}
      variant="ghost"
      confirmMessage={`Supprimer définitivement la catégorie « ${name} » et tous ses services ?`}
    >
      Supprimer la catégorie
    </ActionButton>
  );
}
