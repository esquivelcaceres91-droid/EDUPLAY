import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Heart,
  Lightbulb,
  Monitor,
  MousePointer2,
  Play,
  Volume2,
} from "lucide-react";

import "../styles/computer-unit.css";

const lessons = [
  {
    id: 1,
    badge: "Lección 1",
    title: "¿Qué es una computadora?",
    description:
      "Una computadora es una máquina electrónica que recibe, procesa y guarda información.",
    speechTitle: "¡Es una herramienta increíble!",
    speechText:
      "Nos ayuda a aprender, escribir, dibujar, investigar, comunicarnos y jugar.",
    image: "/assets/computer/maps/beginner/unit-computer.png",
    icon: Monitor,
  },
  {
    id: 2,
    badge: "Lección 2",
    title: "¿Qué puede hacer?",
    description:
      "Una computadora puede realizar muchas tareas siguiendo las instrucciones que le damos.",
    speechTitle: "Tú le das las instrucciones",
    speechText:
      "Puedes abrir programas, escribir textos, ver videos, hacer dibujos y buscar información.",
    image: "/assets/computer/maps/beginner/unit-computer.png",
    icon: MousePointer2,
  },
  {
    id: 3,
    badge: "Lección 3",
    title: "La computadora nos ayuda",
    description:
      "Las computadoras se utilizan en escuelas, hospitales, tiendas, oficinas y hogares.",
    speechTitle: "Están en muchos lugares",
    speechText:
      "Cada computadora puede ayudarnos a estudiar, trabajar y comunicarnos de una forma diferente.",
    image: "/assets/computer/maps/beginner/unit-computer.png",
    icon: Lightbulb,
  },
];

export default function ComputerLesson() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [lessonIndex, setLessonIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = lessons[lessonIndex];
  const LessonIcon = lesson.icon;

  const progress = useMemo(() => {
    return Math.round(((lessonIndex + 1) / lessons.length) * 100);
  }, [lessonIndex]);

  const stopSpeaking = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakLesson = () => {
    if (!window.speechSynthesis) return;

    stopSpeaking();

    const message = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.description}. ${lesson.speechTitle}. ${lesson.speechText}`
    );

    message.lang = "es-GT";
    message.rate = 0.88;
    message.pitch = 1.08;

    message.onstart = () => {
      setIsSpeaking(true);
    };

    message.onend = () => {
      setIsSpeaking(false);
    };

    message.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(message);
  };

  const goBack = () => {
    stopSpeaking();
    navigate("/computer/beginner");
  };

  const nextLesson = () => {
    stopSpeaking();

    if (lessonIndex < lessons.length - 1) {
      setLessonIndex((current) => current + 1);
      return;
    }

    navigate(`/computer/beginner/unit/${currentUnit}/activity`);
  };

  return (
    <main className="computer-unit-screen">
      <header className="computer-unit-topbar">
        <motion.button
          type="button"
          className="computer-unit-back"
          onClick={goBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

        <div className="computer-unit-heading">
          <span>Computación · Principiante</span>
          <strong>Unidad {currentUnit}: La computadora</strong>
        </div>

        <div className="computer-unit-hearts">
          <Heart size={27} fill="currentColor" />
          <Heart size={27} fill="currentColor" />
          <Heart size={27} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="computer-lesson-shell">
        <motion.article
          className="computer-lesson-card"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="computer-lesson-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={lesson.id}
                className="computer-lesson-image-frame"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  x: 25,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  src={lesson.image}
                  alt={lesson.title}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/assets/computer-world.png";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="computer-lesson-content">
            <div className="computer-lesson-progress-header">
              <div className="computer-lesson-progress-track">
                <motion.div
                  className="computer-lesson-progress-fill"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span className="computer-lesson-progress-label">
                {progress}%
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={lesson.id}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="computer-lesson-badge">
                  <BookOpen size={20} />
                  {lesson.badge}
                </div>

                <h1>{lesson.title}</h1>

                <p className="computer-lesson-description">
                  {lesson.description}
                </p>

                <div className="computer-lesson-speech">
                  <div className="computer-lesson-speech-icon">
                    <LessonIcon size={31} />
                  </div>

                  <div>
                    <strong>{lesson.speechTitle}</strong>
                    <span>{lesson.speechText}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="computer-lesson-actions">
              <motion.button
                type="button"
                className="computer-lesson-audio-button"
                onClick={isSpeaking ? stopSpeaking : speakLesson}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 size={23} />
                    Detener
                  </>
                ) : (
                  <>
                    <Play size={22} fill="currentColor" />
                    Escuchar
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                className="computer-lesson-next-button"
                onClick={nextLesson}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {lessonIndex < lessons.length - 1
                  ? "Siguiente"
                  : "Continuar"}

                <ArrowRight size={23} />
              </motion.button>
            </div>

            <div className="computer-lesson-dots">
              {lessons.map((item, index) => (
                <span
                  key={item.id}
                  className={`computer-lesson-dot ${
                    index === lessonIndex
                      ? "computer-lesson-dot-active"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  );
}