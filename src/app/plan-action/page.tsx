import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PlanBuilder } from "@/components/plan/PlanBuilder";
import { Container, PageHeader } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Créer mon plan d'action",
  description:
    "Répondez à 5 questions et obtenez un plan d'action organisé pour vos démarches en France : tâches, documents à préparer et sources officielles.",
  alternates: { canonical: "/plan-action" },
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan d'action gratuit"
        title="Organisez vos démarches en 5 questions"
        description="Décrivez votre situation en quelques clics et obtenez une liste de tâches dans un ordre logique, avec les documents à préparer et les liens officiels."
      >
        <p className="mt-5 inline-flex items-start gap-2 text-sm text-muted">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
          Aucun document ni numéro personnel n&apos;est demandé. Vos réponses restent sur votre appareil.
        </p>
      </PageHeader>
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <PlanBuilder />
        </div>
      </Container>
    </>
  );
}
