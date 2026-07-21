export const levelTotals = {
  english: { beginner: 7, intermediate: 4, advanced: 3 },
  computer: { beginner: 9, intermediate: 4, advanced: 3 },
  math: { beginner: 6, intermediate: 6, advanced: 6 },
  language: { beginner: 7, intermediate: 7, advanced: 7 },
};

export const names = {
  language: {
    beginner: ["Vocales", "Abecedario", "Consonantes", "Sílabas", "Palabras", "Signos básicos", "Comunicación"],
    intermediate: ["Artículos", "Sustantivos", "Verbos", "Adjetivos", "Pronombres", "Gramática básica", "Separación silábica"],
    advanced: ["Ortografía", "Acentuación básica", "Comprensión intermedia", "Tipos de textos", "Párrafos", "Narraciones", "Ortografía avanzada"],
  },
  math: {
    beginner: ["NÃºmeros y cantidades", "Sumas", "Restas", "Figuras geomÃ©tricas", "Patrones y secuencias", "Comparaciones"],
    intermediate: ["MultiplicaciÃ³n", "DivisiÃ³n", "Fracciones", "Medidas", "Tiempo y calendario", "Dinero"],
    advanced: ["NÃºmeros grandes", "Decimales", "Fracciones equivalentes", "Problemas matemÃ¡ticos", "PerÃ­metro y Ã¡rea", "Coordenadas y lÃ³gica"],
  },
  english: {
    beginner: ["Colors", "Numbers", "Family", "Animals", "School", "Food", "Gran Cofre Final"],
    intermediate: ["Verb To Be", "Present Simple", "Daily Routine", "Final Challenge"],
    advanced: ["Conversations", "Reading & Listening", "Final Challenge"],
  },
  computer: {
    beginner: ["Â¿QuÃ© es una computadora?", "Partes de la computadora", "Teclado y mouse", "Sistema operativo", "Archivos y carpetas", "Internet", "Seguridad digital", "Creatividad digital", "DesafÃ­o final"],
    intermediate: ["Herramientas digitales", "Documentos", "Presentaciones", "DesafÃ­o final"],
    advanced: ["RobÃ³tica", "Inteligencia Artificial", "Redes y Seguridad"],
  },
};

export const worldLabel = { english: "English World", computer: "Mundo de la ComputaciÃ³n", math: "Mundo de MatemÃ¡ticas", language: "Comunicación y Lenguaje" };
export const levelLabel = { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" };

export const unitRoute = (world, level, id, section = "") => {
  const base = `/${world}/${level}/unit/${id}`;
  if (world === "english" && level === "beginner" && id === 7 && section === "game") return `${base}/challenge`;
  if (world === "english" && level === "beginner" && id === 7 && section === "lesson") return base;
  return section ? `${base}/${section}` : base;
};

export const unitImages = {
  language: {
    beginner: [
      "/worlds/language/official/language-vocales.png",
      "/worlds/language/official/language-abecedario.png",
      "/worlds/language/official/language-consonantes.png",
      "/worlds/language/official/language-silabas.png",
      "/worlds/language/official/language-palabras.png",
      "/worlds/language/official/language-signos-basicos.png",
      "/worlds/language/official/language-comunicacion.png",
    ],
    intermediate: [
      "/worlds/language/official/language-articulos.png",
      "/worlds/language/official/language-sustantivos.png",
      "/worlds/language/official/language-verbos.png",
      "/worlds/language/official/language-adjetivos.png",
      "/worlds/language/official/language-pronombres.png",
      "/worlds/language/official/language-gramatica.png",
      "/worlds/language/official/language-separacion-silabica.png",
    ],
    advanced: [
      "/worlds/language/official/language-ortografia.png",
      "/worlds/language/official/language-acentuacion.png",
      "/worlds/language/official/language-comprension-lectora.png",
      "/worlds/language/official/language-tipos-textos.png",
      "/worlds/language/official/language-parrafos.png",
      "/worlds/language/official/language-narraciones.png",
      "/worlds/language/official/language-ortografia-avanzada.png",
    ],
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
    beginner: "/worlds/language/official/language-level-beginner.png",
    intermediate: "/worlds/language/official/language-level-intermediate.png",
    advanced: "/worlds/language/official/language-level-advanced.png",
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
