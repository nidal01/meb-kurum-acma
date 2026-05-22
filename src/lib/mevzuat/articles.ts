export type MevzuatArticle = {
  id: string;
  madde: string;
  title: string;
  excerpt: string;
  sourceDocId: string;
  appliesTo: string[];
};

export const MEVZUAT_ARTICLES: MevzuatArticle[] = [
  {
    id: "oo-4-kurum-tanimi",
    madde: "m. 4 (g)",
    title: "Kurum kapsamı: özel eğitim ve rehabilitasyon merkezi",
    excerpt:
      "Yönetmelikte “kurum” tanımı; okul öncesi, ilkokul, ortaokul, özel eğitim okulları ile özel eğitim ve rehabilitasyon merkezleri, dil-konuşma ve ergoterapi merkezleri, rehberlik merkezleri ve benzeri özel öğretim kurumlarını kapsar. Kurum türü seçimi, başvuru evrak setinin omurgasını belirler.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: [
      "meb-kurum-acma-danismanligi",
      "ozel-egitim-rehabilitasyon-merkezi-acilisi",
      "dk-ergoterapi-merkezi-acilisi",
      "psikolojik-danismanlik-merkezi-kurulumu"
    ]
  },
  {
    id: "oo-5-belgeler",
    madde: "m. 5 (2)",
    title: "Kurum açma izni için istenen belgeler",
    excerpt:
      "Kurum açma izni ve iş yeri açma ruhsatı için form dilekçe (EK-1), kurucu şartlarına ilişkin beyan, tüzel kişi evrakları, kurucu temsilcisi yetki belgesi, yerleşim planı ve fotoğraflar, öğretim programı onayı (kurum türüne göre), yönetici ve personel çalışma izin tekliflerine dair beyan, tapu/kira belgeleri ve ilgili teknik-uygunluk evrakları istenir. OEEL için program onayı ve Özel Eğitim Kurumları Yönetmeliği kapsamındaki ekler birlikte hazırlanmalıdır.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["meb-kurum-acma-danismanligi", "ozel-egitim-rehabilitasyon-merkezi-acilisi"]
  },
  {
    id: "oo-6-inceleme-oeel",
    madde: "m. 6 (1)",
    title: "İnceleme: standartlar ve Özel Eğitim Kurumları Yönetmeliği",
    excerpt:
      "Başvuru; kurum türüne göre Genel Müdürlük internet sayfasında yayımlanan standartlara ve ilgili uzaklık düzenlemelerine uygunluk açısından incelenir. Özel eğitim okulunun özel eğitim ve rehabilitasyon birimi ile özel eğitim ve rehabilitasyon merkezlerinin açılışında, Özel Eğitim Kurumları Yönetmeliğinde belirtilen müracaat şartları da aranır. İnceleme raporu, görevlendirme tebliğinden itibaren en geç on beş iş günü içinde düzenlenir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi", "meb-kurum-acma-danismanligi"]
  },
  {
    id: "oo-6-ruhsat-sure",
    madde: "m. 6 (2)",
    title: "Ruhsat düzenleme süreleri",
    excerpt:
      "İnceleme raporunun uygun görülmesi ve güvenlik soruşturması sonucunun olumlu olması hâlinde, okul öncesi ve sosyal etkinlik merkezlerinde beş iş günü içinde ruhsat düzenlenmesi öngörülür. İlkokul, ortaokul, lise ve özel eğitim okullarında belgeler valilik görüşüyle Bakanlığa gönderilir. Diğer kurumlarda valilikçe uygun görülmesi hâlinde on beş iş günü içinde kurum açma izni ve iş yeri ruhsatı düzenlenir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["meb-kurum-acma-danismanligi", "ozel-egitim-rehabilitasyon-merkezi-acilisi"]
  },
  {
    id: "oo-11-oeel-bina",
    madde: "m. 11 (2) (c)",
    title: "OEEL bina şartı: müstakil kullanım ve bağımsız giriş",
    excerpt:
      "Özel eğitim ve rehabilitasyon merkezleri, kullanım hakkının tamamı kuruma ait müstakil binalarda açılır. Giriş katında ticari işletme bulunan binalarda, ticari bölümler dışındaki katların tamamını kapsayacak şekilde ve ticari bölümlerden ayrı bağımsız girişi olan yapılarda da merkez açılabilir. Mekân seçiminde erken keşif, bu maddeyle uyum kritiktir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi"]
  },
  {
    id: "oo-16-gecici-nakil",
    madde: "m. 16 (2)",
    title: "Geçici nakil: OEEL için bağımsız giriş",
    excerpt:
      "Geçici nakil izniyle bir yıl faaliyete devam edilebilir. Özel eğitim ve rehabilitasyon merkezleri için müstakil bina şartı aranmaz; ancak bağımsız giriş şartı aranır. Bir yıl sonunda şartlara uygun binaya nakil yapılmayan kurumlara, mazereti uygun görülürse bir yıl daha geçici izin verilebilir; aksi hâlde izin iptali gündeme gelir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi", "kurum-devir-islemleri"]
  },
  {
    id: "oo-16-nakil-sinir",
    madde: "m. 16 (3)",
    title: "Nakil sınırları",
    excerpt:
      "İller arasında kurum nakli yapılamaz. Özel eğitim ve rehabilitasyon birimi olan okullar ile özel eğitim ve rehabilitasyon merkezlerinin ilçeler arasında nakli genel olarak yapılamaz; Özel Eğitim Kurumları Yönetmeliği EK-1 tablosunda belirtilen aynı ilin ilçeleri arasında nakil istisnası uygulanabilir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi", "kurum-devir-islemleri"]
  },
  {
    id: "oo-17-yerlesim",
    madde: "m. 17",
    title: "Yerleşim ve kontenjan değişikliği",
    excerpt:
      "Kurucu veya kurucu temsilcisi; bina, blok veya kat ilavesiyle kontenjan veya yerleşim planında değişiklik için m. 5’te sayılan belgelerle kaymakamlık veya valiliğe başvurur. Değişen bölümler ve ortak kullanım alanları incelenir; kurum açılış bina şartlarına uygunluk görülürse on iş günü içinde izin verilir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi", "meb-kurum-acma-danismanligi"]
  },
  {
    id: "oo-10-erisilebilirlik",
    madde: "m. 10",
    title: "Engelli erişilebilirliği",
    excerpt:
      "Kurum binalarında engelli erişilebilirliği; TSE standartları ve Aile, Çalışma ve Sosyal Hizmetler Bakanlığının engelliler için belirlediği kat, merdiven ve yük taşıma şartlarına uygun olmalıdır. Zemin kat dışındaki kurumlarda, engelliler için ders ve hizmetlerin zemin katta verilmesi hâlinde üst katlar için erişim şartı aranmayabilir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["ozel-egitim-rehabilitasyon-merkezi-acilisi", "dk-ergoterapi-merkezi-acilisi"]
  },
  {
    id: "oo-cocuk-oyun-evi",
    madde: "m. 4 (ff)",
    title: "Çocuk etkinlik ve oyun evi tanımı",
    excerpt:
      "25–72 ay yaş grubundaki çocuklara sosyal, kültürel, sanatsal ve sportif alanlarda eğitim verilen, oyun yoluyla sosyalleşme ve günlük yaşam becerisi geliştirme imkânı sunulan özel öğretim kurumu olarak tanımlanır. Faaliyet tanımı ile günlük operasyonun örtüşmesi, ruhsat yolunun doğru seçilmesi için belirleyicidir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["cocuk-oyun-evi-acilis-danismanligi"]
  },
  {
    id: "oo-dk-ergo-tanim",
    madde: "m. 4 (çç)",
    title: "Dil, konuşma ve ergoterapi merkezi tanımı",
    excerpt:
      "Bireylerin iletişim becerileri, konuşma akıcılığı, çevreye uyumu ve toplumsal katılımının artırılması amacıyla dil-konuşma ve ergoterapi alanında bireysel ve grup eğitimi verilen özel öğretim kurumu olarak tanımlanır. OEEL ile karıştırılmaması için hizmet menüsü ve kadro unvanları netleştirilmelidir.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["dk-ergoterapi-merkezi-acilisi", "ozel-egitim-rehabilitasyon-merkezi-acilisi"]
  },
  {
    id: "oo-rehberlik-tanim",
    madde: "m. 4 (dd)",
    title: "Rehberlik ve psikolojik danışma merkezi tanımı",
    excerpt:
      "Bireylerin kendini tanıması, karar verme ve problem çözme becerilerinin geliştirilmesi ile psikolojik iyilik halinin artırılmasına yönelik bireysel ve/veya grupla profesyonel psikolojik destek sunulan kurum olarak tanımlanır. Hizmet kimliği ile pazarlama dili uyumlu olmalıdır.",
    sourceDocId: "ozel-ogretim-kurumlari-yonetmeligi",
    appliesTo: ["psikolojik-danismanlik-merkezi-kurulumu"]
  }
];

export function getArticlesForService(slug: string): MevzuatArticle[] {
  return MEVZUAT_ARTICLES.filter((a) => a.appliesTo.includes(slug));
}
