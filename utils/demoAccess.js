import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { isInstitutionSession } from "./institutionStorage";

export const DEMO_EMAIL = "esquivelcaceres91@gmail.com";
const listeners = new Set();

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();
let demoEnabled = false;
let identityPending = true;

export const isDemoSession = (session) => (
  session?.user?.email?.trim().toLowerCase() === DEMO_EMAIL
);

const setDemoState = (email) => {
  const normalizedEmail = normalizeEmail(email);
  const next = Boolean(normalizedEmail)
    && !isInstitutionSession()
    && isDemoSession({ user: { email: normalizedEmail } });
  identityPending = false;
  if (demoEnabled === next) return next;
  demoEnabled = next;
  listeners.forEach((listener) => listener(next));
  return next;
};

export const isDemoAccount = () => demoEnabled;
export const shouldSuppressDemoProgressWrites = () => identityPending || demoEnabled;

export async function resolveDemoAccount() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    setDemoState("");
    return false;
  }
  return setDemoState(data.session?.user?.email);
}

export function useDemoAccount() {
  const [enabled, setEnabled] = useState(isDemoAccount);

  useEffect(() => {
    listeners.add(setEnabled);
    resolveDemoAccount();
    return () => listeners.delete(setEnabled);
  }, []);

  return enabled;
}

supabase.auth.onAuthStateChange((_event, session) => {
  setDemoState(session?.user?.email);
});

resolveDemoAccount();
