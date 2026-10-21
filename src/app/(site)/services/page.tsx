import { ServicesView, servicesMetadata } from "@/views/ServicesView";

export const metadata = servicesMetadata("fr");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ServicesView locale="fr" searchParams={searchParams} />;
}
