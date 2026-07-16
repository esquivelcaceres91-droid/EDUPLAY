import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { getAccount, loginFamily, migrateLegacyProfile } from "../utils/accountStorage";
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
    getAccount().then((account) => {
      if (active && account) nav(requestedPath, { replace: true });
    }).catch(() => {});
    return () => { active = false; };
  }, [nav, requestedPath]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginFamily(form);
      await migrateLegacyProfile();
      nav(requestedPath, { replace: true });
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
