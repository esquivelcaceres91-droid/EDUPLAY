import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Gamepad2, Heart, Play, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-family-unit.css";

export default function EnglishFamilyUnit() {
  const navigate = useNavigate();

  return (
    <main className="english-family-screen">
      <header className="english-family-topbar">
        <button onClick={() => navigate("/english/beginner")}><ArrowLeft size={22} /> Volver al mapa</button>
        <div><span>English Beginner</span><strong>Unit 3 · Family</strong></div>
        <div className="english-family-top-stars"><Star size={22} fill="currentColor" /> Álbum familiar</div>
      </header>

      <section className="english-family-hero">
        <motion.div className="english-family-copy" initial={{ opacity: 0, x: -35 }} animate={{ opacity: 1, x: 0 }}>
          <span className="english-family-kicker"><Heart size={20} fill="currentColor" /> MY FAMILY ADVENTURE</span>
          <h1>¡Conoce a una familia increíble!</h1>
          <p>Aprende cómo nombrar a cada integrante de la familia en inglés y completa un álbum lleno de recuerdos.</p>

          <div className="english-family-roadmap">
            <div><BookOpen /><span><strong>Lección</strong>Conoce a cada familiar</span></div>
            <div><Gamepad2 /><span><strong>Mini juego</strong>Completa el árbol familiar</span></div>
            <div><ShieldCheck /><span><strong>Evaluación</strong>Resuelve el álbum final</span></div>
          </div>

          <motion.button className="english-family-primary" onClick={() => navigate("/english/beginner/unit/3/lesson")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Play size={22} fill="currentColor" /> Abrir el álbum
          </motion.button>
        </motion.div>

        <motion.div className="english-family-art" initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <div className="family-photo-frame"><img src="/assets/maps/english-beginner/unit-family.png" alt="Aventura de la familia" /></div>
          <span className="family-floating-heart heart-one">♥</span><span className="family-floating-heart heart-two">♥</span><span className="family-floating-heart heart-three">♥</span>
          <div className="family-sparkle"><Sparkles /></div>
        </motion.div>
      </section>
    </main>
  );
}
