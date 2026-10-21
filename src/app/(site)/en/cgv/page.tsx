import { TermsView, termsMetadata } from "@/views/TermsView";

export const metadata = termsMetadata("en");

export default async function Page() {
  return <TermsView locale="en" />;
}
