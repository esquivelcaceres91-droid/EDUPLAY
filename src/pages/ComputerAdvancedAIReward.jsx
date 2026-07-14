import "../styles/computer-ai-unit.css";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Gem,
  Home,
  Monitor,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { completeUnit } from "../utils/progressManager";

export default function ComputerAdvancedAIReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const saved = useRef(false);

  const score = Number(location.state?.score ?? 0);
  const total = Number(location.state?.total ?? 1);
  const hearts = Number(location.state?.hearts ?? 3);
  const percentage = useMemo(() => total > 0 ? Math.round((score / total) * 100) : 0, [score, total]);
  const stars = useMemo(() => percentage === 100 && hearts === 3 ? 3 : percentage >= 80 ? 2 : 1, [percentage, hearts]);
  const xp = 260 + stars * 45 + hearts * 15;

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    completeUnit("computer", "advanced", 2, stars, xp);
  }, [stars, xp]);

  return (
    <main className="ai-screen">
      <section className="ai-reward-shell">
        <motion.article className="ai-reward-card" initial={{ opacity: 0, y: 30, scale: 0.86 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <motion.div className="ai-reward-trophy" initial={{ rotate: -12, scale: 0.5 }} animate={{ rotate: 0, scale: 1 }}>
            <Trophy size={86} fill="currentColor" />
          </motion.div>
          <div className="ai-reward-badge"><CheckCircle2 size={20} />Unidad de Inteligencia Artificial completada</div>
          <h1>¡Entrenador de IA!</h1>
          <p>Ahora comprendes cómo aprende una inteligencia artificial y desbloqueaste Redes y seguridad.</p>

          <div className="ai-reward-stars">{[1,2,3].map((n)=><Star key={n} size={58} fill="currentColor" className={n <= stars ? "active" : "empty"} />)}</div>

          <div className="ai-reward-summary">
            <div><Sparkles size={26} /><span>Resultado<strong>{score}/{total}</strong></span></div>
            <div><Star size={26} fill="currentColor" /><span>Estrellas<strong>{stars}</strong></span></div>
            <div><Gem size={26} /><span>Experiencia<strong>+{xp} XP</strong></span></div>
          </div>

          <div className="ai-unlocked"><BrainCircuit size={31} /><div><strong>¡Redes y seguridad desbloqueada!</strong><span>Ya puedes continuar con la última unidad del nivel Avanzado.</span></div></div>

          <div className="ai-reward-actions">
            <button className="ai-secondary" onClick={() => navigate("/home")}><Home size={21} />Inicio</button>
            <button className="ai-secondary" onClick={() => navigate("/computer")}><Monitor size={21} />Mundo</button>
            <button className="ai-primary" onClick={() => navigate("/computer/advanced")}>Ver unidades<ArrowRight size={21} /></button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
