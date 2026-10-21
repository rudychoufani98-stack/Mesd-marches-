import type { TaskText } from "../translations";

/** English text for action-plan tasks, keyed by task id. */
export const tasksEn: Record<string, TaskText> = {
  "inst-documents": {
    title: "Gather and copy your personal documents",
    description:
      "Gather your identity and civil status documents, keep the originals somewhere safe and make clear digital copies.",
    documents: ["Identity document", "Civil status documents"],
  },
  "etu-sites": {
    title: "Consult the reference websites for students",
    description:
      "Campus France and Étudiant.gouv bring together the official information on studying and student life.",
    documents: [],
  },
  "inst-sejour-info": {
    title: "Check the procedures linked to your stay, if they apply to you",
    description:
      "Depending on your nationality and situation, residence-related procedures may apply. Only the official portal is authoritative.",
    documents: [],
  },
  "inst-adresse": {
    title: "Identify your proof of address",
    description:
      "Lease, accommodation certificate, bill… Work out which document you will be able to provide: it will be requested for many procedures.",
    documents: ["Lease, accommodation certificate or recent bill"],
  },
  "inst-permis": {
    title: "If you have a foreign driving licence: check whether it must be exchanged",
    description:
      "Depending on the country that issued it and your situation, an exchange may be necessary within a period set by the regulations. Consult the official page as soon as you arrive.",
    documents: ["Foreign driving licence", "Identity document", "Proof of address"],
  },
  "inst-france-services": {
    title: "Find your nearest France services centre",
    description:
      "France services centres offer free public support for many administrative procedures.",
    documents: [],
  },
  "log-dossier": {
    title: "Put together your rental application",
    description:
      "Prepare clear copies of the documents usually requested. A digital file can be created on DossierFacile.",
    documents: [
      "Identity document",
      "Current proof of address",
      "Proof of employment or activity",
      "Proof of income",
    ],
  },
  "log-garantie": {
    title: "Look into rental guarantee options",
    description:
      "A guarantor or a guarantee scheme: check which options may be available in your case.",
    documents: [],
  },
  "log-assurance": {
    title: "Compare and take out home insurance",
    description:
      "The lease may require an insurance certificate. Compare the cover before choosing.",
    documents: ["Lease or address of the property"],
  },
  "log-aides": {
    title: "Try the housing benefit simulator",
    description:
      "Depending on your situation, housing aid may exist. The CAF simulator gives a first indication.",
    documents: ["Lease", "Information about your income"],
  },
  "bq-compte": {
    title: "Prepare to open a bank account",
    description:
      "Compare the fee brochures and prepare your supporting documents. If you are refused an account, find out about the right to a bank account (droit au compte).",
    documents: ["Identity document", "Proof of address", "Proof of status"],
  },
  "bq-budget": {
    title: "Draw up a first monthly budget",
    description:
      "List your income and fixed expenses to see how much you have left to live on each month.",
    documents: ["Bank statements", "Current contracts"],
  },
  "tr-documents": {
    title: "Gather the documents your employer asks for",
    description:
      "Identity document, social security number or certificate, bank details (RIB): check the list you have been given and keep your contract.",
    documents: [
      "Identity document",
      "Bank details (RIB)",
      "Social security certificate, if available",
    ],
  },
  "tr-fiche-paie": {
    title: "Review your first payslip (fiche de paie)",
    description:
      "Find the gross pay, contributions, income tax withheld at source and net pay, then compare with your bank statement.",
    documents: ["Payslip", "Bank statement"],
  },
  "tr-classement": {
    title: "Create a folder for your work documents",
    description:
      "Contract, payslips, certificates: a dedicated folder, on paper and digital.",
    documents: [],
  },
  "sa-affiliation": {
    title: "Look at the steps to register with Assurance Maladie",
    description:
      "The steps depend on your situation (employee, student, other). ameli.fr presents the possible cases.",
    documents: ["Identity document", "Proof of address", "Bank details (RIB)"],
  },
  "sa-compte": {
    title: "Create your Assurance Maladie online account",
    description:
      "When your situation allows it, the online account makes it easier to track reimbursements and procedures.",
    documents: [],
  },
  "sa-complementaire": {
    title: "Look into supplementary health insurance (complémentaire santé)",
    description:
      "Check whether your employer offers one and find out about the options available.",
    documents: [],
  },
  "imp-espace": {
    title: "Create your personal account on impots.gouv.fr",
    description:
      "It allows you to file your return online, view your documents and manage income tax withheld at source.",
    documents: [],
  },
  "imp-documents": {
    title: "Set up a folder for your tax documents",
    description:
      "Payslips, certificates and notices: one folder per year makes filing your return easier.",
    documents: [],
  },
  "imp-calendrier": {
    title: "Check the official tax return calendar",
    description:
      "The dates change every year: note the ones published by the tax administration.",
    documents: [],
  },
  "fam-contrats": {
    title: "Set up your energy and internet contracts",
    description:
      "Compare offers, check the commitment periods and note the meter readings.",
    documents: ["Address of the property", "Bank details (RIB)"],
  },
  "fam-ecole": {
    title: "Find out about school enrolment",
    description:
      "Service Public explains the enrolment procedures according to the child's age and the type of school.",
    documents: ["Proof of address", "The child's civil status documents"],
  },
  "fam-adresse": {
    title: "Notify your change of address",
    description:
      "Inform the organisations concerned. Service Public lists the online procedures available.",
    documents: [],
  },
  "num-favoris": {
    title: "Save the official websites in your bookmarks",
    description:
      "Always access procedures from your bookmarks rather than from a link received in a message.",
    documents: [],
  },
  "num-securite": {
    title: "Secure your online accounts",
    description:
      "Unique passwords, and two-factor authentication where it is offered.",
    documents: [],
  },
  "num-classement": {
    title: "Organise your digital documents",
    description:
      "A simple folder structure, dated file names and a backup.",
    documents: [],
  },
};
