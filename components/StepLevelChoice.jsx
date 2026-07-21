import { motion } from "framer-motion";
import { ArrowRight, Rocket, Sparkles, Trophy } from "lucide-react";

export default function StepLevelChoice({ grade, chooseLevel }) {
  return (
    <motion.section
      className="level-choice-card"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div className="level-choice-heading">
        <Sparkles size={42} />
        <div>
          <h1>¡Vas muy avanzado!</h1>
          <p>
            Por cursar {grade}.º primaria puedes comenzar directamente en
            Intermedio.
          </p>
        </div>
      </div>

      <div className="level-choice-options">
        <motion.button
          type="button"
          className="level-choice-option recommended"
          onClick={() => chooseLevel("beginner")}
          whileHover={{ y: -7, scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="recommended-ribbon">⭐ RECOMENDADO POR EDUPLAY</span>
          <Trophy size={48} />
          <h2>Comenzar en Principiante</h2>
          <p>
            Refuerza tus conocimientos, gana todas las recompensas y llega
            mejor preparado a Intermedio.
          </p>
          <span className="choice-action">
            Elegir Principiante <ArrowRight size={24} />
          </span>
        </motion.button>

        <motion.button
          type="button"
          className="level-choice-option direct"
          onClick={() => chooseLevel("intermediate")}
          whileHover={{ y: -7, scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
        >
          <Rocket size={48} />
          <h2>Ir a Intermedio</h2>
          <p>
            Empieza con temas más avanzados si ya dominas los fundamentos.
          </p>
          <span className="choice-action">
            Elegir Intermedio <ArrowRight size={24} />
          </span>
        </motion.button>
      </div>

      <small>💡 Podrás volver a Principiante cuando quieras para repasar.</small>
    </motion.section>
  );
}
