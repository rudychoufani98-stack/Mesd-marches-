import type { GuideText } from "../translations";

/** English versions of the default guides, keyed by guide slug. */
export const guidesEn: Record<string, GuideText> = {
  "premieres-demarches-installation": {
    title: "Your first steps when settling in France",
    description:
      "An overview to help you organise your first few weeks: address, bank account, social protection, documents.",
    intro:
      "When you settle in, several procedures depend on one another. This guide suggests a logical order in which to organise them. It does not replace official information: the exact procedures depend on your nationality, your status and your situation.",
    steps: [
      {
        title: "Gather and safeguard your personal documents",
        body: "Before starting any procedure, gather your identity documents, civil status documents (état civil) and, where applicable, the documents relating to your stay. Keep the originals in a safe place and make clear digital copies.",
      },
      {
        title: "Get proof of address",
        body: "Many procedures require an address in France: a lease, a certificate of accommodation (attestation d'hébergement), a recent bill... The solution differs depending on your situation. Work out quickly which proof of address (justificatif d'adresse) you will be able to provide.",
      },
      {
        title: "Open a bank account",
        body: "A bank account is often required to receive a salary or reimbursements. Find out which supporting documents the institution you choose asks for. If you are refused, the Banque de France explains the procedure known as the 'right to an account' (droit au compte).",
      },
      {
        title: "Find out about your social protection",
        body: "Registration with health insurance (assurance maladie) depends on your situation (employee, student, other). Check the Assurance Maladie website to find out which procedures apply to you.",
      },
      {
        title: "Set up your access to online services",
        body: "Many procedures are carried out online. Only create accounts on official websites and protect them with unique passwords.",
      },
      {
        title: "Get free help if you need it",
        body: "France services centres offer free public support with many procedures. There are centres in many towns and municipalities.",
      },
    ],
    checklist: {
      "docs-identite": "Identity documents gathered and copied",
      "justif-adresse": "Proof of address identified",
      "compte-bancaire": "Bank account opening process started",
      "protection-sociale": "Health insurance procedures identified on ameli.fr",
      "comptes-en-ligne": "Online accounts created on official websites",
      "france-services": "Nearest France services centre located",
    },
    glossary: [],
  },
  "preparer-dossier-locatif": {
    title: "Preparing your tenancy file",
    description:
      "The documents usually requested, the stages of renting a home and the public services that can help you.",
    intro:
      "A complete, well-presented tenancy file (dossier de location) saves you time. The list of documents a landlord may require is governed by regulations: check Service Public for the up-to-date list.",
    steps: [
      {
        title: "Prepare the usual supporting documents",
        body: "Files generally include an identity document, proof of your current address, proof of your professional activity and proof of income. Prepare clear copies in PDF format.",
      },
      {
        title: "Think ahead about a guarantee",
        body: "Many landlords ask for a guarantee (a person who acts as guarantor (caution) or a guarantee scheme). You can look into the Visale scheme, offered by Action Logement, to check whether you are eligible.",
      },
      {
        title: "Use a digital file",
        body: "DossierFacile is a public service that lets you put together a digital tenancy file and share it with landlords or agencies.",
      },
      {
        title: "Understand the rental documents",
        body: "Before signing, read the lease (bail): duration, rent, service charges, security deposit. When you move in, an inventory of condition (état des lieux) describes the property: take the time to read it carefully and point out any defects you notice.",
      },
      {
        title: "Beware of listings that look too good to be true",
        body: "Never pay any money before you have visited the property and signed a lease. Be wary of requests for payment by money order or prepaid card.",
      },
      {
        title: "Find out about housing assistance",
        body: "Depending on your situation, housing assistance may be available. The CAF provides a simulator and official information on the subject.",
      },
    ],
    checklist: {
      "piece-identite": "Copy of identity document",
      "justif-domicile": "Proof of current address",
      "justif-activite": "Proof of activity (employment contract, student card...)",
      "justif-ressources": "Proof of income",
      garantie: "Guarantee solution identified",
      "dossier-numerique": "Digital file created (optional)",
      "etat-des-lieux": "Move-in inventory of condition read and signed",
    },
    glossary: [
      { term: "Lease (bail)", definition: "Rental contract signed between the tenant and the landlord." },
      {
        term: "Security deposit (dépôt de garantie)",
        definition: "A sum paid when moving into the property and returned at the end of the tenancy, minus any amounts owed.",
      },
      {
        term: "Inventory of condition (état des lieux)",
        definition: "A document describing the condition of the property when the tenant moves in and when they move out.",
      },
      {
        term: "Service charges (charges)",
        definition: "Housing-related costs paid in addition to the rent (upkeep of communal areas, water, etc.).",
      },
    ],
  },
  "checklist-demenagement": {
    title: "Moving out and moving in checklist",
    description: "Before, during and after the move: contracts, insurance, change of address.",
    intro:
      "Moving home means notifying many organisations and setting up new contracts. This checklist helps you make sure you do not forget anything.",
    steps: [
      {
        title: "Before the move",
        body: "If you are leaving a rented property, check the notice period (préavis) that applies to your lease on Service Public. List the contracts to cancel or transfer (energy, internet, insurance).",
      },
      {
        title: "Home insurance",
        body: "Home insurance (assurance habitation) covers, among other things, damage caused to the property. Find out what applies to your situation: the lease may require a certificate of insurance. Compare the cover offered before choosing.",
      },
      {
        title: "Electricity and gas",
        body: "When you arrive, open the energy contracts in your name. The Énergie-Info website, run by the national energy ombudsman (médiateur national de l'énergie), provides neutral information and a public comparison tool.",
      },
      {
        title: "Internet and telephone",
        body: "Before signing, check the minimum contract period, the cancellation fees, the price after any promotional period and the connection fees.",
      },
      {
        title: "Change your address",
        body: "Service Public has a section dedicated to moving home that lists the organisations to notify and the online procedures available.",
      },
    ],
    checklist: {
      preavis: "Notice period for the previous home checked",
      assurance: "Home insurance certificate obtained",
      energie: "Electricity and/or gas contracts opened",
      internet: "Internet offers compared and one taken out",
      "changement-adresse": "Change of address reported to the relevant organisations",
      "releves-compteurs": "Meter readings noted on arrival",
    },
    glossary: [],
  },
  "comprendre-ouverture-compte-bancaire": {
    title: "Understanding how to open a bank account",
    description:
      "Usual steps, documents generally requested, banking vocabulary and questions to ask an adviser.",
    intro:
      "This guide is for information purposes. It does not recommend any bank or any product. The exact documents required depend on each institution and on your situation.",
    steps: [
      {
        title: "Choose the type of institution",
        body: "There are banks with branches, online banks and payment institutions. Their services, fees and account-opening conditions differ: compare their price lists (plaquettes tarifaires).",
      },
      {
        title: "Prepare your supporting documents",
        body: "Usually requested: a valid identity document, proof of address and sometimes proof of income or of your situation (employment contract, student card).",
      },
      {
        title: "If you are refused",
        body: "If an institution refuses to open an account, the Banque de France explains the right to an account (droit au compte) procedure. Check its website to find out the conditions and steps.",
      },
      {
        title: "Prepare for your appointment",
        body: "Write down your questions in advance and ask for the price list. Do not sign anything you have not understood.",
      },
    ],
    checklist: {
      identite: "Valid identity document",
      domicile: "Proof of address",
      situation: "Proof of situation (contract, student card...)",
      plaquette: "Price list consulted",
      questions: "List of questions prepared",
    },
    glossary: [
      {
        term: "Bank details slip (RIB)",
        definition: "Relevé d'identité bancaire: a document that allows a third party to make transfers to your account.",
      },
      {
        term: "IBAN",
        definition: "International number identifying a bank account, shown on the RIB.",
      },
      {
        term: "Overdraft (découvert)",
        definition: "A situation where the account balance becomes negative. It may or may not be authorised, and may lead to fees.",
      },
      {
        term: "Price list (plaquette tarifaire)",
        definition: "A document listing the fees charged by the institution.",
      },
      {
        term: "Direct debit (prélèvement)",
        definition: "A payment you authorise a creditor to take directly from your account.",
      },
    ],
  },
  "comprendre-le-cout-d-un-credit": {
    title: "Understanding the cost of credit: APR, monthly payments, total cost",
    description:
      "An educational explanation to help you read a credit offer. No personalised recommendation.",
    intro:
      "This guide explains general concepts to help you read a credit offer. MesDémarches does not recommend any credit. Credit is a commitment and must be repaid: check that you can afford the repayments before committing.",
    steps: [
      {
        title: "The APR (TAEG)",
        body: "The annual percentage rate of charge (taux annuel effectif global) expresses, as an annual percentage, the total cost of the credit for the borrower: it includes interest and credit-related fees. It is the indicator to use when comparing offers with one another.",
      },
      {
        title: "The monthly payment",
        body: "This is the amount repaid each month. A lower monthly payment often means a longer term... and a higher total cost.",
      },
      {
        title: "The total cost of credit",
        body: "This is the difference between the total amount repaid and the amount borrowed. For example, with an amount borrowed of €1,000 and 12 monthly payments of €90, the total repaid is €1,080 and the total cost is €80 (fictitious example, for illustration only).",
      },
      {
        title: "Questions to ask yourself",
        body: "What is the APR? What is the total cost? Is there insurance, and is it compulsory? What happens if you repay early? Take the time to compare and to find out more on public financial education websites.",
      },
    ],
    checklist: {
      taeg: "I have identified the APR of each offer",
      "cout-total": "I have calculated the total cost",
      budget: "I have checked that the monthly payment fits my budget",
      assurance: "I have understood the insurance conditions",
    },
    glossary: [
      {
        term: "APR (TAEG)",
        definition: "Annual percentage rate of charge: the total cost of the credit expressed as an annual percentage.",
      },
      { term: "Amount borrowed (capital emprunté)", definition: "The sum lent by the institution." },
      { term: "Monthly payment (mensualité)", definition: "The amount repaid each month." },
      {
        term: "Early repayment (remboursement anticipé)",
        definition: "Repaying all or part of the credit before the scheduled date.",
      },
    ],
  },
  "comprendre-sa-fiche-de-paie": {
    title: "Understanding your payslip and organising your hiring documents",
    description:
      "The main sections of a payslip explained simply, and the documents to keep.",
    intro:
      "The payslip (fiche de paie or bulletin de salaire) sets out your pay and the contributions. This guide gives a general overview of its main sections. For any question about your situation, contact your employer or the relevant organisations.",
    steps: [
      {
        title: "Documents related to hiring",
        body: "When you are hired, the employer generally asks for an identity document, a social security number (or a certificate) and bank details (RIB). Keep your employment contract and every payslip.",
      },
      {
        title: "Gross salary",
        body: "This is your pay before employee social contributions are deducted. It includes your basic salary and, where applicable, bonuses and overtime.",
      },
      {
        title: "Contributions",
        body: "Part of the gross salary funds social protection (health, pensions, unemployment...). Employee contributions are deducted from the gross salary; employer contributions are paid on top by the employer.",
      },
      {
        title: "Net pay before tax and withholding tax",
        body: "Net pay before tax (net à payer avant impôt) corresponds to the salary after contributions. Income tax is then withheld at source (prélèvement à la source) at the rate provided by the tax authorities.",
      },
      {
        title: "Net pay",
        body: "This is the amount actually paid into your account. Compare it with your bank statement every month.",
      },
      {
        title: "Keep your payslips",
        body: "Your payslips may be requested for many procedures. Service Public sets out the rules on how long to keep them: see the dedicated page.",
      },
    ],
    checklist: {
      contrat: "Employment contract signed and kept",
      "documents-employeur": "Documents requested by the employer sent",
      "premiere-fiche": "First payslip checked",
      classement: "'Payslips' folder created",
    },
    glossary: [
      { term: "Gross salary (salaire brut)", definition: "Pay before employee contributions are deducted." },
      { term: "Net pay (net à payer)", definition: "The amount actually paid to the employee." },
      { term: "Social contributions (cotisations sociales)", definition: "Deductions that fund social protection." },
      {
        term: "Withholding tax (prélèvement à la source)",
        definition: "A method of paying income tax in which it is deducted directly from your salary.",
      },
      {
        term: "Probationary period (période d'essai)",
        definition: "A period at the start of the contract that allows each party to assess the working relationship.",
      },
    ],
  },
  "s-orienter-protection-sociale": {
    title: "Finding your way around social protection",
    description:
      "Which organisation does what? General guidance towards the Assurance Maladie, the CAF and other official websites.",
    intro:
      "Social protection in France is provided by several organisations. This guide helps you work out which one to consult. It does not determine your rights: only the relevant organisations can do that.",
    steps: [
      {
        title: "The Assurance Maladie",
        body: "It covers part of your healthcare costs. The ameli.fr website sets out the registration procedures according to your situation and lets you create an online account.",
      },
      {
        title: "Supplementary health insurance",
        body: "Supplementary health insurance (complémentaire santé) can top up the reimbursements from the Assurance Maladie. Some employers offer one. Find out more on ameli.fr and Service Public.",
      },
      {
        title: "The CAF",
        body: "The Family Allowance Fund (Caisse d'allocations familiales) pays, among other things, family benefits and housing assistance, subject to conditions. Its website offers simulators.",
      },
      {
        title: "Useful documents",
        body: "Generally, prepare an identity document, proof of address, bank details (RIB) and, depending on your situation, proof of activity or income.",
      },
    ],
    checklist: {
      "ameli-situation": "Registration procedures checked on ameli.fr",
      "compte-ameli": "ameli account created (if possible in your situation)",
      complementaire: "Supplementary health insurance question looked into",
      "caf-simulation": "CAF simulators consulted if relevant",
    },
    glossary: [],
  },
  "preparer-sa-declaration-de-revenus": {
    title: "Preparing the documents for your income tax return",
    description:
      "Gathering the documents that are generally useful, understanding tax vocabulary and finding the official services.",
    intro:
      "This guide helps you get organised before filing your income tax return (déclaration de revenus). It does not determine your tax obligations. Filing dates change every year: always check the official calendar.",
    steps: [
      {
        title: "Create your personal account",
        body: "Your personal account (espace particulier) on impots.gouv.fr lets you file your return online, view your tax notices and manage your withholding tax (prélèvement à la source).",
      },
      {
        title: "Gather your documents",
        body: "Keep the documents for the relevant year to hand: payslips (in particular the December one), income statements, and proof of any expenses.",
      },
      {
        title: "Check the official calendar",
        body: "The filing deadlines are published every year by the tax authorities and are also listed on Service Public.",
      },
      {
        title: "Get help",
        body: "If you have a question about your situation, contact the tax authorities through your personal account or visit a France services centre.",
      },
    ],
    checklist: {
      "espace-particulier": "Personal account created",
      "fiches-paie": "Payslips for the year gathered",
      attestations: "Statements received filed in a folder",
      calendrier: "Official calendar checked",
    },
    glossary: [
      {
        term: "Tax household (foyer fiscal)",
        definition: "All the people included on the same income tax return.",
      },
      {
        term: "Tax notice (avis d'imposition)",
        definition: "A document sent by the tax authorities after the return has been filed.",
      },
      {
        term: "Withholding rate (taux de prélèvement)",
        definition: "The rate applied to your income for withholding tax.",
      },
      {
        term: "Taxable income (revenu imposable)",
        definition: "The amount of income taken into account when calculating tax.",
      },
    ],
  },
  "eviter-les-arnaques-administratives": {
    title: "Recognising official websites and avoiding scams",
    description:
      "Fake websites, fraudulent messages, fake calls: good habits to protect your procedures.",
    intro:
      "Some websites and messages imitate the authorities to obtain money or personal data. A few simple habits can help you protect yourself.",
    steps: [
      {
        title: "Check the website address",
        body: "French government websites generally use an address ending in '.gouv.fr', or that of a well-known public body (ameli.fr, caf.fr...). Be wary of addresses that look similar.",
      },
      {
        title: "Be wary of unexpected charges for procedures",
        body: "Many administrative procedures are free on official websites. A website that charges for a free procedure should raise a red flag.",
      },
      {
        title: "Never share your codes",
        body: "No reputable organisation will ask you for your passwords or codes received by text message. MesDémarches will never ask you for them either.",
      },
      {
        title: "If in doubt",
        body: "Do not click on the link you received; go directly to the official website. Cybermalveillance.gouv.fr explains what to do in the event of phishing. A problem with a company can be reported on SignalConso.",
      },
    ],
    checklist: {
      favoris: "Official websites saved in my bookmarks",
      "mots-de-passe": "Unique passwords for each account",
      "double-auth": "Two-factor authentication enabled when offered",
      "reflexe-lien": "Habit: never click on a suspicious link",
    },
    glossary: [],
  },
  "organiser-ses-documents-numeriques": {
    title: "Organising and securing your digital documents",
    description:
      "A simple method for downloading, naming, filing and backing up your supporting documents.",
    intro:
      "Well-organised documents save you time with every procedure. Here is a simple method, to adapt to your own tools.",
    steps: [
      {
        title: "Create a simple folder structure",
        body: "For example: Identity, Housing, Bank, Work, Health, Taxes, Family. One folder per topic, with a sub-folder per year if needed.",
      },
      {
        title: "Name your files consistently",
        body: "For example: '2026-09_fiche-paie.pdf' or '2026_attestation-assurance-habitation.pdf'. Putting the date first allows automatic sorting.",
      },
      {
        title: "Back up",
        body: "Keep a copy on a separate medium (external drive or secure storage service). Protect access with a strong password.",
      },
      {
        title: "Protect your accounts",
        body: "Enable two-factor authentication when it is offered and do not use the same password on several websites. FranceConnect lets you access many public services with an existing account.",
      },
    ],
    checklist: {
      arborescence: "Folder structure created",
      nommage: "Naming rule adopted",
      sauvegarde: "Backup set up",
      securite: "Access protected by password",
    },
    glossary: [],
  },
  "permis-de-conduire-etranger": {
    title: "Driving in France with a foreign driving licence",
    description:
      "European licence or not, short stay or settling in: the questions to ask yourself and where to find the official exchange procedure.",
    intro:
      "The rules depend on the country that issued your licence, your status (settling in, studies, short stay) and the date you arrived. This guide helps you identify your case and then follow the official page that applies. It does not determine your situation: always check on Service Public.",
    steps: [
      {
        title: "Identify your situation",
        body: "Note the country that issued your licence, its validity date and your situation in France (long-term settlement, studies, short stay). These three elements determine which rule applies.",
      },
      {
        title: "Licence issued in the European Union or the European Economic Area",
        body: "Licences issued in these countries are subject to specific rules. Check the Driving licence (Permis de conduire) section of Service Public to find out whether an exchange is necessary in your case.",
      },
      {
        title: "Licence issued outside the EU/EEA and settling in France",
        body: "When you settle in France, a licence obtained outside the EU/EEA may need to be exchanged for a French licence, within a time limit set by regulations and under conditions that depend in particular on the issuing country. Do not delay: as soon as you arrive, check the official page on exchanging a licence (échange de permis).",
      },
      {
        title: "Short stay or studies",
        body: "Specific rules allow you, subject to conditions, to drive with your foreign licence during a short stay or during your studies. Check them on the dedicated official page.",
      },
      {
        title: "Prepare the online procedure",
        body: "The exchange application is made online, on the official website indicated by Service Public. Prepare clear scans of your documents and be wary of websites that charge for this procedure: always use the link given on Service Public.",
      },
    ],
    checklist: {
      "pays-delivrance": "Issuing country and licence validity date noted",
      situation: "My situation identified (settling in, studies, short stay)",
      "fiche-officielle": "Official Service Public page for my case consulted",
      delai: "Time limit applicable to my case noted in my calendar",
      "documents-scannes": "Requested documents scanned clearly",
      "site-officiel": "Procedure carried out only via the official link",
    },
    glossary: [
      {
        term: "Licence exchange (échange de permis)",
        definition: "A procedure for replacing a foreign licence with a French licence, when the conditions are met.",
      },
      {
        term: "EU/EEA (UE/EEE)",
        definition: "European Union and European Economic Area (EU + Iceland, Liechtenstein, Norway).",
      },
    ],
  },
  "demarches-etudiants-internationaux": {
    title: "Procedures for international students: first pointers",
    description:
      "The reference websites for international students in France. Guide being written.",
    intro: "This guide is being written and will be published after review.",
    steps: [
      {
        title: "Reference websites",
        body: "Campus France and Étudiant.gouv bring together official information on studying and student life in France.",
      },
    ],
    checklist: {
      "sites-reference": "Reference websites consulted",
    },
    glossary: [],
  },
};
