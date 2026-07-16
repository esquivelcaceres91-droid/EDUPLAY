import { CheckCircle2, KeyRound, LogIn, MailCheck, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/access.css";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <main className="access-screen payment-success-screen">
      <section className="payment-success-card">
        <div className="payment-success-icon"><CheckCircle2 /></div>
        <span className="payment-success-eyebrow"><ShieldCheck /> PAGO RECIBIDO</span>
        <h1>¡Gracias por elegir EduPlay!</h1>
        <p>Tu pago fue procesado. Recibirás el código de activación en el correo usado durante la compra.</p>

        <div className="payment-success-info">
          <MailCheck />
          <div>
            <strong>Revisa tu correo</strong>
            <span>Cuando recibas tu código, regresa y actívalo en tu cuenta EduPlay.</span>
          </div>
        </div>

        <div className="payment-success-actions">
          <button type="button" className="activation-primary" onClick={() => navigate("/activate-license")}>
            <KeyRound /> Activar mi código
          </button>
          <button type="button" className="payment-success-secondary" onClick={() => navigate("/login")}>
            <LogIn /> Iniciar sesión
          </button>
        </div>
      </section>
    </main>
  );
}
