import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, RefreshCcw, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-family-unit.css";

const slots = [
  { id: "grandmother", label: "GRANDMOTHER", emoji: "👵", hint: "Abuela" },
  { id: "grandfather", label: "GRANDFATHER", emoji: "👴", hint: "Abuelo" },
  { id: "mother", label: "MOTHER", emoji: "👩", hint: "Mamá" },
  { id: "father", label: "FATHER", emoji: "👨", hint: "Papá" },
  { id: "sister", label: "SISTER", emoji: "👧", hint: "Hermana" },
  { id: "brother", label: "BROTHER", emoji: "👦", hint: "Hermano" },
];
const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export default function EnglishFamilyGame() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(() => shuffle(slots.map(({ id, label }) => ({ id, label }))));
  const [selected, setSelected] = useState("");
  const [placed, setPlaced] = useState({});
  const [mistakes, setMistakes] = useState(0);
  const completed = Object.keys(placed).length === slots.length;
  const selectedLabel = useMemo(() => cards.find((card) => card.id === selected)?.label || "", [cards, selected]);

  const chooseSlot = (slot) => {
    if (!selected || placed[slot.id]) return;
    if (selected === slot.id) {
      setPlaced((value) => ({ ...value, [slot.id]: true }));
      setSelected("");
    } else {
      setMistakes((value) => value + 1);
    }
  };

  const reset = () => {
    setCards(shuffle(slots.map(({ id, label }) => ({ id, label }))));
    setSelected(""); setPlaced({}); setMistakes(0);
  };

  const finish = () => {
    updateUnitProgress("english", "beginner", 3, 70);
    navigate("/english/beginner/unit/3/quiz");
  };

  return (
    <main className="english-family-screen game-mode">
      <header className="english-family-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/3/lesson")}><ArrowLeft size={22} /> Lección</button>
        <div><span>Mini juego</span><strong>El Árbol Familiar</strong></div>
        <div className="family-game-score"><Heart fill="currentColor" /> {Object.keys(placed).length}/6</div>
      </header>

      <section className="family-game-shell">
        <div className="family-game-heading"><Sparkles /><div><h1>Completa el árbol familiar</h1><p>{selected ? `Ahora toca el retrato de: ${selectedLabel}` : "Elige una palabra y después toca el retrato correcto."}</p></div></div>

        <div className="family-word-tray">
          {cards.map((card) => <motion.button key={card.id} disabled={placed[card.id]} className={`${selected === card.id ? "selected" : ""} ${placed[card.id] ? "placed" : ""}`} onClick={() => setSelected(card.id)} whileTap={{ scale: .94 }}>{placed[card.id] ? <CheckCircle2 /> : card.label}</motion.button>)}
        </div>

        <div className="family-tree-board">
          <div className="family-tree-crown" />
          {slots.map((slot) => <motion.button key={slot.id} className={`family-tree-slot slot-${slot.id} ${placed[slot.id] ? "correct" : ""}`} onClick={() => chooseSlot(slot)} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
            <span className="family-tree-emoji">{slot.emoji}</span>
            <strong>{placed[slot.id] ? slot.label : "?"}</strong>
            <small>{slot.hint}</small>
          </motion.button>)}
          <div className="family-tree-trunk" />
        </div>

        <div className="family-game-footer"><button className="family-secondary" onClick={reset}><RefreshCcw /> Reiniciar</button><span>Intentos fallidos: {mistakes}</span>{completed && <motion.button className="english-family-primary" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={finish}>Ir a evaluación <Heart fill="currentColor" /></motion.button>}</div>
      </section>
    </main>
  );
}
