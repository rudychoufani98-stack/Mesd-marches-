import type { Metadata } from "next";
import Link from "next/link";
import { Download, Eraser, FileText, PenLine, ShieldOff } from "lucide-react";
import { REQUEST_RETENTION_MONTHS } from "@/config/privacy";
import { ContactForm } from "@/components/forms/ContactForm";
import { ClearLocalDataButton } from "@/components/privacy/ClearLocalDataButton";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Mes données personnelles",
  description: "Comment accéder à vos données, les corriger ou les faire supprimer, et effacer les données enregistrées sur votre appareil.",
  alternates: { canonical: "/mes-donnees" },
};

const rights = [
  { icon: FileText, title: "Accès", text: "Savoir quelles données nous détenons sur vous et en obtenir une copie." },
  { icon: PenLine, title: "Rectification", text: "Faire corriger une information inexacte." },
  { icon: Eraser, title: "Effacement", text: "Faire supprimer vos données." },
  { icon: Download, title: "Portabilité", text: "Recevoir vos données dans un format lisible par une machine." },
  { icon: ShieldOff, title: "Opposition et limitation", text: "Vous opposer à un traitement ou en demander la limitation." },
];

export default function MyDataPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vos droits"
        title="Mes données personnelles"
        description="Vous gardez la main sur vos informations. Voici ce que nous conservons et comment exercer vos droits."
      />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="ce-que-nous-gardons">
            <h2 id="ce-que-nous-gardons" className="text-xl font-bold text-ink">
              Ce que nous conservons
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-ink">Si vous nous avez écrit ou demandé un rendez-vous</strong> : votre nom, votre e-mail, votre
                message et la date de votre accord. Ces informations sont supprimées automatiquement au bout de{" "}
                {REQUEST_RETENTION_MONTHS} mois.
              </li>
              <li>
                <strong className="text-ink">Votre plan d&apos;action, vos checklists et votre budget</strong> : ils restent uniquement dans
                votre navigateur. Nous n&apos;y avons pas accès. Vous pouvez les effacer ci-dessous.
              </li>
              <li>
                <strong className="text-ink">Rien d&apos;autre</strong> : pas de cookie publicitaire, pas de mesure d&apos;audience, pas de
                revente de données.{" "}
                <Link href="/cookies" className="font-medium text-brand-700 underline">
                  En savoir plus sur les cookies
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="vos-droits">
            <h2 id="vos-droits" className="text-xl font-bold text-ink">
              Vos droits
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {rights.map((r) => (
                <li key={r.title} className="flex gap-3 rounded-card border border-line bg-white p-4">
                  <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-ink">{r.title}</span>
                    <span className="block text-sm text-muted">{r.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Envoyez votre demande avec le formulaire ci-contre, <strong className="text-ink">depuis l&apos;adresse e-mail utilisée</strong>{" "}
              lors de votre demande initiale : cela nous permet de vérifier qu&apos;elle vient bien de vous. Nous répondons dans un délai
              d&apos;un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr).
            </p>
          </section>

          <section aria-labelledby="cet-appareil" className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <h2 id="cet-appareil" className="text-lg font-bold text-ink">
              Données enregistrées sur cet appareil
            </h2>
            <p className="mt-2 text-sm text-muted">
              Plan d&apos;action, progression des checklists, budget et préférences d&apos;affichage. Ces données ne quittent jamais votre
              navigateur.
            </p>
            <div className="mt-4">
              <ClearLocalDataButton />
            </div>
          </section>

          <p className="text-sm text-muted">
            Pour le détail complet, consultez notre{" "}
            <Link href="/confidentialite" className="font-medium text-brand-700 underline">
              politique de confidentialité
            </Link>
            .
          </p>
        </div>

        <aside aria-labelledby="formulaire-droits">
          <h2 id="formulaire-droits" className="mb-4 text-lg font-bold text-ink">
            Faire une demande
          </h2>
          <ContactForm defaultSubject="donnees" />
        </aside>
      </Container>
    </>
  );
}
