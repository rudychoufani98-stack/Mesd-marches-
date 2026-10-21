import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Notaires, banques, courtiers : travaillons ensemble",
  description:
    "MesDémarches prépare les nouveaux arrivants à leurs rendez-vous : dossiers organisés, questions préparées. Un conseil indépendant, sans commission ni apport d'affaires rémunéré.",
  alternates: { canonical: "/professionnels" },
};

const audiences = [
  { emoji: "⚖️", title: "Notaires", text: "Achat immobilier, succession, actes de la vie familiale : des clients qui comprennent les étapes et arrivent avec les bonnes pièces." },
  { emoji: "🏦", title: "Banques", text: "Ouverture de compte, premier rendez-vous : des clients préparés, qui savent quelles questions poser et quels justificatifs apporter." },
  { emoji: "🤝", title: "Courtiers", text: "Des personnes qui comprennent le vocabulaire (TAEG, coût total, assurance) avant de rencontrer un professionnel du crédit." },
  { emoji: "🔑", title: "Agences et propriétaires", text: "Des dossiers de location complets, lisibles et rangés, sans pièce abusive demandée ni oubliée." },
];

const weDo = [
  { emoji: "🗂️", text: "Organiser les documents du client et vérifier qu'il n'en manque pas pour son rendez-vous" },
  { emoji: "📖", text: "Expliquer les étapes et le vocabulaire, à partir des sources officielles" },
  { emoji: "📝", text: "Préparer avec le client la liste de ses questions" },
  { emoji: "🗓️", text: "Construire un calendrier réaliste de ses démarches" },
];

const weDont = [
  { emoji: "🚫", text: "Aucune commission, aucune rétrocession, aucun apport d'affaires rémunéré" },
  { emoji: "🚫", text: "Aucun conseil juridique, fiscal ou en crédit : cela reste votre métier" },
  { emoji: "🚫", text: "Aucune recommandation d'un établissement ou d'un professionnel en particulier" },
  { emoji: "🚫", text: "Aucune transmission des coordonnées d'un client sans son accord exprès" },
];

const steps = [
  { emoji: "👋", title: "Le client vient nous voir", text: "Il nous rémunère directement pour un accompagnement à l'organisation de ses démarches." },
  { emoji: "🧭", title: "Nous préparons ensemble", text: "Documents réunis et classés, étapes expliquées, questions notées." },
  { emoji: "🏛️", title: "Il choisit librement son professionnel", text: "Notaire, banque, courtier : c'est lui qui décide, et vous qui le conseillez." },
];

export default function ProfessionalsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <Container className="py-14 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1 text-sm font-medium text-brand-800">
            <span aria-hidden="true">🤝</span> Espace professionnels
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Des clients mieux préparés, <span className="text-brand-700">sans intermédiaire rémunéré.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            MesDémarches aide les nouveaux arrivants en France à organiser leurs démarches. Quand ils arrivent dans votre étude ou votre
            agence, leurs documents sont prêts et leurs questions sont claires.
          </p>
          <p className="mt-6 inline-flex max-w-2xl items-start gap-3 rounded-card border border-accent-200 bg-white px-4 py-3 text-sm font-medium text-ink">
            <span className="text-lg" aria-hidden="true">✅</span>
            {siteConfig.independence}
          </p>
          <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              <span aria-hidden="true">✉️</span> Échanger avec nous
            </ButtonLink>
            <PrintButton />
          </div>
        </Container>
      </section>

      <Container className="space-y-16 py-14 sm:py-20">
        <section aria-labelledby="pour-qui">
          <h2 id="pour-qui" className="text-2xl font-bold text-ink sm:text-3xl">
            Pour quels professionnels ?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-card border border-line bg-white p-5">
                <span className="text-3xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="fonctionnement">
          <h2 id="fonctionnement" className="text-2xl font-bold text-ink sm:text-3xl">
            Comment ça fonctionne
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="relative rounded-card border border-line bg-white p-6">
                <span className="absolute right-5 top-4 text-4xl font-extrabold text-brand-50" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-3xl" aria-hidden="true">
                  {s.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="perimetre" className="grid gap-6 md:grid-cols-2">
          <h2 id="perimetre" className="sr-only">
            Notre périmètre
          </h2>
          <div className="rounded-card border border-accent-200 bg-accent-50/50 p-6">
            <h3 className="text-lg font-bold text-ink">Ce que nous faisons</h3>
            <ul className="mt-4 space-y-3">
              {weDo.map((w) => (
                <li key={w.text} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden="true">{w.emoji}</span> {w.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-line bg-white p-6">
            <h3 className="text-lg font-bold text-ink">Ce que nous ne faisons jamais</h3>
            <ul className="mt-4 space-y-3">
              {weDont.map((w) => (
                <li key={w.text} className="flex gap-3 text-sm text-ink">
                  <span aria-hidden="true">{w.emoji}</span> {w.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="pourquoi" className="rounded-card bg-brand-900 p-6 text-white sm:p-10">
          <h2 id="pourquoi" className="text-2xl font-bold sm:text-3xl">
            Pourquoi ce choix d&apos;indépendance ? <span aria-hidden="true">🧭</span>
          </h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-brand-100">
            Nos clients doivent pouvoir nous faire confiance : nous ne gagnons rien à les orienter vers l&apos;un ou l&apos;autre. Et vous
            gardez la maîtrise de votre conseil, dans le respect de vos règles professionnelles. Si vous le souhaitez, nous pouvons
            simplement faire connaître vos ressources pédagogiques et vous transmettre des clients qui en font la demande, sans
            contrepartie financière.
          </p>
          <div className="no-print mt-6">
            <ButtonLink href="/contact" variant="secondary">
              Proposer un échange
            </ButtonLink>
          </div>
        </section>

        <p className="text-sm text-muted">
          {siteConfig.disclaimer} Pour en savoir plus sur notre méthode, consultez{" "}
          <Link href="/comment-ca-marche" className="font-medium text-brand-700 underline">
            Comment ça marche
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
