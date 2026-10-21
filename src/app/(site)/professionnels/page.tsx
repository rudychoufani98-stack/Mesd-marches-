import { ProfessionalsView, professionalsMetadata } from "@/views/ProfessionalsView";

export const metadata = professionalsMetadata("fr");

export default function Page() {
  return <ProfessionalsView locale="fr" />;
}
