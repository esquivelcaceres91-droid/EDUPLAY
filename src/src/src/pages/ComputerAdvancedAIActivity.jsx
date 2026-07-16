import "../styles/computer-ai-unit.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Apple,
  ArrowLeft,
  Bike,
  Bird,
  Car,
  Cat,
  CheckCircle2,
  Dog,
  Heart,
  Monitor,
  Plane,
  XCircle,
} from "lucide-react";

const examples = [
  { id: "dog", label: "Perro", category: "animals", icon: Dog },
  { id: "cat", label: "Gato", category: "animals", icon: Cat },
  { id: "bird", label: "Pájaro", category: "animals", icon: Bird },
  { id: "car", label: "Carro", category: "objects", icon: Car },
  { id: "apple", label: "Manzana", category: "objects", icon: Apple },
  { id: "plane", label: "Avión", category: "objects", icon: Plane },
  { id: "bike", label: "Bicicleta", category: "objects", icon: Bike },
];

export default function ComputerAdvancedAIActivity() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [classified, setClassified] = useState({});
  const [wrong, setWrong] = useState(null);

  const pending = useMemo(
    () => examples.filter((item) => !classified[item.id]),
    [classified]
  );
  const completed = pending.length === 0;

  const place = (category) => {
    if (!selected) return;
    const item = examples.find((entry) => entry.id === selected);
    if (item.category !== category) {
      setWrong(category);
      window.setTimeout(() => setWrong(null), 600);
      return;
    }
    setClassified((current) => ({ ...current, [selected]: category }));
    setSelected(null);
  };

  const inCategory = (category) =>
    examples.filter((item) => classified[item.id] === category);

  return (
    <main className="ai-screen">
      <header className="ai-topbar">
        <div className="ai-nav">
          <button onClick={() => navigate("/computer/advanced/unit/2/lesson")}>
            <ArrowLeft size={21} /> <span>Volver</span>
          </button>
          <button onClick={() => navigate("/computer")}>
            <Monitor size={20} /> <span>Mundo</span>
          </button>
        </div>
        <div className="ai-heading">
          <span>Computación · Avanzado</span>
          <strong>Entrena a la Inteligencia Artificial</strong>
        </div>
        <div className="ai-hearts">{[1,2,3].map((n)=><Heart key={n} size={22} fill="currentColor" />)}</div>
      </header>

      <section className="ai-shell">
        <motion.article className="ai-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ai-panel-header">
            <div>
              <span>Actividad de clasificación</span>
              <h1>Enséñale a reconocer categorías</h1>
              <p>Selecciona una tarjeta y colócala en Animales u Objetos.</p>
            </div>
            <div className="ai-counter"><strong>{Object.keys(classified).length}/7</strong><span>Ejemplos</span></div>
          </div>

          <div className="ai-training-layout">
            <section className="ai-example-panel">
              <h2>Ejemplos sin clasificar</h2>
              <div className="ai-example-grid">
                {pending.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      className={`ai-example ${selected === item.id ? "selected" : ""}`}
                      onClick={() => setSelected(selected === item.id ? null : item.id)}
                      whileHover={{ y: -5, scale: 1.03 }}
                    >
                      <Icon size={34} /><strong>{item.label}</strong>
                    </motion.button>
                  );
                })}
                {pending.length === 0 && <div className="ai-empty"><CheckCircle2 size={35} />La IA recibió todos los ejemplos.</div>}
              </div>
            </section>

            <section className="ai-category-panel">
              {[{ id: "animals", title: "Animales" }, { id: "objects", title: "Objetos" }].map((category) => (
                <motion.button
                  key={category.id}
                  className={`ai-category ${wrong === category.id ? "wrong" : ""}`}
                  onClick={() => place(category.id)}
                  animate={wrong === category.id ? { x: [-6, 6, -4, 4, 0] } : {}}
                >
                  <div className="ai-category-title">
                    <strong>{category.title}</strong>
                    <span>{inCategory(category.id).length}</span>
                  </div>
                  <div className="ai-category-items">
                    {inCategory(category.id).map((item) => {
                      const Icon = item.icon;
                      return <span key={item.id}><Icon size={22} />{item.label}<CheckCircle2 size={18} /></span>;
                    })}
                    {inCategory(category.id).length === 0 && <small>{wrong === category.id ? <><XCircle size={18} /> Categoría incorrecta</> : "Toca aquí para clasificar"}</small>}
                  </div>
                </motion.button>
              ))}
            </section>
          </div>

          {completed && (
            <motion.div className="ai-feedback success" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
              <CheckCircle2 size={34} />
              <div><strong>¡Entrenamiento completado!</strong><span>La IA aprendió a distinguir animales y objetos.</span></div>
            </motion.div>
          )}

          <div className="ai-actions"><div /><button className="ai-primary" disabled={!completed} onClick={() => navigate("/computer/advanced/unit/2/game")}>Iniciar minijuego</button></div>
        </motion.article>
      </section>
    </main>
  );
}
