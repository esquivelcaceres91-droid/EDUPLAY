import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Heart,
  Laptop,
  Star,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

const gameItems = [
  {
    id: 1,
    label: "Escribir una tarea",
    emoji: "📝",
    correct: true,
  },
  {
    id: 2,
    label: "Dibujar en Paint",
    emoji: "🎨",
    correct: true,
  },
  {
    id: 3,
    label: "Buscar información",
    emoji: "🔎",
    correct: true,
  },
  {
    id: 4,
    label: "Ver videos educativos",
    emoji: "🎬",
    correct: true,
  },
  {
    id: 5,
    label: "Enviar un mensaje",
    emoji: "💬",
    correct: true,
  },
  {
    id: 6,
    label: "Cocinar una sopa",
    emoji: "🍲",
    correct: false,
  },
  {
    id: 7,
    label: "Nadar en una piscina",
    emoji: "🏊",
    correct: false,
  },
  {
    id: 8,
    label: "Regar una planta",
    emoji: "🌱",
    correct: false,
  },
  {
    id: 9,
    label: "Dormir en una cama",
    emoji: "🛏️",
    correct: false,
  },
  {
    id: 10,
    label: "Patear una pelota",
    emoji: "⚽",
    correct: false,
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

export default function ComputerGame() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [items, setItems] = useState(() => shuffleArray(gameItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentItem = items[currentIndex];

  const progress = useMemo(() => {
    return Math.round(
      ((currentIndex + 1) / items.length) * 100
    );
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (finished || selectedAnswer !== null) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setSelectedAnswer(false);
          setHearts((value) => Math.max(0, value - 1));
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [currentIndex, finished, selectedAnswer]);

  useEffect(() => {
    if (hearts <= 0 && !finished) {
      setFinished(true);
    }
  }, [hearts, finished]);

  const answerItem = (answer) => {
    if (selectedAnswer !== null || finished) return;

    const correctAnswer = currentItem.correct;
    const success = answer === correctAnswer;

    setSelectedAnswer(success);

    if (success) {
      setScore((current) => current + 10);
    } else {
      setHearts((current) => Math.max(0, current - 1));
    }
  };

  const nextItem = () => {
    if (currentIndex < items.length - 1 && hearts > 0) {
      setCurrentIndex((current) => current + 1);
      setSelectedAnswer(null);
      setTimeLeft(20);
      return;
    }

    setFinished(true);
  };

  const restartGame = () => {
    setItems(shuffleArray(gameItems));
    setCurrentIndex(0);
    setScore(0);
    setHearts(3);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setFinished(false);
  };

  const continueToQuiz = () => {
    navigate(`/computer/beginner/unit/${currentUnit}/quiz`);
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
          <strong>Minijuego de la Unidad {currentUnit}</strong>
        </div>

        <div className="computer-unit-hearts">
          {Array.from({ length: 3 }).map((_, index) => (
            <Heart
              key={index}
              size={27}
              fill={index < hearts ? "currentColor" : "none"}
              opacity={index < hearts ? 1 : 0.3}
            />
          ))}

          <span>{hearts}</span>
        </div>
      </header>

      <section className="computer-game-shell">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.article
              key={currentItem.id}
              className="computer-game-card"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 28,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="computer-game-top">
                <div className="computer-game-title">
                  <span className="computer-game-title-icon">
                    <Gamepad2 size={30} />
                  </span>

                  <div>
                    <span>Minijuego</span>
                    <h1>¿Se puede hacer con una computadora?</h1>
                  </div>
                </div>

                <div className="computer-game-stats">
                  <div>
                    <Timer size={23} />
                    <strong>{timeLeft}s</strong>
                  </div>

                  <div>
                    <Star size={23} fill="currentColor" />
                    <strong>{score}</strong>
                  </div>
                </div>
              </div>

              <div className="computer-lesson-progress-header">
                <div className="computer-lesson-progress-track">
                  <motion.div
                    className="computer-lesson-progress-fill"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                  />
                </div>

                <span className="computer-lesson-progress-label">
                  {currentIndex + 1}/{items.length}
                </span>
              </div>

              <div className="computer-game-instruction">
                <Laptop size={34} />
                Lee la acción y elige la respuesta correcta.
              </div>

              <motion.div
                className="computer-game-item"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="computer-game-emoji">
                  {currentItem.emoji}
                </span>

                <strong>{currentItem.label}</strong>
              </motion.div>

              <div className="computer-game-buttons">
                <motion.button
                  type="button"
                  className="computer-game-button computer-game-button-no"
                  onClick={() => answerItem(false)}
                  disabled={selectedAnswer !== null}
                  whileHover={
                    selectedAnswer === null
                      ? {
                          scale: 1.04,
                          y: -4,
                        }
                      : {}
                  }
                  whileTap={
                    selectedAnswer === null
                      ? {
                          scale: 0.96,
                        }
                      : {}
                  }
                >
                  <XCircle size={31} />
                  No
                </motion.button>

                <motion.button
                  type="button"
                  className="computer-game-button computer-game-button-yes"
                  onClick={() => answerItem(true)}
                  disabled={selectedAnswer !== null}
                  whileHover={
                    selectedAnswer === null
                      ? {
                          scale: 1.04,
                          y: -4,
                        }
                      : {}
                  }
                  whileTap={
                    selectedAnswer === null
                      ? {
                          scale: 0.96,
                        }
                      : {}
                  }
                >
                  <CheckCircle2 size={31} />
                  Sí
                </motion.button>
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    className={`computer-game-feedback ${
                      selectedAnswer
                        ? "computer-game-feedback-correct"
                        : "computer-game-feedback-wrong"
                    }`}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                  >
                    {selectedAnswer ? (
                      <>
                        <CheckCircle2 size={34} />

                        <div>
                          <strong>¡Correcto!</strong>
                          <span>
                            Elegiste la respuesta correcta.
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={34} />

                        <div>
                          <strong>¡Cuidado!</strong>
                          <span>
                            Lee bien la acción antes de responder.
                          </span>
                        </div>
                      </>
                    )}

                    <motion.button
                      type="button"
                      onClick={nextItem}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {currentIndex < items.length - 1 &&
                      hearts > 0
                        ? "Siguiente"
                        : "Ver resultado"}

                      <ArrowRight size={21} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ) : (
            <motion.article
              key="result"
              className="computer-game-result"
              initial={{
                opacity: 0,
                scale: 0.86,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="computer-game-result-trophy"
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Trophy size={94} fill="currentColor" />
              </motion.div>

              <span className="computer-game-result-badge">
                Minijuego terminado
              </span>

              <h1>
                {score >= 70
                  ? "¡Excelente trabajo!"
                  : "¡Buen intento!"}
              </h1>

              <p>
                Obtuviste <strong>{score} puntos</strong> en el
                minijuego.
              </p>

              <div className="computer-game-result-stats">
                <div>
                  <Star size={29} fill="currentColor" />
                  <span>Puntos</span>
                  <strong>{score}</strong>
                </div>

                <div>
                  <Heart size={29} fill="currentColor" />
                  <span>Vidas</span>
                  <strong>{hearts}</strong>
                </div>
              </div>

              <div className="computer-game-result-actions">
                {score < 50 ? (
                  <motion.button
                    type="button"
                    className="computer-game-retry-button"
                    onClick={restartGame}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Jugar de nuevo
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    className="computer-game-continue-button"
                    onClick={continueToQuiz}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Ir a la evaluación
                    <ArrowRight size={23} />
                  </motion.button>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}