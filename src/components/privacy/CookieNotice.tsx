"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary, href, localeFromPath } from "@/i18n";
import { Cookie } from "lucide-react";
import { readLocal, writeLocal } from "@/lib/storage";
import { Button } from "@/components/ui/primitives";

/**
 * Bandeau d'information sur les cookies.
 * Le site ne dépose aucun cookie publicitaire ni de mesure d'audience : aucun consentement n'est
 * donc requis, mais les visiteurs sont informés. La fermeture est mémorisée dans le stockage local
 * (pas dans un cookie).
 *
 * Si un traceur soumis à consentement est ajouté un jour (mesure d'audience, publicité…),
 * ce bandeau devra être remplacé par un vrai recueil du consentement (Accepter / Refuser / Personnaliser),
 * avec un refus aussi simple que l'acceptation.
 */
const NOTICE_VERSION = "2026-10-21";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const locale = localeFromPath(usePathname());
  const t = getDictionary(locale).cookieNotice;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du stockage local après le montage
    setVisible(readLocal<string | null>("info-cookies", null) !== NOTICE_VERSION);
  }, []);

  if (!visible) return null;

  return (
    <div role="region" aria-label={t.region} className="no-print fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-card border border-line bg-white p-4 shadow-[0_8px_30px_rgba(22,32,58,0.15)] sm:flex-row sm:items-center">
        <Cookie className="hidden h-6 w-6 shrink-0 text-brand-700 sm:block" aria-hidden="true" />
        <p className="flex-1 text-sm leading-relaxed text-ink">
          <strong>{t.title}</strong> {t.text}{" "}
          <Link href={href("/cookies", locale)} className="font-medium text-brand-700 underline">
            {t.more}
          </Link>
        </p>
        <Button
          type="button"
          onClick={() => {
            writeLocal("info-cookies", NOTICE_VERSION);
            setVisible(false);
          }}
          className="shrink-0"
        >
          {t.ok}
        </Button>
      </div>
    </div>
  );
}
