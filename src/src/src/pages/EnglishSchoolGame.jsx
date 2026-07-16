import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Backpack, CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-school-unit.css";

const rounds = [
 { clue: "Pack the item you use to write.", answer: "PENCIL", options: [{n:"PENCIL",e:"✏️"},{n:"BOOK",e:"📘"},{n:"RULER",e:"📏"}] },
 { clue: "Pack the item you use to measure.", answer: "RULER", options: [{n:"SCISSORS",e:"✂️"},{n:"RULER",e:"📏"},{n:"ERASER",e:"🧽"}] },
 { clue: "Pack the item that removes pencil marks.", answer: "ERASER", options: [{n:"CRAYONS",e:"🖍️"},{n:"BOOK",e:"📘"},{n:"ERASER",e:"🧽"}] },
 { clue: "Pack the item you use to read.", answer: "BOOK", options: [{n:"BOOK",e:"📘"},{n:"PENCIL",e:"✏️"},{n:"SCISSORS",e:"✂️"}] },
 { clue: "Pack the item used for cutting paper.", answer: "SCISSORS", options: [{n:"RULER",e:"📏"},{n:"SCISSORS",e:"✂️"},{n:"CRAYONS",e:"🖍️"}] },
 { clue: "Pack the colorful items used for drawing.", answer: "CRAYONS", options: [{n:"ERASER",e:"🧽"},{n:"CRAYONS",e:"🖍️"},{n:"PENCIL",e:"✏️"}] },
];

export default function EnglishSchoolGame(){
 const navigate=useNavigate(); const [round,setRound]=useState(0); const [picked,setPicked]=useState(null); const [correct,setCorrect]=useState(false); const [mistakes,setMistakes]=useState(0); const [bag,setBag]=useState([]);
 const data=rounds[round]; const options=useMemo(()=>[...data.options].sort(()=>Math.random()-.5),[round]);
 const choose=(name)=>{ if(correct)return; setPicked(name); if(name===data.answer){setCorrect(true);setBag(v=>[...v,name])}else setMistakes(v=>v+1)};
 const next=()=>{if(round===rounds.length-1){navigate("/english/beginner/unit/5/quiz",{state:{gameMistakes:mistakes}});return;} setRound(v=>v+1);setPicked(null);setCorrect(false)};
 const restart=()=>{setRound(0);setPicked(null);setCorrect(false);setMistakes(0);setBag([])};
 return <main className="school-screen school-game-mode"><header className="school-top"><button className="school-back" onClick={()=>navigate("/english/beginner/unit/5/lesson")}><ArrowLeft/> Lección</button><div><Backpack/><span>Prepara la mochila</span></div><strong>{round+1}/{rounds.length}</strong></header>
 <section className="school-game-layout"><aside className="school-bag-panel"><div className="big-backpack">🎒</div><h2>My Backpack</h2><div className="packed-items">{bag.length?bag.map((x,i)=><motion.span key={`${x}-${i}`} initial={{scale:0}} animate={{scale:1}}>{x}</motion.span>):<p>Aún está vacía</p>}</div><button className="school-reset" onClick={restart}><RotateCcw/> Reiniciar</button></aside>
 <article className="school-challenge-card"><span className="school-kicker"><Sparkles/> Teacher says...</span><h1>{data.clue}</h1><p>Selecciona el objeto correcto para guardarlo en la mochila.</p><div className="school-object-grid">{options.map(o=><motion.button key={o.n} onClick={()=>choose(o.n)} disabled={correct} className={`${picked===o.n?(o.n===data.answer?'is-correct':'is-wrong'):''}`} whileHover={!correct?{y:-7}: {}} whileTap={!correct?{scale:.96}:{}}><span>{o.e}</span><strong>{o.n}</strong>{picked===o.n&&(o.n===data.answer?<CheckCircle2/>:<XCircle/>)}</motion.button>)}</div>
 <AnimatePresence>{picked&&!correct&&<motion.div className="school-feedback wrong" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><XCircle/> Casi. Mira la pista e inténtalo otra vez.</motion.div>}{correct&&<motion.div className="school-feedback right" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}><CheckCircle2/> ¡Perfecto! {data.answer} está en la mochila.</motion.div>}</AnimatePresence>
 {correct&&<button className="school-primary school-next" onClick={next}>{round===rounds.length-1?'Ir a la evaluación':'Siguiente objeto'} <ArrowRight/></button>}</article></section></main>
}
