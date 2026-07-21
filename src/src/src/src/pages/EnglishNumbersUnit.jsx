import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Gamepad2, Play, Rocket, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-numbers-unit.css";

export default function EnglishNumbersUnit() {
  const navigate = useNavigate();

  return (
    <main className="english-numbers-screen">
      <header className="english-numbers-topbar">
        <button onClick={() => navigate("/english/beginner")}><ArrowLeft size={22} /> Volver al mapa</button>
        <div><span>English Beginner</span><strong>Unit 2 · Numbers</strong></div>
        <div className="english-numbers-top-stars"><Star size={22} fill="currentColor" /> Misión espacial</div>
      </header>

      <section className="english-numbers-hero">
        <motion.div className="english-numbers-copy" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }}>
          <span className="english-numbers-kicker"><Rocket size={20} /> NUMBER SPACE MISSION</span>
          <h1>¡Cuenta hasta diez y despega!</h1>
          <p>Aprende los números en inglés, activa los motores de la nave y completa una misión entre las estrellas.</p>

          <div className="english-numbers-roadmap">
            <div><BookOpen /><span><strong>Lección</strong>Aprende del 1 al 10</span></div>
            <div><Gamepad2 /><span><strong>Mini juego</strong>Ordena el lanzamiento</span></div>
            <div><ShieldCheck /><span><strong>Evaluación</strong>Supera la misión final</span></div>
          </div>

          <motion.button className="english-numbers-primary" onClick={() => navigate("/english/beginner/unit/2/lesson")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Play size={22} fill="currentColor" /> Iniciar misión
          </motion.button>
        </motion.div>

        <motion.div className="english-numbers-art" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <div className="english-numbers-orbit orbit-one" />
          <div className="english-numbers-orbit orbit-two" />
          <img src="/assets/maps/english-beginner/unit-numbers.png" alt="Aventura de números" />
          <span className="number-star star-one">1</span><span className="number-star star-two">5</span><span className="number-star star-three">10</span>
        </motion.div>
      </section>
    </main>
  );
}
