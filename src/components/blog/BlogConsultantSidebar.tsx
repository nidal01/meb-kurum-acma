import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site";

export function BlogConsultantSidebar() {
  return (
    <aside className="space-y-4 lg:sticky lg:top-6">
      <div className="rounded-sm border border-primary/20 bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="h-6 w-6" aria-hidden />
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
            href={SITE_CONTACT.emailMailto}
            className="flex items-center gap-2 font-medium text-gray-900 hover:text-primary"
          >
            <Mail className="h-4 w-4 text-primary" aria-hidden />
            {SITE_CONTACT.email}
          </a>
        </div>
        <Link
          href="/iletisim"
          className="mt-5 block rounded-sm bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#c90510]"
        >
          Ön Görüşme Talep Et
        </Link>
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
