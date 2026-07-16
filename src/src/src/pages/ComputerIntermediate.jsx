import "../styles/computer-intermediate.css";

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

const intermediateUnits = [
  {
    id: 1,
    title: "Microsoft Word",
    subtitle:
      "Crea documentos, cambia textos y organiza información",
    image:
      "/assets/computer/maps/intermediate/unit-word.png",
    accent: "blue",
  },
  {
    id: 2,
    title: "Microsoft Excel",
    subtitle:
      "Conoce celdas, filas, columnas y operaciones sencillas",
    image:
      "/assets/computer/maps/intermediate/unit-excel.png",
    accent: "green",
  },
  {
    id: 3,
    title: "Microsoft PowerPoint",
    subtitle:
      "Diseña presentaciones con texto, imágenes y diapositivas",
    image:
      "/assets/computer/maps/intermediate/unit-powerpoint.png",
    accent: "orange",
  },
  {
    id: 4,
    title: "Reto final",
    subtitle:
      "Demuestra lo aprendido en las herramientas digitales",
    image:
      "/assets/computer/maps/intermediate/final-chest.png",
    accent: "purple",
    final: true,
  },
];

export default function ComputerIntermediate() {
  const navigate = useNavigate();

  const levelProgress = getLevelProgress(
    "computer",
    "intermediate"
  );

  const streak = getStreak();

  const units = useMemo(() => {
    return intermediateUnits.map((unit) => ({
      ...unit,

      unlocked:
        levelProgress.unlockedUnits.includes(unit.id),

      completed:
        levelProgress.completedUnits.includes(unit.id),

      progress: Number(
        levelProgress.progress[unit.id] || 0
      ),
    }));
  }, [levelProgress]);

  const openUnit = (unit) => {
    if (!unit.unlocked) return;

    navigate(
      `/computer/intermediate/unit/${unit.id}/lesson`
    );
  };

  return (
    <main className="computer-intermediate-screen">
      <header className="computer-intermediate-topbar">
        <motion.button
          type="button"
          className="computer-intermediate-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowLeft size={22} />
          Volver
        </motion.button>

        <div className="computer-intermediate-title">
          <span>Mundo de Computación</span>
          <strong>Intermedio</strong>
          <small>
            Herramientas digitales para crear y organizar
          </small>
        </div>

        <div className="computer-intermediate-stats">
          <div>
            <Flame size={25} />
            <span>
              {streak} {streak === 1 ? "día" : "días"}
            </span>
          </div>

          <div>
            <Gem size={25} />
            <span>{levelProgress.xp} XP</span>
          </div>

          <div>
            <Star size={27} fill="currentColor" />
            <span>{levelProgress.stars}</span>
          </div>
        </div>
      </header>

      <section className="computer-intermediate-content">
        <motion.div
          className="computer-intermediate-intro"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span>Nivel desbloqueado</span>
            <h1>Aprende a crear con la computadora</h1>

            <p>
              Completa las cuatro unidades para desbloquear
              el nivel Avanzado.
            </p>
          </div>

          <div className="computer-intermediate-overall">
            <strong>
              {levelProgress.completedUnits.length}/4
            </strong>

            <span>Unidades completadas</span>
          </div>
        </motion.div>

        <section className="computer-intermediate-grid">
          {units.map((unit, index) => (
            <motion.button
              type="button"
              key={unit.id}
              className={`computer-intermediate-unit computer-intermediate-${unit.accent} ${
                unit.final
                  ? "computer-intermediate-final"
                  : ""
              } ${
                !unit.unlocked
                  ? "computer-intermediate-locked"
                  : ""
              } ${
                unit.completed
                  ? "computer-intermediate-completed"
                  : ""
              }`}
              onClick={() => openUnit(unit)}
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.15 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                unit.unlocked
                  ? {
                      y: -9,
                      scale: 1.025,
                    }
                  : {}
              }
              whileTap={
                unit.unlocked
                  ? { scale: 0.97 }
                  : {}
              }
            >
              <div className="computer-intermediate-number">
                {String(unit.id).padStart(2, "0")}
              </div>

              <div className="computer-intermediate-image">
                <img
                  src={unit.image}
                  alt={unit.title}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/assets/mascot.png";
                  }}
                />
              </div>

              <div className="computer-intermediate-unit-info">
                <span>Unidad {unit.id}</span>

                <h2>{unit.title}</h2>

                <p>{unit.subtitle}</p>

                <div className="computer-intermediate-progress">
                  <div
                    style={{
                      width: `${unit.progress}%`,
                    }}
                  />
                </div>

                <div className="computer-intermediate-status">
                  {!unit.unlocked ? (
                    <>
                      <Lock size={17} />
                      Bloqueado
                    </>
                  ) : unit.completed ? (
                    <>
                      <CheckCircle2 size={17} />
                      Completado
                    </>
                  ) : (
                    <>
                      <Play size={17} fill="currentColor" />

                      {unit.progress > 0
                        ? `Continuar ${unit.progress}%`
                        : "Comenzar"}
                    </>
                  )}
                </div>
              </div>

              {!unit.unlocked && (
                <div className="computer-intermediate-lock">
                  <Lock size={42} />
                </div>
              )}

              {unit.completed && (
                <div className="computer-intermediate-check">
                  <CheckCircle2 size={27} />
                </div>
              )}
            </motion.button>
          ))}
        </section>
      </section>
    </main>
  );
}
