import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";
import "../styles/access.css";

const PAYMENT_LINKS = {
  "family-6m": "https://app.recurrente.com/s/estedup/o/o_p9pgeyvs",
  "family-annual": "https://app.recurrente.com/s/estedup/o/o_66vvl7ne",
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = useMemo(() => {
    if (location.state?.selectedPlan) return location.state.selectedPlan;

    try {
      const saved = sessionStorage.getItem("eduplay_selected_family_plan");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, [location.state]);

  const isAnnual = selectedPlan?.id === "family-annual" || selectedPlan?.durationDays === 365;
  const paymentUrl = isAnnual ? PAYMENT_LINKS["family-annual"] : PAYMENT_LINKS["family-6m"];
  const planLabel = isAnnual ? "Licencia Familiar Anual" : "Licencia Familiar 6 meses";
  const planPrice = isAnnual ? "Q499" : "Q299";

  return (
    <main className="access-screen recurrente-checkout-screen">
      <section className="recurrente-checkout-shell">
        <header className="recurrente-checkout-header">
          <button type="button" className="recurrente-checkout-back" onClick={() => navigate("/activate-license", { state: { selectedPlan } })}>
            <ArrowLeft /> Volver
          </button>

          <div className="recurrente-checkout-title">
            <span><ShieldCheck /> PAGO SEGURO</span>
            <h1>Completa tu pago</h1>
            <p>{planLabel} · <strong>{planPrice}</strong></p>
          </div>
        </header>

        <div className="recurrente-checkout-frame-wrap">
          <div className="recurrente-checkout-secure-note">
            <LockKeyhole /> Pago procesado de forma segura por Recurrente
          </div>

          <iframe
            className="recurrente-checkout-frame"
            src={paymentUrl}
            title={`Pago ${planLabel}`}
            allow="payment *; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />

          <div className="recurrente-checkout-fallback">
            <span>Si el formulario no aparece dentro de EduPlay, abre la página segura de pago.</span>
            <button type="button" onClick={() => window.open(paymentUrl, "_blank", "noopener,noreferrer")}>
              Abrir pago seguro <ExternalLink />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
