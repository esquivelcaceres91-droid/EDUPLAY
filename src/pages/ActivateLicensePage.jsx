import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle,
} from "lucide-react";
import { activateFamilyLicense } from "../utils/licenseStorage";
import { getFamilyPaymentLink } from "../config/paymentConfig";
import { registerAffiliateSale } from "../utils/couponStorage";
import "../styles/access.css";

const normalizeCode = (value) => value.trim().toUpperCase().replace(/\s+/g, "");

export default function ActivateLicensePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = useMemo(() => {
    if (location.state?.selectedPlan) return location.state.selectedPlan;

    try {
      const savedPlan = sessionStorage.getItem("eduplay_selected_family_plan");
      return savedPlan ? JSON.parse(savedPlan) : null;
    } catch {
      return null;
    }
  }, [location.state]);

  const isAnnualPlan = selectedPlan?.id === "family-annual" || selectedPlan?.durationDays === 365;
  const planName = selectedPlan
    ? isAnnualPlan
      ? "Licencia Familiar Anual"
      : "Licencia Familiar 6 meses"
    : "Licencia Familiar";
  const planPrice = selectedPlan?.price || null;
  const planDuration = selectedPlan
    ? isAnnualPlan
      ? "12 meses"
      : "6 meses"
    : null;
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [activating, setActivating] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const normalizedCode = useMemo(() => normalizeCode(code), [code]);

  const activateLicense = async (event) => {
    event.preventDefault();

    if (!normalizedCode) {
      setStatus("error");
      setMessage("Escribe el código de tu licencia familiar.");
      return;
    }

    setActivating(true);
    setStatus("idle");
    setMessage("");

    try {
      const license = await activateFamilyLicense(normalizedCode);

      if (!license?.isActive) {
        throw new Error("No se pudo confirmar la licencia activa.");
      }

      localStorage.setItem("eduplay_license", JSON.stringify(license));
      setStatus("success");
      setMessage("¡Licencia activada! Ya puedes crear hasta 3 perfiles.");
    } catch (error) {
      console.error("No se pudo activar la licencia:", error);
      setStatus("error");
      setMessage(error?.message || "El código no es válido o ya fue utilizado.");
    } finally {
      setActivating(false);
    }
  };

  const goToProfiles = () => navigate("/create-profiles");

  const buySelectedPlan = async () => {
    if (purchasing) return;
    setPurchasing(true); setStatus("idle"); setMessage("");
    try {
      const hasPromo = Boolean(selectedPlan?.promo?.code);
      if (hasPromo) await registerAffiliateSale(selectedPlan.promo.code, selectedPlan.planType || (isAnnualPlan ? "annual" : "six_months"));
      window.location.assign(getFamilyPaymentLink(selectedPlan?.id || (isAnnualPlan ? "family-annual" : "family-6m"), hasPromo));
    } catch (error) {
      setStatus("error");
      setMessage(error?.message || "No se pudo validar el cupón antes de continuar al pago.");
      setPurchasing(false);
    }
  };

  return (
    <main className="access-screen license-activation-screen">
      <div className="stepper wide activation-stepper">
        <b className="done">✓<span>Crea tu cuenta</span></b>
        <b className="done">✓<span>Elige tu licencia</span></b>
        <b className="active">3<span>Activa tu licencia</span></b>
        <b>4<span>Crea perfiles</span></b>
      </div>

      <section className="activation-shell">
        <button className="activation-back" type="button" onClick={() => navigate(selectedPlan ? "/family-plans" : "/choose-license")}>
          <ArrowLeft /> Volver
        </button>

        <div className="activation-hero">
          <div className="activation-icon-wrap">
            <BadgeCheck />
          </div>
          <span className="activation-eyebrow"><Sparkles /> {planName.toUpperCase()}</span>
          <h1>{selectedPlan ? `Continúa con tu plan ${isAnnualPlan ? "anual" : "de 6 meses"}` : "Activa tu aventura EduPlay"}</h1>
          <p>
            {selectedPlan
              ? `Elegiste ${planName} por ${planPrice}. Puedes comprarlo ahora o activar un código que ya tengas.`
              : "Ingresa el código recibido después de tu compra para habilitar los mundos, diplomas y hasta 3 perfiles infantiles."}
          </p>
        </div>

        <div className="activation-grid">
          <article className="activation-card activation-code-card">
            <div className="activation-card-heading">
              <span><KeyRound /></span>
              <div>
                <small>YA TENGO LICENCIA</small>
                <h2>Escribe tu código</h2>
              </div>
            </div>

            <form onSubmit={activateLicense}>
              <label className="activation-code-field">
                <KeyRound />
                <input
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setStatus("idle");
                    setMessage("");
                  }}
                  placeholder="EDU-FAM-XXXX-XXXX"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Código de licencia"
                />
              </label>

              {message && (
                <div className={`activation-message ${status}`} role="status">
                  {status === "success" ? <CheckCircle2 /> : <XCircle />}
                  <span>{message}</span>
                </div>
              )}

              {status === "success" ? (
                <button className="activation-primary success" type="button" onClick={goToProfiles}>
                  Continuar a crear perfiles
                </button>
              ) : (
                <button className="activation-primary" type="submit" disabled={activating}>
                  <ShieldCheck /> {activating ? "Activando…" : "Activar licencia"}
                </button>
              )}
            </form>

            <div className="activation-demo-note">
              <strong>Código de prueba:</strong> EDU-FAM-2026-DEMO
            </div>
          </article>

          <article className="activation-card activation-buy-card">
            <div className="activation-card-heading">
              <span><CreditCard /></span>
              <div>
                <small>{selectedPlan ? "PLAN SELECCIONADO" : "¿AÚN NO TIENES LICENCIA?"}</small>
                <h2>{selectedPlan ? planName : "Compra la Licencia Familiar"}</h2>
              </div>
            </div>

            <div className="activation-price">
              {selectedPlan ? (
                <>
                  <strong>{planPrice}</strong>
                  <span>{planDuration} · hasta 3 perfiles</span>
                </>
              ) : (
                <>
                  <strong>Hasta 3</strong>
                  <span>perfiles infantiles</span>
                </>
              )}
            </div>

            <ul className="activation-benefits">
              <li><Users /> Progreso separado para cada niño</li>
              <li><CheckCircle2 /> English World y Computación</li>
              <li><CheckCircle2 /> Juegos, logros y diplomas</li>
              <li>{isAnnualPlan ? <Rocket /> : <CalendarDays />} {isAnnualPlan ? "Acceso a futuros mundos durante la vigencia" : selectedPlan ? "Acceso completo durante 6 meses" : "Acceso desde cualquier dispositivo"}</li>
            </ul>

            <button
              className="activation-buy-button"
              type="button"
              onClick={buySelectedPlan}
              disabled={purchasing}
            >
              <CreditCard /> {purchasing ? "Preparando pago…" : selectedPlan ? `Comprar ${isAnnualPlan ? "licencia anual" : "licencia de 6 meses"}` : "Comprar licencia familiar"}
            </button>

            <p className="activation-safe-note"><ShieldCheck /> El pago se realizará en una página segura.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
