import type { Metadata } from "next";
import { getCatalog } from "@/lib/data/catalog";
import { CategoryView, categoryMetadata } from "@/views/ServicesView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCatalog("fr")).categories.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return categoryMetadata((await params).slug, "fr");
}

export default async function Page({ params }: Props) {
  return <CategoryView slug={(await params).slug} locale="fr" />;
}
