const STORAGE_KEY = "eduplay_progress";

const createDefaultLevelProgress = () => ({
  unlockedUnits: [1],
  completedUnits: [],
  stars: 0,
  xp: 0,
  progress: {},
});

const createDefaultProgress = () => ({
  streak: 0,
  lastActivityDate: null,

  worlds: {
    computer: {
      beginner: createDefaultLevelProgress(),
    },
  },
});

const getLocalDateString = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDayDifference = (previousDate, currentDate) => {
  if (!previousDate || !currentDate) return null;

  const previous = new Date(`${previousDate}T00:00:00`);
  const current = new Date(`${currentDate}T00:00:00`);

  const difference = current.getTime() - previous.getTime();

  return Math.round(difference / 86400000);
};

const ensureLevelStructure = (levelData) => {
  const safeLevel =
    levelData && typeof levelData === "object"
      ? levelData
      : createDefaultLevelProgress();

  if (!Array.isArray(safeLevel.unlockedUnits)) {
    safeLevel.unlockedUnits = [1];
  }

  if (!safeLevel.unlockedUnits.includes(1)) {
    safeLevel.unlockedUnits.push(1);
  }

  if (!Array.isArray(safeLevel.completedUnits)) {
    safeLevel.completedUnits = [];
  }

  if (typeof safeLevel.stars !== "number") {
    safeLevel.stars = 0;
  }

  if (typeof safeLevel.xp !== "number") {
    safeLevel.xp = 0;
  }

  if (
    !safeLevel.progress ||
    typeof safeLevel.progress !== "object"
  ) {
    safeLevel.progress = {};
  }

  safeLevel.unlockedUnits = safeLevel.unlockedUnits
    .map(Number)
    .filter((unitId) => Number.isFinite(unitId));

  safeLevel.completedUnits = safeLevel.completedUnits
    .map(Number)
    .filter((unitId) => Number.isFinite(unitId));

  safeLevel.unlockedUnits.sort((a, b) => a - b);
  safeLevel.completedUnits.sort((a, b) => a - b);

  return safeLevel;
};

const ensureProgressStructure = (data) => {
  const safeData =
    data && typeof data === "object"
      ? data
      : createDefaultProgress();

  if (typeof safeData.streak !== "number") {
    safeData.streak = 0;
  }

  if (
    safeData.lastActivityDate !== null &&
    typeof safeData.lastActivityDate !== "string"
  ) {
    safeData.lastActivityDate = null;
  }

  if (!safeData.worlds || typeof safeData.worlds !== "object") {
    safeData.worlds = {};
  }

  if (
    !safeData.worlds.computer ||
    typeof safeData.worlds.computer !== "object"
  ) {
    safeData.worlds.computer = {};
  }

  safeData.worlds.computer.beginner = ensureLevelStructure(
    safeData.worlds.computer.beginner
  );

  return safeData;
};

const ensureRequestedLevel = (
  progress,
  world = "computer",
  level = "beginner"
) => {
  if (
    !progress.worlds[world] ||
    typeof progress.worlds[world] !== "object"
  ) {
    progress.worlds[world] = {};
  }

  progress.worlds[world][level] = ensureLevelStructure(
    progress.worlds[world][level]
  );

  return progress.worlds[world][level];
};

const updateStreak = (progress) => {
  const today = getLocalDateString();
  const lastActivityDate = progress.lastActivityDate;

  if (lastActivityDate === today) {
    return progress.streak;
  }

  const difference = getDayDifference(
    lastActivityDate,
    today
  );

  if (difference === 1) {
    progress.streak += 1;
  } else {
    progress.streak = 1;
  }

  progress.lastActivityDate = today;

  return progress.streak;
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
    const safeProgress =
      ensureProgressStructure(parsedProgress);

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
    const safeProgress =
      ensureProgressStructure(progressData);

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

  const levelProgress = ensureRequestedLevel(
    progress,
    world,
    level
  );

  saveProgress(progress);

  return levelProgress;
};

export const completeUnit = (
  world = "computer",
  level = "beginner",
  unitId,
  stars = 3,
  xp = 100
) => {
  const progress = getProgress();

  const levelProgress = ensureRequestedLevel(
    progress,
    world,
    level
  );

  const numericUnitId = Number(unitId);
  const safeStars = Math.max(0, Number(stars) || 0);
  const safeXp = Math.max(0, Number(xp) || 0);

  if (!Number.isFinite(numericUnitId)) {
    console.error("La unidad no es válida:", unitId);
    return levelProgress;
  }

  const isFirstCompletion =
    !levelProgress.completedUnits.includes(
      numericUnitId
    );

  if (isFirstCompletion) {
    levelProgress.completedUnits.push(numericUnitId);
    levelProgress.stars += safeStars;
    levelProgress.xp += safeXp;

    updateStreak(progress);
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

  const levelProgress = ensureRequestedLevel(
    progress,
    world,
    level
  );

  const numericUnitId = Number(unitId);

  const safePercentage = Math.max(
    0,
    Math.min(100, Number(percentage) || 0)
  );

  levelProgress.progress[numericUnitId] =
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

  return levelProgress.unlockedUnits.includes(
    Number(unitId)
  );
};

export const isUnitCompleted = (
  world = "computer",
  level = "beginner",
  unitId
) => {
  const levelProgress = getLevelProgress(world, level);

  return levelProgress.completedUnits.includes(
    Number(unitId)
  );
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

export const getStreak = () => {
  const progress = getProgress();

  const completedUnits =
    progress.worlds?.computer?.beginner?.completedUnits || [];

  if (
    progress.streak === 0 &&
    !progress.lastActivityDate &&
    completedUnits.length > 0
  ) {
    progress.streak = 1;
    progress.lastActivityDate = getLocalDateString();

    saveProgress(progress);

    return 1;
  }

  if (!progress.lastActivityDate) {
    return 0;
  }

  const today = getLocalDateString();

  const difference = getDayDifference(
    progress.lastActivityDate,
    today
  );

  if (difference !== null && difference > 1) {
    progress.streak = 0;
    saveProgress(progress);
  }

  return progress.streak;
};

export const resetProgress = () => {
  const defaultProgress = createDefaultProgress();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultProgress)
  );

  return defaultProgress;
};