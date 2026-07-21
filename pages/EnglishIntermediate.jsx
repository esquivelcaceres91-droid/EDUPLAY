import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Lock, Play, Star, Trophy } from "lucide-react";
import { getLevelProgress } from "../utils/progressManager";
import { useDemoAccount } from "../utils/demoAccess";
import { intermediateUnits } from "../data/englishIntermediateData";
import "../styles/english-intermediate.css";

const missionImages = {
  1: "/assets/english/intermediate/verb-to-be-banner.webp",
  2: "/assets/english/intermediate/present-simple-banner.webp",
  3: "/assets/english/intermediate/daily-routine-banner.webp",
  4: "/assets/english/intermediate/final-challenge-banner.webp",
};

export default function EnglishIntermediate() {
  const navigate = useNavigate();
  const demoAccount = useDemoAccount();
  const progress = useMemo(
    () => getLevelProgress("english", "intermediate"),
    []
  );

  return (
    <main className="ei-map-screen">
      <header className="ei-map-header">
        <button className="ei-back" onClick={() => navigate("/english")}>
          <ArrowLeft size={22} /> Volver a mundos
        </button>

        <div className="ei-map-title">
          <span>ENGLISH WORLD</span>
          <h1>Intermediate Adventure</h1>
          <p>4 misiones para convertirte en una estrella del inglés</p>
        </div>

        <div className="ei-map-stats">
          <span className="ei-stat-pill ei-stat-streak"><i><Flame size={23} fill="currentColor" /></i><b>{progress.completedUnits.length + 1}</b><small>racha</small></span>
          <span className="ei-stat-pill ei-stat-stars"><i><Star size={23} fill="currentColor" /></i><b>{progress.stars}</b><small>estrellas</small></span>
        </div>
      </header>

      <section className="ei-map-track ei-image-map-track">
        {intermediateUnits.map((unit, index) => {
          const unlocked = demoAccount || progress.unlockedUnits.includes(unit.id);
          const completed = progress.completedUnits.includes(unit.id);
          const unitProgress = completed ? 100 : progress.progress?.[unit.id] || 0;

          return (
            <motion.button
              key={unit.id}
              className={`ei-map-unit ei-image-unit ${completed ? "completed" : ""} ${!unlocked ? "locked" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              whileHover={unlocked ? { y: -8, scale: 1.025 } : {}}
              whileTap={unlocked ? { scale: 0.985 } : {}}
              onClick={() => unlocked && navigate(`/english/intermediate/unit/${unit.id}`)}
              aria-label={`${unit.title}: ${unlocked ? "abrir misión" : "misión bloqueada"}`}
            >
              <img
                className="ei-mission-image"
                src={missionImages[unit.id]}
                alt={`Misión ${unit.id}: ${unit.title}`}
              />

              <div className="ei-image-shade" />

              {!unlocked && (
                <div className="ei-image-lock">
                  <Lock size={42} />
                  <strong>BLOQUEADO</strong>
                  <span>Completa la misión anterior</span>
                </div>
              )}

              {completed && (
                <div className="ei-image-completed">
                  <Trophy size={22} /> COMPLETADA
                </div>
              )}

              <div className="ei-image-controls">
                <div className="ei-image-progress">
                  <i style={{ width: `${unitProgress}%` }} />
                </div>

                <div className="ei-image-action">
                  <span>{unitProgress}%</span>
                  <b>
                    {unlocked ? (
                      <><Play size={17} fill="currentColor" />{completed ? "Jugar otra vez" : "Comenzar misión"}</>
                    ) : (
                      <><Lock size={17} /> Bloqueado</>
                    )}
                  </b>
                </div>
              </div>
            </motion.button>
          );
        })}
      </section>
    </main>
  );
}
