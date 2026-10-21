import { ProfessionalsView, professionalsMetadata } from "@/views/ProfessionalsView";

export const metadata = professionalsMetadata("en");

export default function Page() {
  return <ProfessionalsView locale="en" />;
}
