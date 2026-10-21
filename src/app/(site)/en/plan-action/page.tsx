import { PlanView, planMetadata } from "@/views/PlanView";

export const metadata = planMetadata("en");

export default function Page() {
  return <PlanView locale="en" />;
}
