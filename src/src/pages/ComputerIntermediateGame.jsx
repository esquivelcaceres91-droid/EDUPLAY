import "../styles/computer-intermediate-game.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  FilePlus2,
  Heart,
  ImagePlus,
  RotateCcw,
  Save,
  Sparkles,
  Type,
  XCircle,
  Presentation,
  Image,
  Heading1,
  AlignLeft,
  MousePointer2,
  Cpu,
  Monitor,
  FileText,
  FileSpreadsheet,
  School,
  Trophy,
} from "lucide-react";

/* =========================
   UNIDAD 1: WORD
========================= */

const wordSteps = [
  {
    id: "new",
    label: "Crear documento",
    description: "Abrir un documento nuevo",
    icon: FilePlus2,
  },
  {
    id: "type",
    label: "Escribir contenido",
    description: "Agregar el texto del trabajo",
    icon: Type,
  },
  {
    id: "image",
    label: "Insertar imagen",
    description: "Colocar una imagen en el documento",
    icon: ImagePlus,
  },
  {
    id: "save",
    label: "Guardar",
    description: "Conservar el trabajo realizado",
    icon: Save,
  },
];

const shuffleArray = (items) => {
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

function WordGame({ currentUnit, navigate }) {
  const [shuffledSteps, setShuffledSteps] = useState(
    () => shuffleArray(wordSteps)
  );

  const [selectedSteps, setSelectedSteps] = useState([]);
  const [checked, setChecked] = useState(false);

  const availableSteps = useMemo(() => {
    return shuffledSteps.filter(
      (step) => !selectedSteps.includes(step.id)
    );
  }, [selectedSteps, shuffledSteps]);

  const orderedSelectedSteps = selectedSteps.map(
    (stepId) =>
      wordSteps.find((step) => step.id === stepId)
  );

  const isCorrect =
    checked &&
    selectedSteps.every(
      (stepId, index) =>
        stepId === wordSteps[index].id
    );

  const resetGame = () => {
    setSelectedSteps([]);
    setChecked(false);
    setShuffledSteps(shuffleArray(wordSteps));
  };

  return (
    <motion.article
      className="intermediate-game-card"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="intermediate-game-intro">
        <div>
          <span>Minijuego</span>
          <h1>Construye el orden correcto</h1>
          <p>
            Lee cada acción y selecciónala en el orden
            correcto para crear un trabajo en Word.
          </p>
        </div>

        <div className="intermediate-game-progress">
          <strong>
            {selectedSteps.length}/{wordSteps.length}
          </strong>
          <span>Pasos colocados</span>
        </div>
      </div>

      <div className="intermediate-game-workspace">
        <section className="intermediate-game-options">
          <h2>Acciones desordenadas</h2>

          <div className="intermediate-game-option-list">
            {availableSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <motion.button
                  type="button"
                  key={step.id}
                  className="intermediate-game-option"
                  onClick={() => {
                    if (checked) return;

                    setSelectedSteps((current) => [
                      ...current,
                      step.id,
                    ]);
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>
                    <StepIcon size={31} />
                  </span>

                  <div>
                    <strong>{step.label}</strong>
                    <small>{step.description}</small>
                  </div>
                </motion.button>
              );
            })}

            {availableSteps.length === 0 && (
              <div className="intermediate-game-options-empty">
                <Sparkles size={31} />
                Ya colocaste todas las acciones.
              </div>
            )}
          </div>
        </section>

        <section className="intermediate-game-sequence">
          <h2>Tu secuencia</h2>

          <div className="intermediate-game-sequence-list">
            {[0, 1, 2, 3].map((position) => {
              const step =
                orderedSelectedSteps[position];

              if (!step) {
                return (
                  <div
                    key={position}
                    className="intermediate-game-slot"
                  >
                    <span>{position + 1}</span>
                    <strong>Selecciona una acción</strong>
                  </div>
                );
              }

              const StepIcon = step.icon;
              const correctPosition =
                checked &&
                step.id === wordSteps[position].id;
              const wrongPosition =
                checked &&
                step.id !== wordSteps[position].id;

              return (
                <motion.button
                  type="button"
                  key={`${step.id}-${position}`}
                  className={`intermediate-game-slot intermediate-game-slot-filled ${
                    correctPosition
                      ? "intermediate-game-slot-correct"
                      : ""
                  } ${
                    wrongPosition
                      ? "intermediate-game-slot-wrong"
                      : ""
                  }`}
                  onClick={() => {
                    if (checked) return;

                    setSelectedSteps((current) =>
                      current.filter(
                        (id) => id !== step.id
                      )
                    );
                  }}
                >
                  <span>{position + 1}</span>

                  <div className="intermediate-game-slot-icon">
                    <StepIcon size={25} />
                  </div>

                  <strong>{step.label}</strong>

                  {correctPosition && (
                    <CheckCircle2 size={23} />
                  )}

                  {wrongPosition && (
                    <XCircle size={23} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>

      {checked && (
        <motion.div
          className={`intermediate-game-feedback ${
            isCorrect
              ? "intermediate-game-feedback-correct"
              : "intermediate-game-feedback-wrong"
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={34} />
              <div>
                <strong>¡Orden correcto!</strong>
                <span>
                  Crear, escribir, insertar y guardar.
                </span>
              </div>
            </>
          ) : (
            <>
              <XCircle size={34} />
              <div>
                <strong>Revisa la secuencia</strong>
                <span>
                  Lee nuevamente cada acción.
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="intermediate-game-actions">
        <motion.button
          type="button"
          className="intermediate-game-reset"
          onClick={resetGame}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw size={20} />
          Reiniciar
        </motion.button>

        {!checked ? (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            disabled={
              selectedSteps.length !== wordSteps.length
            }
            onClick={() => setChecked(true)}
          >
            Comprobar orden
          </motion.button>
        ) : isCorrect ? (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            onClick={() =>
              navigate(
                `/computer/intermediate/unit/${currentUnit}/quiz`
              )
            }
          >
            Ir a la evaluación
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            onClick={resetGame}
          >
            Intentar otra vez
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

/* =========================
   UNIDAD 2: EXCEL
========================= */

const students = [
  {
    id: "ana",
    name: "Ana",
    correctScore: "8",
  },
  {
    id: "luis",
    name: "Luis",
    correctScore: "10",
  },
  {
    id: "mateo",
    name: "Mateo",
    correctScore: "9",
  },
];

const scoreOptions = ["9", "8", "10"];

function ExcelGame({ currentUnit, navigate }) {
  const [selectedScore, setSelectedScore] =
    useState(null);

  const [cells, setCells] = useState({
    ana: "",
    luis: "",
    mateo: "",
  });

  const [checked, setChecked] = useState(false);

  const usedScores = Object.values(cells).filter(Boolean);

  const availableScores = scoreOptions.filter(
    (score) => !usedScores.includes(score)
  );

  const completed =
    Object.values(cells).filter(Boolean).length ===
    students.length;

  const isCorrect =
    checked &&
    students.every(
      (student) =>
        cells[student.id] === student.correctScore
    );

  const placeScore = (studentId) => {
    if (!selectedScore || checked) return;

    setCells((current) => ({
      ...current,
      [studentId]: selectedScore,
    }));

    setSelectedScore(null);
  };

  const removeScore = (studentId) => {
    if (checked) return;

    setCells((current) => ({
      ...current,
      [studentId]: "",
    }));
  };

  const resetGame = () => {
    setCells({
      ana: "",
      luis: "",
      mateo: "",
    });

    setSelectedScore(null);
    setChecked(false);
  };

  return (
    <motion.article
      className="intermediate-game-card excel-game-card"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="intermediate-game-intro">
        <div>
          <span>Minijuego de Excel</span>
          <h1>Completa la tabla de notas</h1>
          <p>
            Lee las instrucciones y coloca cada nota en la
            celda correcta.
          </p>
        </div>

        <div className="intermediate-game-progress">
          <strong>
            {usedScores.length}/{students.length}
          </strong>
          <span>Celdas llenas</span>
        </div>
      </div>

      <div className="excel-game-instructions">
        <strong>Datos para completar:</strong>

        <span>Ana obtuvo 8</span>
        <span>Luis obtuvo 10</span>
        <span>Mateo obtuvo 9</span>
      </div>

      <div className="excel-game-layout">
        <section className="excel-score-panel">
          <h2>Notas disponibles</h2>

          <div className="excel-score-buttons">
            {availableScores.map((score) => (
              <motion.button
                type="button"
                key={score}
                className={`excel-score-button ${
                  selectedScore === score
                    ? "excel-score-selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedScore(
                    selectedScore === score
                      ? null
                      : score
                  )
                }
                whileHover={{
                  y: -5,
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.96 }}
              >
                {score}
              </motion.button>
            ))}

            {availableScores.length === 0 && (
              <div className="excel-scores-empty">
                Todas las notas fueron colocadas.
              </div>
            )}
          </div>

          <p>
            Selecciona una nota y luego toca una celda
            vacía.
          </p>
        </section>

        <section className="excel-table-panel">
          <div className="excel-sheet">
            <div className="excel-cell excel-header-cell">
              Nombre
            </div>

            <div className="excel-cell excel-header-cell">
              Nota
            </div>

            {students.map((student) => {
              const value = cells[student.id];

              const correct =
                checked &&
                value === student.correctScore;

              const wrong =
                checked &&
                value !== student.correctScore;

              return (
                <div
                  className="excel-row"
                  key={student.id}
                >
                  <div className="excel-cell excel-name-cell">
                    {student.name}
                  </div>

                  <motion.button
                    type="button"
                    className={`excel-cell excel-answer-cell ${
                      value
                        ? "excel-answer-filled"
                        : ""
                    } ${
                      correct
                        ? "excel-answer-correct"
                        : ""
                    } ${
                      wrong
                        ? "excel-answer-wrong"
                        : ""
                    }`}
                    onClick={() =>
                      value
                        ? removeScore(student.id)
                        : placeScore(student.id)
                    }
                    whileHover={
                      checked
                        ? {}
                        : { scale: 1.03 }
                    }
                    whileTap={
                      checked
                        ? {}
                        : { scale: 0.97 }
                    }
                  >
                    {value || "Colocar nota"}

                    {correct && (
                      <CheckCircle2 size={20} />
                    )}

                    {wrong && (
                      <XCircle size={20} />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {checked && (
        <motion.div
          className={`intermediate-game-feedback ${
            isCorrect
              ? "intermediate-game-feedback-correct"
              : "intermediate-game-feedback-wrong"
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={34} />

              <div>
                <strong>¡Tabla correcta!</strong>
                <span>
                  Colocaste cada dato en su celda correcta.
                </span>
              </div>
            </>
          ) : (
            <>
              <XCircle size={34} />

              <div>
                <strong>Revisa las notas</strong>
                <span>
                  Lee nuevamente los datos antes de
                  completar la tabla.
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="intermediate-game-actions">
        <motion.button
          type="button"
          className="intermediate-game-reset"
          onClick={resetGame}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          <RotateCcw size={20} />
          Reiniciar
        </motion.button>

        {!checked ? (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            disabled={!completed}
            onClick={() => setChecked(true)}
          >
            Comprobar tabla
          </motion.button>
        ) : isCorrect ? (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            onClick={() =>
              navigate(
                `/computer/intermediate/unit/${currentUnit}/quiz`
              )
            }
          >
            Ir a la evaluación
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            onClick={resetGame}
          >
            Intentar otra vez
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}


const powerPointCardsBase = [
  {
    id: "title-a",
    pair: "title",
    label: "Título",
    icon: Heading1,
    correct: true,
  },
  {
    id: "title-b",
    pair: "title",
    label: "Encabezado",
    icon: Heading1,
    correct: true,
  },
  {
    id: "image-a",
    pair: "image",
    label: "Imagen",
    icon: Image,
    correct: true,
  },
  {
    id: "image-b",
    pair: "image",
    label: "Fotografía",
    icon: Image,
    correct: true,
  },
  {
    id: "text-a",
    pair: "text",
    label: "Texto",
    icon: AlignLeft,
    correct: true,
  },
  {
    id: "text-b",
    pair: "text",
    label: "Contenido",
    icon: AlignLeft,
    correct: true,
  },
];

function PowerPointGame({ currentUnit, navigate }) {
  const [cards, setCards] = useState(
    () => shuffleArray(powerPointCardsBase)
  );
  const [openIds, setOpenIds] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [errors, setErrors] = useState(0);

  const complete = matchedPairs.length === 3;

  const selectCard = (card) => {
    if (
      openIds.includes(card.id) ||
      matchedPairs.includes(card.pair) ||
      openIds.length === 2
    ) {
      return;
    }

    const nextOpen = [...openIds, card.id];
    setOpenIds(nextOpen);

    if (nextOpen.length === 2) {
      const first = cards.find(
        (item) => item.id === nextOpen[0]
      );
      const second = cards.find(
        (item) => item.id === nextOpen[1]
      );

      if (first.pair === second.pair) {
        window.setTimeout(() => {
          setMatchedPairs((current) => [
            ...current,
            first.pair,
          ]);
          setOpenIds([]);
        }, 550);
      } else {
        setErrors((current) => current + 1);
        window.setTimeout(() => {
          setOpenIds([]);
        }, 800);
      }
    }
  };

  const restart = () => {
    setCards(shuffleArray(powerPointCardsBase));
    setOpenIds([]);
    setMatchedPairs([]);
    setErrors(0);
  };

  return (
    <motion.article
      className="intermediate-game-card ppt-memory-card"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <div className="intermediate-game-intro">
        <div>
          <span>Minijuego de memoria</span>
          <h1>Encuentra las parejas</h1>
          <p>
            Voltea las tarjetas y encuentra los elementos
            relacionados con una diapositiva.
          </p>
        </div>

        <div className="intermediate-game-progress">
          <strong>{matchedPairs.length}/3</strong>
          <span>Parejas</span>
        </div>
      </div>

      <div className="ppt-memory-status">
        <span>
          <Presentation size={20} />
          Busca Título, Texto e Imagen
        </span>

        <strong>Errores: {errors}</strong>
      </div>

      <div className="ppt-memory-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          const open =
            openIds.includes(card.id) ||
            matchedPairs.includes(card.pair);

          return (
            <motion.button
              type="button"
              key={card.id}
              className={`ppt-memory-item ${
                open ? "ppt-memory-open" : ""
              } ${
                matchedPairs.includes(card.pair)
                  ? "ppt-memory-matched"
                  : ""
              }`}
              onClick={() => selectCard(card)}
              whileHover={
                open ? {} : { y: -6, scale: 1.025 }
              }
              whileTap={
                open ? {} : { scale: 0.96 }
              }
            >
              <div className="ppt-memory-inner">
                <div className="ppt-memory-back">
                  <Presentation size={42} />
                  <span>?</span>
                </div>

                <div className="ppt-memory-front">
                  <Icon size={38} />
                  <strong>{card.label}</strong>

                  {matchedPairs.includes(card.pair) && (
                    <CheckCircle2 size={22} />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {complete && (
        <motion.div
          className="intermediate-game-feedback intermediate-game-feedback-correct"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle2 size={34} />

          <div>
            <strong>¡Memoria completada!</strong>
            <span>
              Encontraste los elementos principales de una
              diapositiva.
            </span>
          </div>
        </motion.div>
      )}

      <div className="intermediate-game-actions">
        <motion.button
          type="button"
          className="intermediate-game-reset"
          onClick={restart}
        >
          <RotateCcw size={20} />
          Reiniciar
        </motion.button>

        <motion.button
          type="button"
          className="intermediate-game-primary"
          disabled={!complete}
          onClick={() =>
            navigate(
              `/computer/intermediate/unit/${currentUnit}/quiz`
            )
          }
        >
          Ir a la evaluación
        </motion.button>
      </div>
    </motion.article>
  );
}


const finalMissionQuestions = [
  {
    id: 1,
    situation:
      "El profesor necesita escribir una carta para los padres.",
    answer: "word",
    options: [
      {
        id: "powerpoint",
        label: "PowerPoint",
        icon: Presentation,
      },
      {
        id: "word",
        label: "Word",
        icon: FileText,
      },
      {
        id: "excel",
        label: "Excel",
        icon: FileSpreadsheet,
      },
    ],
  },
  {
    id: 2,
    situation:
      "La directora quiere organizar las notas de 30 estudiantes.",
    answer: "excel",
    options: [
      {
        id: "excel",
        label: "Excel",
        icon: FileSpreadsheet,
      },
      {
        id: "word",
        label: "Word",
        icon: FileText,
      },
      {
        id: "powerpoint",
        label: "PowerPoint",
        icon: Presentation,
      },
    ],
  },
  {
    id: 3,
    situation:
      "Los estudiantes deben presentar el proyecto frente a la clase.",
    answer: "powerpoint",
    options: [
      {
        id: "word",
        label: "Word",
        icon: FileText,
      },
      {
        id: "powerpoint",
        label: "PowerPoint",
        icon: Presentation,
      },
      {
        id: "excel",
        label: "Excel",
        icon: FileSpreadsheet,
      },
    ],
  },
];

function FinalMissionGame({ currentUnit, navigate }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const mission = finalMissionQuestions[questionIndex];
  const isCorrect =
    checked && selected === mission.answer;
  const last =
    questionIndex === finalMissionQuestions.length - 1;

  const check = () => {
    if (!selected) return;

    setChecked(true);

    if (selected === mission.answer) {
      setCorrectAnswers((current) => current + 1);
    }
  };

  const next = () => {
    if (!isCorrect) {
      setSelected(null);
      setChecked(false);
      return;
    }

    if (!last) {
      setQuestionIndex((current) => current + 1);
      setSelected(null);
      setChecked(false);
      return;
    }

    navigate(
      `/computer/intermediate/unit/${currentUnit}/quiz`
    );
  };

  return (
    <motion.article
      className="intermediate-game-card final-mission-game"
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
    >
      <div className="intermediate-game-intro">
        <div>
          <span>Misión final</span>
          <h1>Resuelve las necesidades de la escuela</h1>
          <p>
            Lee cada situación y selecciona la herramienta
            adecuada.
          </p>
        </div>

        <div className="intermediate-game-progress">
          <strong>
            {questionIndex + 1}/
            {finalMissionQuestions.length}
          </strong>
          <span>Situaciones</span>
        </div>
      </div>

      <div className="final-game-scene">
        <School size={52} />

        <div>
          <span>Situación {questionIndex + 1}</span>
          <strong>{mission.situation}</strong>
        </div>
      </div>

      <div className="final-game-options">
        {mission.options.map((option) => {
          const OptionIcon = option.icon;
          const selectedOption =
            selected === option.id;
          const correctOption =
            checked && option.id === mission.answer;
          const wrongOption =
            checked &&
            selectedOption &&
            option.id !== mission.answer;

          return (
            <motion.button
              type="button"
              key={option.id}
              className={`final-game-option ${
                selectedOption
                  ? "final-game-option-selected"
                  : ""
              } ${
                correctOption
                  ? "final-game-option-correct"
                  : ""
              } ${
                wrongOption
                  ? "final-game-option-wrong"
                  : ""
              }`}
              onClick={() => {
                if (!checked) setSelected(option.id);
              }}
              whileHover={
                checked ? {} : { y: -6, scale: 1.025 }
              }
              whileTap={
                checked ? {} : { scale: 0.97 }
              }
            >
              <OptionIcon size={42} />
              <strong>{option.label}</strong>

              {correctOption && (
                <CheckCircle2 size={23} />
              )}

              {wrongOption && (
                <XCircle size={23} />
              )}
            </motion.button>
          );
        })}
      </div>

      {checked && (
        <motion.div
          className={`intermediate-game-feedback ${
            isCorrect
              ? "intermediate-game-feedback-correct"
              : "intermediate-game-feedback-wrong"
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 size={34} />
              <div>
                <strong>¡Decisión correcta!</strong>
                <span>
                  Elegiste la herramienta adecuada.
                </span>
              </div>
            </>
          ) : (
            <>
              <XCircle size={34} />
              <div>
                <strong>Lee nuevamente</strong>
                <span>
                  Piensa para qué sirve cada programa.
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}

      <div className="intermediate-game-actions">
        <div className="final-game-score">
          <Trophy size={20} />
          Aciertos: {correctAnswers}
        </div>

        {!checked ? (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            disabled={!selected}
            onClick={check}
          >
            Confirmar elección
          </motion.button>
        ) : (
          <motion.button
            type="button"
            className="intermediate-game-primary"
            onClick={next}
          >
            {!isCorrect
              ? "Intentar otra vez"
              : last
              ? "Ir a la evaluación final"
              : "Siguiente situación"}
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

export default function ComputerIntermediateGame() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  return (
    <main className="intermediate-game-screen">
      <header className="intermediate-game-topbar">
        <div className="intermediate-nav-buttons">
        <motion.button
          type="button"
          className="intermediate-game-back"
          onClick={() =>
            navigate(
              `/computer/intermediate/unit/${currentUnit}/activity`
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
          className="intermediate-game-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Monitor size={21} />
          <span>Mundo</span>
        </motion.button>
      </div>

        <div className="intermediate-game-heading">
          <span>Computación · Intermedio</span>

          <strong>
            {currentUnit === 4
              ? "Misión final de Computación"
              : currentUnit === 3
              ? "Memoria de PowerPoint"
              : currentUnit === 2
              ? "Tabla interactiva de Excel"
              : "Ordena el trabajo en Word"}
          </strong>
        </div>

        <div className="intermediate-game-hearts">
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="intermediate-game-shell">
        {currentUnit === 4 ? (
          <FinalMissionGame
            currentUnit={currentUnit}
            navigate={navigate}
          />
        ) : currentUnit === 3 ? (
          <PowerPointGame
            currentUnit={currentUnit}
            navigate={navigate}
          />
        ) : currentUnit === 2 ? (
          <ExcelGame
            currentUnit={currentUnit}
            navigate={navigate}
          />
        ) : (
          <WordGame
            currentUnit={currentUnit}
            navigate={navigate}
          />
        )}
      </section>
    </main>
  );
}
