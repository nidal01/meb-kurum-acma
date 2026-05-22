import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RichText } from "@/components/content/RichText";
import { makeFaqSchemaJsonLd, makePageSeoText, makeSiteWideFaq } from "@/lib/longform";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Hakkımızda",
  description:
    "MEB kurum açma danışmanlığında kurumsal yaklaşımımız: mevzuata uyum, kontrol listeleri, yazılı takip ve denetim hazırlığı disiplini.",
  path: "/hakkimizda",
  keywords: ["MEB danışmanlık", "kurum açma danışmanlığı hakkında", "kurumsal süreç yönetimi"]
});

export default function AboutPage() {
  const longform = makePageSeoText("Hakkımızda");
  const faq = makeSiteWideFaq();
  return (
    <>
      <Container className="py-10 sm:py-12">
        <PageHeader
          title="Hakkımızda"
          subtitle="MEB mevzuatına uygun kurum açılış süreçlerinde, kurumsal disiplin ve şeffaf iletişimle danışmanlık sunuyoruz."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <section className="rounded-sm border border-border bg-white p-6 shadow-card lg:col-span-8">
            <h2 className="text-base font-semibold text-gray-900">Vizyonumuz</h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Eğitim ve sağlık odaklı kurumların kuruluş süreçlerinde, başvuru sahiplerinin mevzuata uygun ve sürdürülebilir
              bir yapıya kavuşmasını sağlamak. Süreci “evrak teslimi” seviyesinde değil, kurumun denetim standartlarına uyumu
              ve operasyonel hazırlığıyla birlikte ele almak.
            </p>

            <h2 className="mt-6 text-base font-semibold text-gray-900">Misyonumuz</h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              MEB kurum açma süreçlerinde gerekli şartları doğru yorumlayan, uygulama örnekleriyle desteklenen ve başvuru
              takibini sistemli yürüten bir danışmanlık hizmeti sunmak. Her adımda; riskleri önceden belirlemek, eksikleri
              net biçimde paylaşmak ve çözüm planını birlikte uygulamak.
            </p>

            <h2 className="mt-6 text-base font-semibold text-gray-900">Mevzuat Hakimiyeti</h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Yönetmelik, yönerge ve güncel uygulama esaslarını düzenli takip eder; kurum türüne göre ihtiyaç duyulan
              başvuru evraklarını, fiziki şartları ve denetim kriterlerini kontrol listeleriyle yönetiriz. Böylece süreç
              boyunca “ne zaman, hangi belge, hangi kontrol” sorularının yanıtı net ve izlenebilir olur.
            </p>
          </section>

          <aside className="rounded-sm border border-border bg-surface p-6 shadow-card lg:col-span-4">
            <h3 className="text-sm font-semibold text-gray-900">Çalışma Prensiplerimiz</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-700">
              <li>Kurumsal ve yazılı süreç yönetimi</li>
              <li>Mevzuata dayalı kontrol listeleri</li>
              <li>Zaman planı ve sorumluluk matrisi</li>
              <li>Şeffaf raporlama ve hızlı geri dönüş</li>
            </ul>
          </aside>
        </div>
      </Container>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Kurumsal Yaklaşımımız"
            subtitle="Bu bölüm; çalışma disiplinimizi, başvuru yönetimi anlayışımızı ve denetim hazırlığı bakış açımızı detaylı şekilde anlatır."
          />
          <div className="mt-6 rounded-sm border border-border bg-white p-6 shadow-card">
            <RichText paragraphs={longform} />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle title="Sık Sorulan Sorular" subtitle="Danışmanlık yaklaşımımız ve işleyişle ilgili temel sorular." />
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

