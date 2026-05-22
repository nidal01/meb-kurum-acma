import { FileText, ExternalLink } from "lucide-react";
import {
  getArticlesForService,
  OZEL_OGRETIM_KURUMLARI_YONETMELIGI,
  OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF
} from "@/lib/mevzuat";

type Props = {
  serviceSlug: string;
  serviceTitle: string;
};

export function MevzuatBlock({ serviceSlug, serviceTitle }: Props) {
  const articles = getArticlesForService(serviceSlug);
  const showOeelRef = serviceSlug === "ozel-egitim-rehabilitasyon-merkezi-acilisi";

  if (articles.length === 0) return null;

  return (
    <section
      id="mevzuat"
      className="scroll-mt-28 rounded-sm border border-border bg-white p-6 shadow-card sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Mevzuat dayanağı</p>
          <h2 className="mt-1 text-base font-semibold text-gray-900">
            {OZEL_OGRETIM_KURUMLARI_YONETMELIGI.shortTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-700">
            {serviceTitle} sürecinde aşağıdaki maddeler sık başvurulan çerçeveyi oluşturur. Metinler bilgilendirme
            amaçlı özetlenmiştir; güncel ve bağlayıcı metin için Resmî Gazete yayımları esas alınmalıdır.
          </p>
        </div>
        <a
          href={OZEL_OGRETIM_KURUMLARI_YONETMELIGI.pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/30 hover:text-primary"
        >
          <FileText className="h-4 w-4" />
          Yönetmelik PDF
          <ExternalLink className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>

      {showOeelRef && (
        <div className="mt-4 rounded-sm border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm font-semibold text-gray-900">{OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF.shortTitle}</p>
          <p className="mt-1 text-sm leading-7 text-gray-700">{OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF.summary}</p>
          {OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF.rgNote && (
            <p className="mt-2 text-xs leading-5 text-gray-600">{OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF.rgNote}</p>
          )}
        </div>
      )}

      <ul className="mt-6 divide-y divide-border rounded-sm border border-border">
        {articles.map((a) => (
          <li key={a.id} className="p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-semibold text-primary">{a.madde}</span>
              <h3 className="text-sm font-semibold text-gray-900">{a.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-7 text-gray-700">{a.excerpt}</p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-5 text-gray-600">
        {OZEL_OGRETIM_KURUMLARI_YONETMELIGI.rgNote} Danışmanlık hizmeti resmî mevzuat yerine geçmez; başvuru ve imza
        yetkisi başvuru sahibindedir.
      </p>
    </section>
  );
}
