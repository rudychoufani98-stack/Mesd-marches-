import { GuidesView, guidesMetadata } from "@/views/GuidesView";

export const metadata = guidesMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <GuidesView locale="fr" searchParams={searchParams} />;
}
