import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Hash, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-numbers-unit.css";

const lessons = [
  { number: 1, word: "One", spanish: "Uno", objects: "⭐" },
  { number: 2, word: "Two", spanish: "Dos", objects: "🌙 🌙" },
  { number: 3, word: "Three", spanish: "Tres", objects: "🚀 🚀 🚀" },
  { number: 4, word: "Four", spanish: "Cuatro", objects: "🪐 🪐 🪐 🪐" },
  { number: 5, word: "Five", spanish: "Cinco", objects: "⭐ ⭐ ⭐ ⭐ ⭐" },
  { number: 6, word: "Six", spanish: "Seis", objects: "🌟 🌟 🌟 🌟 🌟 🌟" },
  { number: 7, word: "Seven", spanish: "Siete", objects: "☄️ ☄️ ☄️ ☄️ ☄️ ☄️ ☄️" },
  { number: 8, word: "Eight", spanish: "Ocho", objects: "✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨" },
  { number: 9, word: "Nine", spanish: "Nueve", objects: "🌙 🌙 🌙 🌙 🌙 🌙 🌙 🌙 🌙" },
  { number: 10, word: "Ten", spanish: "Diez", objects: "⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐" },
];

export default function EnglishNumbersLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const lesson = lessons[index];
  const progress = useMemo(() => Math.round(((index + 1) / lessons.length) * 100), [index]);

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${lesson.number}. ${lesson.word}.`);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const next = () => {
    if (index < lessons.length - 1) return setIndex((value) => value + 1);
    updateUnitProgress("english", "beginner", 2, 35);
    navigate("/english/beginner/unit/2/game");
  };

  return (
    <main className="english-numbers-screen lesson-mode">
      <header className="english-numbers-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/2")}><ArrowLeft size={22} /> Salir</button>
        <div><span>Lección de Numbers</span><strong>{index + 1} de {lessons.length}</strong></div>
        <Hash size={30} />
      </header>
      <div className="english-numbers-progress"><span style={{ width: `${progress}%` }} /></div>

      <section className="english-number-lesson-stage">
        <AnimatePresence mode="wait">
          <motion.article key={lesson.number} className="english-number-lesson-card" initial={{ opacity: 0, x: 50, rotateY: 12 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: -50 }}>
            <div className="english-number-display"><span>{lesson.number}</span><small>{lesson.objects}</small></div>
            <div className="english-number-lesson-copy">
              <span className="english-number-label">Listen and repeat</span>
              <h1>{lesson.word}</h1>
              <h2>{lesson.spanish}</h2>
              <p>{lesson.number} = {lesson.word}</p>
              <button className="english-number-speak" onClick={speak}><Volume2 size={25} /> Escuchar pronunciación</button>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="english-number-dots">{lessons.map((item, dotIndex) => <span key={item.number} className={dotIndex === index ? "active" : dotIndex < index ? "done" : ""} />)}</div>
        <div className="english-number-actions">
          <button className="english-number-secondary" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ArrowLeft /> Anterior</button>
          <button className="english-numbers-primary" onClick={next}>{index === lessons.length - 1 ? "Ir al mini juego" : "Siguiente"}<ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}
