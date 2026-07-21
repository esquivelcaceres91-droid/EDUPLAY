import "../styles/computer-network-unit.css";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Heart, LockKeyhole, Monitor, Router, ShieldCheck, Wifi, XCircle } from "lucide-react";

const bank=[
 {id:1,q:"¿Qué dispositivo organiza y distribuye la conexión de una red?",icon:Router,options:[{id:"a",label:"Router",correct:true},{id:"b",label:"Teclado",correct:false},{id:"c",label:"Bocina",correct:false}]},
 {id:2,q:"¿Cuál contraseña es más segura?",icon:LockKeyhole,options:[{id:"a",label:"Az7#luna!",correct:true},{id:"b",label:"1234",correct:false},{id:"c",label:"Mi nombre",correct:false}]},
 {id:3,q:"¿Qué debes hacer con un enlace sospechoso?",icon:ShieldCheck,options:[{id:"a",label:"No abrirlo y avisar",correct:true},{id:"b",label:"Abrirlo rápido",correct:false},{id:"c",label:"Compartirlo",correct:false}]},
 {id:4,q:"¿Qué permite conectar dispositivos sin cables?",icon:Wifi,options:[{id:"a",label:"Wi‑Fi",correct:true},{id:"b",label:"Paint",correct:false},{id:"c",label:"Una carpeta",correct:false}]},
 {id:5,q:"¿Debemos compartir contraseñas con desconocidos?",icon:ShieldCheck,options:[{id:"a",label:"No",correct:true},{id:"b",label:"Sí",correct:false}]},
];
const shuffle=items=>[...items].sort(()=>Math.random()-.5);
const create=()=>bank.map(q=>({...q,options:shuffle(q.options)}));

export default function ComputerAdvancedNetworkQuiz(){
 const navigate=useNavigate();const [questions,setQuestions]=useState(create);const [index,setIndex]=useState(0);const [selected,setSelected]=useState(null);const [checked,setChecked]=useState(false);const [score,setScore]=useState(0);const [hearts,setHearts]=useState(3);
 const question=questions[index];const Icon=question.icon;const correct=useMemo(()=>checked&&question.options.find(o=>o.id===selected)?.correct,[checked,question,selected]);const last=index===questions.length-1;
 const check=()=>{if(!selected)return;const ok=question.options.find(o=>o.id===selected)?.correct;setChecked(true);if(ok)setScore(s=>s+1);else setHearts(h=>Math.max(0,h-1));};
 const next=()=>{if(!correct){setQuestions(current=>current.map((q,i)=>i===index?{...q,options:shuffle(q.options)}:q));setSelected(null);setChecked(false);return;}if(!last){setIndex(i=>i+1);setSelected(null);setChecked(false);return;}navigate("/computer/advanced/unit/3/reward",{state:{score:score+1,total:questions.length,hearts}});};
 return <main className="network-screen"><header className="network-topbar"><div className="network-nav"><button onClick={()=>navigate("/computer/advanced/unit/3/game")}><ArrowLeft size={21}/><span>Volver</span></button><button onClick={()=>navigate("/computer")}><Monitor size={20}/><span>Mundo</span></button></div><div className="network-heading"><span>Computación · Avanzado</span><strong>Evaluación final</strong></div><div className="network-hearts">{[1,2,3].map(n=><Heart key={n} size={22} fill={n<=hearts?"currentColor":"none"}/>)}</div></header>
 <section className="network-shell"><motion.article className="network-card" key={question.id} initial={{opacity:0,y:26}} animate={{opacity:1,y:0}}><div className="network-progress-label"><span>Pregunta {index+1} de {questions.length}</span><strong>{Math.round(((index+1)/questions.length)*100)}%</strong></div><div className="network-progress"><motion.div animate={{width:`${((index+1)/questions.length)*100}%`}}/></div><div className="network-question"><div><Icon size={52}/></div><h1>{question.q}</h1></div><div className="network-options">{question.options.map(option=>{const active=selected===option.id;const good=checked&&option.correct;const bad=checked&&active&&!option.correct;return <motion.button key={option.id} className={`${active?"selected":""} ${good?"correct":""} ${bad?"wrong":""}`} onClick={()=>!checked&&setSelected(option.id)} whileHover={checked?{}:{y:-5,scale:1.015}}><strong>{option.label}</strong>{good&&<CheckCircle2 size={23}/>} {bad&&<XCircle size={23}/>}</motion.button>})}</div>{checked&&<div className={`network-feedback ${correct?"good":"bad"}`}>{correct?<CheckCircle2 size={32}/>:<XCircle size={32}/>}<div><strong>{correct?"¡Respuesta correcta!":"Revisa la respuesta"}</strong><span>{correct?"Continúa con la siguiente pregunta.":"Las opciones cambiarán de posición."}</span></div></div>}<div className="network-actions"><div/>{!checked?<button className="network-primary" disabled={!selected} onClick={check}>Comprobar</button>:<button className="network-primary" onClick={next}>{!correct?"Intentar otra vez":last?"Ver diploma":"Siguiente pregunta"}</button>}</div></motion.article></section></main>;
}
