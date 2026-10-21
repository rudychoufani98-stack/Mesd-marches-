import { FaqView, faqMetadata } from "@/views/FaqView";

export const metadata = faqMetadata("en");

export default async function Page() {
  return <FaqView locale="en" />;
}
