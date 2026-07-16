import "../styles/computer-intermediate-unit.css";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Columns3,
  FileSpreadsheet,
  Heart,
  Rows3,
  Save,
  Sparkles,
  Type,
  Volume2,
  Play,
  FileText,
  ImagePlus,
  Presentation,
  PanelsTopLeft,
  WandSparkles,
  Monitor,
  BadgeCheck,
  BriefcaseBusiness,
  ListChecks,
} from "lucide-react";

const unitsContent = {
  1: {
    title: "Microsoft Word",
    image:
      "/assets/computer/maps/intermediate/unit-word.png",
    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es Microsoft Word?",
        description:
          "Microsoft Word es un programa que usamos para escribir y crear documentos digitales.",
        detailTitle: "Podemos crear muchos trabajos",
        detailText:
          "En Word podemos hacer tareas, cartas, historias, informes y documentos con imágenes.",
        icon: FileText,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Escribir y dar formato",
        description:
          "Word permite cambiar el tamaño, color y estilo de las letras para organizar mejor un documento.",
        detailTitle: "El texto puede verse diferente",
        detailText:
          "Podemos usar negrita, cursiva, títulos, colores y distintos tamaños de letra.",
        icon: Type,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Guardar y abrir documentos",
        description:
          "Guardar permite conservar nuestro trabajo para volver a abrirlo y continuar después.",
        detailTitle: "Nunca olvides guardar",
        detailText:
          "Usa Guardar, elige una carpeta y escribe un nombre fácil de reconocer para tu documento.",
        icon: Save,
      },
    ],
  },

  2: {
    title: "Microsoft Excel",
    image:
      "/assets/computer/maps/intermediate/unit-excel.png",
    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es Microsoft Excel?",
        description:
          "Microsoft Excel es un programa que organiza información usando tablas formadas por filas, columnas y celdas.",
        detailTitle: "Excel organiza datos",
        detailText:
          "Podemos escribir nombres, cantidades, notas, fechas y otros datos dentro de una hoja de cálculo.",
        icon: FileSpreadsheet,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Filas, columnas y celdas",
        description:
          "Las filas van de izquierda a derecha, las columnas van de arriba hacia abajo y cada espacio se llama celda.",
        detailTitle: "Cada celda tiene una dirección",
        detailText:
          "Una celda se identifica con una letra y un número, por ejemplo A1, B2 o C3.",
        icon: Rows3,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Datos y sumas sencillas",
        description:
          "En Excel podemos escribir números y realizar operaciones sencillas para obtener resultados automáticamente.",
        detailTitle: "Excel también calcula",
        detailText:
          "La función SUMA permite añadir varios números y mostrar el resultado dentro de una celda.",
        icon: Calculator,
      },
    ],
  },

  3: {
    title: "Microsoft PowerPoint",
    image:
      "/assets/computer/maps/intermediate/unit-powerpoint.png",
    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es Microsoft PowerPoint?",
        description:
          "Microsoft PowerPoint es un programa que permite crear presentaciones usando diapositivas.",
        detailTitle: "Una presentación cuenta una idea",
        detailText:
          "Podemos combinar títulos, textos, imágenes y colores para explicar un tema de forma visual.",
        icon: Presentation,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Elementos de una diapositiva",
        description:
          "Una diapositiva puede incluir un título, texto, imágenes, formas y otros elementos visuales.",
        detailTitle: "Cada elemento tiene un lugar",
        detailText:
          "El título presenta el tema, el texto explica la idea y las imágenes ayudan a comprenderla.",
        icon: PanelsTopLeft,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Transiciones y presentación",
        description:
          "Las transiciones son efectos que aparecen cuando cambiamos de una diapositiva a otra.",
        detailTitle: "Presenta con orden y claridad",
        detailText:
          "Usa pocos efectos, letras grandes y una idea principal en cada diapositiva.",
        icon: WandSparkles,
      },
    ],
  },

  4: {
    title: "Reto final",
    image:
      "/assets/computer/maps/intermediate/final-chest.png",
    lessons: [
      {
        id: 1,
        badge: "Misión 1",
        title: "Prepara un proyecto digital",
        description:
          "En este reto usarás lo aprendido en Word, Excel y PowerPoint para completar un proyecto escolar.",
        detailTitle: "Tres herramientas, una misión",
        detailText:
          "Word servirá para escribir, Excel para organizar datos y PowerPoint para presentar el resultado.",
        icon: BriefcaseBusiness,
      },
      {
        id: 2,
        badge: "Misión 2",
        title: "Elige la herramienta correcta",
        description:
          "Cada tarea necesita una herramienta diferente. Debes leer con atención antes de elegir.",
        detailTitle: "Piensa antes de actuar",
        detailText:
          "Escribe documentos en Word, organiza tablas en Excel y crea diapositivas en PowerPoint.",
        icon: ListChecks,
      },
      {
        id: 3,
        badge: "Misión 3",
        title: "Demuestra todo lo aprendido",
        description:
          "Completa la actividad, supera el minijuego y aprueba la evaluación final para desbloquear Avanzado.",
        detailTitle: "Tu recompensa está cerca",
        detailText:
          "Al terminar recibirás estrellas, experiencia y acceso al siguiente nivel de Computación.",
        icon: BadgeCheck,
      },
    ],
  },
};

export default function ComputerIntermediateLesson() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const unitContent =
    unitsContent[currentUnit] || unitsContent[1];

  const lessons = unitContent.lessons;

  const [lessonIndex, setLessonIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = lessons[lessonIndex];
  const LessonIcon = lesson.icon;

  const progress = useMemo(() => {
    return Math.round(
      ((lessonIndex + 1) / lessons.length) * 100
    );
  }, [lessonIndex, lessons.length]);

  useEffect(() => {
    setLessonIndex(0);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }, [currentUnit]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stopSpeaking = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakLesson = () => {
    if (!window.speechSynthesis) return;

    stopSpeaking();

    const message = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.description}. ${lesson.detailTitle}. ${lesson.detailText}`
    );

    message.lang = "es-GT";
    message.rate = 0.9;
    message.pitch = 1.02;

    message.onstart = () => setIsSpeaking(true);
    message.onend = () => setIsSpeaking(false);
    message.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(message);
  };

  const nextLesson = () => {
    stopSpeaking();

    if (lessonIndex < lessons.length - 1) {
      setLessonIndex((current) => current + 1);
      return;
    }

    navigate(
      `/computer/intermediate/unit/${currentUnit}/activity`
    );
  };

  return (
    <main className="intermediate-unit-screen">
      <header className="intermediate-unit-topbar">
        <div className="intermediate-nav-buttons">
        <motion.button
          type="button"
          className="intermediate-unit-back"
          onClick={() => {
            stopSpeaking();
            navigate("/computer/intermediate");
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

        <motion.button
          type="button"
          className="intermediate-unit-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Monitor size={21} />
          <span>Mundo</span>
        </motion.button>
      </div>

        <div className="intermediate-unit-heading">
          <span>Computación · Intermedio</span>
          <strong>
            Unidad {currentUnit}: {unitContent.title}
          </strong>
        </div>

        <div className="intermediate-unit-hearts">
          <Heart size={24} fill="currentColor" />
          <Heart size={24} fill="currentColor" />
          <Heart size={24} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="intermediate-lesson-shell">
        <motion.article
          className="intermediate-lesson-card"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.97,
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
          <div className="intermediate-lesson-visual">
            <div className="intermediate-lesson-image">
              <motion.img
                src={unitContent.image}
                alt={unitContent.title}
                animate={{
                  scale: [1, 1.025, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/computer-world.png";
                }}
              />

              <div className="intermediate-lesson-image-overlay">
                <Sparkles size={23} />
                <span>Herramienta digital</span>
              </div>
            </div>
          </div>

          <div className="intermediate-lesson-content">
            <div className="intermediate-lesson-progress">
              <div className="intermediate-lesson-progress-top">
                <span>
                  Paso {lessonIndex + 1} de {lessons.length}
                </span>

                <strong>{progress}%</strong>
              </div>

              <div className="intermediate-lesson-progress-track">
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentUnit}-${lesson.id}`}
                className="intermediate-lesson-copy"
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -25,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="intermediate-lesson-badge">
                  <BookOpen size={18} />
                  {lesson.badge}
                </div>

                <h1>{lesson.title}</h1>

                <p className="intermediate-lesson-description">
                  {lesson.description}
                </p>

                <div className="intermediate-lesson-detail">
                  <div className="intermediate-lesson-detail-icon">
                    <LessonIcon size={30} />
                  </div>

                  <div>
                    <strong>{lesson.detailTitle}</strong>
                    <span>{lesson.detailText}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="intermediate-lesson-actions">
              <motion.button
                type="button"
                className="intermediate-lesson-audio"
                onClick={
                  isSpeaking ? stopSpeaking : speakLesson
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 size={22} />
                    Detener
                  </>
                ) : (
                  <>
                    <Play size={21} fill="currentColor" />
                    Escuchar
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                className="intermediate-lesson-next"
                onClick={nextLesson}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {lessonIndex < lessons.length - 1
                  ? "Siguiente"
                  : "Ir a la actividad"}

                <ArrowRight size={22} />
              </motion.button>
            </div>

            <div className="intermediate-lesson-dots">
              {lessons.map((item, index) => (
                <span
                  key={item.id}
                  className={
                    index === lessonIndex
                      ? "active"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
