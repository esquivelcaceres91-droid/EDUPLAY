import "../styles/computer-advanced-unit.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Cog,
  Cpu,
  Heart,
  Monitor,
  Radar,
  XCircle,
} from "lucide-react";

const robotParts = [
  {
    id: "sensor",
    label: "Sensor",
    icon: Radar,
    slot: "head",
    description: "Detecta obstáculos",
  },
  {
    id: "processor",
    label: "Procesador",
    icon: Cpu,
    slot: "body",
    description: "Procesa instrucciones",
  },
  {
    id: "motor",
    label: "Motores",
    icon: Cog,
    slot: "wheels",
    description: "Producen movimiento",
  },
];

const robotSlots = [
  {
    id: "head",
    title: "Cabeza del robot",
    hint: "Necesita detectar el entorno",
  },
  {
    id: "body",
    title: "Cuerpo del robot",
    hint: "Necesita pensar y decidir",
  },
  {
    id: "wheels",
    title: "Base del robot",
    hint: "Necesita poder moverse",
  },
];

export default function ComputerAdvancedActivity() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [selectedPart, setSelectedPart] = useState(null);
  const [placements, setPlacements] = useState({});
  const [wrongSlot, setWrongSlot] = useState(null);

  const availableParts = useMemo(() => {
    return robotParts.filter(
      (part) => !placements[part.id]
    );
  }, [placements]);

  const completed =
    Object.keys(placements).length === robotParts.length;

  const getPlacedPart = (slotId) => {
    const partId = Object.keys(placements).find(
      (key) => placements[key] === slotId
    );

    return robotParts.find((part) => part.id === partId);
  };

  const placePart = (slotId) => {
    if (!selectedPart) return;

    const part = robotParts.find(
      (item) => item.id === selectedPart
    );

    if (part.slot !== slotId) {
      setWrongSlot(slotId);
      window.setTimeout(() => setWrongSlot(null), 650);
      return;
    }

    setPlacements((current) => ({
      ...current,
      [selectedPart]: slotId,
    }));

    setSelectedPart(null);
  };

  return (
    <main className="robotics-screen">
      <header className="robotics-topbar">
        <div className="robotics-nav">
          <button
            type="button"
            className="robotics-nav-button"
            onClick={() =>
              navigate(
                `/computer/advanced/unit/${currentUnit}/lesson`
              )
            }
          >
            <ArrowLeft size={21} />
            <span>Volver</span>
          </button>

          <button
            type="button"
            className="robotics-nav-button"
            onClick={() => navigate("/computer")}
          >
            <Monitor size={20} />
            <span>Mundo</span>
          </button>
        </div>

        <div className="robotics-heading">
          <span>Computación · Avanzado</span>
          <strong>Laboratorio de Robótica</strong>
        </div>

        <div className="robotics-hearts">
          <Heart size={22} fill="currentColor" />
          <Heart size={22} fill="currentColor" />
          <Heart size={22} fill="currentColor" />
        </div>
      </header>

      <section className="robotics-shell">
        <motion.article
          className="robotics-main-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="robotics-panel-header">
            <div>
              <span>Actividad de ensamblaje</span>
              <h1>Construye el robot</h1>
              <p>
                Selecciona cada componente y colócalo en la
                parte correcta del robot.
              </p>
            </div>

            <div className="robotics-counter">
              <strong>
                {Object.keys(placements).length}/3
              </strong>
              <span>Componentes</span>
            </div>
          </div>

          <div className="robot-builder-layout">
            <section className="robot-parts-panel">
              <h2>Componentes disponibles</h2>

              <div className="robot-parts-list">
                {availableParts.map((part) => {
                  const PartIcon = part.icon;
                  const selected =
                    selectedPart === part.id;

                  return (
                    <motion.button
                      type="button"
                      key={part.id}
                      className={`robot-part-button ${
                        selected
                          ? "robot-part-selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedPart(
                          selected ? null : part.id
                        )
                      }
                      whileHover={{ y: -5, scale: 1.025 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span>
                        <PartIcon size={32} />
                      </span>

                      <div>
                        <strong>{part.label}</strong>
                        <small>{part.description}</small>
                      </div>
                    </motion.button>
                  );
                })}

                {availableParts.length === 0 && (
                  <div className="robot-parts-empty">
                    <CheckCircle2 size={34} />
                    Todos los componentes fueron instalados.
                  </div>
                )}
              </div>
            </section>

            <section className="robot-assembly-panel">
              <div className="robot-assembly-stage">
                <div className="robot-stage-grid" />

                {robotSlots.map((slot) => {
                  const placed = getPlacedPart(slot.id);
                  const PartIcon = placed?.icon;
                  const wrong = wrongSlot === slot.id;

                  return (
                    <motion.button
                      type="button"
                      key={slot.id}
                      className={`robot-slot robot-slot-${slot.id} ${
                        placed ? "robot-slot-complete" : ""
                      } ${
                        wrong ? "robot-slot-wrong" : ""
                      }`}
                      onClick={() => placePart(slot.id)}
                      animate={
                        wrong
                          ? { x: [-7, 7, -5, 5, 0] }
                          : {}
                      }
                    >
                      {placed ? (
                        <>
                          <PartIcon size={31} />
                          <strong>{placed.label}</strong>
                          <CheckCircle2 size={21} />
                        </>
                      ) : (
                        <>
                          <Bot size={30} />
                          <strong>{slot.title}</strong>
                          <small>
                            {wrong
                              ? "Ese componente no va aquí"
                              : slot.hint}
                          </small>
                        </>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </div>

          {completed && (
            <motion.div
              className="robotics-feedback robotics-feedback-correct"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={34} />
              <div>
                <strong>¡Robot ensamblado!</strong>
                <span>
                  El sensor detecta, el procesador decide y
                  los motores mueven el robot.
                </span>
              </div>
            </motion.div>
          )}

          <div className="robotics-actions">
            <div />

            <motion.button
              type="button"
              className="robotics-primary"
              disabled={!completed}
              onClick={() =>
                navigate(
                  `/computer/advanced/unit/${currentUnit}/game`
                )
              }
            >
              Programar robot
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
