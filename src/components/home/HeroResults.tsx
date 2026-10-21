import type { Locale } from "@/i18n";

/** Visuel du héros : les résultats qu'on aide à obtenir, sous forme de cartes cochées (illustration). */
const copy = {
  fr: {
    label: "Exemple de démarches réglées",
    items: [
      { emoji: "🏦", text: "Compte bancaire ouvert" },
      { emoji: "🏠", text: "Dossier de location envoyé" },
      { emoji: "🩺", text: "Carte Vitale demandée" },
      { emoji: "💶", text: "Aide CAF demandée" },
      { emoji: "🧾", text: "Impôts déclarés" },
    ],
    footer: "Tout est en ordre 🎉",
  },
  en: {
    label: "Example of procedures sorted",
    items: [
      { emoji: "🏦", text: "Bank account opened" },
      { emoji: "🏠", text: "Rental file sent" },
      { emoji: "🩺", text: "Carte Vitale requested" },
      { emoji: "💶", text: "CAF housing aid requested" },
      { emoji: "🧾", text: "Tax return filed" },
    ],
    footer: "All sorted 🎉",
  },
};

export function HeroResults({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-label={c.label} role="img">
      <div aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-[1.75rem] bg-gradient-to-br from-brand-100 to-accent-100" />
      <div className="relative rounded-[1.75rem] border border-line bg-white p-5 shadow-[0_20px_50px_rgba(22,32,58,0.12)]">
        <ul className="space-y-2.5">
          {c.items.map((item, i) => (
            <li
              key={item.text}
              className="flex animate-fade-up items-center gap-3 rounded-2xl bg-surface px-3 py-3"
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="flex-1 text-sm font-semibold text-ink">{item.text}</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">✓</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 rounded-2xl bg-brand-900 px-4 py-3 text-center text-sm font-semibold text-white">{c.footer}</p>
      </div>
    </div>
  );
}
