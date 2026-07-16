import { useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, Sparkles, Users } from "lucide-react";
import "../styles/access.css";

const familyBenefits=["Progreso independiente por niño","Todos los mundos y niveles","Diplomas y recompensas","Calendario de actividad"];
const institutionBenefits=["Gestión de estudiantes","Paneles de progreso","Diplomas institucionales","Soporte y acompañamiento"];

export default function ChooseLicensePage(){
 const nav=useNavigate();
 return <main className="access-screen choose-screen choose-premium-screen">
  <div className="stepper wide"><b className="done">✓<span>Crea tu cuenta</span></b><b className="active">2<span>Elige tu licencia</span></b><b>3<span>Crea perfiles</span></b><b>4<span>¡Comienza!</span></b></div>
  <section className="choose-panel premium-license-panel">
   <div className="license-heading"><span><Sparkles/> CUENTA CREADA</span><h1>Elige cómo usarás EduPlay</h1><p>Selecciona la opción que mejor se adapta a tu familia u organización.</p></div>
   <div className="choose-options premium-license-grid">
    <article className="premium-license-card family-license-card">
      <div className="license-cover"><img src="/assets/english/intermediate/present-simple-banner.png" alt="Familia aprendiendo con EduPlay"/><span className="license-cover-badge"><Users/> HOGAR</span></div>
      <div className="license-card-content"><h2>Licencia Familiar</h2><strong>Hasta 3 estudiantes</strong>{familyBenefits.map(x=><p key={x}><CheckCircle2/>{x}</p>)}<button onClick={()=>nav('/family-plans')}>Elegir licencia familiar</button></div>
    </article>
    <article className="premium-license-card institution-license-card">
      <div className="license-cover"><img src="/assets/computer/computer-background.png" alt="Institución educativa EduPlay"/><span className="license-cover-badge blue"><Building2/> INSTITUCIONES</span></div>
      <div className="license-card-content"><h2>Colegio, institución o municipalidad</h2><strong>Planes personalizados</strong>{institutionBenefits.map(x=><p key={x}><CheckCircle2/>{x}</p>)}<button className="institution-info-button" onClick={()=>nav('/institution-info')}>Más información</button></div>
    </article>
   </div>
  </section>
 </main>
}
