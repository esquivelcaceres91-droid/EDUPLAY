import "../styles/computer-network-unit.css";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Hash, Heart, KeyRound, LetterText, Monitor, ShieldCheck, Sparkles, UserRound, XCircle } from "lucide-react";

const pieces = [
  { id:"upper", label:"Mayúscula", sample:"A", icon:LetterText, safe:true },
  { id:"lower", label:"Minúscula", sample:"z", icon:LetterText, safe:true },
  { id:"number", label:"Número", sample:"7", icon:Hash, safe:true },
  { id:"symbol", label:"Símbolo", sample:"#", icon:Sparkles, safe:true },
  { id:"name", label:"Tu nombre", sample:"José", icon:UserRound, safe:false },
  { id:"birthday", label:"Cumpleaños", sample:"1991", icon:UserRound, safe:false },
];

export default function ComputerAdvancedNetworkActivity(){
  const navigate = useNavigate();
  const [selected,setSelected]=useState([]);
  const [checked,setChecked]=useState(false);
  const safeCount = selected.filter(id => pieces.find(p=>p.id===id)?.safe).length;
  const badCount = selected.filter(id => !pieces.find(p=>p.id===id)?.safe).length;
  const complete = checked && safeCount===4 && badCount===0;
  const password = useMemo(()=> selected.map(id=>pieces.find(p=>p.id===id)?.sample).join(""),[selected]);
  const toggle=(id)=>{ if(checked)return; setSelected(current=>current.includes(id)?current.filter(x=>x!==id):[...current,id]); };
  const retry=()=>{setSelected([]);setChecked(false);};

  return <main className="network-screen">
    <header className="network-topbar">
      <div className="network-nav"><button onClick={()=>navigate("/computer/advanced/unit/3/lesson")}><ArrowLeft size={21}/><span>Volver</span></button><button onClick={()=>navigate("/computer")}><Monitor size={20}/><span>Mundo</span></button></div>
      <div className="network-heading"><span>Computación · Avanzado</span><strong>Laboratorio de contraseñas</strong></div>
      <div className="network-hearts"><Heart size={22} fill="currentColor"/><Heart size={22} fill="currentColor"/><Heart size={22} fill="currentColor"/></div>
    </header>

    <section className="network-shell"><motion.article className="network-card" initial={{opacity:0,y:26}} animate={{opacity:1,y:0}}>
      <div className="network-panel-title"><div><span>Actividad de seguridad</span><h1>Construye una contraseña fuerte</h1><p>Selecciona los cuatro elementos seguros. No uses datos personales.</p></div><div className="network-counter"><strong>{safeCount}/4</strong><span>Elementos seguros</span></div></div>

      <div className="password-preview"><KeyRound size={31}/><div><span>Vista previa</span><strong>{password || "Selecciona elementos"}</strong></div><div className={`password-strength ${safeCount===4&&badCount===0?"strong":""}`}>{safeCount===4&&badCount===0?"Fuerte":"En construcción"}</div></div>

      <div className="password-grid">{pieces.map(piece=>{const Icon=piece.icon;const active=selected.includes(piece.id);const correct=checked&&active&&piece.safe;const wrong=checked&&active&&!piece.safe;return <motion.button key={piece.id} className={`password-piece ${active?"selected":""} ${correct?"correct":""} ${wrong?"wrong":""}`} onClick={()=>toggle(piece.id)} whileHover={checked?{}:{y:-5,scale:1.02}}><Icon size={31}/><strong>{piece.label}</strong><span>{piece.safe?"Puede fortalecerla":"Dato personal inseguro"}</span>{correct&&<CheckCircle2 size={22}/>} {wrong&&<XCircle size={22}/>}</motion.button>})}</div>

      {checked&&<div className={`network-feedback ${complete?"good":"bad"}`}>{complete?<CheckCircle2 size={33}/>:<XCircle size={33}/>}<div><strong>{complete?"¡Contraseña segura!":"Revisa tus elecciones"}</strong><span>{complete?"Combinaste letras, números y símbolos sin usar información personal.":"Debes elegir mayúscula, minúscula, número y símbolo."}</span></div></div>}

      <div className="network-actions"><button className="network-secondary" onClick={retry}>Reiniciar</button>{!checked?<button className="network-primary" disabled={selected.length!==4} onClick={()=>setChecked(true)}>Comprobar seguridad</button>:complete?<button className="network-primary" onClick={()=>navigate("/computer/advanced/unit/3/game")}>Activar firewall</button>:<button className="network-primary" onClick={retry}>Intentar otra vez</button>}</div>
    </motion.article></section>
  </main>;
}
