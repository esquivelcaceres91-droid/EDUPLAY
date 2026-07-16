import { motion } from "framer-motion";
import { ArrowLeft, ChefHat, Play, Sparkles, Star, UtensilsCrossed, Volume2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-food-unit.css";

export default function EnglishFoodUnit() {
  const navigate = useNavigate();
  return (
    <main className="food-screen food-unit-mode">
      <button className="food-back" onClick={() => navigate("/english/beginner")}><ArrowLeft /> Volver</button>
      <motion.section className="food-hero-card" initial={{ opacity: 0, y: 34, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <div className="food-hero-icon"><ChefHat size={88} /></div>
        <span className="food-kicker"><Sparkles size={18}/> English Adventure · Unit 6</span>
        <h1>Food</h1>
        <p>¡El restaurante mágico abrió sus puertas! Aprende comidas en inglés y ayuda al chef a preparar el menú perfecto.</p>
        <div className="food-mission-row">
          <div><Volume2/><span><strong>Lección</strong>Comidas y pronunciación</span></div>
          <div><UtensilsCrossed/><span><strong>Juego</strong>El menú del chef</span></div>
          <div><Star/><span><strong>Premio</strong>XP y estrellas</span></div>
        </div>
        <motion.button className="food-primary" onClick={() => navigate("/english/beginner/unit/6/lesson")} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
          <Play fill="currentColor"/> Entrar al restaurante
        </motion.button>
      </motion.section>
    </main>
  );
}
