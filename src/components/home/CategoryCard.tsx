import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/content/categories";

export function CategoryCard({ category, href }: { category: Category; href: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(22,32,58,0.08)]"
    >
      <span
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 text-2xl transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      >
        {category.emoji}
      </span>
      <h3 className="mt-4 font-semibold text-ink">{category.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
