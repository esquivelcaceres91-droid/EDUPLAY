import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChefHat, RotateCcw, Sparkles, UtensilsCrossed, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-food-unit.css";

const rounds = [
  { order: "Bring me a red fruit.", answer: "Apple", options: [{name:"Apple",emoji:"🍎"},{name:"Bread",emoji:"🍞"},{name:"Milk",emoji:"🥛"}] },
  { order: "I need a yellow fruit.", answer: "Banana", options: [{name:"Cheese",emoji:"🧀"},{name:"Banana",emoji:"🍌"},{name:"Rice",emoji:"🍚"}] },
  { order: "Put a drink on the tray.", answer: "Juice", options: [{name:"Chicken",emoji:"🍗"},{name:"Cake",emoji:"🍰"},{name:"Juice",emoji:"🧃"}] },
  { order: "Choose the food made with milk.", answer: "Cheese", options: [{name:"Cheese",emoji:"🧀"},{name:"Apple",emoji:"🍎"},{name:"Bread",emoji:"🍞"}] },
  { order: "Find the sweet dessert.", answer: "Cake", options: [{name:"Rice",emoji:"🍚"},{name:"Cake",emoji:"🍰"},{name:"Chicken",emoji:"🍗"}] },
  { order: "Choose the cold dessert.", answer: "Ice cream", options: [{name:"Milk",emoji:"🥛"},{name:"Banana",emoji:"🍌"},{name:"Ice cream",emoji:"🍦"}] },
  { order: "Put the main food on the plate.", answer: "Chicken", options: [{name:"Chicken",emoji:"🍗"},{name:"Juice",emoji:"🧃"},{name:"Cake",emoji:"🍰"}] },
  { order: "Find the food we eat with lunch.", answer: "Rice", options: [{name:"Ice cream",emoji:"🍦"},{name:"Rice",emoji:"🍚"},{name:"Apple",emoji:"🍎"}] },
];

const shuffle = (items) => [...items].sort(() => Math.random() - .5);

export default function EnglishFoodGame() {
  const navigate = useNavigate();
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState("");
  const [locked, setLocked] = useState(false);
  const [tray, setTray] = useState([]);
  const current = rounds[round];
  const options = useMemo(() => shuffle(current.options), [round]);
  const correct = selected === current.answer;
  const choose = (name) => {
    if (locked) return;
    setSelected(name);
    if (name === current.answer) {
      setLocked(true);
      setTray((items) => [...items, current.options.find((item) => item.name === name)]);
    }
  };
  const next = () => {
    if (round === rounds.length - 1) {
      updateUnitProgress("english", "beginner", 6, 70);
      navigate("/english/beginner/unit/6/quiz");
      return;
    }
    setRound((value) => value + 1);
    setSelected("");
    setLocked(false);
  };
  const reset = () => { setRound(0); setSelected(""); setLocked(false); setTray([]); };
  return (
    <main className="food-screen">
      <header className="food-top">
        <button onClick={() => navigate("/english/beginner/unit/6/lesson")}><ArrowLeft/><span>Lección</span></button>
        <div><UtensilsCrossed/><span>El menú del chef</span></div>
        <strong>{round + 1}/{rounds.length}</strong>
      </header>
      <section className="food-game-layout">
        <aside className="food-tray-panel">
          <span className="big-tray">🍽️</span>
          <h2>Chef’s tray</h2>
          <p>Completa los 8 pedidos.</p>
          <div className="tray-items">
            {tray.length ? tray.map((item, index) => <motion.span key={`${item.name}-${index}`} initial={{scale:0}} animate={{scale:1}} title={item.name}>{item.emoji}</motion.span>) : <small>La bandeja está vacía</small>}
          </div>
          <button className="food-reset" onClick={reset}><RotateCcw/> Reiniciar</button>
        </aside>
        <motion.article className="food-challenge-card" key={round} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}}>
          <span className="chef-bubble"><ChefHat/> The chef says:</span>
          <h1>“{current.order}”</h1>
          <p className="game-hint">Toca el alimento correcto para agregarlo a la bandeja.</p>
          <div className="food-option-grid">
            {options.map((item) => {
              const state = selected === item.name ? (item.name === current.answer ? "is-correct" : "is-wrong") : "";
              return <motion.button key={item.name} className={state} onClick={() => choose(item.name)} whileHover={!locked ? {y:-6,scale:1.03}: {}} whileTap={!locked ? {scale:.96}:{}}>
                <span>{item.emoji}</span><strong>{item.name}</strong>
                {state === "is-correct" && <CheckCircle2/>}{state === "is-wrong" && <XCircle/>}
              </motion.button>;
            })}
          </div>
          {selected && !correct && <div className="food-feedback wrong"><XCircle/> Casi. Observa la pista e intenta otra vez.</div>}
          {locked && <div className="food-feedback right"><Sparkles/> ¡Excelente! {current.answer} está en la bandeja.</div>}
          {locked && <button className="food-primary food-next" onClick={next}>{round === rounds.length - 1 ? "Ir a la evaluación" : "Siguiente pedido"}</button>}
        </motion.article>
      </section>
    </main>
  );
}
