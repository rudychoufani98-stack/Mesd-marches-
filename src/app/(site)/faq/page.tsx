import { FaqView, faqMetadata } from "@/views/FaqView";

export const metadata = faqMetadata("fr");

export default async function Page() {
  return <FaqView locale="fr" />;
}
