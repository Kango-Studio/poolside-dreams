import { supabase } from "@/lib/supabase";

export async function getVerifiedTotpFactor() {
  const { data, error } = await supabase.auth.mfa.listFactors();
  if (error) throw error;
  return data.totp[0] ?? null;
}

export async function needsMfaChallenge(): Promise<boolean> {
  const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) throw error;
  return data.nextLevel === "aal2" && data.currentLevel !== data.nextLevel;
}

export async function startTotpEnrollment() {
  // Clear out any abandoned unverified attempts first so retries don't pile
  // up unverified factors.
  const { data: existing, error: listError } = await supabase.auth.mfa.listFactors();
  if (listError) throw listError;
  const unverified = existing.all.filter(
    (f) => f.factor_type === "totp" && f.status === "unverified",
  );
  for (const factor of unverified) {
    await supabase.auth.mfa.unenroll({ factorId: factor.id });
  }

  const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
  if (error) throw error;
  return data;
}

export async function confirmTotpEnrollment(factorId: string, code: string) {
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) throw error;
}

export async function verifyLoginChallenge(factorId: string, code: string) {
  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId, code });
  if (error) throw error;
}

export async function removeFactor(factorId: string) {
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) throw error;
}
