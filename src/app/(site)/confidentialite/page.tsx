import { PrivacyView, privacyMetadata } from "@/views/PrivacyView";

export const metadata = privacyMetadata("fr");

export default function Page() {
  return <PrivacyView locale="fr" />;
}
