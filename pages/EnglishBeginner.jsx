import "../styles/map.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { getLevelProgress } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";

import {
  ArrowLeft,
  Flame,
  Gem,
  Star,
  Lock,
  Play,
} from "lucide-react";

const units = [
  { id: 1, title: "Colors", image: "/assets/maps/english-beginner/unit-colors.png" },
  { id: 2, title: "Numbers", image: "/assets/maps/english-beginner/unit-numbers.png" },
  { id: 3, title: "Family", image: "/assets/maps/english-beginner/unit-family.png" },
  { id: 4, title: "Animals", image: "/assets/maps/english-beginner/unit-animals.png" },
  { id: 5, title: "School", image: "/assets/maps/english-beginner/unit-school.png" },
  { id: 6, title: "Food", image: "/assets/maps/english-beginner/unit-food.png" },
  { id: 7, title: "Gran Cofre Final", image: "/assets/maps/english-beginner/treasure.png", final: true },
];

export default function EnglishBeginner() {
  const navigate = useNavigate();
  const demoAccount = useDemoAccount();
  const levelProgress = useMemo(() => getLevelProgress("english", "beginner"), []);
  const visibleUnits = units.map((unit) => ({
    ...unit,
    unlocked: demoAccount || levelProgress.unlockedUnits.includes(unit.id),
    progress: Number(levelProgress.progress?.[unit.id] || 0),
  }));

  const openUnit = (unit) => {
    if (!unit.unlocked) return;
    navigate(`/english/beginner/unit/${unit.id}`);
  };

  return (
    <main className="horizontal-map-screen">
      <header className="horizontal-map-topbar">
        <motion.button
          type="button"
          className="horizontal-map-back"
          onClick={() => navigate("/english")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <ArrowLeft size={24} />
          Volver
        </motion.button>

        <div className="horizontal-map-title">
          <span>English World</span>
          <strong>Principiante</strong>
        </div>

        <div className="horizontal-map-stats">
          <div>
            <Flame size={28} />
            <span>7 días</span>
          </div>

          <div>
            <Gem size={28} />
            <span>Nivel 5</span>
          </div>

          <div>
            <Star size={30} fill="currentColor" />
            <span>1,250</span>
          </div>
        </div>
      </header>

      <section className="horizontal-map-viewport">
        <div className="horizontal-map-world">
          <div className="horizontal-route-line" />

          {visibleUnits.map((unit, index) => (
            <motion.button
              type="button"
              key={unit.id}
              className={`horizontal-unit unit-position-${index + 1} ${
                unit.final ? "horizontal-unit-final" : ""
              } ${!unit.unlocked ? "horizontal-unit-locked" : ""}`}
              onClick={() => openUnit(unit)}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={
                unit.unlocked
                  ? {
                      y: -10,
                      scale: 1.05,
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
              <span className="horizontal-unit-glow" />

              <img src={unit.image} alt={unit.title} />

              <div className="horizontal-unit-info">
                <strong>{unit.title}</strong>

                <div className="horizontal-unit-progress">
                  <div
                    style={{
                      width: `${unit.progress}%`,
                    }}
                  />
                </div>

                <span>
                  {unit.unlocked ? (
                    <>
                      <Play size={15} fill="currentColor" />
                      {unit.progress > 0
                        ? `${unit.progress}% completado`
                        : "Comenzar"}
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      Bloqueado
                    </>
                  )}
                </span>
              </div>

              {!unit.unlocked && (
                <div className="horizontal-unit-lock">
                  <Lock size={38} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>
    </main>
  );
}
