import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { loginFamily, migrateLegacyProfile } from "../utils/accountStorage";
import { resolveSessionDestination } from "../utils/sessionDestination";
import { getAdminAccess } from "../utils/adminLicenseStorage";
import "../styles/access.css";

export default function LoginPage() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedPath = searchParams.get("next") === "/admin" ? "/admin" : "/profiles";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const restore = async () => {
      if (requestedPath === "/admin") {
        const access = await getAdminAccess();
        if (active && access.isAdmin) nav("/admin", { replace: true });
        return;
      }

      const destination = await resolveSessionDestination();
      if (active && destination !== "/login" && destination !== "/activate-license") {
        nav(destination, { replace: true });
      }
    };

    restore().catch(() => {});
    return () => { active = false; };
  }, [nav, requestedPath]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginFamily(form);
      await migrateLegacyProfile();
      const destination = requestedPath === "/admin" ? "/admin" : await resolveSessionDestination();
      nav(destination, { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="access-screen login-screen">
      <div className="login-card">
        <img src="/assets/logo.png" alt="EduPlay" />
        <h1>Bienvenido de nuevo</h1>
        <p>{requestedPath === "/admin" ? "Ingresa con tu cuenta de administrador." : "Ingresa a tu cuenta familiar."}</p>
        <form onSubmit={submit}>
          <label>
            <Mail />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </label>
          <label>
            <LockKeyhole />
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </label>
          {error && <div className="form-error">{error}</div>}
          <button className="primary-access-button" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>
        <button className="text-button" onClick={() => nav("/create-account")}>Crear una cuenta nueva</button>
      </div>
    </main>
  );
}
