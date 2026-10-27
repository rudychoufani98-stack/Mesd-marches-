"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { isRateLimited } from "@/lib/forms/rate-limit";
import { createSessionClient } from "@/lib/supabase/server";

/**
 * Double authentification (2FA) de l'espace admin : code à 6 chiffres d'une application
 * d'authentification (Google Authenticator, Microsoft Authenticator, 1Password…), via Supabase MFA.
 *
 * Une fois activée, elle est exigée à chaque connexion, côté site (requireAdmin)
 * ET côté base de données (fonction is_admin, migration « 2FA admin »).
 */

export type MfaState = { error?: string; qrCode?: string; secret?: string; factorId?: string; done?: boolean };

const codeSchema = z.string().trim().regex(/^\d{6}$/, "Le code contient 6 chiffres.");

/** Étape 1 de l'activation : crée le facteur et renvoie le QR code à scanner. */
export async function startTotpEnrollment(): Promise<MfaState> {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");

  // Nettoie un facteur commencé mais jamais validé (sinon Supabase refuse un nouvel enrôlement).
  const { data: factors } = await supabase.auth.mfa.listFactors();
  for (const f of factors?.all ?? []) {
    if (f.factor_type === "totp" && f.status !== "verified") await supabase.auth.mfa.unenroll({ factorId: f.id });
  }

  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: `MesDémarches admin ${Date.now()}` });
  if (error || !data) {
    console.error("[admin] activation 2FA impossible", error?.code);
    return { error: "Activation impossible. Vérifiez que l'authentification à deux facteurs (TOTP) est activée dans Supabase." };
  }
  return { qrCode: data.totp.qr_code, secret: data.totp.secret, factorId: data.id };
}

/** Étape 2 de l'activation : valide le premier code (la session passe en niveau 2FA). */
export async function confirmTotpEnrollment(_prev: MfaState, formData: FormData): Promise<MfaState> {
  const factorId = String(formData.get("factorId") ?? "");
  const code = codeSchema.safeParse(formData.get("code"));
  const keep = { qrCode: String(formData.get("qrCode") ?? ""), secret: String(formData.get("secret") ?? ""), factorId };
  if (!code.success) return { ...keep, error: code.error.issues[0].message };
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");
  if (isRateLimited(`mfa-enroll:${user.id}`)) return { ...keep, error: "Trop d'essais. Patientez 10 minutes." };
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: code.data });
  if (error) return { ...keep, error: "Code incorrect. Vérifiez l'heure de votre téléphone et réessayez." };
  return { done: true };
}

/** À chaque connexion : vérifie le code 2FA puis ouvre l'espace admin. */
export async function verifyTotpLogin(_prev: MfaState, formData: FormData): Promise<MfaState> {
  const code = codeSchema.safeParse(formData.get("code"));
  if (!code.success) return { error: code.error.issues[0].message };
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");
  if (isRateLimited(`mfa-login:${user.id}`)) return { error: "Trop d'essais. Patientez 10 minutes avant de réessayer." };
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const factor = factors?.totp.find((f) => f.status === "verified");
  if (!factor) redirect("/admin");
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code: code.data });
  if (error) return { error: "Code incorrect. Réessayez avec le code affiché actuellement." };
  redirect("/admin");
}
