import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Gamepad2, Trophy, CalendarDays, LockKeyhole, Play, Award, Star } from "lucide-react";
import DashboardNav from "../components/DashboardNav";
import { getProgress, getGlobalStats } from "../utils/progressManager";
import { getEngagement } from "../utils/engagementStorage";
import { levelTotals, names, worldLabel, levelLabel, unitRoute, unitImage, levelImages } from "../utils/contentCatalog";
import "../styles/dashboard-hub.css";

function allUnits() {
  const progress = getProgress();
  return Object.entries(levelTotals).flatMap(([world, levels]) => Object.entries(levels).flatMap(([level, total]) => {
    const data = progress.worlds?.[world]?.[level] || {};
    return Array.from({length: total}, (_, i) => ({
      world, level, id: i+1, name: names[world][level][i],
      completed: (data.completedUnits || []).includes(i+1),
      unlocked: (data.unlockedUnits || [1]).includes(i+1),
      percent: Number(data.progress?.[i+1] || 0),
      image: unitImage(world, level, i + 1),
    }));
  }));
}

export default function DashboardHub({ type }) {
  const navigate = useNavigate();
  const units = useMemo(allUnits, []);
  const stats = getGlobalStats();
  const engagement = getEngagement();
  const config = {
    lessons: [BookOpen,"Mi libro de aprendizaje","Repasa tus lecciones y descubre todo lo que ya dominaste."],
    games: [Gamepad2,"Zona de juegos","Vuelve a jugar tus retos favoritos sin perder tu progreso."],
    achievements: [Trophy,"Galería de logros","Tus estrellas, diplomas y grandes conquistas."],
  }[type];
  const [Icon,title,subtitle] = config;
  const active = type === "lessons" ? "/lessons" : type === "games" ? "/games" : "/achievements";

  const cards = type === "achievements" ? [] : units;
  return <main className={`dashboard-screen dashboard-${type}`}>
    <header className="dashboard-header">
      <button onClick={() => navigate("/home")}><ArrowLeft/> Volver</button>
      <div><span>EDUPLAY</span><h1><Icon/> {title}</h1><p>{subtitle}</p></div>
      <div className="hub-stats"><b>🔥 {stats.streak}</b><b>⭐ {stats.stars}</b><b>✨ {stats.xp}</b></div>
    </header>

    {type === "achievements" ? <section className="achievement-grid">
      <article className="achievement-hero"><Award/><div><span>NIVEL DEL ESTUDIANTE</span><h2>Nivel {stats.level}</h2><p>{stats.completed} unidades completadas</p></div></article>
      {["english","computer"].flatMap(world => ["beginner","intermediate","advanced"].map(level => {
        const done = units.filter(u => u.world===world && u.level===level && u.completed).length;
        const total = levelTotals[world][level]; const complete = done===total;
        return <article className={`diploma-card ${complete?"earned":"locked"}`} key={world+level}>
          <div className="diploma-cover">
            <img src={levelImages[world][level]} alt={`${worldLabel[world]} ${levelLabel[level]}`} />
            <span className="diploma-status">{complete ? <Trophy/> : <LockKeyhole/>}</span>
          </div>
          <div className="diploma-info"><h3>{worldLabel[world]}</h3><b>{levelLabel[level]}</b><p>{done}/{total} unidades</p><div className="diploma-progress"><span style={{width:`${done/total*100}%`}}/></div></div>
        </article>;
      }))}
      <article className="achievement-summary"><Star/><h3>{stats.stars} estrellas</h3><p>{stats.xp} XP acumulados · {engagement.visitDates.length} días de actividad</p></article>
    </section> : <section className="hub-content-grid">
      {cards.map(unit => {
        // La biblioteca de Lecciones y la Zona de Juegos muestran únicamente
        // contenido que el perfil activo ya completó dentro de su aventura.
        // Las unidades nuevas se inician desde el mapa de cada mundo.
        const available = unit.completed;
        return <article className={`learning-card ${unit.completed?"completed":""} ${!available?"locked":""}`} key={`${unit.world}-${unit.level}-${unit.id}`}>
          <div className="learning-cover">
            <img src={unit.image} alt={unit.name} loading="lazy" />
            <div className={`world-chip ${unit.world}`}>{worldLabel[unit.world]}</div>
            {!available && <div className="cover-lock"><LockKeyhole/></div>}
          </div>
          <div className="learning-card-body">
            <span className="unit-number">UNIDAD {unit.id}</span><h3>{unit.name}</h3><p>{levelLabel[unit.level]}</p>
            <div className="mini-progress"><span style={{width:`${unit.completed?100:unit.percent}%`}}/></div>
            <button disabled={!available} onClick={() => navigate(unitRoute(unit.world,unit.level,unit.id,type==="games"?"game":"lesson"))}>
              {!available
                ? <><LockKeyhole/> {"Completa esta unidad"}</>
                : <><Play/> {type==="games"?"Jugar":"Abrir lección"}</>}
            </button>
          </div>
        </article>;
      })}
    </section>}
    <DashboardNav active={active}/>
  </main>;
}
