import { ServicesView, servicesMetadata } from "@/views/ServicesView";

export const metadata = servicesMetadata("en");

export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ServicesView locale="en" searchParams={searchParams} />;
}
