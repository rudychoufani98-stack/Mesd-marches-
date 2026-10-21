"use client";

import { useEffect, useId, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Locale } from "@/i18n";
import { readLocal, writeLocal } from "@/lib/storage";
import { Button } from "@/components/ui/primitives";

type Line = { id: string; label: string; amount: string };
type Budget = { incomes: Line[]; expenses: Line[] };

const copy = {
  fr: {
    defaults: {
      incomes: [{ id: "i1", label: "Salaire net", amount: "" }],
      expenses: [
        { id: "e1", label: "Loyer et charges", amount: "" },
        { id: "e2", label: "Énergie et internet", amount: "" },
        { id: "e3", label: "Transports", amount: "" },
        { id: "e4", label: "Alimentation", amount: "" },
        { id: "e5", label: "Assurances", amount: "" },
      ],
    } as Budget,
    euros: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }),
    lineLabel: (n: number) => `Libellé ${n}`,
    amountLabel: (label: string, n: number) => `Montant mensuel pour ${label || `la ligne ${n}`}, en euros`,
    deleteLine: (label: string, n: number) => `Supprimer la ligne ${label || n}`,
    noLines: "Aucune ligne pour le moment.",
    incomesTitle: "Revenus mensuels",
    addIncome: "Ajouter un revenu",
    expensesTitle: "Dépenses mensuelles",
    addExpense: "Ajouter une dépense",
    summary: "Synthèse",
    incomes: "Revenus",
    expenses: "Dépenses",
    balance: "Reste à vivre",
    overspent: "Vos dépenses dépassent vos revenus ce mois-ci.",
    reset: "Réinitialiser",
    privacy:
      "Calcul indicatif réalisé dans votre navigateur. Vos montants sont conservés uniquement sur cet appareil et ne sont jamais envoyés.",
  },
  en: {
    defaults: {
      incomes: [{ id: "i1", label: "Net salary", amount: "" }],
      expenses: [
        { id: "e1", label: "Rent and service charges", amount: "" },
        { id: "e2", label: "Energy and internet", amount: "" },
        { id: "e3", label: "Transport", amount: "" },
        { id: "e4", label: "Food", amount: "" },
        { id: "e5", label: "Insurance", amount: "" },
      ],
    } as Budget,
    euros: new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }),
    lineLabel: (n: number) => `Label ${n}`,
    amountLabel: (label: string, n: number) => `Monthly amount for ${label || `line ${n}`}, in euros`,
    deleteLine: (label: string, n: number) => `Delete line ${label || n}`,
    noLines: "No lines yet.",
    incomesTitle: "Monthly income",
    addIncome: "Add income",
    expensesTitle: "Monthly expenses",
    addExpense: "Add an expense",
    summary: "Summary",
    incomes: "Income",
    expenses: "Expenses",
    balance: "Money left over",
    overspent: "Your expenses exceed your income this month.",
    reset: "Reset",
    privacy:
      "An indicative calculation made in your browser. Your amounts are kept only on this device and are never sent.",
  },
};

type Copy = (typeof copy)[Locale];

/**
 * Convertit une saisie libre en nombre ; renvoie 0 si la saisie est vide ou invalide.
 * Français : « 1 200,50 » (virgule décimale). Anglais : "1,200.50" (virgule des milliers).
 */
export function parseAmount(value: string, locale: Locale = "fr"): number {
  const compact = value.replace(/\s/g, "");
  const n = Number(locale === "en" ? compact.replace(/,/g, "") : compact.replace(",", "."));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function LineEditor({
  title,
  lines,
  onChange,
  addLabel,
  t,
}: {
  title: string;
  lines: Line[];
  onChange: (lines: Line[]) => void;
  addLabel: string;
  t: Copy;
}) {
  const baseId = useId();
  return (
    <fieldset className="min-w-0 rounded-card border border-line bg-white p-4 sm:p-5">
      <legend className="px-1 text-lg font-semibold text-ink">{title}</legend>
      <ul className="mt-2 space-y-2">
        {lines.map((line, i) => (
          <li key={line.id} className="flex items-center gap-2">
            <label className="sr-only" htmlFor={`${baseId}-l-${line.id}`}>
              {t.lineLabel(i + 1)}
            </label>
            <input
              id={`${baseId}-l-${line.id}`}
              value={line.label}
              maxLength={60}
              onChange={(e) => onChange(lines.map((l) => (l.id === line.id ? { ...l, label: e.target.value } : l)))}
              className="min-w-0 flex-1 rounded-lg border border-line px-3 py-2 text-base focus:border-brand-400 focus:outline-none sm:text-sm"
            />
            <label className="sr-only" htmlFor={`${baseId}-a-${line.id}`}>
              {t.amountLabel(line.label, i + 1)}
            </label>
            <div className="relative w-28 shrink-0 sm:w-32">
              <input
                id={`${baseId}-a-${line.id}`}
                inputMode="decimal"
                placeholder="0"
                value={line.amount}
                onChange={(e) => onChange(lines.map((l) => (l.id === line.id ? { ...l, amount: e.target.value.replace(/[^\d.,\s]/g, "") } : l)))}
                className="w-full rounded-lg border border-line py-2 pl-3 pr-7 text-right text-base focus:border-brand-400 focus:outline-none sm:text-sm"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted" aria-hidden="true">
                €
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange(lines.filter((l) => l.id !== line.id))}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface hover:text-red-700"
              aria-label={t.deleteLine(line.label, i + 1)}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      {lines.length === 0 && <p className="mt-2 text-sm text-muted">{t.noLines}</p>}
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

export function BudgetTool({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const defaults = t.defaults;
  const [budget, setBudget] = useState<Budget>(defaults);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du stockage local après le montage
    setBudget(readLocal<Budget>("budget", defaults));
    setLoaded(true);
  }, [defaults]);

  useEffect(() => {
    if (loaded) writeLocal("budget", budget);
  }, [budget, loaded]);

  const totalIn = budget.incomes.reduce((s, l) => s + parseAmount(l.amount, locale), 0);
  const totalOut = budget.expenses.reduce((s, l) => s + parseAmount(l.amount, locale), 0);
  const balance = totalIn - totalOut;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-6">
        <LineEditor title={t.incomesTitle} lines={budget.incomes} onChange={(incomes) => setBudget((b) => ({ ...b, incomes }))} addLabel={t.addIncome} t={t} />
        <LineEditor title={t.expensesTitle} lines={budget.expenses} onChange={(expenses) => setBudget((b) => ({ ...b, expenses }))} addLabel={t.addExpense} t={t} />
      </div>
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <div className="rounded-card border border-line bg-white p-5">
          <h2 className="font-semibold text-ink">{t.summary}</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{t.incomes}</dt>
              <dd className="font-medium text-ink">{t.euros.format(totalIn)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{t.expenses}</dt>
              <dd className="font-medium text-ink">{t.euros.format(totalOut)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="font-semibold text-ink">{t.balance}</dt>
              <dd className={`font-bold ${balance < 0 ? "text-red-700" : "text-accent-700"}`}>{t.euros.format(balance)}</dd>
            </div>
          </dl>
          {balance < 0 && <p className="mt-3 text-sm text-red-700">{t.overspent}</p>}
        </div>
        <Button type="button" variant="secondary" className="w-full" onClick={() => setBudget(defaults)}>
          {t.reset}
        </Button>
        <p className="text-xs leading-relaxed text-muted">{t.privacy}</p>
      </aside>
    </div>
  );
}
