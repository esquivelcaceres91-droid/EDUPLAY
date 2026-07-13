const PROFILE_KEY = "eduplay_profile";

const emptyUnit = {
  status: "locked",
  progress: 0,
  stars: 0,
  score: 0,
  completedAt: null,
};

function makeUnits(total) {
  return Array.from({ length: total }, (_, index) => ({
    ...emptyUnit,
    status: index === 0 ? "available" : "locked",
  }));
}

const defaultProfile = {
  name: "",
  avatar: "/assets/avatar-1.png",
  grade: null,
  recommendedLevel: "beginner",
  chosenLevel: "beginner",
  onboardingCompleted: false,
  points: 0,
  coins: 0,
  streak: 0,
  level: 1,
  lastNewUnitDate: null,
  progress: {
    english: {
      beginner: makeUnits(7),
      intermediate: makeUnits(4),
      advanced: makeUnits(3),
    },
    computer: {
      beginner: makeUnits(9),
      intermediate: makeUnits(4),
      advanced: makeUnits(3),
    },
  },
};

function cloneDefaultProfile() {
  return JSON.parse(JSON.stringify(defaultProfile));
}

function mergeProgress(savedProgress = {}) {
  const base = cloneDefaultProfile().progress;

  for (const world of Object.keys(base)) {
    for (const level of Object.keys(base[world])) {
      const savedUnits = savedProgress?.[world]?.[level];
      if (Array.isArray(savedUnits)) {
        base[world][level] = base[world][level].map((unit, index) => ({
          ...unit,
          ...(savedUnits[index] || {}),
        }));
      }
    }
  }

  return base;
}

export function getProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    const base = cloneDefaultProfile();

    if (!saved) return base;

    const parsed = JSON.parse(saved);

    return {
      ...base,
      ...parsed,
      progress: mergeProgress(parsed.progress),
    };
  } catch (error) {
    console.error("No se pudo leer el perfil:", error);
    return cloneDefaultProfile();
  }
}

export function saveProfile(changes) {
  try {
    const current = getProfile();
    const updated = {
      ...current,
      ...changes,
      progress: changes.progress
        ? mergeProgress(changes.progress)
        : current.progress,
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error("No se pudo guardar el perfil:", error);
    return null;
  }
}

export function updateUnitProgress(world, level, unitIndex, changes) {
  const profile = getProfile();
  const units = profile.progress?.[world]?.[level];

  if (!Array.isArray(units) || !units[unitIndex]) return profile;

  units[unitIndex] = {
    ...units[unitIndex],
    ...changes,
  };

  return saveProfile({ progress: profile.progress });
}

export function resetProfile() {
  localStorage.removeItem(PROFILE_KEY);
}
