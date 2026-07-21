import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Gamepad2, Palette, Play, ShieldCheck, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/english-colors-unit.css";
import EnglishNumbersUnit from "./EnglishNumbersUnit";

export default function EnglishBeginnerUnit() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const currentUnit = Number(unitId || 1);

  if (currentUnit === 2) {
    return <EnglishNumbersUnit />;
  }

  if (currentUnit !== 1) {
    return (
      <main className="english-colors-screen">
        <section className="english-colors-message-card">
          <Palette size={70} />
          <h1>Esta aventura aún está bloqueada</h1>
          <p>Completa Colors para continuar explorando English World.</p>
          <button onClick={() => navigate("/english/beginner")}>Volver al mapa</button>
        </section>
      </main>
    );
  }

  return (
    <main className="english-colors-screen">
      <header className="english-colors-topbar">
        <button onClick={() => navigate("/english/beginner")}><ArrowLeft size={22} /> Volver al mapa</button>
        <div><span>English Beginner</span><strong>Unit 1 · Colors</strong></div>
        <div className="english-colors-top-stars"><Star size={22} fill="currentColor" /> Nueva aventura</div>
      </header>

      <section className="english-colors-hero">
        <motion.div className="english-colors-copy" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }}>
          <span className="english-colors-kicker"><Palette size={20} /> COLOR KINGDOM</span>
          <h1>¡Descubre los colores en inglés!</h1>
          <p>Viaja por un reino lleno de color, aprende nuevas palabras y supera el reto del Arcoíris Mágico.</p>

          <div className="english-colors-roadmap">
            <div><BookOpen /><span><strong>Lección</strong>Aprende 8 colores</span></div>
            <div><Gamepad2 /><span><strong>Mini juego</strong>Conecta cada color</span></div>
            <div><ShieldCheck /><span><strong>Evaluación</strong>Demuestra lo aprendido</span></div>
          </div>

          <motion.button className="english-colors-primary" onClick={() => navigate("/english/beginner/unit/1/lesson")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Play size={22} fill="currentColor" /> Comenzar aventura
          </motion.button>
        </motion.div>

        <motion.div className="english-colors-art" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <div className="english-colors-rainbow-ring" />
          <img src="/assets/maps/english-beginner/unit-colors.png" alt="Aventura de colores" />
          <span className="color-orb orb-red" /><span className="color-orb orb-blue" /><span className="color-orb orb-yellow" />
        </motion.div>
      </section>
    </main>
  );
}
