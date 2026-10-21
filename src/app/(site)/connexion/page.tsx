import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
import { ButtonLink, Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Connexion",
  description: "L'espace client MesDémarches arrive bientôt.",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-lg rounded-card border border-line bg-white p-8 text-center">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <LockKeyhole className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-ink">L&apos;espace client arrive bientôt</h1>
        <p className="mt-3 leading-relaxed text-muted">
          Les comptes personnels ne sont pas encore ouverts. En attendant, votre plan d&apos;action et votre progression sont
          enregistrés directement sur votre appareil, sans création de compte.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <ButtonLink href="/plan-action">Accéder à mon plan d&apos;action</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Nous contacter
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
