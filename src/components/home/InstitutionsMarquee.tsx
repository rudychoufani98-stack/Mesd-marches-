import type { Locale } from "@/i18n";

/**
 * Bandeau défilant des organismes et sites officiels que nos clients doivent utiliser.
 * Texte seulement (pas de logos : ce sont des marques de l'État et des organismes).
 */
const institutions: { name: string; fr: string; en: string }[] = [
  { name: "ANEF", fr: "titres de séjour", en: "residence permits" },
  { name: "impots.gouv", fr: "impôts", en: "taxes" },
  { name: "ameli", fr: "Assurance Maladie", en: "health insurance" },
  { name: "CAF", fr: "aides au logement", en: "housing aid" },
  { name: "Préfecture", fr: "séjour, nationalité", en: "residence, nationality" },
  { name: "ANTS", fr: "permis de conduire", en: "driving licence" },
  { name: "France Travail", fr: "emploi", en: "jobs" },
  { name: "FranceConnect", fr: "connexion unique", en: "single sign-on" },
  { name: "Service-Public.fr", fr: "infos officielles", en: "official info" },
  { name: "OFII", fr: "accueil des étrangers", en: "newcomer integration" },
  { name: "Banque de France", fr: "droit au compte", en: "right to an account" },
  { name: "DossierFacile", fr: "dossier de location", en: "rental file" },
  { name: "Visale", fr: "garantie de loyer", en: "rent guarantee" },
  { name: "URSSAF", fr: "cotisations", en: "contributions" },
  { name: "Mairie", fr: "état civil", en: "civil records" },
];

const copy = {
  fr: {
    title: "Nous vous guidons auprès de",
  },
  en: {
    title: "We guide you through",
  },
};

function Item({ i, locale }: { i: (typeof institutions)[number]; locale: Locale }) {
  return (
    <li className="inline-flex shrink-0 items-baseline gap-2 px-6 text-sm">
      <span className="font-display text-lg font-medium text-ink">{i.name}</span>
      <span className="text-xs uppercase tracking-wider text-muted">{i[locale]}</span>
    </li>
  );
}

export function InstitutionsMarquee({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section aria-labelledby="organismes" className="border-b border-line bg-white py-10">
      <h2 id="organismes" className="px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {c.title}
      </h2>
      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <ul className="flex shrink-0 pr-0 motion-reduce:flex-wrap motion-reduce:justify-center">
            {institutions.map((i) => (
              <Item key={i.name} i={i} locale={locale} />
            ))}
          </ul>
          {/* Copie pour une boucle sans à-coup, ignorée par les lecteurs d'écran. */}
          <ul className="flex shrink-0 pr-0 motion-reduce:hidden" aria-hidden="true">
            {institutions.map((i) => (
              <Item key={i.name} i={i} locale={locale} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
