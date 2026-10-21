import type { Metadata } from "next";
import Link from "next/link";
import { ClearLocalDataButton } from "@/components/privacy/ClearLocalDataButton";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Cookies et stockage local",
  description: "MesDémarches n'utilise ni cookie publicitaire ni mesure d'audience. Détail des informations enregistrées sur votre appareil.",
  alternates: { canonical: "/cookies" },
};

const items = [
  {
    name: "Plan d'action et progression",
    where: "Stockage local de votre navigateur",
    purpose: "Retrouver votre plan et les tâches cochées lors de votre prochaine visite.",
    duration: "Jusqu'à ce que vous l'effaciez",
    consent: "Non requis : nécessaire au service que vous utilisez",
  },
  {
    name: "Checklists des guides et budget",
    where: "Stockage local de votre navigateur",
    purpose: "Conserver vos cases cochées et vos montants.",
    duration: "Jusqu'à ce que vous l'effaciez",
    consent: "Non requis : nécessaire au service que vous utilisez",
  },
  {
    name: "Information sur les cookies",
    where: "Stockage local de votre navigateur",
    purpose: "Ne plus afficher le bandeau d'information une fois lu.",
    duration: "Jusqu'à ce que vous l'effaciez",
    consent: "Non requis",
  },
  {
    name: "Session de l'espace administrateur",
    where: "Cookie, uniquement sur /admin",
    purpose: "Maintenir la connexion de l'équipe MesDémarches. Jamais déposé aux visiteurs du site.",
    duration: "Durée de la session",
    consent: "Non requis : strictement nécessaire",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Transparence"
        title="Cookies et stockage local"
        description="Nous n'utilisons ni cookie publicitaire, ni mesure d'audience, ni traceur de réseaux sociaux. Voici tout ce qui est enregistré sur votre appareil."
      />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="overflow-hidden rounded-card border border-line bg-white">
            <ul className="divide-y divide-line">
              {items.map((i) => (
                <li key={i.name} className="p-5">
                  <h2 className="font-semibold text-ink">{i.name}</h2>
                  <dl className="mt-2 grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[140px_1fr]">
                    <dt className="text-muted">Où</dt>
                    <dd className="text-ink">{i.where}</dd>
                    <dt className="text-muted">À quoi ça sert</dt>
                    <dd className="text-ink">{i.purpose}</dd>
                    <dt className="text-muted">Durée</dt>
                    <dd className="text-ink">{i.duration}</dd>
                    <dt className="text-muted">Consentement</dt>
                    <dd className="text-ink">{i.consent}</dd>
                  </dl>
                </li>
              ))}
            </ul>
          </div>

          <section className="rounded-card border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-lg font-bold text-ink">Tout effacer</h2>
            <p className="mt-2 text-sm text-muted">
              Vous pouvez supprimer à tout moment les données enregistrées par MesDémarches sur cet appareil. Vous pouvez aussi le
              faire depuis les réglages de votre navigateur.
            </p>
            <div className="mt-4">
              <ClearLocalDataButton />
            </div>
          </section>

          <p className="text-sm leading-relaxed text-muted">
            Si nous ajoutons un jour un outil soumis à votre accord (par exemple une mesure d&apos;audience), nous vous le demanderons
            avant tout dépôt, avec un bouton « Refuser » aussi simple que « Accepter », et cette page sera mise à jour. Pour vos autres
            droits, consultez la page{" "}
            <Link href="/mes-donnees" className="font-medium text-brand-700 underline">
              Mes données personnelles
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
