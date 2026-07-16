import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CheckCircle2, ChevronDown, LogIn, Users, X } from "lucide-react";
import { getAccount, migrateLegacyProfile } from "../utils/accountStorage";
import "../styles/access.css";

export default function WelcomePage() {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    let active = true;
    getAccount().then(async (currentAccount) => {
      if (!active) return;
      setAccount(currentAccount);
      if (currentAccount) await migrateLegacyProfile();
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  return <main className="access-screen welcome-screen">
    <header className="access-topbar">
      <button className="language-pill"><span>🌐</span> Español <ChevronDown size={18}/></button>
      <img src="/assets/logo.png" className="access-logo" alt="EduPlay" />
      <button className="login-pill" onClick={() => navigate(account ? "/profiles" : "/login")}><LogIn size={20}/> Iniciar sesión</button>
    </header>

    <section className="welcome-copy">
      <h1>Aprende jugando, crece divirtiéndote</h1>
      <p>Elige la opción que mejor se adapte a tu familia.</p>
    </section>

    <section className="license-grid two-options">
      <article className="license-card family-card">
        <div className="license-art family-art"><img src="/assets/avatar-1.png" alt="Estudiante"/><img src="/assets/avatar-3.png" alt="Estudiante"/><img src="/assets/avatar-5.png" alt="Estudiante"/></div>
        <div className="license-body">
          <div className="license-icon"><Users/></div>
          <h2>Licencia Familiar</h2>
          <strong>Hasta 3 estudiantes</strong>
          {["Mundo de Computación","English World","Lecciones y juegos interactivos","Diplomas y recompensas","Progreso independiente por niño"].map(item => <p key={item}><CheckCircle2/> {item}</p>)}
          <button onClick={() => navigate(account ? "/profiles" : "/create-account")}>Comenzar ahora</button>
        </div>
      </article>

      <article className="license-card institution-card">
        <div className="license-art school-art"><Building2 size={112}/></div>
        <div className="license-body">
          <div className="license-icon"><Building2/></div>
          <h2>¿Representas un colegio, institución o municipalidad?</h2>
          <strong>Planes especiales para organizaciones</strong>
          {["Gestión de estudiantes","Paneles de progreso","Diplomas institucionales","Soporte y acompañamiento"].map(item => <p key={item}><CheckCircle2/> {item}</p>)}
          <button className="blue-button" onClick={() => setInstitution(true)}>Más información</button>
        </div>
      </article>
    </section>

    <footer className="access-benefits"><span>🛡️ Seguro y confiable</span><span>☁️ Accede desde cualquier lugar</span><span>⭐ Aprendizaje divertido</span></footer>

    {institution && <div className="access-modal-backdrop" onClick={() => setInstitution(false)}><div className="access-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setInstitution(false)}><X/></button><div className="modal-building"><Building2/></div><h2>EduPlay para instituciones</h2><p>Preparamos licencias para colegios, academias y municipalidades con perfiles, seguimiento de estudiantes, diplomas y soporte personalizado.</p><div className="institution-fields"><input placeholder="Nombre de la institución"/><input placeholder="Nombre del contacto"/><input placeholder="Correo o teléfono"/><textarea placeholder="Cuéntanos cuántos estudiantes deseas beneficiar"/></div><button className="primary-access-button" onClick={()=>setInstitution(false)}>Solicitar información</button></div></div>}
  </main>;
}
