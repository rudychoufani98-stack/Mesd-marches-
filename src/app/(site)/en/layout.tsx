/** Pages en anglais : la langue du contenu est déclarée pour les lecteurs d'écran et les moteurs de recherche. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
