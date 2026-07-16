import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gem, Home, Sparkles, Star, Trophy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeUnit } from "../utils/progressManager";
import "../styles/english-numbers-unit.css";

export default function EnglishNumbersReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const saved = useRef(false);
  const score = Number(location.state?.score ?? 0);
  const total = Number(location.state?.total ?? 8);
  const hearts = Math.max(0, Number(location.state?.hearts ?? 3));
  const percentage = Math.round((score / total) * 100);
  const stars = useMemo(() => percentage >= 100 && hearts === 3 ? 3 : percentage >= 75 ? 2 : 1, [percentage, hearts]);
  const xp = 110 + stars * 25 + hearts * 10;

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    completeUnit("english", "beginner", 2, stars, xp);
  }, [stars, xp]);

  return (
    <main className="english-numbers-screen reward-mode">
      <motion.section className="english-number-reward-card" initial={{ opacity: 0, scale: 0.8, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
        <div className="english-number-reward-trophy"><Trophy size={88} fill="currentColor" /></div>
        <span className="english-number-reward-badge"><CheckCircle2 /> Unidad completada</span>
        <h1>¡Numbers conquistado!</h1>
        <p>Ya puedes reconocer, pronunciar y ordenar los números del uno al diez en inglés.</p>
        <div className="english-number-reward-stars">{[1,2,3].map((item) => <motion.span key={item} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + item * 0.15 }} className={item <= stars ? "active" : ""}><Star size={58} fill="currentColor" /></motion.span>)}</div>
        <div className="english-number-reward-summary"><div><Sparkles /><span><small>Resultado</small><strong>{score}/{total}</strong></span></div><div><Star fill="currentColor" /><span><small>Estrellas</small><strong>{stars}</strong></span></div><div><Gem /><span><small>Experiencia</small><strong>+{xp} XP</strong></span></div></div>
        <div className="english-number-unlocked"><Sparkles /><span><strong>¡Family desbloqueado!</strong>La Unidad 3 ya está disponible en el mapa.</span></div>
        <div className="english-number-reward-actions"><button className="english-number-secondary" onClick={() => navigate("/home")}><Home /> Inicio</button><button className="english-numbers-primary" onClick={() => navigate("/english/beginner")}><ArrowRight /> Continuar al mapa</button></div>
      </motion.section>
    </main>
  );
}
