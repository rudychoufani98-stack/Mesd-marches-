import {
  Briefcase,
  Car,
  FileCheck2,
  Flag,
  GraduationCap,
  HeartPulse,
  Home,
  KeyRound,
  Landmark,
  Languages,
  type LucideIcon,
  Receipt,
  Rocket,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import type { Locale } from "@/i18n";

/** Bandeau défilant des domaines où nous accompagnons nos clients (icône + nom du service). */
const services: { icon: LucideIcon; fr: string; en: string }[] = [
  { icon: FileCheck2, fr: "Titre de séjour", en: "Residence permit" },
  { icon: Flag, fr: "Naturalisation", en: "Naturalisation" },
  { icon: Receipt, fr: "Impôts", en: "Taxes" },
  { icon: HeartPulse, fr: "Assurance Maladie", en: "Health insurance" },
  { icon: Home, fr: "Aides au logement", en: "Housing aid" },
  { icon: Car, fr: "Permis de conduire", en: "Driving licence" },
  { icon: KeyRound, fr: "Location", en: "Renting" },
  { icon: Landmark, fr: "Compte bancaire", en: "Bank account" },
  { icon: Briefcase, fr: "Emploi", en: "Employment" },
  { icon: Rocket, fr: "Création d'entreprise", en: "Business creation" },
  { icon: GraduationCap, fr: "Diplômes", en: "Diplomas" },
  { icon: Languages, fr: "Traductions", en: "Translations" },
  { icon: ScrollText, fr: "État civil", en: "Civil records" },
  { icon: ShieldCheck, fr: "Démarches en ligne", en: "Online procedures" },
];

const copy = {
  fr: { title: "Nous vous accompagnons pour" },
  en: { title: "We support you with" },
};

function Item({ s, locale }: { s: (typeof services)[number]; locale: Locale }) {
  const Icon = s.icon;
  return (
    <li className="inline-flex shrink-0 items-center gap-3 px-7">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 text-brand-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-medium text-ink">{s[locale]}</span>
    </li>
  );
}

export function InstitutionsMarquee({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section aria-labelledby="domaines" className="border-b border-line bg-white py-10">
      <h2 id="domaines" className="px-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {c.title}
      </h2>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
          <ul className="flex shrink-0 motion-reduce:flex-wrap motion-reduce:justify-center">
            {services.map((s) => (
              <Item key={s.fr} s={s} locale={locale} />
            ))}
          </ul>
          {/* Copie pour une boucle sans à-coup, ignorée par les lecteurs d'écran. */}
          <ul className="flex shrink-0 motion-reduce:hidden" aria-hidden="true">
            {services.map((s) => (
              <Item key={s.fr} s={s} locale={locale} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
