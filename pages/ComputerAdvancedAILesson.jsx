import "../styles/computer-ai-unit.css";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Database,
  Heart,
  Monitor,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";

const lessons = [
  {
    title: "¿Qué es la inteligencia artificial?",
    text: "La inteligencia artificial permite que una computadora reconozca patrones, aprenda con ejemplos y ayude a tomar decisiones.",
    detail: "La encontramos en asistentes virtuales, mapas, recomendaciones, traductores y herramientas como ChatGPT.",
    icon: BrainCircuit,
  },
  {
    title: "La IA aprende con datos",
    text: "Los datos son ejemplos que ayudan a una inteligencia artificial a distinguir objetos, palabras, sonidos o situaciones.",
    detail: "Mientras mejores y más variados sean los ejemplos, mejores pueden ser sus resultados.",
    icon: Database,
  },
  {
    title: "Uso responsable de la IA",
    text: "La inteligencia artificial puede equivocarse y no debe recibir contraseñas ni información privada.",
    detail: "Las personas deben revisar sus respuestas y usarla como una ayuda, no como un reemplazo del pensamiento humano.",
    icon: ShieldCheck,
  },
];

export default function ComputerAdvancedAILesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const lesson = lessons[index];
  const Icon = lesson.icon;
  const progress = useMemo(
    () => Math.round(((index + 1) / lessons.length) * 100),
    [index]
  );

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const stop = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  const speak = () => {
    stop();
    const speech = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.text}. ${lesson.detail}`
    );
    speech.lang = "es-GT";
    speech.rate = 0.9;
    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => setSpeaking(false);
    window.speechSynthesis?.speak(speech);
  };

  const next = () => {
    stop();
    if (index < lessons.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    navigate("/computer/advanced/unit/2/activity");
  };

  return (
    <main className="ai-screen">
      <header className="ai-topbar">
        <div className="ai-nav">
          <button onClick={() => navigate("/computer/advanced")}>
            <ArrowLeft size={21} /> <span>Volver</span>
          </button>
          <button onClick={() => navigate("/computer")}>
            <Monitor size={20} /> <span>Mundo</span>
          </button>
        </div>

        <div className="ai-heading">
          <span>Computación · Avanzado</span>
          <strong>Unidad 2: Inteligencia Artificial</strong>
        </div>

        <div className="ai-hearts">
          {[1, 2, 3].map((n) => (
            <Heart key={n} size={22} fill="currentColor" />
          ))}
        </div>
      </header>

      <section className="ai-shell">
        <motion.article
          className="ai-card ai-lesson-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="ai-progress-row">
            <span>Lección {index + 1} de {lessons.length}</span>
            <strong>{progress}%</strong>
          </div>
          <div className="ai-progress"><motion.div animate={{ width: `${progress}%` }} /></div>

          <div className="ai-lesson-layout">
            <motion.div className="ai-brain-stage" key={index}>
              <div className="ai-ring ai-ring-one" />
              <div className="ai-ring ai-ring-two" />
              <div className="ai-brain-core"><Icon size={112} /></div>
              <Sparkles className="ai-spark ai-spark-one" size={28} />
              <Sparkles className="ai-spark ai-spark-two" size={24} />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="ai-lesson-copy"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
              >
                <span className="ai-label">Conocimiento digital</span>
                <h1>{lesson.title}</h1>
                <p>{lesson.text}</p>
                <div className="ai-info-box">
                  <strong>Idea importante</strong>
                  <span>{lesson.detail}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="ai-actions">
            <button className="ai-secondary" onClick={speaking ? stop : speak}>
              {speaking ? <><Volume2 size={20} /> Detener</> : <><Play size={20} fill="currentColor" /> Escuchar</>}
            </button>
            <button className="ai-primary" onClick={next}>
              {index < lessons.length - 1 ? "Siguiente" : "Entrenar la IA"}
              <ArrowRight size={21} />
            </button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
