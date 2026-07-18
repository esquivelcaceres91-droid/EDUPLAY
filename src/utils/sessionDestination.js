import { supabase } from "../lib/supabaseClient";
import { getActiveProfileId, loadProfiles } from "./accountStorage";
import { resolveDemoAccount } from "./demoAccess";
import { getAccountLicense } from "./licenseStorage";
import { getInstitutionSession, hydrateInstitutionProgress } from "./institutionStorage";

export async function getRestoredSession() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData?.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return null;

  return { ...sessionData.session, user: userData.user };
}

export async function resolveSessionDestination({ unauthenticated = "/login" } = {}) {
  if (getInstitutionSession()) {
    await hydrateInstitutionProgress();
    return "/home";
  }

  const session = await getRestoredSession();
  if (!session?.user) return unauthenticated;

  if (await resolveDemoAccount()) return "/home";

  const license = await getAccountLicense();
  if (!license?.isActive) return "/activate-license";

  const profiles = await loadProfiles();
  if (!profiles.length) return "/create-profiles";

  const activeProfileId = getActiveProfileId();
  return profiles.some((profile) => profile.id === activeProfileId) ? "/home" : "/profiles";
}
