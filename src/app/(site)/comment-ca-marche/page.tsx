import { HowItWorksView, howItWorksMetadata } from "@/views/HowItWorksView";

export const metadata = howItWorksMetadata("fr");

export default function Page() {
  return <HowItWorksView locale="fr" />;
}
