import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles, Volume2 } from "lucide-react";
import { getAdvancedUnit, shuffle } from "../data/englishAdvancedData";
import { updateUnitProgress } from "../utils/progressManager";
import { speakEnglish } from "../utils/englishSpeech";
import "../styles/english-advanced.css";

export default function EnglishAdvancedGame() {
  const navigate = useNavigate();
  const { unitId } = useParams();
  const unit = getAdvancedUnit(unitId);
  const items = useMemo(() => shuffle(unit.gameItems), [unit.id]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const item = items[index];
  const options = useMemo(() => shuffle(item.options), [item]);

  const choose = (option) => {
    if (correct) return;
    setSelected(option);

    if (option === item.answer) {
      setCorrect(true);
      setMessage("¡Excelente! Respuesta correcta.");
      speakEnglish(option);
    } else {
      setMessage("Casi. Escucha otra vez y prueba una opción diferente.");
    }
  };

  const next = () => {
    if (index === items.length - 1) {
      updateUnitProgress("english", "advanced", unit.id, 70);
      navigate(`/english/advanced/unit/${unit.id}/quiz`);
      return;
    }

    setIndex((current) => current + 1);
    setCorrect(false);
    setSelected("");
    setMessage("");
  };

  return (
    <main className={`ea-stage ea-${unit.theme}`}>
      <button className="ea-world-back" onClick={() => navigate("/english")}>
        <ArrowLeft /> Volver a niveles
      </button>

      <section className="ea-panel ea-game ea-game-colorful">
        <div className="ea-game-kicker">
          <Sparkles /> MINIJUEGO · {index + 1}/{items.length}
        </div>
        <h1>{unit.gameTitle}</h1>
        <p>{unit.gameHelp}</p>

        <div className="ea-game-prompt">
          <button type="button" onClick={() => speakEnglish(item.prompt)}>
            <Volume2 /> Escuchar pronunciación
          </button>
          <h2>{item.prompt}</h2>
          <span>Escucha la frase y elige la respuesta que mejor continúa la aventura.</span>
        </div>

        <div className="ea-options ea-color-options">
          {options.map((option, optionIndex) => {
            const state =
              selected === option
                ? option === item.answer
                  ? "right"
                  : "wrong"
                : "";

            return (
              <motion.button
                key={option}
                className={state}
                onClick={() => choose(option)}
                whileHover={{ y: -4, scale: 1.015 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="ea-option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                <span>{option}</span>
              </motion.button>
            );
          })}
        </div>

        {message && <p className={correct ? "ea-good" : "ea-bad"}>{message}</p>}
        {correct && (
          <button className="ea-primary" onClick={next}>
            {index === items.length - 1 ? "Ir a evaluación" : "Siguiente reto"}
          </button>
        )}
      </section>
    </main>
  );
}
