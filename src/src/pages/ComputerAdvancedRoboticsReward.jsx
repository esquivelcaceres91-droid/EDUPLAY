import "../styles/computer-advanced-unit.css";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Gem,
  Home,
  Monitor,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { completeUnit } from "../utils/progressManager";

export default function ComputerAdvancedReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitId } = useParams();

  const savedRef = useRef(false);

  const currentUnit = Number(unitId || 1);

  const score = Number(location.state?.score ?? 0);
  const total = Number(location.state?.total ?? 1);
  const hearts = Number(location.state?.hearts ?? 3);

  const percentage = useMemo(() => {
    if (total <= 0) return 0;
    return Math.round((score / total) * 100);
  }, [score, total]);

  const stars = useMemo(() => {
    if (percentage === 100 && hearts === 3) return 3;
    if (percentage >= 80) return 2;
    return 1;
  }, [percentage, hearts]);

  const xp = useMemo(() => {
    return 220 + stars * 40 + hearts * 15;
  }, [stars, hearts]);

  useEffect(() => {
    if (savedRef.current) return;

    savedRef.current = true;

    completeUnit(
      "computer",
      "advanced",
      currentUnit,
      stars,
      xp
    );
  }, [currentUnit, stars, xp]);

  return (
    <main className="robotics-screen">
      <section className="robotics-reward-shell">
        <motion.article
          className="robotics-reward-card"
          initial={{ opacity: 0, y: 30, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <motion.div
            className="robotics-reward-trophy"
            initial={{ rotate: -12, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 170,
            }}
          >
            <Trophy size={88} fill="currentColor" />
          </motion.div>

          <div className="robotics-reward-badge">
            <CheckCircle2 size={20} />
            Unidad de Robótica completada
          </div>

          <h1>¡Programador de Robots!</h1>

          <p>
            Completaste la Unidad 1 y desbloqueaste
            Inteligencia Artificial.
          </p>

          <div className="robotics-reward-stars">
            {[1, 2, 3].map((number) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 20, scale: 0.4 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.25 + number * 0.14,
                  type: "spring",
                }}
                className={
                  number <= stars
                    ? "robotics-star-active"
                    : "robotics-star-empty"
                }
              >
                <Star size={58} fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <div className="robotics-reward-summary">
            <div>
              <Sparkles size={26} />
              <span>
                Resultado
                <strong>
                  {score}/{total}
                </strong>
              </span>
            </div>

            <div>
              <Star size={26} fill="currentColor" />
              <span>
                Estrellas
                <strong>{stars}</strong>
              </span>
            </div>

            <div>
              <Gem size={26} />
              <span>
                Experiencia
                <strong>+{xp} XP</strong>
              </span>
            </div>
          </div>

          <div className="robotics-unlocked-box">
            <Bot size={31} />

            <div>
              <strong>
                ¡Inteligencia Artificial desbloqueada!
              </strong>

              <span>
                Ya puedes continuar con la Unidad 2 del nivel
                Avanzado.
              </span>
            </div>
          </div>

          <div className="robotics-reward-actions">
            <button
              type="button"
              className="robotics-secondary"
              onClick={() => navigate("/home")}
            >
              <Home size={21} />
              Inicio
            </button>

            <button
              type="button"
              className="robotics-secondary"
              onClick={() => navigate("/computer")}
            >
              <Monitor size={21} />
              Mundo
            </button>

            <button
              type="button"
              className="robotics-primary"
              onClick={() =>
                navigate("/computer/advanced")
              }
            >
              Ver unidades
              <ArrowRight size={21} />
            </button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
