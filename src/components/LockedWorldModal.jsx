import { Crown, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/locked-world.css";

export default function LockedWorldModal({ worldName, comingSoon = false, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="locked-world-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="locked-world-modal" role="dialog" aria-modal="true" aria-labelledby="locked-world-title">
        <button type="button" className="locked-world-close" onClick={onClose} aria-label="Cerrar"><X /></button>
        <div className="locked-world-icon"><Crown /></div>
        <span><Sparkles size={16} /> {comingSoon ? "Próxima aventura" : "Aventura premium"}</span>
        <h2 id="locked-world-title">Descubre {worldName}</h2>
        <p>{comingSoon ? "Este mundo ya está preparado en la nueva arquitectura de EduPlay y se incorporará completo en el siguiente paquete de contenido." : "Este mundo educativo forma parte de la Licencia Familiar Anual. Actualiza tu plan para explorar todas sus lecciones, juegos, evaluaciones y diplomas."}</p>
        <div className="locked-world-actions">
          {!comingSoon && <button type="button" onClick={() => navigate("/family-plans")}>Conocer el plan anual</button>}
          <button type="button" onClick={onClose}>Ahora no</button>
        </div>
      </section>
    </div>
  );
}
