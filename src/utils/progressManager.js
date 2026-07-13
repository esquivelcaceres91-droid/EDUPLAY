const STORAGE_KEY = "eduplay_progress";

const createDefaultProgress = () => ({
  worlds: {
    computer: {
      beginner: {
        unlockedUnits: [1],
        completedUnits: [],
        stars: 0,
        xp: 0,
        progress: {},
      },
    },
  },
});

const ensureProgressStructure = (data) => {
  const safeData =
    data && typeof data === "object"
      ? data
      : createDefaultProgress();

  if (!safeData.worlds) {
    safeData.worlds = {};
  }

  if (!safeData.worlds.computer) {
    safeData.worlds.computer = {};
  }

  if (!safeData.worlds.computer.beginner) {
    safeData.worlds.computer.beginner = {
      unlockedUnits: [1],
      completedUnits: [],
      stars: 0,
      xp: 0,
      progress: {},
    };
  }

  const beginner = safeData.worlds.computer.beginner;

  if (!Array.isArray(beginner.unlockedUnits)) {
    beginner.unlockedUnits = [1];
  }

  if (!beginner.unlockedUnits.includes(1)) {
    beginner.unlockedUnits.push(1);
  }

  if (!Array.isArray(beginner.completedUnits)) {
    beginner.completedUnits = [];
  }

  if (typeof beginner.stars !== "number") {
    beginner.stars = 0;
  }

  if (typeof beginner.xp !== "number") {
    beginner.xp = 0;
  }

  if (!beginner.progress || typeof beginner.progress !== "object") {
    beginner.progress = {};
  }

  return safeData;
};

export const getProgress = () => {
  try {
    const savedProgress = localStorage.getItem(STORAGE_KEY);

    if (!savedProgress) {
      const defaultProgress = createDefaultProgress();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultProgress)
      );

      return defaultProgress;
    }

    const parsedProgress = JSON.parse(savedProgress);
    const safeProgress = ensureProgressStructure(parsedProgress);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(safeProgress)
    );

    return safeProgress;
  } catch (error) {
    console.error("Error al leer el progreso:", error);

    const defaultProgress = createDefaultProgress();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultProgress)
    );

    return defaultProgress;
  }
};

export const saveProgress = (progressData) => {
  try {
    const safeProgress = ensureProgressStructure(progressData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(safeProgress)
    );

    return safeProgress;
  } catch (error) {
    console.error("Error al guardar el progreso:", error);
    return null;
  }
};

export const getLevelProgress = (
  world = "computer",
  level = "beginner"
) => {
  const progress = getProgress();

  if (!progress.worlds[world]) {
    progress.worlds[world] = {};
  }

  if (!progress.worlds[world][level]) {
    progress.worlds[world][level] = {
      unlockedUnits: [1],
      completedUnits: [],
      stars: 0,
      xp: 0,
      progress: {},
    };

    saveProgress(progress);
  }

  return progress.worlds[world][level];
};

export const completeUnit = (
  world = "computer",
  level = "beginner",
  unitId,
  stars = 3,
  xp = 100
) => {
  const progress = getProgress();

  if (!progress.worlds[world]) {
    progress.worlds[world] = {};
  }

  if (!progress.worlds[world][level]) {
    progress.worlds[world][level] = {
      unlockedUnits: [1],
      completedUnits: [],
      stars: 0,
      xp: 0,
      progress: {},
    };
  }

  const levelProgress = progress.worlds[world][level];
  const numericUnitId = Number(unitId);

  if (!levelProgress.completedUnits.includes(numericUnitId)) {
    levelProgress.completedUnits.push(numericUnitId);
    levelProgress.stars += Number(stars) || 0;
    levelProgress.xp += Number(xp) || 0;
  }

  levelProgress.progress[numericUnitId] = 100;

  const nextUnitId = numericUnitId + 1;

  if (
    nextUnitId <= 9 &&
    !levelProgress.unlockedUnits.includes(nextUnitId)
  ) {
    levelProgress.unlockedUnits.push(nextUnitId);
  }

  levelProgress.unlockedUnits.sort((a, b) => a - b);
  levelProgress.completedUnits.sort((a, b) => a - b);

  saveProgress(progress);

  return levelProgress;
};

export const updateUnitProgress = (
  world = "computer",
  level = "beginner",
  unitId,
  percentage = 0
) => {
  const progress = getProgress();

  if (!progress.worlds[world]) {
    progress.worlds[world] = {};
  }

  if (!progress.worlds[world][level]) {
    progress.worlds[world][level] = {
      unlockedUnits: [1],
      completedUnits: [],
      stars: 0,
      xp: 0,
      progress: {},
    };
  }

  const safePercentage = Math.max(
    0,
    Math.min(100, Number(percentage) || 0)
  );

  progress.worlds[world][level].progress[unitId] =
    safePercentage;

  saveProgress(progress);

  return safePercentage;
};

export const getUnitProgress = (
  world = "computer",
  level = "beginner",
  unitId
) => {
  const levelProgress = getLevelProgress(world, level);

  return Number(levelProgress.progress[unitId] || 0);
};

export const isUnitUnlocked = (
  world = "computer",
  level = "beginner",
  unitId
) => {
  const levelProgress = getLevelProgress(world, level);

  return levelProgress.unlockedUnits.includes(Number(unitId));
};

export const isUnitCompleted = (
  world = "computer",
  level = "beginner",
  unitId
) => {
  const levelProgress = getLevelProgress(world, level);

  return levelProgress.completedUnits.includes(Number(unitId));
};

export const getUnlockedUnits = (
  world = "computer",
  level = "beginner"
) => {
  const levelProgress = getLevelProgress(world, level);

  return [...levelProgress.unlockedUnits];
};

export const getCompletedUnits = (
  world = "computer",
  level = "beginner"
) => {
  const levelProgress = getLevelProgress(world, level);

  return [...levelProgress.completedUnits];
};

export const resetProgress = () => {
  const defaultProgress = createDefaultProgress();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultProgress)
  );

  return defaultProgress;
};