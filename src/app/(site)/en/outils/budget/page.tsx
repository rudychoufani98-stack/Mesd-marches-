import { BudgetView, budgetMetadata } from "@/views/BudgetView";

export const metadata = budgetMetadata("en");

export default function Page() {
  return <BudgetView locale="en" />;
}
