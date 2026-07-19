const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Body = Record<string, unknown>;
type FieldRule = { value: unknown; max: number; required?: boolean; email?: boolean };
type MailField = { label: string; value: string; multiline?: boolean };
type MailDefinition = { title: string; subject: string; replyTo: string; fields: MailField[]; responseNote: string };

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

const escapeHtml = (value: unknown) => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

const clean = (value: unknown, limit: number) => String(value ?? "").trim().slice(0, limit);

const validateFields = (schema: Record<string, FieldRule>) => {
  const values: Record<string, string> = {};
  for (const [key, rule] of Object.entries(schema)) {
    const value = clean(rule.value, rule.max);
    if (rule.required && !value) throw new Error(`Campo obligatorio ausente: ${key}`);
    if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Correo electrónico inválido");
    values[key] = value;
  }
  return values;
};

const institutionRequest = (body: Body, sentAt: string): MailDefinition => {
  const value = validateFields({
    institution: { value: body.institution, max: 140, required: true },
    contact: { value: body.contact, max: 100, required: true },
    role: { value: body.role, max: 100 },
    email: { value: body.email, max: 160, required: true, email: true },
    phone: { value: body.phone, max: 40, required: true },
    city: { value: body.city, max: 120 },
    students: { value: body.students, max: 50 },
    message: { value: body.message, max: 2000 },
  });
  return {
    title: "Nueva solicitud institucional",
    subject: `Nueva solicitud institucional: ${value.institution}`,
    replyTo: value.email.toLowerCase(),
    fields: [
      { label: "Institución", value: value.institution },
      { label: "Persona de contacto", value: value.contact },
      { label: "Cargo", value: value.role || "No indicado" },
      { label: "Correo", value: value.email },
      { label: "Teléfono", value: value.phone },
      { label: "Ciudad / Municipio", value: value.city || "No indicado" },
      { label: "Estudiantes aproximados", value: value.students || "No indicado" },
      { label: "Necesidad o mensaje", value: value.message || "No indicó un mensaje adicional", multiline: true },
      { label: "Fecha de envío", value: sentAt },
    ],
    responseNote: `Responde manualmente a <strong>${escapeHtml(value.email)}</strong> o contacta al teléfono <strong>${escapeHtml(value.phone)}</strong>.`,
  };
};

const landingContactRequest = (body: Body, sentAt: string): MailDefinition => {
  const value = validateFields({
    name: { value: body.name, max: 100, required: true },
    email: { value: body.email, max: 160, required: true, email: true },
    phone: { value: body.phone, max: 40 },
    inquiryType: { value: body.inquiryType, max: 50, required: true },
    message: { value: body.message, max: 2000, required: true },
  });
  return {
    title: "Nuevo mensaje desde la Landing",
    subject: `Contacto EduPlay: ${value.inquiryType} — ${value.name}`,
    replyTo: value.email.toLowerCase(),
    fields: [
      { label: "Nombre", value: value.name },
      { label: "Correo", value: value.email },
      { label: "Teléfono", value: value.phone || "No indicado" },
      { label: "Tipo de consulta", value: value.inquiryType },
      { label: "Mensaje", value: value.message, multiline: true },
      { label: "Fecha y hora", value: sentAt },
      { label: "Origen", value: "Formulario de contacto de la Landing" },
    ],
    responseNote: `Responde manualmente a <strong>${escapeHtml(value.email)}</strong>${value.phone ? ` o contacta al teléfono <strong>${escapeHtml(value.phone)}</strong>` : ""}.`,
  };
};

const requestBuilders: Record<string, (body: Body, sentAt: string) => MailDefinition> = {
  institution: institutionRequest,
  landing_contact: landingContactRequest,
};

const buildEmailHtml = (mail: MailDefinition) => {
  const rows = mail.fields.map((field) => `<tr><td style="padding:9px;font-weight:bold;width:210px;${field.multiline ? "vertical-align:top" : ""}">${escapeHtml(field.label)}</td><td style="padding:9px;${field.multiline ? "white-space:pre-wrap" : ""}">${escapeHtml(field.value)}</td></tr>`).join("");
  return `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#17213a"><div style="background:linear-gradient(135deg,#3421a8,#0c77d8);padding:26px;border-radius:18px 18px 0 0;color:white"><h1 style="margin:0;font-size:25px">${escapeHtml(mail.title)}</h1><p style="margin:8px 0 0;opacity:.9">EduPlay</p></div><div style="padding:26px;border:1px solid #dce5f3;border-top:0;border-radius:0 0 18px 18px;background:#fff"><table style="width:100%;border-collapse:collapse">${rows}</table><div style="margin-top:22px;padding:14px 16px;background:#f3f6ff;border-radius:12px">${mail.responseNote}</div></div></div>`;
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método no permitido" }, 405);
  try {
    const body: Body = await request.json();
    if (clean(body.website, 200)) return json({ success: true });
    const requestType = clean(body.requestType, 60) || "institution";
    const builder = requestBuilders[requestType];
    if (!builder) return json({ error: "Tipo de solicitud no permitido" }, 400);

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const destinationEmail = Deno.env.get("INSTITUTION_NOTIFICATION_EMAIL") || "esquivelcaceres91@gmail.com";
    const senderEmail = Deno.env.get("INSTITUTION_SENDER_EMAIL") || "EduPlay <onboarding@resend.dev>";
    if (!resendApiKey) throw new Error("Falta configurar RESEND_API_KEY");

    const sentAt = new Intl.DateTimeFormat("es-GT", { dateStyle: "full", timeStyle: "short", timeZone: "America/Guatemala" }).format(new Date());
    const mail = builder(body, sentAt);
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: senderEmail, to: [destinationEmail], reply_to: mail.replyTo, subject: mail.subject, html: buildEmailHtml(mail) }),
    });
    const resendResult = await resendResponse.json();
    if (!resendResponse.ok) throw new Error(resendResult?.message || "No se pudo enviar el correo");
    return json({ success: true });
  } catch (error) {
    console.error("send-institution-request:", error);
    const message = error instanceof Error ? error.message : "Error interno";
    const status = message.startsWith("Campo obligatorio") || message.includes("inválido") ? 400 : 500;
    return json({ error: message }, status);
  }
});
