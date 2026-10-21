import type { ServiceDomainText } from "../translations";

/** English text for each service domain, keyed by the French domain slug. */
export const servicesEn: Record<string, ServiceDomainText> = {
  "installation-en-france": {
    seoTitle: "Organise your move to France",
    seoDescription:
      "Checklist of first procedures, priorities, a settling-in calendar and document organisation to get off to a good start in France.",
    intro:
      "Arriving in France means handling many procedures at the same time. We help you list them, rank them by priority and spread them over time.",
    limits: [
      "We do not determine your administrative situation or your residence rights.",
      "Procedures relating to a residence permit are the exclusive responsibility of the competent authorities.",
    ],
    items: {
      "checklist-premieres-demarches": {
        title: "First-steps checklist",
        description:
          "A structured list of the procedures commonly encountered when settling in, to be adapted to your situation.",
      },
      "organisation-priorites": {
        title: "Organising your priorities",
        description:
          "Identify what everything else depends on (address, bank account, identity documents) so you can proceed in the right order.",
      },
      "calendrier-installation": {
        title: "Settling-in calendar",
        description:
          "A week-by-week breakdown of your procedures, built with you during an appointment.",
      },
      "organisation-documents": {
        title: "Organising your documents",
        description:
          "A simple method for filing your supporting documents, paper and digital, and finding them quickly.",
      },
      "permis-de-conduire": {
        title: "Foreign driving licence",
        description:
          "Find out whether your licence must be exchanged, within what period, and prepare the official procedure without going through a paid website.",
      },
      "organismes-utiles": {
        title: "Links to useful organisations",
        description: "The official websites to know about, with an explanation of their role.",
      },
    },
  },
  logement: {
    seoTitle: "Housing: prepare your rental and your move-in",
    seoDescription:
      "Rental application checklist, the steps of a rental, moving in and home insurance, with official resources.",
    intro:
      "Finding housing requires a complete application and a good understanding of the steps. We help you prepare and make sure you forget nothing when moving in.",
    limits: [
      "We are not an estate agency and do not offer properties.",
      "We do not guarantee that a landlord will accept an application.",
    ],
    items: {
      "dossier-locatif": {
        title: "Checklist to prepare a rental application",
        description:
          "The documents usually requested and the public resources to put your application together.",
      },
      "etapes-location": {
        title: "The steps of a rental explained",
        description:
          "From the viewing to the handover of the keys: lease, inventory of fixtures (état des lieux) and security deposit, explained simply.",
      },
      emmenagement: {
        title: "Organising your move-in procedures",
        description:
          "Energy, internet, insurance, change of address: a list so you forget nothing.",
      },
      "assurance-habitation": {
        title: "Home insurance and housing-related contracts",
        description:
          "Understand the role of home insurance and energy contracts, without any commercial recommendation.",
      },
      "ressources-logement": {
        title: "Finding the official resources",
        description: "The public websites to consult for housing and financial aid.",
      },
    },
  },
  "banque-et-budget": {
    seoTitle: "Banking: understand how to open an account and how credit works",
    seoDescription:
      "Educational content on opening a bank account, banking vocabulary, the APR (TAEG) and preparing for a bank appointment.",
    intro:
      "Educational explanations to understand how banking works in France and to prepare for your appointments. This content is for information only.",
    limits: [
      "We do not recommend any credit, any bank or any financial product.",
      "We do not provide investment advice.",
    ],
    items: {
      "ouvrir-compte": {
        title: "Understanding the steps to open an account",
        description: "The usual steps and the supporting documents generally requested.",
      },
      "glossaire-bancaire": {
        title: "Banking glossary",
        description: "RIB, IBAN, overdraft, account maintenance fees: the terms explained.",
      },
      "comprendre-credit": {
        title: "APR (TAEG), monthly payments and total cost of credit",
        description:
          "An educational explanation to help you read a credit offer. No personalised recommendation.",
      },
      "questions-conseiller": {
        title: "Questions to ask a bank adviser",
        description: "A list of questions to prepare for your appointment.",
      },
      "preparation-rdv-bancaire": {
        title: "Administrative preparation for a bank appointment",
        description: "Gather and sort your documents before the appointment.",
      },
    },
  },
  "travail-et-salaire": {
    seoTitle: "Work and salary: hiring documents and payslip",
    seoDescription:
      "Organise the documents linked to being hired, understand the sections of a payslip (fiche de paie) and handle a change in your working situation.",
    intro:
      "A new job comes with documents to provide and to keep. We help you find your way and understand your payslip.",
    limits: [
      "We do not provide legal advice on employment law.",
      "In case of a dispute, contact the competent bodies or a legal professional.",
    ],
    items: {
      "documents-embauche": {
        title: "Organising your hiring documents",
        description: "What is generally requested and what you should keep.",
      },
      "fiche-paie": {
        title: "The sections of a payslip explained",
        description: "Gross pay, contributions, net pay, income tax withheld at source: a guided reading.",
      },
      "glossaire-travail": {
        title: "Glossary of work-related terms",
        description: "Common terms from employment contracts and payroll, explained simply.",
      },
      "changement-situation": {
        title: "Checklist for a change in your working situation",
        description:
          "The organisational points to check when leaving a job, starting a new post or going through a period without work.",
      },
    },
  },
  "sante-et-protection-sociale": {
    seoTitle: "Health and social protection: finding the right websites",
    seoDescription:
      "Guidance towards the official websites of Assurance Maladie and social protection, general document checklists.",
    intro:
      "French social protection relies on several organisations. We help you identify which ones to consult and prepare your documents.",
    limits: [
      "We do not determine your entitlement to health insurance or social benefits.",
      "We do not give any medical advice.",
    ],
    items: {
      "orientation-sante": {
        title: "Guidance towards the official websites",
        description: "Which organisation does what, and where to find up-to-date information.",
      },
      "checklist-sante": {
        title: "General document checklists",
        description: "The documents usually useful for your health-related procedures.",
      },
      "etapes-sante": {
        title: "Explanation of the usual administrative steps",
        description: "The main steps, presented in general terms.",
      },
    },
  },
  "impots-et-budget": {
    seoTitle: "Taxes and budget: getting organised simply",
    seoDescription:
      "Monthly budget tool, checklist of documents to prepare a tax return and an educational tax glossary.",
    intro:
      "A clear budget and well-filed documents make every financial procedure easier. Our tools remain educational and general.",
    limits: [
      "We do not produce individualised tax strategies.",
      "We do not determine your personal tax obligations: only the tax administration or a qualified professional can do so.",
    ],
    items: {
      "budget-mensuel": {
        title: "Simple monthly budget tool",
        description: "Work out how much you have left to live on in a few lines, directly in your browser.",
      },
      "checklist-declaration": {
        title: "Checklist of documents to prepare a tax return",
        description: "The documents generally useful to gather before filing.",
      },
      "glossaire-fiscal": {
        title: "Educational tax glossary",
        description: "Tax household (foyer fiscal), withholding at source, tax notice (avis d'imposition): the terms explained.",
      },
      "liens-fiscaux": {
        title: "Links to the official services",
        description: "The online areas of the tax administration.",
      },
    },
  },
  "famille-et-vie-quotidienne": {
    seoTitle: "Family and daily life: school, moving, contracts",
    seoDescription:
      "Organise school procedures, moving house, internet, energy and insurance contracts, and protect yourself from scams.",
    intro:
      "Daily life brings its share of contracts and enrolments. We help you organise them and spot scam attempts.",
    limits: [
      "We do not recommend any energy, internet or insurance provider.",
    ],
    items: {
      scolarite: {
        title: "Organising school procedures",
        description: "The general steps and the people to contact.",
      },
      demenagement: {
        title: "Moving checklist",
        description: "Before, during and after the move.",
      },
      "contrats-telecom": {
        title: "Phone and internet contracts",
        description: "The points to check before signing a contract.",
      },
      "energie-assurance": {
        title: "Electricity, gas and home insurance",
        description: "Understand the contracts and where to find neutral information.",
      },
      arnaques: {
        title: "Preventing administrative scams",
        description: "Recognise fake websites, fake calls and fraudulent messages.",
      },
    },
  },
  "demarches-numeriques": {
    seoTitle: "Online procedures: official portals and security",
    seoDescription:
      "Identify the official portals, secure your online accounts, download and file your supporting documents.",
    intro:
      "Most procedures are done online. We help you identify the genuine portals and protect your access.",
    limits: [
      "We will never ask for your logins or passwords for administrative websites.",
    ],
    items: {
      "portails-officiels": {
        title: "Identifying the official portals",
        description: "How to recognise an official website and avoid misleading intermediaries.",
      },
      "securite-numerique": {
        title: "Digital security tips",
        description: "Passwords, two-factor authentication, suspicious messages.",
      },
      "organisation-documents-num": {
        title: "Organising your documents",
        description: "A simple folder structure for your files.",
      },
      "classer-justificatifs": {
        title: "Downloading and filing supporting documents",
        description: "Naming, storing and backing up your documents.",
      },
    },
  },
};
