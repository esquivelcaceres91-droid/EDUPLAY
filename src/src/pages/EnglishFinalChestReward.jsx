import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Crown,
  Download,
  Gem,
  Home,
  Map,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { completeUnit } from "../utils/progressManager";
import { getProfile } from "../utils/profileStorage";
import "../styles/english-final-chest.css";

const getStudentName = () => {
  const profileName = getProfile()?.name?.trim();
  return profileName || "Estudiante EduPlay";
};

const drawCenteredText = (ctx, text, x, y, maxWidth) => {
  const measured = ctx.measureText(text).width;
  if (measured <= maxWidth) {
    ctx.fillText(text, x, y);
    return;
  }

  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });

  if (line) lines.push(line);
  const lineHeight = 70;
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.slice(0, 2).forEach((item, index) => {
    ctx.fillText(item, x, startY + index * lineHeight);
  });
};

const drawGoldStar = (ctx, cx, cy, outerRadius, innerRadius, points = 5) => {
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  const gradient = ctx.createLinearGradient(cx, cy - outerRadius, cx, cy + outerRadius);
  gradient.addColorStop(0, "#fff7a9");
  gradient.addColorStop(0.45, "#ffd34e");
  gradient.addColorStop(1, "#d28b0a");
  ctx.fillStyle = gradient;
  ctx.shadowColor = "rgba(121, 65, 0, .35)";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#a86b05";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
};

export default function EnglishFinalChestReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const saved = useRef(false);
  const studentName = getStudentName();
  const score = Number(location.state?.score ?? 12);
  const total = Number(location.state?.total ?? 15);
  const hearts = Math.max(0, Number(location.state?.hearts ?? 3));
  const percentage = Math.round((score / total) * 100);
  const stars = useMemo(
    () => (percentage >= 90 && hearts >= 2 ? 3 : percentage >= 70 ? 2 : 1),
    [percentage, hearts],
  );
  const xp = 300 + stars * 50 + hearts * 20;

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;
    completeUnit("english", "beginner", 7, stars, xp);
  }, [stars, xp]);

  const downloadDiploma = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1250;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const paper = ctx.createLinearGradient(0, 0, 1800, 1250);
    paper.addColorStop(0, "#fff9df");
    paper.addColorStop(0.48, "#fffef8");
    paper.addColorStop(1, "#f5e9ff");
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(900, 160, 30, 900, 160, 700);
    glow.addColorStop(0, "rgba(250, 210, 75, .24)");
    glow.addColorStop(1, "rgba(250, 210, 75, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#4c238d";
    ctx.lineWidth = 34;
    ctx.strokeRect(38, 38, 1724, 1174);
    ctx.strokeStyle = "#dba420";
    ctx.lineWidth = 9;
    ctx.strokeRect(76, 76, 1648, 1098);
    ctx.strokeStyle = "#7c48bd";
    ctx.lineWidth = 3;
    ctx.strokeRect(95, 95, 1610, 1060);

    [[135,135],[1665,135],[135,1115],[1665,1115]].forEach(([x,y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      const jewel = ctx.createRadialGradient(x - 7, y - 8, 2, x, y, 25);
      jewel.addColorStop(0, "#fff4ff");
      jewel.addColorStop(.35, "#c77cff");
      jewel.addColorStop(1, "#5a2195");
      ctx.fillStyle = jewel;
      ctx.fill();
      ctx.strokeStyle = "#e8ba38";
      ctx.lineWidth = 4;
      ctx.stroke();
    });

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#4f258f";
    ctx.font = "900 88px Georgia";
    ctx.fillText("EDUPLAY", 900, 165);

    ctx.fillStyle = "#b77a0a";
    ctx.font = "700 32px Georgia";
    ctx.letterSpacing = "8px";
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", 900, 242);
    ctx.letterSpacing = "0px";

    ctx.strokeStyle = "#d3a124";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(465, 282);
    ctx.lineTo(1335, 282);
    ctx.stroke();

    ctx.fillStyle = "#594969";
    ctx.font = "500 31px Georgia";
    ctx.fillText("Este diploma certifica que", 900, 350);

    ctx.fillStyle = "#5b2aa1";
    ctx.font = "900 70px Georgia";
    drawCenteredText(ctx, studentName, 900, 455, 1300);

    ctx.strokeStyle = "#d9aa2e";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(300, 520);
    ctx.lineTo(1500, 520);
    ctx.stroke();

    ctx.fillStyle = "#544565";
    ctx.font = "500 31px Georgia";
    ctx.fillText("ha completado exitosamente el nivel", 900, 590);

    const titleGradient = ctx.createLinearGradient(550, 0, 1250, 0);
    titleGradient.addColorStop(0, "#482081");
    titleGradient.addColorStop(.5, "#8d43c6");
    titleGradient.addColorStop(1, "#482081");
    ctx.fillStyle = titleGradient;
    ctx.font = "900 65px Georgia";
    ctx.fillText("ENGLISH BEGINNER", 900, 675);

    ctx.fillStyle = "#6b5a77";
    ctx.font = "500 27px Arial";
    ctx.fillText("Colors  •  Numbers  •  Family  •  Animals  •  School  •  Food", 900, 750);
    ctx.font = "600 25px Arial";
    ctx.fillText("y ha superado con éxito el Gran Cofre Final", 900, 798);

    const starStart = 780;
    for (let index = 0; index < 3; index += 1) {
      drawGoldStar(ctx, starStart + index * 120, 895, 43, 20);
    }

    ctx.fillStyle = "#4d3d58";
    ctx.font = "700 24px Georgia";
    ctx.fillText(`Resultado final: ${score}/${total}  •  ${percentage}%`, 900, 975);

    const dateText = new Date().toLocaleDateString("es-GT", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    ctx.strokeStyle = "#8b6aa4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(260, 1060);
    ctx.lineTo(650, 1060);
    ctx.moveTo(1150, 1060);
    ctx.lineTo(1540, 1060);
    ctx.stroke();

    ctx.fillStyle = "#5b4a66";
    ctx.font = "600 23px Georgia";
    ctx.fillText(dateText, 455, 1095);
    ctx.fillText("EduPlay Academy", 1345, 1095);
    ctx.font = "500 19px Arial";
    ctx.fillText("Fecha de finalización", 455, 1130);
    ctx.fillText("Certificación digital", 1345, 1130);

    ctx.beginPath();
    ctx.arc(900, 1080, 63, 0, Math.PI * 2);
    const seal = ctx.createRadialGradient(880, 1058, 5, 900, 1080, 65);
    seal.addColorStop(0, "#fff0a2");
    seal.addColorStop(.35, "#f1be35");
    seal.addColorStop(1, "#b36e0a");
    ctx.fillStyle = seal;
    ctx.fill();
    ctx.strokeStyle = "#7a4604";
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "#522384";
    ctx.font = "900 28px Georgia";
    ctx.fillText("EP", 900, 1072);
    ctx.font = "700 13px Arial";
    ctx.fillText("ENGLISH", 900, 1102);

    const safeName = studentName.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s-]/g, "").trim().replace(/\s+/g, "-");
    const link = document.createElement("a");
    link.download = `Diploma-English-Beginner-${safeName || "EduPlay"}.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  };

  return (
    <main className="chest-screen chest-reward-mode">
      <div className="celebration-particles" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => (
          <i
            key={index}
            style={{
              left: `${(index * 43) % 100}%`,
              animationDelay: `${(index % 8) * 0.18}s`,
            }}
          />
        ))}
      </div>

      <motion.section
        className="chest-reward-card"
        initial={{ opacity: 0, scale: 0.72, y: 55 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 105 }}
      >
        <div className="royal-trophy">
          <Crown size={44} />
          <Trophy size={92} fill="currentColor" />
        </div>

        <span className="royal-badge">
          <CheckCircle2 /> Nivel completado
        </span>

        <h1>¡Abriste el Gran Cofre!</h1>
        <p>
          Completaste todas las aventuras de English Principiante. Tu nuevo
          camino hacia Intermedio está listo.
        </p>

        <div className="royal-stars">
          {[1, 2, 3].map((number) => (
            <motion.span
              key={number}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25 + number * 0.18 }}
              className={number <= stars ? "active" : ""}
            >
              <Star size={64} fill="currentColor" />
            </motion.span>
          ))}
        </div>

        <div className="royal-summary">
          <div><Gem /><span><small>Puntuación</small><strong>{score}/{total}</strong></span></div>
          <div><Star /><span><small>Estrellas</small><strong>{stars}</strong></span></div>
          <div><Sparkles /><span><small>Experiencia</small><strong>+{xp} XP</strong></span></div>
        </div>

        <div className="level-unlocked">
          <Crown />
          <span>
            <strong>¡English Intermedio desbloqueado!</strong>
            Ya puedes continuar con nuevas aventuras y desafíos.
          </span>
        </div>

        <div className="diploma-card diploma-card-premium">
          <Award size={60} />
          <div>
            <span>CERTIFICATE OF ACHIEVEMENT</span>
            <strong>English Beginner</strong>
            <small>Otorgado a</small>
            <b>{studentName}</b>
          </div>
          <Trophy size={60} />
        </div>

        <button className="download-diploma-btn" onClick={downloadDiploma}>
          <Download /> Descargar diploma premium
        </button>

        <div className="royal-actions">
          <button className="chest-secondary" onClick={() => navigate("/home")}>
            <Home /> Inicio
          </button>
          <button className="chest-secondary" onClick={() => navigate("/english/beginner")}>
            <Map /> Ver mapa
          </button>
          <button className="chest-primary" onClick={() => navigate("/english")}>
            <Crown /> Ver niveles
          </button>
        </div>
      </motion.section>
    </main>
  );
}
