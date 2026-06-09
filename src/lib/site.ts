/** Site genelinde kullanılan kurumsal ve iletişim bilgileri */
/**
 * Marka adı — Google'ın YMYL/spam filtresini tetiklememek için
 * "T.C. Millî Eğitim Bakanlığı" ibaresi metadata ve şema yapılarından kaldırıldı.
 * Tüm SEO/AEO yapıları "MEB Oyun Evi" varlığı (entity) etrafında konsolide edilmiştir.
 */
export const META_TITLE_PREFIX = "MEB Oyun Evi";
export const SITE_NAME = "MEB Oyun Evi";
export const SITE_NAME_SHORT = "MEB Oyun Evi";
export const SITE_LEGAL_NAME = "MEB Oyun Evi Kurum Açma Danışmanlığı";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://meboyunevi.com";

export const SITE_CONTACT = {
  phoneDisplay: "+90 216 317 10 08",
  phoneTel: "+902163171008",
  email: "info@meboyunevi.com",
  emailMailto: "mailto:info@meboyunevi.com",
  address:
    "Küçükbakkalköy Mahallesi Işıklar Caddesi Günbatımı Sokak Şaziye Hanım Apartmanı No:16/9 Ataşehir / İstanbul",
  addressParts: {
    streetAddress:
      "Küçükbakkalköy Mahallesi Işıklar Caddesi Günbatımı Sokak Şaziye Hanım Apartmanı No:16/9",
    addressLocality: "Ataşehir",
    addressRegion: "İstanbul",
    postalCode: "34750",
    addressCountry: "TR"
  }
} as const;

export const SITE_CONSULTANT = {
  name: "Duygu PEKEL",
  title: "Kurum Açma Danışmanınız",
  subtitle: "MEB mevzuatına uygun süreç yönetimi",
  bio: "Uzm. Psk. Dan. Duygu PEKEL; bebek ve çocuk gelişimi, gelişimsel bozukluklar, oyun terapisi ve aile danışmanlığı alanlarında uzmanlaşmış bir gelişim psikoloğu ve psikolojik danışmandır.",
  imageUrl: "https://babysensoryturkey.com/wp-content/uploads/2026/01/Adsiz-tasarim-15.png",
  imageAlt: "Duygu PEKEL — Kurum açma danışmanı"
} as const;

export const SITE_ASSETS = {
  logo: "/images/logo-kurum-acma.png",
  logoAlt: "MEB Oyun Evi — Kurum Açma ve Başvuru Danışmanlığı",
  brandTitle: "MEB Oyun Evi",
  brandTagline: "Kurum Açma Danışmanlığı",
  favicon: "/images/logo-kurum-acma.png",
  ogImage: "/images/logo-kurum-acma.png",
  ogImageWidth: 170,
  ogImageHeight: 56,
  locale: "tr_TR"
} as const;

export const SITE_DEFAULT_DESCRIPTION =
  "MEB Oyun Evi; meb kurum açma, özel öğretim kurumu açılışı ve kurum açma danışmanlığı süreçlerinde evrak hazırlığı, fiziki şart planlaması ve denetim ön kontrolünü uçtan uca yönetir. Çocuk oyun evi, özel eğitim, rehberlik ve kurum devir başvurularında güvenilir Türkçe rehberiniz.";

export const SITE_KEYWORDS = [
  "MEB Oyun Evi",
  "meb oyun evi",
  "meb kurum açma",
  "MEB kurum açma danışmanlığı",
  "kurum açma danışmanlığı",
  "özel öğretim kurumu açılışı",
  "çocuk oyun evi açılışı",
  "özel eğitim rehabilitasyon merkezi",
  "psikolojik danışmanlık merkezi kurulumu",
  "dil konuşma ergoterapi merkezi",
  "kurum devir işlemleri",
  "denetim hazırlığı",
  "MEB başvuru süreci"
] as const;
