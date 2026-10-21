/**
 * Drapeaux dessinés en SVG : les emojis drapeaux ne s'affichent pas sous Windows
 * (on y voit seulement les lettres « GB » ou « FR »).
 */
export function Flag({ country, className = "h-3.5 w-5" }: { country: "gb" | "fr"; className?: string }) {
  if (country === "fr") {
    return (
      <svg viewBox="0 0 3 2" className={`${className} rounded-[2px] ring-1 ring-black/10`} aria-hidden="true" focusable="false">
        <rect width="1" height="2" x="0" fill="#002654" />
        <rect width="1" height="2" x="1" fill="#ffffff" />
        <rect width="1" height="2" x="2" fill="#ce1126" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className={`${className} rounded-[2px] ring-1 ring-black/10`} aria-hidden="true" focusable="false">
      <clipPath id="flag-gb-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="flag-gb-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#flag-gb-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#flag-gb-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
