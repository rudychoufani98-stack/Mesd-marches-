import { HowItWorksView, howItWorksMetadata } from "@/views/HowItWorksView";

export const metadata = howItWorksMetadata("en");

export default function Page() {
  return <HowItWorksView locale="en" />;
}
