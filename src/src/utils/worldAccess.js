import { getAccountLicense } from "./licenseStorage";
import { isDemoAccount, resolveDemoAccount } from "./demoAccess";
import { isInstitutionSession } from "./institutionStorage";

export const CORE_WORLDS = new Set(["english", "computer"]);

export async function canAccessWorld(worldId) {
  if (CORE_WORLDS.has(worldId)) return true;
  if (isInstitutionSession()) return true;
  if (isDemoAccount() || await resolveDemoAccount()) return true;

  const license = await getAccountLicense();
  return Boolean(license?.isActive && Number(license.durationDays) === 365);
}

export const requiredPlanForWorld = (worldId) =>
  CORE_WORLDS.has(worldId) ? "active" : "annual";
