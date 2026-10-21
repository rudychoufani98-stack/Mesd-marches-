import { describe, expect, it } from "vitest";
import { appointmentSchema, contactSchema } from "./schemas";

const contact = {
  name: "Camille",
  email: "camille@example.com",
  subject: "question",
  message: "Bonjour, j'ai une question sur vos services.",
  consent: "on",
};

describe("contactSchema", () => {
  it("accepte un message valide", () => {
    expect(contactSchema.safeParse(contact).success).toBe(true);
  });
  it("refuse un e-mail invalide", () => {
    expect(contactSchema.safeParse({ ...contact, email: "pas-un-email" }).success).toBe(false);
  });
  it("refuse sans consentement", () => {
    expect(contactSchema.safeParse({ ...contact, consent: undefined }).success).toBe(false);
  });
  it("refuse si le champ piège est rempli", () => {
    expect(contactSchema.safeParse({ ...contact, website: "spam" }).success).toBe(false);
  });
  it("refuse un message trop long", () => {
    expect(contactSchema.safeParse({ ...contact, message: "a".repeat(2001) }).success).toBe(false);
  });
  it("supprime les espaces superflus", () => {
    const r = contactSchema.safeParse({ ...contact, name: "  Camille  " });
    expect(r.success && r.data.name).toBe("Camille");
  });
});

describe("appointmentSchema", () => {
  const appt = {
    name: "Sam",
    email: "sam@example.com",
    offer: "bilan",
    mode: "visio",
    slots: ["matin"],
    consent: "on",
  };
  it("accepte une demande valide", () => {
    expect(appointmentSchema.safeParse(appt).success).toBe(true);
  });
  it("refuse une offre inconnue", () => {
    expect(appointmentSchema.safeParse({ ...appt, offer: "premium" }).success).toBe(false);
  });
  it("exige au moins une disponibilité", () => {
    expect(appointmentSchema.safeParse({ ...appt, slots: [] }).success).toBe(false);
  });
});
