"use client";

import { usePathname } from "next/navigation";
import { getDictionary, localeFromPath } from "@/i18n";

export function SkipLink() {
  const t = getDictionary(localeFromPath(usePathname()));
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow"
    >
      {t.common.skipToContent}
    </a>
  );
}
