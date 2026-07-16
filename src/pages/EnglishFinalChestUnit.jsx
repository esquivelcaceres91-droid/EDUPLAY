import { motion } from "framer-motion";
import { ArrowLeft, Crown, Gem, KeyRound, Play, Sparkles, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-final-chest.css";

export default function EnglishFinalChestUnit() {
  const navigate = useNavigate();
  return (
    <main className="chest-screen chest-intro-mode">
      <button className="chest-back" onClick={() => navigate("/english/beginner")}><ArrowLeft /> Volver</button>
      <div className="chest-stars-bg" aria-hidden="true" />
      <motion.section className="chest-intro-card" initial={{ opacity: 0, scale: .76, y: 45 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 120 }}>
        <span className="chest-crown"><Crown size={38} fill="currentColor" /></span>
        <div className="chest-vault">
          <motion.div className="chest-glow" animate={{ scale: [1, 1.14, 1], opacity: [.55, .95, .55] }} transition={{ repeat: Infinity, duration: 2.4 }} />
          <div className="chest-box"><Gem size={78} /><span className="chest-lock"><KeyRound size={28} /></span></div>
        </div>
        <span className="chest-kicker"><Sparkles size={17}/> Desafío final · English Beginner</span>
        <h1>El Gran Cofre Final</h1>
        <p>Las seis gemas del reino están listas. Supera tres pruebas mágicas para abrir el cofre y obtener tu diploma.</p>
        <div className="chest-trials">
          <div><span>1</span><strong>Portal de palabras</strong><small>Reconoce el vocabulario</small></div>
          <div><span>2</span><strong>Puente de frases</strong><small>Ordena la oración</small></div>
          <div><span>3</span><strong>Cámara del cofre</strong><small>Resuelve el reto final</small></div>
        </div>
        <motion.button className="chest-primary" onClick={() => navigate("/english/beginner/unit/7/challenge")} whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}>
          <Play fill="currentColor" /> Comenzar desafío
        </motion.button>
        <div className="chest-prize"><Trophy /> Premio especial: diploma English Beginner</div>
      </motion.section>
    </main>
  );
}
