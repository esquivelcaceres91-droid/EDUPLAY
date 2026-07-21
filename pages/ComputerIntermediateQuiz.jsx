import "../styles/computer-intermediate-quiz.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Heart,
  ImagePlus,
  Save,
  Type,
  XCircle,
  Rows3,
  Columns3,
  Square,
  Calculator,
  Presentation,
  PanelsTopLeft,
  WandSparkles,
  Monitor,
  BadgeCheck,
  FileSpreadsheet,
} from "lucide-react";

const questionsByUnit = {
  1: [
    {
      id: 1,
      type: "single",
      title: "Selecciona la herramienta correcta",
      question:
        "¿Qué herramienta permite conservar el documento para abrirlo después?",
      icon: Save,
      options: [
        { id: "a", label: "Guardar", correct: true },
        { id: "b", label: "Insertar imagen", correct: false },
        { id: "c", label: "Cambiar color", correct: false },
      ],
    },
    {
      id: 2,
      type: "multiple",
      title: "Selecciona dos respuestas",
      question:
        "¿Qué elementos podemos agregar dentro de un documento de Word?",
      icon: FileText,
      required: 2,
      options: [
        { id: "a", label: "Texto", correct: true },
        { id: "b", label: "Imágenes", correct: true },
        { id: "c", label: "Gasolina", correct: false },
        { id: "d", label: "Una bicicleta real", correct: false },
      ],
    },
    {
      id: 3,
      type: "single",
      title: "Completa la idea",
      question:
        "Antes de cerrar Word debemos ______ nuestro trabajo.",
      icon: Type,
      options: [
        { id: "a", label: "guardar", correct: true },
        { id: "b", label: "borrar", correct: false },
        { id: "c", label: "apagar el monitor", correct: false },
      ],
    },
    {
      id: 4,
      type: "single",
      title: "Verdadero o falso",
      question:
        "En Word podemos cambiar el tamaño y el estilo de las letras.",
      icon: ImagePlus,
      options: [
        { id: "a", label: "Verdadero", correct: true },
        { id: "b", label: "Falso", correct: false },
      ],
    },
  ],

  2: [
    {
      id: 1,
      type: "single",
      title: "Identifica el concepto",
      question:
        "¿Cómo se llama cada espacio donde escribimos datos en Excel?",
      icon: Square,
      options: [
        { id: "a", label: "Celda", correct: true },
        { id: "b", label: "Párrafo", correct: false },
        { id: "c", label: "Diapositiva", correct: false },
      ],
    },
    {
      id: 2,
      type: "single",
      title: "Selecciona la dirección correcta",
      question:
        "¿En qué dirección se extiende una fila?",
      icon: Rows3,
      options: [
        {
          id: "a",
          label: "De izquierda a derecha",
          correct: true,
        },
        {
          id: "b",
          label: "De arriba hacia abajo",
          correct: false,
        },
        {
          id: "c",
          label: "En forma de círculo",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      type: "single",
      title: "Selecciona la dirección correcta",
      question:
        "¿En qué dirección se extiende una columna?",
      icon: Columns3,
      options: [
        {
          id: "a",
          label: "De arriba hacia abajo",
          correct: true,
        },
        {
          id: "b",
          label: "De izquierda a derecha",
          correct: false,
        },
        {
          id: "c",
          label: "En forma diagonal siempre",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      type: "multiple",
      title: "Selecciona dos respuestas",
      question:
        "¿Qué tipos de datos podemos escribir en Excel?",
      icon: FileText,
      required: 2,
      options: [
        { id: "a", label: "Nombres", correct: true },
        { id: "b", label: "Números", correct: true },
        {
          id: "c",
          label: "Objetos físicos dentro de la pantalla",
          correct: false,
        },
        {
          id: "d",
          label: "Una bicicleta real",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      type: "single",
      title: "Completa la idea",
      question:
        "La función ______ sirve para agregar varios números.",
      icon: Calculator,
      options: [
        { id: "a", label: "SUMA", correct: true },
        { id: "b", label: "DIBUJO", correct: false },
        { id: "c", label: "BORRAR TODO", correct: false },
      ],
    },
  ],

  3: [
    {
      id: 1,
      type: "single",
      title: "Identifica el programa",
      question:
        "¿Qué programa usamos para crear presentaciones con diapositivas?",
      icon: Presentation,
      options: [
        { id: "a", label: "Microsoft PowerPoint", correct: true },
        { id: "b", label: "Calculadora", correct: false },
        { id: "c", label: "Bloc de notas solamente", correct: false },
      ],
    },
    {
      id: 2,
      type: "multiple",
      title: "Selecciona tres respuestas",
      question:
        "¿Qué elementos podemos colocar en una diapositiva?",
      icon: PanelsTopLeft,
      required: 3,
      options: [
        { id: "a", label: "Título", correct: true },
        { id: "b", label: "Texto", correct: true },
        { id: "c", label: "Imágenes", correct: true },
        { id: "d", label: "Gasolina", correct: false },
      ],
    },
    {
      id: 3,
      type: "single",
      title: "Completa la idea",
      question:
        "Cada página de una presentación se llama ______.",
      icon: Presentation,
      options: [
        { id: "a", label: "diapositiva", correct: true },
        { id: "b", label: "celda", correct: false },
        { id: "c", label: "carpeta", correct: false },
      ],
    },
    {
      id: 4,
      type: "single",
      title: "Reconoce la función",
      question:
        "¿Qué es una transición en PowerPoint?",
      icon: WandSparkles,
      options: [
        {
          id: "a",
          label: "Un efecto al cambiar de diapositiva",
          correct: true,
        },
        {
          id: "b",
          label: "Una contraseña de Internet",
          correct: false,
        },
        {
          id: "c",
          label: "Una operación de Excel",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      type: "single",
      title: "Verdadero o falso",
      question:
        "Una buena diapositiva debe tener texto claro y no estar demasiado llena.",
      icon: PanelsTopLeft,
      options: [
        { id: "a", label: "Verdadero", correct: true },
        { id: "b", label: "Falso", correct: false },
      ],
    },
  ],

  4: [
    {
      id: 1,
      type: "single",
      title: "Elige la herramienta",
      question:
        "¿Qué programa usarías para escribir una carta formal?",
      icon: FileText,
      options: [
        {
          id: "a",
          label: "Microsoft Word",
          correct: true,
        },
        {
          id: "b",
          label: "Microsoft Excel",
          correct: false,
        },
        {
          id: "c",
          label: "Microsoft PowerPoint",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      type: "single",
      title: "Elige la herramienta",
      question:
        "¿Qué programa usarías para organizar nombres, cantidades y notas?",
      icon: FileSpreadsheet,
      options: [
        {
          id: "a",
          label: "Microsoft Excel",
          correct: true,
        },
        {
          id: "b",
          label: "Microsoft Word",
          correct: false,
        },
        {
          id: "c",
          label: "Paint",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      type: "single",
      title: "Elige la herramienta",
      question:
        "¿Qué programa usarías para exponer un proyecto con diapositivas?",
      icon: Presentation,
      options: [
        {
          id: "a",
          label: "Microsoft PowerPoint",
          correct: true,
        },
        {
          id: "b",
          label: "Microsoft Excel",
          correct: false,
        },
        {
          id: "c",
          label: "Calculadora",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      type: "multiple",
      title: "Selecciona tres respuestas",
      question:
        "¿Qué acciones forman parte de un proyecto digital completo?",
      icon: BadgeCheck,
      required: 3,
      options: [
        {
          id: "a",
          label: "Escribir un informe",
          correct: true,
        },
        {
          id: "b",
          label: "Organizar datos",
          correct: true,
        },
        {
          id: "c",
          label: "Crear una presentación",
          correct: true,
        },
        {
          id: "d",
          label: "Desconectar todos los cables",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      type: "single",
      title: "Verdadero o falso",
      question:
        "Word, Excel y PowerPoint pueden trabajar juntos dentro de un mismo proyecto.",
      icon: BadgeCheck,
      options: [
        {
          id: "a",
          label: "Verdadero",
          correct: true,
        },
        {
          id: "b",
          label: "Falso",
          correct: false,
        },
      ],
    },
  ],
};

const unitNames = {
  1: "Microsoft Word",
  2: "Microsoft Excel",
  3: "Microsoft PowerPoint",
  4: "Reto Final",
};

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

const createQuestions = (unitId) => {
  const source =
    questionsByUnit[unitId] || questionsByUnit[1];

  return source.map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
};

export default function ComputerIntermediateQuiz() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [questions, setQuestions] = useState(
    () => createQuestions(currentUnit)
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const question = questions[questionIndex];
  const QuestionIcon = question.icon;

  const isLastQuestion =
    questionIndex === questions.length - 1;

  const isAnswerCorrect = useMemo(() => {
    if (!checked) return false;

    const correctIds = question.options
      .filter((option) => option.correct)
      .map((option) => option.id)
      .sort();

    return (
      [...selectedIds].sort().join(",") ===
      correctIds.join(",")
    );
  }, [checked, question.options, selectedIds]);

  const requiredSelections =
    question.type === "multiple"
      ? question.required
      : 1;

  const canCheck =
    selectedIds.length === requiredSelections;

  const selectOption = (optionId) => {
    if (checked) return;

    if (question.type === "single") {
      setSelectedIds([optionId]);
      return;
    }

    setSelectedIds((current) => {
      if (current.includes(optionId)) {
        return current.filter((id) => id !== optionId);
      }

      if (current.length >= requiredSelections) {
        return current;
      }

      return [...current, optionId];
    });
  };

  const checkAnswer = () => {
    if (!canCheck) return;

    const correctIds = question.options
      .filter((option) => option.correct)
      .map((option) => option.id)
      .sort();

    const correct =
      [...selectedIds].sort().join(",") ===
      correctIds.join(",");

    setChecked(true);

    if (correct) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) => Math.max(0, current - 1));
    }
  };

  const reshuffleCurrentQuestion = () => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((currentQuestion, index) =>
        index === questionIndex
          ? {
              ...currentQuestion,
              options: shuffleArray(
                currentQuestion.options
              ),
            }
          : currentQuestion
      )
    );
  };

  const continueQuiz = () => {
    if (!isAnswerCorrect) {
      setSelectedIds([]);
      setChecked(false);
      reshuffleCurrentQuestion();
      return;
    }

    if (!isLastQuestion) {
      setQuestionIndex((current) => current + 1);
      setSelectedIds([]);
      setChecked(false);
      return;
    }

    navigate(
      `/computer/intermediate/unit/${currentUnit}/reward`,
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
    <main className="intermediate-quiz-screen">
      <header className="intermediate-quiz-topbar">
        <div className="intermediate-nav-buttons">
        <motion.button
          type="button"
          className="intermediate-quiz-back"
          onClick={() =>
            navigate(
              `/computer/intermediate/unit/${currentUnit}/game`
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
          className="intermediate-quiz-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Monitor size={21} />
          <span>Mundo</span>
        </motion.button>
      </div>

        <div className="intermediate-quiz-heading">
          <span>Computación · Intermedio</span>
          <strong>
            Evaluación de {unitNames[currentUnit]}
          </strong>
        </div>

        <div className="intermediate-quiz-hearts">
          {[1, 2, 3].map((heartNumber) => (
            <Heart
              key={heartNumber}
              size={23}
              fill={
                heartNumber <= hearts
                  ? "currentColor"
                  : "none"
              }
            />
          ))}

          <span>{hearts}</span>
        </div>
      </header>

      <section className="intermediate-quiz-shell">
        <motion.article
          key={question.id}
          className="intermediate-quiz-card"
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
            duration: 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="intermediate-quiz-progress">
            <div>
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

            <div className="intermediate-quiz-track">
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
          </div>

          <div className="intermediate-quiz-question">
            <div className="intermediate-quiz-question-icon">
              <QuestionIcon size={39} />
            </div>

            <div>
              <span>{question.title}</span>
              <h1>{question.question}</h1>
            </div>
          </div>

          <div className="intermediate-quiz-options">
            {question.options.map((option) => {
              const selected =
                selectedIds.includes(option.id);

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
                  className={`intermediate-quiz-option ${
                    selected
                      ? "intermediate-quiz-option-selected"
                      : ""
                  } ${
                    showCorrect
                      ? "intermediate-quiz-option-correct"
                      : ""
                  } ${
                    showWrong
                      ? "intermediate-quiz-option-wrong"
                      : ""
                  }`}
                  onClick={() =>
                    selectOption(option.id)
                  }
                  whileHover={
                    checked
                      ? {}
                      : {
                          y: -4,
                          scale: 1.015,
                        }
                  }
                  whileTap={
                    checked ? {} : { scale: 0.98 }
                  }
                >
                  <span className="intermediate-quiz-option-check">
                    {showCorrect ? (
                      <CheckCircle2 size={24} />
                    ) : showWrong ? (
                      <XCircle size={24} />
                    ) : selected ? (
                      <CheckCircle2 size={22} />
                    ) : null}
                  </span>

                  <strong>{option.label}</strong>
                </motion.button>
              );
            })}
          </div>

          {checked && (
            <motion.div
              className={`intermediate-quiz-feedback ${
                isAnswerCorrect
                  ? "intermediate-quiz-feedback-correct"
                  : "intermediate-quiz-feedback-wrong"
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
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 size={32} />

                  <div>
                    <strong>¡Respuesta correcta!</strong>
                    <span>
                      Continúa con la siguiente pregunta.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} />

                  <div>
                    <strong>Revisa tu respuesta</strong>
                    <span>
                      Las opciones cambiarán de posición
                      para que vuelvas a leerlas.
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          )}

          <div className="intermediate-quiz-actions">
            {!checked ? (
              <motion.button
                type="button"
                className="intermediate-quiz-primary"
                disabled={!canCheck}
                onClick={checkAnswer}
                whileHover={
                  canCheck ? { scale: 1.04 } : {}
                }
                whileTap={
                  canCheck ? { scale: 0.96 } : {}
                }
              >
                Comprobar respuesta
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="intermediate-quiz-primary"
                onClick={continueQuiz}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {!isAnswerCorrect
                  ? "Intentar otra vez"
                  : isLastQuestion
                  ? "Ver recompensa"
                  : "Siguiente pregunta"}
              </motion.button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}
