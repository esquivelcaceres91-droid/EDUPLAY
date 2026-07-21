import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Keyboard,
  Monitor,
  MousePointer2,
  Trophy,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

/* =========================================================
   CONTENIDO DE LAS EVALUACIONES
========================================================= */

const quizContent = {
  1: {
    title: "Demuestra lo que aprendiste",
    icon: Monitor,
    questions: [
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
        question:
          "¿Qué hace una computadora con la información?",
        options: [
          "La recibe, procesa y guarda",
          "La convierte en comida",
          "La elimina automáticamente",
        ],
        correctAnswer: "La recibe, procesa y guarda",
      },
    ],
  },

  2: {
    title: "Identifica las partes de la computadora",
    icon: Monitor,
    questions: [
      {
        id: 1,
        question:
          "¿Qué parte de la computadora muestra imágenes, letras y videos?",
        options: ["Monitor", "Teclado", "Mouse"],
        correctAnswer: "Monitor",
      },
      {
        id: 2,
        question:
          "¿Qué parte utilizamos para escribir letras y números?",
        options: ["Teclado", "Monitor", "CPU"],
        correctAnswer: "Teclado",
      },
      {
        id: 3,
        question:
          "¿Qué parte movemos con la mano para controlar el puntero?",
        options: ["Mouse", "Monitor", "Teclado"],
        correctAnswer: "Mouse",
      },
      {
        id: 4,
        question:
          "¿Qué parte es conocida como el cerebro de la computadora?",
        options: ["CPU", "Mouse", "Monitor"],
        correctAnswer: "CPU",
      },
      {
        id: 5,
        question:
          "¿Qué parte tiene teclas como letras, números y la barra espaciadora?",
        options: ["Teclado", "CPU", "Monitor"],
        correctAnswer: "Teclado",
      },
      {
        id: 6,
        question:
          "¿En qué parte podemos ver lo que estamos haciendo?",
        options: ["Monitor", "Mouse", "CPU"],
        correctAnswer: "Monitor",
      },
      {
        id: 7,
        question:
          "¿Qué parte tiene botones para hacer clic?",
        options: ["Mouse", "Teclado", "Monitor"],
        correctAnswer: "Mouse",
      },
      {
        id: 8,
        question:
          "¿Qué parte procesa la información de la computadora?",
        options: ["CPU", "Monitor", "Mouse"],
        correctAnswer: "CPU",
      },
    ],
  },

  3: {
    title: "Reto visual del teclado",
    icon: Keyboard,
    questions: [
      {
        id: 1,
        visual: "ESPACIO",
        question:
          "¿Para qué sirve esta tecla?",
        options: [
          "Para separar palabras",
          "Para borrar letras",
          "Para apagar la computadora",
        ],
        correctAnswer: "Para separar palabras",
      },
      {
        id: 2,
        visual: "ENTER ↵",
        question:
          "¿Qué hace normalmente la tecla Enter?",
        options: [
          "Cambia de línea o confirma una acción",
          "Escribe solamente números",
          "Mueve el mouse",
        ],
        correctAnswer:
          "Cambia de línea o confirma una acción",
      },
      {
        id: 3,
        visual: "⌫",
        question:
          "¿Qué tecla usamos para borrar hacia atrás?",
        options: [
          "Retroceso",
          "Espacio",
          "Bloq Mayús",
        ],
        correctAnswer: "Retroceso",
      },
      {
        id: 4,
        visual: "A",
        question:
          "¿Qué tipo de tecla aparece en la imagen?",
        options: [
          "Una letra",
          "Un número",
          "Una tecla para borrar",
        ],
        correctAnswer: "Una letra",
      },
      {
        id: 5,
        visual: "8",
        question:
          "¿Qué tipo de tecla aparece en la imagen?",
        options: [
          "Un número",
          "Una letra",
          "La barra espaciadora",
        ],
        correctAnswer: "Un número",
      },
      {
        id: 6,
        visual: "MAYÚS ⇧",
        question:
          "¿Para qué sirve la tecla Mayús?",
        options: [
          "Para escribir mayúsculas y símbolos superiores",
          "Para eliminar todo el texto",
          "Para cerrar el monitor",
        ],
        correctAnswer:
          "Para escribir mayúsculas y símbolos superiores",
      },
      {
        id: 7,
        visual: "ABC 123",
        question:
          "¿Qué podemos escribir con el teclado?",
        options: [
          "Letras, números y símbolos",
          "Únicamente dibujos",
          "Solo sonidos",
        ],
        correctAnswer:
          "Letras, números y símbolos",
      },
      {
        id: 8,
        visual: "⌨️",
        question:
          "¿Cuál es la función principal del teclado?",
        options: [
          "Escribir y dar instrucciones",
          "Mostrar imágenes",
          "Mover el puntero",
        ],
        correctAnswer:
          "Escribir y dar instrucciones",
      },
    ],
  },

  4: {
    title: "Reto del mouse",
    icon: MousePointer2,
    questions: [
      {
        id: 1,
        visual: "🖱️ 1 clic",
        question:
          "¿Qué acción usamos para seleccionar un objeto?",
        options: [
          "Un clic izquierdo",
          "Un doble clic",
          "Mover la rueda",
        ],
        correctAnswer: "Un clic izquierdo",
      },
      {
        id: 2,
        visual: "🖱️ 2 clics",
        question:
          "¿Qué acción usamos normalmente para abrir una carpeta?",
        options: [
          "Un doble clic",
          "Un clic derecho",
          "Mover el mouse sin hacer clic",
        ],
        correctAnswer: "Un doble clic",
      },
      {
        id: 3,
        visual: "🖱️ ➡️",
        question:
          "¿Qué aparece normalmente al hacer clic derecho?",
        options: [
          "Un menú con más opciones",
          "El teclado en pantalla",
          "La computadora se apaga",
        ],
        correctAnswer: "Un menú con más opciones",
      },
      {
        id: 4,
        visual: "🛞",
        question:
          "¿Para qué sirve la rueda del mouse?",
        options: [
          "Para subir y bajar por una página",
          "Para escribir letras",
          "Para encender la computadora",
        ],
        correctAnswer:
          "Para subir y bajar por una página",
      },
      {
        id: 5,
        visual: "↖️",
        question:
          "¿Qué controla el movimiento del mouse?",
        options: [
          "El puntero de la pantalla",
          "El sonido de las bocinas",
          "Las letras del teclado",
        ],
        correctAnswer:
          "El puntero de la pantalla",
      },
      {
        id: 6,
        visual: "🖱️",
        question:
          "¿Con qué parte hacemos clic y arrastramos objetos?",
        options: [
          "Con el mouse",
          "Con el monitor",
          "Con la CPU",
        ],
        correctAnswer: "Con el mouse",
      },
    ],
  },

  5: {
    title: "Reto práctico de Windows",
    icon: Monitor,
    interactive: true,
    questions: [
      {
        id: 1,
        question: "Toca el botón que abre el menú Inicio.",
        target: "start",
      },
      {
        id: 2,
        question: "Toca la carpeta Documentos.",
        target: "folder",
      },
      {
        id: 3,
        question: "Toca el botón para minimizar la ventana.",
        target: "minimize",
      },
      {
        id: 4,
        question: "Toca el botón para maximizar la ventana.",
        target: "maximize",
      },
      {
        id: 5,
        question: "Toca el botón que cierra la ventana.",
        target: "close",
      },
      {
        id: 6,
        question: "Toca la barra de tareas.",
        target: "taskbar",
      },
    ],
  },

  6: {
    title: "Clasifica archivos y carpetas",
    icon: Monitor,
    classify: true,
    questions: [
      {
        id: 1,
        visual: "📁",
        question: "¿Qué tipo de elemento es este?",
        targets: [
          { id: "folder", label: "Carpeta", emoji: "📁" },
          { id: "file", label: "Archivo", emoji: "📄" },
        ],
        target: "folder",
      },
      {
        id: 2,
        visual: "📄 Tarea.docx",
        question: "¿Qué tipo de elemento es este?",
        targets: [
          { id: "folder", label: "Carpeta", emoji: "📁" },
          { id: "file", label: "Archivo", emoji: "📄" },
        ],
        target: "file",
      },
      {
        id: 3,
        visual: "🎵 Canción.mp3",
        question: "¿Dónde debe guardarse?",
        targets: [
          { id: "music", label: "Música", emoji: "🎵" },
          { id: "images", label: "Imágenes", emoji: "🖼️" },
          { id: "school", label: "Escuela", emoji: "🎒" },
        ],
        target: "music",
      },
      {
        id: 4,
        visual: "📷 Foto.jpg",
        question: "¿Dónde debe guardarse?",
        targets: [
          { id: "school", label: "Escuela", emoji: "🎒" },
          { id: "images", label: "Imágenes", emoji: "🖼️" },
          { id: "music", label: "Música", emoji: "🎵" },
        ],
        target: "images",
      },
      {
        id: 5,
        visual: "📕 Proyecto.pdf",
        question: "¿Dónde debe guardarse?",
        targets: [
          { id: "trash", label: "Papelera", emoji: "🗑️" },
          { id: "school", label: "Escuela", emoji: "🎒" },
          { id: "music", label: "Música", emoji: "🎵" },
        ],
        target: "school",
      },
      {
        id: 6,
        visual: "🗒️ Temporal.tmp",
        question: "Ya no lo necesitamos. ¿Dónde lo colocamos?",
        targets: [
          { id: "images", label: "Imágenes", emoji: "🖼️" },
          { id: "trash", label: "Papelera", emoji: "🗑️" },
          { id: "school", label: "Escuela", emoji: "🎒" },
        ],
        target: "trash",
      },
    ],
  },

  7: {
    title: "Reto de herramientas de Paint",
    icon: Monitor,
    classify: true,
    questions: [
      {
        id: 1,
        visual: "🖌️",
        question: "¿Qué herramienta sirve para dibujar con trazos?",
        targets: [
          { id: "brush", label: "Pincel", emoji: "🖌️" },
          { id: "eraser", label: "Borrador", emoji: "🧽" },
          { id: "save", label: "Guardar", emoji: "💾" },
        ],
        target: "brush",
      },
      {
        id: 2,
        visual: "🧽",
        question: "¿Qué herramienta elimina una parte del dibujo?",
        targets: [
          { id: "fill", label: "Relleno", emoji: "🪣" },
          { id: "eraser", label: "Borrador", emoji: "🧽" },
          { id: "shapes", label: "Formas", emoji: "🔷" },
        ],
        target: "eraser",
      },
      {
        id: 3,
        visual: "🪣",
        question: "¿Qué herramienta pinta un área completa?",
        targets: [
          { id: "fill", label: "Relleno", emoji: "🪣" },
          { id: "brush", label: "Pincel", emoji: "🖌️" },
          { id: "save", label: "Guardar", emoji: "💾" },
        ],
        target: "fill",
      },
      {
        id: 4,
        visual: "🔷",
        question: "¿Qué herramienta agrega círculos, cuadrados y otras figuras?",
        targets: [
          { id: "eraser", label: "Borrador", emoji: "🧽" },
          { id: "shapes", label: "Formas", emoji: "🔷" },
          { id: "brush", label: "Pincel", emoji: "🖌️" },
        ],
        target: "shapes",
      },
      {
        id: 5,
        visual: "🎨",
        question: "¿Qué usamos para cambiar el color del dibujo?",
        targets: [
          { id: "colors", label: "Paleta de colores", emoji: "🎨" },
          { id: "save", label: "Guardar", emoji: "💾" },
          { id: "eraser", label: "Borrador", emoji: "🧽" },
        ],
        target: "colors",
      },
      {
        id: 6,
        visual: "💾",
        question: "¿Qué botón evita que perdamos nuestro dibujo?",
        targets: [
          { id: "brush", label: "Pincel", emoji: "🖌️" },
          { id: "save", label: "Guardar", emoji: "💾" },
          { id: "fill", label: "Relleno", emoji: "🪣" },
        ],
        target: "save",
      },
    ],
  },

  8: {
    title: "Reto de Internet Seguro",
    icon: Monitor,
    classify: true,
    questions: [
      {
        id: 1,
        visual: "🌐",
        question: "¿Dónde escribimos la dirección de una página web?",
        targets: [
          { id: "address", label: "Barra de direcciones", emoji: "🔎" },
          { id: "reload", label: "Recargar", emoji: "⟳" },
          { id: "back", label: "Atrás", emoji: "←" },
        ],
        target: "address",
      },
      {
        id: 2,
        visual: "⟳",
        question: "¿Qué botón actualiza una página?",
        targets: [
          { id: "newtab", label: "Nueva pestaña", emoji: "+" },
          { id: "reload", label: "Recargar", emoji: "⟳" },
          { id: "back", label: "Atrás", emoji: "←" },
        ],
        target: "reload",
      },
      {
        id: 3,
        visual: "←",
        question: "¿Qué botón regresa a la página anterior?",
        targets: [
          { id: "back", label: "Atrás", emoji: "←" },
          { id: "reload", label: "Recargar", emoji: "⟳" },
          { id: "newtab", label: "Nueva pestaña", emoji: "+" },
        ],
        target: "back",
      },
      {
        id: 4,
        visual: "+",
        question: "¿Qué botón abre una pestaña nueva?",
        targets: [
          { id: "close", label: "Cerrar", emoji: "✕" },
          { id: "newtab", label: "Nueva pestaña", emoji: "+" },
          { id: "back", label: "Atrás", emoji: "←" },
        ],
        target: "newtab",
      },
      {
        id: 5,
        visual: "🔐",
        question: "¿Qué debemos hacer con nuestra contraseña?",
        targets: [
          { id: "share", label: "Compartirla con todos", emoji: "📢" },
          { id: "secret", label: "Mantenerla en secreto", emoji: "🔐" },
          { id: "publish", label: "Publicarla", emoji: "🌐" },
        ],
        target: "secret",
      },
      {
        id: 6,
        visual: "⚠️",
        question: "¿Qué hacemos si una página parece peligrosa?",
        targets: [
          { id: "continue", label: "Continuar solo", emoji: "▶️" },
          { id: "adult", label: "Avisar a un adulto", emoji: "🧑" },
          { id: "download", label: "Descargar todo", emoji: "⬇️" },
        ],
        target: "adult",
      },
      {
        id: 7,
        visual: "👤",
        question: "¿Debemos hablar con desconocidos en Internet?",
        targets: [
          { id: "yes", label: "Sí, siempre", emoji: "✅" },
          { id: "no", label: "No", emoji: "🚫" },
        ],
        target: "no",
      },
      {
        id: 8,
        visual: "⬇️",
        question: "Antes de descargar algo debemos...",
        targets: [
          { id: "adult", label: "Pedir permiso a un adulto", emoji: "🧑" },
          { id: "fast", label: "Descargarlo rápido", emoji: "⚡" },
          { id: "ignore", label: "Ignorar las advertencias", emoji: "🙈" },
        ],
        target: "adult",
      },
    ],
  },

  9: {
    title: "Evaluación final de Computación",
    icon: Trophy,
    classify: true,
    questions: [
      {
        id: 1,
        visual: "⌨️",
        question: "¿Qué usamos para escribir letras y números?",
        targets: [
          { id: "keyboard", label: "Teclado", emoji: "⌨️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
        ],
        target: "keyboard",
      },
      {
        id: 2,
        visual: "🖱️",
        question: "¿Qué usamos para controlar el puntero?",
        targets: [
          { id: "cpu", label: "CPU", emoji: "🗄️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "keyboard", label: "Teclado", emoji: "⌨️" },
        ],
        target: "mouse",
      },
      {
        id: 3,
        visual: "⊞",
        question: "¿Qué botón abre aplicaciones y opciones en Windows?",
        targets: [
          { id: "start", label: "Inicio", emoji: "⊞" },
          { id: "close", label: "Cerrar", emoji: "✕" },
          { id: "trash", label: "Papelera", emoji: "🗑️" },
        ],
        target: "start",
      },
      {
        id: 4,
        visual: "📄 Tarea.docx",
        question: "¿Dónde conviene guardar este archivo?",
        targets: [
          { id: "school", label: "Escuela", emoji: "🎒" },
          { id: "music", label: "Música", emoji: "🎵" },
          { id: "trash", label: "Papelera", emoji: "🗑️" },
        ],
        target: "school",
      },
      {
        id: 5,
        visual: "🧽",
        question: "¿Qué herramienta corrige una parte del dibujo?",
        targets: [
          { id: "eraser", label: "Borrador", emoji: "🧽" },
          { id: "brush", label: "Pincel", emoji: "🖌️" },
          { id: "colors", label: "Colores", emoji: "🎨" },
        ],
        target: "eraser",
      },
      {
        id: 6,
        visual: "💾",
        question: "¿Qué acción evita perder el trabajo realizado?",
        targets: [
          { id: "delete", label: "Eliminar", emoji: "🗑️" },
          { id: "save", label: "Guardar", emoji: "💾" },
          { id: "minimize", label: "Minimizar", emoji: "—" },
        ],
        target: "save",
      },
      {
        id: 7,
        visual: "🔐",
        question: "¿Qué debemos hacer con una contraseña?",
        targets: [
          { id: "secret", label: "Mantenerla en secreto", emoji: "🔐" },
          { id: "share", label: "Compartirla", emoji: "📢" },
          { id: "publish", label: "Publicarla", emoji: "🌐" },
        ],
        target: "secret",
      },
      {
        id: 8,
        visual: "⚠️",
        question: "¿Qué debemos hacer si algo parece peligroso en Internet?",
        targets: [
          { id: "adult", label: "Avisar a un adulto", emoji: "🧑" },
          { id: "continue", label: "Continuar solo", emoji: "▶️" },
          { id: "download", label: "Descargarlo", emoji: "⬇️" },
        ],
        target: "adult",
      },
      {
        id: 9,
        visual: "📁",
        question: "¿Qué elemento contiene y organiza archivos?",
        targets: [
          { id: "folder", label: "Carpeta", emoji: "📁" },
          { id: "photo", label: "Fotografía", emoji: "📷" },
          { id: "song", label: "Canción", emoji: "🎵" },
        ],
        target: "folder",
      },
      {
        id: 10,
        visual: "✕",
        question: "¿Qué botón cierra una ventana?",
        targets: [
          { id: "maximize", label: "Maximizar", emoji: "□" },
          { id: "close", label: "Cerrar", emoji: "✕" },
          { id: "minimize", label: "Minimizar", emoji: "—" },
        ],
        target: "close",
      },
    ],
  },
};

/* =========================================================
   FUNCIONES AUXILIARES
========================================================= */

function shuffleArray(items) {
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
}

function createRandomQuiz(questionBank) {
  return shuffleArray(questionBank).map((question) => ({
    ...question,
    options: question.options
      ? shuffleArray(question.options)
      : [],
  }));
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function ComputerQuiz() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const parsedUnit = Number(unitId || 1);

  const currentUnit = quizContent[parsedUnit]
    ? parsedUnit
    : 1;

  const currentQuiz = quizContent[currentUnit];
  const QuizIcon = currentQuiz.icon || Monitor;

  const [questions, setQuestions] = useState(() =>
    createRandomQuiz(currentQuiz.questions)
  );

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const currentQuestion = questions[questionIndex];

  /* =======================================================
     REINICIAR EVALUACIÓN AL CAMBIAR DE UNIDAD
  ======================================================= */

  useEffect(() => {
    setQuestions(
      createRandomQuiz(currentQuiz.questions)
    );

    setQuestionIndex(0);
    setSelectedAnswer("");
    setChecked(false);
    setScore(0);
    setHearts(3);
  }, [currentUnit, currentQuiz]);

  const isCorrect = useMemo(() => {
    if (!currentQuestion) return false;

    return currentQuiz.interactive ||
      currentQuiz.classify
      ? selectedAnswer === currentQuestion.target
      : selectedAnswer === currentQuestion.correctAnswer;
  }, [selectedAnswer, currentQuestion]);

  const progress = useMemo(() => {
    if (!questions.length) return 0;

    return Math.round(
      ((questionIndex + 1) / questions.length) *
        100
    );
  }, [questionIndex, questions.length]);

  const answerInteractiveQuestion = (target) => {
    if (
      !currentQuiz.interactive ||
      checked ||
      !currentQuestion
    ) {
      return;
    }

    setSelectedAnswer(target);
    setChecked(true);

    if (target === currentQuestion.target) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) =>
        Math.max(0, current - 1)
      );
    }
  };

  const answerClassifyQuestion = (target) => {
    if (
      !currentQuiz.classify ||
      checked ||
      !currentQuestion
    ) {
      return;
    }

    setSelectedAnswer(target);
    setChecked(true);

    if (target === currentQuestion.target) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) =>
        Math.max(0, current - 1)
      );
    }
  };

  /* =======================================================
     COMPROBAR RESPUESTA
  ======================================================= */

  const checkAnswer = () => {
    if (!selectedAnswer || checked) return;

    setChecked(true);

    if (
      selectedAnswer === currentQuestion.correctAnswer
    ) {
      setScore((current) => current + 1);
    } else {
      setHearts((current) =>
        Math.max(0, current - 1)
      );
    }
  };

  /* =======================================================
     CONTINUAR EVALUACIÓN
  ======================================================= */

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

    const finalScore = score;

    navigate(
      `/computer/beginner/unit/${currentUnit}/reward`,
      {
        state: {
          score: finalScore,
          total: questions.length,
          hearts,
          unitId: currentUnit,
        },
      }
    );
  };

  if (!currentQuestion) {
    return null;
  }

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
              `/computer/beginner/unit/${currentUnit}/game`
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
            Evaluación de la Unidad {currentUnit}
          </strong>
        </div>

        <div className="computer-unit-hearts">
          {Array.from({ length: 3 }).map(
            (_, index) => (
              <Heart
                key={index}
                size={27}
                fill={
                  index < hearts
                    ? "currentColor"
                    : "none"
                }
                opacity={
                  index < hearts ? 1 : 0.35
                }
              />
            )
          )}

          <span>{hearts}</span>
        </div>
      </header>

      <section className="computer-lesson-shell">
        <motion.article
          key={`${currentUnit}-${currentQuestion.id}`}
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
              <h1>{currentQuiz.title}</h1>
            </div>
          </div>

          {currentQuiz.classify ? (
            <>
              <div className="computer-activity-question">
                <motion.div
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  style={{
                    minWidth: "150px",
                    minHeight: "82px",
                    padding: "12px 18px",
                    borderRadius: "17px",
                    border: "3px solid #a5b4fc",
                    background:
                      "linear-gradient(180deg, #ffffff, #eef2ff)",
                    boxShadow:
                      "0 6px 0 #818cf8, 0 12px 24px rgba(49, 46, 129, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize:
                      "clamp(1.25rem, 3vw, 1.9rem)",
                    fontWeight: 900,
                    color: "#312e81",
                    textAlign: "center",
                  }}
                >
                  {currentQuestion.visual}
                </motion.div>

                <div>
                  <span>
                    Clasificación {questionIndex + 1}
                  </span>

                  <strong>
                    {currentQuestion.question}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  marginTop: "24px",
                }}
              >
                {currentQuestion.targets.map((target) => {
                  const correct =
                    checked &&
                    target.id === currentQuestion.target;

                  const wrong =
                    checked &&
                    target.id === selectedAnswer &&
                    target.id !== currentQuestion.target;

                  return (
                    <motion.button
                      key={target.id}
                      type="button"
                      disabled={checked}
                      onClick={() =>
                        answerClassifyQuestion(target.id)
                      }
                      style={{
                        minHeight: "125px",
                        borderRadius: "20px",
                        border: correct
                          ? "4px solid #22c55e"
                          : wrong
                            ? "4px solid #ef4444"
                            : "3px solid #bfdbfe",
                        background: correct
                          ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                          : wrong
                            ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                            : "linear-gradient(135deg, #ffffff, #eff6ff)",
                        color: "#1e3a8a",
                        cursor: checked
                          ? "default"
                          : "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        fontWeight: 900,
                        fontSize: "18px",
                        boxShadow:
                          "0 8px 18px rgba(30, 64, 175, 0.12)",
                      }}
                      whileHover={
                        checked
                          ? {}
                          : { scale: 1.05, y: -3 }
                      }
                      whileTap={
                        checked
                          ? {}
                          : { scale: 0.96 }
                      }
                    >
                      <span style={{ fontSize: "45px" }}>
                        {target.emoji}
                      </span>

                      {target.label}
                    </motion.button>
                  );
                })}
              </div>
            </>
          ) : currentQuiz.interactive ? (
            <>
              <div className="computer-activity-question">
                <Monitor size={58} />

                <div>
                  <span>
                    Misión {questionIndex + 1}
                  </span>

                  <strong>
                    {currentQuestion.question}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  minHeight: "330px",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "18px",
                  borderRadius: "22px",
                  border: "4px solid #1d4ed8",
                  background:
                    "linear-gradient(145deg, #0ea5e9, #1d4ed8 55%, #312e81)",
                }}
              >
                <motion.button
                  type="button"
                  onClick={() =>
                    answerInteractiveQuestion("folder")
                  }
                  disabled={checked}
                  style={{
                    position: "absolute",
                    top: "28px",
                    left: "30px",
                    width: "110px",
                    minHeight: "98px",
                    border: "none",
                    borderRadius: "16px",
                    cursor: "pointer",
                    color: "#ffffff",
                    background:
                      "rgba(255, 255, 255, 0.14)",
                    fontWeight: 900,
                  }}
                  whileHover={{ scale: 1.07 }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "45px",
                    }}
                  >
                    📁
                  </span>
                  Documentos
                </motion.button>

                <div
                  style={{
                    position: "absolute",
                    top: "34px",
                    right: "28px",
                    width: "48%",
                    minWidth: "270px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      minHeight: "46px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingLeft: "14px",
                      background: "#eaf3ff",
                      fontWeight: 900,
                    }}
                  >
                    <span>Explorador</span>

                    <div style={{ display: "flex" }}>
                      {[
                        { id: "minimize", label: "—" },
                        { id: "maximize", label: "□" },
                        { id: "close", label: "✕" },
                      ].map((control) => (
                        <motion.button
                          key={control.id}
                          type="button"
                          disabled={checked}
                          onClick={() =>
                            answerInteractiveQuestion(
                              control.id
                            )
                          }
                          style={{
                            width: "44px",
                            height: "46px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: 900,
                            background:
                              control.id === "close"
                                ? "#fee2e2"
                                : "transparent",
                            color:
                              control.id === "close"
                                ? "#b91c1c"
                                : "#17345f",
                          }}
                        >
                          {control.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      minHeight: "155px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                      fontWeight: 900,
                    }}
                  >
                    Ventana de Windows
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "56px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    padding: "0 12px",
                    background: "rgba(7, 20, 54, 0.92)",
                  }}
                >
                  <motion.button
                    type="button"
                    disabled={checked}
                    onClick={() =>
                      answerInteractiveQuestion("start")
                    }
                    style={{
                      width: "44px",
                      height: "44px",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      color: "#ffffff",
                      background:
                        "linear-gradient(135deg, #38bdf8, #2563eb)",
                      fontSize: "27px",
                      fontWeight: 900,
                    }}
                    whileHover={{ scale: 1.08 }}
                  >
                    ⊞
                  </motion.button>

                  <motion.button
                    type="button"
                    disabled={checked}
                    onClick={() =>
                      answerInteractiveQuestion("taskbar")
                    }
                    style={{
                      flex: 1,
                      height: "40px",
                      border:
                        "2px solid rgba(255,255,255,.2)",
                      borderRadius: "10px",
                      cursor: "pointer",
                      color: "#dbeafe",
                      background:
                        "rgba(255, 255, 255, 0.1)",
                      fontWeight: 900,
                    }}
                  >
                    Barra de tareas
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="computer-activity-question">
                {currentQuestion.visual ? (
                  <motion.div
                    initial={{ scale: 0.8, rotate: -4 }}
                    animate={{ scale: 1, rotate: 0 }}
                    style={{
                      minWidth: "112px",
                      minHeight: "76px",
                      padding: "12px 18px",
                      borderRadius: "16px",
                      border: "3px solid #a5b4fc",
                      background:
                        "linear-gradient(180deg, #ffffff, #eef2ff)",
                      boxShadow:
                        "0 6px 0 #818cf8, 0 12px 24px rgba(49, 46, 129, 0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize:
                        "clamp(1.35rem, 3vw, 2rem)",
                      fontWeight: 900,
                      color: "#312e81",
                      textAlign: "center",
                    }}
                  >
                    {currentQuestion.visual}
                  </motion.div>
                ) : (
                  <QuizIcon size={58} />
                )}

                <div>
                  <span>
                    Pregunta {questionIndex + 1}
                  </span>

                  <strong>
                    {currentQuestion.question}
                  </strong>
                </div>
              </div>

              <div className="computer-activity-options">
                {currentQuestion.options.map(
                  (option, index) => {
                    const selected =
                      selectedAnswer === option;

                    const correct =
                      checked &&
                      option ===
                        currentQuestion.correctAnswer;

                    const wrong =
                      checked &&
                      selected &&
                      option !==
                        currentQuestion.correctAnswer;

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

                        {correct && (
                          <CheckCircle2 size={30} />
                        )}

                        {wrong && (
                          <XCircle size={30} />
                        )}
                      </motion.button>
                    );
                  }
                )}
              </div>
            </>
          )}

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
                    <strong>
                      ¡Respuesta correcta!
                    </strong>

                    <span>
                      Muy bien, continúa con la
                      siguiente pregunta.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <XCircle size={32} />

                  <div>
                    <strong>
                      Respuesta incorrecta
                    </strong>

                    <span>
                      Lee nuevamente todas las
                      opciones e inténtalo otra vez.
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          )}

          <div className="computer-activity-actions">
            {!checked ? (
              currentQuiz.interactive ||
              currentQuiz.classify ? (
                <span
                  style={{
                    color: "#64748b",
                    fontWeight: 900,
                  }}
                >
                  {currentQuiz.classify
                    ? "Toca la clasificación correcta."
                    : "Toca directamente el elemento correcto."}
                </span>
              ) : (
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
              )
            ) : (
              <motion.button
                type="button"
                className="computer-lesson-next-button"
                onClick={continueQuiz}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {isCorrect
                  ? questionIndex <
                    questions.length - 1
                    ? "Siguiente"
                    : "Ver resultado"
                  : "Intentar de nuevo"}

                {isCorrect && (
                  <ArrowRight size={23} />
                )}
              </motion.button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}