import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  getActiveProfileId,
  loadProfiles,
} from "../utils/accountStorage";
import { getAccountLicense } from "../utils/licenseStorage";

export default function SessionEntryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (!active) return;

        if (!data.session?.user) {
          navigate("/create-account", { replace: true });
          return;
        }

        const license = await getAccountLicense();
        if (!active) return;

        if (!license?.isActive) {
          navigate("/choose-license", { replace: true });
          return;
        }

        const profiles = await loadProfiles();
        if (!active) return;

        if (!profiles.length) {
          navigate("/create-profiles", { replace: true });
          return;
        }

        const activeProfileId = getActiveProfileId();
        const activeProfileExists = profiles.some(
          (profile) => profile.id === activeProfileId,
        );

        navigate(activeProfileExists ? "/home" : "/profiles", {
          replace: true,
        });
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
