"use client";

import { Button } from "./primitives";

export function PrintButton({ label = "Imprimer / PDF" }: { label?: string }) {
  return (
    <Button type="button" variant="secondary" size="lg" onClick={() => window.print()}>
      <span aria-hidden="true">🖨️</span> {label}
    </Button>
  );
}
