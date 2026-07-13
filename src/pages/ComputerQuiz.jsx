import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Monitor,
  Trophy,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

const questionBank = [
  {
    id: 1,
    question: "¿Qué es una computadora?",
    options: [
      "Una máquina electrónica",
      "Un juguete de madera",
      "Un animal",
    ],
    correctAnswer: "Una máquina electrónica",
  },
  {
    id: 2,
    question: "¿Qué puede guardar una computadora?",
    options: ["Información", "Agua", "Comida"],
    correctAnswer: "Información",
  },
  {
    id: 3,
    question: "¿Para qué podemos usar una computadora?",
    options: [
      "Para aprender y escribir",
      "Para cocinar alimentos",
      "Para nadar en una piscina",
    ],
    correctAnswer: "Para aprender y escribir",
  },
  {
    id: 4,
    question: "¿Dónde se utilizan las computadoras?",
    options: [
      "En escuelas, hogares y oficinas",
      "Solamente en el bosque",
      "Únicamente dentro del agua",
    ],
    correctAnswer: "En escuelas, hogares y oficinas",
  },
  {
    id: 5,
    question: "¿Qué hace una computadora con la información?",
    options: [
      "La recibe, procesa y guarda",
      "La convierte en comida",
      "La elimina automáticamente",
    ],
    correctAnswer: "La recibe, procesa y guarda",
  },
];

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function createRandomQuiz() {
  return shuffleArray(questionBank).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

export default function ComputerQuiz() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [questions] = useState(() => createRandomQuiz());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const currentQuestion = questions[questionIndex];

  const isCorrect = useMemo(() => {
    return selectedAnswer === currentQuestion.correctAnswer;
  }, [selectedAnswer, currentQuestion]);

  const progress = Math.round(
    ((questionIndex + 1) / questions.length) * 100
  );

  const checkAnswer = () => {
    if (!selectedAnswer || checked) return;

    setChecked(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) => Math.max(0, current - 1));
    }
  };

  const continueQuiz = () => {
    if (!isCorrect) {
      setSelectedAnswer("");
      setChecked(false);
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
      setSelectedAnswer("");
      setChecked(false);
      return;
    }

    navigate(`/computer/beginner/unit/${currentUnit}/reward`, {
      state: {
        score,
        total: questions.length,
        hearts,
      },
    });
  };

  return (
    <main className="computer-unit-screen">
      <header className="computer-unit-topbar">
        <motion.button
          type="button"
          className="computer-unit-back"
          onClick={() =>
            navigate(
              `/computer/beginner/unit/${currentUnit}/activity`
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
          <strong>Evaluación de la Unidad {currentUnit}</strong>
        </div>

        <div className="computer-unit-hearts">
          {Array.from({ length: 3 }).map((_, index) => (
            <Heart
              key={index}
              size={27}
              fill={index < hearts ? "currentColor" : "none"}
              opacity={index < hearts ? 1 : 0.35}
            />
          ))}

          <span>{hearts}</span>
        </div>
      </header>

      <section className="computer-lesson-shell">
        <motion.article
          key={currentQuestion.id}
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
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="computer-lesson-progress-header">
            <div className="computer-lesson-progress-track">
              <motion.div
                className="computer-lesson-progress-fill"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.45,
                }}
              />
            </div>

            <span className="computer-lesson-progress-label">
              {questionIndex + 1}/{questions.length}
            </span>
          </div>

          <div className="computer-activity-header">
            <div className="computer-activity-icon">
              <Trophy size={35} />
            </div>

            <div>
              <span>Evaluación final</span>
              <h1>Demuestra lo que aprendiste</h1>
            </div>
          </div>

          <div className="computer-activity-question">
            <Monitor size={58} />

            <div>
              <span>Pregunta {questionIndex + 1}</span>
              <strong>{currentQuestion.question}</strong>
            </div>
          </div>

          <div className="computer-activity-options">
            {currentQuestion.options.map((option, index) => {
              const selected = selectedAnswer === option;

              const correct =
                checked &&
                option === currentQuestion.correctAnswer;

              const wrong =
                checked &&
                selected &&
                option !== currentQuestion.correctAnswer;

              let optionClass = "";

              if (correct) {
                optionClass =
                  "computer-activity-option-correct";
              } else if (wrong) {
                optionClass =
                  "computer-activity-option-wrong";
              } else if (selected) {
                optionClass =
                  "computer-activity-option-selected";
              }

              return (
                <motion.button
                  type="button"
                  key={`${currentQuestion.id}-${option}`}
                  className={`computer-activity-option ${optionClass}`}
                  onClick={() => {
                    if (checked) return;
                    setSelectedAnswer(option);
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
                    {index + 1}
                  </span>

                  <strong>{option}</strong>

                  {correct && <CheckCircle2 size={30} />}

                  {wrong && <XCircle size={30} />}
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
                y: 14,
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
                    <strong>¡Respuesta correcta!</strong>
                    <span>
                      Muy bien, continúa con la siguiente
                      pregunta.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} />

                  <div>
                    <strong>Respuesta incorrecta</strong>
                    <span>
                      Lee nuevamente todas las opciones e
                      inténtalo otra vez.
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
                disabled={!selectedAnswer}
                whileHover={
                  selectedAnswer
                    ? {
                        scale: 1.04,
                      }
                    : {}
                }
                whileTap={
                  selectedAnswer
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
                onClick={continueQuiz}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {isCorrect
                  ? questionIndex < questions.length - 1
                    ? "Siguiente"
                    : "Ver resultado"
                  : "Intentar de nuevo"}

                {isCorrect && <ArrowRight size={23} />}
              </motion.button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}