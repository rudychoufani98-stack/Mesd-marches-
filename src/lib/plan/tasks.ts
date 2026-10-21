import type { CategoryId } from "@/content/categories";
import type { SourceId } from "@/content/sources";

/**
 * Bibliothèque des tâches validées pour le plan d'action.
 * Le moteur de règles ne peut proposer QUE des tâches de cette liste : aucun texte n'est généré.
 *
 * - `phase` : 1 = fondations (conditionnent la suite), 2 = mise en place, 3 = consolidation.
 * - `order` : ordre au sein d'une phase (plus petit = plus tôt), choisi pour respecter
 *   les dépendances courantes (ex. justificatif d'adresse avant ouverture de compte).
 * - `deadline` : uniquement une échéance vérifiée dans une source officielle. Aucune pour l'instant.
 */
export type VerifiedDeadline = {
  label: string;
  sourceId: SourceId;
  verifiedOn: string;
};

export type PlanTask = {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  phase: 1 | 2 | 3;
  order: number;
  documents: string[];
  sourceIds: SourceId[];
  guideSlug?: string;
  toolHref?: string;
  deadline: VerifiedDeadline | null;
};

export const taskLibrary: PlanTask[] = [
  // Installation
  {
    id: "inst-documents",
    title: "Rassembler et copier vos documents personnels",
    description:
      "Réunissez vos documents d'identité et d'état civil, rangez les originaux en lieu sûr et faites des copies numériques lisibles.",
    category: "installation",
    phase: 1,
    order: 10,
    documents: ["Pièce d'identité", "Documents d'état civil"],
    sourceIds: ["sp-papiers"],
    guideSlug: "premieres-demarches-installation",
    deadline: null,
  },
  {
    id: "etu-sites",
    title: "Consulter les sites de référence pour les étudiants",
    description:
      "Campus France et Étudiant.gouv rassemblent l'information officielle sur les études et la vie étudiante.",
    category: "installation",
    phase: 1,
    order: 12,
    documents: [],
    sourceIds: ["campus-france", "etudiant"],
    deadline: null,
  },
  {
    id: "inst-sejour-info",
    title: "Vérifier les démarches liées à votre séjour, si vous êtes concerné·e",
    description:
      "Selon votre nationalité et votre situation, des démarches liées au séjour peuvent s'appliquer. Seul le portail officiel fait foi.",
    category: "installation",
    phase: 1,
    order: 15,
    documents: [],
    sourceIds: ["anef", "sp-etranger"],
    deadline: null,
  },
  {
    id: "inst-adresse",
    title: "Identifier votre justificatif d'adresse",
    description:
      "Bail, attestation d'hébergement, facture… Déterminez quel justificatif vous pourrez fournir : il sera demandé pour de nombreuses démarches.",
    category: "installation",
    phase: 1,
    order: 20,
    documents: ["Bail, attestation d'hébergement ou facture récente"],
    sourceIds: ["service-public"],
    guideSlug: "premieres-demarches-installation",
    deadline: null,
  },
  {
    id: "inst-permis",
    title: "Si vous avez un permis de conduire étranger : vérifier s'il doit être échangé",
    description:
      "Selon le pays qui l'a délivré et votre situation, un échange peut être nécessaire dans un délai fixé par la réglementation. Consultez la fiche officielle dès votre arrivée.",
    category: "installation",
    phase: 2,
    order: 47,
    documents: ["Permis de conduire étranger", "Pièce d'identité", "Justificatif de domicile"],
    sourceIds: ["sp-permis-echange", "sp-permis-court-sejour"],
    guideSlug: "permis-de-conduire-etranger",
    deadline: null,
  },
  {
    id: "inst-france-services",
    title: "Repérer l'espace France services le plus proche",
    description:
      "Les espaces France services proposent un accompagnement public et gratuit pour de nombreuses démarches.",
    category: "installation",
    phase: 2,
    order: 50,
    documents: [],
    sourceIds: ["france-services"],
    deadline: null,
  },
  // Logement
  {
    id: "log-dossier",
    title: "Constituer votre dossier de location",
    description:
      "Préparez des copies lisibles des justificatifs habituellement demandés. Un dossier numérique peut être créé sur DossierFacile.",
    category: "logement",
    phase: 1,
    order: 30,
    documents: ["Pièce d'identité", "Justificatif de domicile actuel", "Justificatif d'activité", "Justificatifs de ressources"],
    sourceIds: ["sp-logement", "dossierfacile"],
    guideSlug: "preparer-dossier-locatif",
    deadline: null,
  },
  {
    id: "log-garantie",
    title: "Étudier les solutions de garantie locative",
    description: "Personne se portant caution ou dispositif de garantie : vérifiez les options possibles dans votre cas.",
    category: "logement",
    phase: 1,
    order: 35,
    documents: [],
    sourceIds: ["visale"],
    guideSlug: "preparer-dossier-locatif",
    deadline: null,
  },
  {
    id: "log-assurance",
    title: "Comparer et souscrire une assurance habitation",
    description: "Le bail peut exiger une attestation d'assurance. Comparez les garanties avant de choisir.",
    category: "logement",
    phase: 2,
    order: 40,
    documents: ["Bail ou adresse du logement"],
    sourceIds: ["sp-logement"],
    guideSlug: "checklist-demenagement",
    deadline: null,
  },
  {
    id: "log-aides",
    title: "Consulter le simulateur d'aides au logement",
    description: "Selon votre situation, une aide au logement peut exister. Le simulateur de la CAF donne une première indication.",
    category: "logement",
    phase: 2,
    order: 60,
    documents: ["Bail", "Informations sur vos ressources"],
    sourceIds: ["caf"],
    deadline: null,
  },
  // Banque
  {
    id: "bq-compte",
    title: "Préparer l'ouverture d'un compte bancaire",
    description:
      "Comparez les plaquettes tarifaires et préparez les justificatifs. En cas de refus, renseignez-vous sur le droit au compte.",
    category: "banque",
    phase: 1,
    order: 25,
    documents: ["Pièce d'identité", "Justificatif de domicile", "Justificatif de situation"],
    sourceIds: ["banque-france"],
    guideSlug: "comprendre-ouverture-compte-bancaire",
    deadline: null,
  },
  {
    id: "bq-budget",
    title: "Établir un premier budget mensuel",
    description: "Listez vos revenus et vos dépenses fixes pour connaître votre reste à vivre.",
    category: "banque",
    phase: 2,
    order: 70,
    documents: ["Relevés de compte", "Contrats en cours"],
    sourceIds: ["mesquestionsdargent"],
    toolHref: "/outils/budget",
    deadline: null,
  },
  // Travail
  {
    id: "tr-documents",
    title: "Rassembler les documents demandés par votre employeur",
    description: "Pièce d'identité, numéro de sécurité sociale ou attestation, RIB : vérifiez la liste demandée et conservez votre contrat.",
    category: "travail",
    phase: 1,
    order: 28,
    documents: ["Pièce d'identité", "RIB", "Attestation de sécurité sociale si disponible"],
    sourceIds: ["sp-travail"],
    guideSlug: "comprendre-sa-fiche-de-paie",
    deadline: null,
  },
  {
    id: "tr-fiche-paie",
    title: "Relire votre première fiche de paie",
    description: "Repérez le brut, les cotisations, le prélèvement à la source et le net à payer, puis comparez avec votre relevé bancaire.",
    category: "travail",
    phase: 3,
    order: 80,
    documents: ["Fiche de paie", "Relevé bancaire"],
    sourceIds: ["sp-fiche-paie"],
    guideSlug: "comprendre-sa-fiche-de-paie",
    deadline: null,
  },
  {
    id: "tr-classement",
    title: "Créer un dossier pour vos documents professionnels",
    description: "Contrat, fiches de paie, attestations : un dossier dédié, papier et numérique.",
    category: "travail",
    phase: 3,
    order: 85,
    documents: [],
    sourceIds: ["sp-fiche-paie"],
    guideSlug: "organiser-ses-documents-numeriques",
    deadline: null,
  },
  // Santé
  {
    id: "sa-affiliation",
    title: "Consulter les démarches d'affiliation à l'Assurance Maladie",
    description: "Les démarches dépendent de votre situation (salarié, étudiant, autre). ameli.fr présente les cas possibles.",
    category: "sante",
    phase: 1,
    order: 32,
    documents: ["Pièce d'identité", "Justificatif de domicile", "RIB"],
    sourceIds: ["ameli"],
    guideSlug: "s-orienter-protection-sociale",
    deadline: null,
  },
  {
    id: "sa-compte",
    title: "Créer votre compte en ligne Assurance Maladie",
    description: "Lorsque votre situation le permet, le compte en ligne facilite le suivi des remboursements et des démarches.",
    category: "sante",
    phase: 2,
    order: 45,
    documents: [],
    sourceIds: ["ameli"],
    deadline: null,
  },
  {
    id: "sa-complementaire",
    title: "Étudier la question de la complémentaire santé",
    description: "Vérifiez si votre employeur en propose une et renseignez-vous sur les options possibles.",
    category: "sante",
    phase: 2,
    order: 55,
    documents: [],
    sourceIds: ["ameli", "sp-social-sante"],
    guideSlug: "s-orienter-protection-sociale",
    deadline: null,
  },
  // Impôts
  {
    id: "imp-espace",
    title: "Créer votre espace particulier sur impots.gouv.fr",
    description: "Il permet de déclarer en ligne, de consulter vos documents et de gérer le prélèvement à la source.",
    category: "impots",
    phase: 2,
    order: 65,
    documents: [],
    sourceIds: ["impots"],
    guideSlug: "preparer-sa-declaration-de-revenus",
    deadline: null,
  },
  {
    id: "imp-documents",
    title: "Mettre en place un dossier pour les documents fiscaux",
    description: "Fiches de paie, attestations et avis : un dossier par année facilite la déclaration.",
    category: "impots",
    phase: 3,
    order: 90,
    documents: [],
    sourceIds: ["impots"],
    guideSlug: "preparer-sa-declaration-de-revenus",
    deadline: null,
  },
  {
    id: "imp-calendrier",
    title: "Consulter le calendrier officiel de déclaration",
    description: "Les dates changent chaque année : notez celles qui sont publiées par l'administration fiscale.",
    category: "impots",
    phase: 3,
    order: 95,
    documents: [],
    sourceIds: ["sp-declaration-revenus", "impots"],
    deadline: null,
  },
  // Famille
  {
    id: "fam-contrats",
    title: "Mettre en place les contrats d'énergie et d'internet",
    description: "Comparez les offres, vérifiez les durées d'engagement et notez les relevés de compteurs.",
    category: "famille",
    phase: 2,
    order: 42,
    documents: ["Adresse du logement", "RIB"],
    sourceIds: ["energie-info"],
    guideSlug: "checklist-demenagement",
    deadline: null,
  },
  {
    id: "fam-ecole",
    title: "Vous renseigner sur l'inscription scolaire",
    description: "Service Public explique les démarches d'inscription selon l'âge de l'enfant et le type d'établissement.",
    category: "famille",
    phase: 2,
    order: 52,
    documents: ["Justificatif de domicile", "Documents d'état civil de l'enfant"],
    sourceIds: ["sp-famille"],
    deadline: null,
  },
  {
    id: "fam-adresse",
    title: "Signaler votre changement d'adresse",
    description: "Prévenez les organismes concernés. Service Public recense les démarches en ligne disponibles.",
    category: "famille",
    phase: 3,
    order: 75,
    documents: [],
    sourceIds: ["sp-demenagement"],
    guideSlug: "checklist-demenagement",
    deadline: null,
  },
  // Numérique
  {
    id: "num-favoris",
    title: "Enregistrer les sites officiels dans vos favoris",
    description: "Accédez toujours aux démarches depuis vos favoris plutôt que depuis un lien reçu par message.",
    category: "numerique",
    phase: 1,
    order: 5,
    documents: [],
    sourceIds: ["service-public", "cybermalveillance"],
    guideSlug: "eviter-les-arnaques-administratives",
    deadline: null,
  },
  {
    id: "num-securite",
    title: "Sécuriser vos comptes en ligne",
    description: "Mots de passe uniques, double authentification lorsqu'elle est proposée.",
    category: "numerique",
    phase: 2,
    order: 48,
    documents: [],
    sourceIds: ["cybermalveillance"],
    guideSlug: "organiser-ses-documents-numeriques",
    deadline: null,
  },
  {
    id: "num-classement",
    title: "Organiser vos documents numériques",
    description: "Une arborescence simple, des noms de fichiers datés et une sauvegarde.",
    category: "numerique",
    phase: 2,
    order: 58,
    documents: [],
    sourceIds: ["cnil"],
    guideSlug: "organiser-ses-documents-numeriques",
    deadline: null,
  },
];

export function getTask(id: string): PlanTask {
  const task = taskLibrary.find((t) => t.id === id);
  if (!task) throw new Error(`Tâche inconnue : ${id}`);
  return task;
}
