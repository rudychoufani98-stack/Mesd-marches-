import { LegalNoticeView, legalNoticeMetadata } from "@/views/LegalNoticeView";

export const metadata = legalNoticeMetadata("fr");

export default function Page() {
  return <LegalNoticeView locale="fr" />;
}
