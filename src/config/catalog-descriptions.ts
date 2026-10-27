/**
 * Description de chaque service : ce que le conseiller fait concrètement avec le client.
 * Indexé par identifiant de service. [français, anglais]
 */
export const serviceDescriptions: Record<string, [string, string]> = {
  // Immobilier & logement
  "logement-recherche": [
    "Nous définissons ensemble votre budget et vos critères, les quartiers adaptés, les sites fiables pour chercher, la mise en place d'alertes et les arnaques à éviter.",
    "Together we set your budget and criteria, suitable neighbourhoods, reliable websites, search alerts and the scams to avoid.",
  ],
  "logement-dossier-locatif": [
    "Liste des pièces à fournir, garant ou garantie Visale, présentation claire du dossier et relecture complète avant de l'envoyer aux propriétaires.",
    "The documents to provide, guarantor or Visale guarantee, a clear presentation of your file and a full review before you send it to landlords.",
  ],
  "logement-bail": [
    "Nous lisons avec vous le bail, l'état des lieux et les annexes : loyer, charges, dépôt de garantie, durée, préavis, et les points à vérifier avant de signer.",
    "We go through the lease, inventory and appendices with you: rent, charges, deposit, term, notice period and what to check before signing.",
  ],
  "logement-achat": [
    "Les grandes étapes d'un achat (offre, compromis, acte), le rôle du notaire, de la banque et de l'agence, les frais à prévoir et le calendrier.",
    "The main steps of a purchase (offer, preliminary contract, deed), the role of the notary, bank and agency, the costs to expect and the timeline.",
  ],
  "logement-rentabilite": [
    "Nous vous expliquons comment se calculent rendement brut et net, charges, vacance locative et fiscalité, pour que vous sachiez lire une étude de rentabilité.",
    "We explain how gross and net yield, charges, vacancy and tax are calculated, so you can read a rental yield study.",
  ],
  "logement-financement": [
    "Les justificatifs attendus par les banques, comment présenter vos revenus et votre apport, et les questions à préparer avant de les rencontrer.",
    "The documents banks expect, how to present your income and deposit, and the questions to prepare before meeting them.",
  ],
  "logement-rdv-bancaire": [
    "Une checklist des documents à apporter et une liste de questions à poser, pour arriver préparé·e et comparer les réponses.",
    "A checklist of documents to bring and a list of questions to ask, so you arrive prepared and can compare answers.",
  ],
  // Fiscalité & impôts
  "fiscalite-premiere-declaration": [
    "Nous remplissons la déclaration à vos côtés, case par case : revenus, situation de famille, revenus étrangers, et les justificatifs à garder.",
    "We fill in the return with you, box by box: income, family situation, foreign income and the proofs to keep.",
  ],
  "fiscalite-avis": [
    "Lecture de votre avis ligne par ligne : revenu imposable, taux, montant dû ou remboursé, échéances, et ce qu'il faut faire en cas d'erreur.",
    "We read your notice line by line: taxable income, rate, amount due or refunded, deadlines and what to do if there is a mistake.",
  ],
  "fiscalite-espace-fiscal": [
    "Création de votre compte impots.gouv avec vous, accès à vos documents et paramétrage de votre espace, en toute sécurité.",
    "We create your impots.gouv account with you, access your documents and set up your space, safely.",
  ],
  "fiscalite-prelevement": [
    "Comment est calculé votre taux, comment le mettre à jour, l'individualiser ou le modifier quand vos revenus changent.",
    "How your rate is calculated, and how to update it, split it or change it when your income changes.",
  ],
  "fiscalite-changement": [
    "Les démarches à faire après un déménagement, un mariage, une naissance, un départ ou un nouvel emploi, et leurs effets sur vos impôts.",
    "The steps to take after a move, marriage, birth, departure or new job, and how they affect your taxes.",
  ],
  "fiscalite-documents": [
    "Quels documents garder et combien de temps, et une méthode simple pour classer vos papiers fiscaux (papier et numérique).",
    "Which documents to keep and for how long, and a simple method to file your tax papers (paper and digital).",
  ],
  // Santé & assurances
  "sante-assurance-maladie": [
    "Votre situation (salarié, étudiant, autre), les pièces à fournir, la demande d'affiliation et le suivi jusqu'à l'obtention de votre numéro.",
    "Your situation (employee, student, other), the documents to provide, the registration request and follow-up until you get your number.",
  ],
  "sante-carte-vitale": [
    "La demande de carte Vitale pas à pas, la photo et les justificatifs, et que faire en attendant de la recevoir.",
    "Applying for your carte Vitale step by step, photo and proofs, and what to do while you wait for it.",
  ],
  "sante-ameli": [
    "Création de votre compte ameli avec vous, et les fonctions utiles : attestations, remboursements, médecin traitant.",
    "We create your ameli account with you and show the useful features: certificates, reimbursements, GP declaration.",
  ],
  "sante-remboursements": [
    "Le parcours de soins, le médecin traitant, les taux de remboursement, le tiers payant et ce qui reste à votre charge.",
    "The care pathway, GP, reimbursement rates, third-party payment and what you pay yourself.",
  ],
  "sante-complementaire": [
    "Comment fonctionne une mutuelle, comment lire un tableau de garanties et comparer des offres, sans vous orienter vers un assureur en particulier.",
    "How a mutuelle works, how to read a cover table and compare offers, without steering you to any specific insurer.",
  ],
  "sante-assurances": [
    "Les assurances obligatoires ou utiles selon votre situation (habitation, responsabilité civile…) et ce qu'il faut vérifier dans un contrat.",
    "The compulsory or useful insurance for your situation (home, liability…) and what to check in a policy.",
  ],
  // Banque & finances personnelles
  "banque-ouverture": [
    "Les documents à réunir, les types de banques, les démarches en ligne ou en agence, et le droit au compte en cas de refus.",
    "The documents to gather, the types of banks, online or in-branch steps, and your right to an account if you are refused.",
  ],
  "banque-services": [
    "Frais bancaires, cartes, virements, prélèvements, RIB : nous vous expliquons tout pour que vous utilisiez votre banque sereinement.",
    "Bank fees, cards, transfers, direct debits, bank details: we explain everything so you can use your bank with confidence.",
  ],
  "banque-rdv": [
    "Une liste de questions adaptée à votre situation et les documents à apporter, pour un rendez-vous efficace avec votre conseiller.",
    "A list of questions tailored to your situation and the documents to bring, for an effective meeting with your adviser.",
  ],
  "banque-releve": [
    "Lecture de votre relevé : opérations, libellés, prélèvements, frais, et repérage des paiements inconnus.",
    "We read your statement together: transactions, labels, direct debits, fees, and spotting unknown payments.",
  ],
  "banque-budget": [
    "Un tableau simple de vos revenus et dépenses, vos postes à surveiller et une méthode pour épargner chaque mois.",
    "A simple table of your income and spending, the items to watch and a method to save every month.",
  ],
  "banque-credit": [
    "Le vocabulaire du crédit (taux, TAEG, assurance emprunteur, durée), comment lire une offre de prêt et les pièges à éviter.",
    "Credit vocabulary (rate, APR, borrower insurance, term), how to read a loan offer and the pitfalls to avoid.",
  ],
  // Emploi & vie professionnelle
  "emploi-cv": [
    "Un CV au format français : structure, rubriques, mise en valeur de votre parcours étranger, et une lettre de motivation si besoin.",
    "A French-style CV: structure, sections, how to highlight your international background, and a cover letter if needed.",
  ],
  "emploi-entretien": [
    "Les questions fréquentes en France, comment présenter votre parcours, une simulation d'entretien et des conseils pratiques.",
    "Common interview questions in France, how to present your background, a mock interview and practical tips.",
  ],
  "emploi-contrat": [
    "CDI, CDD, période d'essai, temps de travail, congés, clauses particulières : nous lisons votre contrat avec vous.",
    "Permanent or fixed-term, probation, working hours, leave, specific clauses: we read your contract with you.",
  ],
  "emploi-fiche-paie": [
    "Chaque ligne de votre bulletin : brut, cotisations, net, prélèvement à la source, congés, et les documents à conserver.",
    "Every line of your payslip: gross, contributions, net, withholding tax, leave, and the documents to keep.",
  ],
  "emploi-france-travail": [
    "L'inscription en ligne, les documents, le premier rendez-vous et vos obligations de demandeur d'emploi.",
    "Online registration, documents, the first appointment and your obligations as a jobseeker.",
  ],
  "emploi-droits": [
    "Les grandes règles du travail salarié en France (horaires, congés, arrêt maladie, rupture du contrat) et les démarches associées.",
    "The main rules of employment in France (hours, leave, sick leave, end of contract) and the related steps.",
  ],
  // Immigration & démarches administratives
  "immigration-installation": [
    "Les démarches prioritaires de vos premières semaines dans le bon ordre : adresse, banque, santé, titre de séjour, comptes en ligne.",
    "Your priority steps for the first weeks in the right order: address, bank, health, residence permit, online accounts.",
  ],
  "immigration-titre-sejour": [
    "Le type de titre correspondant à votre motif de séjour, la liste des pièces, le dépôt en ligne sur l'ANEF et le suivi du dossier.",
    "The type of permit matching your reason for staying, the document list, online submission on ANEF and file follow-up.",
  ],
  "immigration-renouvellement": [
    "Le bon calendrier pour demander le renouvellement, les pièces à jour, le dépôt et les documents qui prouvent que votre demande est en cours.",
    "The right timing to apply for renewal, up-to-date documents, submission and the papers proving your application is in progress.",
  ],
  "immigration-regroupement": [
    "Les grandes étapes du regroupement familial, les conditions générales (logement, ressources) et la constitution du dossier.",
    "The main steps of family reunification, the general conditions (housing, income) and how to build the file.",
  ],
  "immigration-nationalite": [
    "Les voies d'accès à la nationalité, les conditions générales, les pièces et traductions, le dépôt et la préparation de l'entretien.",
    "The routes to nationality, general conditions, documents and translations, submission and interview preparation.",
  ],
  "immigration-courrier": [
    "Nous lisons avec vous le courrier reçu, ce qui est demandé, le délai pour répondre et la marche à suivre.",
    "We read the letter you received with you: what is being asked, the deadline to reply and the next steps.",
  ],
  "immigration-dossier": [
    "Inventaire des pièces, traductions nécessaires, classement clair et vérification complète avant le dépôt.",
    "Inventory of documents, required translations, clear organisation and a full check before submission.",
  ],
  // Vie quotidienne & installation
  "quotidien-premieres-demarches": [
    "Un plan d'installation personnalisé : ce qui est urgent, ce qui peut attendre, et les comptes à créer en premier.",
    "A personalised settling-in plan: what is urgent, what can wait, and the accounts to create first.",
  ],
  "quotidien-services-publics": [
    "FranceConnect, Service-Public, ameli, impots.gouv, CAF : création des accès et prise en main, en toute sécurité.",
    "FranceConnect, Service-Public, ameli, impots.gouv, CAF: creating your logins and getting started, safely.",
  ],
  "quotidien-factures": [
    "Lecture de vos factures d'énergie, d'eau, d'internet ou de téléphone : abonnement, consommation, échéancier et régularisation.",
    "Reading your energy, water, internet or phone bills: subscription, usage, payment schedule and adjustments.",
  ],
  "quotidien-contrats": [
    "Les étapes pour ouvrir l'électricité, le gaz, internet et le téléphone, les informations à préparer et les points à comparer.",
    "The steps to set up electricity, gas, internet and phone, the information to prepare and what to compare.",
  ],
  "quotidien-demenagement": [
    "La checklist du déménagement : résiliations, changements d'adresse, contrats, organismes à prévenir, dans le bon ordre.",
    "The moving checklist: cancellations, changes of address, contracts and organisations to notify, in the right order.",
  ],
  "quotidien-organisation": [
    "Une méthode simple pour centraliser et classer vos documents, suivre vos échéances et ne plus rien oublier.",
    "A simple method to centralise and file your documents, track deadlines and never forget anything again.",
  ],
  // MesDémarches Business
  "business-accueil": [
    "Un accompagnement de votre collaborateur avant et après son arrivée : logement, banque, santé, titre de séjour, installation.",
    "Support for your employee before and after arrival: housing, bank, health, residence permit, settling in.",
  ],
  "business-parcours": [
    "Un parcours étape par étape pour vos nouvelles recrues, avec des points de suivi et un interlocuteur dédié.",
    "A step-by-step path for your new hires, with follow-up points and a dedicated contact.",
  ],
  "business-guide": [
    "Un guide d'accueil à vos couleurs, adapté à votre ville et à vos process RH, remis à chaque collaborateur.",
    "A branded welcome guide tailored to your city and HR processes, given to every employee.",
  ],
  "business-individuel": [
    "Des rendez-vous individuels pour vos salariés, sur toutes leurs démarches personnelles, en français ou en anglais.",
    "One-to-one appointments for your employees on all their personal paperwork, in English or French.",
  ],
  "business-atelier": [
    "Une session collective (sur site ou en visio) sur les démarches essentielles en France, avec questions-réponses.",
    "A group session (on-site or online) on the essential procedures in France, with Q&A.",
  ],
  "business-diagnostic": [
    "Un audit de votre accueil actuel, des recommandations concrètes et un plan d'amélioration.",
    "A review of how you currently welcome employees, concrete recommendations and an improvement plan.",
  ],
};
