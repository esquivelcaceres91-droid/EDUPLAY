import { supabase } from "../lib/supabaseClient";

const rpc = async (name, params) => { const { data, error } = await supabase.rpc(name, params); if (error) throw error; return data; };

export function generateInstitutionCode(name = "EDUPLAY") {
  const prefix = String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 8) || "EDUPLAY";
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export async function listInstitutions() {
  const data = await rpc("admin_list_institutions");
  return Array.isArray(data) ? data : [];
}

export async function createInstitution(values) {
  return rpc("admin_create_institution", { p_name:values.name.trim(), p_access_code:values.access_code.trim().toUpperCase(), p_student_limit:Number(values.student_limit), p_expires_at:values.expires_at, p_status:values.status, p_notes:values.observations?.trim() || null });
}

export async function updateInstitution(id, values) {
  return rpc("admin_update_institution", { p_id:id, p_name:values.name.trim(), p_access_code:values.access_code.trim().toUpperCase(), p_student_limit:Number(values.student_limit), p_expires_at:values.expires_at, p_status:values.status, p_notes:values.observations?.trim() || null });
}

export async function setInstitutionStatus(id, status) {
  await rpc("admin_set_institution_status", { p_id:id, p_status:status });
}

export async function deleteInstitution(id) {
  await rpc("admin_delete_institution", { p_id:id });
}

export async function listInstitutionStudents(institutionId) {
  const data = await rpc("admin_list_institution_students", { p_institution_id:institutionId });
  return Array.isArray(data) ? data : [];
}

export async function updateInstitutionStudent(id, values) {
  return rpc("admin_update_institution_student", { p_id:id, p_full_name:values.full_name.trim(), p_student_code:values.student_code.trim().toUpperCase(), p_grade:Number(values.grade), p_avatar:values.avatar, p_status:values.status });
}

export async function setInstitutionStudentStatus(id, status) {
  await rpc("admin_set_institution_student_status", { p_id:id, p_status:status });
}

export async function deleteInstitutionStudent(id) {
  await rpc("admin_delete_institution_student", { p_id:id });
}
