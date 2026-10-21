import type { CategoryId } from "../categories";
import type { CategoryText } from "../translations";

export const categoriesEn: Record<CategoryId, CategoryText> = {
  installation: {
    title: "Settling in France",
    shortTitle: "Settling in",
    description: "Prioritise your first administrative steps and organise your documents from the day you arrive.",
  },
  logement: {
    title: "Housing",
    shortTitle: "Housing",
    description: "Prepare a rental application, understand the steps and move in smoothly.",
  },
  banque: {
    title: "Banking and budget",
    shortTitle: "Banking",
    description: "Understand how to open an account and the banking vocabulary.",
  },
  travail: {
    title: "Work and salary",
    shortTitle: "Work",
    description: "Organise your hiring documents and learn to read your payslip (fiche de paie).",
  },
  sante: {
    title: "Health and social protection",
    shortTitle: "Health",
    description: "Find the official websites and prepare the usual documents.",
  },
  impots: {
    title: "Taxes and financial organisation",
    shortTitle: "Taxes & budget",
    description: "Keep a budget and gather the documents useful for a tax return.",
  },
  famille: {
    title: "Family and daily life",
    shortTitle: "Family",
    description: "School, moving house, everyday contracts and scam prevention.",
  },
  numerique: {
    title: "Online procedures",
    shortTitle: "Digital",
    description: "Identify the official portals and secure your online accounts.",
  },
};
