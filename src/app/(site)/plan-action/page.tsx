import { PlanView, planMetadata } from "@/views/PlanView";

export const metadata = planMetadata("fr");

export default function Page() {
  return <PlanView locale="fr" />;
}
