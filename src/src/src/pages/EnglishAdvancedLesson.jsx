import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Volume2 } from "lucide-react";
import { getAdvancedUnit } from "../data/englishAdvancedData";
import { updateUnitProgress } from "../utils/progressManager";
import { speakEnglish } from "../utils/englishSpeech";
import "../styles/english-advanced.css";

export default function EnglishAdvancedLesson() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const unit = getAdvancedUnit(unitId);
  const [active, setActive] = useState(0);

  return (
    <main className={`ea-stage ea-${unit.theme}`}>
      <button className="ea-world-back" onClick={() => navigate("/english")}>
        <ArrowLeft /> Volver a niveles
      </button>

      <section className="ea-panel ea-lesson-panel ea-lesson-premium">
        <small>LECCIÓN · AVENTURA {unit.id}</small>
        <h1>{unit.title}</h1>
        <p>Explora cada tarjeta y toca el altavoz para escuchar una pronunciación clara en inglés.</p>

        <div className="ea-lesson-grid">
          {unit.lesson.map((item, index) => (
            <motion.button
              key={item.title}
              className={active === index ? "active" : ""}
              onClick={() => {
                setActive(index);
                speakEnglish(item.example);
              }}
              whileHover={{ y: -5 }}
            >
              <em>{item.emoji}</em>
              <h2>{item.title}</h2>
              <span>{item.translation}</span>
              <p>{item.example}</p>
              <span className="ea-listen-chip"><Volume2 /> Escuchar</span>
            </motion.button>
          ))}
        </div>

        <button
          className="ea-primary"
          onClick={() => {
            updateUnitProgress("english", "advanced", unit.id, 35);
            navigate(`/english/advanced/unit/${unit.id}/game`);
          }}
        >
          Ir al minijuego
        </button>
      </section>
    </main>
  );
}
