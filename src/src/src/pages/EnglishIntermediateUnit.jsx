import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Home, BookOpen, Gamepad2, Sparkles } from "lucide-react";
import { getIntermediateUnit } from "../data/englishIntermediateData";
import "../styles/english-intermediate.css";

export default function EnglishIntermediateUnit() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const unit = getIntermediateUnit(unitId);
  return <main className={`ei-stage ei-stage-${unit.theme}`}>
    <button className="ei-stage-back" onClick={() => navigate("/english/intermediate")}><ArrowLeft/> Mapa</button><button className="ei-worlds-back" onClick={()=>navigate("/english")}><Home/> Volver a mundos</button>
    <motion.section className="ei-intro-card" initial={{scale:.75,opacity:0}} animate={{scale:1,opacity:1}}>
      <div className="ei-intro-icon">{unit.icon}</div><small>MISIÓN {unit.id} · INTERMEDIATE</small><h1>{unit.title}</h1><p>{unit.subtitle}</p>
      <div className="ei-intro-badges"><span><BookOpen/> Lección</span><span><Gamepad2/> Juego nuevo</span><span><Sparkles/> Recompensa</span></div>
      <button className="ei-primary" onClick={() => navigate(`/english/intermediate/unit/${unit.id}/lesson`)}>Entrar a la aventura</button>
    </motion.section>
  </main>;
}
