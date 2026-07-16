import "../styles/onboarding.css";
import { User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NamePage() {

  const navigate = useNavigate();

  return (
    <main className="edu-screen">

      <img
        className="edu-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <div className="edu-progress">

        <div className="progress-track">
          <div className="progress-fill"></div>

          <div className="progress-dot active">1</div>
          <div className="progress-dot middle">2</div>
          <div className="progress-dot last">3</div>

        </div>

        <div className="progress-text">
          <span>Tu nombre</span>
          <span>Tu avatar</span>
          <span>¡Listo!</span>
        </div>

      </div>

      <img
        className="edu-mascot"
        src="/assets/mascot.png"
        alt=""
      />

      <section className="edu-card">

        <h1>¿Cómo te llamas?</h1>

        <p>
          Escribe tu nombre para comenzar tu aventura.
        </p>

        <div className="edu-input">

          <input
            placeholder="Escribe tu nombre aquí..."
          />

          <User size={38} />

        </div>

        <button
          className="edu-button"
          onClick={() => navigate("/avatar")}
        >
          Continuar
          <ArrowRight size={38} />
        </button>

        <small>
          ⭐ ¡Tu aventura está por comenzar!
        </small>

      </section>

    </main>
  );
}