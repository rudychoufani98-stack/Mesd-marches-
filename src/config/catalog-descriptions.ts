/**
 * Description de chaque service, indexée par identifiant : [français, anglais].
 * Format : 1re ligne = la promesse ; lignes suivantes = ce que le client obtient (affiché en liste).
 */
const d = (fr: string[], en: string[]): [string, string] => [fr.join("\n"), en.join("\n")];

export const serviceDescriptions: Record<string, [string, string]> = {
  // ------------------------------------------------------------ Immobilier & logement
  "logement-recherche": d(
    ["On cadre votre recherche pour trouver plus vite, sans perdre votre temps ni votre argent.", "Votre budget et vos critères définis", "Les bons quartiers et les sites fiables", "Vos alertes en place, les arnaques repérées"],
    ["We frame your search so you find faster, without wasting time or money.", "Your budget and criteria defined", "The right neighbourhoods and reliable websites", "Your alerts set up, scams spotted"],
  ),
  "logement-dossier-locatif": d(
    ["On construit avec vous le dossier qui rassure les propriétaires et sort du lot.", "La liste exacte des pièces à fournir", "Une solution de garantie adaptée (garant, Visale)", "Un dossier relu, prêt à envoyer"],
    ["We build the file that reassures landlords and stands out.", "The exact list of documents to provide", "A suitable guarantee (guarantor, Visale)", "A reviewed file, ready to send"],
  ),
  "logement-bail": d(
    ["On lit votre bail avec vous pour que vous signiez en sachant exactement à quoi vous vous engagez.", "Loyer, charges et dépôt de garantie expliqués", "Durée, préavis et état des lieux clarifiés", "Les points à vérifier avant de signer"],
    ["We go through your lease with you so you sign knowing exactly what you commit to.", "Rent, charges and deposit explained", "Term, notice and inventory clarified", "What to check before signing"],
  ),
  "logement-achat": d(
    ["On vous donne une vision claire de votre achat, de l'offre jusqu'aux clés.", "Les étapes et le calendrier de l'achat", "Le rôle du notaire, de la banque et de l'agence", "Les frais à prévoir, sans mauvaise surprise"],
    ["We give you a clear view of your purchase, from offer to keys.", "The steps and timeline of a purchase", "The role of the notary, bank and agency", "The costs to expect, with no surprises"],
  ),
  "logement-rentabilite": d(
    ["On vous apprend à lire et à vérifier les chiffres d'un investissement locatif.", "Rendement brut et net expliqués", "Charges, vacance et fiscalité pris en compte", "Les bonnes questions à poser avant d'investir"],
    ["We teach you to read and check the figures of a rental investment.", "Gross and net yield explained", "Charges, vacancy and tax taken into account", "The right questions to ask before investing"],
  ),
  "logement-financement": d(
    ["On prépare avec vous un dossier de financement complet et convaincant, avant de rencontrer les banques.", "La liste des justificatifs attendus", "Vos revenus et votre apport bien présentés", "Vos questions prêtes pour les rendez-vous"],
    ["We prepare a complete, convincing financing file with you before you meet the banks.", "The list of supporting documents expected", "Your income and deposit well presented", "Your questions ready for the meetings"],
  ),
  "logement-rdv-bancaire": d(
    ["Vous arrivez à votre rendez-vous bancaire préparé·e et sûr·e de vous.", "La checklist des documents à apporter", "Les questions à poser à votre conseiller", "De quoi comparer les réponses des banques"],
    ["You arrive at your bank meeting prepared and confident.", "The checklist of documents to bring", "The questions to ask your adviser", "What you need to compare banks' answers"],
  ),

  // ------------------------------------------------------------ Fiscalité & impôts
  "fiscalite-premiere-declaration": d(
    ["On remplit votre première déclaration ensemble, case par case, sans stress.", "Vos revenus français et étrangers bien déclarés", "Votre situation de famille prise en compte", "La liste des justificatifs à garder"],
    ["We fill in your first tax return together, box by box, stress-free.", "Your French and foreign income correctly declared", "Your family situation taken into account", "The list of proofs to keep"],
  ),
  "fiscalite-avis": d(
    ["On décrypte votre avis d'impôt ligne par ligne pour que tout soit clair.", "Le calcul de votre impôt expliqué", "Les montants dus ou remboursés et les dates", "La marche à suivre en cas d'erreur"],
    ["We decode your tax notice line by line so everything is clear.", "How your tax is calculated, explained", "Amounts due or refunded, and the dates", "What to do if there is a mistake"],
  ),
  "fiscalite-espace-fiscal": d(
    ["On crée et on configure votre espace impots.gouv avec vous, en toute sécurité.", "Votre compte créé et sécurisé", "Vos documents fiscaux retrouvés", "Les fonctions utiles prises en main"],
    ["We create and set up your impots.gouv account with you, safely.", "Your account created and secured", "Your tax documents found", "The useful features mastered"],
  ),
  "fiscalite-prelevement": d(
    ["On vous explique votre taux de prélèvement et comment l'ajuster quand votre vie change.", "Votre taux actuel compris", "La méthode pour le modifier ou l'individualiser", "Les bons réflexes en cas de changement de revenus"],
    ["We explain your withholding rate and how to adjust it when life changes.", "Your current rate understood", "How to change or split it", "The right moves when your income changes"],
  ),
  "fiscalite-changement": d(
    ["On fait le point sur les démarches à faire après un changement de vie, pour éviter les oublis et les pénalités.", "La liste des démarches selon votre situation", "Les conséquences sur vos impôts expliquées", "Les dates à respecter"],
    ["We review the steps to take after a life change, to avoid oversights and penalties.", "The list of steps for your situation", "The effects on your taxes explained", "The deadlines to meet"],
  ),
  "fiscalite-documents": d(
    ["On met de l'ordre dans vos papiers fiscaux pour que vous retrouviez tout en un instant.", "Ce qu'il faut garder, et combien de temps", "Un classement simple, papier et numérique", "Vos échéances fiscales de l'année"],
    ["We bring order to your tax papers so you can find anything in seconds.", "What to keep, and for how long", "A simple filing system, paper and digital", "Your tax deadlines for the year"],
  ),

  // ------------------------------------------------------------ Santé & assurances
  "sante-assurance-maladie": d(
    ["On vous accompagne jusqu'à votre affiliation à la Sécurité sociale, sans dossier refusé.", "La démarche adaptée à votre statut", "La liste exacte des pièces à fournir", "Un dossier relu et un suivi jusqu'à votre numéro"],
    ["We support you until you are registered with social security, with no rejected file.", "The right process for your status", "The exact list of documents to provide", "A reviewed file and follow-up until you get your number"],
  ),
  "sante-carte-vitale": d(
    ["On prépare avec vous la demande de carte Vitale, pour l'obtenir au plus vite.", "Votre demande faite pas à pas", "Photo et justificatifs conformes", "Comment vous faire rembourser en attendant"],
    ["We prepare your carte Vitale application with you, to get it as fast as possible.", "Your application made step by step", "Compliant photo and proofs", "How to get reimbursed in the meantime"],
  ),
  "sante-ameli": d(
    ["On crée votre compte ameli avec vous et on vous montre tout ce qu'il permet.", "Votre compte créé et sécurisé", "Vos attestations et remboursements à portée de main", "Votre médecin traitant déclaré"],
    ["We create your ameli account with you and show you everything it can do.", "Your account created and secured", "Your certificates and reimbursements at hand", "Your GP declared"],
  ),
  "sante-remboursements": d(
    ["On vous explique ce que la Sécurité sociale rembourse, pour éviter les mauvaises surprises.", "Le parcours de soins et le médecin traitant", "Les taux de remboursement et le tiers payant", "Ce qui reste à votre charge"],
    ["We explain what social security covers, so you avoid bad surprises.", "The care pathway and your GP", "Reimbursement rates and third-party payment", "What you pay yourself"],
  ),
  "sante-complementaire": d(
    ["On vous apprend à comprendre et comparer les mutuelles, pour choisir en connaissance de cause.", "Le fonctionnement d'une complémentaire santé", "Comment lire un tableau de garanties", "Les critères pour comparer les offres"],
    ["We teach you to understand and compare top-up insurers, so you choose with full knowledge.", "How top-up health insurance works", "How to read a table of cover", "The criteria to compare offers"],
  ),
  "sante-assurances": d(
    ["On fait le point sur les assurances dont vous avez vraiment besoin en France.", "Les assurances obligatoires selon votre situation", "Celles qui sont utiles, et celles qui ne le sont pas", "Les points à vérifier dans un contrat"],
    ["We review the insurance you really need in France.", "The compulsory insurance for your situation", "What is useful, and what is not", "What to check in a policy"],
  ),

  // ------------------------------------------------------------ Banque & finances personnelles
  "banque-ouverture": d(
    ["On vous aide à ouvrir votre compte bancaire rapidement, même sans historique en France.", "Les documents à réunir", "Le type de banque adapté à votre situation", "Votre recours en cas de refus (droit au compte)"],
    ["We help you open your bank account quickly, even without a French history.", "The documents to gather", "The type of bank suited to your situation", "Your recourse if refused (right to an account)"],
  ),
  "banque-services": d(
    ["On vous rend votre banque simple : frais, cartes, virements, tout devient clair.", "Les frais bancaires expliqués", "Cartes, virements et prélèvements maîtrisés", "Les services utiles, et ceux à éviter"],
    ["We make your bank simple: fees, cards, transfers, everything becomes clear.", "Bank fees explained", "Cards, transfers and direct debits mastered", "The useful services, and those to avoid"],
  ),
  "banque-rdv": d(
    ["Vous arrivez chez votre conseiller bancaire préparé·e, avec les bonnes questions.", "Vos questions adaptées à votre situation", "Les documents à apporter", "Un rendez-vous court et efficace"],
    ["You arrive at your bank adviser prepared, with the right questions.", "Questions tailored to your situation", "The documents to bring", "A short, effective meeting"],
  ),
  "banque-releve": d(
    ["On lit votre relevé avec vous pour que chaque ligne soit claire.", "Chaque opération et libellé expliqués", "Les prélèvements et frais identifiés", "Les paiements suspects repérés"],
    ["We read your statement with you so every line is clear.", "Every transaction and label explained", "Direct debits and fees identified", "Suspicious payments spotted"],
  ),
  "banque-budget": d(
    ["On construit avec vous un budget simple pour reprendre la main sur vos finances.", "Vos revenus et dépenses mis à plat", "Les postes à surveiller", "Une méthode pour épargner chaque mois"],
    ["We build a simple budget with you to take back control of your finances.", "Your income and spending laid out", "The items to watch", "A method to save every month"],
  ),
  "banque-credit": d(
    ["On vous explique le crédit pour que vous puissiez lire une offre de prêt sans vous faire piéger.", "Taux, TAEG et assurance emprunteur expliqués", "Comment lire et comparer une offre de prêt", "Les pièges à éviter"],
    ["We explain credit so you can read a loan offer without being caught out.", "Rate, APR and borrower insurance explained", "How to read and compare a loan offer", "The pitfalls to avoid"],
  ),

  // ------------------------------------------------------------ Emploi & vie professionnelle
  "emploi-cv": d(
    ["On transforme votre parcours en un CV qui parle aux recruteurs français.", "Un CV au format français", "Votre expérience internationale mise en valeur", "Une lettre de motivation si besoin"],
    ["We turn your background into a CV that speaks to French recruiters.", "A French-style CV", "Your international experience highlighted", "A cover letter if needed"],
  ),
  "emploi-entretien": d(
    ["On vous prépare à l'entretien pour que vous arriviez confiant·e et convaincant·e.", "Les questions fréquentes en France", "Votre parcours présenté avec impact", "Une simulation d'entretien"],
    ["We prepare you for the interview so you arrive confident and convincing.", "Common interview questions in France", "Your background presented with impact", "A mock interview"],
  ),
  "emploi-contrat": d(
    ["On lit votre contrat de travail avec vous pour que vous sachiez exactement ce que vous signez.", "Type de contrat et période d'essai expliqués", "Horaires, salaire et congés clarifiés", "Les clauses à surveiller"],
    ["We read your employment contract with you so you know exactly what you sign.", "Contract type and probation explained", "Hours, salary and leave clarified", "The clauses to watch"],
  ),
  "emploi-fiche-paie": d(
    ["On décrypte votre fiche de paie pour que vous compreniez enfin votre salaire.", "Du brut au net, ligne par ligne", "Les cotisations et l'impôt expliqués", "Vos congés et les documents à garder"],
    ["We decode your payslip so you finally understand your salary.", "From gross to net, line by line", "Contributions and tax explained", "Your leave and the documents to keep"],
  ),
  "emploi-france-travail": d(
    ["On vous inscrit sereinement à France Travail et on vous prépare au premier rendez-vous.", "Votre inscription faite pas à pas", "Les documents à fournir", "Vos droits et obligations expliqués"],
    ["We get you registered with France Travail calmly and prepare your first meeting.", "Your registration done step by step", "The documents to provide", "Your rights and obligations explained"],
  ),
  "emploi-droits": d(
    ["On vous explique les grandes règles du travail en France pour que vous sachiez où vous en êtes.", "Horaires, congés et arrêts maladie", "Ce qui se passe à la fin d'un contrat", "Les démarches à faire, et quand"],
    ["We explain the main rules of work in France so you know where you stand.", "Hours, leave and sick leave", "What happens at the end of a contract", "The steps to take, and when"],
  ),

  // ------------------------------------------------------------ Immigration & démarches administratives
  "immigration-installation": d(
    ["On organise vos premières semaines en France pour que tout se fasse dans le bon ordre.", "Vos démarches prioritaires identifiées", "Un plan clair, semaine par semaine", "Les comptes essentiels à créer"],
    ["We organise your first weeks in France so everything happens in the right order.", "Your priority steps identified", "A clear plan, week by week", "The essential accounts to create"],
  ),
  "immigration-titre-sejour": d(
    ["On prépare avec vous un dossier de titre de séjour complet, sans aller-retour avec la préfecture.", "Le titre adapté à votre situation", "La liste exacte des pièces à fournir", "Un dossier vérifié et déposé en ligne (ANEF)"],
    ["We prepare a complete residence permit file with you, with no back-and-forth with the prefecture.", "The permit that matches your situation", "The exact list of documents to provide", "A checked file submitted online (ANEF)"],
  ),
  "immigration-renouvellement": d(
    ["On anticipe votre renouvellement pour que votre séjour ne soit jamais interrompu.", "Le bon calendrier pour déposer", "Des pièces à jour et vérifiées", "Les documents qui prouvent que votre demande est en cours"],
    ["We plan your renewal ahead so your stay is never interrupted.", "The right time to apply", "Up-to-date, checked documents", "The papers proving your application is in progress"],
  ),
  "immigration-regroupement": d(
    ["On vous guide dans le regroupement familial pour réunir votre famille en France.", "Les étapes et le calendrier", "Les conditions de logement et de ressources", "Un dossier complet et organisé"],
    ["We guide you through family reunification to bring your family to France.", "The steps and timeline", "The housing and income conditions", "A complete, organised file"],
  ),
  "immigration-nationalite": d(
    ["On vous accompagne vers la nationalité française avec un dossier solide et un entretien préparé.", "La voie d'accès adaptée à votre situation", "Les pièces et traductions rassemblées", "Une préparation complète à l'entretien"],
    ["We support you towards French nationality with a strong file and a prepared interview.", "The route that matches your situation", "Documents and translations gathered", "Full preparation for the interview"],
  ),
  "immigration-courrier": d(
    ["On lit votre courrier administratif avec vous et on vous dit exactement quoi faire.", "Ce qui vous est demandé, en clair", "Le délai pour répondre", "La réponse et les pièces à préparer"],
    ["We read your official letter with you and tell you exactly what to do.", "What is being asked, in plain words", "The deadline to reply", "The reply and documents to prepare"],
  ),
  "immigration-dossier": d(
    ["On organise votre dossier administratif pour qu'il soit complet dès le premier dépôt.", "L'inventaire de toutes les pièces", "Les traductions nécessaires identifiées", "Un dossier classé et vérifié"],
    ["We organise your administrative file so it is complete from the first submission.", "An inventory of every document", "The required translations identified", "A sorted, checked file"],
  ),

  // ------------------------------------------------------------ Vie quotidienne & installation
  "quotidien-premieres-demarches": d(
    ["On vous dit quoi faire en premier pour vous installer sereinement.", "Ce qui est urgent, ce qui peut attendre", "Un plan d'installation personnalisé", "Les premiers comptes à ouvrir"],
    ["We tell you what to do first so you settle in calmly.", "What is urgent, what can wait", "A personalised settling-in plan", "The first accounts to open"],
  ),
  "quotidien-services-publics": d(
    ["On crée avec vous vos accès aux services publics en ligne, en toute sécurité.", "FranceConnect, Service-Public, ameli, impots.gouv, CAF", "Vos identifiants créés et sécurisés", "La prise en main de chaque site"],
    ["We set up your access to online public services with you, safely.", "FranceConnect, Service-Public, ameli, impots.gouv, CAF", "Your logins created and secured", "How to use each website"],
  ),
  "quotidien-factures": d(
    ["On décrypte vos factures pour que vous payiez le juste prix.", "Abonnement et consommation expliqués", "Échéancier et régularisation compris", "Les économies possibles repérées"],
    ["We decode your bills so you pay the right price.", "Subscription and usage explained", "Payment schedule and adjustments understood", "Possible savings spotted"],
  ),
  "quotidien-contrats": d(
    ["On vous aide à mettre en place vos contrats du quotidien, vite et sans erreur.", "Électricité, gaz, internet et téléphone", "Les informations à préparer", "Les critères pour comparer les offres"],
    ["We help you set up your everyday contracts, quickly and without mistakes.", "Electricity, gas, internet and phone", "The information to prepare", "The criteria to compare offers"],
  ),
  "quotidien-demenagement": d(
    ["On organise votre déménagement pour que vous n'oubliiez rien.", "La checklist complète, dans le bon ordre", "Les contrats à résilier ou transférer", "Les organismes à prévenir de votre nouvelle adresse"],
    ["We organise your move so you forget nothing.", "The full checklist, in the right order", "The contracts to cancel or transfer", "The organisations to notify of your new address"],
  ),
  "quotidien-organisation": d(
    ["On met en place avec vous un système simple pour gérer vos papiers sans effort.", "Tous vos documents centralisés", "Un classement facile à tenir", "Vos échéances suivies, plus aucun oubli"],
    ["We set up a simple system with you to manage your paperwork effortlessly.", "All your documents centralised", "A filing system that is easy to keep up", "Your deadlines tracked, nothing forgotten"],
  ),

  // ------------------------------------------------------------ MesDémarches Business
  "business-accueil": d(
    ["Vos collaborateurs internationaux s'installent vite et sereinement, et sont opérationnels plus tôt.", "Un accompagnement avant et après l'arrivée", "Logement, banque, santé, titre de séjour", "Un interlocuteur unique pour le salarié"],
    ["Your international employees settle in quickly and calmly, and are productive sooner.", "Support before and after arrival", "Housing, bank, health, residence permit", "A single contact for the employee"],
  ),
  "business-parcours": d(
    ["Un parcours d'intégration administratif clair, identique pour chaque nouvelle recrue.", "Les étapes définies avec votre équipe RH", "Des points de suivi réguliers", "Un reporting simple"],
    ["A clear administrative onboarding path, the same for every new hire.", "Steps defined with your HR team", "Regular follow-up points", "Simple reporting"],
  ),
  "business-guide": d(
    ["Un guide d'accueil à vos couleurs, que vos collaborateurs gardent tout au long de leur installation.", "Adapté à votre ville et à vos process", "En français et en anglais", "Mis à jour quand les règles changent"],
    ["A branded welcome guide your employees keep throughout their move.", "Tailored to your city and processes", "In English and French", "Updated when the rules change"],
  ),
  "business-individuel": d(
    ["Vos salariés disposent d'un conseiller dédié pour toutes leurs démarches personnelles.", "Des rendez-vous individuels", "Toutes les démarches couvertes", "En français ou en anglais"],
    ["Your employees get a dedicated advisor for all their personal paperwork.", "One-to-one appointments", "Every procedure covered", "In English or French"],
  ),
  "business-atelier": d(
    ["Une session collective pour donner à vos équipes les clés des démarches en France.", "Sur site ou en visio", "Un contenu adapté à vos collaborateurs", "Un temps de questions-réponses"],
    ["A group session giving your teams the keys to French paperwork.", "On-site or online", "Content tailored to your employees", "A Q&A session"],
  ),
  "business-diagnostic": d(
    ["On analyse votre accueil des talents internationaux et on vous dit comment l'améliorer.", "Un état des lieux de vos pratiques", "Des recommandations concrètes", "Un plan d'action priorisé"],
    ["We review how you welcome international talent and tell you how to improve it.", "An assessment of your practices", "Concrete recommendations", "A prioritised action plan"],
  ),
};
