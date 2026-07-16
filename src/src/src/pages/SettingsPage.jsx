import { useState } from "react";
import { ArrowLeft, Settings, Save, Volume2, Music, RotateCcw, UserRound, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { getProfile, saveProfile } from "../utils/profileStorage";
import { getEngagement, updateAppSettings } from "../utils/engagementStorage";
import { signOutFamily } from "../utils/accountStorage";
import "../styles/dashboard-hub.css";

export default function SettingsPage(){
 const navigate=useNavigate(); const profile=getProfile(); const app=getEngagement().settings;
 const [form,setForm]=useState({name:profile.name||'',age:profile.age||'',email:profile.email||'',grade:profile.grade||'',avatar:profile.avatar||'/assets/avatar-1.png',sound:app.sound,music:app.music,volume:app.volume}); const [saved,setSaved]=useState(false);
 const set=(k,v)=>setForm(f=>({...f,[k]:v})); const submit=e=>{e.preventDefault();saveProfile({name:form.name,age:form.age,email:form.email,grade:form.grade,avatar:form.avatar});updateAppSettings({sound:form.sound,music:form.music,volume:Number(form.volume)});setSaved(true);setTimeout(()=>setSaved(false),1800)};
 return <main className="dashboard-screen settings-screen"><header className="dashboard-header"><button onClick={()=>navigate('/home')}><ArrowLeft/> Volver</button><div><span>MI PERFIL</span><h1><Settings/> Ajustes</h1><p>Personaliza la experiencia del estudiante.</p></div></header>
 <form className="settings-shell" onSubmit={submit}><section className="profile-editor"><div className="avatar-preview"><img src={form.avatar} onError={e=>e.currentTarget.src='/assets/avatar-1.png'}/><UserRound/></div><div className="avatar-options">{[1,2,3,4,5].map(i=><button type="button" className={form.avatar.includes(`avatar-${i}`)?'selected':''} onClick={()=>set('avatar',`/assets/avatar-${i}.png`)} key={i}><img src={`/assets/avatar-${i}.png`}/></button>)}</div></section>
 <section className="form-grid"><label>Nombre<input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Nombre del estudiante"/></label><label>Edad<input type="number" min="4" max="18" value={form.age} onChange={e=>set('age',e.target.value)}/></label><label>Grado<select value={form.grade} onChange={e=>set('grade',e.target.value)}><option value="">Seleccionar</option>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}.º primaria</option>)}</select></label><label>Correo opcional<input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="familia@correo.com"/></label></section>
 <section className="sound-panel"><label><Volume2/><span>Sonidos</span><input type="checkbox" checked={form.sound} onChange={e=>set('sound',e.target.checked)}/></label><label><Music/><span>Música</span><input type="checkbox" checked={form.music} onChange={e=>set('music',e.target.checked)}/></label><label className="volume-range"><span>Volumen {form.volume}%</span><input type="range" min="0" max="100" value={form.volume} onChange={e=>set('volume',e.target.value)}/></label></section>
 <section className="account-settings-panel"><div><UserRound/><span><b>Cuenta familiar</b><small>Cambia de estudiante o cierra la sesión en este dispositivo.</small></span></div><div className="account-settings-buttons"><button type="button" onClick={()=>navigate('/profiles')}><Users/> Cambiar perfil</button><button type="button" className="logout-settings" onClick={async()=>{await signOutFamily();navigate('/create-account')}}><LogOut/> Cerrar sesión</button></div></section>
 <div className="settings-actions"><button className="save-settings"><Save/> {saved?'¡Guardado!':'Guardar cambios'}</button><button type="button" className="secondary" onClick={()=>{if(confirm('¿Restablecer únicamente nombre, edad y correo?')){setForm(f=>({...f,name:'',age:'',email:''}))}}}><RotateCcw/> Limpiar datos</button></div></form><DashboardNav active="/settings"/></main>
}
