import "../styles/computer-intermediate-reward.css";

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
  Monitor,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { completeUnit } from "../utils/progressManager";
import CertificateDownload from "../components/CertificateDownload";

const unitTitles = {
  1: "Microsoft Word",
  2: "Microsoft Excel",
  3: "Microsoft PowerPoint",
  4: "Reto final",
};

export default function ComputerIntermediateReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unitId } = useParams();

  const savedRef = useRef(false);

  const currentUnit = Number(unitId || 1);
  const isFinalUnit = currentUnit === 4;

  const unitTitle =
    unitTitles[currentUnit] || `Unidad ${currentUnit}`;

  const score = Number(location.state?.score ?? 0);
  const total = Number(location.state?.total ?? 1);
  const hearts = Number(location.state?.hearts ?? 3);

  const percentage = useMemo(() => {
    if (total <= 0) return 0;
    return Math.round((score / total) * 100);
  }, [score, total]);

  const stars = useMemo(() => {
    if (percentage >= 100 && hearts === 3) return 3;
    if (percentage >= 75) return 2;
    return 1;
  }, [percentage, hearts]);

  const xp = useMemo(() => {
    return 150 + stars * 35 + hearts * 15;
  }, [stars, hearts]);

  useEffect(() => {
    if (savedRef.current) return;

    savedRef.current = true;

    completeUnit(
      "computer",
      "intermediate",
      currentUnit,
      stars,
      xp
    );

    if (isFinalUnit) {
      localStorage.setItem(
        "eduplay-computer-advanced-unlocked",
        "true"
      );
    }
  }, [currentUnit, stars, xp, isFinalUnit]);

  return (
    <main className="intermediate-reward-screen">
      <section className="intermediate-reward-shell">
        <motion.article
          className="intermediate-reward-card"
          initial={{
            opacity: 0,
            scale: 0.86,
            y: 34,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.62,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="intermediate-reward-glow"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.45, 0.85, 0.45],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="intermediate-reward-trophy"
            initial={{
              rotate: -10,
              scale: 0.5,
            }}
            animate={{
              rotate: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.18,
              duration: 0.65,
              type: "spring",
              stiffness: 170,
            }}
          >
            <Trophy size={86} fill="currentColor" />
          </motion.div>

          <div className="intermediate-reward-badge">
            <CheckCircle2 size={20} />
            {isFinalUnit
              ? "Nivel Intermedio completado"
              : "Unidad completada"}
          </div>

          <h1>
            {isFinalUnit
              ? "¡Nivel Avanzado desbloqueado!"
              : "¡Excelente trabajo!"}
          </h1>

          <p>
            {isFinalUnit
              ? "Completaste todas las unidades del nivel Intermedio."
              : `Completaste la Unidad ${currentUnit}: ${unitTitle}.`}
          </p>

          <div className="intermediate-reward-stars">
            {[1, 2, 3].map((starNumber) => (
              <motion.div
                key={starNumber}
                initial={{
                  opacity: 0,
                  y: 22,
                  scale: 0.45,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: 0.32 + starNumber * 0.15,
                  type: "spring",
                  stiffness: 180,
                }}
                className={
                  starNumber <= stars
                    ? "intermediate-reward-star-active"
                    : "intermediate-reward-star-empty"
                }
              >
                <Star size={55} fill="currentColor" />
              </motion.div>
            ))}
          </div>

          <div className="intermediate-reward-summary">
            <div>
              <span className="intermediate-reward-summary-icon">
                <Sparkles size={25} />
              </span>

              <div>
                <small>Resultado</small>
                <strong>
                  {score}/{total}
                </strong>
              </div>
            </div>

            <div>
              <span className="intermediate-reward-summary-icon">
                <Star size={25} fill="currentColor" />
              </span>

              <div>
                <small>Estrellas</small>
                <strong>{stars}</strong>
              </div>
            </div>

            <div>
              <span className="intermediate-reward-summary-icon">
                <Gem size={25} />
              </span>

              <div>
                <small>Experiencia</small>
                <strong>+{xp} XP</strong>
              </div>
            </div>
          </div>

          <div className="intermediate-reward-unlocked">
            <Sparkles size={26} />

            <div>
              <strong>
                {isFinalUnit
                  ? "¡Nuevo nivel disponible!"
                  : "¡Nueva unidad desbloqueada!"}
              </strong>

              <span>
                {isFinalUnit
                  ? "Ya puedes continuar en Computación Avanzado."
                  : `Ya puedes continuar con la Unidad ${currentUnit + 1}: ${
                      unitTitles[currentUnit + 1]
                    }.`}
              </span>
            </div>
          </div>

          {isFinalUnit && (
            <CertificateDownload
              level="intermediate"
              label="Descargar Diploma Intermedio"
            />
          )}

          <div className="intermediate-reward-actions intermediate-reward-actions-three">
            <motion.button
              type="button"
              className="intermediate-reward-home"
              onClick={() => navigate("/home")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Home size={21} />
              Inicio
            </motion.button>

            <motion.button
              type="button"
              className="intermediate-reward-home"
              onClick={() => navigate("/computer")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Monitor size={21} />
              Mundo
            </motion.button>

            <motion.button
              type="button"
              className="intermediate-reward-continue"
              onClick={() =>
                navigate(
                  isFinalUnit
                    ? "/computer"
                    : "/computer/intermediate"
                )
              }
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {isFinalUnit
                ? "Mundo de Computación"
                : "Ver unidades"}

              <ArrowRight size={22} />
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
