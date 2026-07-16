import "../styles/world.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Gamepad2,
  Trophy,
  CalendarDays,
  Settings,
  Home,
  Star,
  Lock,
} from "lucide-react";

const grades = [
  {
    id: 1,
    title: "1.º Primaria",
    subtitle: "Comienza tu aventura",
    image: "/assets/grade-1.png",
    color: "grade-blue",
    unlocked: true,
  },
  {
    id: 2,
    title: "2.º Primaria",
    subtitle: "Aprende nuevas palabras",
    image: "/assets/grade-2.png",
    color: "grade-green",
    unlocked: true,
  },
  {
    id: 3,
    title: "3.º Primaria",
    subtitle: "Explora y practica",
    image: "/assets/grade-3.png",
    color: "grade-orange",
    unlocked: true,
  },
  {
    id: 4,
    title: "4.º Primaria",
    subtitle: "Supera nuevos retos",
    image: "/assets/grade-4.png",
    color: "grade-purple",
    unlocked: true,
  },
  {
    id: 5,
    title: "5.º Primaria",
    subtitle: "Domina el inglés",
    image: "/assets/grade-5.png",
    color: "grade-pink",
    unlocked: true,
  },
  {
    id: 6,
    title: "6.º Primaria",
    subtitle: "Completa tu recorrido",
    image: "/assets/grade-6.png",
    color: "grade-yellow",
    unlocked: true,
  },
];

export default function EnglishWorld() {
  const navigate = useNavigate();

  const openGrade = (grade) => {
    if (!grade.unlocked) return;

    navigate(`/english/grade/${grade.id}`);
  };

  return (
    <main className="world-screen english-screen">
      <img
        className="world-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <motion.button
        type="button"
        className="world-back"
        onClick={() => navigate("/home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowLeft size={24} />
        Regresar
      </motion.button>

      <motion.header
        className="world-header"
        initial={{ y: -45, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
      >
        <div className="world-title-icon">🇺🇸</div>

        <div>
          <h1>English World</h1>
          <p>Elige tu grado para comenzar la aventura.</p>
        </div>
      </motion.header>

      <motion.section
        className="world-stats"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div>
          🔥
          <span>Racha</span>
          <b>7 días</b>
        </div>

        <div>
          💎
          <span>Nivel</span>
          <b>5</b>
        </div>

        <div>
          ⭐
          <span>Puntos</span>
          <b>1250</b>
        </div>

        <img
          src="/assets/avatar-1.png"
          alt="Avatar"
          onError={(event) => {
            event.currentTarget.src = "/assets/mascot.png";
          }}
        />
      </motion.section>

      <section className="grades-grid">
        {grades.map((grade, index) => (
          <motion.button
            type="button"
            key={grade.id}
            className={`grade-card ${grade.color} ${
              !grade.unlocked ? "grade-locked" : ""
            }`}
            onClick={() => openGrade(grade)}
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.12 + index * 0.08,
            }}
            whileHover={
              grade.unlocked
                ? {
                    y: -10,
                    scale: 1.035,
                  }
                : {}
            }
            whileTap={
              grade.unlocked
                ? {
                    scale: 0.96,
                  }
                : {}
            }
          >
            <span className="grade-shine" />

            <div className="grade-number">{grade.id}</div>

            <img
              src={grade.image}
              alt={grade.title}
              onError={(event) => {
                event.currentTarget.src = "/assets/mascot.png";
              }}
            />

            <div className="grade-information">
              <h2>{grade.title}</h2>
              <p>{grade.subtitle}</p>

              <div className="grade-stars">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} />
              </div>
            </div>

            {!grade.unlocked && (
              <div className="grade-lock">
                <Lock size={34} />
              </div>
            )}
          </motion.button>
        ))}
      </section>

      <motion.section
        className="world-continue"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.7 }}
      >
        <div className="world-continue-icon">📘</div>

        <div className="world-continue-text">
          <h3>Continúa aprendiendo</h3>
          <p>1.º Primaria · Unidad 3 · Colors</p>
        </div>

        <div className="world-progress">
          <div />
        </div>

        <strong>75%</strong>

        <motion.button
          type="button"
          onClick={() => navigate("/english/grade/1")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          Continuar
        </motion.button>
      </motion.section>

      <nav className="world-bottom-nav">
        <button type="button" onClick={() => navigate("/home")}>
          <Home size={28} />
          <span>Inicio</span>
        </button>

        <button type="button" className="active">
          <BookOpen size={28} />
          <span>Grados</span>
        </button>

        <button type="button">
          <Gamepad2 size={28} />
          <span>Juegos</span>
        </button>

        <button type="button">
          <Trophy size={28} />
          <span>Logros</span>
        </button>

        <button type="button">
          <CalendarDays size={28} />
          <span>Calendario</span>
        </button>

        <button type="button">
          <Settings size={28} />
          <span>Ajustes</span>
        </button>
      </nav>
    </main>
  );
}