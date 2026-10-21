"use client";

import { categories } from "@/content/categories";
import type { Guide } from "@/content/guides";
import { formatChecklist, formatGlossary, formatSteps } from "@/lib/admin/guide-format";
import { saveGuide } from "@/lib/admin/actions";
import { adminInput, adminLabel, AdminForm, FieldError, ResultMessage, SubmitButton } from "@/components/admin/forms";

type SourceOption = { id: string; name: string; url: string };

export function GuideEditor({ guide, sources }: { guide?: Guide; sources: SourceOption[] }) {
  const isNew = !guide;
  return (
    <AdminForm action={saveGuide} className="space-y-6">
      {(r) => (
        <>
          <input type="hidden" name="mode" value={isNew ? "create" : "edit"} />

          <section className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2 sm:p-6">
            <div className="sm:col-span-2">
              <label htmlFor="title" className={adminLabel}>
                Titre
              </label>
              <input id="title" name="title" defaultValue={guide?.title} className={adminInput} required maxLength={160} />
              <FieldError result={r} name="title" />
            </div>
            <div>
              <label htmlFor="slug" className={adminLabel}>
                Adresse de la page
              </label>
              {isNew ? (
                <input id="slug" name="slug" placeholder="ex. ouvrir-un-compte" className={adminInput} required maxLength={80} />
              ) : (
                <>
                  <input type="hidden" name="slug" value={guide.slug} />
                  <p id="slug" className="mt-1 break-all rounded-lg bg-surface px-3 py-2 text-sm text-muted">
                    /guides/{guide.slug} · privé, accessible uniquement par lien client
                  </p>
                </>
              )}
              <FieldError result={r} name="slug" />
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <div>
                <label htmlFor="category" className={adminLabel}>
                  Domaine
                </label>
                <select id="category" name="category" defaultValue={guide?.category ?? ""} className={adminInput} required>
                  <option value="" disabled>
                    Choisir…
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <FieldError result={r} name="category" />
              </div>
              <div>
                <label htmlFor="readingMinutes" className={adminLabel}>
                  Lecture (min)
                </label>
                <input id="readingMinutes" name="readingMinutes" type="number" min={1} max={60} defaultValue={guide?.readingMinutes ?? 5} className={`${adminInput} w-24`} />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className={adminLabel}>
                Description courte <span className="font-normal text-muted">(affichée dans la liste et sur Google)</span>
              </label>
              <textarea id="description" name="description" rows={2} defaultValue={guide?.description} className={adminInput} maxLength={300} />
              <FieldError result={r} name="description" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="intro" className={adminLabel}>
                Introduction
              </label>
              <textarea id="intro" name="intro" rows={3} defaultValue={guide?.intro} className={adminInput} maxLength={2000} />
            </div>
          </section>

          <section className="space-y-4 rounded-card border border-line bg-white p-5 sm:p-6">
            <div>
              <label htmlFor="steps" className={adminLabel}>
                Étapes
              </label>
              <p className="text-xs text-muted">Commencez chaque étape par « ## » suivi du titre, puis le texte sur les lignes suivantes.</p>
              <textarea
                id="steps"
                name="steps"
                rows={14}
                defaultValue={guide ? formatSteps(guide.steps) : "## Titre de la première étape\nTexte de l'étape.\n\n## Titre de la deuxième étape\nTexte de l'étape."}
                className={`${adminInput} font-mono text-sm`}
              />
              <FieldError result={r} name="steps" />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="checklist" className={adminLabel}>
                  Checklist
                </label>
                <p className="text-xs text-muted">Une ligne = une case à cocher.</p>
                <textarea id="checklist" name="checklist" rows={7} defaultValue={guide ? formatChecklist(guide.checklist) : ""} className={adminInput} />
                <FieldError result={r} name="checklist" />
              </div>
              <div>
                <label htmlFor="glossary" className={adminLabel}>
                  Glossaire <span className="font-normal text-muted">(facultatif)</span>
                </label>
                <p className="text-xs text-muted">Une ligne par terme : « Terme : définition ».</p>
                <textarea id="glossary" name="glossary" rows={7} defaultValue={guide ? formatGlossary(guide.glossary) : ""} className={adminInput} />
              </div>
            </div>
          </section>

          <section className="rounded-card border border-line bg-white p-5 sm:p-6">
            <fieldset>
              <legend className={adminLabel}>Sources officielles</legend>
              <p className="text-xs text-muted">
                Seules les sources du registre peuvent être citées. Pour en ajouter une nouvelle, elle doit d&apos;abord être vérifiée et
                ajoutée au registre (fichier <code>src/content/sources.ts</code>).
              </p>
              <div className="mt-3 grid gap-1 sm:grid-cols-2">
                {sources.map((s) => (
                  <label key={s.id} className="flex min-h-10 items-start gap-2 rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-surface">
                    <input type="checkbox" name="sources" value={s.id} defaultChecked={guide?.sourceIds.includes(s.id as never)} className="mt-0.5 h-4 w-4 shrink-0 accent-brand-700" />
                    <span>
                      {s.name}
                      <span className="block break-all text-xs text-muted">{s.url}</span>
                    </span>
                  </label>
                ))}
              </div>
              <FieldError result={r} name="sources" />
            </fieldset>
          </section>

          <section className="grid gap-4 rounded-card border border-line bg-white p-5 sm:grid-cols-2 sm:p-6">
            <div>
              <label htmlFor="lastVerified" className={adminLabel}>
                Dernière vérification
              </label>
              <p className="text-xs text-muted">
                À remplir uniquement après avoir relu le guide face à ses sources. Laissez vide sinon : le site affichera
                « Information à vérifier auprès de l&apos;organisme compétent ».
              </p>
              <input id="lastVerified" name="lastVerified" type="date" defaultValue={guide?.lastVerified ?? ""} className={adminInput} />
              <FieldError result={r} name="lastVerified" />
            </div>
            <div>
              <label htmlFor="status" className={adminLabel}>
                Statut
              </label>
              <p className="text-xs text-muted">Un guide publié doit avoir au moins une étape, une case et une source.</p>
              <select id="status" name="status" defaultValue={guide?.status ?? "draft"} className={adminInput}>
                <option value="draft">Brouillon (non visible)</option>
                <option value="published">Publié</option>
              </select>
            </div>
          </section>

          <div className="space-y-3">
            <ResultMessage result={r} />
            <SubmitButton>{isNew ? "Créer le guide" : "Enregistrer"}</SubmitButton>
          </div>
        </>
      )}
    </AdminForm>
  );
}
