import { ogImage, ogSize } from "@/lib/og";

export const alt = "MesDémarches — Vos démarches en France, sans le stress";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Étrangers & expatriés en France",
    title: "Vos démarches en France, sans le stress.",
    subtitle: "Titre de séjour, logement, banque, impôts, santé : un conseiller dédié vous accompagne, en français ou en anglais.",
    badge: "Appel découverte offert",
  });
}
