import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Palette, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-colors-unit.css";

const lessons = [
  { word: "Red", spanish: "Rojo", css: "red", phrase: "A red apple", emoji: "🍎" },
  { word: "Blue", spanish: "Azul", css: "blue", phrase: "A blue balloon", emoji: "🎈" },
  { word: "Yellow", spanish: "Amarillo", css: "yellow", phrase: "A yellow sun", emoji: "☀️" },
  { word: "Green", spanish: "Verde", css: "green", phrase: "A green frog", emoji: "🐸" },
  { word: "Orange", spanish: "Naranja", css: "orange", phrase: "An orange fish", emoji: "🐠" },
  { word: "Purple", spanish: "Morado", css: "purple", phrase: "A purple flower", emoji: "🌸" },
  { word: "Pink", spanish: "Rosado", css: "pink", phrase: "A pink ice cream", emoji: "🍦" },
  { word: "Black", spanish: "Negro", css: "black", phrase: "A black cat", emoji: "🐈‍⬛" },
];

export default function EnglishColorsLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const lesson = lessons[index];
  const progress = useMemo(() => Math.round(((index + 1) / lessons.length) * 100), [index]);

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${lesson.word}. ${lesson.phrase}`);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const next = () => {
    if (index < lessons.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    updateUnitProgress("english", "beginner", 1, 35);
    navigate("/english/beginner/unit/1/game");
  };

  return (
    <main className="english-colors-screen lesson-mode">
      <header className="english-colors-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/1")}><ArrowLeft size={22} /> Salir</button>
        <div><span>Lección de Colors</span><strong>{index + 1} de {lessons.length}</strong></div>
        <Palette size={30} />
      </header>
      <div className="english-colors-progress"><span style={{ width: `${progress}%` }} /></div>

      <section className="english-lesson-stage">
        <AnimatePresence mode="wait">
          <motion.article key={lesson.word} className="english-lesson-card" initial={{ opacity: 0, x: 45, rotateY: 12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -45 }}>
            <div className={`english-color-swatch swatch-${lesson.css}`}><span>{lesson.emoji}</span></div>
            <div className="english-lesson-copy">
              <span className="english-lesson-label">Listen and repeat</span>
              <h1>{lesson.word}</h1>
              <h2>{lesson.spanish}</h2>
              <p>{lesson.phrase}</p>
              <button className="english-speak-button" onClick={speak}><Volume2 size={25} /> Escuchar pronunciación</button>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="english-lesson-dots">{lessons.map((item, dotIndex) => <span key={item.word} className={dotIndex === index ? "active" : dotIndex < index ? "done" : ""} />)}</div>
        <div className="english-lesson-actions">
          <button className="english-secondary" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ArrowLeft /> Anterior</button>
          <button className="english-colors-primary" onClick={next}>{index === lessons.length - 1 ? "Ir al mini juego" : "Siguiente"}<ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}
