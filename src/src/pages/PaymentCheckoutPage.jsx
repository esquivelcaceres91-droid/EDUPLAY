import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  ExternalLink,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import "../styles/access.css";

const CHECKOUTS = {
  "family-6m": {
    id: "family-6m",
    title: "Licencia Familiar · 6 meses",
    price: "Q299",
    duration: "180 días",
    url: "https://app.recurrente.com/s/estedup/o/o_p9pgeyvs",
  },
  "family-annual": {
    id: "family-annual",
    title: "Licencia Familiar · Anual",
    price: "Q499",
    duration: "365 días",
    url: "https://app.recurrente.com/s/estedup/o/o_66vvl7ne",
  },
};

export default function PaymentCheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  const plan = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const queryPlan = params.get("plan");

    if (queryPlan && CHECKOUTS[queryPlan]) return CHECKOUTS[queryPlan];

    try {
      const saved = JSON.parse(
        sessionStorage.getItem("eduplay_selected_family_plan") || "null",
      );
      return CHECKOUTS[saved?.id] || CHECKOUTS["family-6m"];
    } catch {
      return CHECKOUTS["family-6m"];
    }
  }, [location.search]);

  return (
    <main className="access-screen embedded-payment-screen">
      <section className="embedded-payment-shell">
        <header className="embedded-payment-header">
          <button type="button" onClick={() => navigate(-1)}>
            <ArrowLeft /> Volver
          </button>

          <div className="embedded-payment-brand">
            <strong>EduPlay</strong>
            <span>Pago protegido</span>
          </div>

          <div className="embedded-payment-secure">
            <ShieldCheck /> Pago seguro
          </div>
        </header>

        <div className="embedded-payment-summary">
          <div>
            <small>PLAN SELECCIONADO</small>
            <h1>{plan.title}</h1>
            <p>{plan.duration} · hasta 3 perfiles</p>
          </div>
          <strong>{plan.price}</strong>
        </div>

        <div className="embedded-checkout-card">
          <div className="embedded-checkout-label">
            <CreditCard /> Pago procesado de forma segura por Recurrente
          </div>

          {!loaded && (
            <div className="embedded-checkout-loading">
              <LoaderCircle />
              <span>Cargando formulario de pago…</span>
            </div>
          )}

          <iframe
            className={`embedded-checkout-frame ${loaded ? "is-loaded" : ""}`}
            src={plan.url}
            title={`Pago ${plan.title}`}
            onLoad={() => setLoaded(true)}
            allow="payment *; clipboard-read; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="embedded-payment-footer">
          <span><ShieldCheck /> Tus datos están protegidos</span>
          <button
            type="button"
            onClick={() => window.open(plan.url, "_blank", "noopener,noreferrer")}
          >
            <ExternalLink /> Abrir pago en una pestaña nueva
          </button>
        </div>
      </section>
    </main>
  );
}
