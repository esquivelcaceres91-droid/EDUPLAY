import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  Gamepad2,
  GraduationCap,
  Heart,
  Laptop,
  Menu,
  MonitorSmartphone,
  Play,
  School,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/landing/eduplay-logo.png";
import heroDark from "../assets/landing/hero-dark.png";
import "../styles/landing.css";

const benefits = [
  { icon: BookOpen, title: "Lecciones interactivas", text: "Contenido claro, divertido y adaptado para primaria." },
  { icon: Gamepad2, title: "Juegos y retos", text: "Aprenden jugando y se mantienen motivados cada día." },
  { icon: Trophy, title: "Recompensas", text: "Estrellas, medallas, logros y diplomas por su esfuerzo." },
  { icon: MonitorSmartphone, title: "En cualquier dispositivo", text: "Funciona en computadora, tablet y celular." },
];

const audiences = [
  { icon: Users, title: "Familias", text: "Una herramienta de aprendizaje y refuerzo desde casa." },
  { icon: GraduationCap, title: "Docentes", text: "Un apoyo práctico para complementar sus clases." },
  { icon: School, title: "Colegios", text: "Una solución educativa moderna para sus estudiantes." },
  { icon: Building2, title: "Municipalidades", text: "Educación digital de impacto para toda la comunidad." },
];

const faqs = [
  ["¿Para qué edades está diseñado EduPlay?", "Para niños de 1.º a 6.º primaria, con niveles que avanzan desde principiante hasta avanzado."],
  ["¿Qué materias incluye?", "Incluye dos mundos completos: Inglés y Computación, con lecciones, juegos, evaluaciones y recompensas."],
  ["¿Cuántos perfiles puedo crear?", "La licencia familiar permite crear hasta 3 perfiles de estudiantes dentro de una misma cuenta."],
  ["¿Se puede usar desde el celular?", "Sí. EduPlay está adaptado para computadora, tablet y celular."],
  ["¿Cómo se activa la licencia?", "Después de crear tu cuenta eliges el plan, realizas el pago y activas la licencia con tu código."],
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="#inicio" aria-label="EduPlay inicio">
          <img src={logo} alt="EduPlay" />
        </a>

        <nav className={menuOpen ? "landing-nav is-open" : "landing-nav"}>
          <a href="#que-es" onClick={closeMenu}>¿Qué es?</a>
          <a href="#como-funciona" onClick={closeMenu}>¿Cómo funciona?</a>
          <a href="#beneficios" onClick={closeMenu}>Beneficios</a>
          <a href="#planes" onClick={closeMenu}>Planes</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <Link className="landing-access-button" to="/institution-access" onClick={closeMenu}><School size={18} /> Ingresar como colegio o institución</Link>
          <Link className="landing-access-button" to="/login" onClick={closeMenu}>Iniciar sesión familiar</Link>
        </nav>

        <button className="landing-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="landing-hero-image" id="inicio" aria-label="EduPlay: Inglés y Computación por menos de Q1.99 al día">
        <div className="landing-hero-art">
          <img src={heroDark} alt="Niños aprendiendo Inglés y Computación con EduPlay" />

          <Link
            className="hero-hotspot hero-hotspot-create"
            to="/create-account"
            aria-label="Crear cuenta en EduPlay"
          />
          <a
            className="hero-hotspot hero-hotspot-how"
            href="#como-funciona"
            aria-label="Ver cómo funciona EduPlay"
          />
          <Link
            className="hero-hotspot hero-hotspot-plan-six"
            to="/create-account"
            aria-label="Elegir plan de 6 meses"
          />
          <Link
            className="hero-hotspot hero-hotspot-plan-year"
            to="/create-account"
            aria-label="Elegir plan anual"
          />
        </div>

        <div className="hero-mobile-actions">
          <Link className="primary-cta" to="/create-account">Crear cuenta <ArrowRight size={20} /></Link>
          <a className="secondary-cta" href="#como-funciona"><Play size={18} fill="currentColor" /> Ver cómo funciona</a>
        </div>
      </section>

      <section className="proof-strip">
        <div><strong>2</strong><span>Mundos educativos</span></div>
        <div><strong>1</strong><span>Lección diaria</span></div>
        <div><strong>3</strong><span>Perfiles familiares</span></div>
        <div><strong>100%</strong><span>Online y responsive</span></div>
      </section>

      <section className="section-block intro-section" id="que-es">
        <div className="section-kicker">CONOCE EDUPLAY</div>
        <h2>Mucho más que mirar una pantalla</h2>
        <p className="section-lead">EduPlay combina aprendizaje, práctica y diversión en una experiencia que motiva a los niños a avanzar todos los días.</p>
        <div className="world-grid">
          <article className="world-card english-world">
            <div className="world-icon"><BookOpen /></div>
            <div>
              <span className="world-label">Mundo</span>
              <h3>Inglés</h3>
              <p>Vocabulario, pronunciación, comprensión y retos adaptados a cada nivel.</p>
              <ul><li><Check /> Lecciones visuales</li><li><Check /> Práctica de pronunciación</li><li><Check /> Juegos y evaluaciones</li></ul>
            </div>
          </article>
          <article className="world-card computer-world">
            <div className="world-icon"><Laptop /></div>
            <div>
              <span className="world-label">Mundo</span>
              <h3>Computación</h3>
              <p>Fundamentos digitales, seguridad, herramientas y tecnología para el futuro.</p>
              <ul><li><Check /> Conocimiento digital</li><li><Check /> Internet seguro</li><li><Check /> Retos interactivos</li></ul>
            </div>
          </article>
        </div>
      </section>

      <section className="section-block how-section" id="como-funciona">
        <div className="section-kicker">FÁCIL DE EMPEZAR</div>
        <h2>En cuatro pasos comienza la aventura</h2>
        <div className="steps-grid">
          {[
            ["01", "Crea tu cuenta", "Regístrate con tu correo en pocos minutos."],
            ["02", "Elige tu plan", "Selecciona la licencia que más te convenga."],
            ["03", "Crea los perfiles", "Agrega hasta tres estudiantes a tu cuenta."],
            ["04", "Empieza a aprender", "Ingresa a Inglés o Computación y avanza cada día."],
          ].map(([number, title, text]) => (
            <article className="step-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="section-block benefits-section" id="beneficios">
        <div className="benefits-heading">
          <div><div className="section-kicker">APRENDIZAJE QUE MOTIVA</div><h2>Todo lo que tu hijo necesita para avanzar</h2></div>
          <p>Una experiencia diseñada para mantener la curiosidad, celebrar cada logro y convertir el estudio en un hábito positivo.</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="benefit-card" key={title}><div className="benefit-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <div className="security-banner"><ShieldCheck /><div><strong>Un espacio seguro para aprender</strong><p>Contenido educativo, perfiles protegidos y progreso guardado para que aprendan con tranquilidad.</p></div></div>
      </section>

      <section className="section-block audiences-section">
        <div className="section-kicker">PARA TODOS</div>
        <h2>EduPlay se adapta a cada comunidad</h2>
        <div className="audience-grid">
          {audiences.map(({ icon: Icon, title, text }) => (
            <article className="audience-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="section-block plans-section" id="planes">
        <div className="section-kicker">PLANES FAMILIARES</div>
        <h2>Una inversión pequeña para un aprendizaje enorme</h2>
        <p className="section-lead">Acceso completo a Inglés y Computación para hasta tres perfiles.</p>
        <div className="plans-grid">
          <article className="plan-card">
            <div className="plan-top"><span>6 meses</span><h3>Plan Semestral</h3></div>
            <div className="plan-price"><strong>Q299</strong><span>pago único</span></div>
            <ul><li><Check /> Inglés y Computación</li><li><Check /> Hasta 3 perfiles</li><li><Check /> Juegos, logros y diplomas</li><li><Check /> Acceso en PC, tablet y celular</li></ul>
            <Link to="/create-account" className="plan-button">Elegir plan</Link>
          </article>
          <article className="plan-card featured-plan">
            <div className="popular-badge"><Zap size={15} fill="currentColor" /> MÁS RECOMENDADO</div>
            <div className="plan-top"><span>1 año</span><h3>Plan Anual</h3></div>
            <div className="plan-price"><strong>Q499</strong><span>pago único</span></div>
            <ul><li><Check /> Inglés y Computación</li><li><Check /> Hasta 3 perfiles</li><li><Check /> Juegos, logros y diplomas</li><li><Check /> Acceso en PC, tablet y celular</li><li className="future-worlds-benefit"><Sparkles /> Acceso a futuros mundos: Matemáticas, Ciencias, Arte y más</li></ul>
            <Link to="/create-account" className="plan-button">Comenzar ahora</Link>
          </article>
        </div>
      </section>

      <section className="section-block faq-section" id="preguntas">
        <div className="faq-intro"><div className="section-kicker">PREGUNTAS FRECUENTES</div><h2>Todo claro antes de comenzar</h2><p>Estas son las dudas más comunes sobre EduPlay.</p></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <button className={openFaq === index ? "faq-item is-open" : "faq-item"} key={question} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
              <span className="faq-question">{question}<ChevronDown /></span>
              <span className="faq-answer">{answer}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="final-cta-section">
        <div className="cta-glow"></div>
        <div className="cta-content"><div className="cta-icon"><Heart fill="currentColor" /></div><h2>El mejor momento para empezar es hoy</h2><p>Regala a tu hijo una lección diaria de Inglés y Computación por menos de Q1.99 al día.</p><Link to="/create-account" className="final-cta-button">Crear cuenta ahora <ArrowRight /></Link></div>
      </section>

      <footer className="landing-footer">
        <img src={logo} alt="EduPlay" />
        <p>Explora • Aprende • Diviértete</p>
        <div className="footer-links"><Link to="/login">Iniciar sesión</Link><Link to="/institution-info">Instituciones</Link><a href="#preguntas">Preguntas frecuentes</a></div>
        <small>© 2026 EduPlay. Hecho por José Esteban Esquivel.</small>
      </footer>
    </main>
  );
}
