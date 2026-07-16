import { Home, BookOpen, Gamepad2, Trophy, CalendarDays, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const items = [
  ["/home", Home, "Inicio"], ["/lessons", BookOpen, "Lecciones"], ["/games", Gamepad2, "Juegos"],
  ["/achievements", Trophy, "Logros"], ["/calendar", CalendarDays, "Calendario"], ["/settings", Settings, "Ajustes"],
];
export default function DashboardNav({ active }) {
  const navigate = useNavigate();
  return <nav className="bottom-nav dashboard-bottom-nav">{items.map(([route, Icon, label]) => (
    <button key={route} type="button" className={active === route ? "active" : ""} onClick={() => navigate(route)}>
      <Icon size={26}/><span>{label}</span>
    </button>
  ))}</nav>;
}
