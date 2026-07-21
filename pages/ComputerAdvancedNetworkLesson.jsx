import "../styles/computer-network-unit.css";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Heart, LockKeyhole, Monitor, Network, Play, Router, ShieldCheck, Volume2, Wifi } from "lucide-react";

const lessons = [
  { title: "¿Qué es una red?", text: "Una red conecta computadoras, tabletas, teléfonos y otros dispositivos para compartir información.", detail: "En una escuela, una red puede conectar computadoras, impresoras y acceso a Internet.", icon: Network },
  { title: "Router, Internet y Wi-Fi", text: "El router organiza la conexión y permite que varios dispositivos usen Internet, por cable o mediante Wi-Fi.", detail: "El Wi-Fi facilita la conexión sin cables, pero debe estar protegido con una contraseña segura.", icon: Router },
  { title: "Seguridad digital", text: "La seguridad digital protege cuentas, dispositivos e información frente a accesos no autorizados.", detail: "Usa contraseñas fuertes, evita enlaces sospechosos y nunca compartas datos privados con desconocidos.", icon: ShieldCheck },
];

export default function ComputerAdvancedNetworkLesson() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const lesson = lessons[index];
  const Icon = lesson.icon;
  const progress = useMemo(() => Math.round(((index + 1) / lessons.length) * 100), [index]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const stop = () => { window.speechSynthesis?.cancel(); setSpeaking(false); };
  const speak = () => {
    stop();
    const voice = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.text}. ${lesson.detail}`);
    voice.lang = "es-GT"; voice.rate = 0.9;
    voice.onstart = () => setSpeaking(true); voice.onend = () => setSpeaking(false); voice.onerror = () => setSpeaking(false);
    window.speechSynthesis?.speak(voice);
  };
  const next = () => {
    stop();
    if (index < lessons.length - 1) setIndex((value) => value + 1);
    else navigate("/computer/advanced/unit/3/activity");
  };

  return <main className="network-screen">
    <header className="network-topbar">
      <div className="network-nav">
        <button onClick={() => navigate("/computer/advanced")}><ArrowLeft size={21}/><span>Volver</span></button>
        <button onClick={() => navigate("/computer")}><Monitor size={20}/><span>Mundo</span></button>
      </div>
      <div className="network-heading"><span>Computación · Avanzado</span><strong>Unidad 3: Redes y seguridad</strong></div>
      <div className="network-hearts"><Heart size={22} fill="currentColor"/><Heart size={22} fill="currentColor"/><Heart size={22} fill="currentColor"/></div>
    </header>

    <section className="network-shell">
      <motion.article className="network-card" initial={{opacity:0,y:26,scale:.97}} animate={{opacity:1,y:0,scale:1}}>
        <div className="network-progress-label"><span>Lección {index + 1} de {lessons.length}</span><strong>{progress}%</strong></div>
        <div className="network-progress"><motion.div animate={{width:`${progress}%`}}/></div>

        <div className="network-lesson-layout">
          <div className="network-hologram">
            <div className="network-ring ring-one"/><div className="network-ring ring-two"/>
            <motion.div className="network-core" animate={{scale:[1,1.06,1]}} transition={{duration:2.5,repeat:Infinity}}><Icon size={115}/></motion.div>
            <div className="network-node node-a"><Wifi size={27}/></div>
            <div className="network-node node-b"><LockKeyhole size={27}/></div>
            <div className="network-node node-c"><Router size={27}/></div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={index} className="network-copy" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}}>
              <span className="network-badge">Lección {index + 1}</span>
              <h1>{lesson.title}</h1>
              <p>{lesson.text}</p>
              <div className="network-info"><strong>Idea importante</strong><span>{lesson.detail}</span></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="network-actions">
          <button className="network-secondary" onClick={speaking ? stop : speak}>{speaking ? <><Volume2 size={20}/>Detener</> : <><Play size={20} fill="currentColor"/>Escuchar</>}</button>
          <button className="network-primary" onClick={next}>{index < lessons.length - 1 ? "Siguiente" : "Crear contraseña segura"}<ArrowRight size={21}/></button>
        </div>
      </motion.article>
    </section>
  </main>;
}
