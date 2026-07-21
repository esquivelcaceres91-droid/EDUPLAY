import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Lock, Play, Star, Trophy } from "lucide-react";
import { advancedUnits } from "../data/englishAdvancedData";
import { getLevelProgress, getStreak } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import "../styles/english-advanced.css";

export default function EnglishAdvanced(){
 const navigate=useNavigate();
 const demoAccount=useDemoAccount();
 const progress=useMemo(()=>getLevelProgress("english","advanced"),[]);
 const streak=useMemo(()=>getStreak(),[]);
 return <main className="ea-map-screen">
  <header className="ea-map-header">
   <button className="ea-back" onClick={()=>navigate("/english")}><ArrowLeft/> Volver a niveles</button>
   <div className="ea-title"><span>ENGLISH WORLD</span><h1>Advanced Champions</h1><p>3 aventuras para convertirte en campeón del inglés</p></div>
   <div className="ea-stats"><b><Flame fill="currentColor"/> {streak} <small>racha</small></b><b><Star fill="currentColor"/> {progress.stars} <small>estrellas</small></b></div>
  </header>
  <section className="ea-grid">{advancedUnits.map((u,i)=>{const unlocked=demoAccount||progress.unlockedUnits.includes(u.id),completed=progress.completedUnits.includes(u.id),pct=completed?100:(progress.progress?.[u.id]||0);return <motion.button key={u.id} className={`ea-card ${!unlocked?"locked":""}`} initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:i*.12}} whileHover={unlocked?{y:-10,scale:1.02}:{}} onClick={()=>unlocked&&navigate(`/english/advanced/unit/${u.id}`)}>
   <img src={u.image} alt={u.title}/><div className="ea-shade"/>{completed&&<span className="ea-complete"><Trophy/> COMPLETADA</span>}{!unlocked&&<div className="ea-lock"><Lock/><strong>BLOQUEADO</strong><span>Completa la aventura anterior</span></div>}<div className="ea-bottom"><div><i style={{width:`${pct}%`}}/></div><span>{pct}%</span><strong>{unlocked?<><Play fill="currentColor"/> {completed?"Jugar otra vez":"Comenzar"}</>:<><Lock/> Bloqueado</>}</strong></div>
  </motion.button>})}</section>
 </main>
}
