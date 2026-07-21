export const levelTotals = {
  english: { beginner: 7, intermediate: 4, advanced: 3 },
  computer: { beginner: 9, intermediate: 4, advanced: 3 },
  math: { beginner: 6, intermediate: 6, advanced: 6 },
  language: { beginner: 10, intermediate: 10, advanced: 10 },
};
export const names = {
  language: {
    beginner: ["Abecedario","Vocales","Consonantes","Sílabas","Palabras","Sustantivos","Verbos","Adjetivos","Artículos","Signos básicos"],
    intermediate: ["Ortografía","Separación silábica","Pronombres","Acentuación básica","Gramática básica","Comprensión intermedia","Tipos de textos","Párrafos","Narraciones","Ortografía avanzada"],
    advanced: ["Comunicación","Redacción","Resúmenes","Acentuación avanzada","Gramática avanzada","Comprensión crítica","Tipos de textos complejos","Literatura guatemalteca","Exposiciones","Medios de comunicación"],
  },
  math: {
    beginner: ["Números y cantidades","Sumas","Restas","Figuras geométricas","Patrones y secuencias","Comparaciones"],
    intermediate: ["Multiplicación","División","Fracciones","Medidas","Tiempo y calendario","Dinero"],
    advanced: ["Números grandes","Decimales","Fracciones equivalentes","Problemas matemáticos","Perímetro y área","Coordenadas y lógica"],
  },
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
export const worldLabel = { english: "English World", computer: "Mundo de la Computación", math: "Mundo de Matemáticas", language: "Comunicación y Lenguaje" };
export const levelLabel = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" };
export const unitRoute = (world, level, id, section="") => {
  const base = `/${world}/${level}/unit/${id}`;
  if (world === "english" && level === "beginner" && id === 7 && section === "game") return `${base}/challenge`;
  if (world === "english" && level === "beginner" && id === 7 && section === "lesson") return base;
  return section ? `${base}/${section}` : base;
};


export const unitImages = {
  language: {
    beginner: Array(10).fill("/worlds/language/beginner/level.svg"),
    intermediate: Array(10).fill("/worlds/language/intermediate/level.svg"),
    advanced: Array(10).fill("/worlds/language/advanced/level.svg"),
  },
  math: {
    beginner: ["math-numeros-cantidades", "math-sumas", "math-restas", "math-figuras-geometricas", "math-patrones-secuencias", "math-mayor-menor"].map((name) => `/worlds/math/official/${name}.webp`),
    intermediate: ["math-multiplicacion", "math-division", "math-fracciones", "math-medidas", "math-tiempo-calendario", "math-dinero"].map((name) => `/worlds/math/official/${name}.webp`),
    advanced: ["math-numeros-grandes-decimales", "math-problemas-matematicos", "math-fracciones-equivalentes", "math-perimetro-area", "math-coordenadas-plano", "math-logica-matematica"].map((name) => `/worlds/math/official/${name}.webp`),
  },
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
  language: {
    beginner: "/worlds/language/beginner/level.svg",
    intermediate: "/worlds/language/intermediate/level.svg",
    advanced: "/worlds/language/advanced/level.svg",
  },
  math: {
    beginner: "/worlds/math/official/math-level-beginner.webp",
    intermediate: "/worlds/math/official/math-level-intermediate.webp",
    advanced: "/worlds/math/official/math-level-advanced.webp",
  },
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
