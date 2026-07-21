import { ArrowLeft, CheckCircle2, Flame, Gem, Lock, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLanguageLevel } from "../data/languageWorldData";
import { getLevelProgress, getStreak } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import "../styles/language-world.css";

export default function LanguageMap(){
  const {level="beginner"}=useParams(),navigate=useNavigate(),demo=useDemoAccount(),data=getLanguageLevel(level),progress=getLevelProgress("language",level);
  const beginnerDone=getLevelProgress("language","beginner").completedUnits.length,intermediateDone=getLevelProgress("language","intermediate").completedUnits.length;
  const beginnerTotal=getLanguageLevel("beginner").units.length,intermediateTotal=getLanguageLevel("intermediate").units.length;
  const levelAllowed=demo||level==="beginner"||(level==="intermediate"&&beginnerDone>=beginnerTotal)||(level==="advanced"&&beginnerDone>=beginnerTotal&&intermediateDone>=intermediateTotal);
  useEffect(()=>{if(!levelAllowed)navigate("/language",{replace:true})},[levelAllowed,navigate]); if(!levelAllowed)return null;
  return <main className={`language-map-screen language-map-${level}`}>
    <header className="language-map-top"><button onClick={()=>navigate("/language")}><ArrowLeft/> Portales</button><div><span>Biblioteca Viva</span><strong>{data.title}</strong><small>{data.subtitle}</small></div><section><span><Flame/>{getStreak()} días</span><span><Gem/>{progress.xp} XP</span><span><Star fill="currentColor"/>{progress.stars}</span></section></header>
    <div className="language-map-intro"><div className="language-lumi-mini">🕊️</div><div><small>CAPÍTULOS DE LA AVENTURA</small><h1>{level==="beginner"?"El bosque de las letras":level==="intermediate"?"Los salones de la biblioteca":"La ciudad de las historias"}</h1><p>Desliza el gran libro y elige tu siguiente capítulo.</p></div></div>
    <section className="language-scroll"><div className="language-story-path"><div className="language-ink-line"/>{data.units.map((unit,index)=>{const available=demo||progress.unlockedUnits.includes(unit.id),done=progress.completedUnits.includes(unit.id),pct=Number(progress.progress[unit.id]||0);return <motion.button key={unit.id} className={`language-unit language-unit-${index+1} ${available?"":"locked"} ${done?"done":""}`} onClick={()=>available&&navigate(`/language/${level}/unit/${unit.id}`)} initial={{opacity:0,y:index%2?50:-50}} animate={{opacity:1,y:0}} transition={{delay:index*.06}} whileHover={available?{scale:1.04,y:index%2?34:-34}:undefined}>
       <span className="language-page-tab">CAPÍTULO {String(unit.id).padStart(2,"0")}</span><div className="language-unit-art"><img src={unit.image} alt=""/>{done&&<CheckCircle2/>}</div><div className="language-unit-copy"><span>{unit.gameTitle}</span><h2>{unit.title}</h2><p>{unit.subtitle}</p><div><i style={{width:`${pct}%`}}/></div><strong>{!available?<><Lock/> Cerrado</>:<><Play fill="currentColor"/> {done?"Releer":"Comenzar"}</>}</strong></div>
      </motion.button>})}<div className="language-final-chest">📚<span>Gran colección de historias</span></div></div></section>
  </main>;
}
