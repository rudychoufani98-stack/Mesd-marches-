import { ogImage, ogSize } from "@/lib/og";

export const alt = "MesDémarches — Your French paperwork, without the stress";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Foreigners & expats in France",
    title: "Your French paperwork, without the stress.",
    subtitle: "Residence permit, housing, banking, tax, health: a dedicated advisor supports you, in English or French.",
    badge: "Free discovery call",
  });
}
