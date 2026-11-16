import { defaultCategories, formatCategoryPrice, localizeCategory } from "@/config/catalog";
import { getCategorySeo } from "@/config/catalog-seo";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "MesDémarches";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return defaultCategories.map((c) => ({ slug: c.id }));
}

/** Image de partage d'une catégorie : nom, accroche et prix. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const raw = defaultCategories.find((c) => c.id === slug) ?? defaultCategories[0];
  const category = localizeCategory(raw, "fr");
  return ogImage({
    eyebrow: "MesDémarches · Accompagnement",
    title: category.name,
    subtitle: getCategorySeo(category.id, "fr")?.lead ?? category.description,
    badge: formatCategoryPrice(category, "fr"),
  });
}
