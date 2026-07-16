import "../styles/onboarding.css";
import "../styles/ready.css";

import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ReadyPage() {

  const navigate = useNavigate();

  return (
    <main className="edu-screen">

      <button
        className="back-btn"
        onClick={() => navigate("/avatar")}
      >
        <ArrowLeft size={26} />
        Regresar
      </button>

      <img
        className="edu-logo"
        src="/assets/logo.png"
        alt="EduPlay"
      />

      <div className="edu-progress">

        <div className="progress-track">

          <div className="progress-fill step-three"></div>

          <div className="progress-dot active">
            1
          </div>

          <div className="progress-dot middle active">
            2
          </div>

          <div className="progress-dot last active">
            3
          </div>

        </div>

        <div className="progress-text">
          <span>Tu nombre</span>
          <span>Tu avatar</span>
          <span>¡Listo!</span>
        </div>

      </div>

      <img
        className="ready-mascot"
        src="/assets/mascot.png"
        alt=""
      />

      <section className="ready-card">

        <CheckCircle
          className="ready-icon"
          size={74}
        />

        <h1>
          ¡Todo listo!
        </h1>

        <p>
          Tu aventura de aprendizaje está preparada.
        </p>

        <button
          className="ready-button"
          onClick={() => navigate("/home")}
        >
          Empezar
          <ArrowRight size={42} />
        </button>

        <small>
          ⭐ Aprende, juega y diviértete con EduPlay.
        </small>

      </section>

    </main>
  );
}