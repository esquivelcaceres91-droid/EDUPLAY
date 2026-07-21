import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, Images, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-family-unit.css";

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
const questions = [
  { prompt: "¿Cómo se dice mamá en inglés?", emoji: "👩", answer: "MOTHER", options: ["MOTHER", "SISTER", "BABY"] },
  { prompt: "¿Quién es FATHER?", emoji: "👨", answer: "PAPÁ", options: ["ABUELO", "PAPÁ", "HERMANO"] },
  { prompt: "Selecciona la palabra para hermana", emoji: "👧", answer: "SISTER", options: ["MOTHER", "SISTER", "GRANDMOTHER"] },
  { prompt: "¿Cómo se dice hermano en inglés?", emoji: "👦", answer: "BROTHER", options: ["FATHER", "BABY", "BROTHER"] },
  { prompt: "¿Qué significa GRANDMOTHER?", emoji: "👵", answer: "ABUELA", options: ["MAMÁ", "ABUELA", "HERMANA"] },
  { prompt: "Selecciona GRANDFATHER", emoji: "👴", answer: "GRANDFATHER", options: ["GRANDFATHER", "BROTHER", "FATHER"] },
  { prompt: "¿Cómo se dice bebé en inglés?", emoji: "👶", answer: "BABY", options: ["FAMILY", "BABY", "SISTER"] },
  { prompt: "Completa: This is my ___", emoji: "👨‍👩‍👧‍👦", answer: "FAMILY", options: ["FAMILY", "FATHER", "MOTHER"] },
];

export default function EnglishFamilyQuiz() {
  const navigate = useNavigate();
  const randomized = useMemo(() => shuffle(questions).map((question) => ({ ...question, options: shuffle(question.options) })), []);
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState(""); const [checked, setChecked] = useState(false); const [score, setScore] = useState(0); const [hearts, setHearts] = useState(3);
  const question = randomized[index]; const correct = selected === question.answer;

  const check = () => { if (!selected || checked) return; setChecked(true); if (correct) setScore((value) => value + 1); else setHearts((value) => Math.max(0, value - 1)); };
  const next = () => {
    if (index === randomized.length - 1) { navigate("/english/beginner/unit/3/reward", { state: { score: score + (correct ? 1 : 0), total: randomized.length, hearts: Math.max(0, hearts - (!correct ? 1 : 0)) } }); return; }
    setIndex((value) => value + 1); setSelected(""); setChecked(false);
  };

  return (
    <main className="english-family-screen quiz-mode">
      <header className="english-family-topbar compact"><button onClick={() => navigate("/english/beginner/unit/3/game")}><ArrowLeft size={22} /> Mini juego</button><div><span>Evaluación Family</span><strong>Foto {index + 1} de {randomized.length}</strong></div><div className="family-hearts">{[1,2,3].map((heart) => <Heart key={heart} fill={heart <= hearts ? "currentColor" : "none"} />)}</div></header>
      <div className="english-family-progress"><span style={{ width: `${((index + 1) / randomized.length) * 100}%` }} /></div>
      <section className="family-quiz-stage"><AnimatePresence mode="wait"><motion.article key={index} className="family-quiz-card" initial={{ opacity: 0, rotate: -1.5, y: 30 }} animate={{ opacity: 1, rotate: 0, y: 0 }} exit={{ opacity: 0, rotate: 1.5, y: -30 }}>
        <span className="family-question-label"><Images /> Álbum familiar</span><div className="family-quiz-emoji">{question.emoji}</div><h1>{question.prompt}</h1>
        <div className="family-options">{question.options.map((option) => <motion.button key={option} disabled={checked} className={`${selected === option ? "selected" : ""} ${checked && option === question.answer ? "correct" : ""} ${checked && selected === option && option !== question.answer ? "wrong" : ""}`} onClick={() => setSelected(option)} whileTap={{ scale: .96 }}><span>{option}</span>{checked && option === question.answer && <CheckCircle2 />}{checked && selected === option && option !== question.answer && <XCircle />}</motion.button>)}</div>
        {checked && <div className={`family-feedback ${correct ? "success" : "error"}`}>{correct ? <CheckCircle2 /> : <XCircle />}<span><strong>{correct ? "Amazing!" : "Let’s remember!"}</strong><small>{correct ? "Respuesta correcta." : `La respuesta correcta es ${question.answer}.`}</small></span></div>}
        <button className="english-family-primary centered" disabled={!selected} onClick={checked ? next : check}>{checked ? (index === randomized.length - 1 ? "Ver recompensa" : "Siguiente foto") : "Comprobar"}</button>
      </motion.article></AnimatePresence></section>
    </main>
  );
}
