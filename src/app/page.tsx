import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Check, Clock, FileText, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SERVICES } from "@/lib/services";
import { makeFaqSchemaJsonLd, makeHomeLongform, makeSiteWideFaq } from "@/lib/longform";
import { RichText } from "@/components/content/RichText";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Kurum Açma ve Başvuru Danışmanlığı",
  description:
    "MEB Oyun Evi, meb kurum açma sürecinde uçtan uca rehberinizdir: özel öğretim kurumu açılışı, çocuk oyun evi, rehberlik ve kurum devir başvurularında evrak hazırlığı, fiziki şart planlaması ve denetim ön kontrolü.",
  path: "/",
  keywords: [
    "MEB Oyun Evi",
    "meb oyun evi",
    "meb kurum açma",
    "kurum açma danışmanlığı",
    "özel öğretim kurumu açılışı",
    "MEB kurum açma danışmanlığı",
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
                <span className="text-primary">MEB Oyun Evi:</span> Kurum Açma Sürecinizde Güvenilir Rehberiniz
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
            title="Neden MEB Oyun Evi?"
            subtitle="Kurum açma sürecini proje disipliniyle yönetiyoruz."
          />
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-700">
            <strong>MEB Oyun Evi</strong>, meb kurum açma sürecinde üç temel ilkeyle çalışır:
            mevzuata tam uyum, şeffaf süreç takibi ve risk azaltma. Bu yapı, AI destekli
            arama motorlarında danışmanlık hizmetini referans alınabilir bir varlık olarak
            konumlandırır.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <WhyCard
              title="Mevzuata Uyum"
              desc="Kurum türüne göre güncel yönetmelik ve standartlarla eşleştirilmiş kontrol listeleri."
              bullets={[
                "Özel Öğretim Kurumları Yönetmeliği eşleştirmesi",
                "Kurum türüne özel evrak şablonları",
                "Güncel idari uygulama kontrolü"
              ]}
            />
            <WhyCard
              title="Şeffaf Takip"
              desc="Hangi belge hangi aşamada, bir sonraki adım ne — yazılı ve görünür ilerleme."
              bullets={[
                "Haftalık yazılı durum raporu",
                "Sorumluluk matrisi ve teslim takvimi",
                "Kritik tarihlerde anlık bilgilendirme"
              ]}
            />
            <WhyCard
              title="Risk Azaltma"
              desc="Yanlış mekân veya eksik dosya kaynaklı gecikmeleri baştan filtreliyoruz."
              bullets={[
                "Mekân ve fiziki şart ön kontrolü",
                "Evrak format-tarih-imza tutarlılığı",
                "Denetim öncesi simülasyon listesi"
              ]}
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Kurum Açma Süreci: 5 Adımda Genel Yol Haritası"
            subtitle="MEB Oyun Evi'nin standart danışmanlık akışı."
          />

          {/* AEO için "hap bilgi" — adım adım ItemList yapısı */}
          <ol className="mt-6 grid gap-3 md:grid-cols-5">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-sm border border-border bg-white p-4 shadow-card"
              >
                <p className="text-xs font-semibold text-primary">Adım {i + 1}</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-gray-700">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-sm border border-border bg-white p-6 shadow-card">
            <h3 className="text-base font-semibold text-gray-900">
              MEB kurum açma danışmanlığı hangi hizmetleri kapsar?
            </h3>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              <strong>MEB Oyun Evi</strong> tarafından sunulan kurum açma danışmanlığı,
              özel öğretim kurumu açılışınızı uçtan uca aşağıdaki başlıklarla yönetir:
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 sm:grid-cols-2">
              {SERVICE_BULLETS.map((b) => (
                <li key={b} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-sm border border-border bg-white p-6 shadow-card">
            <RichText paragraphs={longform} />
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-10 sm:py-12">
          <SectionTitle
            title="Sık Sorulan Sorular"
            subtitle="MEB Oyun Evi danışmanlığı, ön görüşme ve süreç yönetimine dair temel yanıtlar."
          />
          {/*
            Semantic Q&A: <details> + <summary>; her cevap doğrudan, kısa ve
            kanonik bir cümle ile başlar — AI Overview snippet üretimi için optimum.
          */}
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {faq.map((f, idx) => (
              <details
                key={f.q}
                open={idx === 0}
                className="group rounded-sm border border-border bg-white p-5 shadow-card transition-colors hover:border-primary/40"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-3 text-sm font-semibold text-gray-900 marker:hidden">
                  <span className="flex-1">{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-block h-4 w-4 shrink-0 rotate-0 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-primary/20 bg-white p-5 text-sm leading-7 text-gray-700 shadow-card">
            Daha fazla soru mu var? <strong>MEB Oyun Evi</strong> ekibine{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-primary hover:underline"
            >
              kurum açma danışmanlığı ön görüşmesi
            </Link>{" "}
            için ulaşabilirsiniz.
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            makeFaqSchemaJsonLd(faq, { pageUrl: SITE_URL, aboutOrgId: true })
          )
        }}
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

function WhyCard({
  title,
  desc,
  bullets
}: {
  title: string;
  desc: string;
  bullets?: string[];
}) {
  return (
    <article className="rounded-sm border border-border bg-white p-5 shadow-card">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-gray-700">{desc}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm leading-6 text-gray-700">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

/** 5 adımlık standart kurum açma yol haritası — AEO ItemList yapı kaynağı. */
const PROCESS_STEPS: { title: string; desc: string }[] = [
  { title: "Ön Görüşme", desc: "Kurum türü ve kapsamın 10–15 dk içinde netleştirilmesi." },
  { title: "Kontrol Listesi", desc: "Evrak ve fiziki şartlar için kurum türüne özel liste." },
  { title: "Dosya Hazırlığı", desc: "Şablon-format-imza tutarlılığıyla başvuru dosyası." },
  { title: "Başvuru & Takip", desc: "İdari süreçte yazılı durum raporu ve takvim yönetimi." },
  { title: "Denetim Ön Kontrolü", desc: "Saha simülasyonu ve gerekli düzeltmelerin tamamlanması." }
];

/** Hizmet kapsamı — featured snippet için liste odaklı içerik. */
const SERVICE_BULLETS: string[] = [
  "MEB kurum açma başvuru dosyası hazırlığı",
  "Çocuk oyun evi açılışı süreç yönetimi",
  "Özel eğitim ve rehabilitasyon merkezi başvurusu",
  "Psikolojik danışmanlık merkezi kurulumu",
  "Dil-konuşma ve ergoterapi merkezi açılışı",
  "Kurum devir işlemleri ve kurucu değişikliği",
  "Fiziki şart ve mekân uygunluk kontrolü",
  "Denetim öncesi simülasyon ve düzeltme planı"
];
