import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { registerVisit } from "../utils/engagementStorage";
import { persistActiveProfile } from "../utils/accountStorage";

export default function ActivityTracker() {
  const location = useLocation();
  useEffect(() => { registerVisit(location.pathname); const timer=setTimeout(persistActiveProfile,120); return ()=>clearTimeout(timer); }, [location.pathname]);
  useEffect(()=>{ const save=()=>persistActiveProfile(); window.addEventListener("beforeunload",save); window.addEventListener("pagehide",save); return ()=>{window.removeEventListener("beforeunload",save);window.removeEventListener("pagehide",save);};},[]);
  return null;
}
