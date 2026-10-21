/**
 * Illustration originale : une checklist, un calendrier et des dossiers rangés.
 * Aucun élément ne rappelle un document officiel (pas de tampon, de Marianne ni de drapeau).
 */
export function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 400" className="h-auto w-full" role="img" aria-label="Illustration : une checklist, un calendrier et des dossiers bien rangés">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef3fb" />
          <stop offset="1" stopColor="#ecfaf6" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#16203a" floodOpacity="0.08" />
        </filter>
      </defs>

      <circle cx="250" cy="200" r="180" fill="url(#bg)" />

      {/* Dossiers */}
      <g filter="url(#shadow)">
        <rect x="292" y="232" width="150" height="112" rx="14" fill="#a3e4d3" />
        <path d="M292 250 a14 14 0 0 1 14 -14 h38 l12 12 h72 a14 14 0 0 1 14 14 v82 a14 14 0 0 1 -14 14 h-122 a14 14 0 0 1 -14 -14z" fill="#3fb79d" />
        <rect x="312" y="272" width="60" height="8" rx="4" fill="#ecfaf6" />
        <rect x="312" y="288" width="92" height="8" rx="4" fill="#d0f2e8" opacity="0.8" />
      </g>

      {/* Calendrier */}
      <g filter="url(#shadow)">
        <rect x="288" y="62" width="150" height="146" rx="16" fill="#ffffff" />
        <rect x="288" y="62" width="150" height="38" rx="16" fill="#1c3a7a" />
        <rect x="288" y="84" width="150" height="16" fill="#1c3a7a" />
        <rect x="318" y="52" width="8" height="22" rx="4" fill="#557cc9" />
        <rect x="400" y="52" width="8" height="22" rx="4" fill="#557cc9" />
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const highlighted = i === 6;
          return (
            <rect
              key={i}
              x={304 + col * 32}
              y={114 + row * 28}
              width="22"
              height="18"
              rx="5"
              fill={highlighted ? "#3fb79d" : "#eef3fb"}
            />
          );
        })}
      </g>

      {/* Checklist */}
      <g filter="url(#shadow)">
        <rect x="44" y="86" width="226" height="250" rx="20" fill="#ffffff" />
        <rect x="68" y="112" width="110" height="12" rx="6" fill="#1c3a7a" />
        <rect x="68" y="132" width="70" height="8" rx="4" fill="#b4c8eb" />
        {[0, 1, 2, 3].map((i) => {
          const y = 166 + i * 40;
          const done = i < 2;
          return (
            <g key={i}>
              <rect x="68" y={y} width="22" height="22" rx="7" fill={done ? "#3fb79d" : "#ffffff"} stroke={done ? "#3fb79d" : "#b4c8eb"} strokeWidth="2" />
              {done && <path d={`M73 ${y + 11} l4.5 4.5 l8 -8.5`} stroke="#ffffff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
              <rect x="102" y={y + 4} width={i % 2 ? 110 : 140} height="8" rx="4" fill={done ? "#d9e3f5" : "#b4c8eb"} />
              <rect x="102" y={y + 15} width={i % 2 ? 70 : 90} height="5" rx="2.5" fill="#eef3fb" />
            </g>
          );
        })}
        <rect x="68" y="320" width="178" height="6" rx="3" fill="#eef3fb" />
        <rect x="68" y="320" width="89" height="6" rx="3" fill="#3fb79d" />
      </g>

      {/* Chemin d'étapes */}
      <path d="M210 360 C 250 380, 300 372, 330 356" stroke="#85a4dc" strokeWidth="3" fill="none" strokeDasharray="2 9" strokeLinecap="round" />
      <circle cx="210" cy="360" r="6" fill="#345cb3" />
    </svg>
  );
}
