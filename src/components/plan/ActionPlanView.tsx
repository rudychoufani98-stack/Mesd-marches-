"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BookOpen, CalendarClock, Check, FileText, Pencil, Printer, RotateCcw, Wrench } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPrice, type Offer } from "@/config/pricing";
import { getCategory } from "@/content/categories";
import { getSources } from "@/content/sources";
import { buildPlan } from "@/lib/plan/rules";
import type { Answers } from "@/lib/plan/questions";
import { Badge, Button, ButtonLink, Notice } from "@/components/ui/primitives";
import { ProgressBar } from "@/components/ui/ProgressBar";

const phaseTitles: Record<1 | 2 | 3, { title: string; text: string }> = {
  1: { title: "Étape 1 — Les fondations", text: "Ce qui conditionne souvent la suite." },
  2: { title: "Étape 2 — La mise en place", text: "Les démarches à lancer ensuite." },
  3: { title: "Étape 3 — L'organisation dans la durée", text: "Pour garder vos démarches à jour." },
};

export function ActionPlanView({
  answers,
  checked,
  onToggle,
  onEdit,
  onReset,
  offers,
  publishedGuideSlugs,
}: {
  offers: Offer[];
  publishedGuideSlugs: string[];
  answers: Answers;
  checked: string[];
  onToggle: (taskId: string) => void;
  onEdit: () => void;
  onReset: () => void;
}) {
  const plan = useMemo(() => buildPlan(answers), [answers]);
  const done = plan.tasks.filter((t) => checked.includes(t.id)).length;
  const offer = plan.recommendedOffer ? offers.find((o) => o.id === plan.recommendedOffer) : undefined;
  const phases = ([1, 2, 3] as const).filter((p) => plan.tasks.some((t) => t.phase === p));

  return (
    <div className="space-y-8">
      <div className="rounded-card border border-line bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">Votre plan d&apos;action</h2>
            <p className="mt-1 text-sm text-muted">
              {plan.tasks.length} tâches organisées sur environ {plan.horizonWeeks} semaines.
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <Button variant="secondary" onClick={onEdit}>
              <Pencil className="h-4 w-4" aria-hidden="true" /> Modifier mes réponses
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden="true" /> Imprimer
            </Button>
            <Button variant="ghost" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Recommencer
            </Button>
          </div>
        </div>
        <ProgressBar value={done} max={plan.tasks.length} className="mt-6" />
        {done === plan.tasks.length && plan.tasks.length > 0 && (
          <p className="mt-4 rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700" role="status">
            Bravo, toutes les tâches de votre plan sont cochées !
          </p>
        )}
      </div>

      <Notice title="Comment lire ce plan ?">
        Ce plan est construit à partir de règles d&apos;organisation générales, et non d&apos;une analyse de votre situation
        personnelle. Les semaines indiquées sont des repères pour vous organiser, pas des échéances officielles. Aucune date
        limite n&apos;est affichée tant qu&apos;elle n&apos;a pas été vérifiée dans une source officielle. {siteConfig.unverifiedNotice}
      </Notice>

      {phases.map((phase) => (
        <section key={phase} aria-labelledby={`phase-${phase}`}>
          <h2 id={`phase-${phase}`} className="text-lg font-bold text-ink">
            {phaseTitles[phase].title}
          </h2>
          <p className="text-sm text-muted">{phaseTitles[phase].text}</p>
          <ol className="mt-4 space-y-3">
            {plan.tasks
              .filter((t) => t.phase === phase)
              .map((task) => {
                const isDone = checked.includes(task.id);
                const category = getCategory(task.category);
                return (
                  <li key={task.id} className={`rounded-card border p-4 transition-colors sm:p-5 ${isDone ? "border-accent-200 bg-accent-50/50" : "border-line bg-white"}`}>
                    <div className="flex gap-3">
                      <input
                        id={`tache-${task.id}`}
                        type="checkbox"
                        checked={isDone}
                        onChange={() => onToggle(task.id)}
                        aria-label={`Marquer comme terminée : ${task.title}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`tache-${task.id}`}
                        className={`inline-flex h-8 w-8 shrink-0 cursor-pointer sm:mt-0.5 sm:h-6 sm:w-6 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 peer-focus-visible:ring-offset-2 ${
                          isDone ? "border-accent-500 bg-accent-500 text-white" : "border-brand-200 bg-white hover:border-brand-400"
                        }`}
                      >
                        {isDone && <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                      </label>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-semibold ${isDone ? "text-muted line-through" : "text-ink"}`}>{task.title}</h3>
                        </div>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {category && <Badge tone="neutral">{category.shortTitle}</Badge>}
                          <span className="inline-flex items-center gap-1 text-xs text-muted">
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> Repère : semaine {task.suggestedWeek}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{task.description}</p>

                        {task.documents.length > 0 && (
                          <p className="mt-2 flex gap-1.5 text-sm text-ink">
                            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                            <span>
                              <span className="font-medium">À préparer :</span> {task.documents.join(", ")}
                            </span>
                          </p>
                        )}

                        {task.deadline ? (
                          <p className="mt-2 text-sm font-medium text-ink">
                            Échéance : {task.deadline.label} (vérifiée le {task.deadline.verifiedOn})
                          </p>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-0 text-sm">
                          {task.guideSlug && publishedGuideSlugs.includes(task.guideSlug) && (
                            <Link href={`/guides/${task.guideSlug}`} className="inline-flex min-h-9 items-center gap-1 font-medium text-brand-700 hover:underline">
                              <BookOpen className="h-4 w-4" aria-hidden="true" /> Guide pratique
                            </Link>
                          )}
                          {task.toolHref && (
                            <Link href={task.toolHref} className="inline-flex min-h-9 items-center gap-1 font-medium text-brand-700 hover:underline">
                              <Wrench className="h-4 w-4" aria-hidden="true" /> Outil
                            </Link>
                          )}
                          {getSources(task.sourceIds).map((s) => (
                            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center font-medium text-brand-700 hover:underline">
                              {s.name}
                              <span className="sr-only"> (nouvel onglet)</span>
                            </a>
                          ))}
                        </div>

                        <details className="mt-3 text-xs text-muted">
                          <summary className="inline-flex min-h-9 cursor-pointer select-none items-center hover:text-ink">Pourquoi cette tâche ?</summary>
                          <ul className="mt-1.5 list-inside list-disc space-y-0.5">
                            {task.reasons.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ol>
        </section>
      ))}

      {plan.documents.length > 0 && (
        <section aria-labelledby="documents" className="rounded-card border border-line bg-white p-5 sm:p-7">
          <h2 id="documents" className="text-lg font-bold text-ink">
            Documents à préparer
          </h2>
          <p className="mt-1 text-sm text-muted">Liste indicative : les documents exacts dépendent de chaque organisme.</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {plan.documents.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-ink">
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" /> {d}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="ressources" className="rounded-card border border-line bg-white p-5 sm:p-7">
        <h2 id="ressources" className="text-lg font-bold text-ink">
          Ressources officielles
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {getSources(plan.sourceIds).map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center text-sm font-medium text-brand-700 hover:underline">
                {s.name}
              </a>
              <span className="block text-xs text-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="no-print rounded-card bg-brand-900 p-6 text-white sm:p-8">
        {offer ? (
          <>
            <h2 className="text-xl font-bold">Vous souhaitez être accompagné·e</h2>
            <p className="mt-2 text-brand-200">
              D&apos;après vos réponses, l&apos;offre <strong className="text-white">{offer.name}</strong> ({formatPrice(offer)}) semble la
              plus adaptée. Vous pourrez en discuter librement lors de notre premier échange.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href={`/rendez-vous?offre=${offer.id}`} variant="secondary">
                Demander ce rendez-vous
              </ButtonLink>
              <ButtonLink href="/tarifs" variant="ghost" className="text-white hover:bg-white/10">
                Comparer les offres
              </ButtonLink>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">Continuez à votre rythme</h2>
            <p className="mt-2 text-brand-200">
              Votre plan et votre progression sont conservés sur cet appareil. Consultez les guides pour chaque tâche, et
              demandez un rendez-vous si vous avez besoin d&apos;aide.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href="/guides" variant="secondary">
                Parcourir les guides
              </ButtonLink>
              <ButtonLink href="/tarifs" variant="ghost" className="text-white hover:bg-white/10">
                Voir l&apos;accompagnement
              </ButtonLink>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
