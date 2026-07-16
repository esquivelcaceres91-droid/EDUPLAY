import { queueCloudProfileStateSave } from "./cloudState";
const KEY = "eduplay_engagement";

const defaults = {
  visitDates: [],
  lastLearningRoute: "",
  lastLearningAt: null,
  settings: { sound: true, music: true, volume: 80 },
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

export function getEngagement() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...defaults,
      ...parsed,
      visitDates: Array.isArray(parsed.visitDates) ? parsed.visitDates : [],
      settings: { ...defaults.settings, ...(parsed.settings || {}) },
    };
  } catch { return { ...defaults }; }
}

export function saveEngagement(changes) {
  const current = getEngagement();
  const next = { ...current, ...changes, settings: { ...current.settings, ...(changes.settings || {}) } };
  localStorage.setItem(KEY, JSON.stringify(next));
  queueCloudProfileStateSave();
  window.dispatchEvent(new Event("eduplay:engagement"));
  return next;
}

export function registerVisit(pathname = "") {
  const current = getEngagement();
  const date = today();
  const visitDates = current.visitDates.includes(date) ? current.visitDates : [...current.visitDates, date].slice(-365);
  const isLearning = /^\/(english|computer)\/(beginner|intermediate|advanced)(\/|$)/.test(pathname);
  return saveEngagement({
    visitDates,
    ...(isLearning ? { lastLearningRoute: pathname, lastLearningAt: new Date().toISOString() } : {}),
  });
}

export function getContinueInfo() {
  const { lastLearningRoute } = getEngagement();
  const route = lastLearningRoute || "/english";
  const parts = route.split("/").filter(Boolean);
  const world = parts[0] || "english";
  const level = parts[1] || "beginner";
  const unitIndex = parts.indexOf("unit");
  const unitId = unitIndex >= 0 ? Number(parts[unitIndex + 1]) : null;
  return { route, world, level, unitId };
}

export function updateAppSettings(settings) { return saveEngagement({ settings }); }
