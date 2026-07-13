import { User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StepName({ next }) {
  return (
    <motion.section
      className="edu-card"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
    >
      <h1>¿Cómo te llamas?</h1>

      <p>
        Escribe tu nombre para comenzar tu aventura.
      </p>

      <div className="edu-input">
        <input
          placeholder="Escribe tu nombre aquí..."
        />

        <User size={38} />
      </div>

      <button
        className="edu-button"
        onClick={next}
      >
        Continuar

        <ArrowRight size={38} />
      </button>

      <small>
        ⭐ ¡Tu aventura está por comenzar!
      </small>
    </motion.section>
  );
}