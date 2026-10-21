import type { Metadata } from "next";
import { getActiveDomains } from "@/lib/data/content";
import { ServiceDomainView, serviceDomainMetadata } from "@/views/ServiceDomainView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getActiveDomains("en")).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return serviceDomainMetadata((await params).slug, "en");
}

export default async function Page({ params }: Props) {
  return <ServiceDomainView slug={(await params).slug} locale="en" />;
}
