import "../styles/computer-ai-unit.css";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Dog,
  Heart,
  Monitor,
  RotateCcw,
  User,
  XCircle,
} from "lucide-react";

const pool = [
  { type: "robot", label: "Robot", icon: Bot },
  { type: "human", label: "Persona", icon: User },
  { type: "dog", label: "Perro", icon: Dog },
];

const createRound = () => {
  const items = Array.from({ length: 9 }, (_, index) => {
    const source = pool[Math.floor(Math.random() * pool.length)];
    return { ...source, id: `${Date.now()}-${index}-${Math.random()}` };
  });
  if (!items.some((item) => item.type === "robot")) items[0] = { ...pool[0], id: `forced-${Date.now()}` };
  return items;
};

export default function ComputerAdvancedAIGame() {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => createRound());
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [round, setRound] = useState(1);

  const robots = useMemo(() => items.filter((item) => item.type === "robot"), [items]);
  const foundRobots = clicked.filter((id) => robots.some((item) => item.id === id)).length;
  const roundComplete = foundRobots === robots.length;
  const gameComplete = roundComplete && round === 3;

  useEffect(() => {
    if (!roundComplete || round === 3) return;
    const timer = window.setTimeout(() => {
      setRound((value) => value + 1);
      setItems(createRound());
      setClicked([]);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [roundComplete, round]);

  const choose = (item) => {
    if (clicked.includes(item.id) || gameComplete) return;
    setClicked((current) => [...current, item.id]);
    if (item.type === "robot") setScore((value) => value + 10);
    else setHearts((value) => Math.max(0, value - 1));
  };

  const reset = () => {
    setItems(createRound());
    setClicked([]);
    setScore(0);
    setHearts(3);
    setRound(1);
  };

  return (
    <main className="ai-screen">
      <header className="ai-topbar">
        <div className="ai-nav">
          <button onClick={() => navigate("/computer/advanced/unit/2/activity")}><ArrowLeft size={21} /><span>Volver</span></button>
          <button onClick={() => navigate("/computer")}><Monitor size={20} /><span>Mundo</span></button>
        </div>
        <div className="ai-heading"><span>Computación · Avanzado</span><strong>Detecta al Robot</strong></div>
        <div className="ai-hearts">{[1,2,3].map((n)=><Heart key={n} size={22} fill={n <= hearts ? "currentColor" : "none"} />)}</div>
      </header>

      <section className="ai-shell">
        <motion.article className="ai-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ai-panel-header">
            <div><span>Minijuego visual</span><h1>Toca únicamente los robots</h1><p>Evita personas y animales. Completa tres rondas.</p></div>
            <div className="ai-score-box"><strong>{score}</strong><span>Puntos</span></div>
          </div>

          <div className="ai-round-bar"><span>Ronda {round} de 3</span><strong>Robots encontrados: {foundRobots}/{robots.length}</strong></div>

          <div className="ai-detect-grid">
            {items.map((item) => {
              const Icon = item.icon;
              const wasClicked = clicked.includes(item.id);
              const correct = wasClicked && item.type === "robot";
              const wrong = wasClicked && item.type !== "robot";
              return (
                <motion.button
                  key={item.id}
                  className={`ai-detect-item ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                  onClick={() => choose(item)}
                  whileHover={wasClicked ? {} : { y: -6, scale: 1.03 }}
                  whileTap={wasClicked ? {} : { scale: 0.96 }}
                >
                  <Icon size={48} /><strong>{item.label}</strong>
                  {correct && <CheckCircle2 size={24} />}
                  {wrong && <XCircle size={24} />}
                </motion.button>
              );
            })}
          </div>

          {roundComplete && (
            <motion.div className="ai-feedback success" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle2 size={34} /><div><strong>{gameComplete ? "¡Minijuego completado!" : "¡Ronda completada!"}</strong><span>{gameComplete ? "Reconociste correctamente a los robots." : "La siguiente ronda comenzará en un momento."}</span></div>
            </motion.div>
          )}

          <div className="ai-actions">
            <button className="ai-secondary" onClick={reset}><RotateCcw size={20} /> Reiniciar</button>
            <button className="ai-primary" disabled={!gameComplete} onClick={() => navigate("/computer/advanced/unit/2/quiz")}>Ir a la evaluación</button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
