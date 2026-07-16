import "../styles/certificate-download.css";

import { Download } from "lucide-react";
import { getProfile } from "../utils/profileStorage";
import { queueCloudProfileStateSave } from "../utils/cloudState";

const LEVEL_CONFIG = {
  beginner: {
    levelLabel: "PRINCIPIANTE",
    code: "P",
    primary: "#0d8bd8",
    secondary: "#38d3ef",
    accent: "#ffd34e",
    description:
      "Por haber completado con éxito las nueve unidades del nivel Principiante de Computación, demostrando dominio de los fundamentos digitales.",
  },
  intermediate: {
    levelLabel: "INTERMEDIO",
    code: "I",
    primary: "#087f91",
    secondary: "#36d5c4",
    accent: "#ffd34e",
    description:
      "Por haber completado con éxito las cuatro unidades del nivel Intermedio de Computación, demostrando habilidades en Word, Excel y PowerPoint.",
  },
  advanced: {
    levelLabel: "AVANZADO",
    code: "A",
    primary: "#5522c7",
    secondary: "#168fe9",
    accent: "#ffd34e",
    description:
      "Por haber completado con éxito el nivel Avanzado de Computación, demostrando conocimientos en robótica, inteligencia artificial, redes y seguridad digital.",
  },
};

const roundedRect = (context, x, y, width, height, radius) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
};

const loadImage = (source) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });

const drawLogo = async (context, width) => {
  try {
    const logo = await loadImage("/assets/logo.png");
    const maxWidth = 500;
    const maxHeight = 135;
    const scale = Math.min(
      maxWidth / logo.width,
      maxHeight / logo.height
    );
    const logoWidth = logo.width * scale;
    const logoHeight = logo.height * scale;

    context.drawImage(
      logo,
      (width - logoWidth) / 2,
      66,
      logoWidth,
      logoHeight
    );
  } catch {
    const gradient = context.createLinearGradient(
      width / 2 - 230,
      80,
      width / 2 + 230,
      80
    );
    gradient.addColorStop(0, "#7228d9");
    gradient.addColorStop(1, "#168fe9");
    context.fillStyle = gradient;
    context.font = "900 78px Nunito, Arial";
    context.textAlign = "center";
    context.fillText("EDUPLAY", width / 2, 155);
  }
};

const createCertificateCode = (levelCode, studentName) => {
  const storedKey = `eduplay-certificate-computer-${levelCode}`;
  const stored = localStorage.getItem(storedKey);
  if (stored) return stored;

  const normalized = studentName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");

  const number = String(Date.now()).slice(-6);
  const code = `EDU-COMP-${levelCode}-${normalized}-${number}`;
  localStorage.setItem(storedKey, code);
  queueCloudProfileStateSave();
  return code;
};

export default function CertificateDownload({
  level = "beginner",
  className = "",
  label = "Descargar diploma",
}) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.beginner;

  const downloadCertificate = async () => {
    const profile = getProfile();
    const studentName =
      profile?.name?.trim() || "Estudiante EduPlay";

    const date = new Intl.DateTimeFormat("es-GT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());

    const certificateCode = createCertificateCode(
      config.code,
      studentName
    );

    const canvas = document.createElement("canvas");
    canvas.width = 1800;
    canvas.height = 1273;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height } = canvas;

    context.fillStyle = "#fcfcff";
    context.fillRect(0, 0, width, height);

    const borderGradient = context.createLinearGradient(
      0,
      0,
      width,
      height
    );
    borderGradient.addColorStop(0, config.primary);
    borderGradient.addColorStop(0.52, config.secondary);
    borderGradient.addColorStop(1, config.primary);

    context.strokeStyle = borderGradient;
    context.lineWidth = 30;
    roundedRect(context, 28, 28, width - 56, height - 56, 46);
    context.stroke();

    context.strokeStyle = "#17266b";
    context.lineWidth = 8;
    roundedRect(context, 58, 58, width - 116, height - 116, 34);
    context.stroke();

    context.strokeStyle = `${config.secondary}55`;
    context.lineWidth = 3;
    roundedRect(context, 92, 92, width - 184, height - 184, 26);
    context.stroke();

    context.save();
    context.strokeStyle = `${config.secondary}28`;
    context.lineWidth = 3;
    for (let row = 0; row < 5; row += 1) {
      const y = 190 + row * 185;
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
    }
    context.restore();

    await drawLogo(context, width);

    context.textAlign = "center";
    context.fillStyle = config.primary;
    context.font = "900 86px Nunito, Arial";
    context.fillText("DIPLOMA", width / 2, 325);

    context.fillStyle = "#14255e";
    context.font = "900 38px Nunito, Arial";
    context.fillText("DE COMPUTACIÓN", width / 2, 377);

    context.fillStyle = "#1e326e";
    context.font = "800 27px Nunito, Arial";
    context.fillText("Este diploma se otorga a:", width / 2, 451);

    context.fillStyle = "#112f78";
    context.font = "italic 900 76px Georgia, serif";
    context.fillText(studentName, width / 2, 548);

    context.strokeStyle = config.primary;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(420, 574);
    context.lineTo(1380, 574);
    context.stroke();

    context.fillStyle = "#24386f";
    context.font = "800 28px Nunito, Arial";
    context.fillText(
      "Por haber completado satisfactoriamente el nivel",
      width / 2,
      640
    );

    context.fillStyle = config.primary;
    context.font = "900 48px Nunito, Arial";
    context.fillText(
      `COMPUTACIÓN ${config.levelLabel}`,
      width / 2,
      710
    );

    context.fillStyle = "#2b3f73";
    context.font = "700 25px Nunito, Arial";

    const descriptionLines = level === "intermediate"
      ? [
          "demostrando habilidades en Microsoft Word, Excel y PowerPoint,",
          "junto con dedicación, creatividad y pasión por aprender.",
        ]
      : level === "advanced"
      ? [
          "demostrando conocimientos en robótica, inteligencia artificial,",
          "redes y seguridad digital, con dedicación y pasión por aprender.",
        ]
      : [
          "demostrando dominio de los fundamentos de computación, uso seguro",
          "de Internet y manejo responsable de herramientas digitales.",
        ];

    descriptionLines.forEach((line, index) => {
      context.fillText(line, width / 2, 770 + index * 39);
    });

    const sealX = width / 2;
    const sealY = 930;
    const sealGradient = context.createRadialGradient(
      sealX,
      sealY,
      8,
      sealX,
      sealY,
      82
    );
    sealGradient.addColorStop(0, "#fff7a0");
    sealGradient.addColorStop(0.55, config.accent);
    sealGradient.addColorStop(1, "#d49410");
    context.fillStyle = sealGradient;
    context.beginPath();
    context.arc(sealX, sealY, 78, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "#ffffff";
    context.lineWidth = 6;
    context.beginPath();
    context.arc(sealX, sealY, 58, 0, Math.PI * 2);
    context.stroke();

    context.fillStyle = "#5d3a05";
    context.font = "900 21px Nunito, Arial";
    context.fillText("EDUPLAY", sealX, sealY - 5);
    context.font = "900 16px Nunito, Arial";
    context.fillText("CERTIFICADO", sealX, sealY + 23);

    context.textAlign = "left";
    context.fillStyle = config.primary;
    context.font = "italic 900 52px Georgia, serif";
    context.fillText("EduPlay", 1110, 1005);

    context.strokeStyle = "#1d316c";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(1060, 1025);
    context.lineTo(1510, 1025);
    context.stroke();

    context.fillStyle = "#25396f";
    context.font = "800 21px Nunito, Arial";
    context.fillText("Firma oficial de EduPlay", 1160, 1057);

    context.fillStyle = "#25396f";
    context.font = "800 22px Nunito, Arial";
    context.fillText(`Fecha: ${date}`, 1110, 1100);

    context.textAlign = "left";
    context.fillStyle = "#4b5b87";
    context.font = "700 18px Nunito, Arial";
    context.fillText(`Código: ${certificateCode}`, 170, 1128);

    context.textAlign = "center";
    context.fillStyle = config.primary;
    context.font = "900 28px Nunito, Arial";
    context.fillText(
      "¡Felicitaciones por este gran logro!",
      width / 2,
      1190
    );

    const link = document.createElement("a");
    const safeName = studentName
      .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    link.download = `Diploma-Computacion-${config.levelLabel}-${safeName}.png`;
    link.href = canvas.toDataURL("image/png", 1);
    link.click();
  };

  return (
    <button
      type="button"
      className={`certificate-download-button ${className}`.trim()}
      onClick={downloadCertificate}
    >
      <Download size={21} />
      {label}
    </button>
  );
}