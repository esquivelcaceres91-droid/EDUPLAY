import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Gamepad2,
  Globe2,
  GraduationCap,
  KeyRound,
  Laptop2,
  Music2,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { FAMILY_PLANS, formatQuetzales } from "../config/paymentConfig";
import { normalizeCouponCode, validateAffiliateCoupon } from "../utils/couponStorage";
import "../styles/access.css";

const commonBenefits = [
  { icon: Users, text: "Hasta 3 perfiles infantiles" },
  { icon: Globe2, text: "English World" },
  { icon: Laptop2, text: "Mundo Computación" },
  { icon: Gamepad2, text: "Juegos educativos" },
  { icon: Award, text: "Logros, recompensas y diplomas" },
];

const futureWorlds = [
  { icon: BrainCircuit, text: "Matemáticas" },
  { icon: FlaskConical, text: "Ciencias Naturales" },
  { icon: Globe2, text: "Ciencias Sociales" },
  { icon: BookOpen, text: "Lectura y Escritura" },
  { icon: Palette, text: "Arte" },
  { icon: Music2, text: "Música" },
  { icon: GraduationCap, text: "Programación Infantil" },
];

export default function FamilyPlansPage() {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState(() => sessionStorage.getItem("eduplay_applied_promo_code") || "");
  const [promoResults, setPromoResults] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);

  const plans = useMemo(
    () => [
      {
        id: "family-6m",
        label: "LICENCIA FAMILIAR",
        title: "6 meses",
        price: "Q299",
        duration: "Acceso durante 6 meses",
        durationDays: 180,
        featured: false,
      },
      {
        id: "family-annual",
        label: "LICENCIA FAMILIAR",
        title: "Anual",
        price: "Q499",
        duration: "Acceso durante 12 meses",
        durationDays: 365,
        featured: true,
      },
    ],
    [],
  );

  const applyPromo = async (event) => {
    event?.preventDefault();
    const normalized = normalizeCouponCode(promoCode);
    if (!normalized) { setPromoMessage("Escribe un código de cupón."); return; }
    setApplyingPromo(true); setPromoMessage("");
    try {
      const [sixMonths, annual] = await Promise.all([
        validateAffiliateCoupon(normalized, "six_months"),
        validateAffiliateCoupon(normalized, "annual"),
      ]);
      if (!sixMonths?.valid || !annual?.valid) throw new Error(sixMonths?.message || annual?.message || "Cupón no válido.");
      setPromoCode(normalized);
      setPromoResults({ "family-6m": sixMonths, "family-annual": annual });
      sessionStorage.setItem("eduplay_applied_promo_code", normalized);
      setPromoMessage("¡Cupón aplicado correctamente!");
    } catch (error) {
      setPromoResults(null); sessionStorage.removeItem("eduplay_applied_promo_code");
      setPromoMessage(error?.message || "El cupón no es válido o ya venció.");
    } finally { setApplyingPromo(false); }
  };

  useEffect(() => {
    const timer = promoCode && !promoResults ? window.setTimeout(applyPromo, 0) : null;
    return () => { if (timer) window.clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removePromo = () => {
    setPromoCode(""); setPromoResults(null); setPromoMessage("");
    sessionStorage.removeItem("eduplay_applied_promo_code");
  };

  const choosePlan = (plan) => {
    const promo = promoResults?.[plan.id];
    const config = FAMILY_PLANS[plan.id];
    const selection = {
      id: plan.id,
      licenseType: "family",
      durationDays: plan.durationDays,
      price: promo?.valid ? formatQuetzales(promo.final_price) : plan.price,
      title: plan.title,
      planType: config.planType,
      promo: promo?.valid ? { code: normalizeCouponCode(promoCode), discountPercent: Number(promo.discount_percent), originalPrice: Number(promo.original_price), savings: Number(promo.savings), finalPrice: Number(promo.final_price) } : null,
    };

    sessionStorage.setItem("eduplay_selected_family_plan", JSON.stringify(selection));
    navigate("/activate-license", { state: { selectedPlan: selection } });
  };

  return (
    <main className="access-screen family-plans-screen">
      <div className="stepper wide family-plans-stepper">
        <b className="done">✓<span>Crea tu cuenta</span></b>
        <b className="active">2<span>Elige tu licencia</span></b>
        <b>3<span>Crea perfiles</span></b>
        <b>4<span>¡Comienza!</span></b>
      </div>

      <section className="family-plans-shell">
        <button
          className="family-plans-back"
          type="button"
          onClick={() => navigate("/choose-license")}
        >
          <ArrowLeft /> Volver
        </button>

        <header className="family-plans-heading">
          <span><Sparkles /> PLANES FAMILIARES</span>
          <h1>Elige el plan ideal para tu familia</h1>
          <p>Todos los planes incluyen acceso completo a EduPlay para hasta 3 estudiantes.</p>
        </header>

        <div className="family-plans-grid">
          {plans.map((plan) => (
            <article
              className={`family-plan-card ${plan.featured ? "featured" : ""}`}
              key={plan.id}
            >
              {plan.featured && (
                <div className="family-plan-ribbon"><Star /> RECOMENDADA</div>
              )}

              <div className="family-plan-topline">
                <span>{plan.label}</span>
                <div className="family-plan-icon">
                  {plan.featured ? <Rocket /> : <CalendarDays />}
                </div>
              </div>

              <h2>{plan.title}</h2>
              <p className="family-plan-duration">
                {plan.featured ? <Sparkles /> : <Clock3 />}
                {plan.duration}
              </p>

              <ul className="family-plan-benefits">
                {commonBenefits.map(({ icon: Icon, text }) => (
                  <li key={text}><Icon /> <span>{text}</span></li>
                ))}
              </ul>

              {plan.featured && (
                <div className="future-worlds-box">
                  <div className="future-worlds-title">
                    <Rocket />
                    <div>
                      <strong>Acceso a futuros mundos</strong>
                      <small>Incluidos mientras tu licencia esté vigente</small>
                    </div>
                  </div>
                  <div className="future-worlds-grid">
                    {futureWorlds.map(({ icon: Icon, text }) => (
                      <span key={text}><Icon /> {text}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="family-plan-price">
                <small>{plan.featured ? "Más contenido por menos" : "Precio del plan"}</small>
                {promoResults?.[plan.id]?.valid ? <>
                  <span className="family-plan-old-price">{formatQuetzales(promoResults[plan.id].original_price, 0)}</span>
                  <strong>{formatQuetzales(promoResults[plan.id].final_price)}</strong>
                  <em>Ahorras {formatQuetzales(promoResults[plan.id].savings)} ({promoResults[plan.id].discount_percent}%)</em>
                </> : <strong>{plan.price}</strong>}
              </div>

              <form className={`family-coupon-box ${promoResults ? "is-applied" : ""}`} onSubmit={applyPromo}>
                <label htmlFor={`promo-${plan.id}`}>¿Tienes un cupón?</label>
                <div>
                  <input id={`promo-${plan.id}`} value={promoCode} onChange={(event) => { setPromoCode(event.target.value); if (promoResults) { setPromoResults(null); sessionStorage.removeItem("eduplay_applied_promo_code"); } setPromoMessage(""); }} placeholder="Escribe tu código" autoComplete="off" />
                  <button type="submit" disabled={applyingPromo}>{applyingPromo ? "Validando…" : "Aplicar"}</button>
                </div>
                {promoMessage && <p className={promoResults ? "success" : "error"}><span>{promoMessage}{promoResults && <> · <strong>{normalizeCouponCode(promoCode)}</strong></>}</span>{promoResults && <button type="button" onClick={removePromo} aria-label="Quitar cupón"><X size={14} /> Quitar</button>}</p>}
              </form>

              <button
                className="family-plan-buy"
                type="button"
                onClick={() => choosePlan(plan)}
              >
                {plan.featured ? <Star /> : <CheckCircle2 />}
                Comprar {plan.title === "Anual" ? "licencia anual" : "6 meses"}
              </button>
            </article>
          ))}
        </div>

        <button
          className="family-have-code"
          type="button"
          onClick={() => navigate("/activate-license")}
        >
          <KeyRound />
          <span><strong>Ya tengo un código de licencia</strong><small>Activar mi código</small></span>
        </button>

        <div className="family-trust-row">
          <span><ShieldCheck /> Pago seguro</span>
          <span><Users /> Hasta 3 perfiles</span>
          <span><CheckCircle2 /> Acceso completo desde el inicio</span>
        </div>
      </section>
    </main>
  );
}
