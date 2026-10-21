"use client";

import type { Locale } from "@/i18n";
import { Button } from "./primitives";

const defaultLabel: Record<Locale, string> = { fr: "Imprimer / PDF", en: "Print / PDF" };

export function PrintButton({ label, locale = "fr" }: { label?: string; locale?: Locale }) {
  return (
    <Button type="button" variant="secondary" size="lg" onClick={() => window.print()}>
      <span aria-hidden="true">🖨️</span> {label ?? defaultLabel[locale]}
    </Button>
  );
}
