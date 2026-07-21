import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, ShieldCheck, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-numbers-unit.css";

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
const questions = [
  { prompt: "¿Cómo se dice 1 en inglés?", answer: "ONE", options: ["ONE", "TWO", "TEN"] },
  { prompt: "Selecciona el número THREE", answer: "3", options: ["2", "3", "8"] },
  { prompt: "¿Qué número significa FIVE?", answer: "5", options: ["4", "5", "9"] },
  { prompt: "¿Cómo se dice 7 en inglés?", answer: "SEVEN", options: ["SIX", "SEVEN", "NINE"] },
  { prompt: "Selecciona el número TEN", answer: "10", options: ["6", "8", "10"] },
  { prompt: "¿Qué número significa TWO?", answer: "2", options: ["1", "2", "3"] },
  { prompt: "¿Cómo se dice 8 en inglés?", answer: "EIGHT", options: ["FOUR", "EIGHT", "FIVE"] },
  { prompt: "Selecciona el número SIX", answer: "6", options: ["6", "7", "9"] },
];

export default function EnglishNumbersQuiz() {
  const navigate = useNavigate();
  const randomized = useMemo(() => shuffle(questions).map((q) => ({ ...q, options: shuffle(q.options) })), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
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
      navigate("/english/beginner/unit/2/reward", { state: { score: score + (isCorrect ? 1 : 0), total: randomized.length, hearts: hearts - (!isCorrect ? 1 : 0) } });
      return;
    }
    setIndex((value) => value + 1);
    setSelected("");
    setChecked(false);
  };

  return (
    <main className="english-numbers-screen quiz-mode">
      <header className="english-numbers-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/2/game")}><ArrowLeft size={22} /> Mini juego</button>
        <div><span>Evaluación Numbers</span><strong>Pregunta {index + 1} de {randomized.length}</strong></div>
        <div className="english-number-hearts">{[1,2,3].map((heart) => <Heart key={heart} fill={heart <= hearts ? "currentColor" : "none"} />)}</div>
      </header>
      <div className="english-numbers-progress"><span style={{ width: `${((index + 1) / randomized.length) * 100}%` }} /></div>

      <section className="english-number-quiz-stage"><AnimatePresence mode="wait"><motion.article key={index} className="english-number-quiz-card" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -35 }}>
        <span className="english-number-question-label"><ShieldCheck /> Misión {index + 1}</span>
        <h1>{question.prompt}</h1>
        <div className="english-number-options">{question.options.map((option) => <motion.button key={option} disabled={checked} className={`${selected === option ? "selected" : ""} ${checked && option === question.answer ? "correct" : ""} ${checked && selected === option && option !== question.answer ? "wrong" : ""}`} onClick={() => setSelected(option)} whileTap={{ scale: 0.96 }}><span>{option}</span>{checked && option === question.answer && <CheckCircle2 />}{checked && selected === option && option !== question.answer && <XCircle />}</motion.button>)}</div>
        {checked && <div className={`english-number-feedback ${isCorrect ? "success" : "error"}`}>{isCorrect ? <CheckCircle2 /> : <XCircle />}<span><strong>{isCorrect ? "Excellent!" : "Keep learning!"}</strong><small>{isCorrect ? "Respuesta correcta." : `La respuesta correcta es ${question.answer}.`}</small></span></div>}
        <button className="english-numbers-primary centered" disabled={!selected} onClick={checked ? next : check}>{checked ? (index === randomized.length - 1 ? "Ver recompensa" : "Siguiente pregunta") : "Comprobar"}</button>
      </motion.article></AnimatePresence></section>
    </main>
  );
}
