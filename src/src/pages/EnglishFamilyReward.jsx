import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gem, Heart, Home, Sparkles, Star, Trophy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeUnit } from "../utils/progressManager";
import "../styles/english-family-unit.css";

export default function EnglishFamilyReward() {
  const navigate = useNavigate(); const location = useLocation(); const saved = useRef(false);
  const score = Number(location.state?.score ?? 0); const total = Number(location.state?.total ?? 8); const hearts = Math.max(0, Number(location.state?.hearts ?? 3));
  const percentage = Math.round((score / total) * 100); const stars = useMemo(() => percentage >= 100 && hearts === 3 ? 3 : percentage >= 75 ? 2 : 1, [percentage, hearts]); const xp = 120 + stars * 25 + hearts * 10;
  useEffect(() => { if (saved.current) return; saved.current = true; completeUnit("english", "beginner", 3, stars, xp); }, [stars, xp]);

  return (
    <main className="english-family-screen reward-mode"><motion.section className="family-reward-card" initial={{ opacity: 0, scale: .82, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
      <div className="family-reward-trophy"><Trophy size={86} fill="currentColor" /></div><span className="family-reward-badge"><CheckCircle2 /> Unidad completada</span><h1>¡Family completado!</h1><p>Ya puedes reconocer y nombrar a los integrantes de una familia en inglés.</p>
      <div className="family-reward-stars">{[1,2,3].map((item) => <motion.span key={item} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .2 + item * .15 }} className={item <= stars ? "active" : ""}><Star size={58} fill="currentColor" /></motion.span>)}</div>
      <div className="family-reward-summary"><div><Heart fill="currentColor" /><span><small>Corazones</small><strong>{hearts}/3</strong></span></div><div><Star fill="currentColor" /><span><small>Estrellas</small><strong>{stars}</strong></span></div><div><Gem /><span><small>Experiencia</small><strong>+{xp} XP</strong></span></div></div>
      <div className="family-unlocked"><Sparkles /><span><strong>¡Animals desbloqueado!</strong>La Unidad 4 ya está disponible en el mapa.</span></div>
      <div className="family-reward-actions"><button className="family-secondary" onClick={() => navigate("/home")}><Home /> Inicio</button><button className="english-family-primary" onClick={() => navigate("/english/beginner")}><ArrowRight /> Continuar al mapa</button></div>
    </motion.section></main>
  );
}
