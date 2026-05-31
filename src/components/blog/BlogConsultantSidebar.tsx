import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/contact/whatsapp";
import { SITE_CONTACT } from "@/lib/site";

export function BlogConsultantSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <div className="rounded-sm border border-primary/20 bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Phone className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Kurum Açma Danışmanınız</p>
            <p className="text-xs text-gray-600">MEB mevzuatına uygun süreç yönetimi</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          Kurum türünüze göre evrak, fiziki şart ve başvuru takvimini birlikte planlayalım. Ön görüşme ücretsizdir.
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className="flex items-center gap-2 font-medium text-gray-900 hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden />
            {SITE_CONTACT.phoneDisplay}
          </a>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium text-gray-900 hover:text-[#128C7E]"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            WhatsApp ile yazın
          </a>
          <a
            href={SITE_CONTACT.emailMailto}
            className="flex items-center gap-2 font-medium text-gray-900 hover:text-primary"
          >
            <Mail className="h-4 w-4 text-primary" aria-hidden />
            {SITE_CONTACT.email}
          </a>
        </div>
        <div className="mt-5 grid gap-2">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#1ebe57]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Ön Görüşme
          </a>
          <Link
            href="/iletisim"
            className="block rounded-sm bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#c90510]"
          >
            Form ile Talep Et
          </Link>
        </div>
      </div>

      <div className="rounded-sm border border-border bg-surface p-4 text-sm leading-7 text-gray-700">
        <p className="font-semibold text-gray-900">Danışmanlık kapsamı</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>Kurum türü ve mekân analizi</li>
          <li>Evrak dosyası hazırlığı</li>
          <li>Başvuru takibi</li>
          <li>Denetim ön kontrolü</li>
        </ul>
      </div>
    </aside>
  );
}
