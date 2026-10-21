import { GuidesView, guidesMetadata } from "@/views/GuidesView";

export const metadata = guidesMetadata("en");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <GuidesView locale="en" searchParams={searchParams} />;
}
