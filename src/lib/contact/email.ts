import { SITE_NAME } from "@/lib/site";

export type ContactPayload = {
  ad: string;
  soyad: string;
  telefon: string;
  hizmet: string;
  mesaj: string;
};

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? `${SITE_NAME} <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    throw new Error("E-posta yapılandırması eksik (RESEND_API_KEY, CONTACT_TO_EMAIL).");
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const subject = `[Web Formu] ${payload.hizmet} — ${payload.ad} ${payload.soyad}`;
  const text = [
    "Yeni iletişim formu mesajı",
    "",
    `Ad Soyad: ${payload.ad} ${payload.soyad}`,
    `Telefon: ${payload.telefon}`,
    `Hizmet: ${payload.hizmet}`,
    "",
    "Mesaj:",
    payload.mesaj,
    "",
    `— ${SITE_NAME} web sitesi`
  ].join("\n");

  const html = `
    <h2>Yeni iletişim formu mesajı</h2>
    <p><strong>Ad Soyad:</strong> ${escapeHtml(payload.ad)} ${escapeHtml(payload.soyad)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(payload.telefon)}</p>
    <p><strong>Hizmet:</strong> ${escapeHtml(payload.hizmet)}</p>
    <p><strong>Mesaj:</strong></p>
    <p>${escapeHtml(payload.mesaj).replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="color:#666;font-size:12px">${escapeHtml(SITE_NAME)} web sitesi</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html
  });

  if (error) {
    throw new Error(error.message ?? "E-posta gönderilemedi.");
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
