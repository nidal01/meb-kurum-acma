import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, FileText, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SERVICES } from "@/lib/services";
import { makeFaqSchemaJsonLd, makeHomeLongform, makeSiteWideFaq } from "@/lib/longform";
import { RichText } from "@/components/content/RichText";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kurum Açma ve Başvuru Danışmanlığı",
  description:
    "MEB onaylı kurum açma sürecinizde evrak bütünlüğü, fiziki şart planlaması ve denetim hazırlığı. Özel eğitim, oyun evi, rehberlik ve kurum devir danışmanlığı.",
  path: "/",
  keywords: [
    "MEB kurum açma",
    "özel öğretim kurumu danışmanlık",
    "kurum açma süreci",
    "denetim ön kontrol"
  ]
});

export default function HomePage() {
  const longform = makeHomeLongform();
  const faq = makeSiteWideFaq();
  return (
    <>
      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-card">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Resmî süreçlerde güvenilir danışmanlık
              </p>
              <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                MEB Onaylı Kurum Açma Sürecinizde <span className="text-primary">Güvenilir Rehberiniz</span>
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-gray-700 sm:text-base">
                Mevzuata uygun evrak hazırlığı, başvuru yönetimi ve denetim öncesi kontrol adımlarıyla süreci baştan sona
                şeffaf şekilde yönetiyoruz. Amacımız; zaman kaybını azaltmak, hataları önlemek ve başvurunuzu doğru şekilde
                tamamlamaktır.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-[#c90510] focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  Hemen Başvurun
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/hizmetler"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-card transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  Hizmetleri İnceleyin
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <HeroStat icon={<BadgeCheck className="h-4 w-4 text-primary" />} title="%100 Uyum" desc="Mevzuata uygun kontrol listeleri" />
                <HeroStat icon={<Clock className="h-4 w-4 text-primary" />} title="Hızlı İlerleme" desc="Süreçte net adımlar ve takvim" />
                <HeroStat icon={<FileText className="h-4 w-4 text-primary" />} title="Evrak Yönetimi" desc="Eksiksiz dosyalama ve takip" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-sm border border-border bg-white shadow-card">
                <Image
                  src="/images/hero-stripe.svg"
                  alt="Kurumsal danışmanlık görsel şeridi"
                  width={1200}
                  height={400}
                  className="h-28 w-full object-cover"
                  priority
                />
                <div className="p-5">
                <p className="text-sm font-semibold text-gray-900">Ön Değerlendirme</p>
                <p className="mt-1 text-sm text-gray-700">
                  Kurum türünüz, konumunuz ve mevcut hazırlık seviyenize göre 10 dakikalık bir ön görüşme planlayalım.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <Users className="mt-0.5 h-4 w-4 text-primary" />
                    Kurum türüne özel yol haritası
                  </li>
                  <li className="flex gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                    Evrak & şartlar kontrolü
                  </li>
                  <li className="flex gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    Denetim hazırlığı planı
                  </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Hizmetlerimiz"
            subtitle="Kurum türünüze göre mevzuat, evrak ve denetim hazırlığı danışmanlığı."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/hizmetler" className="text-sm font-semibold text-primary hover:underline">
              Tüm hizmetleri görüntüle
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Neden Biz?"
            subtitle="Kurum açma sürecini proje disipliniyle yönetiyoruz."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Mevzuata Uyum"
              desc="Kurum türüne göre güncel yönetmelik ve standartlarla eşleştirilmiş kontrol listeleri."
            />
            <WhyCard
              title="Şeffaf Takip"
              desc="Hangi belge hangi aşamada, bir sonraki adım ne — yazılı ve görünür ilerleme."
            />
            <WhyCard
              title="Risk Azaltma"
              desc="Yanlış mekân veya eksik dosya kaynaklı gecikmeleri baştan filtreliyoruz."
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle title="Kurum Açma Süreci Hakkında" subtitle="Bilgilendirme ve danışmanlık yaklaşımımız." />
          <div className="mt-6 rounded-sm border border-border bg-white p-6 shadow-card">
            <RichText paragraphs={longform} />
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle title="Sık Sorulan Sorular" subtitle="Ön görüşme ve süreç planlamasıyla ilgili temel yanıtlar." />
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

function HeroStat({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-border bg-white p-3 shadow-card">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm font-semibold text-gray-900">{title}</p>
      </div>
      <p className="mt-1 text-xs leading-5 text-gray-700">{desc}</p>
    </div>
  );
}

function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-border bg-white p-5 shadow-card">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm leading-7 text-gray-700">{desc}</p>
    </div>
  );
}
