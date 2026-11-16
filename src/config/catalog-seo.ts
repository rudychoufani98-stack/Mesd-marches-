import type { Locale } from "@/i18n";

/**
 * Référencement des pages catégories : titre et description pour Google, accroche,
 * et questions fréquentes (affichées sur la page et déclarées en données structurées FAQPage).
 * Indexé par identifiant de catégorie. La question « prix » est générée avec le prix réel du catalogue.
 */
type Faq = { q: string; a: string };
type CategorySeo = { title: string; description: string; lead: string; faq: Faq[] };

export const categorySeo: Record<string, Record<Locale, CategorySeo>> = {
  logement: {
    fr: {
      title: "Aide au logement pour étrangers : dossier de location, bail, achat immobilier",
      description:
        "Trouver un logement en France quand on est étranger ou expatrié : préparation du dossier locatif, garant et Visale, lecture du bail, étapes d'un achat immobilier. Conseiller dédié, prix fixe.",
      lead: "Dossier de location, garant, bail, achat : un conseiller vous accompagne pour vous loger en France, sans stress.",
      faq: [
        {
          q: "Comment louer un appartement en France sans garant français ?",
          a: "Plusieurs solutions existent, comme la garantie Visale ou un garant institutionnel. Nous identifions celle qui correspond à votre situation et préparons avec vous un dossier complet qui rassure les propriétaires.",
        },
        {
          q: "Pouvez-vous relire mon bail avant que je signe ?",
          a: "Oui. Nous lisons le bail et l'état des lieux avec vous : loyer, charges, dépôt de garantie, durée et préavis, pour que vous signiez en connaissance de cause.",
        },
      ],
    },
    en: {
      title: "Housing help for foreigners in France: rental file, lease, buying property",
      description:
        "Finding a home in France as a foreigner or expat: rental application file, guarantor and Visale, understanding your lease, steps to buy property. Dedicated advisor, fixed price.",
      lead: "Rental file, guarantor, lease, purchase: an advisor helps you find a home in France, stress-free.",
      faq: [
        {
          q: "How can I rent a flat in France without a French guarantor?",
          a: "Several options exist, such as the Visale guarantee or an institutional guarantor. We identify the one that fits your situation and prepare a complete file with you that reassures landlords.",
        },
        {
          q: "Can you review my lease before I sign?",
          a: "Yes. We go through the lease and inventory with you: rent, charges, deposit, term and notice period, so you sign with full knowledge.",
        },
      ],
    },
  },
  fiscalite: {
    fr: {
      title: "Aide déclaration d'impôts pour étrangers et expatriés en France",
      description:
        "Première déclaration de revenus en France, avis d'imposition, prélèvement à la source, revenus étrangers : un conseiller vous guide case par case. Accompagnement en français ou en anglais.",
      lead: "Première déclaration, avis d'impôt, prélèvement à la source : vos impôts en France enfin clairs.",
      faq: [
        {
          q: "Je déclare mes impôts en France pour la première fois, pouvez-vous m'aider ?",
          a: "Oui. Nous remplissons la déclaration avec vous, case par case, y compris vos revenus étrangers et votre situation de famille, et vous indiquons les justificatifs à conserver.",
        },
        {
          q: "Pouvez-vous m'expliquer mon avis d'imposition ?",
          a: "Oui. Nous lisons votre avis ligne par ligne : revenu imposable, taux, montant dû ou remboursé, échéances, et la marche à suivre en cas d'erreur.",
        },
      ],
    },
    en: {
      title: "Tax return help for foreigners and expats in France",
      description:
        "Your first French tax return, tax notice, withholding tax, foreign income: an advisor guides you box by box. Support in English or French.",
      lead: "First tax return, tax notice, withholding tax: your French taxes finally clear.",
      faq: [
        {
          q: "I'm filing my taxes in France for the first time. Can you help?",
          a: "Yes. We fill in the return with you, box by box, including your foreign income and family situation, and tell you which proofs to keep.",
        },
        {
          q: "Can you explain my tax notice?",
          a: "Yes. We read your notice line by line: taxable income, rate, amount due or refunded, deadlines, and what to do if there is a mistake.",
        },
      ],
    },
  },
  sante: {
    fr: {
      title: "Sécurité sociale, carte Vitale et ameli pour étrangers : accompagnement",
      description:
        "Inscription à l'Assurance Maladie, demande de carte Vitale, création du compte ameli, remboursements et mutuelle : un conseiller vous accompagne jusqu'à votre affiliation.",
      lead: "Sécurité sociale, carte Vitale, ameli, mutuelle : soyez couvert·e en France sans dossier refusé.",
      faq: [
        {
          q: "Comment s'inscrire à la Sécurité sociale quand on arrive en France ?",
          a: "La démarche dépend de votre situation (salarié, étudiant, autre). Nous identifions la bonne procédure, préparons la liste exacte des pièces et suivons votre dossier jusqu'à l'obtention de votre numéro.",
        },
        {
          q: "Combien de temps pour obtenir sa carte Vitale ?",
          a: "Les délais varient selon les caisses. Nous préparons une demande complète pour éviter tout retard, et vous expliquons comment être remboursé·e en attendant.",
        },
      ],
    },
    en: {
      title: "French social security, carte Vitale and ameli for foreigners: support",
      description:
        "Registering with French health insurance, applying for your carte Vitale, creating your ameli account, reimbursements and top-up insurance: an advisor supports you until you are covered.",
      lead: "Social security, carte Vitale, ameli, top-up insurance: get covered in France with no rejected file.",
      faq: [
        {
          q: "How do I register with French social security when I arrive?",
          a: "The process depends on your situation (employee, student, other). We identify the right procedure, prepare the exact list of documents and follow your file until you get your number.",
        },
        {
          q: "How long does it take to get a carte Vitale?",
          a: "Timeframes vary between local offices. We prepare a complete application to avoid delays, and explain how to get reimbursed in the meantime.",
        },
      ],
    },
  },
  banque: {
    fr: {
      title: "Ouvrir un compte bancaire en France quand on est étranger : accompagnement",
      description:
        "Ouverture de compte bancaire pour étrangers et expatriés, documents à fournir, frais, budget et crédit expliqués : un conseiller bilingue vous accompagne pas à pas.",
      lead: "Compte bancaire, frais, budget, crédit : reprenez la main sur vos finances en France.",
      faq: [
        {
          q: "Quels documents pour ouvrir un compte bancaire en France quand on est étranger ?",
          a: "En général, une pièce d'identité, un justificatif de domicile et parfois de revenus ou de statut. Nous établissons la liste exacte pour votre situation et vous orientons vers le type de banque adapté.",
        },
        {
          q: "Que faire si une banque refuse d'ouvrir mon compte ?",
          a: "Il existe une procédure de droit au compte gérée par la Banque de France. Nous vous expliquons comment l'activer et préparons le dossier avec vous.",
        },
      ],
    },
    en: {
      title: "Opening a bank account in France as a foreigner: support",
      description:
        "Bank account opening for foreigners and expats, documents required, fees, budget and credit explained: a bilingual advisor guides you step by step.",
      lead: "Bank account, fees, budget, credit: take control of your finances in France.",
      faq: [
        {
          q: "Which documents do I need to open a bank account in France as a foreigner?",
          a: "Usually ID, proof of address and sometimes proof of income or status. We draw up the exact list for your situation and point you to the right type of bank.",
        },
        {
          q: "What if a bank refuses to open my account?",
          a: "There is a 'right to an account' procedure run by the Banque de France. We explain how to use it and prepare the file with you.",
        },
      ],
    },
  },
  emploi: {
    fr: {
      title: "Emploi en France pour étrangers : CV, entretien, contrat, fiche de paie",
      description:
        "CV au format français, préparation d'entretien, contrat de travail, fiche de paie, inscription à France Travail : un conseiller vous accompagne dans votre vie professionnelle en France.",
      lead: "CV, entretien, contrat, fiche de paie : réussissez votre vie professionnelle en France.",
      faq: [
        {
          q: "Pouvez-vous adapter mon CV au marché du travail français ?",
          a: "Oui. Nous construisons avec vous un CV au format français qui met en valeur votre parcours international, et une lettre de motivation si besoin.",
        },
        {
          q: "Pouvez-vous m'expliquer ma fiche de paie ?",
          a: "Oui. Nous la lisons ligne par ligne : du brut au net, les cotisations, le prélèvement à la source et vos congés.",
        },
      ],
    },
    en: {
      title: "Working in France as a foreigner: CV, interview, contract, payslip",
      description:
        "French-style CV, interview preparation, employment contract, payslip, France Travail registration: an advisor supports your working life in France.",
      lead: "CV, interview, contract, payslip: succeed in your working life in France.",
      faq: [
        {
          q: "Can you adapt my CV to the French job market?",
          a: "Yes. We build a French-style CV with you that highlights your international background, plus a cover letter if needed.",
        },
        {
          q: "Can you explain my payslip?",
          a: "Yes. We read it line by line: from gross to net, contributions, withholding tax and your leave.",
        },
      ],
    },
  },
  immigration: {
    fr: {
      title: "Aide titre de séjour, renouvellement et naturalisation : accompagnement",
      description:
        "Préparation de votre dossier de titre de séjour, renouvellement, regroupement familial, nationalité française, courriers administratifs : un dossier complet, déposé dans les temps. En français ou en anglais.",
      lead: "Titre de séjour, renouvellement, nationalité : des dossiers complets, sans aller-retour avec la préfecture.",
      faq: [
        {
          q: "Pouvez-vous m'aider à préparer mon dossier de titre de séjour ?",
          a: "Oui. Nous identifions le titre adapté à votre situation, établissons la liste exacte des pièces, vérifions l'ensemble du dossier et vous guidons pour le dépôt en ligne sur l'ANEF.",
        },
        {
          q: "Quand faut-il demander le renouvellement de son titre de séjour ?",
          a: "La demande se fait plusieurs mois avant l'expiration, dans les délais indiqués par l'administration. Nous fixons avec vous le bon calendrier et préparons des pièces à jour pour que votre séjour ne soit jamais interrompu.",
        },
      ],
    },
    en: {
      title: "Residence permit, renewal and naturalisation help in France",
      description:
        "Preparing your residence permit file, renewal, family reunification, French nationality, official letters: a complete file, submitted on time. In English or French.",
      lead: "Residence permit, renewal, nationality: complete files, with no back-and-forth with the prefecture.",
      faq: [
        {
          q: "Can you help me prepare my residence permit file?",
          a: "Yes. We identify the permit that fits your situation, draw up the exact list of documents, check the whole file and guide you through online submission on ANEF.",
        },
        {
          q: "When should I apply to renew my residence permit?",
          a: "You apply several months before it expires, within the timeframe set by the administration. We plan the right timing with you and prepare up-to-date documents so your stay is never interrupted.",
        },
      ],
    },
  },
  quotidien: {
    fr: {
      title: "S'installer en France : premières démarches, contrats, déménagement",
      description:
        "Premières démarches après votre arrivée, accès aux services publics en ligne, électricité, internet, factures, déménagement : un plan d'installation clair avec un conseiller dédié.",
      lead: "Premières démarches, contrats, factures, déménagement : installez-vous en France sans rien oublier.",
      faq: [
        {
          q: "Quelles sont les premières démarches à faire en arrivant en France ?",
          a: "Cela dépend de votre situation, mais on commence généralement par l'adresse, le compte bancaire, la santé et vos accès en ligne. Nous vous donnons un plan clair, dans le bon ordre.",
        },
        {
          q: "Pouvez-vous m'aider à ouvrir l'électricité et internet ?",
          a: "Oui. Nous vous expliquons les étapes, les informations à préparer et les critères pour comparer les offres, pour une mise en service rapide.",
        },
      ],
    },
    en: {
      title: "Settling in France: first steps, contracts, moving home",
      description:
        "First steps after arriving, online public services, electricity, internet, bills, moving home: a clear settling-in plan with a dedicated advisor.",
      lead: "First steps, contracts, bills, moving: settle in France without forgetting anything.",
      faq: [
        {
          q: "What are the first steps when arriving in France?",
          a: "It depends on your situation, but you usually start with your address, bank account, health cover and online accounts. We give you a clear plan, in the right order.",
        },
        {
          q: "Can you help me set up electricity and internet?",
          a: "Yes. We explain the steps, the information to prepare and the criteria to compare offers, for a quick set-up.",
        },
      ],
    },
  },
  business: {
    fr: {
      title: "Relocation et accompagnement administratif des salariés internationaux",
      description:
        "MesDémarches Business : accueil et intégration administrative de vos collaborateurs étrangers en France (logement, banque, santé, titre de séjour), guide d'accueil, ateliers RH. Sur devis.",
      lead: "Accueillez vos talents internationaux : ils s'installent vite, vos équipes RH gagnent du temps.",
      faq: [
        {
          q: "Comment se passe l'accompagnement de nos collaborateurs internationaux ?",
          a: "Après un échange avec votre équipe RH, nous proposons un accompagnement adapté : rendez-vous individuels, parcours d'intégration, guide d'accueil ou ateliers, avec un interlocuteur unique.",
        },
        {
          q: "Intervenez-vous en anglais ?",
          a: "Oui, tous nos accompagnements sont disponibles en français et en anglais, en visio ou sur site.",
        },
      ],
    },
    en: {
      title: "Relocation and administrative support for international employees",
      description:
        "MesDémarches Business: welcoming and onboarding your foreign employees in France (housing, bank, health, residence permit), welcome guide, HR workshops. On quote.",
      lead: "Welcome your international talent: they settle in fast, your HR team saves time.",
      faq: [
        {
          q: "How does the support for our international employees work?",
          a: "After a call with your HR team, we propose tailored support: one-to-one appointments, onboarding path, welcome guide or workshops, with a single point of contact.",
        },
        {
          q: "Do you work in English?",
          a: "Yes, all our support is available in English and French, online or on-site.",
        },
      ],
    },
  },
};

export function getCategorySeo(id: string, locale: Locale): CategorySeo | undefined {
  return categorySeo[id]?.[locale];
}
