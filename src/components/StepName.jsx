import { User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StepName({
  name,
  setName,
  next,
}) {
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe tu nombre aquí..."
          maxLength={25}
          autoFocus
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              name.trim() !== ""
            ) {
              next();
            }
          }}
        />

        <User size={38} />
      </div>

      <button
        className="edu-button"
        disabled={name.trim() === ""}
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