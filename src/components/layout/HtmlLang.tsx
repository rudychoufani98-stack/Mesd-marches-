"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath } from "@/i18n";

/**
 * Déclare la bonne langue sur toute la page (<html lang>) : « en » sous /en, « fr » ailleurs.
 * Utile aux lecteurs d'écran et aux moteurs de recherche, y compris quand on change de langue sans recharger.
 */
export function HtmlLang() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);
  return null;
}
