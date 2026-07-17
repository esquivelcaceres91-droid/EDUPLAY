import { supabase } from "../lib/supabaseClient";

const SESSION_KEY = "eduplay_institution_session";
const LAST_CODE_KEY = "eduplay_last_institution_code";
const TRANSIENT_KEYS = ["eduplay_profile", "eduplay_progress", "eduplay_engagement"];
const firstRow = (data) => Array.isArray(data) ? (data[0] || null) : (data || null);
const rpc = async (name, params) => { const { data, error } = await supabase.rpc(name, params); if (error) throw error; return data; };

export function getInstitutionSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return parsed?.tipo === "institution" && parsed?.session_token ? { session_token: parsed.session_token, tipo: "institution" } : null;
  } catch { return null; }
}
export const isInstitutionSession = () => Boolean(getInstitutionSession());
export const getLastInstitutionCode = () => localStorage.getItem(LAST_CODE_KEY) || "";
export const forgetLastInstitutionCode = () => localStorage.removeItem(LAST_CODE_KEY);
const rememberInstitutionCode = (code) => localStorage.setItem(LAST_CODE_KEY, code.trim().toUpperCase());
function saveSession(token) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ session_token: token, tipo: "institution" }));
  localStorage.removeItem("eduplay_active_profile"); localStorage.removeItem("eduplay_profiles");
}
const tokenFrom = (data) => { const row = firstRow(data); return row?.session_token || row?.token || null; };

export async function validateInstitutionCode(accessCode) {
  const result = firstRow(await rpc("validate_institution_code", { p_access_code: accessCode.trim() }));
  if (result) rememberInstitutionCode(accessCode);
  return result;
}
export async function registerInstitutionStudent({ accessCode, studentCode, fullName, pin, grade, avatar }) {
  const data = await rpc("register_institution_student", { p_access_code: accessCode.trim(), p_avatar: avatar, p_full_name: fullName.trim(), p_grade: Number(grade), p_pin: pin, p_student_code: studentCode.trim() });
  const token = tokenFrom(data); if (!token) throw new Error("No se pudo crear la sesión del alumno.");
  rememberInstitutionCode(accessCode); saveSession(token); await hydrateInstitutionProgress(); return firstRow(data);
}
export async function loginInstitutionStudent({ accessCode, studentCode, pin }) {
  const data = await rpc("login_institution_student", { p_access_code: accessCode.trim(), p_student_code: studentCode.trim(), p_pin: pin });
  const token = tokenFrom(data); if (!token) throw new Error("No se pudo iniciar la sesión del alumno.");
  rememberInstitutionCode(accessCode); saveSession(token); await hydrateInstitutionProgress(); return firstRow(data);
}
export async function getInstitutionProgress() {
  const session = getInstitutionSession(); if (!session) return null;
  return firstRow(await rpc("get_institution_student_progress", { p_session_token: session.session_token }));
}
const progressRecord = (row) => row?.institution_student_progress || row?.student_progress || row?.progress_data || row;
export async function hydrateInstitutionProgress() {
  const row = await getInstitutionProgress(); if (!row) throw new Error("La sesión institucional ya no está activa.");
  const state = progressRecord(row);
  const profile = state.profile_data || row.profile_data || { name: row.full_name || row.name || "Estudiante", avatar: row.avatar || "/assets/avatar-1.png", grade: row.grade ?? null, recommendedLevel: Number(row.grade) >= 3 ? "intermediate" : "beginner", chosenLevel: Number(row.grade) >= 3 ? "intermediate" : "beginner", onboardingCompleted: true };
  const values = { eduplay_profile: profile, eduplay_progress: state.progress ?? row.progress ?? null, eduplay_engagement: state.engagement ?? row.engagement ?? null };
  Object.entries(values).forEach(([key, value]) => value == null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)));
  Object.keys(localStorage).forEach((key) => { if (key.startsWith("eduplay_certificate_") || key.startsWith("eduplay-certificate-")) localStorage.removeItem(key); });
  Object.entries(state.certificates || row.certificates || {}).forEach(([key, value]) => localStorage.setItem(key, value));
  window.dispatchEvent(new Event("eduplay:profile-changed")); window.dispatchEvent(new Event("eduplay:progress-synced")); return row;
}
function localState() {
  const parse = (key) => { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; } };
  const certificates = {}; Object.keys(localStorage).forEach((key) => { if (key.startsWith("eduplay_certificate_") || key.startsWith("eduplay-certificate-")) certificates[key] = localStorage.getItem(key); });
  return { progress: parse("eduplay_progress") || {}, engagement: parse("eduplay_engagement") || {}, profile_data: parse("eduplay_profile") || {}, certificates };
}
export async function saveInstitutionProgress() {
  const session = getInstitutionSession(); if (!session) return null;
  const state = localState();
  return firstRow(await rpc("save_institution_student_progress", {
    p_session_token: session.session_token,
    p_progress_data: state,
    p_streak: Number(state.profile_data?.streak || 0),
    p_last_activity_date: new Date().toISOString().slice(0, 10),
  }));
}
export async function logoutInstitutionStudent() {
  const session = getInstitutionSession();
  if (session) { try { await saveInstitutionProgress(); } catch (error) { console.error("No se pudo sincronizar el progreso institucional:", error); } await rpc("logout_institution_student", { p_session_token: session.session_token }); }
  localStorage.removeItem(SESSION_KEY); TRANSIENT_KEYS.forEach((key) => localStorage.removeItem(key));
  Object.keys(localStorage).forEach((key) => { if (key.startsWith("eduplay_certificate_") || key.startsWith("eduplay-certificate-")) localStorage.removeItem(key); });
}
