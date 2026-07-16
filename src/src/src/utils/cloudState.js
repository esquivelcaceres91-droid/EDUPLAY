import { supabase } from "../lib/supabaseClient";

const ACTIVE_KEY = "eduplay_active_profile";
let saveTimer = null;

const safeParse = (value, fallback) => {
  try { return value ? JSON.parse(value) : fallback; } catch { return fallback; }
};

export const getActiveProfileId = () => localStorage.getItem(ACTIVE_KEY) || "";

export function readLocalProfileState() {
  const certificates = {};
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("eduplay_certificate_") || key.startsWith("eduplay-certificate-")) certificates[key] = localStorage.getItem(key);
  });
  return {
    progress: safeParse(localStorage.getItem("eduplay_progress"), null),
    engagement: safeParse(localStorage.getItem("eduplay_engagement"), null),
    profile_data: safeParse(localStorage.getItem("eduplay_profile"), null),
    certificates,
  };
}

export function applyCloudProfileState(row) {
  if (!row) return;
  const pairs = [
    ["eduplay_progress", row.progress],
    ["eduplay_engagement", row.engagement],
    ["eduplay_profile", row.profile_data],
  ];
  pairs.forEach(([key, value]) => {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  });
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("eduplay_certificate_") || key.startsWith("eduplay-certificate-")) localStorage.removeItem(key);
  });
  Object.entries(row.certificates || {}).forEach(([key, value]) => localStorage.setItem(key, value));
}

export async function loadCloudProfileState(profileId) {
  if (!profileId) return null;
  const { data, error } = await supabase
    .from("student_progress")
    .select("profile_id,progress,engagement,profile_data,certificates,updated_at")
    .eq("profile_id", profileId)
    .maybeSingle();
  if (error) throw error;
  if (data) applyCloudProfileState(data);
  return data;
}

export async function saveCloudProfileState(profileId = getActiveProfileId()) {
  if (!profileId) return null;
  const state = readLocalProfileState();
  const { data, error } = await supabase
    .from("student_progress")
    .upsert({
      profile_id: profileId,
      progress: state.progress || {},
      engagement: state.engagement || {},
      profile_data: state.profile_data || {},
      certificates: state.certificates || {},
      updated_at: new Date().toISOString(),
    }, { onConflict: "profile_id" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export function queueCloudProfileStateSave(delay = 250) {
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveCloudProfileState().catch((error) => console.error("No se pudo sincronizar el progreso:", error));
  }, delay);
}
