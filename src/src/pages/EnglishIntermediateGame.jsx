import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { getIntermediateUnit, shuffle } from "../data/englishIntermediateData";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-intermediate.css";

export default function EnglishIntermediateGame(){
 const navigate=useNavigate(); const {unitId}=useParams(); const unit=getIntermediateUnit(unitId);
 const initial = useMemo(()=> unit.game === "timeline" ? shuffle(unit.gameItems) : shuffle(unit.gameItems),[unit.id]);
 const [items,setItems]=useState(initial); const [step,setStep]=useState(0); const [chosen,setChosen]=useState([]); const [feedback,setFeedback]=useState(null); const [done,setDone]=useState(false);
 const current=items[step];
 const answer=(value)=>{ if(feedback) return; const ok=value===current.answer; setFeedback(ok?"ok":"bad"); if(ok) setTimeout(()=>{ if(step===items.length-1){setDone(true);updateUnitProgress("english","intermediate",unit.id,60);} else setStep(step+1); setFeedback(null);},650); else setTimeout(()=>setFeedback(null),650); };
 const chooseTimeline=(item)=>{ if(done) return; const next=[...chosen,item]; setChosen(next); setItems(items.filter(x=>x.id!==item.id)); if(next.length===unit.gameItems.length){ const ok=next.every((x,i)=>x.id===i+1); if(ok){setDone(true);updateUnitProgress("english","intermediate",unit.id,60);} else {setFeedback("bad"); setTimeout(()=>{setChosen([]);setItems(shuffle(unit.gameItems));setFeedback(null)},900);} } };
 const reset=()=>{setStep(0);setChosen([]);setItems(shuffle(unit.gameItems));setFeedback(null);setDone(false)};
 const normalGame=unit.game!=="timeline";
 return <main className={`ei-stage ei-stage-${unit.theme}`}><button className="ei-stage-back" onClick={()=>navigate(`/english/intermediate/unit/${unit.id}/lesson`)}><ArrowLeft/> Lección</button><button className="ei-worlds-back" onClick={()=>navigate("/english")}><Home/> Volver a mundos</button>
  <section className={`ei-game-shell game-${unit.game}`}><header><small>MINIJUEGO DIFERENTE</small><h1>{unit.gameTitle}</h1><p>{unit.gameHelp}</p></header>
   {!done && normalGame && <div className="ei-game-board"><div className="ei-game-meter"><i style={{width:`${(step/items.length)*100}%`}}/></div><div className="ei-scene-icon">{unit.game==="energy"?"🔋":unit.game==="garden"?"🌻":"🎪"}</div><AnimatePresence mode="wait"><motion.h2 key={step} initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}}>{current.prompt}</motion.h2></AnimatePresence><div className="ei-answer-grid">{shuffle(current.options).map(option=><button key={option} onClick={()=>answer(option)} className={feedback && option===current.answer?"correct":""}>{option}</button>)}</div></div>}
   {!done && unit.game==="timeline" && <div className="ei-timeline-board"><div className="ei-selected-line">{chosen.length?chosen.map((x,i)=><span key={x.id}>{i+1}. {x.emoji} {x.label}</span>):<em>Selecciona la primera actividad del día…</em>}</div><div className="ei-routine-grid">{items.map(item=><button key={item.id} onClick={()=>chooseTimeline(item)}><span>{item.emoji}</span>{item.label}</button>)}</div></div>}
   {feedback==="bad" && <div className="ei-feedback bad"><XCircle/> ¡Casi! Inténtalo otra vez</div>}
   {done && <motion.div className="ei-game-win" initial={{scale:.6}} animate={{scale:1}}><Sparkles/><h2>¡Misión superada!</h2><p>Has completado este juego con éxito.</p><button className="ei-primary" onClick={()=>navigate(`/english/intermediate/unit/${unit.id}/quiz`)}>Ir a la evaluación</button></motion.div>}
   <button className="ei-reset" onClick={reset}><RotateCcw/> Reiniciar juego</button>
  </section>
 </main>
}
