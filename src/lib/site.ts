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
  phoneDisplay: "+90 216 599 0159",
  phoneTel: "+902165990159",
  email: "info@meboyunevi.com",
  emailMailto: "mailto:info@meboyunevi.com",
  address: "Örnek Mah. Resmî Cad. No: 12, Kat: 3, Merkez / İstanbul",
  addressParts: {
    streetAddress: "Örnek Mah. Resmî Cad. No: 12, Kat: 3",
    addressLocality: "Merkez",
    addressRegion: "İstanbul",
    postalCode: "34000",
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

export const SITE_MAPS = {
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5782564849114!2d29.093629776321997!3d40.990714971352965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac62d95cc2533%3A0x58440b9e3cf1f51f!2sBaby%20Sensory!5e0!3m2!1str!2str!4v1780234338008!5m2!1str!2str",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=Barbaros%2C+Millet+Cd.+56%2FA%2C+34746+Ata%C5%9Fehir%2F%C4%B0stanbul"
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
