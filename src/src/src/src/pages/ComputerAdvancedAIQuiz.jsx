import "../styles/computer-ai-unit.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Heart,
  Monitor,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const baseQuestions = [
  { id: 1, question: "¿Qué usa la inteligencia artificial para aprender?", icon: BrainCircuit, options: [
    { id: "a", label: "Datos y ejemplos", correct: true },
    { id: "b", label: "Pintura", correct: false },
    { id: "c", label: "Gasolina", correct: false },
  ]},
  { id: 2, question: "¿ChatGPT utiliza inteligencia artificial?", icon: BrainCircuit, options: [
    { id: "a", label: "Sí", correct: true },
    { id: "b", label: "No", correct: false },
  ]},
  { id: 3, question: "¿La IA puede reconocer imágenes?", icon: BrainCircuit, options: [
    { id: "a", label: "Sí", correct: true },
    { id: "b", label: "No", correct: false },
  ]},
  { id: 4, question: "¿Qué información nunca debemos compartir con una IA?", icon: ShieldCheck, options: [
    { id: "a", label: "Contraseñas y datos privados", correct: true },
    { id: "b", label: "Un color favorito", correct: false },
    { id: "c", label: "El nombre de una materia", correct: false },
  ]},
  { id: 5, question: "¿La inteligencia artificial reemplaza completamente a las personas?", icon: ShieldCheck, options: [
    { id: "a", label: "No, debe ayudar y ser revisada", correct: true },
    { id: "b", label: "Sí, siempre", correct: false },
  ]},
];

const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const createQuestions = () => baseQuestions.map((q) => ({ ...q, options: shuffle(q.options) }));

export default function ComputerAdvancedAIQuiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(() => createQuestions());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const question = questions[index];
  const Icon = question.icon;
  const last = index === questions.length - 1;
  const correct = useMemo(() => checked && question.options.find((o) => o.id === selected)?.correct, [checked, question.options, selected]);

  const check = () => {
    if (!selected) return;
    const answer = question.options.find((o) => o.id === selected);
    setChecked(true);
    if (answer.correct) setScore((value) => value + 1);
    else setHearts((value) => Math.max(0, value - 1));
  };

  const next = () => {
    if (!correct) {
      setQuestions((current) => current.map((q, qIndex) => qIndex === index ? { ...q, options: shuffle(q.options) } : q));
      setSelected(null);
      setChecked(false);
      return;
    }
    if (!last) {
      setIndex((value) => value + 1);
      setSelected(null);
      setChecked(false);
      return;
    }
    navigate("/computer/advanced/unit/2/reward", { state: { score: score + 1, total: questions.length, hearts } });
  };

  return (
    <main className="ai-screen">
      <header className="ai-topbar">
        <div className="ai-nav">
          <button onClick={() => navigate("/computer/advanced/unit/2/game")}><ArrowLeft size={21} /><span>Volver</span></button>
          <button onClick={() => navigate("/computer")}><Monitor size={20} /><span>Mundo</span></button>
        </div>
        <div className="ai-heading"><span>Computación · Avanzado</span><strong>Evaluación de Inteligencia Artificial</strong></div>
        <div className="ai-hearts">{[1,2,3].map((n)=><Heart key={n} size={22} fill={n <= hearts ? "currentColor" : "none"} />)}</div>
      </header>

      <section className="ai-shell">
        <motion.article className="ai-card" key={question.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ai-progress-row"><span>Pregunta {index + 1} de {questions.length}</span><strong>{Math.round(((index + 1) / questions.length) * 100)}%</strong></div>
          <div className="ai-progress"><motion.div animate={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>

          <div className="ai-question-box"><div className="ai-question-icon"><Icon size={52} /></div><h1>{question.question}</h1></div>

          <div className="ai-options">
            {question.options.map((option) => {
              const isSelected = selected === option.id;
              const showCorrect = checked && option.correct;
              const showWrong = checked && isSelected && !option.correct;
              return (
                <motion.button
                  key={option.id}
                  className={`ai-option ${isSelected ? "selected" : ""} ${showCorrect ? "correct" : ""} ${showWrong ? "wrong" : ""}`}
                  onClick={() => !checked && setSelected(option.id)}
                  whileHover={checked ? {} : { y: -4, scale: 1.015 }}
                >
                  <strong>{option.label}</strong>{showCorrect && <CheckCircle2 size={24} />}{showWrong && <XCircle size={24} />}
                </motion.button>
              );
            })}
          </div>

          {checked && <div className={`ai-feedback ${correct ? "success" : "error"}`}>{correct ? <CheckCircle2 size={34} /> : <XCircle size={34} />}<div><strong>{correct ? "¡Respuesta correcta!" : "Revisa la pregunta"}</strong><span>{correct ? "Continúa con la siguiente pregunta." : "Las respuestas cambiarán de posición."}</span></div></div>}

          <div className="ai-actions"><div />{!checked ? <button className="ai-primary" disabled={!selected} onClick={check}>Comprobar respuesta</button> : <button className="ai-primary" onClick={next}>{!correct ? "Intentar otra vez" : last ? "Ver recompensa" : "Siguiente pregunta"}</button>}</div>
        </motion.article>
      </section>
    </main>
  );
}
