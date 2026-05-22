import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SERVICES } from "@/lib/services";
import { OZEL_OGRETIM_KURUMLARI_YONETMELIGI } from "@/lib/mevzuat";
import { FileText } from "lucide-react";
import { RichText } from "@/components/content/RichText";
import { makeFaqSchemaJsonLd, makePageSeoText, makeSiteWideFaq } from "@/lib/longform";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hizmetlerimiz",
  description:
    "Özel öğretim kurumu açma, özel eğitim rehabilitasyon merkezi, çocuk oyun evi, rehberlik merkezi, DK/ergoterapi ve kurum devir danışmanlığı hizmetleri.",
  path: "/hizmetler",
  keywords: [
    "MEB kurum açma hizmetleri",
    "özel eğitim merkezi açılışı",
    "kurum devir danışmanlığı",
    "özel öğretim kurumları yönetmeliği danışmanlık"
  ]
});

export default function ServicesPage() {
  const longform = makePageSeoText("Hizmetlerimiz");
  const faq = makeSiteWideFaq();
  return (
    <>
      <Container className="py-10 sm:py-12">
        <PageHeader
          title="Hizmetlerimiz"
          subtitle="Her kurum türü için mevzuata uygun yol haritası, evrak yönetimi ve denetim hazırlığı desteği sunuyoruz."
        />

        <div className="mt-6 flex flex-col gap-3 rounded-sm border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">{OZEL_OGRETIM_KURUMLARI_YONETMELIGI.shortTitle}</p>
            <p className="mt-1 text-sm leading-6 text-gray-700">
              Hizmet sayfalarında yönetmelik maddelerine dayalı özetler ve indirilebilir PDF bulunur.
            </p>
          </div>
          <a
            href={OZEL_OGRETIM_KURUMLARI_YONETMELIGI.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:text-primary"
          >
            <FileText className="h-4 w-4 text-primary" />
            PDF İndir
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Container>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Hizmet Kapsamı ve Çalışma Modeli"
            subtitle="Her kurum türü farklı şartlar barındırır. Aşağıdaki rehber metin; yaklaşımımızı, teslim edilebilir çıktıları ve takip standardımızı açıklar."
          />
          <div className="mt-6 rounded-sm border border-border bg-white p-6 shadow-card">
            <RichText paragraphs={longform} />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle title="Sık Sorulan Sorular" subtitle="Hizmet seçimi ve süreç planlamasıyla ilgili öne çıkan sorular." />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faq.map((f) => (
              <div key={f.q} className="rounded-sm border border-border bg-white p-5 shadow-card">
                <p className="text-sm font-semibold text-gray-900">{f.q}</p>
                <p className="mt-2 text-sm leading-7 text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeFaqSchemaJsonLd(faq)) }}
      />
    </>
  );
}

