import Link from "next/link";

/**
 * Symbole MesDémarches : un cheminement de trois étapes reliées, la dernière en couleur d'accent.
 * Forme originale, volontairement simple pour rester lisible en petite taille.
 */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" className="fill-brand-700" />
      <path
        d="M11 28 L19 20.5 L29 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-300"
      />
      <circle cx="11" cy="28" r="3.4" className="fill-white" />
      <circle cx="19" cy="20.5" r="3.4" className="fill-white" />
      <circle cx="29" cy="13" r="4.2" className="fill-accent-300" />
      <path
        d="M27.2 13.1 L28.5 14.4 L30.9 11.9"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand-800"
      />
    </svg>
  );
}

export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="MesDémarches, retour à l'accueil">
      <LogoMark />
      <span className="text-[1.2rem] font-semibold tracking-tight text-ink">
        Mes<span className="font-extrabold text-brand-700">Démarches</span>
      </span>
    </Link>
  );
}
