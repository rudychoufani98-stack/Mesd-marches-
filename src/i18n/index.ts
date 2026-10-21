import { fr, type Dictionary } from "./fr";

/**
 * Préparation multilingue : la V1 est en français uniquement.
 * Pour ajouter l'anglais ou l'arabe : créer `en.ts` / `ar.ts` avec le même type `Dictionary`,
 * les ajouter ici, puis introduire un segment de route `[locale]`.
 * Pour l'arabe, penser à `dir="rtl"` sur l'élément <html>.
 */
export const locales = ["fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeDirection: Record<Locale, "ltr" | "rtl"> = { fr: "ltr" };

const dictionaries: Record<Locale, Dictionary> = { fr };

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
