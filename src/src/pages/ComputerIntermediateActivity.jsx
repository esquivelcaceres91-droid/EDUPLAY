import "../styles/computer-intermediate-activity.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  FilePlus2,
  Heart,
  ImagePlus,
  Save,
  Type,
  XCircle,
  Rows3,
  Columns3,
  Square,
  Calculator,
  Heading1,
  AlignLeft,
  Presentation,
  Monitor,
  FileText,
  FileSpreadsheet,
  School,
} from "lucide-react";

const matchingActivities = {
  1: {
    heading: "Actividad de Microsoft Word",
    title: "Relaciona cada herramienta",
    instruction:
      "Arrastra cada herramienta hasta su función. En celular, toca una herramienta y luego toca su respuesta.",
    success:
      "Ya reconoces las herramientas básicas de Word.",
    items: [
      { id: "new", label: "Documento nuevo", icon: FilePlus2, target: "create" },
      { id: "save", label: "Guardar", icon: Save, target: "store" },
      { id: "type", label: "Escribir", icon: Type, target: "write" },
      { id: "image", label: "Insertar imagen", icon: ImagePlus, target: "picture" },
    ],
    targets: [
      { id: "create", label: "Crear un archivo nuevo" },
      { id: "store", label: "Conservar el trabajo" },
      { id: "write", label: "Agregar texto al documento" },
      { id: "picture", label: "Colocar una fotografía" },
    ],
  },
  2: {
    heading: "Actividad de Microsoft Excel",
    title: "Reconoce las partes de una hoja",
    instruction:
      "Relaciona cada elemento de Excel con su descripción correcta.",
    success:
      "Ya reconoces las partes principales de una hoja de Excel.",
    items: [
      { id: "row", label: "Fila", icon: Rows3, target: "horizontal" },
      { id: "column", label: "Columna", icon: Columns3, target: "vertical" },
      { id: "cell", label: "Celda", icon: Square, target: "intersection" },
      { id: "sum", label: "SUMA", icon: Calculator, target: "calculate" },
    ],
    targets: [
      { id: "intersection", label: "Espacio donde escribimos un dato" },
      { id: "calculate", label: "Función para agregar varios números" },
      { id: "vertical", label: "Grupo de celdas de arriba hacia abajo" },
      { id: "horizontal", label: "Grupo de celdas de izquierda a derecha" },
    ],
  },
};

const slideElements = [
  {
    id: "title",
    label: "Título",
    icon: Heading1,
    target: "top",
  },
  {
    id: "text",
    label: "Texto",
    icon: AlignLeft,
    target: "body",
  },
  {
    id: "image",
    label: "Imagen",
    icon: ImagePlus,
    target: "visual",
  },
];

function PowerPointActivity({ currentUnit, navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const [placements, setPlacements] = useState({});
  const [wrongSlot, setWrongSlot] = useState(null);

  const available = slideElements.filter(
    (item) => !placements[item.id]
  );

  const complete =
    Object.keys(placements).length === slideElements.length;

  const placeElement = (slotId) => {
    if (!selectedId) return;

    const element = slideElements.find(
      (item) => item.id === selectedId
    );

    if (element.target !== slotId) {
      setWrongSlot(slotId);
      window.setTimeout(() => setWrongSlot(null), 600);
      return;
    }

    setPlacements((current) => ({
      ...current,
      [selectedId]: slotId,
    }));
    setSelectedId(null);
  };

  const getPlaced = (slotId) => {
    const id = Object.keys(placements).find(
      (key) => placements[key] === slotId
    );
    return slideElements.find((item) => item.id === id);
  };

  const slots = [
    {
      id: "top",
      label: "Zona superior",
      hint: "Aquí va el tema principal",
    },
    {
      id: "body",
      label: "Zona de contenido",
      hint: "Aquí explicamos la idea",
    },
    {
      id: "visual",
      label: "Zona visual",
      hint: "Aquí colocamos una fotografía",
    },
  ];

  return (
    <main className="intermediate-activity-screen">
      <header className="intermediate-activity-topbar">
        <div className="intermediate-nav-buttons">
        <motion.button
          type="button"
          className="intermediate-activity-back"
          onClick={() =>
            navigate(`/computer/intermediate/unit/${currentUnit}/lesson`)
          }
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

        <motion.button
          type="button"
          className="intermediate-activity-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Monitor size={21} />
          <span>Mundo</span>
        </motion.button>
      </div>

        <div className="intermediate-activity-heading">
          <span>Computación · Intermedio</span>
          <strong>Diseña una diapositiva</strong>
        </div>

        <div className="intermediate-activity-hearts">
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="intermediate-activity-shell">
        <motion.article
          className="intermediate-activity-card ppt-activity-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="intermediate-activity-header">
            <div>
              <span>Actividad creativa</span>
              <h1>Construye una diapositiva</h1>
              <p>
                Selecciona un elemento y colócalo en la zona correcta.
              </p>
            </div>

            <div className="intermediate-activity-counter">
              <strong>
                {Object.keys(placements).length}/3
              </strong>
              <span>Elementos</span>
            </div>
          </div>

          <div className="ppt-builder-layout">
            <section className="ppt-elements-panel">
              <h2>Elementos disponibles</h2>

              <div className="ppt-elements-list">
                {available.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.button
                      type="button"
                      key={item.id}
                      className={`ppt-element-button ${
                        selectedId === item.id
                          ? "ppt-element-selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedId(
                          selectedId === item.id
                            ? null
                            : item.id
                        )
                      }
                      whileHover={{ y: -5, scale: 1.025 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon size={30} />
                      <strong>{item.label}</strong>
                    </motion.button>
                  );
                })}

                {available.length === 0 && (
                  <div className="intermediate-toolbox-empty">
                    <CheckCircle2 size={32} />
                    Diapositiva completada.
                  </div>
                )}
              </div>
            </section>

            <section className="ppt-slide-panel">
              <div className="ppt-slide-window">
                <div className="ppt-slide-toolbar">
                  <span />
                  <span />
                  <span />
                  <strong>Mi presentación</strong>
                </div>

                <div className="ppt-slide-canvas">
                  {slots.map((slot) => {
                    const placed = getPlaced(slot.id);
                    const Icon = placed?.icon;
                    const wrong = wrongSlot === slot.id;

                    return (
                      <motion.button
                        type="button"
                        key={slot.id}
                        className={`ppt-slide-slot ppt-slot-${slot.id} ${
                          placed ? "ppt-slot-filled" : ""
                        } ${wrong ? "ppt-slot-wrong" : ""}`}
                        onClick={() => placeElement(slot.id)}
                        animate={
                          wrong
                            ? { x: [-6, 6, -4, 4, 0] }
                            : {}
                        }
                      >
                        {placed ? (
                          <>
                            <Icon size={28} />
                            <strong>{placed.label}</strong>
                            <CheckCircle2 size={20} />
                          </>
                        ) : (
                          <>
                            <span>{slot.label}</span>
                            <small>
                              {wrong
                                ? "Ese elemento no va aquí"
                                : slot.hint}
                            </small>
                          </>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {complete && (
            <motion.div
              className="intermediate-activity-success"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Presentation size={35} />
              <div>
                <strong>¡Diapositiva terminada!</strong>
                <span>
                  Colocaste el título, el texto y la imagen correctamente.
                </span>
              </div>
            </motion.div>
          )}

          <div className="intermediate-activity-actions">
            <motion.button
              type="button"
              className="intermediate-activity-continue"
              disabled={!complete}
              onClick={() =>
                navigate(`/computer/intermediate/unit/${currentUnit}/game`)
              }
            >
              Ir al minijuego
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}

function MatchingActivity({ currentUnit, navigate }) {
  const activity =
    matchingActivities[currentUnit] || matchingActivities[1];

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [matches, setMatches] = useState({});
  const [wrongTargetId, setWrongTargetId] = useState(null);

  const completedCount = Object.keys(matches).length;
  const isCompleted =
    completedCount === activity.items.length;

  const availableItems = useMemo(() => {
    return activity.items.filter(
      (item) => !matches[item.id]
    );
  }, [activity.items, matches]);

  const getItem = (itemId) =>
    activity.items.find((item) => item.id === itemId);

  const matchItemToTarget = (itemId, targetId) => {
    if (!itemId) return;

    const item = getItem(itemId);

    if (!item) return;

    if (item.target !== targetId) {
      setWrongTargetId(targetId);
      window.setTimeout(() => setWrongTargetId(null), 650);
      return;
    }

    setMatches((current) => ({
      ...current,
      [itemId]: targetId,
    }));

    setSelectedItemId(null);
    setDraggedItemId(null);
  };

  const getMatchedItem = (targetId) => {
    const matchedItemId = Object.keys(matches).find(
      (itemId) => matches[itemId] === targetId
    );

    return getItem(matchedItemId);
  };

  return (
    <main className="intermediate-activity-screen">
      <header className="intermediate-activity-topbar">
        <div className="intermediate-nav-buttons">
        <motion.button
          type="button"
          className="intermediate-activity-back"
          onClick={() =>
            navigate(`/computer/intermediate/unit/${currentUnit}/lesson`)
          }
        >
          <ArrowLeft size={22} />
          <span>Volver</span>
        </motion.button>

        <motion.button
          type="button"
          className="intermediate-activity-back"
          onClick={() => navigate("/computer")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Monitor size={21} />
          <span>Mundo</span>
        </motion.button>
      </div>

        <div className="intermediate-activity-heading">
          <span>Computación · Intermedio</span>
          <strong>{activity.heading}</strong>
        </div>

        <div className="intermediate-activity-hearts">
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="intermediate-activity-shell">
        <motion.article
          className="intermediate-activity-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="intermediate-activity-header">
            <div>
              <span>Actividad interactiva</span>
              <h1>{activity.title}</h1>
              <p>{activity.instruction}</p>
            </div>

            <div className="intermediate-activity-counter">
              <strong>
                {completedCount}/{activity.items.length}
              </strong>
              <span>Completadas</span>
            </div>
          </div>

          <div className="intermediate-activity-workspace">
            <section className="intermediate-toolbox">
              <h2>Elementos</h2>
              <div className="intermediate-tool-list">
                {availableItems.map((item) => {
                  const ItemIcon = item.icon;
                  const selected =
                    selectedItemId === item.id;

                  return (
                    <motion.button
                      type="button"
                      key={item.id}
                      draggable
                      className={`intermediate-tool-card ${
                        selected
                          ? "intermediate-tool-selected"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedItemId(
                          selected ? null : item.id
                        )
                      }
                      onDragStart={(event) => {
                        setDraggedItemId(item.id);
                        event.dataTransfer.setData(
                          "text/plain",
                          item.id
                        );
                      }}
                    >
                      <span>
                        <ItemIcon size={32} />
                      </span>
                      <strong>{item.label}</strong>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            <section className="intermediate-targets">
              <h2>Descripciones</h2>

              <div className="intermediate-target-list">
                {activity.targets.map((target) => {
                  const matchedItem =
                    getMatchedItem(target.id);
                  const MatchedIcon = matchedItem?.icon;
                  const wrong =
                    wrongTargetId === target.id;

                  return (
                    <motion.button
                      type="button"
                      key={target.id}
                      className={`intermediate-target-card ${
                        matchedItem
                          ? "intermediate-target-correct"
                          : ""
                      } ${
                        wrong
                          ? "intermediate-target-wrong"
                          : ""
                      }`}
                      onClick={() =>
                        matchItemToTarget(
                          selectedItemId,
                          target.id
                        )
                      }
                      onDragOver={(event) =>
                        event.preventDefault()
                      }
                      onDrop={(event) => {
                        event.preventDefault();
                        matchItemToTarget(
                          draggedItemId ||
                            event.dataTransfer.getData(
                              "text/plain"
                            ),
                          target.id
                        );
                      }}
                    >
                      <div>
                        <span>Descripción</span>
                        <strong>{target.label}</strong>
                      </div>

                      {matchedItem ? (
                        <div className="intermediate-target-match">
                          <MatchedIcon size={25} />
                          <span>{matchedItem.label}</span>
                          <CheckCircle2 size={22} />
                        </div>
                      ) : (
                        <div className="intermediate-target-drop">
                          {wrong ? (
                            <>
                              <XCircle size={24} />
                              Intenta otra vez
                            </>
                          ) : (
                            "Coloca aquí"
                          )}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </div>

          {isCompleted && (
            <div className="intermediate-activity-success">
              <CheckCircle2 size={35} />
              <div>
                <strong>¡Excelente trabajo!</strong>
                <span>{activity.success}</span>
              </div>
            </div>
          )}

          <div className="intermediate-activity-actions">
            <button
              type="button"
              className="intermediate-activity-continue"
              disabled={!isCompleted}
              onClick={() =>
                navigate(`/computer/intermediate/unit/${currentUnit}/game`)
              }
            >
              Ir al minijuego
            </button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}


const finalTasks = [
  {
    id: "report",
    task: "Escribir un informe sobre el proyecto",
    tool: "word",
    label: "Microsoft Word",
    icon: FileText,
  },
  {
    id: "grades",
    task: "Organizar nombres y notas en una tabla",
    tool: "excel",
    label: "Microsoft Excel",
    icon: FileSpreadsheet,
  },
  {
    id: "presentation",
    task: "Mostrar los resultados con diapositivas",
    tool: "powerpoint",
    label: "Microsoft PowerPoint",
    icon: Presentation,
  },
];

const finalTools = [
  {
    id: "powerpoint",
    label: "PowerPoint",
    icon: Presentation,
  },
  {
    id: "word",
    label: "Word",
    icon: FileText,
  },
  {
    id: "excel",
    label: "Excel",
    icon: FileSpreadsheet,
  },
];

function FinalChallengeActivity({ currentUnit, navigate }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [answers, setAnswers] = useState({});
  const [wrongTask, setWrongTask] = useState(null);

  const complete =
    Object.keys(answers).length === finalTasks.length;

  const chooseTask = (task) => {
    if (!selectedTool || answers[task.id]) return;

    if (selectedTool !== task.tool) {
      setWrongTask(task.id);
      window.setTimeout(() => setWrongTask(null), 650);
      return;
    }

    setAnswers((current) => ({
      ...current,
      [task.id]: selectedTool,
    }));

    setSelectedTool(null);
  };

  return (
    <main className="intermediate-activity-screen">
      <header className="intermediate-activity-topbar">
        <div className="intermediate-nav-buttons">
          <motion.button
            type="button"
            className="intermediate-activity-back"
            onClick={() =>
              navigate(
                `/computer/intermediate/unit/${currentUnit}/lesson`
              )
            }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <ArrowLeft size={22} />
            <span>Volver</span>
          </motion.button>

          <motion.button
            type="button"
            className="intermediate-activity-back"
            onClick={() => navigate("/computer")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Monitor size={21} />
            <span>Mundo</span>
          </motion.button>
        </div>

        <div className="intermediate-activity-heading">
          <span>Computación · Intermedio</span>
          <strong>Reto Final</strong>
        </div>

        <div className="intermediate-activity-hearts">
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <Heart size={23} fill="currentColor" />
          <span>3</span>
        </div>
      </header>

      <section className="intermediate-activity-shell">
        <motion.article
          className="intermediate-activity-card final-activity-card"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <div className="intermediate-activity-header">
            <div>
              <span>Misión integradora</span>
              <h1>Ayuda a preparar un proyecto escolar</h1>
              <p>
                Elige la herramienta correcta para cada tarea.
              </p>
            </div>

            <div className="intermediate-activity-counter">
              <strong>
                {Object.keys(answers).length}/3
              </strong>
              <span>Tareas</span>
            </div>
          </div>

          <div className="final-activity-story">
            <School size={34} />
            <div>
              <strong>La escuela necesita tu ayuda</strong>
              <span>
                Debes escribir un informe, organizar las notas
                y preparar una presentación.
              </span>
            </div>
          </div>

          <div className="final-activity-tools">
            {finalTools.map((tool) => {
              const ToolIcon = tool.icon;

              return (
                <motion.button
                  type="button"
                  key={tool.id}
                  className={`final-tool-button ${
                    selectedTool === tool.id
                      ? "final-tool-selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedTool(
                      selectedTool === tool.id
                        ? null
                        : tool.id
                    )
                  }
                  whileHover={{ y: -5, scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ToolIcon size={32} />
                  <strong>{tool.label}</strong>
                </motion.button>
              );
            })}
          </div>

          <div className="final-task-list">
            {finalTasks.map((task, index) => {
              const answeredTool = finalTools.find(
                (tool) => tool.id === answers[task.id]
              );
              const AnswerIcon = answeredTool?.icon;
              const wrong = wrongTask === task.id;

              return (
                <motion.button
                  type="button"
                  key={task.id}
                  className={`final-task-card ${
                    answeredTool
                      ? "final-task-complete"
                      : ""
                  } ${
                    wrong ? "final-task-wrong" : ""
                  }`}
                  onClick={() => chooseTask(task)}
                  animate={
                    wrong
                      ? { x: [-7, 7, -5, 5, 0] }
                      : {}
                  }
                >
                  <span className="final-task-number">
                    {index + 1}
                  </span>

                  <div>
                    <small>Tarea</small>
                    <strong>{task.task}</strong>
                  </div>

                  {answeredTool ? (
                    <div className="final-task-answer">
                      <AnswerIcon size={24} />
                      <span>{answeredTool.label}</span>
                      <CheckCircle2 size={21} />
                    </div>
                  ) : (
                    <div className="final-task-empty">
                      {wrong
                        ? "Herramienta incorrecta"
                        : "Selecciona una herramienta"}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {complete && (
            <motion.div
              className="intermediate-activity-success"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle2 size={35} />
              <div>
                <strong>¡Proyecto organizado!</strong>
                <span>
                  Elegiste correctamente Word, Excel y
                  PowerPoint.
                </span>
              </div>
            </motion.div>
          )}

          <div className="intermediate-activity-actions">
            <motion.button
              type="button"
              className="intermediate-activity-continue"
              disabled={!complete}
              onClick={() =>
                navigate(
                  `/computer/intermediate/unit/${currentUnit}/game`
                )
              }
            >
              Iniciar reto digital
            </motion.button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}

export default function ComputerIntermediateActivity() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const currentUnit = Number(unitId || 1);

  return currentUnit === 4 ? (
    <FinalChallengeActivity
      currentUnit={currentUnit}
      navigate={navigate}
    />
  ) : currentUnit === 3 ? (
    <PowerPointActivity
      currentUnit={currentUnit}
      navigate={navigate}
    />
  ) : (
    <MatchingActivity
      currentUnit={currentUnit}
      navigate={navigate}
    />
  );
}
