import { ImageResponse } from "next/og";

/**
 * Image de partage (Google, WhatsApp, LinkedIn, Facebook…) aux couleurs de MesDémarches.
 * Générée automatiquement : aucune image à gérer à la main.
 */
export const ogSize = { width: 1200, height: 630 };

export function ogImage({ eyebrow, title, subtitle, badge }: { eyebrow: string; title: string; subtitle: string; badge?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0b1630 0%, #12244b 60%, #1c3a7a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#1c3a7a" />
            <path d="M11 28 L19 20.5 L29 13" fill="none" stroke="#85a4dc" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="11" cy="28" r="3.4" fill="#ffffff" />
            <circle cx="19" cy="20.5" r="3.4" fill="#ffffff" />
            <circle cx="29" cy="13" r="4.2" fill="#6dd0b9" />
          </svg>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700 }}>
            <span>Mes</span>
            <span style={{ color: "#e2c387" }}>Démarches</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#e2c387", fontWeight: 700 }}>{eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#d9e3f5", maxWidth: 980 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#b4c8eb" }}>mesdemarches · FR / EN</div>
          {badge && (
            <div style={{ display: "flex", padding: "14px 30px", borderRadius: 999, background: "#e2c387", color: "#0b1630", fontSize: 28, fontWeight: 700 }}>
              {badge}
            </div>
          )}
        </div>
      </div>
    ),
    ogSize,
  );
}
