"use client";

import { useEffect, useState } from "react";
import type { Offer } from "@/config/pricing";
import { answersSchema, type Answers } from "@/lib/plan/questions";
import { readLocal, removeLocal, writeLocal } from "@/lib/storage";
import { ActionPlanView } from "./ActionPlanView";
import { Questionnaire } from "./Questionnaire";

type Mode = "loading" | "questions" | "plan";

/**
 * Orchestration du parcours : questionnaire puis plan.
 * Les réponses et la progression restent dans le navigateur (aucun envoi au serveur).
 */
export function PlanBuilder({
  offers,
  publishedGuideSlugs,
  locale = "fr",
}: {
  offers: Offer[];
  publishedGuideSlugs: string[];
  locale?: "fr" | "en";
}) {
  const [mode, setMode] = useState<Mode>("loading");
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const saved = answersSchema.safeParse(readLocal<unknown>("plan:answers", null));
    /* eslint-disable react-hooks/set-state-in-effect -- lecture du stockage local après le montage */
    if (saved.success) {
      setAnswers(saved.data);
      setChecked(readLocal<string[]>("plan:checked", []));
      setMode("plan");
    } else {
      setMode("questions");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function complete(next: Answers) {
    setAnswers(next);
    writeLocal("plan:answers", next);
    setMode("plan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggle(id: string) {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLocal("plan:checked", next);
      return next;
    });
  }

  function reset() {
    if (!window.confirm(locale === "en" ? "Delete your plan and progress saved on this device?" : "Effacer votre plan et votre progression enregistrés sur cet appareil ?")) return;
    removeLocal("plan:answers");
    removeLocal("plan:checked");
    setAnswers(null);
    setChecked([]);
    setMode("questions");
  }

  if (mode === "loading") {
    return <div className="h-96 animate-pulse rounded-card bg-surface" aria-busy="true" aria-label={locale === "en" ? "Loading" : "Chargement"} />;
  }

  if (mode === "questions" || !answers) {
    return <Questionnaire initial={answers} onComplete={complete} locale={locale} />;
  }

  return <ActionPlanView locale={locale} offers={offers} publishedGuideSlugs={publishedGuideSlugs} answers={answers} checked={checked} onToggle={toggle} onEdit={() => setMode("questions")} onReset={reset} />;
}
