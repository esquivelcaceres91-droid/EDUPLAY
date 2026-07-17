import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { registerVisit } from "../utils/engagementStorage";
import { persistActiveProfile } from "../utils/accountStorage";
import { isInstitutionSession, saveInstitutionProgress } from "../utils/institutionStorage";

export default function ActivityTracker() {
  const location = useLocation();
  useEffect(() => { registerVisit(location.pathname); const timer=setTimeout(() => isInstitutionSession() ? saveInstitutionProgress() : persistActiveProfile(),120); return ()=>clearTimeout(timer); }, [location.pathname]);
  useEffect(()=>{ const save=()=>isInstitutionSession() ? saveInstitutionProgress() : persistActiveProfile(); window.addEventListener("beforeunload",save); window.addEventListener("pagehide",save); return ()=>{window.removeEventListener("beforeunload",save);window.removeEventListener("pagehide",save);};},[]);
  return null;
}
