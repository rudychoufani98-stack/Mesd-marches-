import Link from "next/link";
import { AlertTriangle, ArrowRight, BadgeCheck, Clock, ExternalLink } from "lucide-react";
import { getCategory } from "@/content/categories";
import type { Guide } from "@/content/guides";
import { getSources, type SourceId } from "@/content/sources";
import { localizeCategory, localizeSource } from "@/content/translations";
import { getDictionary, href, localeTags, type Locale } from "@/i18n";
import { Badge } from "@/components/ui/primitives";

export function formatDate(iso: string, locale: Locale = "fr"): string {
  return new Intl.DateTimeFormat(localeTags[locale], { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export function VerificationStatus({ lastVerified, locale = "fr" }: { lastVerified: string | null; locale?: Locale }) {
  const t = getDictionary(locale);
  if (lastVerified) {
    return (
      <p className="inline-flex items-center gap-1.5 text-sm text-accent-700">
        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
        {t.common.lastVerified} : {formatDate(lastVerified, locale)}
      </p>
    );
  }
  return (
    <p className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-800">
      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
      {t.site.unverifiedNotice}
    </p>
  );
}

export function GuideCard({ guide, locale = "fr" }: { guide: Guide; locale?: Locale }) {
  const raw = getCategory(guide.category);
  const category = raw ? localizeCategory(raw, locale) : undefined;
  const t = getDictionary(locale);
  return (
    <Link
      href={href(`/guides/${guide.slug}`, locale)}
      className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <Badge>
            <span aria-hidden="true" className="mr-1">
              {category.emoji}
            </span>
            {category.shortTitle}
          </Badge>
        )}
        {guide.status === "draft" && <Badge tone="warning">{t.common.draft}</Badge>}
      </div>
      <h3 className="mt-3 font-semibold leading-snug text-ink group-hover:text-brand-700">{guide.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{guide.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {guide.readingMinutes} {t.common.minRead}
        </span>
        <ArrowRight className="h-4 w-4 text-brand-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}

export function SourceList({ ids, compact = false, locale = "fr" }: { ids: readonly SourceId[]; compact?: boolean; locale?: Locale }) {
  const sources = getSources(ids).map((s) => localizeSource(s, locale));
  const t = getDictionary(locale);
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
              <span className="sr-only"> {t.common.newTab}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
