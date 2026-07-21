import { supabase } from "../lib/supabaseClient";

const rpc = async (name, params = {}) => {
  const { data, error } = await supabase.rpc(name, params);
  if (error) throw error;
  return data;
};

export const listAffiliateCoupons = async () => (await rpc("admin_list_affiliate_coupons")) || [];
export const listAffiliateSales = async () => (await rpc("admin_list_affiliate_sales")) || [];

export const createAffiliateCoupon = (values) => rpc("admin_create_affiliate_coupon", {
  p_affiliate_name: values.affiliate_name.trim(),
  p_code: values.code.trim().toUpperCase(),
  p_commission_type: values.commission_type,
  p_commission_value: Number(values.commission_value),
  p_status: values.status,
  p_expires_at: values.expires_at || null,
  p_usage_limit: values.usage_limit ? Number(values.usage_limit) : null,
});

export const updateAffiliateCoupon = (id, values) => rpc("admin_update_affiliate_coupon", {
  p_id: id,
  p_affiliate_name: values.affiliate_name.trim(),
  p_code: values.code.trim().toUpperCase(),
  p_commission_type: values.commission_type,
  p_commission_value: Number(values.commission_value),
  p_status: values.status,
  p_expires_at: values.expires_at || null,
  p_usage_limit: values.usage_limit ? Number(values.usage_limit) : null,
});

export const setAffiliateCouponStatus = (id, status) =>
  rpc("admin_set_affiliate_coupon_status", { p_id: id, p_status: status });
export const deleteAffiliateCoupon = (id) => rpc("admin_delete_affiliate_coupon", { p_id: id });
export const updateAffiliateSaleStatus = (id, status) =>
  rpc("admin_update_affiliate_sale_status", { p_sale_id: id, p_status: status });
