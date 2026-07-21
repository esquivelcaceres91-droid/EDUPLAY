import "../styles/computer-advanced-unit.css";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Cog,
  Cpu,
  Heart,
  Monitor,
  Play,
  Radar,
  Volume2,
} from "lucide-react";

const roboticsLessons = [
  {
    id: 1,
    badge: "Lección 1",
    title: "¿Qué es un robot?",
    description:
      "Un robot es una máquina programable que puede realizar tareas siguiendo instrucciones.",
    detailTitle: "Los robots ayudan a las personas",
    detailText:
      "Pueden trabajar en fábricas, hospitales, hogares, laboratorios y lugares peligrosos.",
    icon: Bot,
  },
  {
    id: 2,
    badge: "Lección 2",
    title: "Sensores, cerebro y motores",
    description:
      "Los sensores detectan el entorno, el procesador toma decisiones y los motores producen movimiento.",
    detailTitle: "Cada parte tiene una función",
    detailText:
      "Un robot necesita recibir información, procesarla y actuar para completar una misión.",
    icon: Radar,
  },
  {
    id: 3,
    badge: "Lección 3",
    title: "Programar instrucciones",
    description:
      "Programar significa escribir órdenes claras y ordenadas para controlar lo que hará el robot.",
    detailTitle: "Una orden incorrecta cambia el resultado",
    detailText:
      "El robot ejecuta exactamente las instrucciones recibidas, por eso debemos pensar cada paso.",
    icon: Cpu,
  },
];

export default function ComputerAdvancedLesson() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const lesson = roboticsLessons[lessonIndex];
  const LessonIcon = lesson.icon;

  const progress = useMemo(() => {
    return Math.round(
      ((lessonIndex + 1) / roboticsLessons.length) * 100
    );
  }, [lessonIndex]);

  useEffect(() => {
    setLessonIndex(0);
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, [currentUnit]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  const speakLesson = () => {
    stopSpeaking();

    const message = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.description}. ${lesson.detailTitle}. ${lesson.detailText}`
    );

    message.lang = "es-GT";
    message.rate = 0.9;
    message.pitch = 1.02;
    message.onstart = () => setSpeaking(true);
    message.onend = () => setSpeaking(false);
    message.onerror = () => setSpeaking(false);

    window.speechSynthesis?.speak(message);
  };

  const nextLesson = () => {
    stopSpeaking();

    if (lessonIndex < roboticsLessons.length - 1) {
      setLessonIndex((current) => current + 1);
      return;
    }

    navigate(
      `/computer/advanced/unit/${currentUnit}/activity`
    );
  };

  return (
    <main className="robotics-screen">
      <header className="robotics-topbar">
        <div className="robotics-nav">
          <motion.button
            type="button"
            className="robotics-nav-button"
            onClick={() => navigate("/computer/advanced")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <ArrowLeft size={21} />
            <span>Volver</span>
          </motion.button>

          <motion.button
            type="button"
            className="robotics-nav-button"
            onClick={() => navigate("/computer")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Monitor size={20} />
            <span>Mundo</span>
          </motion.button>
        </div>

        <div className="robotics-heading">
          <span>Computación · Avanzado</span>
          <strong>Unidad 1: Robótica</strong>
        </div>

        <div className="robotics-hearts">
          <Heart size={22} fill="currentColor" />
          <Heart size={22} fill="currentColor" />
          <Heart size={22} fill="currentColor" />
        </div>
      </header>

      <section className="robotics-shell">
        <motion.article
          className="robotics-lesson-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="robotics-progress-row">
            <span>
              Paso {lessonIndex + 1} de {roboticsLessons.length}
            </span>

            <strong>{progress}%</strong>
          </div>

          <div className="robotics-progress-track">
            <motion.div
              animate={{ width: `${progress}%` }}
            />
          </div>

          <div className="robotics-lesson-layout">
            <motion.div
              className="robotics-lesson-visual"
              key={`visual-${lesson.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="robotics-orbit robotics-orbit-one" />
              <div className="robotics-orbit robotics-orbit-two" />

              <div className="robotics-icon-core">
                <LessonIcon size={112} />
              </div>

              <div className="robotics-small-part robotics-part-one">
                <Cog size={29} />
              </div>

              <div className="robotics-small-part robotics-part-two">
                <Cpu size={29} />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={lesson.id}
                className="robotics-lesson-copy"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <div className="robotics-badge">
                  {lesson.badge}
                </div>

                <h1>{lesson.title}</h1>

                <p>{lesson.description}</p>

                <div className="robotics-info-box">
                  <strong>{lesson.detailTitle}</strong>
                  <span>{lesson.detailText}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="robotics-actions">
            <motion.button
              type="button"
              className="robotics-secondary"
              onClick={speaking ? stopSpeaking : speakLesson}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              {speaking ? (
                <>
                  <Volume2 size={21} />
                  Detener
                </>
              ) : (
                <>
                  <Play size={20} fill="currentColor" />
                  Escuchar
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              className="robotics-primary"
              onClick={nextLesson}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              {lessonIndex < roboticsLessons.length - 1
                ? "Siguiente"
                : "Construir robot"}

              <ArrowRight size={21} />
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
