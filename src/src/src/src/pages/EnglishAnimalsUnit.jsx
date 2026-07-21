import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Gamepad2, PawPrint, Play, ShieldCheck, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/english-animals-unit.css";

export default function EnglishAnimalsUnit(){
 const navigate=useNavigate();
 return <main className="animals-screen"><header className="animals-topbar"><button onClick={()=>navigate('/english/beginner')}><ArrowLeft/> Volver al mapa</button><div><span>English Beginner</span><strong>Unit 4 · Animals</strong></div><div className="animals-badge"><Star fill="currentColor"/> Safari mágico</div></header>
 <section className="animals-hero"><motion.div className="animals-copy" initial={{opacity:0,x:-35}} animate={{opacity:1,x:0}}><span className="animals-kicker"><PawPrint/> WILD ANIMAL ADVENTURE</span><h1>¡Comienza el safari mágico!</h1><p>Explora la selva, escucha los nombres en inglés y ayuda a cada animal a regresar a su hábitat.</p><div className="animals-roadmap"><div><BookOpen/><span><strong>Lección</strong>Descubre 10 animales</span></div><div><Gamepad2/><span><strong>Mini juego</strong>Rescate en la selva</span></div><div><ShieldCheck/><span><strong>Evaluación</strong>Insignia de explorador</span></div></div><motion.button className="animals-primary" onClick={()=>navigate('/english/beginner/unit/4/lesson')} whileHover={{scale:1.04}} whileTap={{scale:.96}}><Play fill="currentColor"/> Entrar a la selva</motion.button></motion.div>
 <motion.div className="animals-art" initial={{opacity:0,scale:.82}} animate={{opacity:1,scale:1}}><div className="animals-image-ring"><img src="/assets/maps/english-beginner/unit-animals.png" alt="Animales"/></div><span className="leaf l1">🌿</span><span className="leaf l2">🍃</span><span className="leaf l3">🌴</span><div className="animals-spark"><Sparkles/></div></motion.div></section></main>
}
