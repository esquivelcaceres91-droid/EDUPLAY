import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Mail,
  Menu,
  MessageSquare,
  MonitorSmartphone,
  Phone,
  Play,
  School,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../assets/landing/eduplay-logo.png";
import heroConversion from "../assets/landing/hero-conversion.png";
import { resolveSessionDestination } from "../utils/sessionDestination";
import { getInstitutionSession, hydrateInstitutionProgress } from "../utils/institutionStorage";
import { supabase } from "../lib/supabaseClient";
import "../styles/landing.css";

const EMPTY_CONTACT = { name: "", email: "", phone: "", inquiryType: "Familia", message: "", website: "" };
const CONTACT_TYPES = ["Familia", "Colegio", "Municipalidad", "ONG", "Afiliación", "Otro"];

const worldCards = [
  {
    title: "Comunicación y Lenguaje",
    image: "/worlds/language/official/language-world.png",
    text: "Lectura, escritura, expresión, gramática y comprensión con una aventura de biblioteca viva.",
    accent: "violet",
    route: "/explore/language",
  },
  {
    title: "Matemáticas",
    image: "/worlds/math/math-world.svg",
    text: "Números, operaciones, lógica y resolución de problemas mediante retos visuales.",
    accent: "cyan",
    route: "/explore/math",
  },
  {
    title: "Computación",
    image: "/assets/computer-world.png",
    text: "Habilidades digitales, tecnología, seguridad e ideas para el futuro.",
    accent: "blue",
    route: "/explore/computer",
  },
  {
    title: "Inglés",
    image: "/assets/english-world.png",
    text: "Vocabulario, escucha, lectura y práctica para aprender inglés jugando.",
    accent: "orange",
    route: "/explore/english",
  },
];

const valueBullets = [
  { icon: GraduationCap, text: "1.º a 6.º primaria" },
  { icon: Users, text: "Hasta 3 perfiles familiares" },
  { icon: ShieldCheck, text: "Seguro y sin anuncios" },
];

const conversionQuestions = [
  {
    icon: CalendarDays,
    question: "¿Mi hijo practicará con constancia?",
    answer: "EduPlay guía una lección diaria, retos cortos y recompensas para convertir el aprendizaje en hábito.",
  },
  {
    icon: Trophy,
    question: "¿Veré avance real?",
    answer: "Cada perfil guarda progreso, estrellas, racha y desbloqueos para que sepas qué está logrando.",
  },
  {
    icon: Gamepad2,
    question: "¿Se va a aburrir?",
    answer: "Cada mundo mezcla lecciones, juegos, evaluaciones, diplomas y personajes para mantener la motivación.",
  },
];

const howSteps = [
  ["1", "Crea tu cuenta", "Regístrate y deja lista la cuenta familiar."],
  ["2", "Elige tu licencia", "Semestral o anual, sin cambiar la lógica de compra existente."],
  ["3", "Crea perfiles", "Agrega hasta tres niños con su propio avance."],
  ["4", "Aprenden cada día", "Ingresan a sus mundos, practican y desbloquean nuevas aventuras."],
];

const benefits = [
  { icon: Sparkles, title: "Aprendizaje divertido", text: "Lecciones, juegos y recompensas que motivan todos los días." },
  { icon: MonitorSmartphone, title: "En todos tus dispositivos", text: "Funciona en computadora, tablet y celular sin perder diseño." },
  { icon: Trophy, title: "Logros visibles", text: "Estrellas, XP, racha, diplomas y progreso por perfil." },
  { icon: ShieldCheck, title: "Tranquilidad para padres", text: "Ambiente infantil, seguro y enfocado en aprender." },
];

const faqs = [
  ["¿Para qué edades está diseñado EduPlay?", "Para niños de primaria, con contenidos organizados por mundos, niveles y unidades progresivas."],
  ["¿Qué materias incluye?", "EduPlay incluye Comunicación y Lenguaje, Matemáticas, Computación e Inglés, según la licencia activa y los mundos disponibles."],
  ["¿Cuántos perfiles puedo crear?", "La licencia familiar permite crear hasta 3 perfiles de estudiantes dentro de una misma cuenta."],
  ["¿Se puede usar desde el celular?", "Sí. La experiencia está adaptada para computadora, tablet y celular."],
  ["¿Cómo se activa la licencia?", "Después de crear tu cuenta eliges el plan, realizas el pago y activas la licencia con tu código."],
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [restoringSession, setRestoringSession] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState(EMPTY_CONTACT);
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [contactSending, setContactSending] = useState(false);
  const videoRef = useRef(null);
  const contactSendingRef = useRef(false);

  const closeMenu = () => setMenuOpen(false);

  const closeVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setVideoOpen(false);
  }, []);

  const closeContact = useCallback(() => {
    if (contactSendingRef.current) return;
    setContactOpen(false);
    setContactStatus({ type: "", message: "" });
  }, []);

  const openContact = () => {
    closeMenu();
    setContactStatus({ type: "", message: "" });
    setContactOpen(true);
  };

  const setContactField = (field, value) => {
    setContactForm((current) => ({ ...current, [field]: value }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    if (contactSendingRef.current) return;
    const name = contactForm.name.trim();
    const email = contactForm.email.trim().toLowerCase();
    const message = contactForm.message.trim();
    if (!name || !email || !message) {
      setContactStatus({ type: "error", message: "Completa nombre, correo y mensaje." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactStatus({ type: "error", message: "Escribe un correo electrónico válido." });
      return;
    }
    contactSendingRef.current = true;
    setContactSending(true);
    setContactStatus({ type: "", message: "" });
    try {
      const { error } = await supabase.functions.invoke("send-institution-request", {
        body: { ...contactForm, name, email, message, requestType: "landing_contact", origin: "Formulario de contacto de la Landing" },
      });
      if (error) throw error;
      setContactForm(EMPTY_CONTACT);
      setContactStatus({ type: "success", message: "¡Mensaje enviado! Pronto nos pondremos en contacto contigo." });
    } catch (error) {
      console.error("No se pudo enviar el mensaje de contacto:", error);
      setContactStatus({ type: "error", message: "No pudimos enviar el mensaje. Inténtalo nuevamente." });
    } finally {
      contactSendingRef.current = false;
      setContactSending(false);
    }
  };

  useEffect(() => {
    if (!videoOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeVideo();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeVideo, videoOpen]);

  useEffect(() => {
    if (!contactOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeContact();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeContact, contactOpen]);

  const openExistingSession = async () => {
    if (restoringSession) return;
    setRestoringSession(true);
    closeMenu();
    try {
      if (getInstitutionSession()) {
        await hydrateInstitutionProgress();
        navigate("/home");
        return;
      }
      const destination = await resolveSessionDestination();
      navigate(destination === "/activate-license" ? "/login" : destination);
    } catch (error) {
      console.error("No se pudo restaurar la sesión:", error);
      navigate("/login");
    } finally {
      setRestoringSession(false);
    }
  };

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="#inicio" aria-label="EduPlay inicio" onClick={closeMenu}>
          <img src={logo} alt="EduPlay" />
        </a>

        <nav className={menuOpen ? "landing-nav is-open" : "landing-nav"} aria-label="Navegación principal">
          <a href="#que-es" onClick={closeMenu}>¿Qué es?</a>
          <a href="#como-funciona" onClick={closeMenu}>¿Cómo funciona?</a>
          <a href="#beneficios" onClick={closeMenu}>Beneficios</a>
          <a href="#planes" onClick={closeMenu}>Planes</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <button className="landing-access-button landing-contact-button" type="button" onClick={openContact}>
            <MessageSquare size={18} /> Contáctanos
          </button>
          <Link className="landing-access-button" to="/institution-access" onClick={closeMenu}>
            <School size={18} /> Ingresar como colegio o institución
          </Link>
          <button className="landing-access-button" type="button" onClick={openExistingSession} disabled={restoringSession}>
            {restoringSession ? "Comprobando sesión…" : "Iniciar sesión familiar"}
          </button>
        </nav>

        <button className="landing-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="landing-hero" id="inicio" style={{ "--landing-hero-bg": `url(${heroConversion})` }}>
        <div className="landing-hero-overlay" />
        <div className="landing-hero-content">
          <div className="landing-hero-copy">
            <span className="landing-kicker"><Sparkles /> Aprendizaje diario para primaria</span>
            <h1>Por menos de <strong>Q2 al día</strong>, tu hijo aprende jugando.</h1>
            <p>
              EduPlay convierte el estudio en una tutoría educativa diaria con Matemáticas,
              Inglés, Computación y Comunicación y Lenguaje: lecciones, juegos, retos y seguimiento por perfil.
            </p>
            <div className="landing-hero-actions">
              <Link className="landing-cta landing-cta-primary" to="/explore/home" onClick={closeMenu}>
                Explorar la plataforma <Play size={18} fill="currentColor" />
              </Link>
              <button className="landing-cta landing-cta-secondary" type="button" onClick={() => setVideoOpen(true)}>
                Ver cómo funciona <Play size={17} fill="currentColor" />
              </button>
            </div>
            <div className="landing-trust-row">
              {valueBullets.map(({ icon: Icon, text }) => (
                <span key={text}><Icon /> {text}</span>
              ))}
            </div>
          </div>

          <aside className="landing-price-card" aria-label="Precio diario aproximado">
            <div className="landing-price-icon"><CalendarDays /></div>
            <span>Ventaja familiar</span>
            <strong>Menos de Q2/día</strong>
            <p>Tu hijo puede practicar todos los días durante su licencia anual.</p>
            <a href="#planes">Ver planes <ArrowRight size={17} /></a>
          </aside>
        </div>
      </section>

      <section className="landing-proof-strip" aria-label="Resumen de EduPlay">
        <div><strong>4</strong><span>Mundos educativos</span></div>
        <div><strong>3</strong><span>Perfiles familiares</span></div>
        <div><strong>24/7</strong><span>Acceso desde casa</span></div>
        <div><strong>100%</strong><span>Responsive</span></div>
      </section>

      <section className="landing-section landing-worlds-section" id="mundos">
        <div className="landing-section-heading">
          <span>Nuestros mundos</span>
          <h2>¿Qué va a aprender tu hijo?</h2>
          <p>Cuatro experiencias con personalidad propia para que estudiar no se sienta como tarea.</p>
        </div>
        <div className="landing-world-grid">
          {worldCards.map((world) => (
            <article className={`landing-world-card landing-world-${world.accent}`} key={world.title}>
              <img src={world.image} alt={world.title} />
              <div>
                <h3>{world.title}</h3>
                <p>{world.text}</p>
                <Link to={world.route}>Explorar <ArrowRight size={17} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-question-section" id="que-es">
        <div className="landing-section-heading">
          <span>¿Qué es EduPlay?</span>
          <h2>Una plataforma pensada para padres que quieren avance, no solo entretenimiento.</h2>
        </div>
        <div className="landing-question-grid">
          {conversionQuestions.map(({ icon: Icon, question, answer }) => (
            <article className="landing-question-card" key={question}>
              <Icon />
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-how-section" id="como-funciona">
        <div className="landing-section-heading">
          <span>¿Cómo funciona?</span>
          <h2>De visita a estudiante activo en pocos pasos.</h2>
          <p>El flujo familiar actual se conserva completo: crear cuenta, licencia, perfiles y Home.</p>
        </div>
        <div className="landing-steps-grid">
          {howSteps.map(([number, title, text]) => (
            <article className="landing-step-card" key={number}>
              <b>{number}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-benefits-section" id="beneficios">
        <div className="landing-benefits-copy">
          <span>Beneficios</span>
          <h2>¿Por qué vale la pena pagar EduPlay?</h2>
          <p>
            Porque une práctica constante, progreso visible y motivación infantil en una experiencia segura.
            El niño juega, pero el objetivo siempre es aprender.
          </p>
          <Link className="landing-inline-cta" to="/create-account">Crear cuenta <ArrowRight size={18} /></Link>
        </div>
        <div className="landing-benefit-grid">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article className="landing-benefit-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-demo-section">
        <div className="landing-demo-card">
          <div>
            <span>Prueba sin compromiso</span>
            <h2>Explora EduPlay antes de comprar.</h2>
            <p>Abre el modo demostración y mira cómo se sienten los mundos, mapas y actividades.</p>
            <Link className="landing-cta landing-cta-primary" to="/explore/home">
              Probar ahora <Play size={18} fill="currentColor" />
            </Link>
          </div>
          <div className="landing-demo-mascot" aria-hidden="true">🦉</div>
          <aside>
            <strong>Modo demostración</strong>
            <p>Conoce la plataforma sin crear cuenta.</p>
          </aside>
        </div>
      </section>

      <section className="landing-section landing-audience-section">
        <article className="landing-audience-card landing-family-card">
          <div className="landing-audience-icon"><Users /></div>
          <span>Para familias</span>
          <h2>Acompaña su aprendizaje desde casa.</h2>
          <p>Crea perfiles, revisa su progreso y celebra cada logro juntos.</p>
          <a href="#planes">Ver planes familiares <ArrowRight size={17} /></a>
        </article>
        <article className="landing-audience-card landing-school-card">
          <div className="landing-audience-icon"><Building2 /></div>
          <span>Para instituciones</span>
          <h2>Lleva EduPlay a tu colegio o institución.</h2>
          <p>Acceso con código institucional, alumnos y administración desde el panel existente.</p>
          <Link to="/institution-info">Conocer más <ArrowRight size={17} /></Link>
        </article>
      </section>

      <section className="landing-section landing-plans-section" id="planes">
        <div className="landing-section-heading">
          <span>Planes familiares</span>
          <h2>Elige cómo empezar.</h2>
          <p>Los precios se mantienen como en el flujo actual de licencias.</p>
        </div>
        <div className="landing-plans-grid">
          <article className="landing-plan-card">
            <span>6 meses</span>
            <h3>Plan Semestral</h3>
            <div className="landing-plan-price">Q299</div>
            <p>Ideal para probar una etapa completa de aprendizaje.</p>
            <ul>
              <li><Check /> Hasta 3 perfiles infantiles</li>
              <li><Check /> Acceso durante 180 días</li>
              <li><Check /> Progreso, logros y recompensas</li>
            </ul>
            <Link to="/create-account">Comprar 6 meses</Link>
          </article>
          <article className="landing-plan-card landing-plan-featured">
            <div className="landing-plan-badge"><Star fill="currentColor" /> Recomendada</div>
            <span>Anual</span>
            <h3>Licencia Anual</h3>
            <div className="landing-plan-price">Q499</div>
            <p>La mejor opción para practicar todos los días por menos de Q2 al día.</p>
            <ul>
              <li><Check /> Hasta 3 perfiles infantiles</li>
              <li><Check /> Acceso durante 365 días</li>
              <li><Check /> Acceso a todos los mundos disponibles</li>
            </ul>
            <Link to="/create-account">Comprar anual</Link>
          </article>
        </div>
      </section>

      <section className="landing-section landing-faq-section" id="preguntas">
        <div className="landing-faq-copy">
          <span>Preguntas frecuentes</span>
          <h2>Resolvamos las dudas antes de comprar.</h2>
          <p>Todo lo importante para decidir con confianza.</p>
        </div>
        <div className="landing-faq-list">
          {faqs.map(([question, answer], index) => (
            <button
              className={openFaq === index ? "landing-faq-item is-open" : "landing-faq-item"}
              key={question}
              type="button"
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              <span>{question}<ChevronDown /></span>
              <p>{answer}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="landing-section landing-contact-section" id="contacto">
        <div>
          <span>¿Necesitas hablar con nosotros?</span>
          <h2>Te ayudamos a elegir el mejor acceso para tu familia, colegio o comunidad.</h2>
        </div>
        <button className="landing-cta landing-cta-secondary" type="button" onClick={openContact}>
          Contáctanos <MessageSquare size={18} />
        </button>
      </section>

      <section className="landing-final-cta">
        <HeartHandshake />
        <h2>¿Listo para que tu hijo aprenda todos los días?</h2>
        <p>Crea tu cuenta y empieza el flujo familiar actual sin cambiar ninguna funcionalidad.</p>
        <Link className="landing-cta landing-cta-primary" to="/create-account">
          Crear cuenta <ArrowRight size={19} />
        </Link>
      </section>

      <footer className="landing-footer">
        <img src={logo} alt="EduPlay" />
        <p>Explora • Aprende • Diviértete</p>
        <div className="landing-footer-links">
          <button type="button" onClick={openExistingSession} disabled={restoringSession}>Iniciar sesión</button>
          <Link to="/institution-info">Instituciones</Link>
          <a href="#preguntas">Preguntas frecuentes</a>
        </div>
        <small>© 2026 EduPlay. Hecho por José Esteban Esquivel.</small>
      </footer>

      {videoOpen && (
        <div className="landing-video-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeVideo(); }}>
          <section className="landing-video-modal" role="dialog" aria-modal="true" aria-label="Presentación de EduPlay">
            <button className="landing-video-close" type="button" onClick={closeVideo} aria-label="Cerrar video"><X /></button>
            <div className="landing-video-heading"><span>CONOCE EDUPLAY</span><h2>¿Qué es EduPlay?</h2></div>
            <video ref={videoRef} src="/assets/landing/eduplay-presentacion.mp4" controls playsInline preload="metadata" />
          </section>
        </div>
      )}

      {contactOpen && (
        <div className="landing-contact-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeContact(); }}>
          <section className="landing-contact-modal" role="dialog" aria-modal="true" aria-labelledby="landing-contact-title">
            <button className="landing-contact-close" type="button" onClick={closeContact} disabled={contactSending} aria-label="Cerrar formulario"><X /></button>
            <div className="landing-contact-heading">
              <span><MessageSquare /> CONTACTO EDUPLAY</span>
              <h2 id="landing-contact-title">¿Cómo podemos ayudarte?</h2>
              <p>Escríbenos y nuestro equipo responderá tu consulta.</p>
            </div>
            <form className="landing-contact-form" onSubmit={submitContact} noValidate>
              <label>
                <span>Nombre *</span>
                <div><Users /><input value={contactForm.name} onChange={(event) => setContactField("name", event.target.value)} maxLength={100} autoComplete="name" required /></div>
              </label>
              <label>
                <span>Correo electrónico *</span>
                <div><Mail /><input type="email" value={contactForm.email} onChange={(event) => setContactField("email", event.target.value)} maxLength={160} autoComplete="email" required /></div>
              </label>
              <div className="landing-contact-row">
                <label>
                  <span>Teléfono opcional</span>
                  <div><Phone /><input type="tel" value={contactForm.phone} onChange={(event) => setContactField("phone", event.target.value)} maxLength={40} autoComplete="tel" /></div>
                </label>
                <label>
                  <span>Tipo de consulta *</span>
                  <select value={contactForm.inquiryType} onChange={(event) => setContactField("inquiryType", event.target.value)}>
                    {CONTACT_TYPES.map((type) => <option key={type}>{type}</option>)}
                  </select>
                </label>
              </div>
              <label>
                <span>Mensaje *</span>
                <textarea value={contactForm.message} onChange={(event) => setContactField("message", event.target.value)} maxLength={2000} rows={5} required />
              </label>
              <label className="landing-contact-honeypot" aria-hidden="true">
                Sitio web
                <input tabIndex="-1" autoComplete="off" value={contactForm.website} onChange={(event) => setContactField("website", event.target.value)} />
              </label>
              {contactStatus.message && <div className={`landing-contact-status ${contactStatus.type}`} role="status">{contactStatus.message}</div>}
              <button className="landing-contact-submit" type="submit" disabled={contactSending}>
                <Send /> {contactSending ? "Enviando…" : "Enviar mensaje"}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
