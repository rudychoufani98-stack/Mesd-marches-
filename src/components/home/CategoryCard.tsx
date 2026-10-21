import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/content/categories";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

export function CategoryCard({ category, href }: { category: Category; href: string }) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_8px_24px_rgba(22,32,58,0.07)]"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
        <CategoryIcon name={category.icon} />
      </span>
      <h3 className="mt-4 font-semibold text-ink">{category.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{category.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
        Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
