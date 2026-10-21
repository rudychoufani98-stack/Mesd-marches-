import { TermsView, termsMetadata } from "@/views/TermsView";

export const metadata = termsMetadata("fr");

export default async function Page() {
  return <TermsView locale="fr" />;
}
