import type { Metadata } from "next";
import { getVisibleGuides } from "@/lib/data/content";
import { GuideView, guideMetadata } from "@/views/GuideView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getVisibleGuides("fr")).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return guideMetadata((await params).slug, "fr");
}

export default async function Page({ params }: Props) {
  return <GuideView slug={(await params).slug} locale="fr" />;
}
