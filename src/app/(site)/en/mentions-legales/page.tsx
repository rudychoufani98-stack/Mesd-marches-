import { LegalNoticeView, legalNoticeMetadata } from "@/views/LegalNoticeView";

export const metadata = legalNoticeMetadata("en");

export default function Page() {
  return <LegalNoticeView locale="en" />;
}
