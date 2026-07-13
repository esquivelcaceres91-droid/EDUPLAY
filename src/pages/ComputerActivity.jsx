import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Monitor,
  MousePointerClick,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

const options = [
  {
    id: 1,
    label: "Una máquina electrónica",
    correct: true,
  },
  {
    id: 2,
    label: "Un juguete de madera",
    correct: false,
  },
  {
    id: 3,
    label: "Un animal",
    correct: false,
  },
];

export default function ComputerActivity() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.id === selectedId);
  }, [selectedId]);

  const isCorrect = checked && selectedOption?.correct;

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

    navigate(`/computer/beginner/unit/${currentUnit}/game`);
  };

  return (
    <main className="computer-unit-screen">
      <header className="computer-unit-topbar">
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

        <div className="computer-unit-heading">
          <span>Computación · Principiante</span>
          <strong>Actividad de la Unidad {currentUnit}</strong>
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
          className="computer-activity-card"
          initial={{
            opacity: 0,
            y: 28,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
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
              <span>Actividad 1</span>
              <h1>Selecciona la respuesta correcta</h1>
            </div>
          </div>

          <div className="computer-activity-question">
            <Monitor size={58} />

            <div>
              <span>Pregunta</span>
              <strong>¿Qué es una computadora?</strong>
            </div>
          </div>

          <div className="computer-activity-options">
            {options.map((option) => {
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
                    checked
                      ? {}
                      : {
                          scale: 1.02,
                          y: -3,
                        }
                  }
                  whileTap={
                    checked
                      ? {}
                      : {
                          scale: 0.98,
                        }
                  }
                >
                  <span className="computer-activity-option-number">
                    {option.id}
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
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 size={32} />

                  <div>
                    <strong>¡Muy bien!</strong>
                    <span>
                      Una computadora es una máquina electrónica.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} />

                  <div>
                    <strong>Inténtalo otra vez</strong>
                    <span>
                      Recuerda lo aprendido en la introducción.
                    </span>
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
                  selectedOption
                    ? {
                        scale: 1.04,
                      }
                    : {}
                }
                whileTap={
                  selectedOption
                    ? {
                        scale: 0.96,
                      }
                    : {}
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