import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resolveSessionDestination } from "../utils/sessionDestination";

export default function SessionEntryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const destination = await resolveSessionDestination();
        if (active) navigate(destination, { replace: true });
      } catch (error) {
        console.error("No se pudo restaurar la sesión de EduPlay:", error);
        if (active) navigate("/login", { replace: true });
      }
    };

    restoreSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg, #102f78, #071b50)",
        color: "white",
        fontFamily: "Nunito, Arial, sans-serif",
      }}
    >
      <strong>Abriendo EduPlay...</strong>
    </main>
  );
}
