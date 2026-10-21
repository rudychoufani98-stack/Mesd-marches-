import { Container } from "./primitives";

/** Squelette affiché pendant le chargement d'une page de détail. */
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Chargement">
      <div className="border-b border-line bg-surface">
        <Container className="space-y-4 py-12 sm:py-16">
          <div className="h-4 w-40 animate-pulse rounded bg-line" />
          <div className="h-9 w-3/4 animate-pulse rounded bg-line" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-line" />
        </Container>
      </div>
      <Container className="py-10">
        <div className="h-64 animate-pulse rounded-card bg-surface" />
      </Container>
    </div>
  );
}
