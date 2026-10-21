import Link from "next/link";
import { AlertTriangle, ArrowRight, BadgeCheck, Clock, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/content/categories";
import type { Guide } from "@/content/guides";
import { getSources, type SourceId } from "@/content/sources";
import { Badge } from "@/components/ui/primitives";

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function VerificationStatus({ lastVerified }: { lastVerified: string | null }) {
  if (lastVerified) {
    return (
      <p className="inline-flex items-center gap-1.5 text-sm text-accent-700">
        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
        Dernière vérification : {formatDate(lastVerified)}
      </p>
    );
  }
  return (
    <p className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800">
      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
      {siteConfig.unverifiedNotice}
    </p>
  );
}

export function GuideCard({ guide }: { guide: Guide }) {
  const category = getCategory(guide.category);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        {category && <Badge>{category.shortTitle}</Badge>}
        {guide.status === "draft" && <Badge tone="warning">Brouillon</Badge>}
      </div>
      <h3 className="mt-3 font-semibold leading-snug text-ink group-hover:text-brand-700">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{guide.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {guide.readingMinutes} min de lecture
        </span>
        <ArrowRight className="h-4 w-4 text-brand-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function SourceList({ ids, compact = false }: { ids: readonly SourceId[]; compact?: boolean }) {
  const sources = getSources(ids);
  return (
    <ul className={compact ? "space-y-2" : "grid gap-3 sm:grid-cols-2"}>
      {sources.map((s) => (
        <li key={s.id}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-line bg-white p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
          >
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold text-ink group-hover:text-brand-700">{s.name}</span>
              {!compact && <span className="block text-xs leading-relaxed text-muted">{s.label}</span>}
              <span className="sr-only"> (ouvre un nouvel onglet)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
