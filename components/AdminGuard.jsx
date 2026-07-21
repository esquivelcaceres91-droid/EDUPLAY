import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { getAdminAccess } from "../utils/adminLicenseStorage";

export default function AdminGuard({ children }) {
  const [state, setState] = useState({ loading: true, user: null, isAdmin: false });

  useEffect(() => {
    let active = true;

    const verify = async () => {
      try {
        const result = await getAdminAccess();
        if (active) setState({ loading: false, ...result });
      } catch (error) {
        console.error("Error verificando acceso de administrador:", error);
        if (active) setState({ loading: false, user: null, isAdmin: false });
      }
    };

    verify();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      verify();
    });

    return () => {
      active = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  if (state.loading) {
    return (
      <div className="admin-access-screen">
        <div className="admin-access-card">Verificando acceso privado…</div>
      </div>
    );
  }

  if (!state.user) return <Navigate to="/login?next=/admin" replace />;
  if (!state.isAdmin) return <Navigate to="/login?next=/admin" replace />;

  return children;
}
