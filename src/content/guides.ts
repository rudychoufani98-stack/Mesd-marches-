import type { CategoryId } from "./categories";
import type { SourceId } from "./sources";

/**
 * Bibliothèque de guides pratiques.
 *
 * Règles éditoriales :
 * - Contenus généraux et pédagogiques, jamais d'obligation individuelle, de droit ou de date limite inventés.
 * - Chaque guide cite uniquement des sources du registre `sources.ts`.
 * - `lastVerified` reste à `null` tant qu'une personne n'a pas relu le guide en le comparant
 *   aux sources officielles. Dans ce cas, l'avertissement « Information à vérifier… » est affiché.
 * - Seuls les guides `published` sont visibles en production.
 * - Une fois Supabase configuré, les guides se gèrent dans l'espace admin (/admin/guides) ;
 *   cette liste sert alors de contenu initial et de secours.
 */
export type GuideStatus = "draft" | "published";

export type GuideStep = { title: string; body: string };
export type ChecklistItem = { id: string; label: string };
export type GlossaryEntry = { term: string; definition: string };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: CategoryId;
  readingMinutes: number;
  intro: string;
  steps: GuideStep[];
  checklist: ChecklistItem[];
  glossary?: GlossaryEntry[];
  sourceIds: SourceId[];
  /** Date ISO (AAAA-MM-JJ) de la dernière relecture humaine face aux sources, ou null. */
  lastVerified: string | null;
  status: GuideStatus;
  /** Date ISO de la dernière modification du contenu. */
  updatedAt: string;
};

export const defaultGuides: Guide[] = [
  {
    slug: "premieres-demarches-installation",
    title: "Les premières démarches lors d'une installation en France",
    description:
      "Une vue d'ensemble pour organiser vos premières semaines : adresse, compte bancaire, protection sociale, documents.",
    category: "installation",
    readingMinutes: 6,
    intro:
      "Lors d'une installation, plusieurs démarches dépendent les unes des autres. Ce guide propose un ordre logique d'organisation. Il ne remplace pas l'information officielle : les démarches exactes dépendent de votre nationalité, de votre statut et de votre situation.",
    steps: [
      {
        title: "Rassembler et sécuriser vos documents personnels",
        body: "Avant toute démarche, réunissez vos documents d'identité, d'état civil et, le cas échéant, les documents liés à votre séjour. Conservez les originaux en lieu sûr et réalisez des copies numériques lisibles.",
      },
      {
        title: "Obtenir un justificatif d'adresse",
        body: "De nombreuses démarches demandent une adresse en France : bail, attestation d'hébergement, facture récente… Selon votre situation, la solution n'est pas la même. Identifiez rapidement quel justificatif vous pourrez fournir.",
      },
      {
        title: "Ouvrir un compte bancaire",
        body: "Un compte bancaire est souvent demandé pour recevoir un salaire ou des remboursements. Renseignez-vous sur les justificatifs demandés par l'établissement choisi. Si vous rencontrez des refus, la Banque de France présente la procédure dite de « droit au compte ».",
      },
      {
        title: "Vous renseigner sur votre protection sociale",
        body: "L'affiliation à l'assurance maladie dépend de votre situation (salarié, étudiant, autre). Consultez le site de l'Assurance Maladie pour connaître les démarches qui vous concernent.",
      },
      {
        title: "Créer vos accès aux services en ligne",
        body: "Beaucoup de démarches se font en ligne. Créez vos comptes uniquement sur les sites officiels et protégez-les avec des mots de passe uniques.",
      },
      {
        title: "Vous faire accompagner gratuitement si besoin",
        body: "Les espaces France services proposent un accompagnement public et gratuit pour de nombreuses démarches. Il en existe dans de nombreuses communes.",
      },
    ],
    checklist: [
      { id: "docs-identite", label: "Documents d'identité réunis et copiés" },
      { id: "justif-adresse", label: "Justificatif d'adresse identifié" },
      { id: "compte-bancaire", label: "Démarche d'ouverture de compte lancée" },
      { id: "protection-sociale", label: "Démarches d'assurance maladie identifiées sur ameli.fr" },
      { id: "comptes-en-ligne", label: "Comptes en ligne créés sur les sites officiels" },
      { id: "france-services", label: "Espace France services le plus proche repéré" },
    ],
    sourceIds: ["service-public", "sp-etranger", "anef", "ameli", "banque-france", "france-services"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "preparer-dossier-locatif",
    title: "Préparer son dossier de location",
    description:
      "Les pièces habituellement demandées, les étapes d'une location et les services publics qui peuvent vous aider.",
    category: "logement",
    readingMinutes: 7,
    intro:
      "Un dossier complet et bien présenté vous fait gagner du temps. La liste des documents qu'un bailleur peut exiger est encadrée par la réglementation : consultez Service Public pour la liste à jour.",
    steps: [
      {
        title: "Préparer les justificatifs habituels",
        body: "Les dossiers comprennent généralement une pièce d'identité, un justificatif de domicile actuel, des justificatifs d'activité professionnelle et de ressources. Préparez des copies lisibles, en format PDF.",
      },
      {
        title: "Anticiper la question de la garantie",
        body: "Beaucoup de bailleurs demandent une garantie (personne qui se porte caution ou dispositif de garantie). Le dispositif Visale, proposé par Action Logement, peut être consulté pour vérifier si vous y êtes éligible.",
      },
      {
        title: "Utiliser un dossier numérique",
        body: "DossierFacile est un service public qui permet de constituer un dossier de location numérique et de le partager avec les propriétaires ou agences.",
      },
      {
        title: "Comprendre les documents de la location",
        body: "Avant de signer, lisez le bail : durée, loyer, charges, dépôt de garantie. À l'entrée, un état des lieux décrit le logement : prenez le temps de le relire et de signaler les défauts constatés.",
      },
      {
        title: "Se méfier des annonces trop belles",
        body: "Ne versez jamais d'argent avant d'avoir visité le logement et signé un bail. Méfiez-vous des demandes de paiement par mandat ou carte prépayée.",
      },
      {
        title: "Vous renseigner sur les aides au logement",
        body: "Selon votre situation, une aide au logement peut exister. La CAF propose un simulateur et l'information officielle à ce sujet.",
      },
    ],
    checklist: [
      { id: "piece-identite", label: "Copie de la pièce d'identité" },
      { id: "justif-domicile", label: "Justificatif de domicile actuel" },
      { id: "justif-activite", label: "Justificatif d'activité (contrat de travail, carte d'étudiant…)" },
      { id: "justif-ressources", label: "Justificatifs de ressources" },
      { id: "garantie", label: "Solution de garantie identifiée" },
      { id: "dossier-numerique", label: "Dossier numérique créé (facultatif)" },
      { id: "etat-des-lieux", label: "État des lieux d'entrée relu et signé" },
    ],
    glossary: [
      { term: "Bail", definition: "Contrat de location signé entre le locataire et le bailleur." },
      {
        term: "Dépôt de garantie",
        definition: "Somme versée à l'entrée dans le logement et restituée à la fin de la location, déduction faite des éventuelles sommes dues.",
      },
      {
        term: "État des lieux",
        definition: "Document qui décrit l'état du logement à l'entrée et à la sortie du locataire.",
      },
      { term: "Charges", definition: "Dépenses liées au logement payées en plus du loyer (entretien des parties communes, eau, etc.)." },
    ],
    sourceIds: ["sp-logement", "dossierfacile", "visale", "caf"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "checklist-demenagement",
    title: "Checklist de déménagement et d'emménagement",
    description:
      "Avant, pendant et après le déménagement : contrats, assurance, changement d'adresse.",
    category: "famille",
    readingMinutes: 5,
    intro:
      "Un déménagement implique de prévenir de nombreux organismes et de mettre en place de nouveaux contrats. Cette checklist vous aide à ne rien oublier.",
    steps: [
      {
        title: "Avant le déménagement",
        body: "Si vous quittez une location, vérifiez le préavis applicable à votre bail sur Service Public. Listez les contrats à résilier ou transférer (énergie, internet, assurance).",
      },
      {
        title: "L'assurance habitation",
        body: "L'assurance habitation couvre notamment les dommages causés au logement. Renseignez-vous sur votre situation : le bail peut exiger une attestation d'assurance. Comparez les garanties proposées avant de choisir.",
      },
      {
        title: "Électricité et gaz",
        body: "À l'arrivée, ouvrez les contrats d'énergie à votre nom. Le site Énergie-Info, du médiateur national de l'énergie, propose une information neutre et un comparateur public.",
      },
      {
        title: "Internet et téléphone",
        body: "Avant de signer, vérifiez la durée d'engagement, les frais de résiliation, le prix après une éventuelle période promotionnelle et les frais de mise en service.",
      },
      {
        title: "Changer d'adresse",
        body: "Service Public propose une rubrique dédiée au déménagement qui recense les organismes à prévenir et les démarches en ligne disponibles.",
      },
    ],
    checklist: [
      { id: "preavis", label: "Préavis de l'ancien logement vérifié" },
      { id: "assurance", label: "Attestation d'assurance habitation obtenue" },
      { id: "energie", label: "Contrats d'électricité et/ou de gaz ouverts" },
      { id: "internet", label: "Offre internet comparée et souscrite" },
      { id: "changement-adresse", label: "Changement d'adresse signalé aux organismes" },
      { id: "releves-compteurs", label: "Relevés de compteurs notés à l'arrivée" },
    ],
    sourceIds: ["sp-demenagement", "sp-logement", "energie-info"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "comprendre-ouverture-compte-bancaire",
    title: "Comprendre l'ouverture d'un compte bancaire",
    description:
      "Étapes habituelles, justificatifs généralement demandés, vocabulaire bancaire et questions à poser à un conseiller.",
    category: "banque",
    readingMinutes: 6,
    intro:
      "Ce guide est pédagogique. Il ne recommande aucune banque ni aucun produit. Les justificatifs exacts dépendent de chaque établissement et de votre situation.",
    steps: [
      {
        title: "Choisir le type d'établissement",
        body: "Il existe des banques avec agences, des banques en ligne et des établissements de paiement. Les services, les frais et les conditions d'ouverture diffèrent : comparez les plaquettes tarifaires.",
      },
      {
        title: "Préparer les justificatifs",
        body: "Sont habituellement demandés : une pièce d'identité en cours de validité, un justificatif de domicile et parfois un justificatif de revenus ou de situation (contrat de travail, carte d'étudiant).",
      },
      {
        title: "En cas de refus",
        body: "Si un établissement refuse l'ouverture d'un compte, la Banque de France présente la procédure de droit au compte. Consultez son site pour connaître les conditions et les démarches.",
      },
      {
        title: "Préparer votre rendez-vous",
        body: "Notez vos questions à l'avance et demandez la plaquette tarifaire. Ne signez rien que vous n'avez pas compris.",
      },
    ],
    checklist: [
      { id: "identite", label: "Pièce d'identité en cours de validité" },
      { id: "domicile", label: "Justificatif de domicile" },
      { id: "situation", label: "Justificatif de situation (contrat, carte d'étudiant…)" },
      { id: "plaquette", label: "Plaquette tarifaire consultée" },
      { id: "questions", label: "Liste de questions préparée" },
    ],
    glossary: [
      { term: "RIB", definition: "Relevé d'identité bancaire : document qui permet à un tiers d'effectuer des virements sur votre compte." },
      { term: "IBAN", definition: "Numéro international d'identification d'un compte bancaire, figurant sur le RIB." },
      { term: "Découvert", definition: "Situation où le solde du compte devient négatif. Il peut être autorisé ou non, et entraîner des frais." },
      { term: "Plaquette tarifaire", definition: "Document qui liste les frais appliqués par l'établissement." },
      { term: "Prélèvement", definition: "Paiement que vous autorisez un créancier à débiter directement sur votre compte." },
    ],
    sourceIds: ["banque-france", "mesquestionsdargent", "sp-argent"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "comprendre-le-cout-d-un-credit",
    title: "Comprendre le coût d'un crédit : TAEG, mensualités, coût total",
    description:
      "Une explication pédagogique pour savoir lire une offre de crédit. Aucune recommandation personnalisée.",
    category: "banque",
    readingMinutes: 5,
    intro:
      "Ce guide explique des notions générales pour lire une offre de crédit. MesDémarches ne recommande aucun crédit. Un crédit engage et doit être remboursé : vérifiez vos capacités de remboursement avant de vous engager.",
    steps: [
      {
        title: "Le TAEG",
        body: "Le taux annuel effectif global exprime, en pourcentage annuel, le coût total du crédit pour l'emprunteur : il intègre les intérêts et les frais liés au crédit. C'est l'indicateur à utiliser pour comparer des offres entre elles.",
      },
      {
        title: "La mensualité",
        body: "C'est la somme remboursée chaque mois. Une mensualité plus faible signifie souvent une durée plus longue… et un coût total plus élevé.",
      },
      {
        title: "Le coût total du crédit",
        body: "C'est la différence entre la somme totale remboursée et le montant emprunté. Par exemple, avec un montant emprunté de 1 000 € et 12 mensualités de 90 €, le total remboursé est de 1 080 € et le coût total est de 80 € (exemple fictif, à but illustratif).",
      },
      {
        title: "Les questions à se poser",
        body: "Quel est le TAEG ? Quel est le coût total ? Y a-t-il une assurance et est-elle obligatoire ? Que se passe-t-il en cas de remboursement anticipé ? Prenez le temps de comparer et de vous renseigner sur les sites publics d'éducation financière.",
      },
    ],
    checklist: [
      { id: "taeg", label: "J'ai repéré le TAEG de chaque offre" },
      { id: "cout-total", label: "J'ai calculé le coût total" },
      { id: "budget", label: "J'ai vérifié que la mensualité entre dans mon budget" },
      { id: "assurance", label: "J'ai compris les conditions d'assurance" },
    ],
    glossary: [
      { term: "TAEG", definition: "Taux annuel effectif global : coût total du crédit exprimé en pourcentage annuel." },
      { term: "Capital emprunté", definition: "Somme prêtée par l'établissement." },
      { term: "Mensualité", definition: "Montant remboursé chaque mois." },
      { term: "Remboursement anticipé", definition: "Remboursement de tout ou partie du crédit avant la date prévue." },
    ],
    sourceIds: ["mesquestionsdargent", "banque-france", "sp-argent"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "comprendre-sa-fiche-de-paie",
    title: "Comprendre sa fiche de paie et organiser ses documents d'embauche",
    description:
      "Les grandes rubriques d'un bulletin de salaire expliquées simplement, et les documents à conserver.",
    category: "travail",
    readingMinutes: 7,
    intro:
      "La fiche de paie (ou bulletin de salaire) détaille votre rémunération et les cotisations. Ce guide présente ses grandes rubriques de façon générale. Pour toute question sur votre situation, adressez-vous à votre employeur ou aux organismes compétents.",
    steps: [
      {
        title: "Les documents liés à l'embauche",
        body: "À l'embauche, l'employeur demande généralement une pièce d'identité, un numéro de sécurité sociale (ou une attestation) et un RIB. Conservez votre contrat de travail et chaque fiche de paie.",
      },
      {
        title: "Le salaire brut",
        body: "C'est la rémunération avant déduction des cotisations sociales salariales. Il comprend le salaire de base et, le cas échéant, les primes et heures supplémentaires.",
      },
      {
        title: "Les cotisations",
        body: "Une partie du salaire brut finance la protection sociale (santé, retraite, chômage…). Les cotisations salariales sont déduites du brut ; des cotisations patronales sont payées en plus par l'employeur.",
      },
      {
        title: "Le net à payer avant impôt et le prélèvement à la source",
        body: "Le net à payer avant impôt correspond au salaire après cotisations. L'impôt sur le revenu est ensuite prélevé à la source selon le taux transmis par l'administration fiscale.",
      },
      {
        title: "Le net à payer",
        body: "C'est la somme réellement versée sur votre compte. Comparez-la à votre relevé bancaire chaque mois.",
      },
      {
        title: "Conserver vos fiches de paie",
        body: "Vos fiches de paie peuvent vous être demandées pour de nombreuses démarches. Service Public précise les règles de conservation : consultez la fiche dédiée.",
      },
    ],
    checklist: [
      { id: "contrat", label: "Contrat de travail signé et conservé" },
      { id: "documents-employeur", label: "Documents demandés par l'employeur transmis" },
      { id: "premiere-fiche", label: "Première fiche de paie relue" },
      { id: "classement", label: "Dossier « Fiches de paie » créé" },
    ],
    glossary: [
      { term: "Salaire brut", definition: "Rémunération avant déduction des cotisations salariales." },
      { term: "Net à payer", definition: "Somme effectivement versée au salarié." },
      { term: "Cotisations sociales", definition: "Prélèvements qui financent la protection sociale." },
      { term: "Prélèvement à la source", definition: "Mode de paiement de l'impôt sur le revenu directement retenu sur le salaire." },
      { term: "Période d'essai", definition: "Période au début du contrat permettant à chaque partie d'évaluer la collaboration." },
    ],
    sourceIds: ["sp-fiche-paie", "sp-travail", "travail-emploi", "urssaf"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "s-orienter-protection-sociale",
    title: "S'orienter dans la protection sociale",
    description:
      "Quel organisme fait quoi ? Une orientation générale vers l'Assurance Maladie, la CAF et les autres sites officiels.",
    category: "sante",
    readingMinutes: 5,
    intro:
      "La protection sociale en France est assurée par plusieurs organismes. Ce guide vous aide à savoir lequel consulter. Il ne détermine pas vos droits : seuls les organismes compétents peuvent le faire.",
    steps: [
      {
        title: "L'Assurance Maladie",
        body: "Elle prend en charge une partie des frais de santé. Le site ameli.fr présente les démarches d'affiliation selon votre situation et permet de créer un compte en ligne.",
      },
      {
        title: "La complémentaire santé",
        body: "Elle peut compléter les remboursements de l'Assurance Maladie. Certains employeurs en proposent une. Renseignez-vous sur ameli.fr et Service Public.",
      },
      {
        title: "La CAF",
        body: "La Caisse d'allocations familiales verse notamment des prestations familiales et des aides au logement, sous conditions. Son site propose des simulateurs.",
      },
      {
        title: "Les documents utiles",
        body: "Préparez généralement une pièce d'identité, un justificatif de domicile, un RIB et, selon votre situation, des justificatifs d'activité ou de ressources.",
      },
    ],
    checklist: [
      { id: "ameli-situation", label: "Démarches d'affiliation consultées sur ameli.fr" },
      { id: "compte-ameli", label: "Compte ameli créé (si possible dans votre situation)" },
      { id: "complementaire", label: "Question de la complémentaire santé étudiée" },
      { id: "caf-simulation", label: "Simulateurs de la CAF consultés si pertinent" },
    ],
    sourceIds: ["ameli", "sp-social-sante", "caf"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "preparer-sa-declaration-de-revenus",
    title: "Préparer les documents pour sa déclaration de revenus",
    description:
      "Rassembler les documents généralement utiles, comprendre le vocabulaire fiscal et trouver les services officiels.",
    category: "impots",
    readingMinutes: 5,
    intro:
      "Ce guide vous aide à vous organiser avant de déclarer. Il ne détermine pas vos obligations fiscales. Les dates de déclaration changent chaque année : consultez toujours le calendrier officiel.",
    steps: [
      {
        title: "Créer votre espace particulier",
        body: "L'espace particulier sur impots.gouv.fr permet de déclarer en ligne, de consulter vos avis et de gérer votre prélèvement à la source.",
      },
      {
        title: "Rassembler les documents",
        body: "Gardez à portée de main les documents de l'année concernée : fiches de paie (notamment celle de décembre), attestations de revenus, justificatifs de frais éventuels.",
      },
      {
        title: "Vérifier le calendrier officiel",
        body: "Les dates limites de déclaration sont publiées chaque année par l'administration fiscale et reprises sur Service Public.",
      },
      {
        title: "Se faire aider",
        body: "En cas de question sur votre situation, contactez l'administration fiscale via votre espace particulier ou rendez-vous dans un espace France services.",
      },
    ],
    checklist: [
      { id: "espace-particulier", label: "Espace particulier créé" },
      { id: "fiches-paie", label: "Fiches de paie de l'année rassemblées" },
      { id: "attestations", label: "Attestations reçues rangées dans un dossier" },
      { id: "calendrier", label: "Calendrier officiel consulté" },
    ],
    glossary: [
      { term: "Foyer fiscal", definition: "Ensemble des personnes figurant sur une même déclaration de revenus." },
      { term: "Avis d'imposition", definition: "Document envoyé par l'administration fiscale après la déclaration." },
      { term: "Taux de prélèvement", definition: "Taux appliqué à vos revenus pour le prélèvement à la source." },
      { term: "Revenu imposable", definition: "Montant des revenus pris en compte pour le calcul de l'impôt." },
    ],
    sourceIds: ["impots", "sp-declaration-revenus", "france-services"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "eviter-les-arnaques-administratives",
    title: "Reconnaître les sites officiels et éviter les arnaques",
    description:
      "Faux sites, messages frauduleux, faux appels : les bons réflexes pour protéger vos démarches.",
    category: "numerique",
    readingMinutes: 5,
    intro:
      "Des sites et messages imitent l'administration pour obtenir de l'argent ou des données personnelles. Quelques réflexes simples permettent de s'en protéger.",
    steps: [
      {
        title: "Vérifier l'adresse du site",
        body: "Les sites de l'administration française utilisent généralement une adresse se terminant par « .gouv.fr », ou celle d'un organisme public connu (ameli.fr, caf.fr…). Méfiez-vous des adresses approchantes.",
      },
      {
        title: "Se méfier des démarches payantes inattendues",
        body: "De nombreuses démarches administratives sont gratuites sur les sites officiels. Un site qui facture une démarche gratuite doit vous alerter.",
      },
      {
        title: "Ne jamais transmettre vos codes",
        body: "Aucun organisme sérieux ne vous demande vos mots de passe ou codes reçus par SMS. MesDémarches ne vous les demandera jamais non plus.",
      },
      {
        title: "En cas de doute",
        body: "Ne cliquez pas sur le lien reçu ; rendez-vous directement sur le site officiel. Cybermalveillance.gouv.fr explique quoi faire en cas d'hameçonnage. Un problème avec une entreprise peut être signalé sur SignalConso.",
      },
    ],
    checklist: [
      { id: "favoris", label: "Sites officiels enregistrés dans mes favoris" },
      { id: "mots-de-passe", label: "Mots de passe uniques pour chaque compte" },
      { id: "double-auth", label: "Double authentification activée quand elle est proposée" },
      { id: "reflexe-lien", label: "Réflexe : ne jamais cliquer sur un lien suspect" },
    ],
    sourceIds: ["cybermalveillance", "cybermalveillance-phishing", "signalconso", "service-public"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "organiser-ses-documents-numeriques",
    title: "Organiser et sécuriser ses documents numériques",
    description:
      "Une méthode simple pour télécharger, nommer, classer et sauvegarder vos justificatifs.",
    category: "numerique",
    readingMinutes: 4,
    intro:
      "Des documents bien rangés vous font gagner du temps à chaque démarche. Voici une méthode simple, à adapter à vos outils.",
    steps: [
      {
        title: "Créer une arborescence simple",
        body: "Par exemple : Identité, Logement, Banque, Travail, Santé, Impôts, Famille. Un dossier par thème, un sous-dossier par année si besoin.",
      },
      {
        title: "Nommer les fichiers de façon cohérente",
        body: "Par exemple : « 2026-09_fiche-paie.pdf » ou « 2026_attestation-assurance-habitation.pdf ». La date en premier permet un tri automatique.",
      },
      {
        title: "Sauvegarder",
        body: "Conservez une copie sur un support distinct (disque externe ou service de stockage sécurisé). Protégez l'accès par un mot de passe robuste.",
      },
      {
        title: "Protéger vos comptes",
        body: "Activez la double authentification lorsqu'elle est proposée et n'utilisez pas le même mot de passe sur plusieurs sites. FranceConnect permet d'accéder à de nombreux services publics avec un compte existant.",
      },
    ],
    checklist: [
      { id: "arborescence", label: "Arborescence de dossiers créée" },
      { id: "nommage", label: "Règle de nommage adoptée" },
      { id: "sauvegarde", label: "Sauvegarde mise en place" },
      { id: "securite", label: "Accès protégés par mot de passe" },
    ],
    sourceIds: ["cybermalveillance", "franceconnect", "cnil"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "permis-de-conduire-etranger",
    title: "Conduire en France avec un permis de conduire étranger",
    description:
      "Permis européen ou non, court séjour ou installation : les questions à se poser et où trouver la démarche officielle d'échange.",
    category: "installation",
    readingMinutes: 5,
    intro:
      "Les règles dépendent du pays qui a délivré votre permis, de votre statut (installation, études, court séjour) et de la date de votre arrivée. Ce guide vous aide à identifier votre cas, puis à suivre la fiche officielle qui s'applique. Il ne détermine pas votre situation : vérifiez toujours sur Service Public.",
    steps: [
      {
        title: "Identifier votre situation",
        body: "Notez le pays qui a délivré votre permis, sa date de validité et votre situation en France (installation durable, études, court séjour). Ces trois éléments déterminent la règle applicable.",
      },
      {
        title: "Permis délivré dans l'Union européenne ou l'Espace économique européen",
        body: "Les permis délivrés dans ces pays obéissent à des règles particulières. Consultez la rubrique Permis de conduire de Service Public pour savoir si un échange est nécessaire dans votre cas.",
      },
      {
        title: "Permis délivré hors UE/EEE et installation en France",
        body: "Lorsque vous vous installez en France, un permis obtenu hors UE/EEE peut devoir être échangé contre un permis français, dans un délai fixé par la réglementation et selon des conditions qui dépendent notamment du pays de délivrance. Ne tardez pas : consultez dès votre arrivée la fiche officielle sur l'échange de permis.",
      },
      {
        title: "Court séjour ou études",
        body: "Des règles spécifiques permettent, sous conditions, de conduire avec votre permis étranger pendant un court séjour ou pendant vos études. Vérifiez-les sur la fiche officielle dédiée.",
      },
      {
        title: "Préparer la démarche en ligne",
        body: "La demande d'échange se fait en ligne, sur le site officiel indiqué par Service Public. Préparez des scans lisibles de vos documents et méfiez-vous des sites qui facturent cette démarche : passez toujours par le lien donné sur Service Public.",
      },
    ],
    checklist: [
      { id: "pays-delivrance", label: "Pays de délivrance et date de validité du permis notés" },
      { id: "situation", label: "Ma situation identifiée (installation, études, court séjour)" },
      { id: "fiche-officielle", label: "Fiche officielle Service Public correspondant à mon cas consultée" },
      { id: "delai", label: "Délai applicable à mon cas noté dans mon calendrier" },
      { id: "documents-scannes", label: "Documents demandés scannés de façon lisible" },
      { id: "site-officiel", label: "Démarche faite uniquement depuis le lien officiel" },
    ],
    glossary: [
      { term: "Échange de permis", definition: "Démarche permettant de remplacer un permis étranger par un permis français, lorsque les conditions sont remplies." },
      { term: "UE/EEE", definition: "Union européenne et Espace économique européen (UE + Islande, Liechtenstein, Norvège)." },
    ],
    sourceIds: ["sp-permis", "sp-permis-echange", "sp-permis-court-sejour"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "demarches-etudiants-internationaux",
    title: "Démarches des étudiants internationaux : premiers repères",
    description:
      "Les sites de référence pour les étudiants étrangers en France. Guide en cours de rédaction.",
    category: "installation",
    readingMinutes: 4,
    intro:
      "Ce guide est en cours de rédaction et sera publié après relecture.",
    steps: [
      {
        title: "Les sites de référence",
        body: "Campus France et Étudiant.gouv rassemblent l'information officielle sur les études et la vie étudiante en France.",
      },
    ],
    checklist: [{ id: "sites-reference", label: "Sites de référence consultés" }],
    sourceIds: ["campus-france", "etudiant"],
    lastVerified: null,
    status: "draft",
    updatedAt: "2026-10-21",
  },
  {
    slug: "comprendre-titre-de-sejour",
    title: "Titre de séjour : comment ça marche, simplement",
    description:
      "Visa long séjour, première carte, renouvellement : les grandes étapes expliquées simplement, et où faire la démarche officielle.",
    category: "installation",
    readingMinutes: 4,
    intro:
      "Le titre de séjour est le document qui vous autorise à vivre en France au-delà d'un court séjour. Ce guide explique le fonctionnement général, en quelques étapes. Il ne remplace ni l'information officielle ni un avocat : chaque situation (études, travail, famille…) a ses propres règles.",
    steps: [
      {
        title: "Visa, titre de séjour : quelle différence ?",
        body: "Le visa vous permet d'entrer en France. Le titre de séjour vous permet d'y rester. Certains visas de long séjour valent titre de séjour pendant leur première année, à condition d'être validés en ligne après votre arrivée.",
      },
      {
        title: "Votre situation décide de tout",
        body: "Études, travail, famille, talent… Le type de titre, les documents à fournir et la durée dépendent du motif de votre séjour. Repérez d'abord votre cas sur Service Public.",
      },
      {
        title: "La démarche se fait (presque toujours) en ligne",
        body: "La plupart des demandes passent par le site officiel ANEF (Administration numérique pour les étrangers en France). Vous y créez votre compte, déposez vos documents scannés et suivez votre dossier.",
      },
      {
        title: "Anticipez le renouvellement",
        body: "Un titre de séjour a une date de fin. Le renouvellement se demande à l'avance, dans les délais indiqués sur le site officiel : notez la date dans votre calendrier dès que vous recevez votre titre.",
      },
      {
        title: "Gardez une preuve à chaque étape",
        body: "Conservez les confirmations de dépôt et les attestations reçues : elles prouvent que votre demande est en cours. Méfiez-vous des sites qui font payer l'accès à la démarche : elle se fait sur le site officiel.",
      },
    ],
    checklist: [
      { id: "motif", label: "Je connais le motif de mon séjour (études, travail, famille…)" },
      { id: "fiche", label: "J'ai lu la fiche Service Public qui correspond à mon cas" },
      { id: "compte-anef", label: "J'ai créé mon compte sur le site officiel ANEF" },
      { id: "scans", label: "Mes documents sont scannés de façon lisible" },
      { id: "date-fin", label: "La date de fin de mon titre est notée dans mon calendrier" },
    ],
    glossary: [
      { term: "ANEF", definition: "Administration numérique pour les étrangers en France : le site officiel des démarches de séjour." },
      { term: "VLS-TS", definition: "Visa de long séjour valant titre de séjour, à valider en ligne après l'arrivée." },
      { term: "Récépissé", definition: "Document qui atteste qu'une demande de titre de séjour est en cours d'examen." },
    ],
    sourceIds: ["sp-titre-sejour", "anef", "sp-etranger"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
  {
    slug: "comprendre-nationalite-francaise",
    title: "Nationalité française : comment ça marche, simplement",
    description:
      "Naturalisation, mariage, naissance en France : les grandes voies pour devenir français·e, expliquées simplement.",
    category: "installation",
    readingMinutes: 4,
    intro:
      "Il existe plusieurs façons de devenir français·e. Ce guide présente les grandes voies et le déroulement général. Les conditions exactes sont fixées par la loi et évoluent : vérifiez toujours votre cas sur Service Public.",
    steps: [
      {
        title: "Les grandes voies",
        body: "Les plus courantes : la naturalisation (après plusieurs années de résidence en France), la déclaration après un mariage avec un·e Français·e, et l'acquisition liée à une naissance ou une enfance passée en France.",
      },
      {
        title: "La naturalisation, en bref",
        body: "Elle est accordée par décret. Il faut notamment résider en France depuis un certain nombre d'années, être bien intégré·e, connaître la langue française au niveau demandé et les valeurs de la République. Ce n'est pas un droit automatique : l'administration décide.",
      },
      {
        title: "Préparer son dossier",
        body: "Actes d'état civil (souvent traduits), justificatifs de résidence, de ressources, diplôme ou attestation de niveau de français… La liste dépend de votre situation : suivez celle de la fiche officielle.",
      },
      {
        title: "Déposer la demande",
        body: "La demande se fait en ligne sur le site officiel ANEF dans la plupart des cas. Un entretien d'assimilation est ensuite organisé : il porte sur votre parcours, la langue et la vie en France.",
      },
      {
        title: "Être patient·e",
        body: "L'instruction prend souvent de longs mois. Gardez vos justificatifs à jour et signalez tout changement de situation (adresse, emploi, famille).",
      },
    ],
    checklist: [
      { id: "voie", label: "J'ai identifié la voie qui correspond à ma situation" },
      { id: "conditions", label: "J'ai vérifié les conditions sur Service Public" },
      { id: "etat-civil", label: "Mes actes d'état civil sont rassemblés (et traduits si besoin)" },
      { id: "francais", label: "Je sais quel justificatif de niveau de français fournir" },
      { id: "entretien", label: "Je me prépare à l'entretien (parcours, langue, vie en France)" },
    ],
    glossary: [
      { term: "Naturalisation par décret", definition: "Décision de l'État qui accorde la nationalité française à une personne étrangère qui la demande." },
      { term: "Entretien d'assimilation", definition: "Rendez-vous en préfecture pour vérifier l'intégration du demandeur." },
    ],
    sourceIds: ["sp-nationalite", "sp-naturalisation", "anef"],
    lastVerified: null,
    status: "published",
    updatedAt: "2026-10-21",
  },
];
