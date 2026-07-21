import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  PawPrint,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateUnitProgress } from "../utils/progressManager";
import "../styles/english-animals-unit.css";

const MISSIONS = [
  { word: "LION", emoji: "🦁", home: "SAVANNA" },
  { word: "ELEPHANT", emoji: "🐘", home: "SAVANNA" },
  { word: "MONKEY", emoji: "🐒", home: "JUNGLE" },
  { word: "TIGER", emoji: "🐯", home: "JUNGLE" },
  { word: "FROG", emoji: "🐸", home: "POND" },
  { word: "BIRD", emoji: "🦜", home: "SKY" },
  { word: "DOG", emoji: "🐶", home: "HOME" },
  { word: "CAT", emoji: "🐱", home: "HOME" },
];

const HOMES = [
  { id: "SAVANNA", emoji: "🌾", label: "SAVANNA", hint: "Sabana" },
  { id: "JUNGLE", emoji: "🌴", label: "JUNGLE", hint: "Selva" },
  { id: "POND", emoji: "🌊", label: "POND", hint: "Estanque" },
  { id: "SKY", emoji: "☁️", label: "SKY", hint: "Cielo" },
  { id: "HOME", emoji: "🏡", label: "HOME", hint: "Casa" },
];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function EnglishAnimalsGame() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState(() => shuffle(MISSIONS));
  const [index, setIndex] = useState(0);
  const [selectedHome, setSelectedHome] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);

  const finished = index >= deck.length;
  const current = finished ? null : deck[index];
  const rescued = Math.min(index, deck.length);

  const homeLookup = useMemo(
    () => Object.fromEntries(HOMES.map((home) => [home.id, home])),
    []
  );

  const chooseHome = (homeId) => {
    if (!current || locked) return;

    setSelectedHome(homeId);

    if (homeId === current.home) {
      setLocked(true);
      setFeedback({
        type: "correct",
        text: `¡Muy bien! ${current.word} vive en ${homeLookup[homeId].label}.`,
      });
      return;
    }

    setFeedback({
      type: "wrong",
      text: "Ese no es su hogar. Prueba otro lugar.",
    });
  };

  const nextAnimal = () => {
    if (!feedback || feedback.type !== "correct") return;
    setIndex((value) => value + 1);
    setSelectedHome("");
    setFeedback(null);
    setLocked(false);
  };

  const resetGame = () => {
    setDeck(shuffle(MISSIONS));
    setIndex(0);
    setSelectedHome("");
    setFeedback(null);
    setLocked(false);
  };

  const finishGame = () => {
    updateUnitProgress("english", "beginner", 4, 70);
    navigate("/english/beginner/unit/4/quiz");
  };

  return (
    <main className="animals-screen game-mode">
      <header className="animals-topbar compact">
        <button onClick={() => navigate("/english/beginner/unit/4/lesson")}>
          <ArrowLeft /> Lección
        </button>

        <div>
          <span>Mini juego</span>
          <strong>Rescate en la selva</strong>
        </div>

        <div className="rescue-score">
          <PawPrint /> {rescued}/{deck.length}
        </div>
      </header>

      <section className="rescue-shell">
        <h1>¿Dónde vive este animal?</h1>
        <p>Selecciona su hábitat y después presiona “Siguiente animal”.</p>

        {!finished && current ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.word}-${index}`}
                className="rescue-animal"
                initial={{ scale: 0.75, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.75, opacity: 0, y: -20 }}
              >
                <span>{current.emoji}</span>
                <strong>{current.word}</strong>
                <small>Animal {index + 1} de {deck.length}</small>
              </motion.div>
            </AnimatePresence>

            <div className="habitat-grid">
              {HOMES.map((home) => {
                const isSelected = selectedHome === home.id;
                const isCorrect =
                  feedback?.type === "correct" && current.home === home.id;
                const isWrong =
                  feedback?.type === "wrong" && isSelected;

                return (
                  <motion.button
                    type="button"
                    key={home.id}
                    className={`${isSelected ? "selected" : ""} ${
                      isCorrect ? "correct-home" : ""
                    } ${isWrong ? "wrong" : ""}`}
                    onClick={() => chooseHome(home.id)}
                    disabled={locked}
                    whileHover={locked ? undefined : { y: -6 }}
                    whileTap={locked ? undefined : { scale: 0.94 }}
                  >
                    <span>{home.emoji}</span>
                    <strong>{home.label}</strong>
                    <small>{home.hint}</small>
                  </motion.button>
                );
              })}
            </div>

            {feedback && (
              <motion.div
                className={`rescue-feedback ${feedback.type}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {feedback.type === "correct" ? <CheckCircle2 /> : <XCircle />}
                <span>{feedback.text}</span>
              </motion.div>
            )}

            {feedback?.type === "correct" && (
              <button className="animals-primary rescue-next" onClick={nextAnimal}>
                Siguiente animal <PawPrint />
              </button>
            )}
          </>
        ) : (
          <motion.div
            className="rescue-complete"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <CheckCircle2 />
            <h2>¡Todos están a salvo!</h2>
            <p>Completaste el rescate de la selva.</p>
            <button className="animals-primary" onClick={finishGame}>
              Ir a evaluación <PawPrint />
            </button>
          </motion.div>
        )}

        <button className="animals-secondary" onClick={resetGame}>
          <RefreshCcw /> Reiniciar misión
        </button>
      </section>
    </main>
  );
}
