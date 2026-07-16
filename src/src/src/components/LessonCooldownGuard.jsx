import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock3, LockKeyhole, Sparkles } from "lucide-react";
import {
  getLessonCooldown,
  isUnitCompleted,
} from "../utils/progressManager";
import "../styles/lesson-cooldown.css";

const ROUTE_PATTERN =
  /^\/(english|computer)\/(beginner|intermediate|advanced)\/unit\/(\d+)(?:\/(lesson|activity|game|quiz|challenge|reward))?\/?$/;

const formatRemaining = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

export default function LessonCooldownGuard({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [now, setNow] = useState(Date.now());

  const routeInfo = useMemo(() => {
    const match = location.pathname.match(ROUTE_PATTERN);
    if (!match) return null;

    const [, world, level, unitId, stage] = match;

    if (stage === "reward") return null;

    return {
      world,
      level,
      unitId: Number(unitId),
    };
  }, [location.pathname]);

  const cooldown = getLessonCooldown();
  const blocked = Boolean(
    routeInfo &&
      cooldown.active &&
      !isUnitCompleted(routeInfo.world, routeInfo.level, routeInfo.unitId)
  );

  useEffect(() => {
    if (!blocked) return undefined;

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [blocked]);

  if (!blocked) return children;

  const remaining = Math.max(0, cooldown.endsAt - now);
  const time = formatRemaining(remaining);
  const backPath = `/${routeInfo.world}/${routeInfo.level}`;

  if (remaining <= 0) {
    window.setTimeout(() => setNow(Date.now()), 0);
    return children;
  }

  return (
    <main className="lesson-cooldown-screen">
      <div className="lesson-cooldown-glow lesson-cooldown-glow--one" />
      <div className="lesson-cooldown-glow lesson-cooldown-glow--two" />

      <section className="lesson-cooldown-card" aria-live="polite">
        <div className="lesson-cooldown-icon">
          <LockKeyhole size={42} strokeWidth={2.4} />
        </div>

        <span className="lesson-cooldown-badge">
          <Sparkles size={16} /> Próxima aventura
        </span>

        <h1>¡Gran trabajo por hoy!</h1>
        <p>
          Ya completaste la lección disponible. La siguiente se abrirá
          automáticamente cuando termine el contador.
        </p>

        <div className="lesson-cooldown-timer" aria-label="Tiempo restante">
          <div><strong>{time.hours}</strong><span>Horas</span></div>
          <b>:</b>
          <div><strong>{time.minutes}</strong><span>Minutos</span></div>
          <b>:</b>
          <div><strong>{time.seconds}</strong><span>Segundos</span></div>
        </div>

        <div className="lesson-cooldown-note">
          <Clock3 size={20} />
          Puedes volver a jugar las unidades ya completadas mientras esperas.
        </div>

        <button type="button" onClick={() => navigate(backPath)}>
          Volver al mapa
        </button>
      </section>
    </main>
  );
}
