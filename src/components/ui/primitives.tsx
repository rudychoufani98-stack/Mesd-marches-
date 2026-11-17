import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "onDark";
type Size = "md" | "lg";

/** Boutons sobres : angles nets, pas d'ombre ni d'effet de soulèvement. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold tracking-[0.01em] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-brand-950 text-white hover:bg-brand-800",
  secondary: "border border-brand-950/25 bg-transparent text-brand-950 hover:border-brand-950 hover:bg-white",
  ghost: "text-brand-900 hover:bg-surface",
  light: "bg-white text-brand-950 hover:bg-brand-50",
  onDark: "border border-white/30 text-white hover:border-white/70 hover:bg-white/5",
};
const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 py-2 text-sm",
  lg: "min-h-12 px-7 py-2.5 text-[15px]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link {...props} className={buttonClasses(variant, size, className)} />;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button {...props} className={buttonClasses(variant, size, className)} />;
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card border border-line bg-white p-6 ${className}`}>{children}</div>;
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "accent" | "warning" | "neutral";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-800",
    accent: "bg-accent-50 text-accent-700",
    warning: "bg-amber-50 text-amber-800",
    neutral: "bg-surface text-muted",
  };
  return <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className={`mb-4 text-sm font-medium ${dark ? "text-brand-200" : "text-brand-700"}`}>{eyebrow}</p>}
      <Tag
        className={`font-display font-semibold leading-[1.08] tracking-[-0.02em] ${dark ? "text-white" : "text-ink"} ${
          Tag === "h1" ? "text-[2.1rem] sm:text-[2.6rem]" : "text-[1.7rem] sm:text-[2.1rem]"
        }`}
      >
        {title}
      </Tag>
      {description && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100/85" : "text-muted"}`}>{description}</p>}
    </div>
  );
}

/** En-tête des pages intérieures : bandeau gris clair, grand titre, filet de séparation. */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-14 sm:py-20">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        {children}
      </Container>
    </div>
  );
}

export function Notice({ children, tone = "warning", title }: { children: ReactNode; tone?: "warning" | "info"; title?: string }) {
  const styles =
    tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-brand-100 bg-brand-50 text-brand-900";
  return (
    <div className={`rounded-md border px-4 py-3 text-sm leading-relaxed ${styles}`} role="note">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}

/** Questions fréquentes : liste à filets, sans encadré (accueil, catégories). */
export function FaqList({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={`border-t border-ink/15 ${className}`}>
      {items.map((f) => (
        <details key={f.q} className="group border-b border-ink/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-ink [&::-webkit-details-marker]:hidden">
            <h3 className="text-[17px] font-medium leading-snug">{f.q}</h3>
            <span aria-hidden="true" className="mt-0.5 font-display text-xl leading-none text-ink/50 transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
