import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  Heart,
  Keyboard,
  Lightbulb,
  Monitor,
  MousePointer2,
  Play,
  Space,
  Type,
  Volume2,
} from "lucide-react";

import "../styles/computer-unit.css";

const unitsContent = {
  1: {
    title: "La computadora",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es una computadora?",
        description:
          "Una computadora es una máquina electrónica que recibe, procesa y guarda información.",
        speechTitle: "¡Es una herramienta increíble!",
        speechText:
          "Nos ayuda a aprender, escribir, dibujar, investigar, comunicarnos y jugar.",
        image:
          "/assets/computer/maps/beginner/unit-computer.png",
        icon: Monitor,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "¿Qué puede hacer?",
        description:
          "Una computadora puede realizar muchas tareas siguiendo las instrucciones que le damos.",
        speechTitle: "Tú le das las instrucciones",
        speechText:
          "Puedes abrir programas, escribir textos, ver videos, hacer dibujos y buscar información.",
        image:
          "/assets/computer/maps/beginner/unit-computer.png",
        icon: MousePointer2,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "La computadora nos ayuda",
        description:
          "Las computadoras se utilizan en escuelas, hospitales, tiendas, oficinas y hogares.",
        speechTitle: "Están en muchos lugares",
        speechText:
          "Cada computadora puede ayudarnos a estudiar, trabajar y comunicarnos de una forma diferente.",
        image:
          "/assets/computer/maps/beginner/unit-computer.png",
        icon: Lightbulb,
      },
    ],
  },

  2: {
    title: "Partes de la PC",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "El monitor",
        description:
          "El monitor es la pantalla de la computadora. En él podemos ver imágenes, textos, videos y programas.",
        speechTitle:
          "Es como la ventana de la computadora",
        speechText:
          "Todo lo que hacemos aparece en el monitor para que podamos verlo.",
        image:
          "/assets/computer/maps/beginner/unit-parts.png",
        icon: Monitor,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "El teclado y el mouse",
        description:
          "El teclado nos permite escribir letras y números. El mouse nos ayuda a mover el puntero y seleccionar objetos.",
        speechTitle:
          "Nos ayudan a dar instrucciones",
        speechText:
          "Con el teclado escribimos y con el mouse hacemos clic, seleccionamos y arrastramos.",
        image:
          "/assets/computer/maps/beginner/unit-parts.png",
        icon: Keyboard,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "La CPU o torre",
        description:
          "La CPU o torre contiene componentes importantes que permiten que la computadora funcione.",
        speechTitle: "Es una parte muy importante",
        speechText:
          "Dentro de la torre se procesa la información y se conectan muchas partes de la computadora.",
        image:
          "/assets/computer/maps/beginner/unit-parts.png",
        icon: Cpu,
      },
    ],
  },

  3: {
    title: "El teclado",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es el teclado?",
        description:
          "El teclado es una parte de la computadora que utilizamos para escribir letras, números y símbolos.",
        speechTitle: "Tiene muchas teclas",
        speechText:
          "Cada tecla envía una instrucción diferente a la computadora cuando la presionamos.",
        image:
          "/assets/computer/maps/beginner/unit-keyboard.png",
        icon: Keyboard,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Letras y números",
        description:
          "Las teclas con letras nos permiten escribir palabras. Las teclas con números nos permiten escribir cantidades.",
        speechTitle: "Podemos escribir muchas cosas",
        speechText:
          "Con el teclado podemos escribir nuestro nombre, una tarea, una historia o una operación matemática.",
        image:
          "/assets/computer/maps/beginner/unit-keyboard.png",
        icon: Type,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Teclas especiales",
        description:
          "El teclado también tiene teclas especiales como Espacio, Enter, Retroceso y Bloq Mayús.",
        speechTitle: "Cada tecla tiene una función",
        speechText:
          "Espacio separa palabras, Enter cambia de línea y Retroceso elimina lo que escribimos.",
        image:
          "/assets/computer/maps/beginner/unit-keyboard.png",
        icon: Space,
      },
    ],
  },

  4: {
    title: "El mouse",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es el mouse?",
        description:
          "El mouse es una parte de la computadora que movemos con la mano para controlar el puntero en la pantalla.",
        speechTitle: "El puntero sigue tus movimientos",
        speechText:
          "Cuando deslizas el mouse, la flecha de la pantalla se mueve en la misma dirección.",
        image:
          "/assets/computer/maps/beginner/unit-mouse.png",
        icon: MousePointer2,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Clic y doble clic",
        description:
          "El clic izquierdo sirve para seleccionar objetos. El doble clic se usa para abrir carpetas, archivos y programas.",
        speechTitle: "Uno para seleccionar, dos para abrir",
        speechText:
          "Haz un clic para elegir algo y dos clics rápidos para abrirlo.",
        image:
          "/assets/computer/maps/beginner/unit-mouse.png",
        icon: MousePointer2,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Clic derecho y rueda",
        description:
          "El clic derecho muestra opciones adicionales. La rueda del mouse permite subir y bajar por una página.",
        speechTitle: "El mouse tiene más funciones",
        speechText:
          "Con el botón derecho vemos un menú y con la rueda recorremos páginas largas.",
        image:
          "/assets/computer/maps/beginner/unit-mouse.png",
        icon: MousePointer2,
      },
    ],
  },

  5: {
    title: "Windows",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "El escritorio de Windows",
        description:
          "El escritorio es la pantalla principal de Windows. Allí encontramos iconos, carpetas, programas y la barra de tareas.",
        speechTitle: "Es nuestro espacio de trabajo",
        speechText:
          "Desde el escritorio podemos abrir carpetas, iniciar programas y organizar nuestros archivos.",
        image:
          "/assets/computer/maps/beginner/unit-windows.png",
        icon: Monitor,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Menú Inicio y barra de tareas",
        description:
          "El menú Inicio permite encontrar aplicaciones y opciones. La barra de tareas muestra los programas abiertos.",
        speechTitle: "Todo está al alcance",
        speechText:
          "Con Inicio buscamos programas y con la barra de tareas cambiamos entre ventanas.",
        image:
          "/assets/computer/maps/beginner/unit-windows.png",
        icon: MousePointer2,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Las ventanas",
        description:
          "Las ventanas pueden minimizarse, maximizarse y cerrarse usando los botones de la esquina superior derecha.",
        speechTitle: "Cada botón tiene una función",
        speechText:
          "Minimizar oculta la ventana, maximizar la agranda y cerrar termina el programa.",
        image:
          "/assets/computer/maps/beginner/unit-windows.png",
        icon: Lightbulb,
      },
    ],
  },

  6: {
    title: "Archivos y carpetas",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es un archivo?",
        description:
          "Un archivo guarda información. Puede ser un documento, una fotografía, una canción, un video o un dibujo.",
        speechTitle: "Cada archivo tiene un contenido",
        speechText:
          "Los archivos suelen tener un nombre y una extensión que nos ayuda a reconocer su tipo.",
        image:
          "/assets/computer/maps/beginner/unit-files.png",
        icon: BookOpen,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "¿Qué es una carpeta?",
        description:
          "Una carpeta sirve para guardar y organizar archivos, igual que una carpeta escolar guarda hojas y tareas.",
        speechTitle: "Las carpetas mantienen el orden",
        speechText:
          "Podemos crear carpetas para Escuela, Fotos, Música y otros temas.",
        image:
          "/assets/computer/maps/beginner/unit-files.png",
        icon: Lightbulb,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Organizar, mover y eliminar",
        description:
          "Podemos mover archivos de una carpeta a otra y enviar a la Papelera los que ya no necesitamos.",
        speechTitle: "Primero revisa y luego organiza",
        speechText:
          "Coloca cada archivo en la carpeta correcta y usa la Papelera con cuidado.",
        image:
          "/assets/computer/maps/beginner/unit-files.png",
        icon: MousePointer2,
      },
    ],
  },

  7: {
    title: "Paint",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es Paint?",
        description:
          "Paint es un programa de dibujo que permite crear imágenes usando colores, formas, líneas y pinceles.",
        speechTitle: "Podemos crear nuestros propios dibujos",
        speechText:
          "En Paint usamos el mouse para dibujar, colorear y agregar formas en una hoja digital.",
        image:
          "/assets/computer/maps/beginner/unit-paint.png",
        icon: Monitor,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "Pincel, lápiz y borrador",
        description:
          "El lápiz y el pincel sirven para dibujar. El borrador elimina partes del dibujo que ya no queremos.",
        speechTitle: "Cada herramienta cumple una función",
        speechText:
          "Elige la herramienta correcta antes de comenzar a dibujar o corregir.",
        image:
          "/assets/computer/maps/beginner/unit-paint.png",
        icon: MousePointer2,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Colores, formas y guardar",
        description:
          "Podemos cambiar colores, insertar figuras y guardar nuestro trabajo para abrirlo nuevamente después.",
        speechTitle: "Guarda siempre tu creación",
        speechText:
          "Cuando termines un dibujo, usa Guardar para no perderlo.",
        image:
          "/assets/computer/maps/beginner/unit-paint.png",
        icon: Lightbulb,
      },
    ],
  },

  8: {
    title: "Internet seguro",

    lessons: [
      {
        id: 1,
        badge: "Lección 1",
        title: "¿Qué es Internet?",
        description:
          "Internet conecta computadoras y dispositivos de todo el mundo para compartir información y comunicarnos.",
        speechTitle: "Internet nos ayuda a aprender",
        speechText:
          "Podemos buscar información, ver videos educativos y visitar páginas web.",
        image:
          "/assets/computer/maps/beginner/unit-internet.png",
        icon: Monitor,
      },
      {
        id: 2,
        badge: "Lección 2",
        title: "El navegador",
        description:
          "Un navegador es un programa que usamos para visitar páginas web, como Chrome, Edge o Firefox.",
        speechTitle: "La barra de direcciones",
        speechText:
          "En la barra de direcciones escribimos el nombre o la dirección de una página web.",
        image:
          "/assets/computer/maps/beginner/unit-internet.png",
        icon: MousePointer2,
      },
      {
        id: 3,
        badge: "Lección 3",
        title: "Navegamos con seguridad",
        description:
          "No debemos compartir contraseñas, hablar con desconocidos ni descargar archivos extraños.",
        speechTitle: "Pide ayuda a un adulto",
        speechText:
          "Si algo te asusta, te incomoda o parece extraño, cierra la página y avisa a un adulto.",
        image:
          "/assets/computer/maps/beginner/unit-internet.png",
        icon: Lightbulb,
      },
    ],
  },

  9: {
    title: "Reto final",

    lessons: [
      {
        id: 1,
        badge: "Repaso 1",
        title: "Controlamos la computadora",
        description:
          "Usamos el teclado para escribir y el mouse para seleccionar, abrir, mover y organizar elementos.",
        speechTitle: "Ya dominas las herramientas principales",
        speechText:
          "Cada tecla, clic y movimiento envía una instrucción diferente a la computadora.",
        image:
          "/assets/computer/maps/beginner/unit-final.png",
        icon: Keyboard,
      },
      {
        id: 2,
        badge: "Repaso 2",
        title: "Trabajamos con Windows y archivos",
        description:
          "En Windows usamos el escritorio, las ventanas, el menú Inicio, los archivos y las carpetas.",
        speechTitle: "El orden facilita el trabajo",
        speechText:
          "Podemos abrir programas, guardar tareas y colocar cada archivo en su carpeta correcta.",
        image:
          "/assets/computer/maps/beginner/unit-final.png",
        icon: Monitor,
      },
      {
        id: 3,
        badge: "Repaso 3",
        title: "Creamos y navegamos con seguridad",
        description:
          "En Paint podemos crear dibujos, y en Internet debemos cuidar nuestra información y pedir ayuda a un adulto.",
        speechTitle: "Estás listo para el reto final",
        speechText:
          "Ahora demostrarás todo lo aprendido durante el nivel principiante.",
        image:
          "/assets/computer/maps/beginner/unit-final.png",
        icon: Lightbulb,
      },
    ],
  },
};

export default function ComputerLesson() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const unitContent =
    unitsContent[currentUnit] || unitsContent[1];

  const lessons = unitContent.lessons;

  const [lessonIndex, setLessonIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lesson = lessons[lessonIndex];
  const LessonIcon = lesson.icon;

  useEffect(() => {
    setLessonIndex(0);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  }, [currentUnit]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const progress = useMemo(() => {
    return Math.round(
      ((lessonIndex + 1) / lessons.length) * 100
    );
  }, [lessonIndex, lessons.length]);

  const stopSpeaking = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speakLesson = () => {
    if (!window.speechSynthesis) return;

    stopSpeaking();

    const message = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.description}. ${lesson.speechTitle}. ${lesson.speechText}`
    );

    message.lang = "es-GT";
    message.rate = 0.88;
    message.pitch = 1.08;

    message.onstart = () => {
      setIsSpeaking(true);
    };

    message.onend = () => {
      setIsSpeaking(false);
    };

    message.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(message);
  };

  const goBack = () => {
    stopSpeaking();
    navigate("/computer/beginner");
  };

  const nextLesson = () => {
    stopSpeaking();

    if (lessonIndex < lessons.length - 1) {
      setLessonIndex((current) => current + 1);
      return;
    }

    navigate(
      `/computer/beginner/unit/${currentUnit}/activity`
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
          onClick={goBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

          <motion.button
            type="button"
            className="computer-unit-back"
            onClick={() => {
              stopSpeaking();
              navigate("/computer");
            }}
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
            Unidad {currentUnit}: {unitContent.title}
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
          className="computer-lesson-card"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="computer-lesson-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentUnit}-${lesson.id}`}
                className="computer-lesson-image-frame"
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  x: 25,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.img
                  src={lesson.image}
                  alt={lesson.title}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/assets/computer-world.png";
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="computer-lesson-content">
            <div className="computer-lesson-progress-header">
              <div className="computer-lesson-progress-track">
                <motion.div
                  className="computer-lesson-progress-fill"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <span className="computer-lesson-progress-label">
                {progress}%
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentUnit}-${lesson.id}-content`}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="computer-lesson-badge">
                  <BookOpen size={20} />
                  {lesson.badge}
                </div>

                <h1>{lesson.title}</h1>

                <p className="computer-lesson-description">
                  {lesson.description}
                </p>

                <div className="computer-lesson-speech">
                  <div className="computer-lesson-speech-icon">
                    <LessonIcon size={31} />
                  </div>

                  <div>
                    <strong>{lesson.speechTitle}</strong>
                    <span>{lesson.speechText}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="computer-lesson-actions">
              <motion.button
                type="button"
                className="computer-lesson-audio-button"
                onClick={
                  isSpeaking ? stopSpeaking : speakLesson
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                {isSpeaking ? (
                  <>
                    <Volume2 size={23} />
                    Detener
                  </>
                ) : (
                  <>
                    <Play size={22} fill="currentColor" />
                    Escuchar
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                className="computer-lesson-next-button"
                onClick={nextLesson}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {lessonIndex < lessons.length - 1
                  ? "Siguiente"
                  : "Continuar"}

                <ArrowRight size={23} />
              </motion.button>
            </div>

            <div className="computer-lesson-dots">
              {lessons.map((item, index) => (
                <span
                  key={item.id}
                  className={`computer-lesson-dot ${
                    index === lessonIndex
                      ? "computer-lesson-dot-active"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  );
}