"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { href, localeFromPath, stripLocale } from "@/i18n";

/** Pages où la barre gênerait le parcours (réservation, paiement, connexion). */
const HIDDEN = ["/rendez-vous", "/payer", "/paiement", "/connexion"];

/**
 * Barre d'action fixée en bas de l'écran sur mobile : l'appel gratuit reste toujours à portée de pouce.
 * Masquée sur ordinateur et pendant la réservation.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  if (HIDDEN.some((p) => stripLocale(pathname).startsWith(p))) return null;
  const en = locale === "en";
  return (
    <>
      {/* Espace réservé pour que la barre ne masque pas le bas de page. */}
      <div aria-hidden="true" className="h-20 bg-brand-950 lg:hidden" />
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <Link
            href={href("/services", locale)}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[3px] border border-brand-950/25 text-sm font-semibold text-brand-950"
          >
            {en ? "Services" : "Nos services"}
          </Link>
          <Link
            href={`${href("/rendez-vous", locale)}?mode=appel`}
            className="inline-flex min-h-12 flex-[1.4] items-center justify-center gap-2 rounded-[3px] bg-brand-950 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {en ? "Free call" : "Appel gratuit"}
          </Link>
        </div>
      </div>
    </>
  );
}
