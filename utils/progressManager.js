import { queueCloudProfileStateSave } from "./cloudState";
import { shouldSuppressDemoProgressWrites } from "./demoAccess";
const STORAGE_KEY = "eduplay_progress";
const LESSON_COOLDOWN_MS = 24 * 60 * 60 * 1000;

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
  lessonCooldown: {
    startedAt: null,
    endsAt: null,
    lastCompleted: null,
  },

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

  if (!safeData.lessonCooldown || typeof safeData.lessonCooldown !== "object") {
    safeData.lessonCooldown = { startedAt: null, endsAt: null, lastCompleted: null };
  }

  const cooldownStartedAt = Number(safeData.lessonCooldown.startedAt);
  const cooldownEndsAt = Number(safeData.lessonCooldown.endsAt);

  safeData.lessonCooldown.startedAt = Number.isFinite(cooldownStartedAt)
    ? cooldownStartedAt
    : null;
  safeData.lessonCooldown.endsAt = Number.isFinite(cooldownEndsAt)
    ? cooldownEndsAt
    : null;

  if (
    safeData.lessonCooldown.lastCompleted !== null &&
    typeof safeData.lessonCooldown.lastCompleted !== "object"
  ) {
    safeData.lessonCooldown.lastCompleted = null;
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
  if (shouldSuppressDemoProgressWrites()) {
    try {
      const demoSnapshot = localStorage.getItem(STORAGE_KEY);
      return ensureProgressStructure(demoSnapshot ? JSON.parse(demoSnapshot) : createDefaultProgress());
    } catch {
      return createDefaultProgress();
    }
  }
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
    queueCloudProfileStateSave();

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
  if (shouldSuppressDemoProgressWrites()) return ensureProgressStructure(progressData);
  try {
    const safeProgress =
      ensureProgressStructure(progressData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(safeProgress)
    );
    queueCloudProfileStateSave();

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

    const startedAt = Date.now();
    progress.lessonCooldown = {
      startedAt,
      endsAt: startedAt + LESSON_COOLDOWN_MS,
      lastCompleted: {
        world,
        level,
        unitId: numericUnitId,
      },
    };
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

  const hasAnyCompletedUnit = Object.values(progress.worlds || {}).some(
    (world) => Object.values(world || {}).some(
      (level) => Array.isArray(level?.completedUnits) && level.completedUnits.length > 0
    )
  );

  if (progress.streak === 0 && !progress.lastActivityDate && hasAnyCompletedUnit) {
    progress.streak = 1;
    progress.lastActivityDate = getLocalDateString();
    saveProgress(progress);
    return 1;
  }

  if (!progress.lastActivityDate) return 0;

  const difference = getDayDifference(progress.lastActivityDate, getLocalDateString());

  if (difference !== null && difference > 1) {
    progress.streak = 0;
    saveProgress(progress);
  }

  return progress.streak;
};

export const getGlobalStats = () => {
  const progress = getProgress();
  let stars = 0;
  let xp = 0;
  let completed = 0;

  Object.values(progress.worlds || {}).forEach((world) => {
    Object.values(world || {}).forEach((level) => {
      stars += Number(level?.stars || 0);
      xp += Number(level?.xp || 0);
      completed += Array.isArray(level?.completedUnits) ? level.completedUnits.length : 0;
    });
  });

  return {
    streak: getStreak(),
    stars,
    xp,
    completed,
    level: Math.max(1, Math.floor(xp / 500) + 1),
  };
};

export const getLessonCooldown = () => {
  const progress = getProgress();
  const cooldown = progress.lessonCooldown || {};
  const startedAt = Number(cooldown.startedAt);
  const endsAt = Number(cooldown.endsAt);
  const now = Date.now();
  const active = Number.isFinite(endsAt) && endsAt > now;

  if (!active && (cooldown.startedAt || cooldown.endsAt)) {
    progress.lessonCooldown = {
      startedAt: null,
      endsAt: null,
      lastCompleted: cooldown.lastCompleted || null,
    };
    saveProgress(progress);
  }

  return {
    active,
    startedAt: Number.isFinite(startedAt) ? startedAt : null,
    endsAt: active ? endsAt : null,
    remainingMs: active ? Math.max(0, endsAt - now) : 0,
    lastCompleted: cooldown.lastCompleted || null,
  };
};

export const clearLessonCooldown = () => {
  const progress = getProgress();
  progress.lessonCooldown = {
    startedAt: null,
    endsAt: null,
    lastCompleted: progress.lessonCooldown?.lastCompleted || null,
  };
  saveProgress(progress);
  return progress.lessonCooldown;
};

export const resetProgress = () => {
  if (shouldSuppressDemoProgressWrites()) return getProgress();
  const defaultProgress = createDefaultProgress();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultProgress)
  );
  queueCloudProfileStateSave();

  return defaultProgress;
};
