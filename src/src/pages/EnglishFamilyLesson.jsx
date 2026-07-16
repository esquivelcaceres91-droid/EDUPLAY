import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-family-unit.css";

const family = [
  { word: "Mother", spanish: "Mamá", emoji: "👩", phrase: "This is my mother." },
  { word: "Father", spanish: "Papá", emoji: "👨", phrase: "This is my father." },
  { word: "Sister", spanish: "Hermana", emoji: "👧", phrase: "She is my sister." },
  { word: "Brother", spanish: "Hermano", emoji: "👦", phrase: "He is my brother." },
  { word: "Grandmother", spanish: "Abuela", emoji: "👵", phrase: "She is my grandmother." },
  { word: "Grandfather", spanish: "Abuelo", emoji: "👴", phrase: "He is my grandfather." },
  { word: "Baby", spanish: "Bebé", emoji: "👶", phrase: "This is the baby." },
  { word: "Family", spanish: "Familia", emoji: "👨‍👩‍👧‍👦", phrase: "This is my family." },
];

export default function EnglishFamilyLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const item = family[index];
  const progress = useMemo(() => Math.round(((index + 1) / family.length) * 100), [index]);

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(`${item.word}. ${item.phrase}`);
    voice.lang = "en-US";
    voice.rate = 0.78;
    window.speechSynthesis.speak(voice);
  };

  const next = () => {
    if (index < family.length - 1) return setIndex((value) => value + 1);
    updateUnitProgress("english", "beginner", 3, 35);
    navigate("/english/beginner/unit/3/game");
  };

  return (
    <main className="english-family-screen lesson-mode">
      <header className="english-family-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/3")}><ArrowLeft size={22} /> Salir</button>
        <div><span>Lección de Family</span><strong>{index + 1} de {family.length}</strong></div>
        <Heart className="family-header-heart" fill="currentColor" />
      </header>
      <div className="english-family-progress"><span style={{ width: `${progress}%` }} /></div>

      <section className="family-lesson-stage">
        <AnimatePresence mode="wait">
          <motion.article key={item.word} className="family-lesson-card" initial={{ opacity: 0, rotate: -2, y: 35 }} animate={{ opacity: 1, rotate: 0, y: 0 }} exit={{ opacity: 0, rotate: 2, y: -35 }}>
            <div className="family-polaroid"><div className="family-emoji">{item.emoji}</div><span>MY FAMILY</span></div>
            <div className="family-lesson-copy">
              <span className="family-label">Listen and repeat</span>
              <h1>{item.word}</h1><h2>{item.spanish}</h2>
              <div className="family-phrase">“{item.phrase}”</div>
              <button className="family-speak" onClick={speak}><Volume2 size={24} /> Escuchar y repetir</button>
            </div>
          </motion.article>
        </AnimatePresence>
        <div className="family-dots">{family.map((member, dotIndex) => <span key={member.word} className={dotIndex === index ? "active" : dotIndex < index ? "done" : ""} />)}</div>
        <div className="family-actions">
          <button className="family-secondary" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ArrowLeft /> Anterior</button>
          <button className="english-family-primary" onClick={next}>{index === family.length - 1 ? "Completar el árbol" : "Siguiente"}<ArrowRight /></button>
        </div>
      </section>
    </main>
  );
}
