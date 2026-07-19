export const isPublicExplorePath = (pathname = "") => pathname === "/explore" || pathname.startsWith("/explore/");

export const PUBLIC_EXPLORE_EMPTY_LEVEL = Object.freeze({
  unlockedUnits: [1],
  completedUnits: [],
  stars: 0,
  xp: 0,
  progress: {},
  percentage: 0,
});

export const PUBLIC_EXPLORE_STATS = Object.freeze({
  xp: 0,
  stars: 0,
  completed: 0,
  level: 1,
  streak: 0,
});
