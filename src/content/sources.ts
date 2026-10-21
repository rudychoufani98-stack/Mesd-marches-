/**
 * Registre des sources officielles.
 * Les guides et le plan d'action ne peuvent citer QUE des sources de ce registre (vérifié par les tests).
 *
 * `linkCheckedOn` = date à laquelle l'URL a été testée et a répondu avec le bon titre de page.
 * Cela ne signifie PAS que le contenu des guides a été vérifié par rapport à cette source :
 * cette vérification humaine est indiquée par le champ `lastVerified` de chaque guide.
 */
export type OfficialSource = {
  id: string;
  name: string;
  /** Description courte de ce qu'on trouve sur la page. */
  label: string;
  url: string;
  linkCheckedOn: string;
};

const CHECKED = "2026-10-21";

export const officialSources = {
  "service-public": {
    id: "service-public",
    name: "Service Public",
    label: "Site officiel d'information administrative pour les particuliers",
    url: "https://www.service-public.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  "sp-logement": {
    id: "sp-logement",
    name: "Service Public — Logement",
    label: "Rubrique Logement : location, aides, assurance, déménagement",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19808",
    linkCheckedOn: CHECKED,
  },
  "sp-argent": {
    id: "sp-argent",
    name: "Service Public — Argent, impôts, consommation",
    label: "Rubrique Argent : banque, crédit, impôts, consommation",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19803",
    linkCheckedOn: CHECKED,
  },
  "sp-etranger": {
    id: "sp-etranger",
    name: "Service Public — Étranger, Europe",
    label: "Rubrique Étranger : séjour, travail, études en France",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19804",
    linkCheckedOn: CHECKED,
  },
  "sp-famille": {
    id: "sp-famille",
    name: "Service Public — Famille, scolarité",
    label: "Rubrique Famille : scolarité, naissance, vie familiale",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19805",
    linkCheckedOn: CHECKED,
  },
  "sp-travail": {
    id: "sp-travail",
    name: "Service Public — Travail, formation",
    label: "Rubrique Travail : contrat, salaire, formation",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19806",
    linkCheckedOn: CHECKED,
  },
  "sp-social-sante": {
    id: "sp-social-sante",
    name: "Service Public — Social, santé",
    label: "Rubrique Social et santé : assurance maladie, aides sociales",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19811",
    linkCheckedOn: CHECKED,
  },
  "sp-papiers": {
    id: "sp-papiers",
    name: "Service Public — Papiers, citoyenneté",
    label: "Rubrique Papiers : pièces d'identité, état civil",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N19810",
    linkCheckedOn: CHECKED,
  },
  "sp-fiche-paie": {
    id: "sp-fiche-paie",
    name: "Service Public — Fiche de paie",
    label: "Fiche pratique sur le bulletin de paie",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F559",
    linkCheckedOn: CHECKED,
  },
  "sp-demenagement": {
    id: "sp-demenagement",
    name: "Service Public — Je déménage en France",
    label: "Démarches liées à un déménagement en France",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F14128",
    linkCheckedOn: CHECKED,
  },
  "sp-declaration-revenus": {
    id: "sp-declaration-revenus",
    name: "Service Public — Déclaration de revenus",
    label: "Calendrier officiel de la déclaration de revenus",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F359",
    linkCheckedOn: CHECKED,
  },
  "sp-recherche-emploi": {
    id: "sp-recherche-emploi",
    name: "Service Public — Je recherche un emploi",
    label: "Démarches liées à la recherche d'emploi",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17556",
    linkCheckedOn: CHECKED,
  },
  "sp-permis": {
    id: "sp-permis",
    name: "Service Public — Permis de conduire",
    label: "Rubrique officielle sur le permis de conduire",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/N530",
    linkCheckedOn: CHECKED,
  },
  "sp-permis-echange": {
    id: "sp-permis-echange",
    name: "Service Public — Échange d'un permis obtenu hors UE/EEE",
    label: "Conditions et démarches pour échanger un permis étranger lors d'une installation en France",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1460",
    linkCheckedOn: CHECKED,
  },
  "sp-permis-court-sejour": {
    id: "sp-permis-court-sejour",
    name: "Service Public — Conduire avec un permis étranger (court séjour, études)",
    label: "Règles pour conduire en France avec un permis étranger sans l'échanger",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1459",
    linkCheckedOn: CHECKED,
  },
  impots: {
    id: "impots",
    name: "impots.gouv.fr — Particulier",
    label: "Espace particulier de l'administration fiscale",
    url: "https://www.impots.gouv.fr/particulier",
    linkCheckedOn: CHECKED,
  },
  ameli: {
    id: "ameli",
    name: "ameli.fr — Assuré",
    label: "Site de l'Assurance Maladie pour les assurés",
    url: "https://www.ameli.fr/assure",
    linkCheckedOn: CHECKED,
  },
  caf: {
    id: "caf",
    name: "caf.fr",
    label: "Caisse d'allocations familiales : prestations familiales et aides au logement",
    url: "https://www.caf.fr/",
    linkCheckedOn: CHECKED,
  },
  "france-services": {
    id: "france-services",
    name: "France services",
    label: "Trouver un lieu d'accompagnement public de proximité",
    url: "https://www.france-services.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  "travail-emploi": {
    id: "travail-emploi",
    name: "travail-emploi.gouv.fr",
    label: "Ministère du Travail : droit du travail et emploi",
    url: "https://travail-emploi.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  "france-travail": {
    id: "france-travail",
    name: "France Travail",
    label: "Service public de l'emploi",
    url: "https://www.francetravail.fr/accueil/",
    linkCheckedOn: CHECKED,
  },
  cnil: {
    id: "cnil",
    name: "CNIL",
    label: "Protection des données personnelles",
    url: "https://www.cnil.fr/fr",
    linkCheckedOn: CHECKED,
  },
  "cnil-rgpd": {
    id: "cnil-rgpd",
    name: "CNIL — RGPD : par où commencer ?",
    label: "Guide de la CNIL pour se mettre en conformité",
    url: "https://www.cnil.fr/fr/me-mettre-en-conformite/rgpd-par-ou-commencer",
    linkCheckedOn: CHECKED,
  },
  cybermalveillance: {
    id: "cybermalveillance",
    name: "Cybermalveillance.gouv.fr",
    label: "Assistance et prévention en sécurité numérique",
    url: "https://www.cybermalveillance.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  "cybermalveillance-phishing": {
    id: "cybermalveillance-phishing",
    name: "Cybermalveillance.gouv.fr — Hameçonnage",
    label: "Que faire en cas de phishing ou hameçonnage",
    url: "https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing",
    linkCheckedOn: CHECKED,
  },
  franceconnect: {
    id: "franceconnect",
    name: "FranceConnect",
    label: "Dispositif d'identification pour accéder aux services publics en ligne",
    url: "https://www.franceconnect.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  anef: {
    id: "anef",
    name: "Administration numérique pour les étrangers en France",
    label: "Portail officiel des démarches liées au séjour",
    url: "https://administration-etrangers-en-france.interieur.gouv.fr/particuliers/",
    linkCheckedOn: CHECKED,
  },
  "banque-france": {
    id: "banque-france",
    name: "Banque de France",
    label: "Informations sur les services bancaires, dont le droit au compte",
    url: "https://www.banque-france.fr/fr",
    linkCheckedOn: CHECKED,
  },
  mesquestionsdargent: {
    id: "mesquestionsdargent",
    name: "Mes questions d'argent — Budget",
    label: "Portail d'éducation financière (Banque de France)",
    url: "https://www.mesquestionsdargent.fr/budget",
    linkCheckedOn: CHECKED,
  },
  etudiant: {
    id: "etudiant",
    name: "Étudiant.gouv",
    label: "Informations pour la vie étudiante",
    url: "https://www.etudiant.gouv.fr/fr",
    linkCheckedOn: CHECKED,
  },
  "campus-france": {
    id: "campus-france",
    name: "Campus France",
    label: "Agence publique pour les étudiants internationaux",
    url: "https://www.campusfrance.org/fr",
    linkCheckedOn: CHECKED,
  },
  dossierfacile: {
    id: "dossierfacile",
    name: "DossierFacile",
    label: "Service public pour constituer un dossier de location",
    url: "https://www.dossierfacile.logement.gouv.fr/",
    linkCheckedOn: CHECKED,
  },
  visale: {
    id: "visale",
    name: "Visale",
    label: "Garantie locative proposée par Action Logement",
    url: "https://www.visale.fr/",
    linkCheckedOn: CHECKED,
  },
  "energie-info": {
    id: "energie-info",
    name: "Énergie-Info",
    label: "Site d'information du médiateur national de l'énergie",
    url: "https://www.energie-info.fr/",
    linkCheckedOn: CHECKED,
  },
  signalconso: {
    id: "signalconso",
    name: "SignalConso",
    label: "Signaler un problème avec une entreprise",
    url: "https://signal.conso.gouv.fr/fr",
    linkCheckedOn: CHECKED,
  },
  urssaf: {
    id: "urssaf",
    name: "Urssaf",
    label: "Cotisations sociales",
    url: "https://www.urssaf.fr/accueil.html",
    linkCheckedOn: CHECKED,
  },
} satisfies Record<string, OfficialSource>;

export type SourceId = keyof typeof officialSources;

export function getSources(ids: readonly SourceId[]): OfficialSource[] {
  return ids.map((id) => officialSources[id]);
}
