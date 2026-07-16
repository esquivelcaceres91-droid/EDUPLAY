import "../styles/computer-network-unit.css";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileCheck2, Heart, Link2, MailWarning, Monitor, ShieldAlert, ShieldCheck, Skull, Wifi, XCircle } from "lucide-react";

const rounds=[
  [
    {id:"safe1",label:"Tarea escolar",icon:FileCheck2,threat:false},
    {id:"bad1",label:"Enlace extraño",icon:Link2,threat:true},
    {id:"safe2",label:"Actualización oficial",icon:Wifi,threat:false},
    {id:"bad2",label:"Premio falso",icon:MailWarning,threat:true},
  ],
  [
    {id:"bad3",label:"Archivo desconocido",icon:Skull,threat:true},
    {id:"safe3",label:"Mensaje del profesor",icon:FileCheck2,threat:false},
    {id:"bad4",label:"Pide tu contraseña",icon:ShieldAlert,threat:true},
    {id:"safe4",label:"Página segura",icon:ShieldCheck,threat:false},
  ],
  [
    {id:"safe5",label:"Wi‑Fi de casa",icon:Wifi,threat:false},
    {id:"bad5",label:"Descarga pirata",icon:Skull,threat:true},
    {id:"bad6",label:"Correo urgente falso",icon:MailWarning,threat:true},
    {id:"safe6",label:"Documento propio",icon:FileCheck2,threat:false},
  ],
];

export default function ComputerAdvancedNetworkGame(){
  const navigate=useNavigate();
  const [round,setRound]=useState(0);const [blocked,setBlocked]=useState([]);const [mistakes,setMistakes]=useState(0);const [message,setMessage]=useState(null);
  const packets=useMemo(()=>[...rounds[round]].sort(()=>Math.random()-.5),[round]);
  const threats=rounds[round].filter(p=>p.threat).length;
  const roundDone=blocked.length===threats;
  const gameDone=round===rounds.length-1&&roundDone;
  const choose=(packet)=>{
    if(blocked.includes(packet.id)||gameDone)return;
    if(packet.threat){setBlocked(c=>[...c,packet.id]);setMessage({good:true,text:"Amenaza bloqueada"});}
    else{setMistakes(c=>c+1);setMessage({good:false,text:"Ese paquete era seguro"});}
    window.setTimeout(()=>setMessage(null),700);
  };
  const next=()=>{if(!roundDone)return;if(round<rounds.length-1){setRound(r=>r+1);setBlocked([]);setMessage(null);}else navigate("/computer/advanced/unit/3/quiz");};

  return <main className="network-screen">
    <header className="network-topbar"><div className="network-nav"><button onClick={()=>navigate("/computer/advanced/unit/3/activity")}><ArrowLeft size={21}/><span>Volver</span></button><button onClick={()=>navigate("/computer")}><Monitor size={20}/><span>Mundo</span></button></div><div className="network-heading"><span>Computación · Avanzado</span><strong>Firewall Defender</strong></div><div className="network-hearts">{[1,2,3].map(n=><Heart key={n} size={22} fill={n<=Math.max(0,3-mistakes)?"currentColor":"none"}/>)}</div></header>
    <section className="network-shell"><motion.article className="network-card firewall-card" initial={{opacity:0,y:26}} animate={{opacity:1,y:0}}>
      <div className="network-panel-title"><div><span>Minijuego de ciberseguridad</span><h1>Bloquea solamente las amenazas</h1><p>Lee cada paquete y activa el firewall únicamente cuando sea peligroso.</p></div><div className="network-counter"><strong>{round+1}/3</strong><span>Rondas</span></div></div>
      <div className="firewall-status"><ShieldCheck size={36}/><div><strong>Firewall activo</strong><span>Amenazas bloqueadas: {blocked.length}/{threats}</span></div><div className="firewall-score">Errores: {mistakes}</div></div>
      <div className="packet-grid">{packets.map(packet=>{const Icon=packet.icon;const done=blocked.includes(packet.id);return <motion.button key={packet.id} className={`packet-card ${done?"blocked":""}`} onClick={()=>choose(packet)} whileHover={done?{}:{y:-7,scale:1.025}} whileTap={done?{}:{scale:.97}}><div className="packet-scan"/><Icon size={45}/><strong>{done?"BLOQUEADO":packet.label}</strong><span>{done?"Amenaza neutralizada":"Toca para bloquear"}</span>{done&&<CheckCircle2 size={23}/>}</motion.button>})}</div>
      {message&&<motion.div className={`network-feedback ${message.good?"good":"bad"}`} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}>{message.good?<CheckCircle2 size={31}/>:<XCircle size={31}/>}<strong>{message.text}</strong></motion.div>}
      {roundDone&&<div className="network-feedback good"><ShieldCheck size={33}/><div><strong>{gameDone?"¡Red completamente protegida!":"¡Ronda superada!"}</strong><span>{gameDone?"Bloqueaste todas las amenazas de la red.":"El firewall está listo para una nueva ronda."}</span></div></div>}
      <div className="network-actions"><div/><button className="network-primary" disabled={!roundDone} onClick={next}>{gameDone?"Ir a la evaluación final":"Siguiente ronda"}</button></div>
    </motion.article></section>
  </main>;
}
