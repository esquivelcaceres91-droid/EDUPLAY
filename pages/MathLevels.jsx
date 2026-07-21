import { ArrowLeft, ChevronRight, Flame, Gem, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mathLevels } from "../data/mathWorldData";
import { getLevelProgress, getStreak } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import "../styles/math-world.css";

export default function MathLevels() {
  const navigate = useNavigate();
  const demo = useDemoAccount();
  const progress = Object.fromEntries(Object.keys(mathLevels).map((level) => [level, getLevelProgress("math", level)]));
  const beginnerDone = progress.beginner.completedUnits.length;
  const intermediateDone = progress.intermediate.completedUnits.length;
  const unlocked = { beginner:true, intermediate:demo || beginnerDone >= 6, advanced:demo || (beginnerDone >= 6 && intermediateDone >= 6) };
  const xp = Object.values(progress).reduce((sum, item) => sum + item.xp, 0);
  const stars = Object.values(progress).reduce((sum, item) => sum + item.stars, 0);
  return <main className="math-levels-screen">
    <img className="math-logo" src="/assets/logo.png" alt="EduPlay" />
    <button className="math-back" onClick={() => navigate("/home")}><ArrowLeft /> Volver</button>
    <section className="math-level-stats"><div><Flame/> <span>Racha</span><b>{getStreak()} días</b></div><div><Gem/><span>Nivel</span><b>{Math.max(1,Math.floor(xp/500)+1)}</b></div><div><Star fill="currentColor"/><span>XP</span><b>{xp}</b></div></section>
    <header className="math-level-heading"><span>✨ MUNDO DE MATEMÁTICAS</span><h1>¡Elige tu próxima misión!</h1><p>Resuelve retos, descubre patrones y conviértete en una estrella matemática.</p></header>
    <div className="math-level-track"><i style={{width:unlocked.advanced?"100%":unlocked.intermediate?"50%":"0%"}}/>{Object.values(mathLevels).map((level)=><b key={level.id} className={unlocked[level.id]?"active":""}>{level.number}</b>)}</div>
    <section className="math-level-cards">{Object.values(mathLevels).map((level,index)=>{const pct=Math.round(progress[level.id].completedUnits.length/level.units.length*100);return <motion.button key={level.id} className={`math-level-card math-${level.id} ${!unlocked[level.id]?"locked":""}`} onClick={()=>unlocked[level.id]&&navigate(`/math/${level.id}`)} initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} transition={{delay:.15+index*.1}} whileHover={unlocked[level.id]?{y:-10}:undefined}>
      <img src={level.image} alt=""/><div><small>NIVEL {level.number}</small><h2>{level.title}</h2><p>{level.subtitle}</p><div className="math-card-progress"><i style={{width:`${pct}%`}}/></div><footer><span>{pct}% completado</span><strong>{unlocked[level.id]?<>Entrar <ChevronRight/></>:<><Lock/> Bloqueado</>}</strong></footer></div>
    </motion.button>})}</section>
    <div className="math-level-message">⭐ Tienes {stars} estrellas en Matemáticas. ¡Sigue aprendiendo!</div>
  </main>;
}
