import "../styles/onboarding.css";

export default function ProgressBar({ step }) {
  return (
    <div className="edu-progress">
      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width:
              step === 1
                ? "245px"
                : step === 2
                ? "50%"
                : "calc(100% - 80px)",
            transition: "all .45s ease"
          }}
        />

        <div className={`progress-dot ${step >= 1 ? "active" : ""}`}>
          1
        </div>

        <div className={`progress-dot middle ${step >= 2 ? "active" : ""}`}>
          2
        </div>

        <div className={`progress-dot last ${step >= 3 ? "active" : ""}`}>
          3
        </div>

      </div>

      <div className="progress-text">
        <span>Tu nombre</span>
        <span>Tu avatar</span>
        <span>¡Listo!</span>
      </div>
    </div>
  );
}