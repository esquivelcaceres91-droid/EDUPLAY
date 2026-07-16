import { useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, CalendarDays, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { getEngagement } from "../utils/engagementStorage";
import { getGlobalStats } from "../utils/progressManager";
import "../styles/dashboard-hub.css";

export default function CalendarPage(){
 const navigate=useNavigate(); const [cursor,setCursor]=useState(new Date()); const visits=getEngagement().visitDates; const stats=getGlobalStats();
 const year=cursor.getFullYear(), month=cursor.getMonth();
 const cells=useMemo(()=>{const first=new Date(year,month,1).getDay();const offset=(first+6)%7;const count=new Date(year,month+1,0).getDate();return [...Array(offset).fill(null),...Array.from({length:count},(_,i)=>i+1)];},[year,month]);
 const key=d=>`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
 return <main className="dashboard-screen calendar-screen"><header className="dashboard-header"><button onClick={()=>navigate('/home')}><ArrowLeft/> Volver</button><div><span>MI CONSTANCIA</span><h1><CalendarDays/> Calendario de aventuras</h1><p>Cada día que visitas EduPlay queda marcado.</p></div><div className="hub-stats"><b><Flame/> {stats.streak} días</b></div></header>
 <section className="calendar-shell"><div className="calendar-toolbar"><button onClick={()=>setCursor(new Date(year,month-1,1))}><ChevronLeft/></button><h2>{cursor.toLocaleDateString('es-GT',{month:'long',year:'numeric'})}</h2><button onClick={()=>setCursor(new Date(year,month+1,1))}><ChevronRight/></button></div>
 <div className="weekdays">{['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(x=><b key={x}>{x}</b>)}</div><div className="calendar-grid">{cells.map((d,i)=><div key={i} className={`${d&&visits.includes(key(d))?'visited':''} ${!d?'empty':''}`}>{d&&<><span>{d}</span>{visits.includes(key(d))&&<em>✓</em>}</>}</div>)}</div>
 <div className="calendar-summary"><article><b>{visits.length}</b><span>Días activos</span></article><article><b>{stats.streak}</b><span>Racha actual</span></article><article><b>{stats.completed}</b><span>Unidades completas</span></article></div></section><DashboardNav active="/calendar"/></main>
}
