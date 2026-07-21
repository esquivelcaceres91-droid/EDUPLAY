import "../styles/onboarding.css";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AvatarPage() {

  const navigate = useNavigate();

  const avatars = Array.from({ length: 10 });

  return (
    <main className="edu-screen">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
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
          <div className="progress-fill step-two"></div>

          <div className="progress-dot active">1</div>
          <div className="progress-dot middle active">2</div>
          <div className="progress-dot last">3</div>
        </div>

        <div className="progress-text">
          <span>Tu nombre</span>
          <span>Tu avatar</span>
          <span>¡Listo!</span>
        </div>

      </div>

      <img
        className="avatar-mascot"
        src="/assets/mascot.png"
        alt=""
      />

      <section className="avatar-card-pro">

        <div className="avatar-title">
          <span>⭐</span>
          <h1>Elige tu avatar</h1>
          <span>⭐</span>
        </div>

        <p>Selecciona el avatar que más te guste.</p>

        <div className="avatar-grid-pro">

          {avatars.map((_, index) => (

            <button
              key={index}
              className={index === 0 ? "avatar-box selected" : "avatar-box"}
            >

              {index === 0 && (
                <div className="avatar-check">
                  <Check size={34} />
                </div>
              )}

              <img
                src={`/assets/avatar-${index + 1}.png`}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/assets/mascot.png";
                }}
              />

            </button>

          ))}

        </div>

        <button
          className="avatar-ready-btn"
          onClick={() => navigate("/ready")}
        >
          Listo
          <ArrowRight size={44} />
        </button>

        <small>
          🛡️ Puedes cambiar tu avatar después en tu perfil.
        </small>

      </section>

    </main>
  );
}