import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Heart, School, XCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/english-school-unit.css";

const bank=[
 {q:"¿Cómo se dice 'mochila' en inglés?",a:"BACKPACK",o:["BACKPACK","BOARD","DESK"]},
 {q:"Choose the word for ✏️",a:"PENCIL",o:["RULER","PENCIL","BOOK"]},
 {q:"What does 'TEACHER' mean?",a:"Maestro/a",o:["Pizarra","Maestro/a","Escritorio"]},
 {q:"Choose the word for 📏",a:"RULER",o:["ERASER","RULER","CRAYONS"]},
 {q:"¿Cómo se dice 'pizarra' en inglés?",a:"BOARD",o:["BOARD","BOOK","BACKPACK"]},
 {q:"What does 'DESK' mean?",a:"Escritorio",o:["Tijeras","Escritorio","Libro"]},
 {q:"Choose the word for ✂️",a:"SCISSORS",o:["SCISSORS","PENCIL","ERASER"]},
 {q:"Complete: This is my ____ 📘",a:"BOOK",o:["BOARD","BOOK","RULER"]},
];
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
export default function EnglishSchoolQuiz(){const navigate=useNavigate(),location=useLocation();const questions=useMemo(()=>shuffle(bank).map(x=>({...x,o:shuffle(x.o)})),[]);const [i,setI]=useState(0),[selected,setSelected]=useState(null),[checked,setChecked]=useState(false),[score,setScore]=useState(0),[hearts,setHearts]=useState(3);const item=questions[i];const verify=()=>{if(!selected)return;setChecked(true);if(selected===item.a)setScore(v=>v+1);else setHearts(v=>Math.max(0,v-1))};const next=()=>{if(i===questions.length-1){navigate("/english/beginner/unit/5/reward",{state:{score:score+(selected===item.a?1:0),total:questions.length,hearts,gameMistakes:location.state?.gameMistakes??0}});return;}setI(v=>v+1);setSelected(null);setChecked(false)};return <main className="school-screen school-quiz-mode"><header className="school-top"><button className="school-back" onClick={()=>navigate("/english/beginner/unit/5/game")}><ArrowLeft/> Juego</button><div><School/><span>School · Evaluación</span></div><div className="school-hearts">{[1,2,3].map(n=><Heart key={n} fill={n<=hearts?'currentColor':'none'}/>)}</div></header><section className="school-quiz-card"><div className="school-progress"><span style={{width:`${((i+1)/questions.length)*100}%`}}/></div><span className="quiz-count">Pregunta {i+1} de {questions.length}</span><h1>{item.q}</h1><div className="school-answer-list">{item.o.map(o=><button key={o} disabled={checked} onClick={()=>setSelected(o)} className={`${selected===o?'selected':''} ${checked&&o===item.a?'correct':''} ${checked&&selected===o&&o!==item.a?'wrong':''}`}><span>{o}</span>{checked&&o===item.a&&<CheckCircle2/>}{checked&&selected===o&&o!==item.a&&<XCircle/>}</button>)}</div>{!checked?<button className="school-primary" disabled={!selected} onClick={verify}>Comprobar</button>:<><div className={`school-feedback ${selected===item.a?'right':'wrong'}`}>{selected===item.a?<><CheckCircle2/> ¡Excelente!</>:<><XCircle/> La respuesta correcta es {item.a}.</>}</div><button className="school-primary" onClick={next}>{i===questions.length-1?'Ver recompensa':'Siguiente'} <ArrowRight/></button></>}</section></main>}
