import type { Locale } from "@/i18n";

/**
 * Pour chaque démarche vendue : l'objectif (ce que la personne veut obtenir)
 * et pourquoi c'est important, en une phrase. Affiché sur l'accueil et la page Tarifs.
 */
type Goal = { goal: string; why: string };

const goals: Record<string, Record<Locale, Goal>> = {
  "d-titre-sejour": {
    fr: { goal: "Obtenir ou renouveler votre titre de séjour", why: "Rendez-vous introuvables, dossiers incomplets, délais : un retard peut fragiliser votre séjour." },
    en: { goal: "Get or renew your residence permit", why: "Impossible appointments, incomplete files, deadlines: a delay can put your stay at risk." },
  },
  "d-naturalisation": {
    fr: { goal: "Devenir français·e", why: "Un dossier lourd, des mois d'attente : chaque pièce manquante peut tout retarder." },
    en: { goal: "Become a French citizen", why: "A heavy file, months of waiting: every missing document can delay everything." },
  },
  "d-traductions": {
    fr: { goal: "Faire traduire vos documents officiels", why: "Actes de naissance, diplômes, permis : la plupart des dossiers exigent une traduction assermentée." },
    en: { goal: "Get your official documents translated", why: "Birth certificates, diplomas, licences: most files require a sworn translation." },
  },
  "d-creation-entreprise": {
    fr: { goal: "Lancer votre activité en France", why: "Statut, immatriculation, URSSAF : bien démarrer évite des erreurs coûteuses." },
    en: { goal: "Launch your business in France", why: "Status, registration, URSSAF: starting right avoids costly mistakes." },
  },
  "d-diplome": {
    fr: { goal: "Faire valoir votre diplôme", why: "Les employeurs et certaines professions exigent une reconnaissance officielle de votre diplôme étranger." },
    en: { goal: "Make your diploma count", why: "Employers and some professions require official recognition of your foreign diploma." },
  },
  "d-compte-bancaire": {
    fr: { goal: "Ouvrir votre compte bancaire", why: "Sans compte, pas de salaire, pas de loyer prélevé, pas de remboursements ni d'aides." },
    en: { goal: "Open your bank account", why: "Without one, you can't get paid, pay rent, or receive refunds and benefits." },
  },
  "d-dossier-location": {
    fr: { goal: "Décrocher votre logement", why: "Les propriétaires reçoivent des dizaines de dossiers : un dossier complet et clair fait la différence." },
    en: { goal: "Land your flat", why: "Landlords get dozens of applications: a complete, clear file makes the difference." },
  },
  "d-aide-logement": {
    fr: { goal: "Demander votre aide au logement", why: "La CAF peut alléger votre loyer chaque mois, encore faut-il faire la demande correctement." },
    en: { goal: "Apply for housing aid", why: "The CAF can lower your rent every month, as long as you apply correctly." },
  },
  "d-emmenagement": {
    fr: { goal: "Emménager sans rien oublier", why: "Électricité, internet, assurance habitation, changement d'adresse : un oubli peut coûter cher." },
    en: { goal: "Move in without forgetting anything", why: "Electricity, internet, home insurance, change of address: one missed step can be costly." },
  },
  "d-assurance-maladie": {
    fr: { goal: "Être couvert·e par la Sécurité sociale", why: "Sans affiliation ni carte Vitale, vos frais de santé ne sont pas remboursés." },
    en: { goal: "Get covered by French health insurance", why: "Without registration and a carte Vitale, your medical costs aren't reimbursed." },
  },
  "d-permis": {
    fr: { goal: "Échanger votre permis étranger", why: "Certains permis étrangers doivent être échangés dans un délai précis : après, il peut être trop tard." },
    en: { goal: "Exchange your foreign licence", why: "Some foreign licences must be exchanged within a set time: miss it and it may be too late." },
  },
  "d-emploi": {
    fr: { goal: "Démarrer votre emploi sereinement", why: "Les bons documents pour l'employeur, et une fiche de paie que vous comprenez enfin." },
    en: { goal: "Start your job with peace of mind", why: "The right documents for your employer, and a payslip you finally understand." },
  },
  "d-impots": {
    fr: { goal: "Déclarer vos revenus sans erreur", why: "Un oubli peut entraîner des pénalités, et l'avis d'impôt est demandé pour beaucoup d'aides." },
    en: { goal: "File your tax return correctly", why: "Mistakes can mean penalties, and your tax notice is needed for many benefits." },
  },
  "d-comptes-en-ligne": {
    fr: { goal: "Avoir tous vos accès en ligne, en sécurité", why: "Presque tout se fait en ligne en France, et les faux sites sont nombreux." },
    en: { goal: "Get all your online accounts, safely", why: "Almost everything is online in France, and fake websites are everywhere." },
  },
};

export function getDemarcheGoal(offerId: string, locale: Locale): Goal | undefined {
  return goals[offerId]?.[locale];
}
