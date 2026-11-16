import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "onDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";
const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-[0_10px_24px_-12px_rgba(28,58,122,0.7)] hover:bg-brand-800",
  secondary: "border border-line bg-white text-brand-800 hover:border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
  gold: "bg-gold-300 text-brand-950 shadow-[0_10px_28px_-12px_rgba(207,167,94,0.9)] hover:bg-gold-200",
  onDark: "border border-white/25 text-white hover:border-white/40 hover:bg-white/10",
};
const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
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
  return <div className={`rounded-card border border-line bg-white p-6 shadow-[0_1px_2px_rgba(22,32,58,0.04)] ${className}`}>{children}</div>;
}

export function Badge({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "accent" | "warning" | "neutral";
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-700",
    accent: "bg-accent-50 text-accent-700",
    warning: "bg-amber-50 text-amber-800",
    neutral: "bg-surface text-muted",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
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
      {eyebrow && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-gold-300" : "text-accent-700"}`}>{eyebrow}</p>
      )}
      <Tag
        className={`font-display font-medium leading-[1.08] tracking-tight ${dark ? "text-white" : "text-ink"} ${
          Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Tag>
      {description && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100/85" : "text-muted"}`}>{description}</p>}
    </div>
  );
}

/** En-tête standard des pages intérieures. */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-brand-950 text-white">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
      <Container className="relative py-14 sm:py-20">
        <SectionHeading as="h1" tone="dark" eyebrow={eyebrow} title={title} description={description} />
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
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`} role="note">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}
