import { useCallback, useEffect, useMemo, useState } from "react";
import { BadgePercent, Pencil, RefreshCw, Save, Trash2, Users } from "lucide-react";
import {
  createAffiliateCoupon, deleteAffiliateCoupon, listAffiliateCoupons, listAffiliateSales,
  setAffiliateCouponStatus, updateAffiliateCoupon, updateAffiliateSaleStatus,
} from "../utils/adminCouponStorage";

const emptyForm = { affiliate_name: "", code: "", commission_type: "percentage", commission_value: "", status: "active", expires_at: "", usage_limit: "" };
const money = (value) => `Q${Number(value || 0).toFixed(2)}`;
const date = (value) => value ? new Intl.DateTimeFormat("es-GT", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "—";

export default function AdminCouponsSection() {
  const [coupons, setCoupons] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [couponRows, saleRows] = await Promise.all([listAffiliateCoupons(), listAffiliateSales()]);
      setCoupons(couponRows); setSales(saleRows);
    } catch (err) { setError(err?.message || "No se pudieron cargar los cupones."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const stats = useMemo(() => ({
    coupons: coupons.length,
    affiliates: new Set(coupons.map((item) => item.affiliate_name)).size,
    confirmed: coupons.reduce((sum, item) => sum + Number(item.confirmed_uses || 0), 0),
    pending: sales.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.commission_amount || 0), 0),
  }), [coupons, sales]);

  const change = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }));
  const reset = () => { setForm(emptyForm); setEditing(null); };

  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try {
      if (editing) await updateAffiliateCoupon(editing, form); else await createAffiliateCoupon(form);
      setMessage(editing ? "Cupón actualizado." : "Cupón creado."); reset(); await load();
    } catch (err) { setError(err?.message || "No se pudo guardar el cupón."); }
    finally { setSaving(false); }
  };

  const edit = (coupon) => {
    setEditing(coupon.id);
    setForm({ affiliate_name: coupon.affiliate_name, code: coupon.code, commission_type: coupon.commission_type,
      commission_value: coupon.commission_value, status: coupon.status, expires_at: coupon.expires_at?.slice(0, 10) || "", usage_limit: coupon.usage_limit || "" });
    document.getElementById("admin-coupon-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggle = async (coupon) => { try { await setAffiliateCouponStatus(coupon.id, coupon.status === "active" ? "inactive" : "active"); await load(); } catch (err) { setError(err.message); } };
  const remove = async (coupon) => {
    if (!window.confirm(`¿Eliminar el cupón ${coupon.code}?`)) return;
    try { await deleteAffiliateCoupon(coupon.id); await load(); } catch (err) { setError(err.message); }
  };
  const changeSaleStatus = async (sale, status) => {
    try { await updateAffiliateSaleStatus(sale.id, status); await load(); } catch (err) { setError(err.message); }
  };

  return (
    <section className="admin-coupons-section">
      <div className="admin-section-heading">
        <div><span className="admin-kicker"><BadgePercent size={18} /> Ventas y comisiones</span><h2>Cupones y afiliados</h2><p>El descuento al cliente es fijo: 5% semestral y 10% anual.</p></div>
        <button type="button" className="admin-ghost-button" onClick={load}><RefreshCw size={17} /> Actualizar</button>
      </div>

      <div className="admin-stats admin-coupon-stats">
        <article><strong>{stats.coupons}</strong><span>Cupones</span></article>
        <article><strong>{stats.affiliates}</strong><span>Afiliados</span></article>
        <article><strong>{stats.confirmed}</strong><span>Usos confirmados</span></article>
        <article><strong>{money(stats.pending)}</strong><span>Comisión pendiente</span></article>
      </div>

      <form id="admin-coupon-form" className="admin-generator admin-coupon-form" onSubmit={submit}>
        <div className="admin-generator-title"><Users size={24} /><div><h2>{editing ? "Editar cupón" : "Crear cupón"}</h2><p>El código se normaliza en mayúsculas y debe ser único.</p></div></div>
        <div className="admin-form-grid">
          <label>Afiliado<input name="affiliate_name" value={form.affiliate_name} onChange={change} required /></label>
          <label>Código<input name="code" value={form.code} onChange={change} required /></label>
          <label>Tipo de comisión<select name="commission_type" value={form.commission_type} onChange={change}><option value="percentage">Porcentaje</option><option value="fixed">Monto fijo</option></select></label>
          <label>Valor de comisión<input name="commission_value" type="number" min="0" step="0.01" value={form.commission_value} onChange={change} required /></label>
          <label>Estado<select name="status" value={form.status} onChange={change}><option value="active">Activo</option><option value="inactive">Inactivo</option></select></label>
          <label>Vence (opcional)<input name="expires_at" type="date" value={form.expires_at} onChange={change} /></label>
          <label>Límite de usos (opcional)<input name="usage_limit" type="number" min="1" value={form.usage_limit} onChange={change} /></label>
        </div>
        <div className="admin-form-actions"><button className="admin-primary-button" disabled={saving}><Save size={17} /> {saving ? "Guardando…" : editing ? "Guardar cambios" : "Crear cupón"}</button>{editing && <button type="button" className="admin-ghost-button" onClick={reset}>Cancelar</button>}</div>
      </form>

      {message && <div className="admin-message success">{message}</div>}
      {error && <div className="admin-message error">{error}</div>}

      <section className="admin-list-card">
        <div className="admin-list-header"><div><h2>Cupones</h2><p>Control de vigencia, usos y comisiones.</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Código</th><th>Afiliado</th><th>Comisión</th><th>Estado</th><th>Vence</th><th>Usos</th><th>Creado</th><th>Acciones</th></tr></thead><tbody>
          {loading ? <tr><td colSpan="8">Cargando…</td></tr> : coupons.length === 0 ? <tr><td colSpan="8">No hay cupones.</td></tr> : coupons.map((coupon) => <tr key={coupon.id}>
            <td><code>{coupon.code}</code></td><td>{coupon.affiliate_name}</td><td>{coupon.commission_type === "percentage" ? `${coupon.commission_value}%` : money(coupon.commission_value)}</td>
            <td><span className={`admin-status ${coupon.status}`}>{coupon.status}</span></td><td>{coupon.expires_at || "—"}</td><td>{coupon.confirmed_uses}{coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}</td><td className="admin-date">{date(coupon.created_at)}</td>
            <td className="admin-actions"><button type="button" onClick={() => edit(coupon)} title="Editar"><Pencil size={16} /></button><button type="button" onClick={() => toggle(coupon)}>{coupon.status === "active" ? "Desactivar" : "Activar"}</button><button type="button" onClick={() => remove(coupon)} title="Eliminar"><Trash2 size={16} /></button></td>
          </tr>)}</tbody></table></div>
      </section>

      <section className="admin-list-card">
        <div className="admin-list-header"><div><h2>Ventas de afiliados</h2><p>Confirma pagos y marca las comisiones liquidadas.</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Fecha</th><th>Código</th><th>Afiliado</th><th>Plan</th><th>Comprador</th><th>Total</th><th>Comisión</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
          {loading ? <tr><td colSpan="9">Cargando…</td></tr> : sales.length === 0 ? <tr><td colSpan="9">No hay ventas registradas.</td></tr> : sales.map((sale) => <tr key={sale.id}><td className="admin-date">{date(sale.created_at)}</td><td><code>{sale.promo_code}</code></td><td>{sale.affiliate_name}</td><td>{sale.plan_type === "annual" ? "Anual" : "6 meses"}</td><td>{sale.buyer_email || "—"}</td><td>{money(sale.final_price)}</td><td>{money(sale.commission_amount)}</td><td><span className={`admin-status ${sale.status}`}>{sale.status}</span></td><td>
            <select className="admin-status-select" value={sale.status} onChange={(event) => changeSaleStatus(sale, event.target.value)}><option value="pending">Pendiente</option><option value="paid">Pagada</option><option value="cancelled">Cancelada</option><option value="commission_paid">Comisión pagada</option></select>
          </td></tr>)}</tbody></table></div>
      </section>
    </section>
  );
}
