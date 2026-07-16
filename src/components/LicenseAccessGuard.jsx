import { useCallback, useEffect } from "react";
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
  "/institution-info",
  "/admin",
]);

export default function LicenseAccessGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  const verifyAccess = useCallback(async () => {
    if (PUBLIC_PATHS.has(location.pathname)) return;

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!data.session?.user) {
        navigate(`/login?next=${encodeURIComponent(location.pathname)}`, { replace: true });
        return;
      }

      const license = await getAccountLicense();
      if (!license?.isActive) {
        const status = license?.status || "required";
        const licenseReason = ["expired", "revoked", "inactive"].includes(status)
          ? status
          : "required";

        navigate("/activate-license", {
          replace: true,
          state: {
            licenseReason,
            returnTo: location.pathname,
          },
        });
      }
    } catch (error) {
      console.error("No se pudo validar la licencia:", error);
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
      window.removeEventListener("eduplay:license-changed", handleLicenseChange);
      window.removeEventListener("focus", verifyAccess);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearInterval(intervalId);
      listener?.subscription?.unsubscribe();
    };
  }, [verifyAccess]);

  return null;
}
