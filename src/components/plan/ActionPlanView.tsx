"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BookOpen, CalendarClock, Check, FileText, Pencil, Printer, RotateCcw, Wrench } from "lucide-react";
import { formatPrice, type Offer } from "@/config/pricing";
import { getCategory } from "@/content/categories";
import { getSources } from "@/content/sources";
import { localizeCategory, localizeSource } from "@/content/translations";
import { getDictionary, href, type Locale } from "@/i18n";
import { buildPlan } from "@/lib/plan/rules";
import { taskOffers } from "@/lib/plan/tasks";
import type { Answers } from "@/lib/plan/questions";
import { Badge, Button, ButtonLink, Notice } from "@/components/ui/primitives";
import { ProgressBar } from "@/components/ui/ProgressBar";

const copy = {
  fr: {
    phases: {
      1: { title: "Étape 1 — Les fondations", text: "Ce qui conditionne souvent la suite." },
      2: { title: "Étape 2 — La mise en place", text: "Les démarches à lancer ensuite." },
      3: { title: "Étape 3 — L'organisation dans la durée", text: "Pour garder vos démarches à jour." },
    },
    title: "Votre plan d'action",
    summary: (n: number, w: number) => `${n} tâches organisées sur environ ${w} semaines.`,
    edit: "Modifier mes réponses",
    print: "Imprimer",
    restart: "Recommencer",
    allDone: "Bravo, toutes les tâches de votre plan sont cochées !",
    howTitle: "Comment lire ce plan ?",
    howText:
      "Ce plan est construit à partir de règles d'organisation générales, et non d'une analyse de votre situation personnelle. Les semaines indiquées sont des repères pour vous organiser, pas des échéances officielles. Aucune date limite n'est affichée tant qu'elle n'a pas été vérifiée dans une source officielle.",
    markDone: "Marquer comme terminée :",
    week: "Repère : semaine",
    prepare: "À préparer :",
    deadline: "Échéance :",
    checkedOn: "vérifiée le",
    guide: "Guide pratique",
    tool: "Outil",
    newTab: "(nouvel onglet)",
    why: "Pourquoi cette tâche ?",
    getHelp: "Être aidé·e pour cette démarche",
    docsTitle: "Documents à préparer",
    docsText: "Liste indicative : les documents exacts dépendent de chaque organisme.",
    resources: "Ressources officielles",
    supportTitle: "Vous souhaitez être accompagné·e",
    supportBefore: "D'après vos réponses, l'offre",
    supportAfter: "semble la plus adaptée. Vous pourrez en discuter librement lors de notre premier échange.",
    book: "Demander ce rendez-vous",
    compare: "Comparer les offres",
    paceTitle: "Continuez à votre rythme",
    paceText:
      "Votre plan et votre progression sont conservés sur cet appareil. Consultez les guides pour chaque tâche, et demandez un rendez-vous si vous avez besoin d'aide.",
    browse: "Parcourir les guides",
    seeSupport: "Voir l'accompagnement",
  },
  en: {
    phases: {
      1: { title: "Step 1 — The foundations", text: "What other steps often depend on." },
      2: { title: "Step 2 — Getting set up", text: "The procedures to start next." },
      3: { title: "Step 3 — Staying organised", text: "To keep your paperwork up to date." },
    },
    title: "Your action plan",
    summary: (n: number, w: number) => `${n} tasks organised over about ${w} weeks.`,
    edit: "Change my answers",
    print: "Print",
    restart: "Start again",
    allDone: "Well done, every task in your plan is ticked off!",
    howTitle: "How to read this plan",
    howText:
      "This plan is built from general organisation rules, not from an analysis of your personal situation. The weeks shown are milestones to help you organise yourself, not official deadlines. No deadline is shown unless it has been checked in an official source.",
    markDone: "Mark as done:",
    week: "Milestone: week",
    prepare: "To prepare:",
    deadline: "Deadline:",
    checkedOn: "checked on",
    guide: "Practical guide",
    tool: "Tool",
    newTab: "(opens in a new tab)",
    why: "Why this task?",
    getHelp: "Get help with this step",
    docsTitle: "Documents to prepare",
    docsText: "For guidance only: the exact documents depend on each organisation.",
    resources: "Official resources",
    supportTitle: "You'd like some support",
    supportBefore: "Based on your answers, the",
    supportAfter: "offer looks like the best fit. You can discuss it freely during our first conversation.",
    book: "Book this appointment",
    compare: "Compare offers",
    paceTitle: "Keep going at your own pace",
    paceText: "Your plan and progress are saved on this device. Read the guides for each task, and book an appointment if you need help.",
    browse: "Browse the guides",
    seeSupport: "See personal support",
  },
};

export function ActionPlanView({
  answers,
  checked,
  onToggle,
  onEdit,
  onReset,
  offers,
  publishedGuideSlugs,
  locale = "fr",
}: {
  locale?: Locale;
  offers: Offer[];
  publishedGuideSlugs: string[];
  answers: Answers;
  checked: string[];
  onToggle: (taskId: string) => void;
  onEdit: () => void;
  onReset: () => void;
}) {
  const t = copy[locale];
  const plan = useMemo(() => buildPlan(answers, locale), [answers, locale]);
  const done = plan.tasks.filter((t) => checked.includes(t.id)).length;
  const offer = plan.recommendedOffer ? offers.find((o) => o.id === plan.recommendedOffer) : undefined;
  const phases = ([1, 2, 3] as const).filter((p) => plan.tasks.some((t) => t.phase === p));

  return (
    <div className="space-y-8">
      <div className="rounded-card border border-line bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-ink">{t.title}</h2>
            <p className="mt-1 text-sm text-muted">
              {t.summary(plan.tasks.length, plan.horizonWeeks)}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <Button variant="secondary" onClick={onEdit}>
              <Pencil className="h-4 w-4" aria-hidden="true" /> {t.edit}
            </Button>
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer className="h-4 w-4" aria-hidden="true" /> {t.print}
            </Button>
            <Button variant="ghost" onClick={onReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t.restart}
            </Button>
          </div>
        </div>
        <ProgressBar value={done} max={plan.tasks.length} className="mt-6" locale={locale} />
        {done === plan.tasks.length && plan.tasks.length > 0 && (
          <p className="mt-4 rounded-xl bg-accent-50 px-4 py-3 text-sm font-medium text-accent-700" role="status">
            {t.allDone}
          </p>
        )}
      </div>

      <Notice title={t.howTitle}>
        {t.howText} {getDictionary(locale).site.unverifiedNotice}
      </Notice>

      {phases.map((phase) => (
        <section key={phase} aria-labelledby={`phase-${phase}`}>
          <h2 id={`phase-${phase}`} className="text-lg font-bold text-ink">
            {t.phases[phase].title}
          </h2>
          <p className="text-sm text-muted">{t.phases[phase].text}</p>
          <ol className="mt-4 space-y-3">
            {plan.tasks
              .filter((t) => t.phase === phase)
              .map((task) => {
                const isDone = checked.includes(task.id);
                const rawCategory = getCategory(task.category);
                const category = rawCategory ? localizeCategory(rawCategory, locale) : undefined;
                return (
                  <li key={task.id} className={`rounded-card border p-4 transition-colors sm:p-5 ${isDone ? "border-accent-200 bg-accent-50/50" : "border-line bg-white"}`}>
                    <div className="flex gap-3">
                      <input
                        id={`tache-${task.id}`}
                        type="checkbox"
                        checked={isDone}
                        onChange={() => onToggle(task.id)}
                        aria-label={`${t.markDone} ${task.title}`}
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
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> {t.week} {task.suggestedWeek}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{task.description}</p>

                        {task.documents.length > 0 && (
                          <p className="mt-2 flex gap-1.5 text-sm text-ink">
                            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                            <span>
                              <span className="font-medium">{t.prepare}</span> {task.documents.join(", ")}
                            </span>
                          </p>
                        )}

                        {task.deadline ? (
                          <p className="mt-2 text-sm font-medium text-ink">
                            {t.deadline} {task.deadline.label} ({t.checkedOn} {task.deadline.verifiedOn})
                          </p>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-0 text-sm">
                          {task.guideSlug && publishedGuideSlugs.includes(task.guideSlug) && (
                            <Link href={href(`/guides/${task.guideSlug}`, locale)} className="inline-flex min-h-9 items-center gap-1 font-medium text-brand-700 hover:underline">
                              <BookOpen className="h-4 w-4" aria-hidden="true" /> {t.guide}
                            </Link>
                          )}
                          {task.toolHref && (
                            <Link href={href(task.toolHref, locale)} className="inline-flex min-h-9 items-center gap-1 font-medium text-brand-700 hover:underline">
                              <Wrench className="h-4 w-4" aria-hidden="true" /> {t.tool}
                            </Link>
                          )}
                          {getSources(task.sourceIds).map((x) => localizeSource(x, locale)).map((s) => (
                            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center font-medium text-brand-700 hover:underline">
                              {s.name}
                              <span className="sr-only"> {t.newTab}</span>
                            </a>
                          ))}
                        </div>

                        {(() => {
                          const helpOffer = offers.find((o) => o.id === taskOffers[task.id]);
                          return helpOffer ? (
                            <Link
                              href={`${href("/rendez-vous", locale)}?offre=${helpOffer.id}`}
                              className="no-print mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-accent-50 px-3 text-sm font-semibold text-accent-700 hover:bg-accent-100"
                            >
                              <span aria-hidden="true">🙋</span> {t.getHelp} · {formatPrice(helpOffer, locale)}
                            </Link>
                          ) : null;
                        })()}

                        <details className="mt-3 text-xs text-muted">
                          <summary className="inline-flex min-h-9 cursor-pointer select-none items-center hover:text-ink">{t.why}</summary>
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
            {t.docsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">{t.docsText}</p>
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
          {t.resources}
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {getSources(plan.sourceIds).map((x) => localizeSource(x, locale)).map((s) => (
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
            <h2 className="text-xl font-bold">{t.supportTitle}</h2>
            <p className="mt-2 text-brand-200">
              {t.supportBefore} <strong className="text-white">{offer.name}</strong> ({formatPrice(offer, locale)}) {t.supportAfter}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href={`${href("/rendez-vous", locale)}?offre=${offer.id}`} variant="secondary">
                {t.book}
              </ButtonLink>
              <ButtonLink href={href("/tarifs", locale)} variant="ghost" className="text-white hover:bg-white/10">
                {t.compare}
              </ButtonLink>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">{t.paceTitle}</h2>
            <p className="mt-2 text-brand-200">{t.paceText}</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href={href("/guides", locale)} variant="secondary">
                {t.browse}
              </ButtonLink>
              <ButtonLink href={href("/tarifs", locale)} variant="ghost" className="text-white hover:bg-white/10">
                {t.seeSupport}
              </ButtonLink>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
