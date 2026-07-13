import "../styles/computer-levels.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Flame,
  Gem,
  Star,
  ChevronRight,
  Lock,
} from "lucide-react";

import {
  getLevelProgress,
  getStreak,
} from "../utils/progressManager";

const TOTAL_BEGINNER_UNITS = 9;

export default function ComputerLevels() {
  const navigate = useNavigate();

  const beginnerProgress = getLevelProgress(
    "computer",
    "beginner"
  );

  const streak = getStreak();

  const completedBeginnerUnits =
    beginnerProgress.completedUnits.length;

  const beginnerPercentage = Math.min(
    100,
    Math.round(
      (completedBeginnerUnits /
        TOTAL_BEGINNER_UNITS) *
        100
    )
  );

  const intermediateUnlocked =
    localStorage.getItem(
      "eduplay-computer-intermediate-unlocked"
    ) === "true" ||
    completedBeginnerUnits >= TOTAL_BEGINNER_UNITS;

  const totalXp = beginnerProgress.xp;
  const totalStars = beginnerProgress.stars;

  const playerLevel = Math.max(
    1,
    Math.floor(totalXp / 500) + 1
  );

  const levels = [
    {
      id: "beginner",
      title: "Principiante",
      subtitle: "Conceptos básicos de computación",
      image: "/assets/computer/levels/beginner.png",
      progress: beginnerPercentage,
      unlocked: true,
      className: "computer-beginner",
    },
    {
      id: "intermediate",
      title: "Intermedio",
      subtitle: "Programación y herramientas digitales",
      image: "/assets/computer/levels/intermediate.png",
      progress: 0,
      unlocked: intermediateUnlocked,
      className: "computer-intermediate",
    },
    {
      id: "advanced",
      title: "Avanzado",
      subtitle:
        "Robótica, inteligencia artificial y redes",
      image: "/assets/computer/levels/advanced.png",
      progress: 0,
      unlocked: false,
      className: "computer-advanced",
    },
  ];

  const openLevel = (level) => {
    if (!level.unlocked) return;

    navigate(`/computer/${level.id}`);
  };

  return (
    <main className="computer-levels-screen">
      <img
        className="computer-levels-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <motion.button
        type="button"
        className="computer-levels-back"
        onClick={() => navigate("/home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowLeft size={26} />
        Volver
      </motion.button>

      <motion.section
        className="computer-levels-stats"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <Flame
            size={34}
            className="computer-fire"
          />
          <span>Racha</span>
          <strong>
            {streak} {streak === 1 ? "día" : "días"}
          </strong>
        </div>

        <div>
          <Gem
            size={32}
            className="computer-gem"
          />
          <span>Nivel</span>
          <strong>{playerLevel}</strong>
        </div>

        <div>
          <Star
            size={36}
            className="computer-star"
            fill="currentColor"
          />
          <span>XP</span>
          <strong>
            {totalXp.toLocaleString("es-GT")}
          </strong>
        </div>

        <img
          src="/assets/avatar-1.png"
          alt="Avatar"
          onError={(event) => {
            event.currentTarget.src =
              "/assets/mascot.png";
          }}
        />
      </motion.section>

      <motion.section
        className="computer-levels-progress"
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
          delay: 0.2,
        }}
      >
        <div className="computer-progress-line">
          <div
            style={{
              width: intermediateUnlocked
                ? "50%"
                : "0%",
            }}
          />
        </div>

        <span className="computer-progress-step active">
          1
        </span>

        <span
          className={`computer-progress-step middle ${
            intermediateUnlocked ? "active" : ""
          }`}
        >
          2
        </span>

        <span className="computer-progress-step last">
          3
        </span>
      </motion.section>

      <section className="computer-levels-cards">
        {levels.map((level, index) => (
          <motion.button
            type="button"
            key={level.id}
            className={`computer-level-card ${level.className}`}
            onClick={() => openLevel(level)}
            initial={{
              y: 80,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.55,
              delay: 0.28 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              level.unlocked
                ? {
                    y: -12,
                    scale: 1.035,
                  }
                : {}
            }
            whileTap={
              level.unlocked
                ? {
                    scale: 0.96,
                  }
                : {}
            }
            style={{
              cursor: level.unlocked
                ? "pointer"
                : "not-allowed",
            }}
          >
            <span className="computer-card-shine" />

            <div className="computer-card-image">
              <img
                src={level.image}
                alt={level.title}
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/mascot.png";
                }}
              />
            </div>

            <div className="computer-card-info">
              <h2>{level.title}</h2>
              <p>{level.subtitle}</p>

              <div className="computer-card-progress">
                <div
                  style={{
                    width: `${level.progress}%`,
                  }}
                />
              </div>

              <div className="computer-card-bottom">
                <span>
                  {level.progress}% completado
                </span>

                {level.unlocked ? (
                  <span className="computer-enter">
                    Entrar
                    <ChevronRight size={20} />
                  </span>
                ) : (
                  <span
                    className="computer-enter"
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
                  background:
                    "rgba(2, 8, 28, 0.48)",
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
                    border:
                      "3px solid rgba(255,255,255,.85)",
                    borderRadius: "50%",
                    background:
                      "rgba(5,17,50,.88)",
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

      <motion.div
        className="computer-levels-message"
        initial={{
          x: "-50%",
          y: 45,
          opacity: 0,
        }}
        animate={{
          x: "-50%",
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          delay: 0.72,
        }}
      >
        {intermediateUnlocked
          ? `🎉 ¡Intermedio desbloqueado! Obtuviste ${totalStars} estrellas.`
          : `💡 Has completado ${completedBeginnerUnits} de ${TOTAL_BEGINNER_UNITS} unidades.`}
      </motion.div>
    </main>
  );
}
