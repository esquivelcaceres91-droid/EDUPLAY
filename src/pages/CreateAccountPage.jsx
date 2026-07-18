import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { continueWithGoogleAccount, createFamilyAccount } from "../utils/accountStorage";
import "../styles/access.css";

const authMessage = (error) => {
  if (error?.code === "SESSION_CONFIRMATION_REQUIRED") return error.message;
  const message = String(error?.message || "").toLowerCase();
  if (message.includes("already registered") || message.includes("already been registered")) return "Este correo ya tiene una cuenta. Inicia sesión.";
  if (message.includes("invalid email")) return "Escribe un correo electrónico válido.";
  if (message.includes("password")) return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("rate limit")) return "Se hicieron demasiados intentos. Espera un momento y vuelve a probar.";
  return "No pudimos crear la cuenta. Revisa los datos e inténtalo nuevamente.";
};

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const change = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      setError("Completa todos los campos. La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await createFamilyAccount({ ownerName: form.name, email: form.email, password: form.password });
      navigate("/choose-license");
    } catch (accountError) {
      setError(authMessage(accountError));
    } finally {
      setLoading(false);
    }
  };

  const continueWithGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await continueWithGoogleAccount();
    } catch {
      setError("El acceso con Google todavía no está habilitado. Usa correo y contraseña.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="access-screen account-screen account-first-screen">
      <section className="account-panel account-panel-left">
        <div className="stepper account-stepper">
          <b className="active">1<span>Crea tu cuenta</span></b>
          <b>2<span>Elige tu licencia</span></b>
          <b>3<span>Crea perfiles</span></b>
          <b>4<span>¡Comienza!</span></b>
        </div>

        <form className="account-form account-form-compact" onSubmit={submit}>
          <small>EDUPLAY</small>
          <h1>Crea tu cuenta</h1>
          <p>Crea tu cuenta familiar para comenzar la aventura.</p>

          <label><UserRound /><input name="name" value={form.name} onChange={change} placeholder="Nombre completo" /></label>
          <label><Mail /><input name="email" type="email" value={form.email} onChange={change} placeholder="Correo electrónico" /></label>
          <label><LockKeyhole /><input name="password" type={show ? "text" : "password"} value={form.password} onChange={change} placeholder="Contraseña" /><button type="button" aria-label="Mostrar contraseña" onClick={() => setShow((value) => !value)}>{show ? <EyeOff /> : <Eye />}</button></label>
          <label><LockKeyhole /><input name="confirm" type={show ? "text" : "password"} value={form.confirm} onChange={change} placeholder="Confirmar contraseña" /></label>

          {error && <div className="form-error">{error}</div>}
          <button className="primary-access-button" disabled={loading}>{loading ? "Creando cuenta..." : "Continuar"}</button>
          <div className="divider">o</div>
          <button type="button" className="social-button google-access-button" onClick={continueWithGoogle} disabled={googleLoading}><span className="google-g">G</span>{googleLoading ? "Conectando con Google..." : "Continuar con Google"}</button>
          <p className="form-link">¿Ya tienes una cuenta? <button type="button" onClick={() => navigate("/login")}>Iniciar sesión</button></p>
        </form>
      </section>
    </main>
  );
}
