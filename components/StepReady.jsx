import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function StepReady({ finish }) {
  return (
    <motion.section
      className="ready-card"
      initial={{ x: 350, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -350, opacity: 0 }}
      transition={{
        duration: .45,
        ease: "easeInOut"
      }}
    >

      <CheckCircle
        className="ready-icon"
        size={74}
      />

      <h1>
        ¡Todo listo!
      </h1>

      <p>
        Tu aventura de aprendizaje está preparada.
      </p>

      <button
        className="ready-button"
        onClick={finish}
      >

        Empezar

        <ArrowRight size={42}/>

      </button>

      <small>

        ⭐ Aprende, juega y diviértete con EduPlay.

      </small>

    </motion.section>
  );
}