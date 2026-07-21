export const FAMILY_PLANS = {
  "family-6m": {
    id: "family-6m",
    planType: "six_months",
    title: "6 meses",
    durationDays: 180,
    originalPrice: 299,
    discountPercent: 5,
    paymentLinks: {
      normal: "https://app.recurrente.com/s/estedup/o/o_p9pgeyvs",
      discounted: "https://app.recurrente.com/s/estedup/o/o_3ee17xp0",
    },
  },
  "family-annual": {
    id: "family-annual",
    planType: "annual",
    title: "Anual",
    durationDays: 365,
    originalPrice: 499,
    discountPercent: 10,
    paymentLinks: {
      normal: "https://app.recurrente.com/s/estedup/o/o_66vvl7ne",
      discounted: "https://app.recurrente.com/s/estedup/o/o_7edslqjn",
    },
  },
};

export const formatQuetzales = (value, decimals = 2) =>
  `Q${Number(value).toLocaleString("es-GT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

export const getFamilyPlan = (id) => FAMILY_PLANS[id] || FAMILY_PLANS["family-6m"];

export const getFamilyPaymentLink = (id, discounted = false) => {
  const plan = getFamilyPlan(id);
  return plan.paymentLinks[discounted ? "discounted" : "normal"];
};
