import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Gamepad2,
  Monitor,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import "../styles/computer-unit.css";
import {
  getProfile,
  saveProfile,
} from "../utils/profileStorage";

const lessonSteps = [
  {
    id: "intro",
    title: "La computadora",
    subtitle: "Conoce qué es y para qué sirve",
    icon: Monitor,
  },
  {
    id: "learn",
    title: "Aprende",
    subtitle: "Descubre sus usos principales",
    icon: BookOpen,
  },
  {
    id: "activity",
    title: "Actividad",
    subtitle: "Elige lo que sí puedes hacer",
    icon: Brain,
  },
  {
    id: "game",
    title: "Juego",
    subtitle: "Encuentra los objetos correctos",
    icon: Gamepad2,
  },
  {
    id: "quiz",
    title: "Evaluación",
    subtitle: "Demuestra lo aprendido",
    icon: CheckCircle2,
  },
  {
    id: "reward",
    title: "Recompensa",
    subtitle: "Recibe tus estrellas",
    icon: Trophy,
  },
];

const uses = [
  {
    id: "learn",
    title: "Aprender",
    emoji: "📚",
    description: "Podemos investigar y descubrir cosas nuevas.",
  },
  {
    id: "write",
    title: "Escribir",
    emoji: "⌨️",
    description: "Podemos crear tareas, cuentos y documentos.",
  },
  {
    id: "draw",
    title: "Dibujar",
    emoji: "🎨",
    description: "Podemos crear dibujos y usar muchos colores.",
  },
  {
    id: "play",
    title: "Jugar",
    emoji: "🎮",
    description: "Podemos divertirnos con juegos educativos.",
  },
];

const activityOptions = [
  { id: "study", label: "Hacer una tarea", emoji: "📝", correct: true },
  { id: "draw", label: "Crear un dibujo", emoji: "🎨", correct: true },
  { id: "cook", label: "Cocinar sola", emoji: "🍳", correct: false },
  { id: "learn", label: "Buscar información", emoji: "🔎", correct: true },
];

const gameObjects = [
  { id: "computer", label: "Computadora", emoji: "🖥️", correct: true },
  { id: "laptop", label: "Laptop", emoji: "💻", correct: true },
  { id: "tablet", label: "Tablet", emoji: "📱", correct: true },
  { id: "ball", label: "Pelota", emoji: "⚽", correct: false },
  { id: "apple", label: "Manzana", emoji: "🍎", correct: false },
  { id: "bike", label: "Bicicleta", emoji: "🚲", correct: false },
];

const quizQuestions = [
  {
    question: "¿Qué es una computadora?",
    options: [
      "Una herramienta electrónica que procesa información",
      "Un juguete que solo sirve para jugar",
      "Un electrodoméstico para cocinar",
    ],
    correctIndex: 0,
  },
  {
    question: "¿Cuál de estas actividades puedes hacer en una computadora?",
    options: [
      "Investigar y aprender",
      "Lavar ropa",
      "Preparar comida",
    ],
    correctIndex: 0,
  },
  {
    question: "¿Cuál de estos objetos es una computadora portátil?",
    options: [
      "Laptop",
      "Televisor",
      "Refrigerador",
    ],
    correctIndex: 0,
  },
  {
    question: "¿Para qué puede servir una computadora?",
    options: [
      "Para escribir, dibujar, aprender y jugar",
      "Solo para ver películas",
      "Solo para escuchar música",
    ],
    correctIndex: 0,
  },
  {
    question: "¿Qué debemos hacer al usar una computadora?",
    options: [
      "Usarla con cuidado y seguir instrucciones",
      "Golpearla si no responde",
      "Apagarla desconectando todos los cables",
    ],
    correctIndex: 0,
  },
];

function updateComputerProgress(score, stars) {
  const profile = getProfile();
  const progress = profile.progress || {};
  const computer = progress.computer || {};
  const beginner = Array.isArray(computer.beginner)
    ? [...computer.beginner]
    : [];

  while (beginner.length < 9) {
    beginner.push({
      status: beginner.length === 0 ? "available" : "locked",
      progress: 0,
      stars: 0,
      score: 0,
      completedAt: null,
    });
  }

  beginner[0] = {
    ...beginner[0],
    status: "completed",
    progress: 100,
    stars: Math.max(beginner[0]?.stars || 0, stars),
    score: Math.max(beginner[0]?.score || 0, score),
    completedAt: beginner[0]?.completedAt || new Date().toISOString(),
  };

  beginner[1] = {
    ...beginner[1],
    status: "available",
  };

  const alreadyCompleted =
    profile.progress?.computer?.beginner?.[0]?.status === "completed";

  const updatedProgress = {
    ...progress,
    computer: {
      ...computer,
      beginner,
    },
  };

  saveProfile({
    progress: updatedProgress,
    points: alreadyCompleted
      ? profile.points || 0
      : (profile.points || 0) + 100,
    coins: alreadyCompleted
      ? profile.coins || 0
      : (profile.coins || 0) + 25,
    stars: alreadyCompleted
      ? profile.stars || 0
      : (profile.stars || 0) + stars,
    lastNewUnitDate: new Date().toISOString().slice(0, 10),
  });
}

export default function ComputerUnit() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const parsedUnitId = Number(unitId || 1);
  const isSupportedUnit = parsedUnitId === 1;

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedUse, setSelectedUse] = useState(null);
  const [activityAnswers, setActivityAnswers] = useState({});
  const [activityMessage, setActivityMessage] = useState("");
  const [gameAnswers, setGameAnswers] = useState({});
  const [gameMessage, setGameMessage] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizMessage, setQuizMessage] = useState("");
  const [finished, setFinished] = useState(false);

  const currentStep = lessonSteps[stepIndex];

  const activityCorrectCount = useMemo(
    () =>
      activityOptions.filter(
        (option) =>
          activityAnswers[option.id] === option.correct
      ).length,
    [activityAnswers]
  );

  const gameCorrectCount = useMemo(
    () =>
      gameObjects.filter(
        (item) =>
          gameAnswers[item.id] === item.correct
      ).length,
    [gameAnswers]
  );

  const quizScore = useMemo(() => {
    if (!quizAnswers.length) return 0;

    const correct = quizAnswers.filter(
      (answer, index) =>
        answer === quizQuestions[index].correctIndex
    ).length;

    return Math.round(
      (correct / quizQuestions.length) * 100
    );
  }, [quizAnswers]);

  const stars = useMemo(() => {
    if (quizScore >= 90) return 3;
    if (quizScore >= 70) return 2;
    return 1;
  }, [quizScore]);

  const nextStep = () => {
    setStepIndex((current) =>
      Math.min(current + 1, lessonSteps.length - 1)
    );
  };

  const previousStep = () => {
    setStepIndex((current) => Math.max(current - 1, 0));
  };

  const validateActivity = () => {
    if (Object.keys(activityAnswers).length < activityOptions.length) {
      setActivityMessage("Selecciona una opción en cada tarjeta.");
      return;
    }

    if (activityCorrectCount === activityOptions.length) {
      setActivityMessage("¡Excelente! Reconociste todos los usos correctos.");
      window.setTimeout(nextStep, 850);
    } else {
      setActivityMessage("Revisa tus respuestas e inténtalo otra vez.");
    }
  };

  const validateGame = () => {
    if (Object.keys(gameAnswers).length < gameObjects.length) {
      setGameMessage("Marca todos los objetos antes de continuar.");
      return;
    }

    if (gameCorrectCount === gameObjects.length) {
      setGameMessage("¡Muy bien! Encontraste todos los dispositivos.");
      window.setTimeout(nextStep, 850);
    } else {
      setGameMessage("Hay objetos que no son computadoras. Intenta otra vez.");
    }
  };

  const answerQuiz = (optionIndex) => {
    const nextAnswers = [...quizAnswers];
    nextAnswers[quizIndex] = optionIndex;
    setQuizAnswers(nextAnswers);

    if (optionIndex === quizQuestions[quizIndex].correctIndex) {
      setQuizMessage("¡Correcto!");
    } else {
      setQuizMessage("Casi. Revisa la explicación y continúa.");
    }

    window.setTimeout(() => {
      setQuizMessage("");

      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex((current) => current + 1);
      } else {
        nextStep();
      }
    }, 700);
  };

  const finishUnit = () => {
    updateComputerProgress(quizScore, stars);
    setFinished(true);
  };

  if (!isSupportedUnit) {
    return (
      <main className="computer-unit-screen">
        <section className="computer-unit-not-ready">
          <h1>Esta unidad aún está en construcción</h1>
          <p>Por ahora ya puedes completar la Unidad 1.</p>
          <button
            type="button"
            onClick={() => navigate("/computer/beginner")}
          >
            Volver al mapa
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="computer-unit-screen">
      <header className="computer-unit-topbar">
        <button
          type="button"
          className="computer-unit-back"
          onClick={() => navigate("/computer/beginner")}
        >
          <ArrowLeft size={22} />
          Volver al mapa
        </button>

        <div className="computer-unit-heading">
          <span>Unidad 1</span>
          <strong>La computadora</strong>
        </div>

        <div className="computer-unit-step-counter">
          {stepIndex + 1} / {lessonSteps.length}
        </div>
      </header>

      <section className="computer-unit-progress">
        {lessonSteps.map((step, index) => {
          const Icon = step.icon;
          const active = index === stepIndex;
          const completed = index < stepIndex;

          return (
            <div
              key={step.id}
              className={`computer-unit-progress-item ${
                active ? "active" : ""
              } ${completed ? "completed" : ""}`}
            >
              <span>
                <Icon size={20} />
              </span>
              <small>{step.title}</small>
            </div>
          );
        })}
      </section>

      <AnimatePresence mode="wait">
        <motion.section
          key={currentStep.id}
          className="computer-unit-content"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -70 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {stepIndex === 0 && (
            <div className="computer-unit-panel intro-panel">
              <div className="intro-copy">
                <span className="computer-unit-badge">
                  <Sparkles size={18} />
                  Nueva misión
                </span>

                <h1>¿Qué es una computadora?</h1>

                <p>
                  Una computadora es una herramienta electrónica que recibe,
                  procesa y muestra información. Nos ayuda a aprender, escribir,
                  dibujar, investigar y divertirnos.
                </p>

                <div className="computer-unit-fact">
                  💡 Una computadora puede realizar millones de operaciones en
                  pocos segundos.
                </div>

                <button
                  type="button"
                  className="computer-unit-primary"
                  onClick={nextStep}
                >
                  Comenzar
                  <ArrowRight size={22} />
                </button>
              </div>

              <div className="intro-computer">
                <div className="computer-character">
                  <div className="computer-character-screen">
                    <span>◕‿◕</span>
                  </div>
                  <div className="computer-character-base" />
                </div>
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div className="computer-unit-panel learn-panel">
              <div className="computer-unit-section-title">
                <BookOpen size={30} />
                <div>
                  <h2>¿Para qué sirve?</h2>
                  <p>
                    Toca cada tarjeta para descubrir un uso de la computadora.
                  </p>
                </div>
              </div>

              <div className="computer-use-grid">
                {uses.map((item) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    className={`computer-use-card ${
                      selectedUse === item.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedUse(item.id)}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span>{item.emoji}</span>
                    <strong>{item.title}</strong>
                    <p>
                      {selectedUse === item.id
                        ? item.description
                        : "Toca para descubrir"}
                    </p>
                  </motion.button>
                ))}
              </div>

              <div className="computer-unit-actions">
                <button
                  type="button"
                  className="computer-unit-secondary"
                  onClick={previousStep}
                >
                  <ArrowLeft size={20} />
                  Atrás
                </button>

                <button
                  type="button"
                  className="computer-unit-primary"
                  onClick={nextStep}
                >
                  Continuar
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="computer-unit-panel">
              <div className="computer-unit-section-title">
                <Brain size={30} />
                <div>
                  <h2>¿Se puede hacer con una computadora?</h2>
                  <p>
                    Marca Sí o No en cada opción.
                  </p>
                </div>
              </div>

              <div className="computer-activity-list">
                {activityOptions.map((option) => (
                  <div
                    key={option.id}
                    className="computer-activity-row"
                  >
                    <div>
                      <span>{option.emoji}</span>
                      <strong>{option.label}</strong>
                    </div>

                    <div className="computer-answer-buttons">
                      <button
                        type="button"
                        className={
                          activityAnswers[option.id] === true
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setActivityAnswers((current) => ({
                            ...current,
                            [option.id]: true,
                          }))
                        }
                      >
                        Sí
                      </button>

                      <button
                        type="button"
                        className={
                          activityAnswers[option.id] === false
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setActivityAnswers((current) => ({
                            ...current,
                            [option.id]: false,
                          }))
                        }
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {activityMessage && (
                <div className="computer-unit-message">
                  {activityMessage}
                </div>
              )}

              <div className="computer-unit-actions">
                <button
                  type="button"
                  className="computer-unit-secondary"
                  onClick={previousStep}
                >
                  <ArrowLeft size={20} />
                  Atrás
                </button>

                <button
                  type="button"
                  className="computer-unit-primary"
                  onClick={validateActivity}
                >
                  Revisar
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="computer-unit-panel">
              <div className="computer-unit-section-title">
                <Gamepad2 size={30} />
                <div>
                  <h2>Encuentra los dispositivos</h2>
                  <p>
                    Marca los objetos que sí son tipos de computadora.
                  </p>
                </div>
              </div>

              <div className="computer-game-grid">
                {gameObjects.map((item) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    className={`computer-game-object ${
                      gameAnswers[item.id] === true ? "selected" : ""
                    }`}
                    onClick={() =>
                      setGameAnswers((current) => ({
                        ...current,
                        [item.id]: !current[item.id],
                      }))
                    }
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{item.emoji}</span>
                    <strong>{item.label}</strong>
                  </motion.button>
                ))}
              </div>

              {gameMessage && (
                <div className="computer-unit-message">
                  {gameMessage}
                </div>
              )}

              <div className="computer-unit-actions">
                <button
                  type="button"
                  className="computer-unit-secondary"
                  onClick={previousStep}
                >
                  <ArrowLeft size={20} />
                  Atrás
                </button>

                <button
                  type="button"
                  className="computer-unit-primary"
                  onClick={validateGame}
                >
                  Comprobar
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </div>
          )}

          {stepIndex === 4 && (
            <div className="computer-unit-panel quiz-panel">
              <div className="computer-unit-section-title">
                <CheckCircle2 size={30} />
                <div>
                  <h2>Evaluación final</h2>
                  <p>
                    Pregunta {quizIndex + 1} de {quizQuestions.length}
                  </p>
                </div>
              </div>

              <div className="computer-quiz-progress">
                <div
                  style={{
                    width: `${
                      ((quizIndex + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <h3>{quizQuestions[quizIndex].question}</h3>

              <div className="computer-quiz-options">
                {quizQuestions[quizIndex].options.map(
                  (option, optionIndex) => (
                    <motion.button
                      type="button"
                      key={option}
                      onClick={() => answerQuiz(optionIndex)}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{String.fromCharCode(65 + optionIndex)}</span>
                      {option}
                    </motion.button>
                  )
                )}
              </div>

              {quizMessage && (
                <div className="computer-unit-message">
                  {quizMessage}
                </div>
              )}
            </div>
          )}

          {stepIndex === 5 && (
            <div className="computer-unit-panel reward-panel">
              {!finished ? (
                <>
                  <Trophy size={70} />

                  <h1>¡Misión completada!</h1>

                  <p>
                    Obtuviste {quizScore}% en la evaluación.
                  </p>

                  <div className="computer-reward-stars">
                    {[1, 2, 3].map((starNumber) => (
                      <Star
                        key={starNumber}
                        size={54}
                        fill={
                          starNumber <= stars
                            ? "currentColor"
                            : "transparent"
                        }
                        className={
                          starNumber <= stars
                            ? "earned"
                            : ""
                        }
                      />
                    ))}
                  </div>

                  <div className="computer-reward-list">
                    <div>
                      <span>⭐</span>
                      <strong>+100 XP</strong>
                    </div>

                    <div>
                      <span>🪙</span>
                      <strong>+25 monedas</strong>
                    </div>

                    <div>
                      <span>🔓</span>
                      <strong>Unidad 2 desbloqueada</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="computer-unit-primary"
                    onClick={finishUnit}
                  >
                    Reclamar recompensa
                    <Sparkles size={22} />
                  </button>
                </>
              ) : (
                <>
                  <CheckCircle2 size={76} />

                  <h1>¡Recompensa guardada!</h1>

                  <p>
                    Tus monedas, estrellas y progreso ya están guardados.
                  </p>

                  <button
                    type="button"
                    className="computer-unit-primary"
                    onClick={() =>
                      navigate("/computer/beginner")
                    }
                  >
                    Volver al mapa
                    <ArrowRight size={22} />
                  </button>
                </>
              )}
            </div>
          )}
        </motion.section>
      </AnimatePresence>
    </main>
  );
}
