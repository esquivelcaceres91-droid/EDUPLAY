import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const ADMIN_EMAILS = new Set([
  "esquivelcaceres91@gmail.com",
]);

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

export default function AdminGuard({ children }) {
  const location = useLocation();
  const [state, setState] = useState({ loading: true, user: null, isAdmin: false });

  useEffect(() => {
    let active = true;

    const applySession = (session) => {
      if (!active) return;
      const user = session?.user || null;
      setState({
        loading: false,
        user,
        isAdmin: Boolean(user && ADMIN_EMAILS.has(normalizeEmail(user.email))),
      });
    };

    const restoreSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        applySession(data?.session || null);
      } catch (error) {
        console.error("Error restaurando la sesión del administrador:", error);
        if (active) setState({ loading: false, user: null, isAdmin: false });
      }
    };

    restoreSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
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

  if (!state.user) {
    return <Navigate to="/login?next=/admin" replace state={{ from: location.pathname }} />;
  }

  if (!state.isAdmin) return <Navigate to="/home" replace />;

  return children;
}
