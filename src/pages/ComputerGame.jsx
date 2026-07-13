import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Heart,
  Keyboard,
  Laptop,
  Monitor,
  MousePointer2,
  Star,
  Timer,
  Trophy,
  XCircle,
} from "lucide-react";

import "../styles/computer-unit.css";

const gamesContent = {
  1: {
    type: "boolean",
    title: "¿Se puede hacer con una computadora?",
    instruction:
      "Lee la acción y elige la respuesta correcta.",
    timePerQuestion: 20,
    items: [
      { id: 1, label: "Escribir una tarea", emoji: "📝", correct: true },
      { id: 2, label: "Dibujar en Paint", emoji: "🎨", correct: true },
      { id: 3, label: "Buscar información", emoji: "🔎", correct: true },
      { id: 4, label: "Ver videos educativos", emoji: "🎬", correct: true },
      { id: 5, label: "Enviar un mensaje", emoji: "💬", correct: true },
      { id: 6, label: "Cocinar una sopa", emoji: "🍲", correct: false },
      { id: 7, label: "Nadar en una piscina", emoji: "🏊", correct: false },
      { id: 8, label: "Regar una planta", emoji: "🌱", correct: false },
      { id: 9, label: "Dormir en una cama", emoji: "🛏️", correct: false },
      { id: 10, label: "Patear una pelota", emoji: "⚽", correct: false },
    ],
  },

  2: {
    type: "multiple-choice",
    title: "Identifica la parte de la computadora",
    instruction:
      "Lee la pista y selecciona la parte correcta.",
    timePerQuestion: 20,
    items: [
      {
        id: 1,
        label: "¿Qué parte muestra imágenes, letras y videos?",
        emoji: "🖥️",
        correctAnswer: "Monitor",
        options: [
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
        ],
      },
      {
        id: 2,
        label: "¿Qué parte usamos para escribir letras y números?",
        emoji: "⌨️",
        correctAnswer: "Teclado",
        options: [
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
        ],
      },
      {
        id: 3,
        label: "¿Qué parte movemos con la mano para controlar el puntero?",
        emoji: "🖱️",
        correctAnswer: "Mouse",
        options: [
          { id: "cpu", label: "CPU", emoji: "🗄️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
        ],
      },
      {
        id: 4,
        label: "¿En qué parte se procesan y guardan muchos datos?",
        emoji: "🗄️",
        correctAnswer: "CPU",
        options: [
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
        ],
      },
      {
        id: 5,
        label: "¿Qué parte tiene letras, números y barra espaciadora?",
        emoji: "🔤",
        correctAnswer: "Teclado",
        options: [
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
        ],
      },
      {
        id: 6,
        label: "¿Qué parte tiene una pantalla parecida a un televisor?",
        emoji: "📺",
        correctAnswer: "Monitor",
        options: [
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
        ],
      },
      {
        id: 7,
        label: "¿Qué parte tiene botones para hacer clic?",
        emoji: "👆",
        correctAnswer: "Mouse",
        options: [
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
        ],
      },
      {
        id: 8,
        label: "¿Qué parte es conocida como el cerebro de la computadora?",
        emoji: "🧠",
        correctAnswer: "CPU",
        options: [
          { id: "teclado", label: "Teclado", emoji: "⌨️" },
          { id: "monitor", label: "Monitor", emoji: "🖥️" },
          { id: "mouse", label: "Mouse", emoji: "🖱️" },
          { id: "cpu", label: "CPU", emoji: "🗄️" },
        ],
      },
    ],
  },

  3: {
    type: "keyboard",
    title: "Atrapa la tecla correcta",
    instruction:
      "Lee la pista y presiona la tecla correcta.",
    timePerQuestion: 18,
    items: [
      { id: 1, label: "Presiona la letra A", emoji: "🔤", correctAnswer: "A" },
      { id: 2, label: "Presiona el número 5", emoji: "🔢", correctAnswer: "5" },
      { id: 3, label: "¿Qué tecla separa palabras?", emoji: "↔️", correctAnswer: "ESPACIO" },
      { id: 4, label: "¿Qué tecla pasa a otra línea?", emoji: "↵", correctAnswer: "ENTER" },
      { id: 5, label: "¿Qué tecla borra hacia atrás?", emoji: "⌫", correctAnswer: "RETROCESO" },
      { id: 6, label: "Presiona la letra M", emoji: "🔤", correctAnswer: "M" },
      { id: 7, label: "Presiona el número 8", emoji: "🔢", correctAnswer: "8" },
      { id: 8, label: "¿Qué tecla ayuda a escribir mayúsculas?", emoji: "⬆️", correctAnswer: "MAYÚS" },
    ],
  },

  4: {
    type: "mouse-target",
    title: "Misión: domina el mouse",
    instruction:
      "Cumple la instrucción sobre el objeto correcto.",
    timePerQuestion: 18,
    objects: [
      { id: "star", label: "estrella", emoji: "⭐" },
      { id: "apple", label: "manzana", emoji: "🍎" },
      { id: "dog", label: "perro", emoji: "🐶" },
      { id: "car", label: "carro", emoji: "🚗" },
      { id: "ball", label: "pelota", emoji: "⚽" },
      { id: "book", label: "libro", emoji: "📚" },
      { id: "butterfly", label: "mariposa", emoji: "🦋" },
      { id: "rocket", label: "cohete", emoji: "🚀" },
      { id: "folder", label: "carpeta", emoji: "📁" },
    ],
    items: [
      { id: 1, label: "Haz un clic en la estrella", emoji: "⭐", target: "star", action: "click" },
      { id: 2, label: "Haz un clic en el perro", emoji: "🐶", target: "dog", action: "click" },
      { id: 3, label: "Haz doble clic en la carpeta", emoji: "📁", target: "folder", action: "doubleClick" },
      { id: 4, label: "Haz un clic en el libro", emoji: "📚", target: "book", action: "click" },
      { id: 5, label: "Haz clic derecho en el carro", emoji: "🚗", target: "car", action: "rightClick" },
      { id: 6, label: "Haz un clic en la mariposa", emoji: "🦋", target: "butterfly", action: "click" },
      { id: 7, label: "Haz doble clic en el cohete", emoji: "🚀", target: "rocket", action: "doubleClick" },
      { id: 8, label: "Haz clic derecho en la pelota", emoji: "⚽", target: "ball", action: "rightClick" },
    ],
  },

  5: {
    type: "windows-desktop",
    title: "Explora el escritorio de Windows",
    instruction:
      "Cumple cada misión tocando el elemento correcto.",
    timePerQuestion: 20,
    items: [
      { id: 1, label: "Abre el menú Inicio", emoji: "⊞", target: "start" },
      { id: 2, label: "Abre la carpeta Documentos", emoji: "📁", target: "folder" },
      { id: 3, label: "Abre Paint desde el escritorio", emoji: "🎨", target: "paint" },
      { id: 4, label: "Minimiza la ventana", emoji: "—", target: "minimize" },
      { id: 5, label: "Maximiza la ventana", emoji: "□", target: "maximize" },
      { id: 6, label: "Cierra la ventana", emoji: "✕", target: "close" },
      { id: 7, label: "Selecciona la barra de tareas", emoji: "▰", target: "taskbar" },
      { id: 8, label: "Abre la Papelera", emoji: "🗑️", target: "trash" },
    ],
  },

  6: {
    type: "file-sort",
    title: "Organiza archivos y carpetas",
    instruction:
      "Arrastra el archivo o selecciónalo y luego toca su destino.",
    timePerQuestion: 24,
    destinations: [
      { id: "school", label: "Escuela", emoji: "🎒" },
      { id: "images", label: "Imágenes", emoji: "🖼️" },
      { id: "music", label: "Música", emoji: "🎵" },
      { id: "programs", label: "Programas", emoji: "⚙️" },
      { id: "trash", label: "Papelera", emoji: "🗑️" },
    ],
    items: [
      { id: 1, label: "Tarea.docx", emoji: "📄", target: "school" },
      { id: 2, label: "Vacaciones.png", emoji: "🌄", target: "images" },
      { id: 3, label: "Canción.mp3", emoji: "🎶", target: "music" },
      { id: 4, label: "Calculadora.exe", emoji: "🧮", target: "programs" },
      { id: 5, label: "Foto_familia.jpg", emoji: "📷", target: "images" },
      { id: 6, label: "Proyecto_escolar.pdf", emoji: "📕", target: "school" },
      { id: 7, label: "Juego_instalador.exe", emoji: "🎮", target: "programs" },
      { id: 8, label: "Archivo_innecesario.tmp", emoji: "🗒️", target: "trash" },
    ],
  },

  7: {
    type: "paint-challenge",
    title: "Taller creativo de Paint",
    instruction:
      "Cumple cada reto seleccionando la herramienta o el color correcto.",
    timePerQuestion: 22,
    items: [
      { id: 1, label: "Selecciona el pincel", emoji: "🖌️", target: "brush" },
      { id: 2, label: "Selecciona el color rojo", emoji: "🔴", target: "red" },
      { id: 3, label: "Dibuja una línea en el lienzo", emoji: "✏️", target: "canvas" },
      { id: 4, label: "Selecciona el borrador", emoji: "🧽", target: "eraser" },
      { id: 5, label: "Selecciona la herramienta de formas", emoji: "🔷", target: "shapes" },
      { id: 6, label: "Selecciona el color azul", emoji: "🔵", target: "blue" },
      { id: 7, label: "Selecciona el balde de relleno", emoji: "🪣", target: "fill" },
      { id: 8, label: "Guarda tu dibujo", emoji: "💾", target: "save" },
    ],
  },

  8: {
    type: "safe-browser",
    title: "Navega por Internet de forma segura",
    instruction:
      "Cumple cada misión dentro del navegador.",
    timePerQuestion: 24,
    items: [
      { id: 1, label: "Selecciona la barra de direcciones", emoji: "🌐", target: "address" },
      { id: 2, label: "Escribe www.eduplaygt.com", emoji: "⌨️", target: "type" },
      { id: 3, label: "Presiona Enter para visitar la página", emoji: "↵", target: "enter" },
      { id: 4, label: "Usa el botón Atrás", emoji: "←", target: "back" },
      { id: 5, label: "Recarga la página", emoji: "⟳", target: "reload" },
      { id: 6, label: "Abre una pestaña nueva", emoji: "+", target: "newtab" },
      { id: 7, label: "Cierra el aviso sospechoso", emoji: "⚠️", target: "close-warning" },
      { id: 8, label: "Pide ayuda a un adulto", emoji: "🧑", target: "adult" },
    ],
  },

  9: {
    type: "final-mission",
    title: "Misión final de Computación",
    instruction:
      "Completa cada acción usando todo lo aprendido.",
    timePerQuestion: 26,
    items: [
      {
        id: 1,
        label: "Selecciona el teclado para escribir el título",
        emoji: "⌨️",
        target: "keyboard",
      },
      {
        id: 2,
        label: "Selecciona el mouse para abrir una carpeta",
        emoji: "🖱️",
        target: "mouse",
      },
      {
        id: 3,
        label: "Abre el menú Inicio",
        emoji: "⊞",
        target: "start",
      },
      {
        id: 4,
        label: "Abre la carpeta Escuela",
        emoji: "📁",
        target: "folder",
      },
      {
        id: 5,
        label: "Guarda Tarea.docx en Escuela",
        emoji: "📄",
        target: "school",
      },
      {
        id: 6,
        label: "Abre Paint",
        emoji: "🎨",
        target: "paint",
      },
      {
        id: 7,
        label: "Selecciona el pincel",
        emoji: "🖌️",
        target: "brush",
      },
      {
        id: 8,
        label: "Guarda el dibujo",
        emoji: "💾",
        target: "save",
      },
      {
        id: 9,
        label: "Abre el navegador",
        emoji: "🌐",
        target: "browser",
      },
      {
        id: 10,
        label: "Si aparece algo sospechoso, pide ayuda a un adulto",
        emoji: "🧑",
        target: "adult",
      },
    ],
  },
};

const keyboardKeys = [
  "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
  "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER",
  "MAYÚS", "Z", "X", "C", "V", "B", "N", "M", "RETROCESO",
  "ESPACIO",
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

  const parsedUnit = Number(unitId || 1);
  const currentUnit = gamesContent[parsedUnit] ? parsedUnit : 1;
  const game = gamesContent[currentUnit];

  const [items, setItems] = useState(() =>
    shuffleArray(game.items)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(
    game.timePerQuestion
  );
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);
  const [selectedOption, setSelectedOption] =
    useState(null);
  const [finished, setFinished] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);
  const [paintColor, setPaintColor] = useState("#2563eb");
  const [paintTool, setPaintTool] = useState("brush");
  const [paintMarks, setPaintMarks] = useState([]);
  const [browserAddress, setBrowserAddress] = useState("");
  const [browserLoaded, setBrowserLoaded] = useState(false);
  const [mouseObjects, setMouseObjects] = useState(() =>
    game.type === "mouse-target"
      ? shuffleArray(game.objects)
      : []
  );

  const currentItem = items[currentIndex];

  const progress = useMemo(() => {
    if (!items.length) return 0;

    return Math.round(
      ((currentIndex + 1) / items.length) * 100
    );
  }, [currentIndex, items.length]);

  useEffect(() => {
    setItems(shuffleArray(game.items));
    setCurrentIndex(0);
    setScore(0);
    setHearts(3);
    setTimeLeft(game.timePerQuestion);
    setSelectedAnswer(null);
    setSelectedOption(null);
    setFinished(false);
    setSelectedFile(false);
    setPaintColor("#2563eb");
    setPaintTool("brush");
    setPaintMarks([]);
    setBrowserAddress("");
    setBrowserLoaded(false);
    setMouseObjects(
      game.type === "mouse-target"
        ? shuffleArray(game.objects)
        : []
    );
  }, [currentUnit, game]);

  useEffect(() => {
    if (
      finished ||
      selectedAnswer !== null ||
      !currentItem
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setSelectedAnswer(false);
          setSelectedOption(null);
          setHearts((value) =>
            Math.max(0, value - 1)
          );
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    currentIndex,
    currentItem,
    finished,
    selectedAnswer,
  ]);

  useEffect(() => {
    if (hearts <= 0 && !finished) {
      setFinished(true);
    }
  }, [hearts, finished]);

  const registerResult = (success, selected) => {
    setSelectedOption(selected);
    setSelectedAnswer(success);

    if (success) {
      setScore((current) => current + 10);
    } else {
      setHearts((current) =>
        Math.max(0, current - 1)
      );
    }
  };

  const answerBooleanItem = (answer) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "boolean"
    ) {
      return;
    }

    registerResult(
      answer === currentItem.correct,
      answer
    );
  };

  const answerMultipleChoiceItem = (option) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "multiple-choice"
    ) {
      return;
    }

    registerResult(
      option.label === currentItem.correctAnswer,
      option.label
    );
  };

  const answerKeyboardItem = (key) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "keyboard"
    ) {
      return;
    }

    registerResult(
      key === currentItem.correctAnswer,
      key
    );
  };

  const answerMouseTarget = (objectId, action) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "mouse-target"
    ) {
      return;
    }

    registerResult(
      objectId === currentItem.target &&
        action === currentItem.action,
      objectId
    );
  };

  const answerWindowsTarget = (target) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "windows-desktop"
    ) {
      return;
    }

    registerResult(
      target === currentItem.target,
      target
    );
  };

  const answerFileSort = (destinationId) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "file-sort"
    ) {
      return;
    }

    registerResult(
      destinationId === currentItem.target,
      destinationId
    );

    setSelectedFile(false);
  };

  const handleFileDragStart = (event) => {
    if (
      selectedAnswer !== null ||
      game.type !== "file-sort"
    ) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData(
      "text/plain",
      currentItem.id
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const handleFolderDrop = (event, destinationId) => {
    event.preventDefault();

    if (game.type !== "file-sort") return;

    answerFileSort(destinationId);
  };

  const answerPaintTarget = (target) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "paint-challenge"
    ) {
      return;
    }

    registerResult(
      target === currentItem.target,
      target
    );
  };

  const handlePaintTool = (tool) => {
    if (
      selectedAnswer !== null ||
      game.type !== "paint-challenge"
    ) {
      return;
    }

    setPaintTool(tool);
    answerPaintTarget(tool);
  };

  const handlePaintColor = (colorId, colorValue) => {
    if (
      selectedAnswer !== null ||
      game.type !== "paint-challenge"
    ) {
      return;
    }

    setPaintColor(colorValue);
    answerPaintTarget(colorId);
  };

  const handlePaintCanvas = (event) => {
    if (
      selectedAnswer !== null ||
      game.type !== "paint-challenge"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;
    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    setPaintMarks((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        x,
        y,
        color:
          paintTool === "eraser"
            ? "#ffffff"
            : paintColor,
        size: paintTool === "eraser" ? 32 : 16,
      },
    ]);

    answerPaintTarget("canvas");
  };

  const answerBrowserTarget = (target) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "safe-browser"
    ) {
      return;
    }

    registerResult(
      target === currentItem.target,
      target
    );
  };

  const handleBrowserAddressChange = (event) => {
    if (game.type !== "safe-browser") return;

    setBrowserAddress(event.target.value);
  };

  const handleBrowserKeyDown = (event) => {
    if (
      game.type !== "safe-browser" ||
      selectedAnswer !== null
    ) {
      return;
    }

    if (
      currentItem.target === "type" &&
      browserAddress.trim().toLowerCase() ===
        "www.eduplaygt.com"
    ) {
      answerBrowserTarget("type");
      return;
    }

    if (
      currentItem.target === "enter" &&
      event.key === "Enter"
    ) {
      event.preventDefault();
      setBrowserLoaded(true);
      answerBrowserTarget("enter");
    }
  };

  const answerFinalMission = (target) => {
    if (
      selectedAnswer !== null ||
      finished ||
      game.type !== "final-mission"
    ) {
      return;
    }

    registerResult(
      target === currentItem.target,
      target
    );
  };

  useEffect(() => {
    if (
      game.type !== "keyboard" ||
      finished ||
      selectedAnswer !== null ||
      !currentItem
    ) {
      return undefined;
    }

    const handlePhysicalKeyboard = (event) => {
      let pressedKey = event.key.toUpperCase();

      if (event.key === " ") {
        pressedKey = "ESPACIO";
      } else if (event.key === "Enter") {
        pressedKey = "ENTER";
      } else if (event.key === "Backspace") {
        pressedKey = "RETROCESO";
      } else if (event.key === "Shift") {
        pressedKey = "MAYÚS";
      }

      if (!keyboardKeys.includes(pressedKey)) {
        return;
      }

      event.preventDefault();
      answerKeyboardItem(pressedKey);
    };

    window.addEventListener(
      "keydown",
      handlePhysicalKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handlePhysicalKeyboard
      );
    };
  }, [
    game.type,
    finished,
    selectedAnswer,
    currentItem,
  ]);

  const nextItem = () => {
    if (
      currentIndex < items.length - 1 &&
      hearts > 0
    ) {
      setCurrentIndex((current) => current + 1);
      setSelectedAnswer(null);
      setSelectedOption(null);
      setSelectedFile(false);
      setPaintMarks([]);
      setTimeLeft(game.timePerQuestion);

      if (game.type === "mouse-target") {
        setMouseObjects(
          shuffleArray(game.objects)
        );
      }

      return;
    }

    setFinished(true);
  };

  const restartGame = () => {
    setItems(shuffleArray(game.items));
    setCurrentIndex(0);
    setScore(0);
    setHearts(3);
    setTimeLeft(game.timePerQuestion);
    setSelectedAnswer(null);
    setSelectedOption(null);
    setFinished(false);
    setSelectedFile(false);
    setPaintColor("#2563eb");
    setPaintTool("brush");
    setPaintMarks([]);
    setBrowserAddress("");
    setBrowserLoaded(false);
    setMouseObjects(
      game.type === "mouse-target"
        ? shuffleArray(game.objects)
        : []
    );
  };

  const continueToQuiz = () => {
    navigate(
      `/computer/beginner/unit/${currentUnit}/quiz`
    );
  };

  const getOptionStyle = (option) => {
    if (selectedAnswer === null) return {};

    if (option.label === currentItem.correctAnswer) {
      return {
        borderColor: "#22c55e",
        background:
          "linear-gradient(135deg, #dcfce7, #bbf7d0)",
        color: "#166534",
      };
    }

    if (
      option.label === selectedOption &&
      option.label !== currentItem.correctAnswer
    ) {
      return {
        borderColor: "#ef4444",
        background:
          "linear-gradient(135deg, #fee2e2, #fecaca)",
        color: "#991b1b",
      };
    }

    return { opacity: 0.55 };
  };

  const getKeyboardKeyStyle = (key) => {
    const specialKey = [
      "ENTER",
      "MAYÚS",
      "RETROCESO",
      "ESPACIO",
    ].includes(key);

    const baseStyle = {
      minHeight: "40px",
      padding: specialKey ? "5px 8px" : "5px",
      borderRadius: "9px",
      border: "2px solid #c7d2fe",
      background:
        "linear-gradient(180deg, #ffffff, #eef2ff)",
      color: "#312e81",
      fontWeight: 900,
      fontSize: specialKey ? "10px" : "15px",
      boxShadow:
        "0 3px 0 #a5b4fc, 0 6px 12px rgba(49, 46, 129, 0.14)",
      cursor:
        selectedAnswer === null
          ? "pointer"
          : "default",
      gridColumn:
        key === "ESPACIO" ? "span 4" : "span 1",
    };

    if (selectedAnswer === null) {
      return baseStyle;
    }

    if (key === currentItem.correctAnswer) {
      return {
        ...baseStyle,
        borderColor: "#22c55e",
        background:
          "linear-gradient(180deg, #dcfce7, #bbf7d0)",
        color: "#166534",
      };
    }

    if (
      key === selectedOption &&
      key !== currentItem.correctAnswer
    ) {
      return {
        ...baseStyle,
        borderColor: "#ef4444",
        background:
          "linear-gradient(180deg, #fee2e2, #fecaca)",
        color: "#991b1b",
      };
    }

    return { ...baseStyle, opacity: 0.45 };
  };

  const compactGame =
    game.type === "keyboard" ||
    game.type === "mouse-target" ||
    game.type === "windows-desktop" ||
    game.type === "file-sort" ||
    game.type === "paint-challenge" ||
    game.type === "safe-browser" ||
    game.type === "final-mission";

  if (!currentItem && !finished) {
    return null;
  }

  return (
    <main
      className="computer-unit-screen"
      style={
        compactGame
          ? {
              overflowY: "auto",
              minHeight: "100vh",
              height: "auto",
            }
          : undefined
      }
    >
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
              `/computer/beginner/unit/${currentUnit}/activity`
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
            Minijuego de la Unidad {currentUnit}
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
                opacity={index < hearts ? 1 : 0.3}
              />
            )
          )}
          <span>{hearts}</span>
        </div>
      </header>

      <section
        className="computer-game-shell"
        style={
          compactGame
            ? {
                padding: "10px 16px 28px",
                alignItems: "flex-start",
              }
            : undefined
        }
      >
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.article
              key={`${currentUnit}-${currentItem.id}`}
              className="computer-game-card"
              style={
                compactGame
                  ? {
                      width: "min(860px, 94vw)",
                      padding: "14px 24px",
                      margin: "0 auto",
                    }
                  : undefined
              }
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
              <div
                className="computer-game-top"
                style={
                  compactGame
                    ? { marginBottom: "6px" }
                    : undefined
                }
              >
                <div className="computer-game-title">
                  <span className="computer-game-title-icon">
                    <Gamepad2 size={30} />
                  </span>

                  <div>
                    <span>Minijuego</span>
                    <h1>{game.title}</h1>
                  </div>
                </div>

                <div className="computer-game-stats">
                  <div>
                    <Timer size={23} />
                    <strong>{timeLeft}s</strong>
                  </div>

                  <div>
                    <Star
                      size={23}
                      fill="currentColor"
                    />
                    <strong>{score}</strong>
                  </div>
                </div>
              </div>

              <div
                className="computer-lesson-progress-header"
                style={
                  compactGame
                    ? { margin: "6px 0" }
                    : undefined
                }
              >
                <div className="computer-lesson-progress-track">
                  <motion.div
                    className="computer-lesson-progress-fill"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <span className="computer-lesson-progress-label">
                  {currentIndex + 1}/{items.length}
                </span>
              </div>

              <div
                className="computer-game-instruction"
                style={
                  compactGame
                    ? {
                        margin: "6px auto",
                        padding: "7px 14px",
                      }
                    : undefined
                }
              >
                {game.type === "keyboard" ? (
                  <Keyboard size={34} />
                ) : game.type === "mouse-target" ? (
                  <MousePointer2 size={34} />
                ) : game.type === "windows-desktop" ? (
                  <Monitor size={34} />
                ) : game.type === "file-sort" ? (
                  <Laptop size={34} />
                ) : game.type === "paint-challenge" ? (
                  <Monitor size={34} />
                ) : game.type === "safe-browser" ? (
                  <Monitor size={34} />
                ) : game.type === "final-mission" ? (
                  <Laptop size={34} />
                ) : game.type === "multiple-choice" ? (
                  <Monitor size={34} />
                ) : (
                  <Laptop size={34} />
                )}

                {game.instruction}
              </div>

              <motion.div
                className="computer-game-item"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={
                  compactGame
                    ? {
                        minHeight: "78px",
                        padding: "8px 18px",
                        margin: "7px auto 9px",
                      }
                    : undefined
                }
              >
                <span className="computer-game-emoji">
                  {currentItem.emoji}
                </span>
                <strong>{currentItem.label}</strong>
              </motion.div>

              {game.type === "boolean" && (
                <div className="computer-game-buttons">
                  <motion.button
                    type="button"
                    className="computer-game-button computer-game-button-no"
                    onClick={() =>
                      answerBooleanItem(false)
                    }
                    disabled={
                      selectedAnswer !== null
                    }
                  >
                    <XCircle size={31} />
                    No
                  </motion.button>

                  <motion.button
                    type="button"
                    className="computer-game-button computer-game-button-yes"
                    onClick={() =>
                      answerBooleanItem(true)
                    }
                    disabled={
                      selectedAnswer !== null
                    }
                  >
                    <CheckCircle2 size={31} />
                    Sí
                  </motion.button>
                </div>
              )}

              {game.type === "multiple-choice" && (
                <div
                  className="computer-game-buttons"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "14px",
                    width: "100%",
                  }}
                >
                  {currentItem.options.map((option) => (
                    <motion.button
                      key={option.id}
                      type="button"
                      className="computer-game-button"
                      onClick={() =>
                        answerMultipleChoiceItem(option)
                      }
                      disabled={
                        selectedAnswer !== null
                      }
                      style={{
                        minHeight: "92px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "7px",
                        border: "3px solid #dbeafe",
                        background:
                          "linear-gradient(135deg, #ffffff, #eff6ff)",
                        color: "#1e3a8a",
                        ...getOptionStyle(option),
                      }}
                    >
                      <span
                        style={{
                          fontSize: "34px",
                          lineHeight: 1,
                        }}
                      >
                        {option.emoji}
                      </span>
                      <strong>{option.label}</strong>
                    </motion.button>
                  ))}
                </div>
              )}

              {game.type === "keyboard" && (
                <div
                  style={{
                    width: "100%",
                    padding: "9px",
                    borderRadius: "16px",
                    border: "3px solid #818cf8",
                    background:
                      "linear-gradient(145deg, #312e81, #1e1b4b)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(10, minmax(34px, 1fr))",
                      gap: "6px",
                      width: "100%",
                    }}
                  >
                    {keyboardKeys.map((key) => (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() =>
                          answerKeyboardItem(key)
                        }
                        disabled={
                          selectedAnswer !== null
                        }
                        style={getKeyboardKeyStyle(key)}
                      >
                        {key}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {game.type === "mouse-target" && (
                <div
                  onContextMenu={(event) =>
                    event.preventDefault()
                  }
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(3, minmax(110px, 1fr))",
                    gap: "12px",
                    padding: "14px",
                    borderRadius: "22px",
                    border: "3px solid #93c5fd",
                    background:
                      "linear-gradient(145deg, #eff6ff, #dbeafe)",
                  }}
                >
                  {mouseObjects.map((object) => {
                    const correctTarget =
                      selectedAnswer !== null &&
                      object.id === currentItem.target;

                    const wrongTarget =
                      selectedAnswer === false &&
                      object.id === selectedOption;

                    return (
                      <motion.button
                        key={object.id}
                        type="button"
                        disabled={
                          selectedAnswer !== null
                        }
                        onClick={() => {
                          if (
                            currentItem.action ===
                            "click"
                          ) {
                            answerMouseTarget(
                              object.id,
                              "click"
                            );
                          }
                        }}
                        onDoubleClick={() => {
                          if (
                            currentItem.action ===
                            "doubleClick"
                          ) {
                            answerMouseTarget(
                              object.id,
                              "doubleClick"
                            );
                          }
                        }}
                        onContextMenu={(event) => {
                          event.preventDefault();

                          if (
                            currentItem.action ===
                            "rightClick"
                          ) {
                            answerMouseTarget(
                              object.id,
                              "rightClick"
                            );
                          }
                        }}
                        style={{
                          minHeight: "92px",
                          borderRadius: "18px",
                          border: correctTarget
                            ? "4px solid #22c55e"
                            : wrongTarget
                              ? "4px solid #ef4444"
                              : "3px solid #bfdbfe",
                          background: correctTarget
                            ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                            : wrongTarget
                              ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                              : "linear-gradient(135deg, #ffffff, #eff6ff)",
                          boxShadow:
                            "0 8px 18px rgba(30, 64, 175, 0.14)",
                          cursor:
                            selectedAnswer === null
                              ? "pointer"
                              : "default",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                        whileHover={
                          selectedAnswer === null
                            ? {
                                scale: 1.06,
                                y: -4,
                              }
                            : {}
                        }
                        whileTap={
                          selectedAnswer === null
                            ? { scale: 0.94 }
                            : {}
                        }
                      >
                        <span
                          style={{
                            fontSize: "42px",
                            lineHeight: 1,
                          }}
                        >
                          {object.emoji}
                        </span>

                        <strong
                          style={{
                            color: "#1e3a8a",
                            textTransform: "capitalize",
                          }}
                        >
                          {object.label}
                        </strong>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {game.type === "windows-desktop" && (
                <div
                  style={{
                    width: "100%",
                    minHeight: "330px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "22px",
                    border: "4px solid #1d4ed8",
                    background:
                      "linear-gradient(145deg, #0ea5e9, #1d4ed8 55%, #312e81)",
                    boxShadow:
                      "0 18px 35px rgba(30, 64, 175, 0.28)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, minmax(90px, 1fr))",
                      gap: "18px",
                      width: "58%",
                      padding: "24px",
                    }}
                  >
                    {[
                      { id: "folder", emoji: "📁", label: "Documentos" },
                      { id: "paint", emoji: "🎨", label: "Paint" },
                      { id: "trash", emoji: "🗑️", label: "Papelera" },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() =>
                          answerWindowsTarget(item.id)
                        }
                        style={{
                          minHeight: "95px",
                          border: "none",
                          borderRadius: "16px",
                          background:
                            selectedAnswer !== null &&
                            item.id === currentItem.target
                              ? "rgba(187, 247, 208, 0.96)"
                              : "rgba(255, 255, 255, 0.14)",
                          color: "#ffffff",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          fontWeight: 900,
                          textShadow:
                            "0 2px 5px rgba(0,0,60,.35)",
                        }}
                        whileHover={{
                          scale:
                            selectedAnswer === null ? 1.06 : 1,
                        }}
                        whileTap={{
                          scale:
                            selectedAnswer === null ? 0.94 : 1,
                        }}
                      >
                        <span style={{ fontSize: "42px" }}>
                          {item.emoji}
                        </span>
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "34px",
                      right: "28px",
                      width: "38%",
                      minWidth: "250px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#ffffff",
                      boxShadow:
                        "0 18px 35px rgba(0, 0, 60, 0.28)",
                    }}
                  >
                    <div
                      style={{
                        minHeight: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: "14px",
                        background: "#eaf3ff",
                        color: "#17345f",
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
                            disabled={
                              selectedAnswer !== null
                            }
                            onClick={() =>
                              answerWindowsTarget(
                                control.id
                              )
                            }
                            style={{
                              width: "42px",
                              height: "44px",
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
                            whileHover={{
                              backgroundColor:
                                control.id === "close"
                                  ? "#fecaca"
                                  : "#dbeafe",
                            }}
                          >
                            {control.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        minHeight: "145px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        fontWeight: 900,
                      }}
                    >
                      Contenido de la ventana
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      height: "54px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 12px",
                      background: "rgba(7, 20, 54, 0.9)",
                    }}
                  >
                    <motion.button
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() =>
                        answerWindowsTarget("start")
                      }
                      style={{
                        width: "42px",
                        height: "42px",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        color: "#ffffff",
                        background:
                          "linear-gradient(135deg, #38bdf8, #2563eb)",
                        fontSize: "26px",
                        fontWeight: 900,
                      }}
                      whileHover={{ scale: 1.08 }}
                    >
                      ⊞
                    </motion.button>

                    <motion.button
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() =>
                        answerWindowsTarget("taskbar")
                      }
                      style={{
                        flex: 1,
                        height: "38px",
                        border: "2px solid rgba(255,255,255,.2)",
                        borderRadius: "10px",
                        cursor: "pointer",
                        color: "#dbeafe",
                        background:
                          "rgba(255, 255, 255, 0.1)",
                        fontWeight: 900,
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      Barra de tareas
                    </motion.button>
                  </div>
                </div>
              )}

              {game.type === "file-sort" && (
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <motion.button
                    type="button"
                    draggable={selectedAnswer === null}
                    onDragStart={handleFileDragStart}
                    onClick={() => {
                      if (selectedAnswer !== null) return;
                      setSelectedFile((current) => !current);
                    }}
                    style={{
                      width: "min(360px, 100%)",
                      minHeight: "94px",
                      margin: "0 auto",
                      borderRadius: "20px",
                      border: selectedFile
                        ? "4px solid #22c55e"
                        : "3px solid #93c5fd",
                      background: selectedFile
                        ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                        : "linear-gradient(135deg, #ffffff, #eff6ff)",
                      boxShadow:
                        "0 8px 18px rgba(30, 64, 175, 0.14)",
                      cursor:
                        selectedAnswer === null
                          ? "grab"
                          : "default",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "13px",
                      color: "#1e3a8a",
                      fontWeight: 900,
                      fontSize: "19px",
                    }}
                    whileHover={
                      selectedAnswer === null
                        ? { scale: 1.04, y: -3 }
                        : {}
                    }
                    whileTap={
                      selectedAnswer === null
                        ? { scale: 0.97 }
                        : {}
                    }
                  >
                    <span style={{ fontSize: "45px" }}>
                      {currentItem.emoji}
                    </span>

                    <span>{currentItem.label}</span>
                  </motion.button>

                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "#64748b",
                      fontWeight: 900,
                    }}
                  >
                    {selectedFile
                      ? "Ahora toca la carpeta correcta."
                      : "Arrastra el archivo o tócalo para seleccionarlo."}
                  </span>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(125px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {game.destinations.map((destination) => {
                      const correctDestination =
                        selectedAnswer !== null &&
                        destination.id ===
                          currentItem.target;

                      const wrongDestination =
                        selectedAnswer === false &&
                        destination.id ===
                          selectedOption;

                      return (
                        <motion.button
                          key={destination.id}
                          type="button"
                          disabled={
                            selectedAnswer !== null
                          }
                          onDragOver={(event) => {
                            event.preventDefault();
                            event.dataTransfer.dropEffect =
                              "move";
                          }}
                          onDrop={(event) =>
                            handleFolderDrop(
                              event,
                              destination.id
                            )
                          }
                          onClick={() => {
                            if (!selectedFile) return;
                            answerFileSort(
                              destination.id
                            );
                          }}
                          style={{
                            minHeight: "112px",
                            borderRadius: "18px",
                            border: correctDestination
                              ? "4px solid #22c55e"
                              : wrongDestination
                                ? "4px solid #ef4444"
                                : "3px solid #bfdbfe",
                            background:
                              correctDestination
                                ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                                : wrongDestination
                                  ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                                  : "linear-gradient(135deg, #ffffff, #eff6ff)",
                            boxShadow:
                              "0 8px 18px rgba(30, 64, 175, 0.12)",
                            cursor:
                              selectedAnswer === null
                                ? "pointer"
                                : "default",
                            color: "#1e3a8a",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "7px",
                            fontWeight: 900,
                          }}
                          whileHover={
                            selectedAnswer === null
                              ? {
                                  scale: 1.05,
                                  y: -3,
                                }
                              : {}
                          }
                        >
                          <span
                            style={{
                              fontSize: "42px",
                              lineHeight: 1,
                            }}
                          >
                            {destination.emoji}
                          </span>
                          {destination.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {game.type === "paint-challenge" && (
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(150px, 190px) 1fr",
                    gap: "14px",
                    padding: "14px",
                    borderRadius: "22px",
                    border: "3px solid #93c5fd",
                    background:
                      "linear-gradient(145deg, #eff6ff, #dbeafe)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: "9px",
                      alignContent: "start",
                    }}
                  >
                    {[
                      { id: "brush", label: "Pincel", emoji: "🖌️" },
                      { id: "eraser", label: "Borrador", emoji: "🧽" },
                      { id: "shapes", label: "Formas", emoji: "🔷" },
                      { id: "fill", label: "Relleno", emoji: "🪣" },
                      { id: "save", label: "Guardar", emoji: "💾" },
                    ].map((tool) => (
                      <motion.button
                        key={tool.id}
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() =>
                          handlePaintTool(tool.id)
                        }
                        style={{
                          minHeight: "52px",
                          borderRadius: "13px",
                          border:
                            paintTool === tool.id
                              ? "3px solid #2563eb"
                              : "2px solid #bfdbfe",
                          background:
                            paintTool === tool.id
                              ? "#dbeafe"
                              : "#ffffff",
                          color: "#1e3a8a",
                          fontWeight: 900,
                          cursor:
                            selectedAnswer === null
                              ? "pointer"
                              : "default",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                        }}
                        whileHover={
                          selectedAnswer === null
                            ? { scale: 1.03 }
                            : {}
                        }
                      >
                        <span style={{ fontSize: "24px" }}>
                          {tool.emoji}
                        </span>
                        {tool.label}
                      </motion.button>
                    ))}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        marginTop: "4px",
                      }}
                    >
                      {[
                        {
                          id: "red",
                          value: "#ef4444",
                          label: "Rojo",
                        },
                        {
                          id: "blue",
                          value: "#2563eb",
                          label: "Azul",
                        },
                      ].map((color) => (
                        <motion.button
                          key={color.id}
                          type="button"
                          disabled={
                            selectedAnswer !== null
                          }
                          onClick={() =>
                            handlePaintColor(
                              color.id,
                              color.value
                            )
                          }
                          aria-label={color.label}
                          style={{
                            minHeight: "45px",
                            borderRadius: "12px",
                            border:
                              paintColor === color.value
                                ? "4px solid #111827"
                                : "3px solid #ffffff",
                            background: color.value,
                            boxShadow:
                              "0 3px 8px rgba(15,23,42,.2)",
                            cursor: "pointer",
                          }}
                          whileHover={{ scale: 1.06 }}
                        />
                      ))}
                    </div>
                  </div>

                  <motion.div
                    role="button"
                    tabIndex={0}
                    onClick={handlePaintCanvas}
                    style={{
                      position: "relative",
                      minHeight: "315px",
                      overflow: "hidden",
                      borderRadius: "18px",
                      border: "4px solid #cbd5e1",
                      background: "#ffffff",
                      cursor:
                        selectedAnswer === null
                          ? "crosshair"
                          : "default",
                      boxShadow:
                        "inset 0 0 0 1px #ffffff, 0 10px 24px rgba(30,64,175,.12)",
                    }}
                  >
                    {paintMarks.length === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94a3b8",
                          fontWeight: 900,
                          pointerEvents: "none",
                          textAlign: "center",
                          padding: "20px",
                        }}
                      >
                        Haz clic en el lienzo para dibujar
                      </div>
                    )}

                    {paintMarks.map((mark) => (
                      <span
                        key={mark.id}
                        style={{
                          position: "absolute",
                          left: `${mark.x}%`,
                          top: `${mark.y}%`,
                          width: `${mark.size}px`,
                          height: `${mark.size}px`,
                          borderRadius: "50%",
                          background: mark.color,
                          transform:
                            "translate(-50%, -50%)",
                          pointerEvents: "none",
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

              {game.type === "safe-browser" && (
                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "22px",
                    border: "4px solid #2563eb",
                    background: "#ffffff",
                    boxShadow:
                      "0 18px 35px rgba(30, 64, 175, 0.22)",
                  }}
                >
                  <div
                    style={{
                      minHeight: "48px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 10px",
                      background: "#eaf3ff",
                      borderBottom: "2px solid #bfdbfe",
                    }}
                  >
                    <motion.button
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() =>
                        answerBrowserTarget("back")
                      }
                      style={{
                        width: "38px",
                        height: "38px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#dbeafe",
                        color: "#1e3a8a",
                        fontSize: "22px",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.06 }}
                    >
                      ←
                    </motion.button>

                    <motion.button
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() =>
                        answerBrowserTarget("reload")
                      }
                      style={{
                        width: "38px",
                        height: "38px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#dbeafe",
                        color: "#1e3a8a",
                        fontSize: "21px",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.06 }}
                    >
                      ⟳
                    </motion.button>

                    <input
                      type="text"
                      value={browserAddress}
                      onChange={handleBrowserAddressChange}
                      onFocus={() => {
                        if (
                          currentItem.target === "address"
                        ) {
                          answerBrowserTarget("address");
                        }
                      }}
                      onKeyDown={handleBrowserKeyDown}
                      placeholder="Escribe una dirección web"
                      disabled={selectedAnswer !== null}
                      style={{
                        flex: 1,
                        minWidth: 0,
                        height: "38px",
                        borderRadius: "12px",
                        border: "2px solid #93c5fd",
                        padding: "0 13px",
                        color: "#17345f",
                        background: "#ffffff",
                        fontWeight: 900,
                        outline: "none",
                      }}
                    />

                    <motion.button
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() =>
                        answerBrowserTarget("newtab")
                      }
                      style={{
                        width: "38px",
                        height: "38px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#dbeafe",
                        color: "#1e3a8a",
                        fontSize: "23px",
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.06 }}
                    >
                      +
                    </motion.button>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      minHeight: "285px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "14px",
                      padding: "22px",
                      background:
                        browserLoaded
                          ? "linear-gradient(145deg, #ecfeff, #dbeafe)"
                          : "linear-gradient(145deg, #f8fafc, #e2e8f0)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "58px",
                        lineHeight: 1,
                      }}
                    >
                      {browserLoaded ? "🌐" : "🔎"}
                    </div>

                    <strong
                      style={{
                        color: "#1e3a8a",
                        fontSize: "24px",
                        textAlign: "center",
                      }}
                    >
                      {browserLoaded
                        ? "¡Bienvenido a EduPlay!"
                        : "Navegador listo"}
                    </strong>

                    <span
                      style={{
                        color: "#64748b",
                        fontWeight: 900,
                        textAlign: "center",
                      }}
                    >
                      {browserLoaded
                        ? "Página educativa cargada de forma segura."
                        : "Escribe una dirección en la barra superior."}
                    </span>

                    <div
                      style={{
                        width: "min(520px, 100%)",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <motion.button
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() =>
                          answerBrowserTarget(
                            "close-warning"
                          )
                        }
                        style={{
                          minHeight: "74px",
                          borderRadius: "16px",
                          border: "3px solid #fca5a5",
                          background: "#fff1f2",
                          color: "#9f1239",
                          cursor: "pointer",
                          fontWeight: 900,
                        }}
                        whileHover={{ scale: 1.03 }}
                      >
                        ⚠️ Cerrar aviso sospechoso
                      </motion.button>

                      <motion.button
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() =>
                          answerBrowserTarget("adult")
                        }
                        style={{
                          minHeight: "74px",
                          borderRadius: "16px",
                          border: "3px solid #86efac",
                          background: "#f0fdf4",
                          color: "#166534",
                          cursor: "pointer",
                          fontWeight: 900,
                        }}
                        whileHover={{ scale: 1.03 }}
                      >
                        🧑 Pedir ayuda a un adulto
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {game.type === "final-mission" && (
                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(5, minmax(105px, 1fr))",
                    gap: "11px",
                    padding: "15px",
                    borderRadius: "22px",
                    border: "3px solid #8b5cf6",
                    background:
                      "linear-gradient(145deg, #eef2ff, #ddd6fe)",
                  }}
                >
                  {[
                    { id: "keyboard", label: "Teclado", emoji: "⌨️" },
                    { id: "mouse", label: "Mouse", emoji: "🖱️" },
                    { id: "start", label: "Inicio", emoji: "⊞" },
                    { id: "folder", label: "Carpeta", emoji: "📁" },
                    { id: "school", label: "Escuela", emoji: "🎒" },
                    { id: "paint", label: "Paint", emoji: "🎨" },
                    { id: "brush", label: "Pincel", emoji: "🖌️" },
                    { id: "save", label: "Guardar", emoji: "💾" },
                    { id: "browser", label: "Navegador", emoji: "🌐" },
                    { id: "adult", label: "Pedir ayuda", emoji: "🧑" },
                  ].map((station) => {
                    const correctStation =
                      selectedAnswer !== null &&
                      station.id === currentItem.target;

                    const wrongStation =
                      selectedAnswer === false &&
                      station.id === selectedOption;

                    return (
                      <motion.button
                        key={station.id}
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() =>
                          answerFinalMission(station.id)
                        }
                        style={{
                          minHeight: "104px",
                          borderRadius: "18px",
                          border: correctStation
                            ? "4px solid #22c55e"
                            : wrongStation
                              ? "4px solid #ef4444"
                              : "3px solid #c4b5fd",
                          background: correctStation
                            ? "linear-gradient(135deg, #dcfce7, #bbf7d0)"
                            : wrongStation
                              ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                              : "linear-gradient(135deg, #ffffff, #f5f3ff)",
                          color: "#3730a3",
                          cursor:
                            selectedAnswer === null
                              ? "pointer"
                              : "default",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "7px",
                          fontWeight: 900,
                          boxShadow:
                            "0 8px 18px rgba(76, 29, 149, 0.12)",
                        }}
                        whileHover={
                          selectedAnswer === null
                            ? { scale: 1.05, y: -3 }
                            : {}
                        }
                        whileTap={
                          selectedAnswer === null
                            ? { scale: 0.96 }
                            : {}
                        }
                      >
                        <span
                          style={{
                            fontSize: "39px",
                            lineHeight: 1,
                          }}
                        >
                          {station.emoji}
                        </span>

                        {station.label}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    className={`computer-game-feedback ${
                      selectedAnswer
                        ? "computer-game-feedback-correct"
                        : "computer-game-feedback-wrong"
                    }`}
                    style={
                      compactGame
                        ? {
                            marginTop: "8px",
                            padding: "9px 14px",
                          }
                        : undefined
                    }
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
                            {game.type === "boolean"
                              ? "Elegiste la respuesta correcta."
                              : game.type === "keyboard"
                                ? `Presionaste correctamente la tecla ${currentItem.correctAnswer}.`
                                : game.type === "mouse-target"
                                  ? "Usaste correctamente el mouse."
                                  : game.type === "windows-desktop"
                                    ? "Seleccionaste el elemento correcto de Windows."
                                    : game.type === "file-sort"
                                      ? "Organizaste el archivo en el lugar correcto."
                                      : game.type === "paint-challenge"
                                        ? "Usaste correctamente la herramienta de Paint."
                                        : game.type === "safe-browser"
                                          ? "Completaste correctamente la acción del navegador."
                                          : game.type === "final-mission"
                                            ? "Completaste correctamente esta parte del reto final."
                                            : `La respuesta es ${currentItem.correctAnswer}.`}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={34} />

                        <div>
                          <strong>¡Cuidado!</strong>
                          <span>
                            {game.type === "boolean"
                              ? "Lee bien la acción antes de responder."
                              : game.type === "keyboard"
                                ? `La tecla correcta era ${currentItem.correctAnswer}.`
                                : game.type === "mouse-target"
                                  ? "Revisa el objeto y el tipo de clic solicitado."
                                  : game.type === "windows-desktop"
                                    ? "Observa nuevamente el escritorio y la ventana."
                                    : game.type === "file-sort"
                                      ? "Revisa el tipo de archivo y la carpeta de destino."
                                      : game.type === "paint-challenge"
                                        ? "Observa la herramienta o el color solicitado."
                                        : game.type === "safe-browser"
                                          ? "Revisa la misión y toca el control correcto del navegador."
                                          : game.type === "final-mission"
                                            ? "Lee nuevamente la misión y elige la herramienta correcta."
                                            : `La respuesta correcta es ${currentItem.correctAnswer}.`}
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
                      {currentIndex <
                        items.length - 1 &&
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
              key={`result-${currentUnit}`}
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
                <Trophy
                  size={94}
                  fill="currentColor"
                />
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
                Obtuviste <strong>{score} puntos</strong>{" "}
                en el minijuego.
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

              <div
                className="computer-game-result-actions"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                }}
              >
                <motion.button
                  type="button"
                  className="computer-game-retry-button"
                  onClick={restartGame}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Jugar de nuevo
                </motion.button>

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
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
