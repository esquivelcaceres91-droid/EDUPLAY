import "../styles/computer-advanced-unit.css";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  CheckCircle2,
  Heart,
  Monitor,
  Play,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";

const START = { x: 0, y: 2 };
const GOAL = { x: 2, y: 0 };
const OBSTACLE = { x: 1, y: 1 };

const commands = [
  {
    id: "up",
    label: "Arriba",
    icon: ArrowUp,
    dx: 0,
    dy: -1,
  },
  {
    id: "right",
    label: "Derecha",
    icon: ArrowRight,
    dx: 1,
    dy: 0,
  },
];

export default function ComputerAdvancedGame() {
  const navigate = useNavigate();
  const { unitId } = useParams();

  const currentUnit = Number(unitId || 1);

  const [program, setProgram] = useState([]);
  const [robotPosition, setRobotPosition] =
    useState(START);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const canRun =
    program.length >= 4 &&
    program.length <= 6 &&
    !running;

  const cells = useMemo(() => {
    const resultCells = [];

    for (let y = 0; y < 3; y += 1) {
      for (let x = 0; x < 3; x += 1) {
        resultCells.push({ x, y });
      }
    }

    return resultCells;
  }, []);

  const addCommand = (commandId) => {
    if (running || program.length >= 6) return;

    setProgram((current) => [
      ...current,
      commandId,
    ]);

    setResult(null);
  };

  const removeLastCommand = () => {
    if (running) return;

    setProgram((current) => current.slice(0, -1));
    setResult(null);
  };

  const resetGame = () => {
    setProgram([]);
    setRobotPosition(START);
    setRunning(false);
    setResult(null);
  };

  const executeProgram = async () => {
    if (!canRun) return;

    setRunning(true);
    setResult(null);
    setRobotPosition(START);

    let position = { ...START };
    let failed = false;

    for (const commandId of program) {
      const command = commands.find(
        (item) => item.id === commandId
      );

      const nextPosition = {
        x: position.x + command.dx,
        y: position.y + command.dy,
      };

      const outside =
        nextPosition.x < 0 ||
        nextPosition.x > 2 ||
        nextPosition.y < 0 ||
        nextPosition.y > 2;

      const hitsObstacle =
        nextPosition.x === OBSTACLE.x &&
        nextPosition.y === OBSTACLE.y;

      await new Promise((resolve) =>
        window.setTimeout(resolve, 520)
      );

      if (outside || hitsObstacle) {
        failed = true;
        break;
      }

      position = nextPosition;
      setRobotPosition(position);
    }

    const reachedGoal =
      !failed &&
      position.x === GOAL.x &&
      position.y === GOAL.y;

    setResult(reachedGoal ? "success" : "failed");
    setRunning(false);
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
                `/computer/advanced/unit/${currentUnit}/activity`
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
          <strong>Misión del Robot</strong>
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
              <span>Minijuego de programación</span>
              <h1>Lleva el robot hasta la energía</h1>
              <p>
                Crea una ruta usando los comandos. Evita el
                obstáculo del centro.
              </p>
            </div>

            <div className="robotics-counter">
              <strong>{program.length}/6</strong>
              <span>Comandos</span>
            </div>
          </div>

          <div className="robot-maze-layout">
            <section className="robot-command-panel">
              <h2>Comandos</h2>

              <div className="robot-command-buttons">
                {commands.map((command) => {
                  const CommandIcon = command.icon;

                  return (
                    <motion.button
                      type="button"
                      key={command.id}
                      className="robot-command-button"
                      disabled={running}
                      onClick={() =>
                        addCommand(command.id)
                      }
                      whileHover={
                        running
                          ? {}
                          : { y: -4, scale: 1.025 }
                      }
                      whileTap={
                        running ? {} : { scale: 0.97 }
                      }
                    >
                      <CommandIcon size={27} />
                      <strong>{command.label}</strong>
                    </motion.button>
                  );
                })}
              </div>

              <div className="robot-program-list">
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const commandId = program[index];
                  const command = commands.find(
                    (item) => item.id === commandId
                  );
                  const CommandIcon = command?.icon;

                  return (
                    <div
                      className={`robot-program-step ${
                        command
                          ? "robot-program-step-filled"
                          : ""
                      }`}
                      key={index}
                    >
                      <span>{index + 1}</span>

                      {command ? (
                        <>
                          <CommandIcon size={21} />
                          <strong>{command.label}</strong>
                        </>
                      ) : (
                        <small>Vacío</small>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="robotics-secondary robot-remove-command"
                disabled={
                  program.length === 0 || running
                }
                onClick={removeLastCommand}
              >
                Quitar último comando
              </button>
            </section>

            <section className="robot-maze-panel">
              <div className="robot-maze-board">
                {cells.map((cell) => {
                  const isStart =
                    cell.x === START.x &&
                    cell.y === START.y;

                  const isGoal =
                    cell.x === GOAL.x &&
                    cell.y === GOAL.y;

                  const isObstacle =
                    cell.x === OBSTACLE.x &&
                    cell.y === OBSTACLE.y;

                  const hasRobot =
                    cell.x === robotPosition.x &&
                    cell.y === robotPosition.y;

                  return (
                    <div
                      className={`robot-maze-cell ${
                        isStart ? "robot-cell-start" : ""
                      } ${
                        isGoal ? "robot-cell-goal" : ""
                      } ${
                        isObstacle
                          ? "robot-cell-obstacle"
                          : ""
                      }`}
                      key={`${cell.x}-${cell.y}`}
                    >
                      {isGoal && <Target size={35} />}

                      {isObstacle && (
                        <XCircle size={39} />
                      )}

                      {hasRobot && (
                        <motion.div
                          className="robot-maze-player"
                          layout
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 18,
                          }}
                        >
                          <Bot size={42} />
                        </motion.div>
                      )}

                      {isStart && !hasRobot && (
                        <span>Inicio</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="robot-maze-legend">
                <span>
                  <Bot size={19} />
                  Robot
                </span>

                <span>
                  <Target size={19} />
                  Energía
                </span>

                <span>
                  <XCircle size={19} />
                  Obstáculo
                </span>
              </div>
            </section>
          </div>

          {result && (
            <motion.div
              className={`robotics-feedback ${
                result === "success"
                  ? "robotics-feedback-correct"
                  : "robotics-feedback-wrong"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {result === "success" ? (
                <CheckCircle2 size={34} />
              ) : (
                <XCircle size={34} />
              )}

              <div>
                <strong>
                  {result === "success"
                    ? "¡Misión completada!"
                    : "El robot no llegó a la energía"}
                </strong>

                <span>
                  {result === "success"
                    ? "Tu programa evitó el obstáculo y alcanzó el objetivo."
                    : "Cambia los comandos y vuelve a ejecutar el programa."}
                </span>
              </div>
            </motion.div>
          )}

          <div className="robotics-actions">
            <motion.button
              type="button"
              className="robotics-secondary"
              onClick={resetGame}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <RotateCcw size={20} />
              Reiniciar
            </motion.button>

            {result === "success" ? (
              <motion.button
                type="button"
                className="robotics-primary"
                onClick={() =>
                  navigate(
                    `/computer/advanced/unit/${currentUnit}/quiz`
                  )
                }
              >
                Ir a la evaluación
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="robotics-primary"
                disabled={!canRun}
                onClick={executeProgram}
              >
                <Play size={20} fill="currentColor" />
                {running
                  ? "Ejecutando..."
                  : "Ejecutar programa"}
              </motion.button>
            )}
          </div>
        </motion.article>
      </section>
    </main>
  );
}
