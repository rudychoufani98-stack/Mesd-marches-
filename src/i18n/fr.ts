/** Libellés de l'interface (hors contenus éditoriaux, qui seront traduits guide par guide). */
export const fr = {
  common: {
    skipToContent: "Aller au contenu",
    primaryCta: "Organiser mes démarches",
    login: "Connexion",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    mainNavigation: "Navigation principale",
    backToTop: "Retour en haut",
    readGuide: "Lire le guide",
    seeDetails: "Voir le détail",
    officialSources: "Sources officielles",
    lastVerified: "Dernière vérification",
    notVerifiedYet: "Pas encore vérifiée",
    draft: "Brouillon",
    progress: "Progression",
    print: "Imprimer ou enregistrer en PDF",
  },
  footer: {
    tagline: "Vos démarches, en toute simplicité.",
    rights: "Tous droits réservés.",
  },
} as const;

export type Dictionary = typeof fr;
