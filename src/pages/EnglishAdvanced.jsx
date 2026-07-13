import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EnglishAdvanced() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(180deg, #7a3de5, #25105f)",
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

      <h1>Mapa Avanzado</h1>
    </main>
  );
}