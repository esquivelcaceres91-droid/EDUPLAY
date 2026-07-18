import "../styles/computer-advanced.css";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  Flame,
  Gem,
  Lock,
  Play,
  Star,
} from "lucide-react";

import {
  getLevelProgress,
  getStreak,
} from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";

const advancedUnits = [
  {
    id: 1,
    title: "Robótica",
    subtitle:
      "Sensores, motores y órdenes para construir robots",
    image:
      "/assets/computer/advanced/unit-robotics.png",
    accent: "cyan",
  },
  {
    id: 2,
    title: "Inteligencia Artificial",
    subtitle:
      "Aprende cómo las máquinas reconocen y deciden",
    image:
      "/assets/computer/advanced/unit-ai.png",
    accent: "violet",
  },
  {
    id: 3,
    title: "Redes y seguridad",
    subtitle:
      "Conecta dispositivos y protege la información",
    image:
      "/assets/computer/advanced/unit-networks.png",
    accent: "orange",
    final: true,
  },
];

export default function ComputerAdvanced() {
  const navigate = useNavigate();
  const demoAccount = useDemoAccount();

  const levelProgress = getLevelProgress(
    "computer",
    "advanced"
  );

  const streak = getStreak();

  const units = useMemo(() => {
    return advancedUnits.map((unit) => ({
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
      `/computer/advanced/unit/${unit.id}/lesson`
    );
  };

  return (
    <main className="advanced-map-screen">
      <header className="advanced-map-topbar">
        <motion.button
          type="button"
          className="advanced-map-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          Volver
        </motion.button>

        <div className="advanced-map-title">
          <span>Mundo de Computación</span>
          <strong>Avanzado</strong>
          <small>
            Robótica, inteligencia artificial y redes
          </small>
        </div>

        <div className="advanced-map-stats">
          <div>
            <Flame size={24} />
            <span>
              {streak} {streak === 1 ? "día" : "días"}
            </span>
          </div>

          <div>
            <Gem size={24} />
            <span>{levelProgress.xp} XP</span>
          </div>

          <div>
            <Star size={25} fill="currentColor" />
            <span>{levelProgress.stars}</span>
          </div>
        </div>
      </header>

      <section className="advanced-map-content">
        <motion.div
          className="advanced-map-intro"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <span>Nivel final</span>
            <h1>Domina la tecnología del futuro</h1>
            <p>
              Completa las tres unidades para convertirte
              en Explorador Digital Avanzado.
            </p>
          </div>

          <div className="advanced-map-count">
            <strong>
              {levelProgress.completedUnits.length}/3
            </strong>
            <span>Unidades completadas</span>
          </div>
        </motion.div>

        <section className="advanced-map-grid">
          {units.map((unit, index) => (
            <motion.button
              type="button"
              key={unit.id}
              className={`advanced-unit-card advanced-${unit.accent} ${
                !unit.unlocked
                  ? "advanced-unit-locked"
                  : ""
              } ${
                unit.completed
                  ? "advanced-unit-completed"
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
                delay: 0.12 + index * 0.12,
              }}
              whileHover={
                unit.unlocked
                  ? { y: -9, scale: 1.025 }
                  : {}
              }
              whileTap={
                unit.unlocked
                  ? { scale: 0.97 }
                  : {}
              }
            >
              <div className="advanced-unit-number">
                0{unit.id}
              </div>

              <div className="advanced-unit-image">
                <img
                  src={unit.image}
                  alt={unit.title}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/assets/mascot.png";
                  }}
                />
              </div>

              <div className="advanced-unit-copy">
                <span>Unidad {unit.id}</span>
                <h2>{unit.title}</h2>
                <p>{unit.subtitle}</p>

                <div className="advanced-unit-progress">
                  <div
                    style={{
                      width: `${unit.progress}%`,
                    }}
                  />
                </div>

                <div className="advanced-unit-status">
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
                      <Play
                        size={17}
                        fill="currentColor"
                      />
                      {unit.progress > 0
                        ? `Continuar ${unit.progress}%`
                        : "Comenzar"}
                    </>
                  )}
                </div>
              </div>

              {!unit.unlocked && (
                <div className="advanced-unit-overlay">
                  <Lock size={44} />
                </div>
              )}
            </motion.button>
          ))}
        </section>
      </section>
    </main>
  );
}
