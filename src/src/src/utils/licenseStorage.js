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
    isActive: row.status === "active" && !expired,
  };
};

export async function getAccountLicense() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  const userId = sessionData.session?.user?.id;
  if (!userId) return null;

  // Actualiza automáticamente el estado cuando la fecha de vencimiento ya pasó.
  const { error: syncError } = await supabase.rpc("sync_my_license_expiration");
  if (syncError) {
    // Compatibilidad temporal si el SQL aún no se ha ejecutado.
    console.warn("No se pudo sincronizar el vencimiento de la licencia:", syncError.message);
  }

  const { data, error } = await supabase
    .from("account_licenses")
    .select("id,license_code,license_type,status,max_profiles,activated_at,expires_at")
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

  const { data, error } = await supabase.rpc("activate_license_code", {
    p_code: normalizedCode,
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.success) {
    throw new Error(result?.message || "El código no es válido o todavía no ha sido activado.");
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
