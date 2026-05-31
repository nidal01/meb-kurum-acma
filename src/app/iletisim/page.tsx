import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { GoogleMapEmbed } from "@/components/contact/GoogleMapEmbed";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { RichText } from "@/components/content/RichText";
import { makeFaqSchemaJsonLd, makePageSeoText, makeSiteWideFaq } from "@/lib/longform";
import { SITE_CONTACT, SITE_MAPS } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "İletişim",
  description:
    "MEB kurum açma danışmanlığı için ön görüşme: +90 (216) 599 0159 ve info@meboyunevi.com. Form ile kurum türü ve hedef tarihinizi paylaşın.",
  path: "/iletisim",
  keywords: ["MEB kurum açma iletişim", "ön görüşme kurum açma", "danışmanlık başvuru"]
});

export default function ContactPage() {
  const longform = makePageSeoText("İletişim");
  const faq = makeSiteWideFaq();
  return (
    <>
      <Container className="py-10 sm:py-12">
        <PageHeader
          title="İletişim"
          subtitle="Başvuru sürecinizi konuşalım. Kurum türünüz ve hedef tarihinize göre size özel bir yol haritası oluşturalım."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <section className="rounded-sm border border-border bg-white p-6 shadow-card lg:col-span-7">
            <h2 className="text-base font-semibold text-gray-900">İletişim Formu</h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Formu doldurun; çalışma saatleri içinde en kısa sürede dönüş sağlayalım.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </section>

          <aside className="rounded-sm border border-border bg-surface p-6 shadow-card lg:col-span-5">
            <h3 className="text-sm font-semibold text-gray-900">İletişim Bilgileri</h3>
            <dl className="mt-3 space-y-3 text-sm leading-7 text-gray-700">
              <div>
                <dt className="font-semibold text-gray-900">Telefon</dt>
                <dd>
                  <a href={`tel:${SITE_CONTACT.phoneTel}`} className="hover:text-primary">
                    {SITE_CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">E-posta</dt>
                <dd>
                  <a href={SITE_CONTACT.emailMailto} className="hover:text-primary">
                    {SITE_CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">WhatsApp</dt>
                <dd className="mt-1">
                  <WhatsAppLink variant="button" label="WhatsApp ile hemen yazın" className="w-full" />
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Adres</dt>
                <dd>
                  {SITE_CONTACT.address}
                  <br />
                  <a
                    href={SITE_MAPS.openUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-primary hover:underline"
                  >
                    Google Maps&apos;te yol tarifi al
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-900">Konum</p>
              <div className="mt-2">
                <GoogleMapEmbed minHeight={260} />
              </div>
            </div>
          </aside>
        </div>
      </Container>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="İletişim ve Ön Değerlendirme Rehberi"
            subtitle="Hangi bilgileri paylaşırsanız daha hızlı ve doğru bir yol haritası oluşturabiliriz?"
          />
          <div className="mt-6 rounded-sm border border-border bg-white p-6 shadow-card">
            <RichText paragraphs={longform} />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle title="Sık Sorulan Sorular" subtitle="Ön görüşme, kapsam ve takip süreciyle ilgili temel yanıtlar." />
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

