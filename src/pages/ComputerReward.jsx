import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Gem,
  Home,
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

import "../styles/computer-unit.css";

export default function ComputerReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitId } = useParams();

  const savedRef = useRef(false);

  const currentUnit = Number(unitId || 1);

  const score = Number(location.state?.score ?? 5);
  const total = Number(location.state?.total ?? 5);
  const hearts = Number(location.state?.hearts ?? 3);

  const percentage = useMemo(() => {
    if (total <= 0) return 0;

    return Math.round((score / total) * 100);
  }, [score, total]);

  const stars = useMemo(() => {
    if (percentage >= 100 && hearts === 3) return 3;
    if (percentage >= 80) return 2;
    return 1;
  }, [percentage, hearts]);

  const xp = useMemo(() => {
    return 100 + stars * 25 + hearts * 10;
  }, [stars, hearts]);

  useEffect(() => {
    if (savedRef.current) return;

    savedRef.current = true;

    completeUnit(
      "computer",
      "beginner",
      currentUnit,
      stars,
      xp
    );
  }, [currentUnit, stars, xp]);

  return (
    <main className="computer-unit-screen">
      <section className="computer-reward-shell">
        <motion.article
          className="computer-reward-card"
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="computer-reward-glow"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.55, 0.9, 0.55],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="computer-reward-trophy"
            initial={{
              rotate: -12,
              scale: 0.5,
            }}
            animate={{
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.65,
              type: "spring",
              stiffness: 160,
            }}
          >
            <Trophy size={92} fill="currentColor" />
          </motion.div>

          <div className="computer-reward-badge">
            <CheckCircle2 size={21} />
            Unidad completada
          </div>

          <h1>¡Excelente trabajo!</h1>

          <p>
            Completaste la Unidad {currentUnit}: La computadora.
          </p>

          <div className="computer-reward-stars">
            {[1, 2, 3].map((starNumber) => (
              <motion.div
                key={starNumber}
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 0.35 + starNumber * 0.16,
                  type: "spring",
                  stiffness: 180,
                }}
                className={
                  starNumber <= stars
                    ? "computer-reward-star-active"
                    : "computer-reward-star-empty"
                }
              >
                <Star size={58} fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <div className="computer-reward-summary">
            <div>
              <span className="computer-reward-summary-icon">
                <Sparkles size={27} />
              </span>

              <div>
                <small>Resultado</small>
                <strong>
                  {score}/{total}
                </strong>
              </div>
            </div>

            <div>
              <span className="computer-reward-summary-icon">
                <Star size={27} fill="currentColor" />
              </span>

              <div>
                <small>Estrellas</small>
                <strong>{stars}</strong>
              </div>
            </div>

            <div>
              <span className="computer-reward-summary-icon">
                <Gem size={27} />
              </span>

              <div>
                <small>Experiencia</small>
                <strong>+{xp} XP</strong>
              </div>
            </div>
          </div>

          <div className="computer-reward-unlocked">
            <Sparkles size={27} />

            <div>
              <strong>¡Nueva unidad desbloqueada!</strong>
              <span>
                Ya puedes continuar con la Unidad{" "}
                {currentUnit + 1}.
              </span>
            </div>
          </div>

          <div className="computer-reward-actions">
            <motion.button
              type="button"
              className="computer-reward-home-button"
              onClick={() => navigate("/home")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Home size={22} />
              Inicio
            </motion.button>

            <motion.button
              type="button"
              className="computer-reward-continue-button"
              onClick={() => navigate("/computer/beginner")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Volver al mapa
              <ArrowRight size={23} />
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}