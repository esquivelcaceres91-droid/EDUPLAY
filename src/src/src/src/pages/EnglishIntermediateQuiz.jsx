import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, Heart } from "lucide-react";
import { getIntermediateUnit, shuffle } from "../data/englishIntermediateData";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-intermediate.css";

export default function EnglishIntermediateQuiz(){
 const navigate=useNavigate(); const {unitId}=useParams(); const unit=getIntermediateUnit(unitId); const questions=useMemo(()=>shuffle(unit.quiz).map(q=>({...q,options:shuffle(q.options)})),[unit.id]);
 const [index,setIndex]=useState(0),[score,setScore]=useState(0),[hearts,setHearts]=useState(3),[picked,setPicked]=useState(null); const q=questions[index];
 const select=(option)=>{if(picked)return;setPicked(option);const ok=option===q.a; const newScore=score+(ok?1:0); const newHearts=Math.max(0,hearts-(ok?0:1)); if(ok)setScore(newScore);else setHearts(newHearts); setTimeout(()=>{if(index===questions.length-1||newHearts===0){updateUnitProgress("english","intermediate",unit.id,85);navigate(`/english/intermediate/unit/${unit.id}/reward`,{state:{score:newScore,total:questions.length,hearts:newHearts}})}else{setIndex(index+1);setPicked(null)}},850)};
 return <main className={`ei-stage ei-stage-${unit.theme}`}><button className="ei-stage-back" onClick={()=>navigate(`/english/intermediate/unit/${unit.id}/game`)}><ArrowLeft/> Juego</button><button className="ei-worlds-back" onClick={()=>navigate("/english")}><Home/> Volver a mundos</button><section className="ei-quiz-shell"><header><span>Pregunta {index+1} / {questions.length}</span><div>{[0,1,2].map(i=><Heart key={i} fill={i<hearts?"currentColor":"none"}/>)}</div></header><div className="ei-quiz-progress"><i style={{width:`${((index+1)/questions.length)*100}%`}}/></div><motion.h1 key={index} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>{q.q}</motion.h1><div className="ei-quiz-options">{q.options.map(option=><button key={option} className={picked?(option===q.a?"correct":option===picked?"wrong":""):""} onClick={()=>select(option)}>{option}</button>)}</div></section></main>
}
