import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ChefHat, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-food-unit.css";

const words = [
  { word: "Apple", spanish: "Manzana", emoji: "🍎", phrase: "The apple is red.", translation: "La manzana es roja." },
  { word: "Banana", spanish: "Banano", emoji: "🍌", phrase: "I like bananas.", translation: "Me gustan los bananos." },
  { word: "Bread", spanish: "Pan", emoji: "🍞", phrase: "This is fresh bread.", translation: "Este es pan fresco." },
  { word: "Cheese", spanish: "Queso", emoji: "🧀", phrase: "The cheese is yellow.", translation: "El queso es amarillo." },
  { word: "Chicken", spanish: "Pollo", emoji: "🍗", phrase: "The chicken is delicious.", translation: "El pollo está delicioso." },
  { word: "Rice", spanish: "Arroz", emoji: "🍚", phrase: "I eat rice for lunch.", translation: "Como arroz en el almuerzo." },
  { word: "Milk", spanish: "Leche", emoji: "🥛", phrase: "I drink milk.", translation: "Yo bebo leche." },
  { word: "Juice", spanish: "Jugo", emoji: "🧃", phrase: "The juice is cold.", translation: "El jugo está frío." },
  { word: "Cake", spanish: "Pastel", emoji: "🍰", phrase: "The cake is sweet.", translation: "El pastel es dulce." },
  { word: "Ice cream", spanish: "Helado", emoji: "🍦", phrase: "I love ice cream.", translation: "Me encanta el helado." },
];

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "en-US";
  voice.rate = .82;
  window.speechSynthesis.speak(voice);
}

export default function EnglishFoodLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const item = words[index];
  const next = () => {
    if (index < words.length - 1) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      updateUnitProgress("english", "beginner", 6, Math.round(((nextIndex + 1) / words.length) * 35));
    } else {
      updateUnitProgress("english", "beginner", 6, 35);
      navigate("/english/beginner/unit/6/game");
    }
  };
  return (
    <main className="food-screen">
      <header className="food-top">
        <button onClick={() => navigate("/english/beginner/unit/6")}><ArrowLeft /> <span>Salir</span></button>
        <div><ChefHat/><span>Food Lesson</span></div>
        <strong>{index + 1}/{words.length}</strong>
      </header>
      <section className="food-lesson-wrap">
        <div className="food-progress"><span style={{ width: `${((index + 1) / words.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.article key={item.word} className="food-word-card" initial={{ opacity: 0, x: 55, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -45 }}>
            <span className="food-emoji">{item.emoji}</span>
            <span className="food-word-label">Today we learn</span>
            <h1>{item.word}</h1>
            <h2>{item.spanish}</h2>
            <button className="food-listen" onClick={() => speak(`${item.word}. ${item.phrase}`)}><Volume2/> Escuchar pronunciación</button>
            <p><strong>“{item.phrase}”</strong></p>
            <small>{item.translation}</small>
          </motion.article>
        </AnimatePresence>
        <div className="food-nav-row">
          <button disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ArrowLeft/> Anterior</button>
          <button className="food-primary" onClick={next}>{index === words.length - 1 ? "Ir al juego" : "Siguiente"}<ArrowRight/></button>
        </div>
      </section>
    </main>
  );
}
