import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-colors-unit.css";

const questions = [
  { prompt: "What color is the apple?", visual: "🍎", answer: "Red", options: ["Red", "Blue", "Green"] },
  { prompt: "Choose the color BLUE.", visual: "💧", answer: "Blue", options: ["Yellow", "Blue", "Pink"] },
  { prompt: "The sun is...", visual: "☀️", answer: "Yellow", options: ["Purple", "Black", "Yellow"] },
  { prompt: "What color is the frog?", visual: "🐸", answer: "Green", options: ["Orange", "Green", "Red"] },
  { prompt: "Choose PURPLE.", visual: "🍇", answer: "Purple", options: ["Purple", "Yellow", "Blue"] },
  { prompt: "An orange is...", visual: "🍊", answer: "Orange", options: ["Pink", "Orange", "Black"] },
  { prompt: "What color is this ice cream?", visual: "🍦", answer: "Pink", options: ["Green", "Pink", "Purple"] },
  { prompt: "A black cat is...", visual: "🐈‍⬛", answer: "Black", options: ["Black", "Red", "Blue"] },
];
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function EnglishColorsQuiz() {
  const navigate = useNavigate();
  const randomized = useMemo(() => shuffle(questions).map((question) => ({ ...question, options: shuffle(question.options) })), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const question = randomized[index];
  const isCorrect = selected === question.answer;

  const check = () => {
    if (!selected || checked) return;
    setChecked(true);
    if (isCorrect) setScore((value) => value + 1);
    else setHearts((value) => Math.max(0, value - 1));
  };
  const next = () => {
    if (index === randomized.length - 1) {
      navigate("/english/beginner/unit/1/reward", { state: { score: score + (isCorrect && !checked ? 1 : 0), total: randomized.length, hearts } });
      return;
    }
    setIndex((value) => value + 1); setSelected(null); setChecked(false);
  };

  return (
    <main className="english-colors-screen quiz-mode">
      <header className="english-colors-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/1/game")}><ArrowLeft /> Juego</button>
        <div><span>Evaluación Colors</span><strong>Pregunta {index + 1} de {randomized.length}</strong></div>
        <div className="english-hearts">{[1,2,3].map((heart) => <Heart key={heart} fill={heart <= hearts ? "currentColor" : "none"} />)}</div>
      </header>
      <div className="english-colors-progress"><span style={{ width: `${((index + 1) / randomized.length) * 100}%` }} /></div>
      <section className="english-quiz-shell">
        <AnimatePresence mode="wait"><motion.article key={question.prompt} className="english-quiz-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }}>
          <div className="english-quiz-visual">{question.visual}</div><h1>{question.prompt}</h1>
          <div className="english-quiz-options">{question.options.map((option) => <button key={option} disabled={checked} onClick={() => setSelected(option)} className={`${selected === option ? "selected" : ""} ${checked && option === question.answer ? "correct" : ""} ${checked && selected === option && option !== question.answer ? "wrong" : ""}`}>{option}{checked && option === question.answer && <CheckCircle2 />}{checked && selected === option && option !== question.answer && <XCircle />}</button>)}</div>
          {checked && <div className={`english-quiz-feedback ${isCorrect ? "good" : "bad"}`}><strong>{isCorrect ? "Great job!" : "Keep learning!"}</strong><span>{isCorrect ? "Elegiste el color correcto." : `La respuesta correcta es ${question.answer}.`}</span></div>}
          <button className="english-colors-primary centered" disabled={!selected} onClick={checked ? next : check}>{checked ? (index === randomized.length - 1 ? "Ver recompensa" : "Siguiente pregunta") : "Comprobar"}</button>
        </motion.article></AnimatePresence>
      </section>
    </main>
  );
}
