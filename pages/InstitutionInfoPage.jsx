import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, CheckCircle2, Mail, MapPin, Phone, Send, UserRound } from "lucide-react";
import "../styles/access.css";
import { supabase } from "../lib/supabaseClient";

const INITIAL = { institution:"", contact:"", role:"", email:"", phone:"", city:"", students:"", message:"", website:"" };

export default function InstitutionInfoPage(){
  const navigate=useNavigate();
  const [form,setForm]=useState(INITIAL);
  const [sent,setSent]=useState(false);
  const [error,setError]=useState("");
  const [sending,setSending]=useState(false);
  const sendingRef=useRef(false);
  const set=(key,value)=>setForm(current=>({...current,[key]:value}));
  const submit=async(event)=>{
    event.preventDefault(); setError("");
    if(sendingRef.current)return;
    if(!form.institution.trim()||!form.contact.trim()||!form.email.trim()||!form.phone.trim()){
      setError("Completa institución, contacto, correo y teléfono."); return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())){setError("Escribe un correo válido.");return;}
    sendingRef.current=true;setSending(true);
    try{
      const {error:sendError}=await supabase.functions.invoke("send-institution-request",{body:{...form,requestType:"institution"}});
      if(sendError)throw sendError;
      setForm(INITIAL);setSent(true);
    }catch(sendError){console.error("No se pudo enviar la solicitud institucional:",sendError);setError("No pudimos enviar la solicitud. Inténtalo nuevamente.");}
    finally{sendingRef.current=false;setSending(false);}
  };

  return <main className="access-screen institution-request-screen">
    <button className="institution-back" onClick={()=>navigate("/choose-license")}><ArrowLeft/> Volver</button>
    <section className="institution-request-shell">
      <aside className="institution-request-hero">
        <span className="institution-kicker"><Building2/> EDUPlay Instituciones</span>
        <h1>Transforma el aprendizaje de tu comunidad</h1>
        <p>Planes para colegios, academias, fundaciones y municipalidades con perfiles, progreso y diplomas institucionales.</p>
        <div className="institution-benefits">
          {["Gestión de estudiantes y grupos","Paneles de progreso","Diplomas institucionales","Acompañamiento personalizado"].map(item=><div key={item}><CheckCircle2/>{item}</div>)}
        </div>
      </aside>
      <section className="institution-form-card">
        {sent ? <div className="institution-success"><div><CheckCircle2/></div><h2>¡Solicitud enviada!</h2><p>Guardamos tus datos. El equipo de EduPlay podrá contactarte para preparar una propuesta.</p><button onClick={()=>navigate("/create-account")}>Volver al inicio</button></div> : <>
          <small>SOLICITUD DE INFORMACIÓN</small><h2>Cuéntanos sobre tu institución</h2><p>Completa los datos y prepararemos una propuesta adecuada.</p>
          <form onSubmit={submit} className="institution-premium-form">
            <label><Building2/><span><b>Institución o municipalidad</b><input value={form.institution} onChange={e=>set("institution",e.target.value)} placeholder="Nombre de la organización"/></span></label>
            <div className="institution-form-row">
              <label><UserRound/><span><b>Persona de contacto</b><input value={form.contact} onChange={e=>set("contact",e.target.value)} placeholder="Nombre completo"/></span></label>
              <label><UserRound/><span><b>Cargo</b><input value={form.role} onChange={e=>set("role",e.target.value)} placeholder="Director, coordinador..."/></span></label>
            </div>
            <div className="institution-form-row">
              <label><Mail/><span><b>Correo</b><input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="correo@institucion.com"/></span></label>
              <label><Phone/><span><b>Teléfono</b><input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="Número de contacto"/></span></label>
            </div>
            <div className="institution-form-row">
              <label><MapPin/><span><b>Ciudad / Municipio</b><input value={form.city} onChange={e=>set("city",e.target.value)} placeholder="Ubicación"/></span></label>
              <label><Building2/><span><b>Estudiantes aproximados</b><select value={form.students} onChange={e=>set("students",e.target.value)}><option value="">Seleccionar</option><option>1 a 100</option><option>101 a 500</option><option>501 a 1,500</option><option>Más de 1,500</option></select></span></label>
            </div>
            <label className="institution-message"><span><b>¿Qué necesitas?</b><textarea value={form.message} onChange={e=>set("message",e.target.value)} placeholder="Cuéntanos brevemente sobre el proyecto educativo..."/></span></label>
            <label aria-hidden="true" style={{position:"absolute",left:"-10000px",width:"1px",height:"1px",overflow:"hidden"}}>Sitio web<input tabIndex="-1" autoComplete="off" value={form.website} onChange={e=>set("website",e.target.value)}/></label>
            {error&&<div className="form-error">{error}</div>}
            <button className="institution-send" disabled={sending}><Send/> {sending?"Enviando…":"Enviar solicitud"}</button>
          </form>
        </>}
      </section>
    </section>
  </main>
}
