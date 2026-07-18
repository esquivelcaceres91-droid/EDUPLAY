import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, KeyRound, LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AdminInstitutionsSection from "../components/AdminInstitutionsSection";
import AdminCouponsSection from "../components/AdminCouponsSection";
import {
  generateLicenseCode,
  listLicenseCodes,
  setLicenseAvailability,
  revokeAccountLicense,
} from "../utils/adminLicenseStorage";
import "../styles/admin.css";

const planInfo = {
  six_months: { label: "Familiar · 6 meses", days: 180, price: "Q299" },
  annual: { label: "Familiar · Anual", days: 365, price: "Q499" },
};

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState("six_months");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadCodes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setCodes(await listLicenseCodes());
    } catch (err) {
      setError(err?.message || "No se pudieron cargar las licencias.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  const stats = useMemo(() => ({
    available: codes.filter((item) => item.effective_status === "available").length,
    claimed: codes.filter((item) => item.effective_status === "claimed").length,
    disabled: codes.filter((item) => ["disabled", "revoked", "expired"].includes(item.effective_status)).length,
  }), [codes]);

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage("");
    setError("");
    try {
      const result = await generateLicenseCode(plan);
      setMessage(`Código generado: ${result.code}`);
      await navigator.clipboard?.writeText(result.code).catch(() => {});
      await loadCodes();
    } catch (err) {
      setError(err?.message || "No se pudo generar la licencia.");
    } finally {
      setGenerating(false);
    }
  };

  const handleToggle = async (license) => {
    setMessage("");
    setError("");
    try {
      await setLicenseAvailability(license.id, license.effective_status !== "available");
      await loadCodes();
    } catch (err) {
      setError(err?.message || "No se pudo actualizar el código.");
    }
  };

  const handleRevoke = async (license) => {
    const confirmed = window.confirm(
      `¿Revocar la licencia ${license.code}? El cliente perderá el acceso inmediatamente.`,
    );
    if (!confirmed) return;

    setMessage("");
    setError("");
    try {
      await revokeAccountLicense(license.id);
      setMessage(`Licencia revocada: ${license.code}`);
      await loadCodes();
    } catch (err) {
      setError(err?.message || "No se pudo revocar la licencia.");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <span className="admin-kicker"><ShieldCheck size={18} /> Panel privado</span>
            <h1>Administración EduPlay</h1>
            <p>Genera y controla códigos familiares sin entrar manualmente a Supabase.</p>
          </div>
          <button className="admin-ghost-button" onClick={handleSignOut} type="button">
            <LogOut size={18} /> Cerrar sesión
          </button>
        </header>

        <div className="admin-stats">
          <article><strong>{stats.available}</strong><span>Disponibles</span></article>
          <article><strong>{stats.claimed}</strong><span>Utilizados</span></article>
          <article><strong>{stats.disabled}</strong><span>Bloqueados / vencidos</span></article>
        </div>

        <section className="admin-generator">
          <div className="admin-generator-title">
            <KeyRound size={24} />
            <div><h2>Generar nueva licencia</h2><p>Elige el plan; la duración se coloca automáticamente.</p></div>
          </div>

          <div className="admin-plan-options">
            {Object.entries(planInfo).map(([value, info]) => (
              <button
                type="button"
                key={value}
                className={`admin-plan-option ${plan === value ? "is-selected" : ""}`}
                onClick={() => setPlan(value)}
              >
                <span>{info.label}</span>
                <strong>{info.price}</strong>
                <small>{info.days} días · 3 perfiles</small>
              </button>
            ))}
          </div>

          <button className="admin-primary-button" type="button" onClick={handleGenerate} disabled={generating}>
            {generating ? "Generando…" : "Generar y copiar código"}
          </button>

          {message && <div className="admin-message success">{message}</div>}
          {error && <div className="admin-message error">{error}</div>}
        </section>

        <section className="admin-list-card">
          <div className="admin-list-header">
            <div><h2>Códigos generados</h2><p>Los códigos utilizados no pueden volver a venderse.</p></div>
            <button type="button" className="admin-ghost-button" onClick={loadCodes} disabled={loading}>
              <RefreshCw size={17} /> Actualizar
            </button>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Código</th><th>Plan</th><th>Duración</th><th>Estado</th><th>Creado</th><th>Activado</th><th>Cliente</th><th>Acciones</th></tr></thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="8">Cargando…</td></tr>
                ) : codes.length === 0 ? (
                  <tr><td colSpan="8">Todavía no hay códigos.</td></tr>
                ) : codes.map((license) => (
                  <tr key={license.id}>
                    <td><code>{license.code}</code></td>
                    <td>{license.duration_days === 180 ? "6 meses" : license.duration_days === 365 ? "Anual" : "Especial"}</td>
                    <td>{license.duration_days} días</td>
                    <td><span className={`admin-status ${license.effective_status || license.status}`}>{license.effective_status || license.status}</span></td>
                    <td className="admin-date">{formatDate(license.created_at)}</td>
                    <td className="admin-date">{formatDate(license.claimed_at)}</td>
                    <td className="admin-client">{license.client_email || "—"}</td>
                    <td className="admin-actions">
                      <button type="button" onClick={() => navigator.clipboard?.writeText(license.code)} title="Copiar código"><Copy size={16} /></button>
                      {license.effective_status === "available" && (
                        <button type="button" onClick={() => handleToggle(license)}>Desactivar</button>
                      )}
                      {license.effective_status === "disabled" && (
                        <button type="button" onClick={() => handleToggle(license)}>Reactivar</button>
                      )}
                      {license.effective_status === "claimed" && (
                        <button type="button" onClick={() => handleRevoke(license)}>Revocar licencia</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AdminInstitutionsSection />
        <AdminCouponsSection />
      </section>
    </main>
  );
}
