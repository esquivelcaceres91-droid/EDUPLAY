import "../styles/onboarding.css";

const labels = ["Tu nombre", "Tu grado", "Tu avatar", "¡Listo!"];

export default function ProgressBar({ step }) {
  const normalizedStep = Math.min(4, Math.max(1, step));
  const fillWidth = `${((normalizedStep - 1) / 3) * 100}%`;

  return (
    <div className="edu-progress">
      <div className="progress-track four-steps">
        <div className="progress-fill" style={{ width: fillWidth }} />

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`progress-dot progress-dot-${item} ${
              normalizedStep >= item ? "active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="progress-text four-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
