"use client";

import { useEffect, useId, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { readLocal, writeLocal } from "@/lib/storage";
import { Button } from "@/components/ui/primitives";

type Line = { id: string; label: string; amount: string };
type Budget = { incomes: Line[]; expenses: Line[] };

const defaults: Budget = {
  incomes: [{ id: "i1", label: "Salaire net", amount: "" }],
  expenses: [
    { id: "e1", label: "Loyer et charges", amount: "" },
    { id: "e2", label: "Énergie et internet", amount: "" },
    { id: "e3", label: "Transports", amount: "" },
    { id: "e4", label: "Alimentation", amount: "" },
    { id: "e5", label: "Assurances", amount: "" },
  ],
};

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

/** Convertit une saisie libre (« 1 200,50 ») en nombre ; renvoie 0 si la saisie est vide ou invalide. */
export function parseAmount(value: string): number {
  const n = Number(value.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function LineEditor({ title, lines, onChange, addLabel }: { title: string; lines: Line[]; onChange: (lines: Line[]) => void; addLabel: string }) {
  const baseId = useId();
  return (
    <fieldset className="min-w-0 rounded-card border border-line bg-white p-4 sm:p-5">
      <legend className="px-1 text-lg font-semibold text-ink">{title}</legend>
      <ul className="mt-2 space-y-2">
        {lines.map((line, i) => (
          <li key={line.id} className="flex items-center gap-2">
            <label className="sr-only" htmlFor={`${baseId}-l-${line.id}`}>
              Libellé {i + 1}
            </label>
            <input
              id={`${baseId}-l-${line.id}`}
              value={line.label}
              maxLength={60}
              onChange={(e) => onChange(lines.map((l) => (l.id === line.id ? { ...l, label: e.target.value } : l)))}
              className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            />
            <label className="sr-only" htmlFor={`${baseId}-a-${line.id}`}>
              Montant mensuel pour {line.label || `la ligne ${i + 1}`}, en euros
            </label>
            <div className="relative w-28 shrink-0 sm:w-32">
              <input
                id={`${baseId}-a-${line.id}`}
                inputMode="decimal"
                placeholder="0"
                value={line.amount}
                onChange={(e) => onChange(lines.map((l) => (l.id === line.id ? { ...l, amount: e.target.value.replace(/[^\d.,\s]/g, "") } : l)))}
                className="w-full rounded-lg border border-line py-2 pl-3 pr-7 text-right text-sm focus:border-brand-400 focus:outline-none"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted" aria-hidden="true">
                €
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange(lines.filter((l) => l.id !== line.id))}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-red-700"
              aria-label={`Supprimer la ligne ${line.label || i + 1}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      {lines.length === 0 && <p className="mt-2 text-sm text-muted">Aucune ligne pour le moment.</p>}
      <Button
        type="button"
        variant="ghost"
        className="mt-3"
        onClick={() => onChange([...lines, { id: `${Date.now()}`, label: "", amount: "" }])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" /> {addLabel}
      </Button>
    </fieldset>
  );
}

export function BudgetTool() {
  const [budget, setBudget] = useState<Budget>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du stockage local après le montage
    setBudget(readLocal<Budget>("budget", defaults));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeLocal("budget", budget);
  }, [budget, loaded]);

  const totalIn = budget.incomes.reduce((s, l) => s + parseAmount(l.amount), 0);
  const totalOut = budget.expenses.reduce((s, l) => s + parseAmount(l.amount), 0);
  const balance = totalIn - totalOut;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-6">
        <LineEditor title="Revenus mensuels" lines={budget.incomes} onChange={(incomes) => setBudget((b) => ({ ...b, incomes }))} addLabel="Ajouter un revenu" />
        <LineEditor title="Dépenses mensuelles" lines={budget.expenses} onChange={(expenses) => setBudget((b) => ({ ...b, expenses }))} addLabel="Ajouter une dépense" />
      </div>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-card border border-line bg-white p-5">
          <h2 className="font-semibold text-ink">Synthèse</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Revenus</dt>
              <dd className="font-medium text-ink">{euros.format(totalIn)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Dépenses</dt>
              <dd className="font-medium text-ink">{euros.format(totalOut)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-ink">Reste à vivre</dt>
              <dd className={`font-bold ${balance < 0 ? "text-red-700" : "text-accent-700"}`}>{euros.format(balance)}</dd>
            </div>
          </dl>
          {balance < 0 && <p className="mt-3 text-sm text-red-700">Vos dépenses dépassent vos revenus ce mois-ci.</p>}
        </div>
        <Button type="button" variant="secondary" className="w-full" onClick={() => setBudget(defaults)}>
          Réinitialiser
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          Calcul indicatif réalisé dans votre navigateur. Vos montants sont conservés uniquement sur cet appareil et ne sont
          jamais envoyés.
        </p>
      </aside>
    </div>
  );
}
