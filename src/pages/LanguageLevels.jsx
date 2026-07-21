import { ArrowLeft, ChevronRight, Flame, Gem, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { languageLevels } from "../data/languageWorldData";
import { getLevelProgress, getStreak } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import "../styles/language-world.css";

export default function LanguageLevels() {
  const navigate=useNavigate(),demo=useDemoAccount();
  const progress=Object.fromEntries(Object.keys(languageLevels).map((level)=>[level,getLevelProgress("language",level)]));
  const beginnerTotal=languageLevels.beginner.units.length,intermediateTotal=languageLevels.intermediate.units.length;
  const beginnerDone=progress.beginner.completedUnits.length,intermediateDone=progress.intermediate.completedUnits.length;
  const unlocked={beginner:true,intermediate:demo||beginnerDone>=beginnerTotal,advanced:demo||(beginnerDone>=beginnerTotal&&intermediateDone>=intermediateTotal)};
  const xp=Object.values(progress).reduce((sum,item)=>sum+item.xp,0),stars=Object.values(progress).reduce((sum,item)=>sum+item.stars,0);
  return <main className="language-levels-screen">
    <div className="language-fireflies" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div>
    <button className="language-back" onClick={()=>navigate("/home")}><ArrowLeft/> Volver</button>
    <section className="language-stats"><span><Flame/> {getStreak()} días</span><span><Gem/> Nivel {Math.max(1,Math.floor(xp/600)+1)}</span><span><Star fill="currentColor"/> {stars}</span></section>
    <motion.header className="language-level-heading" initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}}>
      <div className="language-lumi"><span>✦</span>🕊️</div><small>LA BIBLIOTECA VIVA</small><h1>Comunicación y Lenguaje</h1><p>Abre un portal, despierta las palabras y escribe tu propia aventura.</p>
    </motion.header>
    <div className="language-portal-line">{Object.values(languageLevels).map((level)=><b key={level.id} className={unlocked[level.id]?"active":""}>{level.number}</b>)}</div>
    <section className="language-level-portals">{Object.values(languageLevels).map((level,index)=>{const pct=Math.min(100,Math.round(progress[level.id].completedUnits.length/level.units.length*100));return <motion.button key={level.id} className={`language-portal language-${level.id} ${unlocked[level.id]?"":"locked"}`} onClick={()=>unlocked[level.id]&&navigate(`/language/${level.id}`)} initial={{opacity:0,scale:.8,rotateY:25}} animate={{opacity:1,scale:1,rotateY:0}} transition={{delay:.2+index*.15}} whileHover={unlocked[level.id]?{y:-12,scale:1.025}:undefined}>
      <div className="language-book-cover"><img src={level.image} alt=""/><span className="language-book-spine"/><span className="language-portal-number">{level.number}</span></div>
      <div className="language-portal-copy"><small>{level.icon} PORTAL {level.number}</small><h2>{level.title}</h2><p>{level.subtitle}</p><div className="language-progress"><i style={{width:`${pct}%`}}/></div><footer><span>{pct}% explorado</span><strong>{unlocked[level.id]?<>Abrir libro <ChevronRight/></>:<><Lock/> Sellado</>}</strong></footer></div>
    </motion.button>})}</section>
    <div className="language-lumi-message"><b>Lumi dice:</b> Cada palabra que aprendes ilumina una nueva página. ✨</div>
  </main>;
}
