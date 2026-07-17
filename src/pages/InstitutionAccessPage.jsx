import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, KeyRound, LogIn, UserPlus } from "lucide-react";
import { forgetLastInstitutionCode, getLastInstitutionCode, validateInstitutionCode } from "../utils/institutionStorage";
import "../styles/access.css";
export default function InstitutionAccessPage() {
  const navigate=useNavigate(); const [code,setCode]=useState(getLastInstitutionCode); const [institution,setInstitution]=useState(null); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  const validate=async(event)=>{event.preventDefault();setError("");setLoading(true);try{const result=await validateInstitutionCode(code);if(!result)throw new Error("El código del colegio no es válido o está vencido.");setInstitution(result);}catch(e){setError(e.message||"No se pudo validar el código.");}finally{setLoading(false);}};
  const state={accessCode:code.trim(),institution};
  return <main className="access-screen institution-student-screen"><button className="institution-back" onClick={()=>navigate("/choose-license")}><ArrowLeft/> Volver</button><section className="institution-student-card"><div className="institution-student-icon"><Building2/></div><span className="profiles-eyebrow">ACCESO PARA COLEGIOS</span><h1>{institution?"Selecciona cómo ingresar":"Ingresa el código de tu colegio"}</h1>
  {!institution?<form onSubmit={validate} className="institution-student-form"><label><span><KeyRound/> Código del colegio</span><input autoFocus value={code} onChange={e=>setCode(e.target.value.toUpperCase())} maxLength={40} autoComplete="off" placeholder="Ejemplo: COLEGIO-2026"/></label>{error&&<div className="form-error premium-form-error">{error}</div>}<button className="primary-access-button" disabled={loading||!code.trim()}>{loading?"Validando...":"Validar código"}</button></form>:<div className="institution-entry-options"><button onClick={()=>navigate("/institution-register",{state})}><UserPlus/><span><b>Primera vez</b><small>Registrar un alumno nuevo</small></span></button><button onClick={()=>navigate("/institution-login",{state})}><LogIn/><span><b>Ya estoy registrado</b><small>Ingresar con código y PIN</small></span></button><button className="institution-change-code" onClick={()=>{forgetLastInstitutionCode();setCode("");setInstitution(null);}}>Usar otro código</button></div>}
  </section></main>;
}
