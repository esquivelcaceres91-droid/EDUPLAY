import "../styles/Levels.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getLevelProgress, getGlobalStats } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";

import {
  ArrowLeft,
  Flame,
  Gem,
  Star,
  ChevronRight,
  Lock,
} from "lucide-react";

const baseLevels = [
  {
    id: "beginner",
    title: "Principiante",
    subtitle: "Contenido de 1.º y 2.º primaria",
    image: "/assets/levels/beginner.png",
    progress: 20,
    unlocked: true,
    className: "level-beginner",
  },
  {
    id: "intermediate",
    title: "Intermedio",
    subtitle: "Contenido de 3.º y 4.º primaria",
    image: "/assets/levels/intermediate.png",
    progress: 0,
    unlocked: false,
    className: "level-intermediate",
  },
  {
    id: "advanced",
    title: "Avanzado",
    subtitle: "Contenido de 5.º y 6.º primaria",
    image: "/assets/levels/advanced.png",
    progress: 0,
    unlocked: false,
    className: "level-advanced",
  },
];

export default function EnglishLevels() {
  const navigate = useNavigate();
  const demoAccount = useDemoAccount();
  const beginnerProgress = useMemo(() => getLevelProgress("english", "beginner"), []);
  const intermediateUnlocked = demoAccount || beginnerProgress.completedUnits.includes(7);
  const intermediateProgress = useMemo(() => getLevelProgress("english", "intermediate"), []);
  const advancedProgress = useMemo(() => getLevelProgress("english", "advanced"), []);
  const globalStats = useMemo(() => getGlobalStats(), []);
  const advancedUnlocked = demoAccount || intermediateProgress.completedUnits.includes(4);
  const intermediatePercent = Math.round((intermediateProgress.completedUnits.filter(id => id >= 1 && id <= 4).length / 4) * 100);
  const beginnerPercent = Math.round((beginnerProgress.completedUnits.filter(id => id >= 1 && id <= 7).length / 7) * 100);
  const advancedPercent = Math.round((advancedProgress.completedUnits.filter(id => id >= 1 && id <= 3).length / 3) * 100);
  const levels = baseLevels.map((level) => {
    if (level.id === "beginner") return { ...level, progress: beginnerPercent, unlocked: true };
    if (level.id === "intermediate") return { ...level, unlocked: intermediateUnlocked, progress: intermediatePercent };
    if (level.id === "advanced") return { ...level, unlocked: advancedUnlocked, progress: advancedPercent };
    return level;
  });

  const openLevel = (level) => {
    if (!level.unlocked) return;

    navigate(`/english/${level.id}`);
  };

  return (
    <main className="levels-screen english-levels-screen">
      <img
        className="levels-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <motion.button
        type="button"
        className="levels-back"
        onClick={() => navigate("/home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowLeft size={26} />
        Volver
      </motion.button>

      <motion.section
        className="levels-stats"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <div className="levels-stat">
          <Flame size={37} className="stat-fire" />

          <div>
            <span>Racha</span>
            <strong>{globalStats.streak} días</strong>
          </div>
        </div>

        <div className="levels-stat">
          <Gem size={35} className="stat-gem" />

          <div>
            <span>Nivel</span>
            <strong>{globalStats.level}</strong>
          </div>
        </div>

        <div className="levels-stat">
          <Star
            size={39}
            className="stat-star"
            fill="currentColor"
          />

          <div>
            <span>Puntos</span>
            <strong>{globalStats.xp.toLocaleString("es-GT")}</strong>
          </div>
        </div>

        <img
          className="levels-avatar"
          src="/assets/avatar-1.png"
          alt="Avatar"
          onError={(event) => {
            event.currentTarget.src = "/assets/mascot.png";
          }}
        />
      </motion.section>

      <motion.section
        className="levels-progress"
        initial={{
          x: "-50%",
          scale: 0.85,
          opacity: 0,
        }}
        animate={{
          x: "-50%",
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          delay: 0.24,
        }}
      >
        <div className="levels-progress-line">
          <div className="levels-progress-fill" />
        </div>

        <div className="levels-progress-step active">
          <span>1</span>
        </div>

        <div className="levels-progress-step middle">
          <span>2</span>
        </div>

        <div className="levels-progress-step last">
          <span>3</span>
        </div>
      </motion.section>

      <section className="levels-cards">
        {levels.map((level, index) => (
          <motion.button
            type="button"
            key={level.id}
            className={`level-card ${level.className}`}
            onClick={() => openLevel(level)}
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.58,
              delay: 0.3 + index * 0.13,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              level.unlocked
                ? {
                    y: -13,
                    scale: 1.035,
                  }
                : {}
            }
            whileTap={
              level.unlocked
                ? {
                    scale: 0.96,
                    y: 2,
                  }
                : {}
            }
            style={{
              cursor: level.unlocked
                ? "pointer"
                : "not-allowed",
            }}
          >
            <span className="level-card-shine" />

            <div className="level-image-area">
              <img
                src={level.image}
                alt={level.title}
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/mascot.png";
                }}
              />
            </div>

            <div className="level-card-footer">
              <h2>{level.title}</h2>

              <p>{level.subtitle}</p>

              <div className="level-card-progress">
                <div
                  style={{
                    width: `${level.progress}%`,
                  }}
                />
              </div>

              <div className="level-card-bottom">
                <span>{level.progress}% completado</span>

                {level.unlocked ? (
                  <span className="level-enter">
                    Entrar
                    <ChevronRight size={21} />
                  </span>
                ) : (
                  <span
                    className="level-enter"
                    style={{
                      background:
                        "linear-gradient(180deg, #66738f, #303b58)",
                      boxShadow:
                        "0 5px 0 #1b2439, 0 9px 16px rgba(0,0,0,.28)",
                    }}
                  >
                    <Lock size={18} />
                    Bloqueado
                  </span>
                )}
              </div>
            </div>

            {!level.unlocked && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(2, 8, 28, 0.48)",
                  backdropFilter: "grayscale(0.7)",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    width: "76px",
                    height: "76px",
                    display: "grid",
                    placeItems: "center",
                    border: "3px solid rgba(255,255,255,.85)",
                    borderRadius: "50%",
                    background: "rgba(5,17,50,.88)",
                    color: "white",
                    boxShadow:
                      "0 0 24px rgba(72,220,255,.45)",
                  }}
                >
                  <Lock size={40} />
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </section>

      <motion.section
        className="levels-message"
        initial={{
          x: "-50%",
          y: 60,
          opacity: 0,
        }}
        animate={{
          x: "-50%",
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          delay: 0.78,
        }}
      >
        ⭐ Completa Principiante para desbloquear Intermedio y Avanzado.
      </motion.section>
    </main>
  );
}
