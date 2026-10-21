import { BudgetView, budgetMetadata } from "@/views/BudgetView";

export const metadata = budgetMetadata("fr");

export default function Page() {
  return <BudgetView locale="fr" />;
}
