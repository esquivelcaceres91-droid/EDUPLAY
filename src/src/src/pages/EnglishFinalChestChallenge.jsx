import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Crown, Heart, KeyRound, RotateCcw, Sparkles, Volume2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-final-chest.css";

const shuffle = (items) => [...items].sort(() => Math.random() - .5);

const wordTrials = [
  { prompt: "¿Cuál significa ROJO?", answer: "RED", choices: ["BLUE", "RED", "GREEN", "YELLOW"], icon: "🎨" },
  { prompt: "¿Cuál significa TRES?", answer: "THREE", choices: ["TEN", "FIVE", "THREE", "ONE"], icon: "🔢" },
  { prompt: "¿Cuál significa MADRE?", answer: "MOTHER", choices: ["SISTER", "FATHER", "MOTHER", "BROTHER"], icon: "👨‍👩‍👧" },
  { prompt: "¿Cuál significa LEÓN?", answer: "LION", choices: ["BIRD", "DOG", "FROG", "LION"], icon: "🦁" },
  { prompt: "¿Cuál significa LÁPIZ?", answer: "PENCIL", choices: ["BOOK", "PENCIL", "RULER", "DESK"], icon: "✏️" },
  { prompt: "¿Cuál significa MANZANA?", answer: "APPLE", choices: ["BREAD", "MILK", "APPLE", "RICE"], icon: "🍎" },
];

const sentenceTrials = [
  { words: ["This", "is", "my", "mother"], translation: "Esta es mi madre." },
  { words: ["The", "lion", "is", "strong"], translation: "El león es fuerte." },
  { words: ["I", "have", "three", "books"], translation: "Tengo tres libros." },
];

const finalTrials = [
  { q: "Choose the yellow food.", answer: "BANANA", choices: ["APPLE", "BANANA", "MILK", "BREAD"] },
  { q: "Complete: The ___ can fly.", answer: "BIRD", choices: ["FROG", "DOG", "BIRD", "LION"] },
  { q: "Choose the school object used for reading.", answer: "BOOK", choices: ["BOOK", "ERASER", "RULER", "CRAYONS"] },
];

export default function EnglishFinalChestChallenge() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState(false);
  const [built, setBuilt] = useState([]);
  const [pool, setPool] = useState(() => shuffle(sentenceTrials[0].words));
  const shuffledWordTrials = useMemo(() => shuffle(wordTrials).map(item => ({...item, choices: shuffle(item.choices)})), []);
  const shuffledFinalTrials = useMemo(() => shuffle(finalTrials).map(item => ({...item, choices: shuffle(item.choices)})), []);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = .78;
    window.speechSynthesis.speak(utterance);
  };

  const loseHeart = () => setHearts(h => Math.max(0, h - 1));

  const advanceChoice = (items, nextStage) => {
    const current = items[index];
    if (selected !== current.answer) { loseHeart(); setChecked(true); return; }
    setScore(s => s + 1); setChecked(true);
    setTimeout(() => {
      if (index + 1 < items.length) { setIndex(i => i + 1); setSelected(""); setChecked(false); }
      else { setStage(nextStage); setIndex(0); setSelected(""); setChecked(false); if (nextStage === 2) { setBuilt([]); setPool(shuffle(sentenceTrials[0].words)); } }
    }, 700);
  };

  const pickWord = (word) => { if (checked) return; setBuilt([...built, word]); setPool(pool.filter((_, i) => i !== pool.indexOf(word))); };
  const resetSentence = () => { setBuilt([]); setPool(shuffle(sentenceTrials[index].words)); setChecked(false); };
  const checkSentence = () => {
    const correct = built.join(" ") === sentenceTrials[index].words.join(" ");
    setChecked(true);
    if (!correct) { loseHeart(); return; }
    setScore(s => s + 2);
    setTimeout(() => {
      if (index + 1 < sentenceTrials.length) { const next = index + 1; setIndex(next); setBuilt([]); setPool(shuffle(sentenceTrials[next].words)); setChecked(false); }
      else { setStage(3); setIndex(0); setSelected(""); setChecked(false); }
    }, 850);
  };

  const retryCurrent = () => { setSelected(""); setChecked(false); if (stage === 2) resetSentence(); };
  const totalSteps = wordTrials.length + sentenceTrials.length + finalTrials.length;
  const completed = stage === 1 ? index : stage === 2 ? wordTrials.length + index : wordTrials.length + sentenceTrials.length + index;
  const progress = Math.round((completed / totalSteps) * 100);

  const choiceView = (items, title, subtitle, onCheck) => {
    const current = items[index];
    const correct = selected === current.answer;
    return <motion.section className="trial-card" key={`${stage}-${index}`} initial={{opacity:0,x:45}} animate={{opacity:1,x:0}}>
      <div className="trial-heading"><div><span>{subtitle}</span><h1>{title}</h1></div><div className="trial-number">{index + 1}/{items.length}</div></div>
      <div className="magic-question"><span className="magic-emoji">{current.icon || "🔐"}</span><h2>{current.prompt || current.q}</h2><button onClick={() => speak(current.answer)}><Volume2/> Escuchar respuesta</button></div>
      <div className="magic-options">{current.choices.map(option => {
        const isSelected = selected === option;
        const good = checked && option === current.answer;
        const bad = checked && isSelected && !good;
        return <motion.button key={option} className={`${isSelected?"selected":""} ${good?"correct":""} ${bad?"wrong":""}`} onClick={() => !checked && setSelected(option)} whileHover={checked?{}:{y:-5,scale:1.02}}><strong>{option}</strong>{good&&<CheckCircle2/>}{bad&&<XCircle/>}</motion.button>;
      })}</div>
      {checked && <div className={`trial-feedback ${correct?"good":"bad"}`}>{correct?<CheckCircle2/>:<XCircle/>}<div><strong>{correct?"¡Gema activada!":"Esa llave no abre el portal"}</strong><span>{correct?"Avanzando a la siguiente prueba.":`La respuesta correcta es ${current.answer}.`}</span></div></div>}
      <div className="trial-actions"><button className="chest-secondary" onClick={() => navigate("/english/beginner")}><ArrowLeft/> Salir</button>{checked&&!correct?<button className="chest-primary" onClick={retryCurrent}><RotateCcw/> Intentar otra vez</button>:<button className="chest-primary" disabled={!selected||checked} onClick={onCheck}><KeyRound/> Comprobar</button>}</div>
    </motion.section>;
  };

  return <main className="chest-screen challenge-mode">
    <header className="challenge-topbar"><button onClick={() => navigate("/english/beginner")}><ArrowLeft/> Mapa</button><div><span>Gran Cofre Final</span><strong>Prueba {stage} de 3</strong></div><div className="challenge-hearts">{[1,2,3].map(n=><Heart key={n} fill="currentColor" className={n<=hearts?"alive":"lost"}/>)}</div></header>
    <div className="challenge-progress"><motion.div animate={{width:`${progress}%`}}/><span>{progress}%</span></div>
    <div className="challenge-stage-icons"><span className={stage>=1?"active":""}>💎</span><i/><span className={stage>=2?"active":""}>🌉</span><i/><span className={stage>=3?"active":""}>👑</span></div>
    <AnimatePresence mode="wait">
      {stage===1 && choiceView(shuffledWordTrials,"Portal de palabras","Prueba 1 · Activa las gemas",()=>advanceChoice(shuffledWordTrials,2))}
      {stage===2 && <motion.section className="trial-card sentence-card" key={`sentence-${index}`} initial={{opacity:0,x:45}} animate={{opacity:1,x:0}}>
        <div className="trial-heading"><div><span>Prueba 2 · Construye el puente</span><h1>Ordena la frase</h1></div><div className="trial-number">{index+1}/{sentenceTrials.length}</div></div>
        <div className="sentence-translation"><Sparkles/><span>Forma en inglés:</span><strong>{sentenceTrials[index].translation}</strong></div>
        <div className="sentence-bridge">{sentenceTrials[index].words.map((_,i)=><span key={i} className={built[i]?"filled":""}>{built[i]||"?"}</span>)}</div>
        <div className="word-pool">{pool.map((word,i)=><motion.button key={`${word}-${i}`} onClick={()=>pickWord(word)} whileHover={{y:-5}}>{word}</motion.button>)}</div>
        {checked && <div className={`trial-feedback ${built.join(" ")===sentenceTrials[index].words.join(" ")?"good":"bad"}`}>{built.join(" ")===sentenceTrials[index].words.join(" ")?<CheckCircle2/>:<XCircle/>}<div><strong>{built.join(" ")===sentenceTrials[index].words.join(" ")?"¡Puente completado!":"El puente necesita otro orden"}</strong><span>{sentenceTrials[index].words.join(" ")}</span></div></div>}
        <div className="trial-actions"><button className="chest-secondary" onClick={resetSentence}><RotateCcw/> Reiniciar</button>{checked&&built.join(" ")!==sentenceTrials[index].words.join(" ")?<button className="chest-primary" onClick={resetSentence}>Intentar otra vez</button>:<button className="chest-primary" disabled={built.length!==sentenceTrials[index].words.length||checked} onClick={checkSentence}><KeyRound/> Comprobar</button>}</div>
      </motion.section>}
      {stage===3 && choiceView(shuffledFinalTrials,"Cámara del cofre","Prueba 3 · Las últimas cerraduras",()=>{
        const current=shuffledFinalTrials[index];
        if(selected!==current.answer){loseHeart();setChecked(true);return;}
        setScore(s=>s+2);setChecked(true);
        setTimeout(()=>{if(index+1<shuffledFinalTrials.length){setIndex(i=>i+1);setSelected("");setChecked(false)}else navigate("/english/beginner/unit/7/reward",{state:{score:score+2,total:15,hearts}})},750);
      })}
    </AnimatePresence>
  </main>;
}
