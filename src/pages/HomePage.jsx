import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

import { getProfile } from "../utils/profileStorage";
import {
  getLevelProgress,
  getStreak,
} from "../utils/progressManager";

import {
  ArrowLeft,
  BookOpen,
  Gamepad2,
  Trophy,
  CalendarDays,
  Settings,
  Home,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const profile = getProfile();

  const [selectedWorld, setSelectedWorld] = useState("");
  const [isOpening, setIsOpening] = useState(false);

  const computerProgress = getLevelProgress(
    "computer",
    "beginner"
  );

  const streak = getStreak();

  const totalXp = Number(computerProgress.xp || 0);
  const totalStars = Number(computerProgress.stars || 0);

  const completedUnits = Array.isArray(
    computerProgress.completedUnits
  )
    ? computerProgress.completedUnits.length
    : 0;

  const playerLevel = Math.max(
    1,
    Math.floor(totalXp / 500) + 1
  );

  const points = totalXp + totalStars * 25;

  const coins = useMemo(() => {
    const savedCoins = Number(profile.coins || 0);
    const earnedCoins =
      completedUnits * 20 + totalStars * 5;

    return savedCoins + earnedCoins;
  }, [profile.coins, completedUnits, totalStars]);

  const beginnerProgress = Math.min(
    100,
    Math.round((completedUnits / 9) * 100)
  );

  const openWorld = (world) => {
    if (isOpening) return;

    setSelectedWorld(world);
    setIsOpening(true);

    window.setTimeout(() => {
      navigate(
        world === "english"
          ? "/english"
          : "/computer"
      );
    }, 550);
  };

  return (
    <main className="home-screen">
      <img
        src="/assets/logo.png"
        className="home-main-logo"
        alt="EduPlay"
      />

      <motion.button
        className="home-back"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowLeft size={22} />
        Regresar
      </motion.button>

      <motion.img
        src="/assets/mascot.png"
        className="home-mascot"
        alt=""
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <motion.section
        className="home-stats"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.55,
          delay: 0.15,
        }}
      >
        <div className="stat-box">
          🪙
          <div>
            <span>Monedas</span>
            <b>{coins.toLocaleString("es-GT")}</b>
          </div>
        </div>

        <div className="stat-box">
          ✨
          <div>
            <span>XP</span>
            <b>{totalXp.toLocaleString("es-GT")}</b>
          </div>
        </div>

        <div className="stat-box">
          💎
          <div>
            <span>Nivel</span>
            <b>{playerLevel}</b>
          </div>
        </div>

        <div className="stat-box">
          ⭐
          <div>
            <span>Puntos</span>
            <b>{points.toLocaleString("es-GT")}</b>
          </div>
        </div>

        <div className="stat-box">
          🔥
          <div>
            <span>Racha</span>
            <b>
              {streak} {streak === 1 ? "día" : "días"}
            </b>
          </div>
        </div>

        <img
          className="student-avatar"
          src={
            profile.avatar ||
            "/assets/avatar-1.png"
          }
          alt="Avatar"
          onError={(event) => {
            event.currentTarget.src =
              "/assets/mascot.png";
          }}
        />
      </motion.section>

      <motion.section
        className="home-title"
        initial={{ y: -35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.55,
          delay: 0.25,
        }}
      >
        <h1>
          ¡Hola, {profile.name || "Estudiante"}!
        </h1>

        <p>¿Qué quieres aprender hoy?</p>
      </motion.section>

      <section className="home-worlds">
        <motion.button
          type="button"
          className={`world-card ${
            selectedWorld === "english"
              ? "world-selected"
              : ""
          }`}
          onClick={() => openWorld("english")}
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity:
              isOpening &&
              selectedWorld !== "english"
                ? 0.55
                : 1,
            scale:
              selectedWorld === "english" &&
              isOpening
                ? 1.06
                : 1,
          }}
          transition={{
            duration: 0.45,
            delay: isOpening ? 0 : 0.35,
          }}
          whileHover={
            isOpening
              ? {}
              : {
                  y: -12,
                  scale: 1.035,
                }
          }
          whileTap={{
            scale: 0.96,
            y: 2,
          }}
        >
          <span className="world-shine" />

          <img
            src="/assets/english-world.png"
            alt="English World"
          />
        </motion.button>

        <motion.button
          type="button"
          className={`world-card ${
            selectedWorld === "computer"
              ? "world-selected"
              : ""
          }`}
          onClick={() => openWorld("computer")}
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity:
              isOpening &&
              selectedWorld !== "computer"
                ? 0.55
                : 1,
            scale:
              selectedWorld === "computer" &&
              isOpening
                ? 1.06
                : 1,
          }}
          transition={{
            duration: 0.45,
            delay: isOpening ? 0 : 0.35,
          }}
          whileHover={
            isOpening
              ? {}
              : {
                  y: -12,
                  scale: 1.035,
                }
          }
          whileTap={{
            scale: 0.96,
            y: 2,
          }}
        >
          <span className="world-shine" />

          <img
            src="/assets/computer-world.png"
            alt="Mundo de la Computación"
          />
        </motion.button>
      </section>

      <motion.section
        className="continue-card"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.55,
          delay: 0.55,
        }}
      >
        <h3>🕘 Continúa donde lo dejaste</h3>

        <div className="continue-row">
          <img
            src={
              profile.avatar ||
              "/assets/avatar-1.png"
            }
            alt="Avatar"
            onError={(event) => {
              event.currentTarget.src =
                "/assets/mascot.png";
            }}
          />

          <div>
            <b>Mundo de la Computación</b>
            <span>
              Principiante • {completedUnits}/9 unidades
            </span>
          </div>

          <div className="progress">
            <div
              style={{
                width: `${beginnerProgress}%`,
              }}
            />
          </div>

          <strong>{beginnerProgress}%</strong>

          <motion.button
            type="button"
            onClick={() => openWorld("computer")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            ▶ Continuar
          </motion.button>
        </div>
      </motion.section>

      <motion.nav
        className="bottom-nav"
        initial={{ y: 110 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <button type="button" className="active">
          <Home size={28} />
          <span>Inicio</span>
        </button>

        <button type="button">
          <BookOpen size={28} />
          <span>Lecciones</span>
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
      </motion.nav>
    </main>
  );
}
