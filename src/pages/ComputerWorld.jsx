import "../styles/world.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ComputerWorld() {
  const navigate = useNavigate();

  return (
    <main className="world-screen english-screen">
      <button
        className="world-back"
        onClick={() => navigate("/home")}
      >
        <ArrowLeft size={24} />
        Regresar
      </button>

      <h1
        style={{
          color: "#123d8b",
          textAlign: "center",
          paddingTop: "260px",
          fontSize: "54px",
        }}
      >
        Mundo de la Computación
      </h1>
    </main>
  );
}