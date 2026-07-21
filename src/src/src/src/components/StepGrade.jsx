import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";

const grades = [1, 2, 3, 4, 5, 6];

export default function StepGrade({ grade, setGrade, next }) {
  return (
    <motion.section
      className="grade-card-pro"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div className="grade-title-row">
        <GraduationCap size={48} />
        <div>
          <h1>¿Qué grado cursas?</h1>
          <p>Así prepararemos la mejor aventura para ti.</p>
        </div>
      </div>

      <div className="grade-options">
        {grades.map((item) => (
          <motion.button
            key={item}
            type="button"
            className={`grade-option ${grade === item ? "selected" : ""}`}
            onClick={() => setGrade(item)}
            whileHover={{ y: -5, scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
          >
            <strong>{item}.º</strong>
            <span>Primaria</span>
          </motion.button>
        ))}
      </div>

      <button
        type="button"
        className="grade-continue-btn"
        disabled={!grade}
        onClick={next}
      >
        Continuar
        <ArrowRight size={34} />
      </button>

      <small>🎓 Cada grado tiene una ruta pensada para aprender mejor.</small>
    </motion.section>
  );
}
