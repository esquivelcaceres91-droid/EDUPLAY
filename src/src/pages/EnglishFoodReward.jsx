import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gem, Heart, Home, Sparkles, Star, Trophy, UtensilsCrossed } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeUnit } from "../utils/progressManager";
import "../styles/english-food-unit.css";

export default function EnglishFoodReward(){
  const navigate=useNavigate(),location=useLocation(),saved=useRef(false);
  const score=Number(location.state?.score??0),total=Number(location.state?.total??8),hearts=Math.max(0,Number(location.state?.hearts??3));
  const percentage=Math.round(score/total*100);
  const stars=useMemo(()=>percentage>=100&&hearts===3?3:percentage>=75?2:1,[percentage,hearts]);
  const xp=150+stars*25+hearts*10;
  useEffect(()=>{if(saved.current)return;saved.current=true;completeUnit("english","beginner",6,stars,xp)},[stars,xp]);
  return <main className="food-screen food-reward-mode"><motion.section className="food-reward-card" initial={{opacity:0,scale:.82,y:40}} animate={{opacity:1,scale:1,y:0}}>
    <div className="food-trophy"><Trophy size={86} fill="currentColor"/></div><span className="reward-badge"><CheckCircle2/> Unidad completada</span><h1>¡Food completado!</h1><p>Ya puedes reconocer comidas, bebidas y postres en inglés. ¡El chef está orgulloso de ti!</p>
    <div className="reward-stars">{[1,2,3].map(n=><motion.span key={n} initial={{scale:0}} animate={{scale:1}} transition={{delay:.2+n*.15}} className={n<=stars?"active":""}><Star size={58} fill="currentColor"/></motion.span>)}</div>
    <div className="reward-summary"><div><Heart fill="currentColor"/><span><small>Corazones</small><strong>{hearts}/3</strong></span></div><div><UtensilsCrossed/><span><small>Estrellas</small><strong>{stars}</strong></span></div><div><Gem/><span><small>Experiencia</small><strong>+{xp} XP</strong></span></div></div>
    <div className="treasure-unlocked"><Sparkles/><span><strong>¡Gran Cofre Final desbloqueado!</strong>La última aventura de Principiante ya está disponible.</span></div>
    <div className="reward-actions"><button className="food-secondary" onClick={()=>navigate("/home")}><Home/> Inicio</button><button className="food-primary" onClick={()=>navigate("/english/beginner")}><ArrowRight/> Continuar al mapa</button></div>
  </motion.section></main>;
}
