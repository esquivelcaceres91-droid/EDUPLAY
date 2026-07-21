import "../styles/computer-advanced-unit.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Cog,
  Cpu,
  Heart,
  Monitor,
  Radar,
  XCircle,
} from "lucide-react";

const baseQuestions = [
  {
    id: 1,
    question:
      "¿Qué parte permite que un robot detecte obstáculos?",
    icon: Radar,
    options: [
      { id: "a", label: "Sensor", correct: true },
      { id: "b", label: "Motor", correct: false },
      { id: "c", label: "Rueda de color", correct: false },
    ],
  },
  {
    id: 2,
    question:
      "¿Qué parte procesa las instrucciones del robot?",
    icon: Cpu,
    options: [
      { id: "a", label: "Procesador", correct: true },
      { id: "b", label: "Papel", correct: false },
      { id: "c", label: "Pantalla solamente", correct: false },
    ],
  },
  {
    id: 3,
    question:
      "¿Qué componente produce movimiento?",
    icon: Cog,
    options: [
      { id: "a", label: "Motores", correct: true },
      { id: "b", label: "Sensores", correct: false },
      { id: "c", label: "Texto", correct: false },
    ],
  },
  {
    id: 4,
    question:
      "¿Por qué debemos ordenar correctamente los comandos?",
    icon: Bot,
    options: [
      {
        id: "a",
        label: "Para completar la misión correctamente",
        correct: true,
      },
      {
        id: "b",
        label: "Para cambiar el tamaño del monitor",
        correct: false,
      },
      {
        id: "c",
        label: "Para borrar Internet",
        correct: false,
      },
    ],
  },
  {
    id: 5,
    question:
      "Un robot realiza exactamente las instrucciones que recibe.",
    icon: Bot,
    options: [
      { id: "a", label: "Verdadero", correct: true },
      { id: "b", label: "Falso", correct: false },
    ],
  },
];

const shuffle = (items) => {
  const shuffled = [...items];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const createQuestions = () => {
  return baseQuestions.map((question) => ({
    ...question,
    options: shuffle(question.options),
  }));
};

export default function ComputerAdvancedQuiz() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [questions, setQuestions] = useState(
    () => createQuestions()
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const question = questions[questionIndex];
  const QuestionIcon = question.icon;

  const lastQuestion =
    questionIndex === questions.length - 1;

  const correct = useMemo(() => {
    if (!checked) return false;

    return question.options.find(
      (option) => option.id === selectedId
    )?.correct;
  }, [checked, question.options, selectedId]);

  const checkAnswer = () => {
    if (!selectedId) return;

    const selectedOption = question.options.find(
      (option) => option.id === selectedId
    );

    setChecked(true);

    if (selectedOption.correct) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) => Math.max(0, current - 1));
    }
  };

  const continueQuiz = () => {
    if (!correct) {
      setQuestions((current) =>
        current.map((item, index) =>
          index === questionIndex
            ? {
                ...item,
                options: shuffle(item.options),
              }
            : item
        )
      );

      setSelectedId(null);
      setChecked(false);
      return;
    }

    if (!lastQuestion) {
      setQuestionIndex((current) => current + 1);
      setSelectedId(null);
      setChecked(false);
      return;
    }

    navigate(
      `/computer/advanced/unit/${currentUnit}/reward`,
      {
        state: {
          score: score + 1,
          total: questions.length,
          hearts,
        },
      }
    );
  };

  return (
    <main className="robotics-screen">
      <header className="robotics-topbar">
        <div className="robotics-nav">
          <button
            type="button"
            className="robotics-nav-button"
            onClick={() =>
              navigate(
                `/computer/advanced/unit/${currentUnit}/game`
              )
            }
          >
            <ArrowLeft size={21} />
            <span>Volver</span>
          </button>

          <button
            type="button"
            className="robotics-nav-button"
            onClick={() => navigate("/computer")}
          >
            <Monitor size={20} />
            <span>Mundo</span>
          </button>
        </div>

        <div className="robotics-heading">
          <span>Computación · Avanzado</span>
          <strong>Evaluación de Robótica</strong>
        </div>

        <div className="robotics-hearts">
          {[1, 2, 3].map((heartNumber) => (
            <Heart
              key={heartNumber}
              size={22}
              fill={
                heartNumber <= hearts
                  ? "currentColor"
                  : "none"
              }
            />
          ))}
        </div>
      </header>

      <section className="robotics-shell">
        <motion.article
          className="robotics-main-card robotics-quiz-card"
          key={question.id}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="robotics-progress-row">
            <span>
              Pregunta {questionIndex + 1} de{" "}
              {questions.length}
            </span>

            <strong>
              {Math.round(
                ((questionIndex + 1) /
                  questions.length) *
                  100
              )}
              %
            </strong>
          </div>

          <div className="robotics-progress-track">
            <motion.div
              animate={{
                width: `${
                  ((questionIndex + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="robotics-question-box">
            <div className="robotics-question-icon">
              <QuestionIcon size={54} />
            </div>

            <h1>{question.question}</h1>
          </div>

          <div className="robotics-options-grid">
            {question.options.map((option) => {
              const selected =
                selectedId === option.id;
              const showCorrect =
                checked && option.correct;
              const showWrong =
                checked &&
                selected &&
                !option.correct;

              return (
                <motion.button
                  type="button"
                  key={option.id}
                  className={`robotics-option ${
                    selected
                      ? "robotics-option-selected"
                      : ""
                  } ${
                    showCorrect
                      ? "robotics-option-correct"
                      : ""
                  } ${
                    showWrong
                      ? "robotics-option-wrong"
                      : ""
                  }`}
                  onClick={() => {
                    if (!checked) {
                      setSelectedId(option.id);
                    }
                  }}
                  whileHover={
                    checked
                      ? {}
                      : { y: -5, scale: 1.02 }
                  }
                  whileTap={
                    checked ? {} : { scale: 0.97 }
                  }
                >
                  <strong>{option.label}</strong>

                  {showCorrect && (
                    <CheckCircle2 size={24} />
                  )}

                  {showWrong && (
                    <XCircle size={24} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {checked && (
            <motion.div
              className={`robotics-feedback ${
                correct
                  ? "robotics-feedback-correct"
                  : "robotics-feedback-wrong"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {correct ? (
                <CheckCircle2 size={34} />
              ) : (
                <XCircle size={34} />
              )}

              <div>
                <strong>
                  {correct
                    ? "¡Respuesta correcta!"
                    : "Revisa la pregunta"}
                </strong>

                <span>
                  {correct
                    ? "Continúa con la siguiente pregunta."
                    : "Las respuestas cambiarán de posición."}
                </span>
              </div>
            </motion.div>
          )}

          <div className="robotics-actions">
            <div />

            {!checked ? (
              <button
                type="button"
                className="robotics-primary"
                disabled={!selectedId}
                onClick={checkAnswer}
              >
                Comprobar respuesta
              </button>
            ) : (
              <button
                type="button"
                className="robotics-primary"
                onClick={continueQuiz}
              >
                {!correct
                  ? "Intentar otra vez"
                  : lastQuestion
                  ? "Ver recompensa"
                  : "Siguiente pregunta"}
              </button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}
