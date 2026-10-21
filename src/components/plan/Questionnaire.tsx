"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { categories, type CategoryId } from "@/content/categories";
import {
  answersSchema,
  goalOptions,
  supportOptions,
  timeframeOptions,
  timeInFranceOptions,
  type Answers,
} from "@/lib/plan/questions";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Button } from "@/components/ui/primitives";

type Draft = Partial<Answers> & { categories: CategoryId[] };

type Step = {
  key: keyof Answers;
  title: string;
  help?: string;
};

const steps: Step[] = [
  { key: "goal", title: "Quel est votre principal objectif ?" },
  { key: "timeInFrance", title: "Depuis combien de temps vivez-vous en France ?" },
  { key: "categories", title: "Quelles démarches souhaitez-vous organiser ?", help: "Plusieurs choix possibles." },
  { key: "timeframe", title: "Dans quel délai souhaitez-vous avancer ?", help: "Cela sert uniquement à répartir les tâches dans le temps." },
  { key: "support", title: "Comment souhaitez-vous avancer ?" },
];

function OptionCard({
  selected,
  onSelect,
  label,
  hint,
  type = "radio",
  name,
  value,
  icon,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  hint?: string;
  type?: "radio" | "checkbox";
  name: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-400 has-[:focus-visible]:ring-offset-2 ${
        selected ? "border-brand-600 bg-brand-50" : "border-line bg-white hover:border-brand-200"
      }`}
    >
      <input type={type} name={name} value={value} checked={selected} onChange={onSelect} className="sr-only" />
      {icon && (
        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-brand-700 text-white" : "bg-surface text-brand-700"}`}>
          {icon}
        </span>
      )}
      <span className="flex-1">
        <span className="block font-medium text-ink">{label}</span>
        {hint && <span className="mt-0.5 block text-sm text-muted">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 ${type === "radio" ? "rounded-full" : "rounded-md"} ${
          selected ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200"
        }`}
      >
        {selected && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
    </label>
  );
}

export function Questionnaire({ initial, onComplete }: { initial?: Answers | null; onComplete: (answers: Answers) => void }) {
  const [index, setIndex] = useState(0);
  const [draft, setDraft] = useState<Draft>(initial ?? { categories: [] });
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Place le focus sur la question à chaque changement d'étape (lecteurs d'écran).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index]);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setError(null);
  }

  function toggleCategory(id: CategoryId) {
    setDraft((d) => ({
      ...d,
      categories: d.categories.includes(id) ? d.categories.filter((c) => c !== id) : [...d.categories, id],
    }));
    setError(null);
  }

  function next() {
    const value = draft[step.key];
    const missing = Array.isArray(value) ? value.length === 0 : !value;
    if (missing) {
      setError(step.key === "categories" ? "Choisissez au moins un domaine." : "Choisissez une réponse pour continuer.");
      return;
    }
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    const parsed = answersSchema.safeParse(draft);
    if (!parsed.success) {
      setError("Certaines réponses sont incomplètes. Revenez aux étapes précédentes pour les vérifier.");
      return;
    }
    onComplete(parsed.data);
  }

  const errorId = "questionnaire-erreur";

  return (
    <form
      className="rounded-card border border-line bg-white p-5 shadow-[0_8px_24px_rgba(22,32,58,0.05)] sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      noValidate
    >
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Question {index + 1} sur {steps.length}
        </span>
        <span>{Math.round((index / steps.length) * 100)} %</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-50" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-600 transition-[width] duration-300" style={{ width: `${(index / steps.length) * 100}%` }} />
      </div>

      <fieldset className="mt-8 min-w-0" aria-describedby={error ? errorId : undefined}>
        <legend className="w-full">
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold text-ink outline-none sm:text-2xl">
            {step.title}
          </h2>
          {step.help && <p className="mt-1 text-sm text-muted">{step.help}</p>}
        </legend>

        <div className={`mt-6 grid gap-3 ${step.key === "categories" ? "sm:grid-cols-2" : ""}`}>
          {step.key === "goal" &&
            goalOptions.map((o) => (
              <OptionCard key={o.value} name="goal" value={o.value} label={o.label} hint={o.hint} selected={draft.goal === o.value} onSelect={() => set("goal", o.value)} />
            ))}
          {step.key === "timeInFrance" &&
            timeInFranceOptions.map((o) => (
              <OptionCard key={o.value} name="timeInFrance" value={o.value} label={o.label} selected={draft.timeInFrance === o.value} onSelect={() => set("timeInFrance", o.value)} />
            ))}
          {step.key === "categories" &&
            categories.map((c) => (
              <OptionCard
                key={c.id}
                type="checkbox"
                name="categories"
                value={c.id}
                label={c.title}
                icon={<CategoryIcon name={c.icon} className="h-4 w-4" />}
                selected={draft.categories.includes(c.id)}
                onSelect={() => toggleCategory(c.id)}
              />
            ))}
          {step.key === "timeframe" &&
            timeframeOptions.map((o) => (
              <OptionCard key={o.value} name="timeframe" value={o.value} label={o.label} selected={draft.timeframe === o.value} onSelect={() => set("timeframe", o.value)} />
            ))}
          {step.key === "support" &&
            supportOptions.map((o) => (
              <OptionCard key={o.value} name="support" value={o.value} label={o.label} hint={o.hint} selected={draft.support === o.value} onSelect={() => set("support", o.value)} />
            ))}
        </div>
      </fieldset>

      {error && (
        <p id={errorId} role="alert" className="mt-4 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => setIndex((i) => i - 1)} disabled={index === 0} className={index === 0 ? "invisible" : ""}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Précédent
        </Button>
        <Button type="submit" size="lg">
          {isLast ? "Voir mon plan d'action" : "Continuer"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
