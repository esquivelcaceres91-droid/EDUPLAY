import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { canAccessWorld } from "../utils/worldAccess";
import LockedWorldModal from "./LockedWorldModal";

export default function AnnualWorldGuard({ worldId, worldName, children }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(null);
  useEffect(() => { let active=true; canAccessWorld(worldId).then((value)=>active&&setAllowed(value)).catch(()=>active&&setAllowed(false)); return()=>{active=false}; },[worldId]);
  if (allowed === null) return <main style={{minHeight:"100dvh",background:"#071b43"}} />;
  if (!allowed) return <main style={{minHeight:"100dvh",background:"#071b43"}}><LockedWorldModal worldName={worldName} onClose={()=>navigate("/home",{replace:true})}/></main>;
  return children;
}
