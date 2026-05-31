import { SITE_CONTACT } from "@/lib/site";

const DEFAULT_MESSAGE =
  "Merhaba, MEB kurum açma danışmanlığı hakkında bilgi almak istiyorum.";

/** wa.me için ülke kodu dahil numara (+ işareti olmadan) */
export function getWhatsAppNumber(): string {
  return SITE_CONTACT.phoneTel.replace(/\D/g, "");
}

export function getWhatsAppDefaultMessage(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE?.trim() || DEFAULT_MESSAGE;
}

export function buildWhatsAppUrl(message?: string): string {
  const text = message ?? getWhatsAppDefaultMessage();
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(text)}`;
}
