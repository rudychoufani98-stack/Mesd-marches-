import type { Metadata } from "next";
import { getVisibleGuides } from "@/lib/data/content";
import { PrivateGuideView, privateGuideMetadata } from "@/views/GuideView";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Guide réservé aux clients : accessible uniquement avec le lien client (?cle=…). */
export const metadata: Metadata = privateGuideMetadata("en");

export async function generateStaticParams() {
  return (await getVisibleGuides("en")).map((g) => ({ slug: g.slug }));
}

export default function Page({ params, searchParams }: Props) {
  return <PrivateGuideView params={params} searchParams={searchParams} locale="en" />;
}
