import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-20 text-center sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-bold text-ink">Cette page est introuvable</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
        <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
        <ButtonLink href="/guides" variant="secondary">
          Voir les guides
        </ButtonLink>
      </div>
    </Container>
  );
}
