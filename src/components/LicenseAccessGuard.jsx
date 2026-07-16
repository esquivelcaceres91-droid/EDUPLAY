import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { getAccountLicense } from "../utils/licenseStorage";

const PUBLIC_PATHS = new Set([
  "/",
  "/create-account",
  "/login",
  "/choose-license",
  "/family-plans",
  "/activate-license",
  "/payment-success",
  "/checkout",
  "/institution-info",
  "/admin",
]);

const isPublicPath = (pathname) => PUBLIC_PATHS.has(pathname);

export default function LicenseAccessGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  const verificationId = useRef(0);

  const verifyAccess = useCallback(async () => {
    const requestId = ++verificationId.current;
    const requestedPath = location.pathname;

    // El panel privado nunca depende de una licencia familiar activa.
    if (isPublicPath(requestedPath)) return;

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      // Ignora resultados viejos si la ruta cambió mientras Supabase respondía.
      if (requestId !== verificationId.current) return;
      if (isPublicPath(window.location.pathname)) return;

      if (!data.session?.user) {
        navigate(`/login?next=${encodeURIComponent(requestedPath)}`, { replace: true });
        return;
      }

      const license = await getAccountLicense();

      if (requestId !== verificationId.current) return;
      if (isPublicPath(window.location.pathname)) return;

      if (!license?.isActive) {
        const status = license?.status || "required";
        const licenseReason = ["expired", "revoked", "inactive"].includes(status)
          ? status
          : "required";

        navigate("/activate-license", {
          replace: true,
          state: {
            licenseReason,
            returnTo: requestedPath,
          },
        });
      }
    } catch (error) {
      console.error("No se pudo validar la licencia:", error);
      if (requestId !== verificationId.current) return;
      if (isPublicPath(window.location.pathname)) return;
      navigate("/activate-license", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    verifyAccess();

    const handleLicenseChange = () => verifyAccess();
    window.addEventListener("eduplay:license-changed", handleLicenseChange);

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      verifyAccess();
    });

    const intervalId = window.setInterval(verifyAccess, 60_000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") verifyAccess();
    };

    window.addEventListener("focus", verifyAccess);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      verificationId.current += 1;
      window.removeEventListener("eduplay:license-changed", handleLicenseChange);
      window.removeEventListener("focus", verifyAccess);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(intervalId);
      listener?.subscription?.unsubscribe();
    };
  }, [verifyAccess]);

  return null;
}
