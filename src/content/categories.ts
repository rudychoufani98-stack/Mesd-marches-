export type CategoryId =
  | "installation"
  | "logement"
  | "banque"
  | "travail"
  | "sante"
  | "impots"
  | "famille"
  | "numerique";

/** Nom d'icône lucide-react (réservé à un usage futur ; l'affichage utilise l'emoji). */
export type CategoryIconName =
  | "MapPin"
  | "Home"
  | "Landmark"
  | "Briefcase"
  | "HeartPulse"
  | "Calculator"
  | "Users"
  | "MonitorSmartphone";

export type Category = {
  id: CategoryId;
  title: string;
  shortTitle: string;
  description: string;
  icon: CategoryIconName;
  /** Emoji décoratif (toujours masqué aux lecteurs d'écran). */
  emoji: string;
};

export const categories: Category[] = [
  {
    id: "installation",
    title: "Installation en France",
    shortTitle: "Installation",
    description: "Prioriser les premières démarches et organiser vos documents dès l'arrivée.",
    icon: "MapPin",
    emoji: "🧳",
  },
  {
    id: "logement",
    title: "Logement",
    shortTitle: "Logement",
    description: "Préparer un dossier locatif, comprendre les étapes et réussir l'emménagement.",
    icon: "Home",
    emoji: "🏠",
  },
  {
    id: "banque",
    title: "Banque et budget",
    shortTitle: "Banque",
    description: "Comprendre l'ouverture d'un compte et le vocabulaire bancaire.",
    icon: "Landmark",
    emoji: "🏦",
  },
  {
    id: "travail",
    title: "Travail et salaire",
    shortTitle: "Travail",
    description: "Organiser les documents d'embauche et lire sa fiche de paie.",
    icon: "Briefcase",
    emoji: "💼",
  },
  {
    id: "sante",
    title: "Santé et protection sociale",
    shortTitle: "Santé",
    description: "Repérer les sites officiels et préparer les documents habituels.",
    icon: "HeartPulse",
    emoji: "🩺",
  },
  {
    id: "impots",
    title: "Impôts et organisation financière",
    shortTitle: "Impôts & budget",
    description: "Tenir un budget et rassembler les documents utiles à une déclaration.",
    icon: "Calculator",
    emoji: "🧾",
  },
  {
    id: "famille",
    title: "Famille et vie quotidienne",
    shortTitle: "Famille",
    description: "École, déménagement, contrats du quotidien et prévention des arnaques.",
    icon: "Users",
    emoji: "👨‍👩‍👧",
  },
  {
    id: "numerique",
    title: "Démarches numériques",
    shortTitle: "Numérique",
    description: "Identifier les portails officiels et sécuriser vos comptes en ligne.",
    icon: "MonitorSmartphone",
    emoji: "💻",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((c) => c.id === id);
}
