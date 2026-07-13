import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EnglishIntermediate() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(180deg, #22b8f6, #0c66bd)",
        color: "white",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <button
        onClick={() => navigate("/english")}
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          border: "none",
          borderRadius: 30,
          cursor: "pointer",
          fontWeight: 900,
        }}
      >
        <ArrowLeft size={22} />
        Volver
      </button>

      <h1>Mapa Intermedio</h1>
    </main>
  );
}