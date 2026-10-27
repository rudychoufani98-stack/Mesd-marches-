import Link from "next/link";
import { href, type Locale } from "@/i18n";

/** Date de dernière modification des pages légales, dans chaque langue. */
export const legalUpdatedAt: Record<Locale, string> = { fr: "22 octobre 2026", en: "22 October 2026" };

/** Avertissement en tête des pages légales traduites : la version française fait foi. */
export function FrenchVersionPrevails({ path }: { path: string }) {
  return (
    <p className="rounded-card border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
      This English translation is provided for information. In case of discrepancy, the{" "}
      <Link href={href(path, "fr")} hrefLang="fr" className="font-medium text-brand-700 underline">
        French version
      </Link>{" "}
      prevails.
    </p>
  );
}
