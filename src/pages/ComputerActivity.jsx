import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Heart,
  Keyboard,
  Monitor,
  MousePointer2,
  MousePointerClick,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

const activitiesContent = {
  1: {
    title: "Selecciona la respuesta correcta",
    question: "¿Qué es una computadora?",
    feedback:
      "Una computadora es una máquina electrónica.",
    wrongFeedback:
      "Recuerda lo aprendido en la introducción.",
    icon: Monitor,
    options: [
      { id: 1, label: "Una máquina electrónica", correct: true },
      { id: 2, label: "Un juguete de madera", correct: false },
      { id: 3, label: "Un animal", correct: false },
    ],
  },

  2: {
    title: "Identifica la parte correcta",
    question:
      "¿Qué parte de la computadora contiene componentes importantes y procesa la información?",
    feedback:
      "La CPU o torre contiene componentes importantes de la computadora.",
    wrongFeedback:
      "Piensa en la parte donde se encuentran muchos componentes internos.",
    icon: Cpu,
    options: [
      { id: 1, label: "El monitor", correct: false },
      { id: 2, label: "La CPU o torre", correct: true },
      { id: 3, label: "El mouse", correct: false },
    ],
  },

  3: {
    title: "Reconoce la función del teclado",
    question:
      "¿Qué parte de la computadora usamos principalmente para escribir letras y números?",
    feedback:
      "El teclado nos permite escribir letras, números y símbolos.",
    wrongFeedback:
      "Busca la parte de la computadora que tiene muchas teclas.",
    icon: Keyboard,
    options: [
      { id: 1, label: "El monitor", correct: false },
      { id: 2, label: "El teclado", correct: true },
      { id: 3, label: "El mouse", correct: false },
    ],
  },

  4: {
    title: "Descubre cómo usamos el mouse",
    question:
      "¿Qué acción usamos normalmente para seleccionar un objeto en la pantalla?",
    feedback:
      "Usamos un clic izquierdo para seleccionar objetos.",
    wrongFeedback:
      "Recuerda: un clic selecciona y dos clics rápidos abren.",
    icon: MousePointer2,
    options: [
      { id: 1, label: "Un clic izquierdo", correct: true },
      { id: 2, label: "Presionar la barra espaciadora", correct: false },
      { id: 3, label: "Apagar el monitor", correct: false },
    ],
  },

  5: {
    title: "Reconoce los elementos de Windows",
    question:
      "¿Qué parte de Windows usamos para buscar y abrir aplicaciones?",
    feedback:
      "El menú Inicio permite buscar y abrir aplicaciones.",
    wrongFeedback:
      "Busca el botón desde donde se abren programas y opciones.",
    icon: Monitor,
    options: [
      { id: 1, label: "El menú Inicio", correct: true },
      { id: 2, label: "La rueda del mouse", correct: false },
      { id: 3, label: "El cable de corriente", correct: false },
    ],
  },

  6: {
    title: "Diferencia archivos y carpetas",
    question:
      "¿Cuál de estos elementos sirve para guardar y organizar otros archivos?",
    feedback:
      "Una carpeta sirve para guardar y organizar archivos.",
    wrongFeedback:
      "Piensa en el elemento que puede contener documentos, fotos y música.",
    icon: Monitor,
    options: [
      { id: 1, label: "Una carpeta", correct: true },
      { id: 2, label: "Una fotografía", correct: false },
      { id: 3, label: "Una canción", correct: false },
    ],
  },

  7: {
    title: "Reconoce las herramientas de Paint",
    question:
      "¿Qué herramienta usamos para eliminar una parte del dibujo?",
    feedback:
      "El borrador elimina partes del dibujo.",
    wrongFeedback:
      "Busca la herramienta que sirve para corregir o borrar.",
    icon: Monitor,
    options: [
      { id: 1, label: "El borrador", correct: true },
      { id: 2, label: "La paleta de colores", correct: false },
      { id: 3, label: "El botón Guardar", correct: false },
    ],
  },

  8: {
    title: "Internet seguro: verdadero o falso",
    question:
      "Si una página me asusta o me pide información personal, debo avisar a un adulto.",
    feedback:
      "Correcto. Siempre debemos pedir ayuda a un adulto de confianza.",
    wrongFeedback:
      "No debemos continuar solos cuando una página parece extraña o peligrosa.",
    icon: Monitor,
    options: [
      { id: 1, label: "Verdadero", correct: true },
      { id: 2, label: "Falso", correct: false },
    ],
  },

  9: {
    title: "Prepárate para el reto final",
    question:
      "¿Cuál es la mejor forma de completar una tarea en la computadora?",
    feedback:
      "Debemos trabajar con orden, guardar el archivo y navegar con seguridad.",
    wrongFeedback:
      "Piensa en cómo usar correctamente las herramientas y proteger tu información.",
    icon: Cpu,
    options: [
      {
        id: 1,
        label:
          "Escribir, organizar, guardar y pedir ayuda si algo parece extraño",
        correct: true,
      },
      {
        id: 2,
        label:
          "Compartir contraseñas y descargar cualquier archivo",
        correct: false,
      },
      {
        id: 3,
        label:
          "Cerrar todo sin guardar el trabajo",
        correct: false,
      },
    ],
  },
};

export default function ComputerActivity() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);
  const activity =
    activitiesContent[currentUnit] || activitiesContent[1];
  const ActivityIcon = activity.icon;

  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setChecked(false);
  }, [currentUnit]);

  const selectedOption = useMemo(() => {
    return activity.options.find(
      (option) => option.id === selectedId
    );
  }, [selectedId, activity.options]);

  const isCorrect =
    checked && Boolean(selectedOption?.correct);

  const checkAnswer = () => {
    if (!selectedOption) return;
    setChecked(true);
  };

  const continueActivity = () => {
    if (!isCorrect) {
      setSelectedId(null);
      setChecked(false);
      return;
    }

    navigate(
      `/computer/beginner/unit/${currentUnit}/game`
    );
  };

  return (
    <main className="computer-unit-screen">
      <header className="computer-unit-topbar">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
        <motion.button
          type="button"
          className="computer-unit-back"
          onClick={() =>
            navigate(
              `/computer/beginner/unit/${currentUnit}/lesson`
            )
          }
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

          <motion.button
            type="button"
            className="computer-unit-back"
            onClick={() => navigate("/computer")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: "static",
              minWidth: "auto",
              padding: "10px 15px",
            }}
          >
            <Monitor size={21} />
            <span>Mundo</span>
          </motion.button>
        </div>

        <div className="computer-unit-heading">
          <span>Computación · Principiante</span>
          <strong>
            Actividad de la Unidad {currentUnit}
          </strong>
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
          key={currentUnit}
          className="computer-activity-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="computer-activity-header">
            <div className="computer-activity-icon">
              <MousePointerClick size={34} />
            </div>

            <div>
              <span>Actividad de práctica</span>
              <h1>{activity.title}</h1>
            </div>
          </div>

          <div className="computer-activity-question">
            <ActivityIcon size={58} />

            <div>
              <span>Pregunta</span>
              <strong>{activity.question}</strong>
            </div>
          </div>

          <div className="computer-activity-options">
            {activity.options.map((option, index) => {
              const selected = option.id === selectedId;
              let optionClass = "";

              if (checked && selected) {
                optionClass = option.correct
                  ? "computer-activity-option-correct"
                  : "computer-activity-option-wrong";
              } else if (selected) {
                optionClass =
                  "computer-activity-option-selected";
              }

              return (
                <motion.button
                  type="button"
                  key={option.id}
                  className={`computer-activity-option ${optionClass}`}
                  onClick={() => {
                    if (checked) return;
                    setSelectedId(option.id);
                  }}
                  whileHover={
                    checked ? {} : { scale: 1.02, y: -3 }
                  }
                  whileTap={
                    checked ? {} : { scale: 0.98 }
                  }
                >
                  <span className="computer-activity-option-number">
                    {index + 1}
                  </span>

                  <strong>{option.label}</strong>

                  {checked && selected && option.correct && (
                    <CheckCircle2 size={30} />
                  )}

                  {checked && selected && !option.correct && (
                    <XCircle size={30} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {checked && (
            <motion.div
              className={`computer-activity-feedback ${
                isCorrect
                  ? "computer-activity-feedback-correct"
                  : "computer-activity-feedback-wrong"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 size={32} />
                  <div>
                    <strong>¡Muy bien!</strong>
                    <span>{activity.feedback}</span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} />
                  <div>
                    <strong>Inténtalo otra vez</strong>
                    <span>{activity.wrongFeedback}</span>
                  </div>
                </>
              )}
            </motion.div>
          )}

          <div className="computer-activity-actions">
            {!checked ? (
              <motion.button
                type="button"
                className="computer-lesson-next-button"
                onClick={checkAnswer}
                disabled={!selectedOption}
                whileHover={
                  selectedOption ? { scale: 1.04 } : {}
                }
                whileTap={
                  selectedOption ? { scale: 0.96 } : {}
                }
              >
                Comprobar
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="computer-lesson-next-button"
                onClick={continueActivity}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {isCorrect
                  ? "Ir al minijuego"
                  : "Intentar de nuevo"}
              </motion.button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}
