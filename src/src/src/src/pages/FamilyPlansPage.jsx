import { useMemo } from "react";
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
} from "lucide-react";
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

  const choosePlan = (plan) => {
    const selection = {
      id: plan.id,
      licenseType: "family",
      durationDays: plan.durationDays,
      price: plan.price,
      title: plan.title,
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
                <strong>{plan.price}</strong>
              </div>

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
