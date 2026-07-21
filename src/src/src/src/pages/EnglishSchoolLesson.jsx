import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Headphones, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-school-unit.css";

const words = [
  { word: "BOOK", translation: "Libro", emoji: "📘", phrase: "This is my book." },
  { word: "PENCIL", translation: "Lápiz", emoji: "✏️", phrase: "I write with a pencil." },
  { word: "ERASER", translation: "Borrador", emoji: "🧽", phrase: "This is an eraser." },
  { word: "RULER", translation: "Regla", emoji: "📏", phrase: "The ruler is long." },
  { word: "BACKPACK", translation: "Mochila", emoji: "🎒", phrase: "My backpack is ready." },
  { word: "DESK", translation: "Escritorio", emoji: "🪑", phrase: "I sit at my desk." },
  { word: "TEACHER", translation: "Maestro/a", emoji: "👩‍🏫", phrase: "The teacher helps us." },
  { word: "BOARD", translation: "Pizarra", emoji: "🧑‍🏫", phrase: "Look at the board." },
  { word: "SCISSORS", translation: "Tijeras", emoji: "✂️", phrase: "These are scissors." },
  { word: "CRAYONS", translation: "Crayones", emoji: "🖍️", phrase: "My crayons are colorful." },
];

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "en-US"; voice.rate = .78; voice.pitch = 1.05;
  window.speechSynthesis.speak(voice);
}

export default function EnglishSchoolLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const item = words[index];
  return <main className="school-screen school-lesson-mode">
    <header className="school-top"><button className="school-back" onClick={() => navigate("/english/beginner/unit/5")}><ArrowLeft/> Volver</button><div><School/><span>School · Lección</span></div><strong>{index + 1}/{words.length}</strong></header>
    <section className="school-lesson-wrap">
      <div className="school-progress"><span style={{ width: `${((index + 1)/words.length)*100}%` }}/></div>
      <AnimatePresence mode="wait"><motion.article key={item.word} className="school-word-card" initial={{ opacity: 0, x: 50, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -50 }}>
        <div className="school-emoji">{item.emoji}</div><span className="school-word-label">School word</span><h1>{item.word}</h1><h2>{item.translation}</h2><p><BookOpen/> {item.phrase}</p>
        <button className="school-listen" onClick={() => speak(`${item.word}. ${item.phrase}`)}><Headphones/> Escuchar pronunciación</button>
      </motion.article></AnimatePresence>
      <div className="school-nav-row"><button disabled={index === 0} onClick={() => setIndex(i => i - 1)}><ArrowLeft/> Anterior</button>{index < words.length - 1 ? <button className="school-primary" onClick={() => setIndex(i => i + 1)}>Siguiente <ArrowRight/></button> : <button className="school-primary" onClick={() => navigate("/english/beginner/unit/5/game")}>Ir al juego <ArrowRight/></button>}</div>
    </section>
  </main>;
}
