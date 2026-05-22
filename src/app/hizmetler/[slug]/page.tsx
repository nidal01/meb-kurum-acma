import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ClipboardList, FileCheck2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getServiceBySlug, SERVICES } from "@/lib/services";
import { makeBreadcrumbJsonLd, makeFaqSchemaJsonLd, makeServiceJsonLd } from "@/lib/longform";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { DetailsAccordionFaq, DetailsAccordionRich } from "@/components/ui/DetailsAccordion";
import { MevzuatBlock } from "@/components/services/MevzuatBlock";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildPageMetadata({
    title: service.title,
    description: service.seo.metaDescription,
    path: `/hizmetler/${service.slug}`,
    keywords: service.seo.keywords,
    ogTitle: service.seo.metaTitle,
    ogDescription: service.summary
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const guide = service.guide;
  const faq = service.faq;
  const coverSrc = `/images/services/${service.slug}.svg`;
  const guideAccordionItems = guide.sections.map((s) => ({
    id: s.id,
    title: s.title,
    paragraphs: s.paragraphs
  }));
  const faqAccordionItems = faq.map((f, idx) => ({
    id: `sss-${service.slug}-${idx}`,
    q: f.q,
    a: f.a
  }));

  return (
    <>
      <Container className="py-10 sm:py-12">
        <nav className="mb-4 text-xs text-gray-600">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>{" "}
          <span className="px-1 text-gray-400">/</span>
          <Link href="/hizmetler" className="hover:text-primary">
            Hizmetlerimiz
          </Link>{" "}
          <span className="px-1 text-gray-400">/</span>
          <span className="font-medium text-gray-800">{service.title}</span>
        </nav>

        <div className="space-y-10">
          <div className="rounded-sm border border-border bg-white shadow-card">
            <div className="overflow-hidden rounded-t-sm border-b border-border">
              <img
                src={coverSrc}
                alt={`${service.title} için bilgilendirici kurumsal görsel`}
                className="h-40 w-full bg-surface object-cover sm:h-52"
                loading="eager"
              />
            </div>
            <div className="p-6">
              <div className="mb-4">
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Hizmetlere Dön
                </Link>
              </div>

              <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{service.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">{service.summary}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Badge icon={<ClipboardList className="h-4 w-4 text-primary" />} title="Kontrol listesi" desc="Kurum türüne özel gereksinimler" />
                <Badge icon={<FileCheck2 className="h-4 w-4 text-primary" />} title="Evrak standardı" desc="Düzenli dosyalama ve tutarlılık" />
                <Badge icon={<ShieldCheck className="h-4 w-4 text-primary" />} title="Denetim hazırlığı" desc="Risk azaltan ön kontroller" />
              </div>

              <Link
                href="/iletisim"
                className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-[#c90510] sm:w-auto sm:min-w-[220px]"
              >
                Ön Görüşme Talep Edin
              </Link>
            </div>
          </div>

          <section>
            <h2 id="kapsam" className="scroll-mt-28 text-base font-semibold text-gray-900">
              Kapsam
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">{service.details.kapsam}</p>

            <h2 id="rehber-giris" className="mt-6 scroll-mt-28 text-base font-semibold text-gray-900">
              Kısa Özet (Okumaya Devam)
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">{guide.lead}</p>

            <h2 id="surec" className="mt-6 scroll-mt-28 text-base font-semibold text-gray-900">
              Süreç Nasıl İlerler?
            </h2>
            <ol className="mt-2 space-y-2 text-sm leading-7 text-gray-700">
              {service.details.surec.map((step) => (
                <li key={step} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <h2 id="belgeler" className="mt-6 scroll-mt-28 text-base font-semibold text-gray-900">
              Gerekli Belgeler (Örnek)
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-gray-700">
              {service.details.belgeler.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <h2 id="teslimatlar" className="mt-6 scroll-mt-28 text-base font-semibold text-gray-900">
              Teslimatlar ve Çıktılar
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Deliverable title="Kontrol listesi" desc="Kurum türüne özel şartlar ve doğrulama adımları." />
              <Deliverable title="Dosyalama standardı" desc="Evrakların düzenli ve tutarlı sunumu için şablon/format önerileri." />
              <Deliverable title="Takvim & takip" desc="Kritik tarihleri içeren süreç planı ve durum takibi." />
              <Deliverable title="Denetim ön kontrol" desc="Riskleri azaltan, iyileştirme odaklı hazırlık çalışması." />
            </div>
          </section>

          <MevzuatBlock serviceSlug={service.slug} serviceTitle={service.title} />

          <section id="rehber" className="scroll-mt-28 rounded-sm border border-border bg-surface p-6 shadow-card sm:p-8">
            <SectionTitle
              title="Detaylı Rehber"
              subtitle="Her başlığı açıp kapatarak okuyabilirsiniz. Hizmet özelinde özgün, haber akışlı içerik."
            />
            <div className="mt-6">
              <DetailsAccordionRich items={guideAccordionItems} />
            </div>
          </section>

          <section id="sss" className="scroll-mt-28 rounded-sm border border-border bg-white p-6 shadow-card sm:p-8">
            <SectionTitle
              title="Sık Sorulan Sorular"
              subtitle="Soru ve yanıtları tek tek genişleterek inceleyebilirsiniz."
            />
            <div className="mt-6">
              <DetailsAccordionFaq items={faqAccordionItems} />
            </div>
          </section>
        </div>
      </Container>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(makeFaqSchemaJsonLd(faq))
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            makeBreadcrumbJsonLd([
              { name: "Ana Sayfa", item: `${SITE_URL}/` },
              { name: "Hizmetlerimiz", item: `${SITE_URL}/hizmetler` },
              { name: service.title, item: `${SITE_URL}/hizmetler/${service.slug}` }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(makeServiceJsonLd(service))
        }}
      />
    </>
  );
}

function Badge({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-sm border border-border bg-surface p-3 shadow-card">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>
      <p className="mt-1 text-xs leading-5 text-gray-700">{desc}</p>
    </div>
  );
}

function Deliverable({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-border bg-white p-4 shadow-card">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm leading-7 text-gray-700">{desc}</p>
    </div>
  );
}

