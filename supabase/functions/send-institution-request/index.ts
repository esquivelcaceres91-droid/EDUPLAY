const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método no permitido" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const destinationEmail = Deno.env.get("INSTITUTION_NOTIFICATION_EMAIL") || "esquivelcaceres91@gmail.com";
    const senderEmail = Deno.env.get("INSTITUTION_SENDER_EMAIL") || "EduPlay <onboarding@resend.dev>";

    if (!resendApiKey) {
      throw new Error("Falta configurar RESEND_API_KEY");
    }

    const body = await request.json();
    const institution = String(body.institution ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!institution || !contact || !email || !phone) {
      return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sentAt = new Intl.DateTimeFormat("es-GT", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "America/Guatemala",
    }).format(new Date());

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17213a">
        <div style="background:linear-gradient(135deg,#3421a8,#0c77d8);padding:26px;border-radius:18px 18px 0 0;color:white">
          <h1 style="margin:0;font-size:25px">Nueva solicitud institucional</h1>
          <p style="margin:8px 0 0;opacity:.9">EduPlay</p>
        </div>
        <div style="padding:26px;border:1px solid #dce5f3;border-top:0;border-radius:0 0 18px 18px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:9px;font-weight:bold;width:210px">Institución</td><td style="padding:9px">${escapeHtml(institution)}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Persona de contacto</td><td style="padding:9px">${escapeHtml(contact)}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Cargo</td><td style="padding:9px">${escapeHtml(body.role || "No indicado")}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Correo</td><td style="padding:9px">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Teléfono</td><td style="padding:9px">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Ciudad / Municipio</td><td style="padding:9px">${escapeHtml(body.city || "No indicado")}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Estudiantes aproximados</td><td style="padding:9px">${escapeHtml(body.students || "No indicado")}</td></tr>
            <tr><td style="padding:9px;font-weight:bold;vertical-align:top">Necesidad o mensaje</td><td style="padding:9px;white-space:pre-wrap">${escapeHtml(body.message || "No indicó un mensaje adicional")}</td></tr>
            <tr><td style="padding:9px;font-weight:bold">Fecha de envío</td><td style="padding:9px">${escapeHtml(sentAt)}</td></tr>
          </table>
          <div style="margin-top:22px;padding:14px 16px;background:#f3f6ff;border-radius:12px">
            Responde manualmente a <strong>${escapeHtml(email)}</strong> o contacta al teléfono <strong>${escapeHtml(phone)}</strong>.
          </div>
        </div>
      </div>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [destinationEmail],
        reply_to: email,
        subject: `Nueva solicitud institucional: ${institution}`,
        html,
      }),
    });

    const resendResult = await resendResponse.json();
    if (!resendResponse.ok) {
      console.error("Resend error:", resendResult);
      throw new Error(resendResult?.message || "No se pudo enviar el correo");
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-institution-request:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
