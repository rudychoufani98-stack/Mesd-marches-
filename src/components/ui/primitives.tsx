import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-sm hover:bg-brand-800",
  secondary: "border border-line bg-white text-brand-800 hover:border-brand-300 hover:bg-brand-50",
  ghost: "text-brand-700 hover:bg-brand-50",
};
const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
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
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-600">{eyebrow}</p>}
      <Tag className={`font-bold tracking-tight text-ink ${Tag === "h1" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
        {title}
      </Tag>
      {description && <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}

/** En-tête standard des pages intérieures. */
export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-line bg-surface">
      <Container className="py-12 sm:py-16">
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
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`} role="note">
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}
