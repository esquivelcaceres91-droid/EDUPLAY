import "../styles/computer-map.css";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Flame,
  Gem,
  Star,
  Lock,
  Play,
  CheckCircle2,
} from "lucide-react";

import {
  getLevelProgress,
  getStreak,
} from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";

const baseUnits = [
  {
    id: 1,
    title: "La computadora",
    subtitle: "Conoce qué es una computadora",
    image: "/assets/computer/maps/beginner/unit-computer.png",
  },
  {
    id: 2,
    title: "Partes de la PC",
    subtitle: "Monitor, teclado, mouse y CPU",
    image: "/assets/computer/maps/beginner/unit-parts.png",
  },
  {
    id: 3,
    title: "El teclado",
    subtitle: "Aprende las teclas principales",
    image: "/assets/computer/maps/beginner/unit-keyboard.png",
  },
  {
    id: 4,
    title: "El mouse",
    subtitle: "Mover, hacer clic y arrastrar",
    image: "/assets/computer/maps/beginner/unit-mouse.png",
  },
  {
    id: 5,
    title: "Windows",
    subtitle: "Conoce el escritorio y sus iconos",
    image: "/assets/computer/maps/beginner/unit-windows.png",
  },
  {
    id: 6,
    title: "Archivos y carpetas",
    subtitle: "Aprende a organizar documentos",
    image: "/assets/computer/maps/beginner/unit-folders.png",
  },
  {
    id: 7,
    title: "Paint",
    subtitle: "Dibuja y crea con la computadora",
    image: "/assets/computer/maps/beginner/unit-paint.png",
  },
  {
    id: 8,
    title: "Internet seguro",
    subtitle: "Explora internet de forma segura",
    image: "/assets/computer/maps/beginner/unit-internet.png",
  },
  {
    id: 9,
    title: "Reto final",
    subtitle: "Demuestra todo lo aprendido",
    image: "/assets/computer/maps/beginner/final-chest.png",
    final: true,
  },
];

export default function ComputerBeginner() {
  const navigate = useNavigate();
  const demoAccount = useDemoAccount();

  const levelProgress = getLevelProgress(
    "computer",
    "beginner"
  );

  const streak = getStreak();

  const units = useMemo(() => {
    return baseUnits.map((unit) => ({
      ...unit,

      unlocked:
        demoAccount || levelProgress.unlockedUnits.includes(unit.id),

      completed:
        levelProgress.completedUnits.includes(unit.id),

      progress: Number(
        levelProgress.progress[unit.id] || 0
      ),
    }));
  }, [demoAccount, levelProgress]);

  const openUnit = (unit) => {
    if (!unit.unlocked) return;

    navigate(
      `/computer/beginner/unit/${unit.id}/lesson`
    );
  };

  return (
    <main className="computer-map-screen">
      <header className="computer-map-topbar">
        <motion.button
          type="button"
          className="computer-map-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowLeft size={24} />
          Volver
        </motion.button>

        <div className="computer-map-title">
          <span>Mundo de Computación</span>
          <strong>Principiante</strong>
        </div>

        <div className="computer-map-stats">
          <div>
            <Flame size={28} />

            <span>
              {streak} {streak === 1 ? "día" : "días"}
            </span>
          </div>

          <div>
            <Gem size={28} />

            <span>
              {levelProgress.xp} XP
            </span>
          </div>

          <div>
            <Star size={30} fill="currentColor" />

            <span>
              {levelProgress.stars}
            </span>
          </div>
        </div>
      </header>

      <section className="computer-map-viewport">
        <div className="computer-map-world">
          <div className="computer-route-line" />

          {units.map((unit, index) => (
            <motion.button
              type="button"
              key={unit.id}
              className={`computer-map-unit computer-unit-${
                index + 1
              } ${
                unit.final
                  ? "computer-map-unit-final"
                  : ""
              } ${
                !unit.unlocked
                  ? "computer-map-unit-locked"
                  : ""
              } ${
                unit.completed
                  ? "computer-map-unit-completed"
                  : ""
              }`}
              onClick={() => openUnit(unit)}
              initial={{
                scale: 0.72,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                unit.unlocked
                  ? {
                      y: -10,
                      scale: 1.045,
                    }
                  : {}
              }
              whileTap={
                unit.unlocked
                  ? {
                      scale: 0.96,
                    }
                  : {}
              }
            >
              <span className="computer-unit-glow" />

              <div className="computer-unit-image">
                <img
                  src={unit.image}
                  alt={unit.title}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/assets/mascot.png";
                  }}
                />

                {unit.completed && (
                  <div className="computer-unit-completed-badge">
                    <CheckCircle2 size={34} />
                  </div>
                )}
              </div>

              <div className="computer-unit-info">
                <strong>
                  {unit.title}
                </strong>

                <p>
                  {unit.subtitle}
                </p>

                <div className="computer-unit-progress">
                  <div
                    style={{
                      width: `${unit.progress}%`,
                    }}
                  />
                </div>

                <span>
                  {!unit.unlocked ? (
                    <>
                      <Lock size={15} />
                      Bloqueado
                    </>
                  ) : unit.completed ? (
                    <>
                      <CheckCircle2 size={15} />
                      Completado
                    </>
                  ) : (
                    <>
                      <Play
                        size={15}
                        fill="currentColor"
                      />

                      {unit.progress > 0
                        ? `${unit.progress}% completado`
                        : "Comenzar"}
                    </>
                  )}
                </span>
              </div>

              {!unit.unlocked && (
                <div className="computer-unit-lock">
                  <Lock size={40} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  );
}
