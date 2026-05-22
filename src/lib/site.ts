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
  emailMailto: "mailto:info@meboyunevi.com"
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
