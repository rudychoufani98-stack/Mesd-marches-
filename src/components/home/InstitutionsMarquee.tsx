import type { Locale } from "@/i18n";

/**
 * Bandeau défilant des organismes et sites officiels que nos clients doivent utiliser.
 * Texte seulement (pas de logos : ce sont des marques de l'État et des organismes).
 */
const institutions: { emoji: string; name: string; fr: string; en: string }[] = [
  { emoji: "🛂", name: "ANEF", fr: "titres de séjour", en: "residence permits" },
  { emoji: "🧾", name: "impots.gouv", fr: "impôts", en: "taxes" },
  { emoji: "🩺", name: "ameli", fr: "Assurance Maladie", en: "health insurance" },
  { emoji: "🏠", name: "CAF", fr: "aides au logement", en: "housing aid" },
  { emoji: "🏛️", name: "Préfecture", fr: "séjour, nationalité", en: "residence, nationality" },
  { emoji: "🚗", name: "ANTS", fr: "permis de conduire", en: "driving licence" },
  { emoji: "💼", name: "France Travail", fr: "emploi", en: "jobs" },
  { emoji: "🔑", name: "FranceConnect", fr: "connexion unique", en: "single sign-on" },
  { emoji: "📘", name: "Service-Public.fr", fr: "infos officielles", en: "official info" },
  { emoji: "🧳", name: "OFII", fr: "accueil des étrangers", en: "newcomer integration" },
  { emoji: "🏦", name: "Banque de France", fr: "droit au compte", en: "right to an account" },
  { emoji: "📂", name: "DossierFacile", fr: "dossier de location", en: "rental file" },
  { emoji: "🛡️", name: "Visale", fr: "garantie de loyer", en: "rent guarantee" },
  { emoji: "🧮", name: "URSSAF", fr: "cotisations", en: "contributions" },
  { emoji: "🏫", name: "Mairie", fr: "école, état civil", en: "school, civil records" },
];

const copy = {
  fr: {
    title: "Tous ces sites et organismes vous perdent ? On vous montre comment les utiliser.",
    note: "MesDémarches est un service privé, indépendant de ces organismes.",
  },
  en: {
    title: "Lost among all these websites and offices? We show you how to use them.",
    note: "MesDémarches is a private service, independent of these organisations.",
  },
};

function Item({ i, locale }: { i: (typeof institutions)[number]; locale: Locale }) {
  return (
    <li className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm shadow-sm">
      <span aria-hidden="true">{i.emoji}</span>
      <span className="font-semibold text-ink">{i.name}</span>
      <span className="text-muted">· {i[locale]}</span>
    </li>
  );
}

export function InstitutionsMarquee({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section aria-labelledby="organismes" className="border-y border-line bg-surface py-8">
      <h2 id="organismes" className="px-4 text-center text-sm font-semibold text-ink sm:text-base">
        {c.title}
      </h2>
      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <ul className="flex shrink-0 gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center">
            {institutions.map((i) => (
              <Item key={i.name} i={i} locale={locale} />
            ))}
          </ul>
          {/* Copie pour une boucle sans à-coup, ignorée par les lecteurs d'écran. */}
          <ul className="flex shrink-0 gap-3 pr-3 motion-reduce:hidden" aria-hidden="true">
            {institutions.map((i) => (
              <Item key={i.name} i={i} locale={locale} />
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 px-4 text-center text-xs text-muted">{c.note}</p>
    </section>
  );
}
