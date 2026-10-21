import type { ReactNode } from "react";
import { Container, Notice, PageHeader } from "./primitives";

/**
 * Gabarit des pages légales. Ces pages sont des BROUILLONS : les mentions entre crochets
 * doivent être complétées et l'ensemble relu par un professionnel du droit avant mise en ligne commerciale.
 */
export function LegalDraft({ title, description, updatedAt, children }: { title: string; description: string; updatedAt: string; children: ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title={title} description={description} />
      <Container className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <Notice title="Document provisoire">
            Cette page est un brouillon en cours de validation. Les éléments entre crochets restent à compléter et le texte
            doit être vérifié par un professionnel avant toute commercialisation. Dernière modification : {updatedAt}.
          </Notice>
          <div className="mt-8 space-y-8 text-[0.95rem] leading-relaxed text-ink [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-2 [&_p]:text-muted [&_ul]:mt-2 [&_ul]:space-y-1 [&_ul]:text-muted">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-amber-100 px-1 text-amber-900">[{children}]</mark>;
}
