import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, GraduationCap, Play, School, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-school-unit.css";

export default function EnglishSchoolUnit() {
  const navigate = useNavigate();
  return (
    <main className="school-screen school-unit-mode">
      <button className="school-back" onClick={() => navigate("/english/beginner")}><ArrowLeft /> Volver</button>
      <motion.section className="school-hero-card" initial={{ opacity: 0, y: 34, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <div className="school-hero-icon"><School size={88} /></div>
        <span className="school-kicker"><Sparkles size={18}/> English Adventure · Unit 5</span>
        <h1>School</h1>
        <p>¡La campana está por sonar! Aprende los objetos del salón y prepara tu mochila para una misión escolar.</p>
        <div className="school-mission-row">
          <div><BookOpen/><span><strong>Lección</strong>Palabras del salón</span></div>
          <div><GraduationCap/><span><strong>Juego</strong>Prepara la mochila</span></div>
          <div><Star/><span><strong>Premio</strong>XP y estrellas</span></div>
        </div>
        <motion.button className="school-primary" onClick={() => navigate("/english/beginner/unit/5/lesson")} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
          <Play fill="currentColor"/> Empezar la clase
        </motion.button>
      </motion.section>
    </main>
  );
}
