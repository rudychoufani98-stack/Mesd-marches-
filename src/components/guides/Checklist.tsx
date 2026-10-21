"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { ChecklistItem } from "@/content/guides";
import { readLocal, writeLocal } from "@/lib/storage";
import { ProgressBar } from "@/components/ui/ProgressBar";

/** Checklist interactive. La progression est mémorisée uniquement dans ce navigateur. */
const copy = {
  fr: { title: "Ma checklist", reset: "Réinitialiser", stored: "Votre progression est enregistrée uniquement sur cet appareil." },
  en: { title: "My checklist", reset: "Reset", stored: "Your progress is saved on this device only." },
};

export function Checklist({
  storageKey,
  items,
  title,
  locale = "fr",
}: {
  storageKey: string;
  items: ChecklistItem[];
  title?: string;
  locale?: "fr" | "en";
}) {
  const t = copy[locale];
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lecture après le montage : le stockage local n'existe pas côté serveur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChecked(readLocal<string[]>(`checklist:${storageKey}`, []));
    setLoaded(true);
  }, [storageKey]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeLocal(`checklist:${storageKey}`, next);
      return next;
    });
  }

  function reset() {
    setChecked([]);
    writeLocal(`checklist:${storageKey}`, []);
  }

  const done = items.filter((i) => checked.includes(i.id)).length;

  return (
    <section aria-labelledby={`checklist-${storageKey}`} className="rounded-card border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 id={`checklist-${storageKey}`} className="text-lg font-semibold text-ink">
          {title ?? t.title}
        </h2>
        {done > 0 && (
          <button type="button" onClick={reset} className="no-print inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> {t.reset}
          </button>
        )}
      </div>
      <ProgressBar value={done} max={items.length} className="mt-4" locale={locale} />
      <ul className="mt-5 space-y-2">
        {items.map((item) => {
          const isChecked = checked.includes(item.id);
          const inputId = `${storageKey}-${item.id}`;
          return (
            <li key={item.id}>
              <label
                htmlFor={inputId}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                  isChecked ? "border-accent-200 bg-accent-50/60" : "border-line hover:border-brand-200"
                }`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  className="peer sr-only"
                  checked={isChecked}
                  disabled={!loaded}
                  onChange={() => toggle(item.id)}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 peer-focus-visible:ring-offset-2 ${
                    isChecked ? "border-accent-500 bg-accent-500 text-white" : "border-brand-200 bg-white"
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className={`text-sm leading-relaxed ${isChecked ? "text-muted line-through" : "text-ink"}`}>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-muted">{t.stored}</p>
    </section>
  );
}
