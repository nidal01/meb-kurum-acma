/** Site genelinde kullanılan kurumsal ve iletişim bilgileri */
export const META_TITLE_PREFIX = "T.C. Millî Eğitim Bakanlığı";
export const SITE_NAME = "MEB Kurum Açma Danışmanlığı";
export const SITE_NAME_SHORT = "MEB Kurum Açma";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://meboyunevi.com";

export const SITE_CONTACT = {
  phoneDisplay: "+90 (216) 599 0159",
  phoneTel: "+902165990159",
  email: "info@meboyunevi.com",
  emailMailto: "mailto:info@meboyunevi.com",
  address: "Barbaros, Millet Cd. 56/A, 34746 Ataşehir/İstanbul"
} as const;

export const SITE_CONSULTANT = {
  name: "Duygu Pekel",
  title: "Kurum Açma Danışmanınız",
  subtitle: "MEB mevzuatına uygun süreç yönetimi",
  bio: "Uzm. Psk. Dan. Duygu Pekel Göksel; bebek ve çocuk gelişimi, gelişimsel bozukluklar, oyun terapisi ve aile danışmanlığı alanlarında uzmanlaşmış bir gelişim psikoloğu ve psikolojik danışmandır.",
  imageUrl: "https://babysensoryturkey.com/wp-content/uploads/2026/01/Adsiz-tasarim-15.png",
  imageAlt: "Duygu Pekel — Kurum açma danışmanı"
} as const;

export const SITE_MAPS = {
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5782564849114!2d29.093629776321997!3d40.990714971352965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac62d95cc2533%3A0x58440b9e3cf1f51f!2sBaby%20Sensory!5e0!3m2!1str!2str!4v1780234338008!5m2!1str!2str",
  openUrl:
    "https://www.google.com/maps/search/?api=1&query=Barbaros%2C+Millet+Cd.+56%2FA%2C+34746+Ata%C5%9Fehir%2F%C4%B0stanbul"
} as const;

export const SITE_ASSETS = {
  logo: "/images/logo-kurum-acma.png",
  logoAlt: "Özel Öğretim Kurumları Kuruluş ve Açılış Danışmanlığı",
  ministryTitle: "T.C. Millî Eğitim Bakanlığı",
  favicon: "https://www.meb.gov.tr/assets/img/favicon.ico",
  ogImage: "/images/logo-kurum-acma.png",
  ogImageWidth: 170,
  ogImageHeight: 56,
  locale: "tr_TR"
} as const;

export const SITE_DEFAULT_DESCRIPTION =
  "MEB mevzuatına uygun özel öğretim kurumu açılış danışmanlığı: evrak dosyası, fiziki şartlar, başvuru takibi ve denetim hazırlığı. Özel eğitim, oyun evi, rehberlik ve devir süreçleri.";

export const SITE_KEYWORDS = [
  "MEB kurum açma danışmanlığı",
  "özel öğretim kurumu açmak",
  "kurum açma evrakları",
  "özel eğitim rehabilitasyon merkezi",
  "çocuk oyun evi açılışı",
  "psikolojik danışmanlık merkezi kurulumu",
  "dil konuşma ergoterapi merkezi",
  "kurum devir işlemleri",
  "denetim hazırlığı",
  "MEB yönetmelik"
] as const;
