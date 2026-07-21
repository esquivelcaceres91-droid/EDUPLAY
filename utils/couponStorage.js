import { supabase } from "../lib/supabaseClient";

export const normalizeCouponCode = (value) => String(value || "").trim().toUpperCase();

export async function validateAffiliateCoupon(code, planType) {
  const { data, error } = await supabase.rpc("validate_affiliate_coupon", {
    p_code: normalizeCouponCode(code),
    p_plan_type: planType,
  });
  if (error) throw error;
  return data;
}

export async function registerAffiliateSale(code, planType) {
  const { data, error } = await supabase.rpc("register_affiliate_sale", {
    p_code: normalizeCouponCode(code),
    p_plan_type: planType,
  });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.message || "No se pudo registrar la compra.");
  return data;
}
