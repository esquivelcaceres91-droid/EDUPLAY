import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { getIntermediateUnit } from "../data/englishIntermediateData";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-intermediate.css";

export default function EnglishIntermediateLesson(){
 const navigate=useNavigate(); const {unitId}=useParams(); const unit=getIntermediateUnit(unitId); const [index,setIndex]=useState(0); const item=unit.words[index];
 const speak=()=>{ if("speechSynthesis" in window){ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(item.example); u.lang="en-US"; u.rate=.8; speechSynthesis.speak(u);} };
 const next=()=>{ if(index<unit.words.length-1) setIndex(index+1); else {updateUnitProgress("english","intermediate",unit.id,25); navigate(`/english/intermediate/unit/${unit.id}/game`);} };
 return <main className={`ei-stage ei-stage-${unit.theme}`}>
  <button className="ei-stage-back" onClick={()=>navigate(`/english/intermediate/unit/${unit.id}`)}><ArrowLeft/> Volver</button><button className="ei-worlds-back" onClick={()=>navigate("/english")}><Home/> Volver a mundos</button>
  <section className="ei-lesson-shell"><header><small>LECCIÓN · {index+1} DE {unit.words.length}</small><h1>{unit.title}</h1><div className="ei-dots">{unit.words.map((_,i)=><i key={i} className={i<=index?"active":""}/>)}</div></header>
   <AnimatePresence mode="wait"><motion.article key={index} className="ei-word-card" initial={{x:80,opacity:0}} animate={{x:0,opacity:1}} exit={{x:-80,opacity:0}}>
    <div className="ei-word-emoji">{item.emoji}</div><h2>{item.title}</h2><h3>{item.translation}</h3><button className="ei-speak" onClick={speak}><Volume2/> {item.example}</button>
   </motion.article></AnimatePresence>
   <footer><button disabled={index===0} onClick={()=>setIndex(index-1)}><ChevronLeft/> Anterior</button><button className="ei-primary" onClick={next}>{index===unit.words.length-1?"Ir al juego":"Siguiente"}<ChevronRight/></button></footer>
  </section>
 </main>
}
