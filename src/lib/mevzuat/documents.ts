export type MevzuatDocument = {
  id: string;
  title: string;
  shortTitle: string;
  summary: string;
  pdfPath?: string;
  rgNote?: string;
  relatedNote?: string;
};

/** Sitede gömülü ana mevzuat: Özel Öğretim Kurumları Yönetmeliği (kullanıcının paylaştığı PDF). */
export const OZEL_OGRETIM_KURUMLARI_YONETMELIGI: MevzuatDocument = {
  id: "ozel-ogretim-kurumlari-yonetmeligi",
  title: "Millî Eğitim Bakanlığı Özel Öğretim Kurumları Yönetmeliği",
  shortTitle: "Özel Öğretim Kurumları Yönetmeliği",
  summary:
    "Özel öğretim kurumlarının açılış, işleyiş, nakil, devir ve kapatma usullerini düzenler. Özel eğitim okulları ile özel eğitim ve rehabilitasyon merkezleri bu çerçevede tanımlanır; OEEL açılışlarında ek olarak Özel Eğitim Kurumları Yönetmeliği şartları da aranır.",
  pdfPath: "/docs/ozel-ogretim-kurumlari-yonetmeligi.pdf",
  rgNote: "Güncel metin için Resmî Gazete yayımları esas alınmalıdır.",
  relatedNote:
    "Özel eğitim ve rehabilitasyon merkezi açılışlarında, 18/5/2012 tarihli ve 28296 sayılı RG’de yayımlanan Millî Eğitim Bakanlığı Özel Eğitim Kurumları Yönetmeliği müracaat şartları da birlikte değerlendirilir (Özel Öğretim Kurumları Yönetmeliği m. 6)."
};

export const OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF: MevzuatDocument = {
  id: "ozel-egitim-kurumlari-yonetmeligi",
  title: "Millî Eğitim Bakanlığı Özel Eğitim Kurumları Yönetmeliği",
  shortTitle: "Özel Eğitim Kurumları Yönetmeliği",
  summary:
    "Özel eğitim okulları, özel eğitim ve rehabilitasyon birimleri ile özel eğitim ve rehabilitasyon merkezlerinin fiziki şart, personel, program ve müracaat esaslarını ayrıntılandırır. OEEL başvurularında Özel Öğretim Kurumları Yönetmeliği ile birlikte uygulanır.",
  rgNote: "RG: 18/5/2012, sayı 28296 — güncel ek ve değişiklikler için Resmî Gazete kontrol edilmelidir."
};

export const MEVZUAT_DOCUMENTS: MevzuatDocument[] = [
  OZEL_OGRETIM_KURUMLARI_YONETMELIGI,
  OZEL_EGITIM_KURUMLARI_YONETMELIGI_REF
];
