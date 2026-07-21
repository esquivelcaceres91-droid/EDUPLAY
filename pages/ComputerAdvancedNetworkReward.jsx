import "../styles/computer-network-unit.css";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  Download,
  Gem,
  Home,
  Monitor,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import { completeUnit } from "../utils/progressManager";
import { getProfile } from "../utils/profileStorage";

const loadImage = (source) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
};

const drawRoundedRect = (
  context,
  x,
  y,
  width,
  height,
  radius
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(
    x + width,
    y + height,
    x,
    y + height,
    safeRadius
  );
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
};

const drawFallbackLogo = (context, centerX, topY) => {
  const iconX = centerX - 225;
  const iconY = topY;

  const iconGradient = context.createLinearGradient(
    iconX,
    iconY,
    iconX + 130,
    iconY + 100
  );
  iconGradient.addColorStop(0, "#7f35e8");
  iconGradient.addColorStop(1, "#168ee9");

  context.fillStyle = iconGradient;
  drawRoundedRect(context, iconX, iconY, 130, 92, 35);
  context.fill();

  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(iconX + 45, iconY + 48, 8, 0, Math.PI * 2);
  context.arc(iconX + 85, iconY + 48, 8, 0, Math.PI * 2);
  context.fill();

  context.strokeStyle = "#ffffff";
  context.lineWidth = 6;
  context.beginPath();
  context.arc(iconX + 65, iconY + 45, 27, 0.25, Math.PI - 0.25);
  context.stroke();

  context.fillStyle = "#ffcc32";
  context.beginPath();
  context.moveTo(iconX + 67, iconY - 22);
  for (let index = 0; index < 10; index += 1) {
    const angle = -Math.PI / 2 + (index * Math.PI) / 5;
    const radius = index % 2 === 0 ? 25 : 11;
    context.lineTo(
      iconX + 67 + Math.cos(angle) * radius,
      iconY - 1 + Math.sin(angle) * radius
    );
  }
  context.closePath();
  context.fill();

  const wordGradient = context.createLinearGradient(
    centerX - 70,
    topY,
    centerX + 300,
    topY
  );
  wordGradient.addColorStop(0, "#7028d9");
  wordGradient.addColorStop(1, "#158fe8");

  context.fillStyle = wordGradient;
  context.font = "900 78px Nunito, Arial";
  context.textAlign = "left";
  context.fillText("EDUPLAY", centerX - 70, topY + 74);
};

const drawLogo = async (context, canvasWidth) => {
  try {
    const logo = await loadImage("/assets/logo.png");
    const maxWidth = 520;
    const maxHeight = 145;
    const ratio = Math.min(
      maxWidth / logo.width,
      maxHeight / logo.height
    );
    const width = logo.width * ratio;
    const height = logo.height * ratio;

    context.drawImage(
      logo,
      (canvasWidth - width) / 2,
      78,
      width,
      height
    );
  } catch (error) {
    drawFallbackLogo(context, canvasWidth / 2, 92);
  }
};

export default function ComputerAdvancedNetworkReward() {
  const navigate = useNavigate();
  const location = useLocation();
  const saved = useRef(false);
  const profile = getProfile();

  const studentName =
    profile.name?.trim() || "Estudiante EduPlay";

  const score = Number(location.state?.score ?? 0);
  const total = Number(location.state?.total ?? 1);
  const hearts = Number(location.state?.hearts ?? 3);

  const percentage = useMemo(() => {
    return total > 0
      ? Math.round((score / total) * 100)
      : 0;
  }, [score, total]);

  const stars = useMemo(() => {
    if (percentage === 100 && hearts === 3) return 3;
    if (percentage >= 80) return 2;
    return 1;
  }, [percentage, hearts]);

  const xp = 320 + stars * 50 + hearts * 15;

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat("es-GT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  useEffect(() => {
    if (saved.current) return;

    saved.current = true;

    completeUnit(
      "computer",
      "advanced",
      3,
      stars,
      xp
    );
  }, [stars, xp]);

  const downloadDiploma = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1273;

    const context = canvas.getContext("2d");

    if (!context) return;

    const width = canvas.width;
    const height = canvas.height;

    context.fillStyle = "#fbfbff";
    context.fillRect(0, 0, width, height);

    const outsideGradient = context.createLinearGradient(
      0,
      0,
      width,
      height
    );
    outsideGradient.addColorStop(0, "#5420c5");
    outsideGradient.addColorStop(0.36, "#087fd6");
    outsideGradient.addColorStop(0.68, "#4c1bc0");
    outsideGradient.addColorStop(1, "#dd28d3");

    context.strokeStyle = outsideGradient;
    context.lineWidth = 30;
    drawRoundedRect(context, 28, 28, width - 56, height - 56, 46);
    context.stroke();

    context.strokeStyle = "#17236c";
    context.lineWidth = 8;
    drawRoundedRect(context, 58, 58, width - 116, height - 116, 34);
    context.stroke();

    context.strokeStyle = "rgba(106, 72, 220, 0.38)";
    context.lineWidth = 3;
    drawRoundedRect(context, 92, 92, width - 184, height - 184, 26);
    context.stroke();

    context.save();
    context.strokeStyle = "rgba(44, 168, 229, 0.16)";
    context.lineWidth = 3;

    for (let row = 0; row < 5; row += 1) {
      const y = 180 + row * 185;

      context.beginPath();
      context.moveTo(115, y);
      context.lineTo(225, y);
      context.lineTo(260, y + 35);
      context.lineTo(340, y + 35);
      context.stroke();

      context.beginPath();
      context.moveTo(width - 115, y);
      context.lineTo(width - 225, y);
      context.lineTo(width - 260, y + 35);
      context.lineTo(width - 340, y + 35);
      context.stroke();

      context.fillStyle = "rgba(44, 168, 229, 0.22)";
      context.beginPath();
      context.arc(225, y, 6, 0, Math.PI * 2);
      context.arc(width - 225, y, 6, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();

    await drawLogo(context, width);

    context.textAlign = "center";

    context.fillStyle = "#321078";
    context.font = "900 88px Nunito, Arial";
    context.fillText("DIPLOMA", width / 2, 330);

    context.fillStyle = "#14255e";
    context.font = "900 39px Nunito, Arial";
    context.fillText("DE FINALIZACIÓN", width / 2, 382);

    context.strokeStyle = "#7b28cf";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(535, 402);
    context.lineTo(720, 402);
    context.moveTo(1080, 402);
    context.lineTo(1265, 402);
    context.stroke();

    context.fillStyle = "#17255e";
    context.font = "800 28px Nunito, Arial";
    context.fillText("Este diploma se otorga a:", width / 2, 460);

    context.fillStyle = "#112f78";
    context.font = "italic 900 78px Georgia, serif";
    context.fillText(studentName, width / 2, 560);

    context.strokeStyle = "#7b28cf";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(420, 584);
    context.lineTo(1380, 584);
    context.stroke();

    context.fillStyle = "#22366e";
    context.font = "800 30px Nunito, Arial";
    context.fillText(
      "Por haber completado con éxito el curso de",
      width / 2,
      650
    );

    context.fillStyle = "#7225c9";
    context.font = "900 43px Nunito, Arial";
    context.fillText(
      "COMPUTACIÓN AVANZADO",
      width / 2,
      710
    );

    context.fillStyle = "#263970";
    context.font = "700 26px Nunito, Arial";
    context.fillText(
      "demostrando conocimientos en ofimática, robótica, inteligencia artificial,",
      width / 2,
      763
    );
    context.fillText(
      "redes y seguridad digital, con dedicación y pasión por aprender.",
      width / 2,
      802
    );

    context.fillStyle = "#7427cd";
    context.font = "900 32px Nunito, Arial";
    context.fillText(
      "¡Felicitaciones por este gran logro!",
      width / 2,
      862
    );

    const sealGradient = context.createRadialGradient(
      width / 2,
      960,
      10,
      width / 2,
      960,
      85
    );
    sealGradient.addColorStop(0, "#fff69e");
    sealGradient.addColorStop(0.5, "#ffd33f");
    sealGradient.addColorStop(1, "#bd7c08");

    context.fillStyle = sealGradient;
    context.beginPath();
    context.arc(width / 2, 960, 76, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "#9e6500";
    context.lineWidth = 5;
    context.beginPath();
    context.arc(width / 2, 960, 65, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = "#7d5000";
    context.font = "900 24px Nunito, Arial";
    context.fillText("EDUPLAY", width / 2, 952);
    context.font = "900 16px Nunito, Arial";
    context.fillText("EXCELENCIA", width / 2, 978);

    context.textAlign = "center";

    const signatureX = 590;
    const dateX = 1210;
    const signatureY = 1050;

    context.fillStyle = "#152c70";
    context.font = "italic 900 62px Georgia, serif";
    context.fillText("EduPlay", signatureX, signatureY);

    context.strokeStyle = "#243a79";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(signatureX - 205, signatureY + 24);
    context.lineTo(signatureX + 205, signatureY + 24);
    context.stroke();

    context.fillStyle = "#7427cd";
    context.font = "900 20px Nunito, Arial";
    context.fillText("Firma oficial EduPlay", signatureX, signatureY + 58);

    context.fillStyle = "#152c70";
    context.font = "800 30px Nunito, Arial";
    context.fillText(formattedDate, dateX, signatureY);

    context.strokeStyle = "#243a79";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(dateX - 205, signatureY + 24);
    context.lineTo(dateX + 205, signatureY + 24);
    context.stroke();

    context.fillStyle = "#7427cd";
    context.font = "900 20px Nunito, Arial";
    context.fillText("Fecha de finalización", dateX, signatureY + 58);

    context.fillStyle = "#15265c";
    context.font = "900 21px Nunito, Arial";
    context.fillText(
      "SIGUE APRENDIENDO · SIGUE EXPLORANDO · SIGUE CRECIENDO",
      width / 2,
      1190
    );

    const link = document.createElement("a");
    link.download = `Diploma_EduPlay_${studentName.replace(
      /\s+/g,
      "_"
    )}.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  };

  return (
    <main className="network-screen">
      <section className="final-reward-shell">
        <motion.article
          className="final-reward-card"
          initial={{ opacity: 0, y: 30, scale: 0.86 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          <motion.div
            className="final-trophy"
            initial={{ rotate: -12, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
          >
            <Trophy size={90} fill="currentColor" />
          </motion.div>

          <div className="final-badge">
            <CheckCircle2 size={20} />
            Mundo de Computación completado
          </div>

          <h1>¡Experto Digital EduPlay!</h1>

          <p>
            Terminaste Robótica, Inteligencia Artificial,
            Redes y Seguridad. Tu diploma ya está listo.
          </p>

          <div className="final-stars">
            {[1, 2, 3].map((number) => (
              <Star
                key={number}
                size={61}
                fill="currentColor"
                className={
                  number <= stars ? "active" : "empty"
                }
              />
            ))}
          </div>

          <div className="final-summary">
            <div>
              <Sparkles size={26} />
              <span>
                Resultado
                <strong>
                  {score}/{total}
                </strong>
              </span>
            </div>

            <div>
              <Star size={26} fill="currentColor" />
              <span>
                Estrellas
                <strong>{stars}</strong>
              </span>
            </div>

            <div>
              <Gem size={26} />
              <span>
                Experiencia
                <strong>+{xp} XP</strong>
              </span>
            </div>
          </div>

          <div className="diploma-preview diploma-preview-new">
            <img
              src="/assets/logo.png"
              alt="EduPlay"
              className="diploma-preview-logo"
            />

            <div>
              <span>Diploma de finalización otorgado a</span>
              <strong>{studentName}</strong>
              <small>
                Firmado oficialmente por EduPlay · {formattedDate}
              </small>
            </div>

            <ShieldCheck size={55} />
          </div>

          <button
            type="button"
            className="download-diploma"
            onClick={downloadDiploma}
          >
            <Download size={23} />
            Descargar diploma en imagen
          </button>

          <div className="final-actions">
            <button
              type="button"
              className="network-secondary"
              onClick={() => navigate("/home")}
            >
              <Home size={21} />
              Inicio
            </button>

            <button
              type="button"
              className="network-secondary"
              onClick={() => navigate("/computer")}
            >
              <Monitor size={21} />
              Mundo
            </button>

            <button
              type="button"
              className="network-primary"
              onClick={() => window.print()}
            >
              <Printer size={21} />
              Imprimir pantalla
            </button>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
