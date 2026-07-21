import { ArrowLeft, CheckCircle2, Flame, Gem, Lock, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMathLevel } from "../data/mathWorldData";
import { getLevelProgress, getStreak } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import "../styles/math-world.css";

export default function MathMap() {
  const { level } = useParams(); const navigate=useNavigate(); const demo=useDemoAccount();
  const levelData=getMathLevel(level); const progress=getLevelProgress("math",levelData.id);
  const beginnerDone=getLevelProgress("math","beginner").completedUnits.length;
  const intermediateDone=getLevelProgress("math","intermediate").completedUnits.length;
  const levelAllowed=demo||levelData.id==="beginner"||(levelData.id==="intermediate"&&beginnerDone>=6)||(levelData.id==="advanced"&&beginnerDone>=6&&intermediateDone>=6);
  useEffect(()=>{if(!levelAllowed)navigate("/math",{replace:true})},[levelAllowed,navigate]);
  if(!levelAllowed)return null;
  return <main className={`math-map-screen math-map-${levelData.id}`}>
    <header className="math-map-topbar"><button onClick={()=>navigate("/math")}><ArrowLeft/> Volver</button><div><span>Mundo de Matemáticas</span><strong>{levelData.title}</strong></div><section><span><Flame/>{getStreak()} días</span><span><Gem/>{progress.xp} XP</span><span><Star fill="currentColor"/>{progress.stars}</span></section></header>
    <div className="math-map-intro"><small>MAPA DE AVENTURAS</small><h1>{levelData.subtitle}</h1><p>Completa cada misión para desbloquear la siguiente.</p></div>
    <section className="math-map-viewport"><div className="math-map-world"><div className="math-route-line"/>{levelData.units.map((unit,index)=>{const available=demo||progress.unlockedUnits.includes(unit.id);const done=progress.completedUnits.includes(unit.id);const pct=Number(progress.progress[unit.id]||0);return <motion.button key={unit.id} className={`math-map-unit math-unit-${index+1} ${available?"":"locked"} ${done?"completed":""}`} onClick={()=>available&&navigate(`/math/${levelData.id}/unit/${unit.id}`)} initial={{scale:.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{delay:index*.08}} whileHover={available?{y:-9,scale:1.03}:undefined}>
       <div className="math-unit-number">{String(unit.id).padStart(2,"0")}</div><div className="math-unit-art" style={{background:`linear-gradient(145deg,${unit.color},#13245d)`}}><img src={unit.image} alt=""/>{done&&<CheckCircle2/>}</div><div className="math-unit-info"><span>UNIDAD {unit.id}</span><h2>{unit.title}</h2><p>{unit.subtitle}</p><div><i style={{width:`${pct}%`}}/></div><strong>{!available?<><Lock/> Bloqueado</>:done?<><CheckCircle2/> Repetir aventura</>:<><Play fill="currentColor"/> {pct?`${pct}% completado`:"Comenzar"}</>}</strong></div>{!available&&<div className="math-unit-lock"><Lock/></div>}
      </motion.button>})}</div></section>
  </main>;
}
