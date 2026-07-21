import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Rocket, RotateCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-numbers-unit.css";

const numberWords = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"];
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function EnglishNumbersGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(() => shuffle(numberWords.map((word, index) => ({ word, value: index + 1 }))));
  const [nextNumber, setNextNumber] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("Pulsa los números en orden: ONE, TWO, THREE...");
  const completed = nextNumber === 11;
  const progress = useMemo(() => Math.round(((nextNumber - 1) / 10) * 100), [nextNumber]);

  const choose = (card) => {
    if (completed || card.value < nextNumber) return;
    if (card.value === nextNumber) {
      const next = nextNumber + 1;
      setNextNumber(next);
      setMessage(next === 11 ? "¡Despegue exitoso! La nave está lista." : `¡Correcto! Ahora busca ${numberWords[next - 1]}.`);
    } else {
      setMistakes((value) => value + 1);
      setMessage(`Ese no sigue. Busca ${numberWords[nextNumber - 1]}.`);
    }
  };

  const reset = () => {
    setCards(shuffle(numberWords.map((word, index) => ({ word, value: index + 1 }))));
    setNextNumber(1);
    setMistakes(0);
    setMessage("Pulsa los números en orden: ONE, TWO, THREE...");
  };

  const finish = () => {
    updateUnitProgress("english", "beginner", 2, 70);
    navigate("/english/beginner/unit/2/quiz");
  };

  return (
    <main className="english-numbers-screen game-mode">
      <header className="english-numbers-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/2/lesson")}><ArrowLeft size={22} /> Lección</button>
        <div><span>Mini juego</span><strong>Secuencia de Despegue</strong></div>
        <div className="english-number-game-score"><Rocket /> {nextNumber - 1}/10</div>
      </header>

      <section className="english-number-game-shell">
        <div className="english-number-game-heading"><Sparkles /><div><h1>Activa los motores en orden</h1><p>{message}</p></div></div>
        <div className="english-number-launch-progress"><span style={{ width: `${progress}%` }} /><Rocket style={{ left: `calc(${progress}% - 22px)` }} /></div>

        <div className="english-number-grid">
          {cards.map((card) => {
            const done = card.value < nextNumber;
            return <motion.button key={card.value} disabled={done} className={done ? "done" : ""} onClick={() => choose(card)} whileHover={!done ? { scale: 1.06, y: -5 } : {}} whileTap={!done ? { scale: 0.94 } : {}}>
              {done ? <CheckCircle2 /> : <span>{card.value}</span>}<strong>{card.word}</strong>
            </motion.button>;
          })}
        </div>

        <div className="english-number-game-footer">
          <button className="english-number-secondary" onClick={reset}><RotateCcw /> Reiniciar</button>
          <span>Intentos fallidos: {mistakes}</span>
          {completed && <motion.button className="english-numbers-primary" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={finish}>Continuar a evaluación <Rocket /></motion.button>}
        </div>
      </section>
    </main>
  );
}
