"use client";

import { Printer } from "lucide-react";
import type { Locale } from "@/i18n";
import { Button } from "./primitives";

const defaultLabel: Record<Locale, string> = { fr: "Imprimer / PDF", en: "Print / PDF" };

export function PrintButton({ label, locale = "fr" }: { label?: string; locale?: Locale }) {
  return (
    <Button type="button" variant="secondary" size="lg" onClick={() => window.print()}>
      <Printer className="h-4 w-4" aria-hidden="true" /> {label ?? defaultLabel[locale]}
    </Button>
  );
}
