import { ArrowLeft, Check, LockKeyhole, Sparkles, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/public-explore.css";

const benefits = [
  "Lecciones completas", "Juegos y actividades interactivas", "Evaluaciones",
  "XP, estrellas y rachas", "Progreso guardado", "Recompensas y diplomas",
  "Hasta tres perfiles familiares",
];

export function PublicExploreFrame({ children }) {
  const exitExplore = () => {
    window.location.href = `${window.location.origin}/`;
  };
  return <div className="public-explore-frame">
    <div className="public-explore-bar">
      <span><Sparkles size={17} /> Modo exploración</span>
      <button type="button" onClick={exitExplore}><X size={18} /> Salir del recorrido</button>
    </div>
    {children}
  </div>;
}

export function PublicExploreUpsell({ compact = false }) {
  const navigate = useNavigate();
  return <section className={`public-explore-upsell ${compact ? "is-compact" : ""}`}>
    <div className="public-explore-lock"><LockKeyhole /></div>
    <span>VISTA PREVIA</span>
    <h1>🔒 Desbloquea EduPlay</h1>
    <p>Estás explorando una vista previa de nuestra plataforma. Adquiere una licencia para acceder a todas las lecciones, juegos, actividades y evaluaciones.</p>
    {!compact && <div className="public-explore-benefits">{benefits.map((item) => <span key={item}><Check /> {item}</span>)}</div>}
    <div className="public-explore-actions">
      <button type="button" onClick={() => navigate("/create-account")}>Adquirir una licencia</button>
      <button type="button" className="secondary" onClick={() => navigate("/create-account")}>Crear cuenta</button>
    </div>
    <button type="button" className="public-explore-return" onClick={() => navigate(-1)}><ArrowLeft /> Volver al recorrido</button>
  </section>;
}

export function PublicLessonPreview({ world: worldProp }) {
  const params = useParams();
  const world = worldProp || params.world || "english";
  return <PublicExploreFrame>
    <div className="public-lesson-preview">
      <div className={`public-lesson-content public-lesson-visual ${world}`} inert aria-hidden="true">
        <header><img src="/assets/logo.png" alt="" /><span>{world === "english" ? "English World · Colors" : "Mundo Computación · La computadora"}</span></header>
        <main><div className="public-lesson-stepper"><span className="done">1</span><i /><span>2</span><i /><span>3</span></div><article className="public-visual-card">
          <img src={world === "english" ? "/assets/maps/english-beginner/unit-colors.png" : "/assets/computer/maps/beginner/unit-computer.png"} alt="" />
          <div><small>LECCIÓN INTERACTIVA · UNIDAD {params.unit || "1"}</small><h2>{world === "english" ? "Colors in English" : "¿Qué es una computadora?"}</h2><p>Descubre nuevos conceptos con imágenes, audio, ejemplos y actividades interactivas.</p><div className="public-answer-grid"><span>Opción A</span><span>Opción B</span><span>Opción C</span></div><span className="public-visual-button">Continuar</span></div>
        </article></main>
      </div>
      <div className="public-lesson-shield" aria-label="Contenido bloqueado"><PublicExploreUpsell /></div>
    </div>
  </PublicExploreFrame>;
}

export function PublicLockedPage() {
  return <PublicExploreFrame><main className="public-locked-page"><PublicExploreUpsell /></main></PublicExploreFrame>;
}
