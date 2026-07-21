export const levelTotals = {
  english: { beginner: 7, intermediate: 4, advanced: 3 },
  computer: { beginner: 9, intermediate: 4, advanced: 3 },
};
export const names = {
  english: {
    beginner: ["Colors","Numbers","Family","Animals","School","Food","Gran Cofre Final"],
    intermediate: ["Verb To Be","Present Simple","Daily Routine","Final Challenge"],
    advanced: ["Conversations","Reading & Listening","Final Challenge"],
  },
  computer: {
    beginner: ["¿Qué es una computadora?","Partes de la computadora","Teclado y mouse","Sistema operativo","Archivos y carpetas","Internet","Seguridad digital","Creatividad digital","Desafío final"],
    intermediate: ["Herramientas digitales","Documentos","Presentaciones","Desafío final"],
    advanced: ["Robótica","Inteligencia Artificial","Redes y Seguridad"],
  },
};
export const worldLabel = { english: "English World", computer: "Mundo de la Computación" };
export const levelLabel = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" };
export const unitRoute = (world, level, id, section="") => {
  const base = `/${world}/${level}/unit/${id}`;
  if (world === "english" && level === "beginner" && id === 7 && section === "game") return `${base}/challenge`;
  if (world === "english" && level === "beginner" && id === 7 && section === "lesson") return base;
  return section ? `${base}/${section}` : base;
};


export const unitImages = {
  english: {
    beginner: [
      "/assets/maps/english-beginner/unit-colors.png",
      "/assets/maps/english-beginner/unit-numbers.png",
      "/assets/maps/english-beginner/unit-family.png",
      "/assets/maps/english-beginner/unit-animals.png",
      "/assets/maps/english-beginner/unit-school.png",
      "/assets/maps/english-beginner/unit-food.png",
      "/assets/maps/english-beginner/treasure.png",
    ],
    intermediate: [
      "/assets/english/intermediate/verb-to-be-banner.webp",
      "/assets/english/intermediate/present-simple-banner.webp",
      "/assets/english/intermediate/daily-routine-banner.webp",
      "/assets/english/intermediate/final-challenge-banner.webp",
    ],
    advanced: [
      "/assets/english/advanced/conversation-banner.png",
      "/assets/english/advanced/reading-listening-banner.png",
      "/assets/english/advanced/final-challenge-banner.png",
    ],
  },
  computer: {
    beginner: [
      "/assets/computer/maps/beginner/unit-computer.png",
      "/assets/computer/maps/beginner/unit-parts.png",
      "/assets/computer/maps/beginner/unit-keyboard.png",
      "/assets/computer/maps/beginner/unit-windows.png",
      "/assets/computer/maps/beginner/unit-folders.png",
      "/assets/computer/maps/beginner/unit-internet.png",
      "/assets/computer/maps/beginner/unit-mouse.png",
      "/assets/computer/maps/beginner/unit-paint.png",
      "/assets/computer/maps/beginner/final-chest.png",
    ],
    intermediate: [
      "/assets/computer/maps/intermediate/unit-excel.png",
      "/assets/computer/maps/intermediate/unit-word.png",
      "/assets/computer/maps/intermediate/unit-powerpoint.png",
      "/assets/computer/maps/intermediate/final-chest.png",
    ],
    advanced: [
      "/assets/computer/advanced/unit-robotics.png",
      "/assets/computer/advanced/unit-ai.png",
      "/assets/computer/advanced/unit-networks.png",
    ],
  },
};

export const levelImages = {
  english: {
    beginner: "/assets/levels/beginner.png",
    intermediate: "/assets/levels/intermediate.png",
    advanced: "/assets/levels/advanced.png",
  },
  computer: {
    beginner: "/assets/computer/levels/beginner.png",
    intermediate: "/assets/computer/levels/intermediate.png",
    advanced: "/assets/computer/levels/advanced.png",
  },
};

export const unitImage = (world, level, id) =>
  unitImages?.[world]?.[level]?.[Number(id) - 1] || "/assets/logo.png";
