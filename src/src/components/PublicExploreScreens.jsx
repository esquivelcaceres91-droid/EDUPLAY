import {
  ArrowLeft, BookOpen, CalendarDays, ChevronRight, Coins, Flame, Gamepad2,
  Gem, Home, Play, Settings, Sparkles, Star, Trophy,
} from "lucide-react";
import "../styles/public-explore-screens.css";
import "../styles/computer-levels.css";
import "../styles/computer-map.css";
import "../styles/Levels.css";
import "../styles/map.css";
import "../styles/computer-intermediate.css";
import "../styles/computer-advanced.css";
import "../styles/english-intermediate.css";
import "../styles/english-advanced.css";
import "../styles/math-world.css";
import "../styles/language-world.css";
import { languageLevels } from "../data/languageWorldData";

const go = (path) => window.location.assign(path);

const LEVELS = [
  { id: "beginner", title: "Principiante", subtitle: "Conceptos básicos para comenzar" },
  { id: "intermediate", title: "Intermedio", subtitle: "Nuevas herramientas y desafíos" },
  { id: "advanced", title: "Avanzado", subtitle: "Retos para dominar lo aprendido" },
];

const MATH_LEVEL_IMAGES = {
  beginner: "/worlds/math/official/math-level-beginner.webp",
  intermediate: "/worlds/math/official/math-level-intermediate.webp",
  advanced: "/worlds/math/official/math-level-advanced.webp",
};

const MATH_UNIT_IMAGES = {
  beginner: ["math-numeros-cantidades", "math-sumas", "math-restas", "math-figuras-geometricas", "math-patrones-secuencias", "math-mayor-menor"],
  intermediate: ["math-multiplicacion", "math-division", "math-fracciones", "math-medidas", "math-tiempo-calendario", "math-dinero"],
  advanced: ["math-numeros-grandes-decimales", "math-problemas-matematicos", "math-fracciones-equivalentes", "math-perimetro-area", "math-coordenadas-plano", "math-logica-matematica"],
};

const CONTENT = {
  math: {
    label: "Mundo de Matemáticas",
    beginner: [["Números y cantidades","Cuenta, relaciona y ordena"],["Sumas","Junta cantidades hasta 20"],["Restas","Quita y encuentra lo que queda"],["Figuras geométricas","Descubre formas a tu alrededor"],["Patrones y secuencias","Encuentra la regla escondida"],["Comparaciones","Mayor, menor o igual"]],
    intermediate: [["Multiplicación","Construye grupos iguales"],["División","Reparte en partes iguales"],["Fracciones","Partes iguales de un todo"],["Medidas","Longitud, masa y capacidad"],["Tiempo y calendario","Organiza horas, días y meses"],["Dinero","Compra, suma y calcula cambio"]],
    advanced: [["Números grandes","Lee, compara y descompone"],["Decimales","Décimas, centésimas y operaciones"],["Fracciones equivalentes","Distintas formas, mismo valor"],["Problemas matemáticos","Analiza, resuelve y comprueba"],["Perímetro y área","Mide bordes y superficies"],["Coordenadas y lógica","Ubica tesoros y resuelve retos"]],
  },
  computer: {
    label: "Mundo Computación",
    beginner: [
      ["La computadora", "Conoce qué es una computadora", "/assets/computer/maps/beginner/unit-computer.png"],
      ["Partes de la PC", "Monitor, teclado, mouse y CPU", "/assets/computer/maps/beginner/unit-parts.png"],
      ["El teclado", "Aprende las teclas principales", "/assets/computer/maps/beginner/unit-keyboard.png"],
      ["El mouse", "Mover, hacer clic y arrastrar", "/assets/computer/maps/beginner/unit-mouse.png"],
      ["Windows", "Conoce el escritorio y sus iconos", "/assets/computer/maps/beginner/unit-windows.png"],
      ["Archivos y carpetas", "Organiza tus documentos", "/assets/computer/maps/beginner/unit-folders.png"],
      ["Paint", "Dibuja y crea en la computadora", "/assets/computer/maps/beginner/unit-paint.png"],
      ["Internet seguro", "Navega de forma responsable", "/assets/computer/maps/beginner/unit-internet.png"],
      ["Reto final", "Demuestra lo aprendido", "/assets/computer/maps/beginner/final-chest.png"],
    ],
    intermediate: [
      ["Microsoft Word", "Crea y organiza documentos", "/assets/computer/maps/intermediate/unit-word.png"],
      ["Microsoft Excel", "Filas, columnas y operaciones", "/assets/computer/maps/intermediate/unit-excel.png"],
      ["Microsoft PowerPoint", "Diseña presentaciones increíbles", "/assets/computer/maps/intermediate/unit-powerpoint.png"],
      ["Reto final", "Herramientas digitales", "/assets/computer/maps/intermediate/final-chest.png"],
    ],
    advanced: [
      ["Robótica", "Sensores, motores y órdenes", "/assets/computer/advanced/unit-robotics.png"],
      ["Inteligencia Artificial", "Máquinas que reconocen y deciden", "/assets/computer/advanced/unit-ai.png"],
      ["Redes y seguridad", "Conecta y protege información", "/assets/computer/advanced/unit-networks.png"],
    ],
  },
  english: {
    label: "English World",
    beginner: [
      ["Colors", "Learn the colors", "/assets/maps/english-beginner/unit-colors.png"],
      ["Numbers", "Count and have fun", "/assets/maps/english-beginner/unit-numbers.png"],
      ["Family", "Meet the family", "/assets/maps/english-beginner/unit-family.png"],
      ["Animals", "Discover amazing animals", "/assets/maps/english-beginner/unit-animals.png"],
      ["School", "Words from your classroom", "/assets/maps/english-beginner/unit-school.png"],
      ["Food", "Delicious new words", "/assets/maps/english-beginner/unit-food.png"],
      ["Final treasure", "Complete the adventure", "/assets/maps/english-beginner/treasure.png"],
    ],
    intermediate: [
      ["Verb To Be", "The energy of am, is and are", "/assets/english/intermediate/verb-to-be-banner.webp"],
      ["Present Simple", "Actions we do every day", "/assets/english/intermediate/present-simple-banner.webp"],
      ["Daily Routine", "Talk about your day", "/assets/english/intermediate/daily-routine-banner.webp"],
      ["Final Challenge", "Complete the mission", "/assets/english/intermediate/final-challenge-banner.webp"],
    ],
    advanced: [
      ["Conversations", "Speak with confidence", "/assets/english/advanced/conversation-banner.png"],
      ["Reading & Listening", "Stories for your eyes and ears", "/assets/english/advanced/reading-listening-banner.png"],
      ["Final Challenge", "Become an English champion", "/assets/english/advanced/final-challenge-banner.png"],
    ],
  },
};

export default function PublicExploreScreen({ view, world = "english", level = "beginner" }) {
  if (view === "home") return <ExploreHome />;
  if (view === "levels") return <ExploreLevels world={world} />;
  return <ExploreMap world={world} level={level} />;
}

function ExploreHome() {
  const locked = () => go("/explore/locked");
  return <main className="explore-home-rich">
    <img className="explore-home-logo" src="/assets/logo.png" alt="EduPlay" />
    <button className="explore-home-back" type="button" onClick={() => go("/")}><ArrowLeft /> Regresar</button>
    <img className="explore-home-mascot" src="/assets/mascot.png" alt="Mascota EduPlay" />

    <section className="explore-home-stats" aria-label="Datos decorativos de demostración">
      <Stat icon={<Coins />} label="Monedas" value="120" />
      <Stat icon={<Sparkles />} label="XP" value="350" />
      <Stat icon={<Gem />} label="Nivel" value="1" />
      <Stat icon={<Star />} label="Estrellas" value="18" />
      <Stat icon={<Flame />} label="Racha" value="5 días" />
      <img src="/assets/avatar-1.png" alt="Avatar de muestra" />
    </section>

    <header className="explore-home-title"><span>RECORRIDO DE MUESTRA</span><h1>¡Hola, Explorador!</h1><p>¿Qué quieres aprender hoy?</p></header>

    <section className="explore-home-worlds">
      <button type="button" onClick={() => go("/explore/english")}><img src="/assets/english-world.png" alt="English World" /><b>Explorar English <ChevronRight /></b></button>
      <button type="button" onClick={() => go("/explore/math")}><img src="/worlds/math/math-world.svg" alt="Mundo Matemáticas" /><b>Explorar Matemáticas <ChevronRight /></b></button>
      <button type="button" onClick={() => go("/explore/language")}><img src="/worlds/language/official/language-world.png" alt="Comunicación y Lenguaje" /><b>Explorar Lenguaje <ChevronRight /></b></button>
      <button type="button" onClick={() => go("/explore/computer")}><img src="/assets/computer-world.png" alt="Mundo Computación" /><b>Explorar Computación <ChevronRight /></b></button>
    </section>

    <section className="explore-continue-card">
      <h2>🕘 Continúa donde lo dejaste</h2>
      <div><img src="/assets/avatar-1.png" alt="" /><p><b>English World</b><span>Principiante · Colors · 2/7 unidades</span></p><div className="explore-progress"><i /></div><strong>28%</strong><button type="button" onClick={() => go("/explore/english/beginner")}>▶ Continuar</button></div>
    </section>

    <section className="explore-feature-row">
      <button type="button" onClick={locked}><BookOpen /><span><b>Lecciones</b><small>Aprende paso a paso</small></span></button>
      <button type="button" onClick={locked}><Gamepad2 /><span><b>Juegos</b><small>Practica jugando</small></span></button>
      <button type="button" onClick={locked}><Trophy /><span><b>Logros</b><small>Premios y diplomas</small></span></button>
      <button type="button" onClick={locked}><CalendarDays /><span><b>Calendario</b><small>Tu aventura diaria</small></span></button>
    </section>

    <nav className="explore-bottom-nav">
      <button className="active" type="button"><Home /><span>Inicio</span></button>
      <button type="button" onClick={locked}><BookOpen /><span>Lecciones</span></button>
      <button type="button" onClick={locked}><Gamepad2 /><span>Juegos</span></button>
      <button type="button" onClick={locked}><Trophy /><span>Logros</span></button>
      <button type="button" onClick={locked}><CalendarDays /><span>Calendario</span></button>
      <button type="button" onClick={locked}><Settings /><span>Ajustes</span></button>
    </nav>
  </main>;
}

function Stat({ icon, label, value }) {
  return <div>{icon}<span><small>{label}</small><b>{value}</b></span></div>;
}

function ExploreLevels({ world }) {
  if (world === "language") return <LanguageLevelsVisual />;
  if (world === "math") return <MathLevelsVisual />;
  if (world === "computer") return <ComputerLevelsVisual />;
  return <EnglishLevelsVisual />;
}

function LanguageLevelsVisual(){return <main className="language-levels-screen public-original-visual"><button className="language-back" onClick={()=>go("/explore/home")}><ArrowLeft/> Volver</button><section className="language-stats"><span><Flame/> 5 días</span><span><Gem/> Nivel 1</span><span><Star fill="currentColor"/> 18</span></section><header className="language-level-heading"><div className="language-lumi"><span>✦</span>🕊️</div><small>LA BIBLIOTECA VIVA</small><h1>Comunicación y Lenguaje</h1><p>Abre un portal y conoce la aventura visual.</p></header><div className="language-portal-line">{LEVELS.map((_,i)=><b className="active" key={i}>{i+1}</b>)}</div><section className="language-level-portals">{Object.values(languageLevels).map((level)=><button key={level.id} className={`language-portal language-${level.id}`} onClick={()=>go(`/explore/language/${level.id}`)}><div className="language-book-cover"><img src={level.image} alt=""/><span className="language-book-spine"/><span className="language-portal-number">{level.number}</span></div><div className="language-portal-copy"><small>{level.icon} PORTAL {level.number}</small><h2>{level.title}</h2><p>{level.subtitle}</p><div className="language-progress"><i style={{width:"0%"}}/></div><footer><span>0% explorado</span><strong>Abrir libro <ChevronRight/></strong></footer></div></button>)}</section></main>}

function MathLevelsVisual(){return <main className="math-levels-screen public-original-visual"><img className="math-logo" src="/assets/logo.png" alt="EduPlay"/><button className="math-back" onClick={()=>go("/explore/home")}><ArrowLeft/> Volver</button><section className="math-level-stats"><div><Flame/><span>Racha</span><b>5 días</b></div><div><Gem/><span>Nivel</span><b>1</b></div><div><Star fill="currentColor"/><span>XP</span><b>350</b></div></section><header className="math-level-heading"><span>✨ MUNDO DE MATEMÁTICAS</span><h1>¡Elige tu próxima misión!</h1><p>Todos los niveles están disponibles en este recorrido visual.</p></header><div className="math-level-track"><i style={{width:"100%"}}/>{LEVELS.map((_,i)=><b className="active" key={i}>{i+1}</b>)}</div><section className="math-level-cards">{LEVELS.map((level,index)=><button key={level.id} className={`math-level-card math-${level.id}`} onClick={()=>go(`/explore/math/${level.id}`)}><img src={MATH_LEVEL_IMAGES[level.id]} alt=""/><div><small>NIVEL {index+1}</small><h2>{level.title}</h2><p>{["Números, operaciones y formas","Multiplica, divide y mide","Resuelve desafíos increíbles"][index]}</p><div className="math-card-progress"><i style={{width:"0%"}}/></div><footer><span>0% completado</span><strong>Entrar <ChevronRight/></strong></footer></div></button>)}</section></main>}

function ComputerLevelsVisual() {
  return <main className="computer-levels-screen public-original-visual">
    <img className="computer-levels-logo" src="/assets/logo.png" alt="EduPlay" />
    <button type="button" className="computer-levels-back" onClick={() => go("/explore/home")}><ArrowLeft size={26} /> Volver</button>
    <section className="computer-levels-stats"><div><Flame size={34} className="computer-fire" /><span>Racha</span><strong>5 días</strong></div><div><Gem size={32} className="computer-gem" /><span>Nivel</span><strong>1</strong></div><div><Star size={36} className="computer-star" fill="currentColor" /><span>XP</span><strong>350</strong></div><img src="/assets/avatar-1.png" alt="Avatar" /></section>
    <section className="computer-levels-progress"><div className="computer-progress-line"><div style={{ width: "100%" }} /></div><span className="computer-progress-step first active">1</span><span className="computer-progress-step middle active">2</span><span className="computer-progress-step last active">3</span></section>
    <section className="computer-levels-cards">{LEVELS.map((level) => <button type="button" key={level.id} className={`computer-level-card computer-${level.id}`} onClick={() => go(`/explore/computer/${level.id}`)}><span className="computer-card-shine" /><div className="computer-card-image"><img src={`/assets/computer/levels/${level.id}.png`} alt={level.title} /></div><div className="computer-card-info"><h2>{level.title}</h2><p>{level.id === "beginner" ? "Conceptos básicos de computación" : level.id === "intermediate" ? "Programación y herramientas digitales" : "Robótica, inteligencia artificial y redes"}</p><div className="computer-card-progress"><div style={{ width: "0%" }} /></div><div className="computer-card-bottom"><span>0% completado</span><span className="computer-enter">Entrar <ChevronRight size={20} /></span></div></div></button>)}</section>
    <div className="computer-levels-message">🎉 Todos los niveles disponibles en el recorrido visual.</div>
  </main>;
}

function EnglishLevelsVisual() {
  return <main className="levels-screen english-levels-screen public-original-visual">
    <img className="levels-logo" src="/assets/logo.png" alt="EduPlay" /><button className="levels-back" type="button" onClick={() => go("/explore/home")}><ArrowLeft /> Volver</button>
    <section className="levels-stats"><div className="levels-stat"><Flame className="stat-fire" /><span>Racha</span><strong>5 días</strong></div><div className="levels-stat"><Gem className="stat-gem" /><span>Nivel</span><strong>1</strong></div><div className="levels-stat"><Star className="stat-star" fill="currentColor" /><span>XP</span><strong>350</strong></div><img className="levels-avatar" src="/assets/avatar-1.png" alt="Avatar" /></section>
    <section className="levels-progress"><div className="levels-progress-line"><div className="levels-progress-fill" style={{ width: "100%" }} /></div><div className="levels-progress-step active">1</div><div className="levels-progress-step middle active">2</div><div className="levels-progress-step last active">3</div></section>
    <section className="levels-cards">{LEVELS.map((level,index) => <button type="button" key={level.id} className={`level-card level-${level.id}`} onClick={() => go(`/explore/english/${level.id}`)}><span className="level-card-shine"/><div className="level-image-area"><img src={`/assets/levels/${level.id}.png`} alt={level.title}/></div><div className="level-card-footer"><h2>{level.title}</h2><p>{`Contenido de ${index*2+1}.º y ${index*2+2}.º primaria`}</p><div className="level-card-progress"><div style={{width:"0%"}}/></div><div className="level-card-bottom"><span>0% completado</span><span className="level-enter">Entrar <ChevronRight/></span></div></div></button>)}</section>
    <div className="levels-message">🌟 Todos los niveles disponibles en el recorrido visual.</div>
  </main>;
}

function ExploreMap({ world, level }) {
  const safeLevel = (world === "language" ? languageLevels[level] : CONTENT[world]?.[level]) ? level : "beginner";
  const units = world === "language" ? languageLevels[safeLevel].units.map((unit)=>[unit.title,unit.subtitle]) : CONTENT[world][safeLevel];
  if (world === "language") return <LanguageMapVisual units={units} level={safeLevel}/>;
  if (world === "math") return <MathMapVisual units={units} level={safeLevel}/>;
  if (world === "computer" && safeLevel === "beginner") return <ComputerBeginnerVisual units={units} />;
  if (world === "english" && safeLevel === "beginner") return <EnglishBeginnerVisual units={units} />;
  if (world === "computer" && safeLevel === "intermediate") return <ComputerIntermediateVisual units={units} />;
  if (world === "computer" && safeLevel === "advanced") return <ComputerAdvancedVisual units={units} />;
  if (world === "english" && safeLevel === "intermediate") return <EnglishIntermediateVisual units={units} />;
  return <EnglishAdvancedVisual units={units} />;
}

function LanguageMapVisual({units,level}){const data=languageLevels[level];return <main className={`language-map-screen language-map-${level} public-original-visual`}><header className="language-map-top"><button onClick={()=>go("/explore/language")}><ArrowLeft/> Portales</button><div><span>Biblioteca Viva</span><strong>{data.title}</strong><small>{data.subtitle}</small></div><section><span><Flame/>5 días</span><span><Gem/>350 XP</span><span><Star fill="currentColor"/>18</span></section></header><div className="language-map-intro"><div className="language-lumi-mini">🕊️</div><div><small>CAPÍTULOS DE LA AVENTURA</small><h1>El gran libro de las palabras</h1><p>Selecciona un capítulo para conocerlo.</p></div></div><section className="language-scroll"><div className="language-story-path"><div className="language-ink-line"/>{units.map(([title,subtitle],index)=><button key={title} className={`language-unit language-unit-${index+1}`} onClick={()=>go(`/explore/preview/language/${level}/${index+1}`)}><span className="language-page-tab">CAPÍTULO {String(index+1).padStart(2,"0")}</span><div className="language-unit-art"><img src={`/worlds/language/${level}/level.svg`} alt=""/></div><div className="language-unit-copy"><span>AVENTURA DE PALABRAS</span><h2>{title}</h2><p>{subtitle}</p><div><i style={{width:"0%"}}/></div><strong><Play fill="currentColor"/> Comenzar</strong></div></button>)}</div></section></main>}

function MathMapVisual({units,level}){const title=LEVELS.find(item=>item.id===level)?.title||"Principiante";return <main className={`math-map-screen math-map-${level} public-original-visual`}><header className="math-map-topbar"><button onClick={()=>go("/explore/math")}><ArrowLeft/> Volver</button><div><span>Mundo de Matemáticas</span><strong>{title}</strong></div><section><span><Flame/>5 días</span><span><Gem/>350 XP</span><span><Star fill="currentColor"/>18</span></section></header><div className="math-map-intro"><small>MAPA DE AVENTURAS</small><h1>Misiones matemáticas</h1><p>Selecciona cualquier unidad para conocer la experiencia.</p></div><section className="math-map-viewport"><div className="math-map-world"><div className="math-route-line"/>{units.map(([name,subtitle],index)=><button key={name} className={`math-map-unit math-unit-${index+1}`} onClick={()=>go(`/explore/preview/math/${level}/${index+1}`)}><div className="math-unit-number">{String(index+1).padStart(2,"0")}</div><div className="math-unit-art" style={{background:"linear-gradient(145deg,#7448e4,#15366f)"}}><img src={`/worlds/math/official/${MATH_UNIT_IMAGES[level][index]}.webp`} alt=""/></div><div className="math-unit-info"><span>UNIDAD {index+1}</span><h2>{name}</h2><p>{subtitle}</p><div><i style={{width:"0%"}}/></div><strong><Play fill="currentColor"/> Comenzar</strong></div></button>)}</div></section></main>}

function ComputerBeginnerVisual({ units }) {
  return <main className="computer-map-screen public-original-visual"><header className="computer-map-topbar"><button type="button" className="computer-map-back" onClick={() => go("/explore/computer")}><ArrowLeft size={24}/> Volver</button><div className="computer-map-title"><span>Mundo de Computación</span><strong>Principiante</strong></div><div className="computer-map-stats"><div><Flame size={28}/><span>5 días</span></div><div><Gem size={28}/><span>350 XP</span></div><div><Star size={30} fill="currentColor"/><span>18</span></div></div></header><section className="computer-map-viewport"><div className="computer-map-world"><div className="computer-route-line"/>{units.map(([title,subtitle,image],index)=><button type="button" key={title} className={`computer-map-unit computer-unit-${index+1} ${index===units.length-1?"computer-map-unit-final":""}`} onClick={()=>go(`/explore/preview/computer/beginner/${index+1}`)}><span className="computer-unit-glow"/><div className="computer-unit-image"><img src={image} alt={title}/></div><div className="computer-unit-info"><strong>{title}</strong><p>{subtitle}</p><div className="computer-unit-progress"><div style={{width:"0%"}}/></div><span><Play size={15} fill="currentColor"/> Comenzar</span></div></button>)}</div></section></main>;
}

function EnglishBeginnerVisual({ units }) {
  return <main className="horizontal-map-screen public-original-visual"><header className="horizontal-map-topbar"><button type="button" className="horizontal-map-back" onClick={()=>go("/explore/english")}><ArrowLeft size={24}/> Volver</button><div className="horizontal-map-title"><span>English World</span><strong>Principiante</strong></div><div className="horizontal-map-stats"><div><Flame size={28}/><span>5 días</span></div><div><Gem size={28}/><span>Nivel 1</span></div><div><Star size={30} fill="currentColor"/><span>350</span></div></div></header><section className="horizontal-map-viewport"><div className="horizontal-map-world"><div className="horizontal-route-line"/>{units.map(([title,,image],index)=><button type="button" key={title} className={`horizontal-unit unit-position-${index+1} ${index===units.length-1?"horizontal-unit-final":""}`} onClick={()=>go(`/explore/preview/english/beginner/${index+1}`)}><span className="horizontal-unit-glow"/><img src={image} alt={title}/><div className="horizontal-unit-info"><strong>{title}</strong><div className="horizontal-unit-progress"><div style={{width:"0%"}}/></div><span><Play size={15} fill="currentColor"/> Comenzar</span></div></button>)}</div></section></main>;
}

function ComputerIntermediateVisual({ units }) {
  const accents=["blue","green","orange","purple"];
  return <main className="computer-intermediate-screen public-original-visual"><header className="computer-intermediate-topbar"><button type="button" className="computer-intermediate-back" onClick={()=>go("/explore/computer")}><ArrowLeft size={22}/> Volver</button><div className="computer-intermediate-title"><span>Mundo de Computación</span><strong>Intermedio</strong><small>Herramientas digitales para crear y organizar</small></div><div className="computer-intermediate-stats"><div><Flame size={25}/><span>5 días</span></div><div><Gem size={25}/><span>350 XP</span></div><div><Star size={27} fill="currentColor"/><span>18</span></div></div></header><section className="computer-intermediate-content"><div className="computer-intermediate-intro"><div><span>Nivel desbloqueado</span><h1>Aprende a crear con la computadora</h1><p>Completa las cuatro unidades para desbloquear el nivel Avanzado.</p></div><div className="computer-intermediate-overall"><strong>0/4</strong><span>Unidades completadas</span></div></div><section className="computer-intermediate-grid">{units.map(([title,subtitle,image],index)=><button type="button" key={title} className={`computer-intermediate-unit computer-intermediate-${accents[index]} ${index===3?"computer-intermediate-final":""}`} onClick={()=>go(`/explore/preview/computer/intermediate/${index+1}`)}><div className="computer-intermediate-number">{String(index+1).padStart(2,"0")}</div><div className="computer-intermediate-image"><img src={image} alt={title}/></div><div className="computer-intermediate-unit-info"><span>Unidad {index+1}</span><h2>{title}</h2><p>{subtitle}</p><div className="computer-intermediate-progress"><div style={{width:"0%"}}/></div><div className="computer-intermediate-status"><Play size={17} fill="currentColor"/> Comenzar</div></div></button>)}</section></section></main>;
}

function ComputerAdvancedVisual({ units }) {
  const accents=["cyan","violet","orange"];
  return <main className="advanced-map-screen public-original-visual"><header className="advanced-map-topbar"><button type="button" className="advanced-map-back" onClick={()=>go("/explore/computer")}><ArrowLeft size={22}/> Volver</button><div className="advanced-map-title"><span>Mundo de Computación</span><strong>Avanzado</strong><small>Robótica, inteligencia artificial y redes</small></div><div className="advanced-map-stats"><div><Flame size={24}/><span>5 días</span></div><div><Gem size={24}/><span>350 XP</span></div><div><Star size={25} fill="currentColor"/><span>18</span></div></div></header><section className="advanced-map-content"><div className="advanced-map-intro"><div><span>Nivel final</span><h1>Domina la tecnología del futuro</h1><p>Completa las tres unidades para convertirte en Explorador Digital Avanzado.</p></div><div className="advanced-map-count"><strong>0/3</strong><span>Unidades completadas</span></div></div><section className="advanced-map-grid">{units.map(([title,subtitle,image],index)=><button type="button" key={title} className={`advanced-unit-card advanced-${accents[index]}`} onClick={()=>go(`/explore/preview/computer/advanced/${index+1}`)}><div className="advanced-unit-number">0{index+1}</div><div className="advanced-unit-image"><img src={image} alt={title}/></div><div className="advanced-unit-copy"><span>Unidad {index+1}</span><h2>{title}</h2><p>{subtitle}</p><div className="advanced-unit-progress"><div style={{width:"0%"}}/></div><div className="advanced-unit-status"><Play size={17} fill="currentColor"/> Comenzar</div></div></button>)}</section></section></main>;
}

function EnglishIntermediateVisual({ units }) {
  return <main className="ei-map-screen public-original-visual"><header className="ei-map-header"><button className="ei-back" type="button" onClick={()=>go("/explore/english")}><ArrowLeft size={22}/> Volver a mundos</button><div className="ei-map-title"><span>ENGLISH WORLD</span><h1>Intermediate Adventure</h1><p>4 misiones para convertirte en una estrella del inglés</p></div><div className="ei-map-stats"><span className="ei-stat-pill ei-stat-streak"><i><Flame size={23} fill="currentColor"/></i><b>5</b><small>racha</small></span><span className="ei-stat-pill ei-stat-stars"><i><Star size={23} fill="currentColor"/></i><b>18</b><small>estrellas</small></span></div></header><section className="ei-map-track ei-image-map-track">{units.map(([title,,image],index)=><button type="button" key={title} className="ei-map-unit ei-image-unit" onClick={()=>go(`/explore/preview/english/intermediate/${index+1}`)} aria-label={`${title}: abrir misión`}><img className="ei-mission-image" src={image} alt={`Misión ${index+1}: ${title}`}/><div className="ei-image-shade"/><div className="ei-image-controls"><div className="ei-image-progress"><i style={{width:"0%"}}/></div><div className="ei-image-action"><span>0%</span><b><Play size={17} fill="currentColor"/>Comenzar misión</b></div></div></button>)}</section></main>;
}

function EnglishAdvancedVisual({ units }) {
  return <main className="ea-map-screen public-original-visual"><header className="ea-map-header"><button className="ea-back" type="button" onClick={()=>go("/explore/english")}><ArrowLeft/> Volver a niveles</button><div className="ea-title"><span>ENGLISH WORLD</span><h1>Advanced Champions</h1><p>3 aventuras para convertirte en campeón del inglés</p></div><div className="ea-stats"><b><Flame fill="currentColor"/> 5 <small>racha</small></b><b><Star fill="currentColor"/> 18 <small>estrellas</small></b></div></header><section className="ea-grid">{units.map(([title,,image],index)=><button type="button" key={title} className="ea-card" onClick={()=>go(`/explore/preview/english/advanced/${index+1}`)}><img src={image} alt={title}/><div className="ea-shade"/><div className="ea-bottom"><div><i style={{width:"0%"}}/></div><span>0%</span><strong><Play fill="currentColor"/> Comenzar</strong></div></button>)}</section></main>;
}
