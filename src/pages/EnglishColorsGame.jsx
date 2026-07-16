import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Gamepad2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-colors-unit.css";

const pairs = [
  { word: "RED", color: "red" }, { word: "BLUE", color: "blue" },
  { word: "YELLOW", color: "yellow" }, { word: "GREEN", color: "green" },
  { word: "ORANGE", color: "orange" }, { word: "PURPLE", color: "purple" },
];
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function EnglishColorsGame() {
  const navigate = useNavigate();
  const words = useMemo(() => shuffle(pairs), []);
  const colors = useMemo(() => shuffle(pairs), []);
  const [selectedWord, setSelectedWord] = useState(null);
  const [matched, setMatched] = useState([]);
  const [message, setMessage] = useState("Elige una palabra y después su color.");

  const chooseColor = (color) => {
    if (!selectedWord || matched.includes(color)) return;
    if (selectedWord === color) {
      const nextMatched = [...matched, color];
      setMatched(nextMatched);
      setSelectedWord(null);
      setMessage(nextMatched.length === pairs.length ? "¡Arcoíris completado!" : "¡Correcto! Busca la siguiente pareja.");
    } else {
      setMessage("Casi. Observa bien y prueba otro color.");
      setSelectedWord(null);
    }
  };

  const finish = () => {
    updateUnitProgress("english", "beginner", 1, 70);
    navigate("/english/beginner/unit/1/quiz");
  };

  return (
    <main className="english-colors-screen game-mode">
      <header className="english-colors-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/1/lesson")}><ArrowLeft size={22} /> Lección</button>
        <div><span>Mini juego</span><strong>El Arcoíris Mágico</strong></div>
        <div className="english-game-score"><Gamepad2 /> {matched.length}/{pairs.length}</div>
      </header>

      <section className="english-game-shell">
        <div className="english-game-heading"><Sparkles /><div><h1>Conecta palabra + color</h1><p>{message}</p></div></div>
        <div className="english-matching-board">
          <div className="english-word-column">
            {words.map((item) => <motion.button key={item.color} disabled={matched.includes(item.color)} className={`${selectedWord === item.color ? "selected" : ""} ${matched.includes(item.color) ? "matched" : ""}`} onClick={() => { setSelectedWord(item.color); setMessage(`Ahora encuentra el color ${item.word}.`); }} whileTap={{ scale: 0.95 }}>{matched.includes(item.color) && <CheckCircle2 />} {item.word}</motion.button>)}
          </div>
          <div className="english-color-column">
            {colors.map((item) => <motion.button aria-label={item.word} key={item.color} disabled={matched.includes(item.color)} className={`match-color swatch-${item.color} ${matched.includes(item.color) ? "matched" : ""}`} onClick={() => chooseColor(item.color)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>{matched.includes(item.color) && <CheckCircle2 />}</motion.button>)}
          </div>
        </div>
        {matched.length === pairs.length && <motion.button className="english-colors-primary centered" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={finish}>Ir a la evaluación</motion.button>}
      </section>
    </main>
  );
}
