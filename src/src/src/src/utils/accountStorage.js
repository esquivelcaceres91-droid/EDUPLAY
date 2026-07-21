import { supabase } from "../lib/supabaseClient";
import { loadCloudProfileState, saveCloudProfileState } from "./cloudState";

const PROFILES_KEY = "eduplay_profiles";
const ACTIVE_KEY = "eduplay_active_profile";
const LEGACY_KEYS = ["eduplay_profile", "eduplay_progress", "eduplay_engagement"];

const safeParse = (value, fallback) => {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
};

const normalizeCloudProfile = (row) => ({
  id: row.id,
  name: row.name || "",
  avatar: row.avatar || "/assets/avatar-1.png",
  age: row.age ?? null,
  grade: row.grade ?? null,
  color: row.color || "blue",
  onboardingCompleted: row.onboarding_completed !== false,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  data: safeParse(localStorage.getItem(`eduplay_profile_data_${row.id}`), {}),
});

const cacheProfiles = (profiles) => {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  window.dispatchEvent(new Event("eduplay:profiles"));
  return profiles;
};

export async function getAccount() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const user = data.session?.user;
  if (!user) return null;
  return {
    id: user.id,
    ownerName: user.user_metadata?.owner_name || user.user_metadata?.full_name || "Familia EduPlay",
    email: user.email || "",
    provider: user.app_metadata?.provider || "email",
    license: user.user_metadata?.license || "family",
    createdAt: user.created_at,
  };
}

export async function createFamilyAccount({ ownerName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(), password,
    options: { data: { owner_name: ownerName.trim(), license: "family" } },
  });
  if (error) throw error;
  return data;
}

export async function loginFamily({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(), password,
  });
  if (error) throw error;
  return data;
}

export async function continueWithGoogleAccount() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google", options: { redirectTo: `${window.location.origin}/profiles` },
  });
  if (error) throw error;
  return data;
}

export function getProfiles() {
  const profiles = safeParse(localStorage.getItem(PROFILES_KEY), []);
  return Array.isArray(profiles) ? profiles : [];
}

export async function loadProfiles() {
  const account = await getAccount();
  if (!account) return cacheProfiles([]);
  const { data, error } = await supabase
    .from("student_profiles")
    .select("id,name,avatar,age,grade,color,onboarding_completed,created_at,updated_at")
    .order("created_at", { ascending: true })
    .limit(3);
  if (error) throw error;
  return cacheProfiles((data || []).map(normalizeCloudProfile));
}

export function getActiveProfileId() { return localStorage.getItem(ACTIVE_KEY) || ""; }
export function getActiveStudent() {
  const id = getActiveProfileId();
  return getProfiles().find((profile) => profile.id === id) || null;
}

const readLegacySnapshot = () => Object.fromEntries(
  LEGACY_KEYS.map((key) => [key, safeParse(localStorage.getItem(key), null)])
);
const writeLegacySnapshot = (snapshot = {}) => {
  LEGACY_KEYS.forEach((key) => {
    const value = snapshot[key];
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  });
};

export async function persistActiveProfile() {
  const activeId = getActiveProfileId();
  if (!activeId) return null;
  const snapshot = readLegacySnapshot();
  localStorage.setItem(`eduplay_profile_data_${activeId}`, JSON.stringify(snapshot));
  await saveCloudProfileState(activeId);
  return snapshot;
}

export async function activateProfile(profileId) {
  const previousId = getActiveProfileId();
  if (previousId && previousId !== profileId) {
    await persistActiveProfile();
  }
  const profile = getProfiles().find((item) => item.id === profileId);
  if (!profile) return null;
  localStorage.setItem(ACTIVE_KEY, profileId);

  const cloudState = await loadCloudProfileState(profileId);
  if (!cloudState) {
    const storedData = safeParse(localStorage.getItem(`eduplay_profile_data_${profileId}`), profile.data || {});
    writeLegacySnapshot(storedData);
  }

  const currentProfile = safeParse(localStorage.getItem("eduplay_profile"), {});
  localStorage.setItem("eduplay_profile", JSON.stringify({
    ...currentProfile,
    name: profile.name, avatar: profile.avatar, age: profile.age ?? null, grade: profile.grade ?? null,
    recommendedLevel: profile.grade >= 3 ? "intermediate" : "beginner",
    chosenLevel: currentProfile.chosenLevel || (profile.grade >= 3 ? "intermediate" : "beginner"),
    onboardingCompleted: profile.onboardingCompleted !== false,
  }));
  await saveCloudProfileState(profileId);
  window.dispatchEvent(new Event("eduplay:profile-changed"));
  window.dispatchEvent(new Event("eduplay:progress-synced"));
  return profile;
}

export async function createStudentProfile({ name, avatar, age, grade, color = "blue" }) {
  const account = await getAccount();
  if (!account) throw new Error("Debes iniciar sesión.");
  if (getProfiles().length >= 3) throw new Error("La licencia familiar permite hasta 3 estudiantes.");
  const { data, error } = await supabase.from("student_profiles").insert({
    user_id: account.id, name: name.trim(), avatar,
    age: Number(age) || null, grade: Number(grade) || null, color,
    onboarding_completed: true,
  }).select().single();
  if (error) throw error;
  const profile = normalizeCloudProfile(data);
  cacheProfiles([...getProfiles(), profile]);
  return profile;
}

export async function updateStudentProfile(profileId, changes) {
  const payload = {
    name: changes.name?.trim(), avatar: changes.avatar,
    age: Number(changes.age) || null, grade: Number(changes.grade) || null,
    color: changes.color || "blue", updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("student_profiles")
    .update(payload).eq("id", profileId).select().single();
  if (error) throw error;
  const updated = normalizeCloudProfile(data);
  cacheProfiles(getProfiles().map((p) => p.id === profileId ? { ...p, ...updated } : p));
  if (getActiveProfileId() === profileId) await activateProfile(profileId);
  return updated;
}

export async function deleteStudentProfile(profileId) {
  const { error } = await supabase.from("student_profiles").delete().eq("id", profileId);
  if (error) throw error;
  const profiles = getProfiles().filter((profile) => profile.id !== profileId);
  cacheProfiles(profiles);
  localStorage.removeItem(`eduplay_profile_data_${profileId}`);
  if (getActiveProfileId() === profileId) localStorage.removeItem(ACTIVE_KEY);
  return profiles;
}

export async function migrateLegacyProfile() {
  const cloudProfiles = await loadProfiles();
  if (cloudProfiles.length) return cloudProfiles;
  const localProfiles = safeParse(localStorage.getItem(PROFILES_KEY), []);
  const legacy = safeParse(localStorage.getItem("eduplay_profile"), null);
  const candidates = localProfiles.length ? localProfiles : (legacy?.name ? [{
    name: legacy.name, avatar: legacy.avatar || "/assets/avatar-1.png",
    age: legacy.age || null, grade: legacy.grade || null, color: "blue",
  }] : []);
  if (!candidates.length) return [];
  const migrated = [];
  for (const item of candidates.slice(0, 3)) {
    const created = await createStudentProfile(item);
    const oldData = item.data || readLegacySnapshot();
    localStorage.setItem(`eduplay_profile_data_${created.id}`, JSON.stringify(oldData));
    localStorage.setItem(ACTIVE_KEY, created.id);
    writeLegacySnapshot(oldData);
    await saveCloudProfileState(created.id);
    migrated.push(created);
  }
  cacheProfiles(migrated);
  if (migrated[0]) localStorage.setItem(ACTIVE_KEY, migrated[0].id);
  return migrated;
}

export async function signOutFamily() {
  await persistActiveProfile();
  localStorage.removeItem(ACTIVE_KEY);
  cacheProfiles([]);
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
