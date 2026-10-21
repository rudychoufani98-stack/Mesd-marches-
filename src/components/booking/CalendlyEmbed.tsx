/**
 * Agenda Calendly intégré (simple iframe, sans script tiers sur le site).
 * Le nom et l'e-mail du client sont pré-remplis ; la référence du paiement est transmise en utm_content
 * pour retrouver le rendez-vous dans Calendly.
 */
export function calendlyUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com") ? url.toString() : null;
  } catch {
    return null;
  }
}

export function CalendlyEmbed({ name, email, reference, title }: { name?: string | null; email?: string | null; reference?: string; title: string }) {
  const base = calendlyUrl();
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("embed_type", "Inline");
  if (name) url.searchParams.set("name", name);
  if (email) url.searchParams.set("email", email);
  if (reference) url.searchParams.set("utm_content", reference);
  return (
    <iframe
      src={url.toString()}
      title={title}
      className="h-[720px] w-full rounded-[1.25rem] border border-line bg-white"
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
