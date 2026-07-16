import { supabase } from "../lib/supabaseClient";

const ADMIN_EMAILS = new Set([
  "esquivelcaceres91@gmail.com",
]);

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

export async function getAdminAccess() {
  // getUser() valida la sesión actual contra Supabase y evita falsos negativos
  // durante la restauración inicial de la sesión persistida.
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError && !String(userError.message || "").toLowerCase().includes("session")) {
    throw userError;
  }

  const user = userData?.user || null;
  if (!user) return { user: null, isAdmin: false };

  // Acceso privado principal: solamente el correo del propietario.
  if (ADMIN_EMAILS.has(normalizeEmail(user.email))) {
    return { user, isAdmin: true };
  }

  // Compatibilidad con la tabla admin_users si después agregas más administradores.
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id,email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    // Una política RLS o una tabla aún no creada no debe sacar al propietario.
    console.warn("No se pudo consultar admin_users:", error.message);
    return { user, isAdmin: false };
  }

  return {
    user,
    isAdmin: Boolean(data) || ADMIN_EMAILS.has(normalizeEmail(data?.email)),
  };
}

export async function listLicenseCodes() {
  const { data, error } = await supabase.rpc("admin_list_license_codes");
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function generateLicenseCode(plan) {
  const { data, error } = await supabase.rpc("admin_generate_license", {
    p_plan: plan,
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.success) throw new Error(result?.message || "No se pudo generar la licencia.");
  return result;
}

export async function setLicenseAvailability(id, available) {
  const { data, error } = await supabase.rpc("admin_set_license_availability", {
    p_license_id: id,
    p_available: Boolean(available),
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.success) throw new Error(result?.message || "No se pudo actualizar el código.");
  return result;
}
export async function revokeAccountLicense(id) {
  const { data, error } = await supabase.rpc("admin_revoke_license", {
    p_license_id: id,
  });

  if (error) throw error;
  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.success) throw new Error(result?.message || "No se pudo revocar la licencia.");
  return result;
}
