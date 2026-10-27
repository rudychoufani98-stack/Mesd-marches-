import { Check } from "lucide-react";
import type { Locale } from "@/i18n";

/**
 * Description d'un service : 1re ligne = la promesse, lignes suivantes = ce que le client obtient.
 * (Format saisi dans l'admin : une idée par ligne.)
 * `compact` n'utilise que des <span> : affichable à l'intérieur d'un bouton.
 */
export function ServiceDescription({ text, locale, compact = false }: { text: string; locale: Locale; compact?: boolean }) {
  const [promise, ...gains] = text
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*•]\s*/, "").trim())
    .filter(Boolean);
  if (!promise) return null;
  const label = locale === "en" ? "You leave with" : "Vous repartez avec";

  if (compact) {
    return (
      <span className="mt-1.5 block">
        <span className="block text-sm leading-relaxed text-ink">{promise}</span>
        {gains.map((g) => (
          <span key={g} className="mt-1 flex gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
            {g}
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className="mt-3">
      <p className="text-[0.95rem] font-medium leading-relaxed text-ink">{promise}</p>
      {gains.length > 0 && (
        <>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
          <ul className="mt-1.5 space-y-1.5">
            {gains.map((g) => (
              <li key={g} className="flex gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
                {g}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
