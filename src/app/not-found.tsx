import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Container className="py-20 text-center sm:py-28">
          <p className="text-sm font-medium text-brand-700">Erreur 404</p>
          <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-tight text-ink">Cette page est introuvable</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
          <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
            <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
            <ButtonLink href="/rendez-vous?mode=appel" variant="secondary">
              Réserver un appel offert
            </ButtonLink>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
