import { supabase } from "../lib/supabaseClient";

const normalizeLicense = (row) => {
  if (!row) return null;
  const now = Date.now();
  const expiresAt = row.expires_at ? new Date(row.expires_at).getTime() : null;
  const expired = expiresAt != null && Number.isFinite(expiresAt) && expiresAt <= now;

  return {
    id: row.id,
    code: row.license_code || "",
    type: row.license_type || "family",
    status: expired ? "expired" : (row.status || "inactive"),
    maxProfiles: Number(row.max_profiles) || 0,
    activatedAt: row.activated_at || null,
    expiresAt: row.expires_at || null,
    durationDays: Number(row.duration_days) || null,
    isActive: row.status === "active" && !expired,
  };
};

export async function getAccountLicense() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data: rpcLicense, error: rpcError } = await supabase.rpc("get_my_account_license");
  if (!rpcError) {
    const normalizedRpcLicense = normalizeLicense(Array.isArray(rpcLicense) ? rpcLicense[0] : rpcLicense);
    if (normalizedRpcLicense?.durationDays) return normalizedRpcLicense;

    const { data: compatibleLicense, error: compatibleError } = await supabase
      .from("account_licenses")
      .select("id,license_code,license_type,status,max_profiles,duration_days,activated_at,expires_at")
      .eq("user_id", userId)
      .order("activated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!compatibleError && compatibleLicense) return normalizeLicense(compatibleLicense);
    return normalizedRpcLicense;
  }

  console.warn("No se pudo consultar get_my_account_license; usando lectura compatible:", rpcError.message);

  const { data, error } = await supabase
    .from("account_licenses")
    .select("id,license_code,license_type,status,max_profiles,duration_days,activated_at,expires_at")
    .eq("user_id", userId)
    .order("activated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return normalizeLicense(data);
}

export async function activateFamilyLicense(code) {
  const normalizedCode = String(code || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!normalizedCode) throw new Error("Escribe el código de tu licencia familiar.");

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user?.id) {
    throw userError || new Error("Debes iniciar sesión antes de activar una licencia.");
  }
  const activatingUserId = userData.user.id;

  const { data, error } = await supabase.rpc("activate_license_code", {
    p_code: normalizedCode,
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.success) {
    throw new Error(result?.message || "El código no es válido o todavía no ha sido activado.");
  }

  const { data: verifiedUserData, error: verifiedUserError } = await supabase.auth.getUser();
  if (verifiedUserError || verifiedUserData.user?.id !== activatingUserId) {
    throw verifiedUserError || new Error("La sesión cambió durante la activación. Inicia sesión nuevamente.");
  }

  const license = await getAccountLicense();
  window.dispatchEvent(new Event("eduplay:license-changed"));
  return license;
}

export async function requireActiveLicense() {
  const license = await getAccountLicense();
  if (!license?.isActive) {
    const error = new Error(
      license?.status === "expired"
        ? "Tu licencia EduPlay ha vencido."
        : license?.status === "revoked"
          ? "Tu licencia EduPlay fue revocada."
          : "Debes activar una licencia EduPlay antes de continuar.",
    );
    error.code = "LICENSE_REQUIRED";
    throw error;
  }
  return license;
}
