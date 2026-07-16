import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Gamepad2, LockKeyhole, Sparkles } from "lucide-react";
import { getAdvancedUnit } from "../data/englishAdvancedData";
import "../styles/english-advanced.css";
export default function EnglishAdvancedUnit(){const n=useNavigate(),{unitId}=useParams(),u=getAdvancedUnit(unitId);return <main className={`ea-stage ea-${u.theme}`}><button className="ea-world-back" onClick={()=>n("/english")}><ArrowLeft/> Volver a niveles</button><motion.section className="ea-intro ea-intro-premium" initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}}><img src={u.image}/><div className="ea-intro-copy"><small>AVENTURA {u.id} DE 3</small><h1>{u.title}</h1><p>{u.subtitle}</p><div className="ea-path"><span><BookOpen/> Aprende</span><span><Gamepad2/> Juega</span><span><LockKeyhole/> Evalúa</span><span><Sparkles/> Gana</span></div><button onClick={()=>n(`/english/advanced/unit/${u.id}/lesson`)}>Comenzar aventura</button></div></motion.section></main>}
