import {
  Accessibility,
  Building2,
  HeartHandshake,
  Languages,
  Puzzle,
  RefreshCw,
  School
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type FaqItem = { q: string; a: string };
export type GuideSection = { id: string; title: string; paragraphs: string[] };

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  details: {
    kapsam: string;
    surec: string[];
    belgeler: string[];
  };
  guide: {
    lead: string;
    sections: GuideSection[];
  };
  faq: FaqItem[];
};

export const SERVICES: Service[] = [
  {
    slug: "meb-kurum-acma-danismanligi",
    title: "MEB Kurum Açma Danışmanlığı",
    summary:
      "Özel öğretim kurumu açılışında kurum türü doğrulaması, fiziki şartların denetime hazır planlanması, evrak bütünlüğü ve başvuru takibiyle süreci tek çatı altında yönetmek.",
    icon: School,
    seo: {
      metaTitle:
        "MEB Kurum Açma Danışmanlığı | Özel Öğretim Kurumu Açılış, Evrak ve Denetim Hazırlığı Rehberi",
      metaDescription:
        "MEB kurum açma sürecinde kurum türü analizi, standartlara uygun mekân planı, evrak dosyası ve denetim ön kontrol. Başvuru takibi ve risk azaltma odaklı danışmanlık.",
      keywords: [
        "MEB kurum açma danışmanlığı",
        "özel öğretim kurumu açmak",
        "MEB başvuru dosyası",
        "kurum açma evrakları",
        "Standartlar Yönergesi bilgilendirme",
        "kurucu kurucu temsilcisi şartları",
        "MEBBİS süreçleri bilgilendirme",
        "müfettiş incelemesi hazırlığı",
        "kiralık bina ile kurum açmak",
        "deprem ve yangın uygunluk süreçleri bilgilendirme",
        "kurum açma süresi planlama",
        "danışmanlık ile ruhsat süreci yönetimi",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Ön görüşmede açılacak kurum türü, hedef il/ilçe, mekânın mevcut durumu ve hedef tarih netleştirilir. Kurum türüne göre kurucu ve kurucu temsilcisi yeterlilikleri, fiziki şartlar ve evrak seti ayrı ayrı kontrol listesine dökülür. Mimari yerleşim, teknik raporların sırası ve başvuru dosyasının tutarlılığı aynı takvimde yönetilir; denetim beklentisi baştan içeriden okunur.",
      surec: [
        "Ön değerlendirme: kurum türü, faaliyet kapsamı ve mekân ön bilgisi",
        "Mevzuat ve fiziki şartların kurum türüne göre eşlemesi",
        "Keşif veya mekân dokümanları üzerinden uygunluk taraması",
        "Yerleşim planı ve teknik rapor süreçlerinin sıraya bağlanması",
        "Evrak tasnifi, dosya standardı ve eksiklerin önceliklendirilmesi",
        "İl/ilçe millî eğitim başvuru takibi ve geri bildirim yönetimi",
        "Denetim öncesi kontrol, düzeltme listesi ve son teyit"
      ],
      belgeler: [
        "Kurucu ve kurucu temsilcisine ilişkin kimlik, adli sicil/ilgili beyanlar ve diploma/unvan evrakları (kurum türüne göre)",
        "Tüzel kişi kuruluşunda ticaret sicili, ana sözleşme ve faaliyet konusuna ilişkin belgeler",
        "Mekân tapu veya kira, kullanım izni ve yapı kullanma belgeleri (sürece göre)",
        "Mimari yerleşim, vaziyet ve ilgili teknik çizimler",
        "Deprem dayanıklılık ve yapı güvenliğine ilişkin raporlar (istenmesi hâlinde)",
        "İtfaiye ve yangın güvenliği uygunlukları ve ilgili başvurular",
        "Sağlık/hijyen uygunluğuna ilişkin süreç belgeleri (istenmesi hâlinde)",
        "Personel ve atama evrakları (kurum türüne ve kadro planına göre)",
        "Vergi, SGK ve işyeri bildirimleri (uygulanabilir kapsamda)"
      ]
    },
    guide: {
      lead:
        "Özel öğretim kurumu açmak; yalnızca dilekçe ve birkaç belgeyle sınırlı bir işlem değildir. Süreç; kurum türünün doğru seçilmesi, mekânın hem teknik hem de eğitim işleyişine uygun kurgulanması ve evrakların tek bir hikâyeyi anlatması gerektirir. Bir belgedeki tarih uyumsuzluğu veya yerleşim planındaki bir tutarsızlık, aylar süren geri dönüşlere yol açabilir. Bu rehberde, MEB kurum açma danışmanlığında sık karşılaştığımız riskleri ve doğru sırayı anlatıyoruz. Buradaki bilgiler bilgilendirme amaçlıdır; güncel mevzuat ve il uygulamaları projenize göre ayrıca değerlendirilir.",
      sections: [
        {
          id: "neden-danismanlik",
          title: "Neden Profesyonel Danışmanlık? Sıfırdan Dosya Hazırlamak Yetmez",
          paragraphs: [
            "Pek çok başvuru sahibi “ben belgeleri toplarım” diyerek başlar ve ilk geri dönüşte şaşırır. Sorun genelde eksik belge değil, belgelerin birbirini desteklememesi ve kurum türü ile mekânın hikâyesinin örtüşmemesidir.",
            "Danışmanlık, takvim kurmak ve kontrol listesi vermekten ibaret değildir; riski erkenden görmek ve düzeltme maliyetini düşürmektir. Özellikle yanlış seçilmiş bir bina veya yanlış planlanmış oda düzeni, telafisi yüksek kara düşürür.",
            "Biz yaklaşımımızı şu üç soruda özetleriz: hangi kurum türü, hangi mekân, hangi evrak hikâyesi—üçü aynı dosyada tutarlı mı? Tutarlılık sağlandığında süreç öngörülebilir hale gelir."
          ]
        },
        {
          id: "kurum-turu-ilk-karar",
          title: "Kurum Türünü Yanlış Seçmek En Pahalı Hatadır",
          paragraphs: [
            "Aynı sektörde bile “kurs”, “rehabilitasyon merkezi”, “etkinlik merkezi” gibi farklı çerçeveler farklı fiziki ve personel beklentileri doğurur. Kurum türü, yalnızca tabelada yazacak isim değildir; evrak setinin omurgasıdır.",
            "Ön görüşmede hedef öğrenci profili, program süresi, mekân büyüklüğü ve işletme modeli netleşmeden evrak hazırlamaya girişmek, dosyayı baştan zayıflatır.",
            "Doğru kurum türü seçildiğinde; hangi odaların şartlı olduğu, hangi raporların istenebileceği ve kadro planının nasıl kurulacağı da netleşir."
          ]
        },
        {
          id: "kurucu-yeterlilik",
          title: "Kurucu ve Kurucu Temsilcisi: Şartlar Pratikte Dosyayı Belirler",
          paragraphs: [
            "Kurucu/kurucu temsilcisinin eğitim ve unvan beklentisi kurum türüne göre değişir. Dosyada sunulan diploma ile başvuruda beyan edilen görev ilişkisinin örtüşmesi kritiktir.",
            "Tüzel kişi başvurularında ana sözleşmede faaliyet konusunun eğitimle uyumu, sık gözden kaçan ama açılışı kilitleyen bir ayrıntı olabilir.",
            "Bu başlıklar “sonradan halledilir” denirse, sıkça revizyon ve zaman kaybı oluşur. Danışmanlıkta bu aşamayı evrak hazırlığından önce kilitlemeyi hedefleriz."
          ]
        },
        {
          id: "mekan-ve-fiziki",
          title: "Mekân Seçimi: Tapu Metrekareyle Biter Sandığınız Yer Başlar",
          paragraphs: [
            "İyi bir kurum mekânı; yalnızca geniş değil, bağımsız kullanım, sirkülasyon, asansör/rampa ihtiyacı ve acil çıkış mantığıyla uyumludur. Kurum türüne göre derslik, idari oda, rehberlik alanı ve tuvalet düzeni ayrı ayrı ele alınmalıdır.",
            "Kiralık mekânlarda kira süresi, mal sahibi muvafakati ve Y yapı kullanma belgesi gibi konular başvurunun sürdürülebilirliği için önemlidir. İskânsız veya kullanımı tartışmalı mekânlarda süreç riske girer.",
            "Erken keşif veya doküman incelemesiyle “bu bina bu kurum türü için uygun mu?” sorusuna cevap aramak, tadilat maliyetini kontrol eder."
          ]
        },
        {
          id: "teknik-raporlar",
          title: "Yerleşim Planı ve Teknik Raporlar: Sırası Bozulunca Takvim Çöker",
          paragraphs: [
            "Mimari yerleşim, yönergede aranan oda ve koridor mantığına uygun çizildiğinde başvuru dosyası güçlenir. Sonradan çizilen bir plan, önceki beyanlarla çelişiyorsa dosya güvenilirliği zedelenir.",
            "Deprem dayanıklılık, yangın ve sağlık/hijyen başlıkları proje bazında istenebilir. Bu raporların sırası ve mekân hazırlığı bazen birbirini bekler; planlama yapılmadan paralel yürütülürse boşta beklenen haftalar oluşur.",
            "Danışmanlıkta paydaş sırasını ve bağımlılıkları yazılı bir takvime bağlamak, en sık yaşanan gecikmeyi azaltır."
          ]
        },
        {
          id: "evrak-butunlugu",
          title: "Evrak Bütünlüğü: İmza ve Tarih Disiplini Bile Kırılabilir",
          paragraphs: [
            "Başvuru dosyasında her belge ayrı dosya gibi değerlendirilmemelidir; hepsi aynı kurum hikâyesini anlatmalıdır. Özellikle şirket unvanı, adres, tarih ve imza zinciri gibi alanlarda tutarlılık şarttır.",
            "Dijital kopya ile asıl belge, dilekçe ile ekler arasında format uyumsuzluğu sık geri dönüş sebebidir. Dosya isimlendirme ve sıralama standardı kurulduğunda iletişim hızlanır.",
            "Bu disiplin, yalnızca başvuru aşamasında değil; sonraki güncellemelerde de kurumunuzu yönetilebilir kılar."
          ]
        },
        {
          id: "mebbis-ve-basvuru",
          title: "Başvuru Kanalı ve Takip: Dosya Teslim Ettim Bitmedi",
          paragraphs: [
            "Başvuru sonrası süreç, bazen ek sorular, revizyon istekleri ve saha incelemesi ile devam eder. Bu aşamada yazılı takip ve hızlı cevap disiplini gecikmeyi azaltır.",
            "Geri dönüşlerin anlamını doğru okumak ve hangi belgenin nasıl düzeltileceğini planlamak uzmanlık ister. “Tekrar gönderelim” demek yerine kök nedeni kapatmak gerekir.",
            "Biz bu aşamada aksiyonları sorumluluk ve tarih ile kayda bağlarız; böylece süreç tek kişinin e-posta kutusuna sıkışmaz."
          ]
        },
        {
          id: "denetim-hazirlik",
          title: "Denetim Hazırlığı: Son Haftanın Kahramanlığı Genelde Pahalıya Çıkar",
          paragraphs: [
            "Denetim, yalnızca duvarları ölçmek değildir; işleyişin ve dosyanın beklenen standartla örtüşüp örtüşmediğinin kontrolüdür. Son günlere bırakılan fiziki düzeltmeler maliyeti şişirir.",
            "Ön kontrol yaklaşımında; mekân, ekipman, personel kayıtları ve kurum içi düzen birlikte ele alınır. Eksik görülen yerler için önceliklendirilmiş düzeltme listesi çıkarılır.",
            "Amaç yalnızca “geçmek” değil, sürdürülebilir bir kurum işletmek olduğundan hazırlık da buna göre kurgulanır."
          ]
        },
        {
          id: "kirada-acilis",
          title: "Kiralık Binada Kurum Açmak: Mümkün Ama Erken Filtre Şart",
          paragraphs: [
            "Kiralık mekânda kurum açmak yaygındır; ancak kira uzunluğu, tahliye riski ve yapı belgelerinin eksiksizliği erken sorulmalıdır. Mal sahibi beyanları ve kullanım hakkı sınırları netleştirilmede başvuru sonrası sürprizler azalır.",
            "Kira sözleşmesi ile başvuru dosyasındaki adres ve kullanım biçiminin uyumu kontrol edilmelidir.",
            "Danışmanlıkta kira öncesi kısa bir uygunluk notu çıkarmak, yanlış yatırım riskini azaltır."
          ]
        },
        {
          id: "sonuc-cagri",
          title: "Sonuç: Kurumsal Açılış, Kişisel İkna Değil Dosya Güvenilirliği",
          paragraphs: [
            "MEB kurum açma danışmanlığında hedeflediğimiz şey, başvurunuzun güvenilir bir dosya olarak okunmasıdır. Güvenilir dosya; tutarlı hikâye, doğru sıra ve görünür takip demektir.",
            "Web sitemizdeki içerikler bilgilendirme amaçlıdır; nihai gereklilikler güncel mevzuat ve yerel uygulama ile değişebilir. Ön değerlendirme ile kapsamınızı netleştirmenizi öneririz.",
            "Siz kurum türünüzü ve hedef tarihinizi paylaştığınızda, biz de riskleri sıralayıp yol haritasını beraber yazıyoruz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "MEB kurum açma danışmanlığı hangi adımları kapsar?",
        a: "Kurum türü doğrulama, mekân uygunluk analizi veya doküman incelemesi, evrak listesi ve dosya standardı, teknik rapor sırasının planlanması, başvuru takibi ve denetim ön kontrol başlıklarını kapsar. Kapsam; hazırlık seviyenize göre özelleştirilir."
      },
      {
        q: "Kurum açma süreci ortalama ne kadar sürer?",
        a: "Mekânın durumu, tadilat ihtiyacı ve teknik raporların tamamlanma süresi değişkenlik gösterir. Evrak seti hazır ve mekân uygun olduğunda idari başvuru aşaması için daha öngörülebilir bir zaman çizelgesi çıkarılabilir; net süre ön inceleme sonrası verilir."
      },
      {
        q: "Hangi hatalar süreci en çok uzatır?",
        a: "Yanlış kurum türüyle başlamak, mekân seçimini evraktan önce doğrulamamak ve denetim hazırlığını son ana bırakmak en yaygın uzama sebepleridir."
      },
      {
        q: "Danışmanlık resmî başvuruyu benim yerime yapar mı?",
        a: "Nihai başvuru ve imza yetkisi başvuru sahibindedir. Biz; dosyayı hazırlama, standartlaştırma, takvim ve kontrol listesiyle yönlendirme sağlarız."
      },
      {
        q: "Kiralık binada açılış mümkün mü?",
        a: "Evet, birçok kurum kiralık mekânda açılır. Kira süresi, kullanım hakkı ve yapı belgeleri sürece göre değerlendirilmelidir."
      },
      {
        q: "Teknik raporlar her kurum için aynı mıdır?",
        a: "Hayır. Mekânın niteliği, kat durumu ve kurum türüne göre talep seti değişebilir. Bu yüzden erken planlama önemlidir."
      },
      {
        q: "Ön görüşmede hangi bilgileri hazırlamalıyım?",
        a: "Hedef kurum türü, il/ilçe, mekânın kira/tapu durumu, mevcut tadilat bilgisi, hedef açılış tarihi ve kadro planı özeti yeterli bir başlangıçtır."
      },
      {
        q: "Başarı garantisi veriyor musunuz?",
        a: "Hayır. Resmî süreçler yetkili idare ve denetim kararlarına bağlıdır. Biz riskleri azaltan metod ve kontrol sunarız."
      }
    ]
  },
  {
    slug: "cocuk-oyun-evi-acilis-danismanligi",
    title: "Çocuk Oyun Evi Açılış Danışmanlığı",
    summary:
      "Çocuk oyun evi ve benzeri erken yaş etkinlik alanlarında faaliyet tanımından ruhsata kadar doğru başvuru yolunun seçimi, mekân-fiziki koşulların değerlendirilmesi ve evrakların tutarlı biçimde hazırlanması tek bir süreçtir.",
    icon: Puzzle,
    seo: {
      metaTitle:
        "Çocuk Oyun Evi Açılış Danışmanlığı | MEB, ASHB ve Belediye Ruhsat Süreçleri Rehberi",
      metaDescription:
        "Çocuk oyun evi ve oyun grubu açılışında faaliyet tipine göre ruhsat yolu, fiziki şartlar, evrak paketi ve idari uyum için uçtan uca danışmanlık.",
      keywords: [
        "çocuk oyun evi açılış danışmanlığı",
        "oyun evi ruhsatı",
        "oyun grubu açılışı",
        "MEB anaokulu ile kreş farkı",
        "ASHB gündüz bakımevi",
        "belediye işyeri açma ruhsatı",
        "çocuk bakım tesisi uygunluğu",
        "özel öğretim kurumları standartlar yönergesi bilgilendirme",
        "eğitime kayan faaliyet riski",
        "itfaiye ve yapı uygunluğu süreçleri",
        "kiralık mekânla çocuk oyun evi",
        "çocuk alanı güvenlik ve hijyen işletme planı",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "İlk görüşmede konseptinizi ( yaş aralığı, süre/kapasite, partı formatı içeriyor mu, düzenli gün içi bakım var mı, atölye veya akademik içerik kurgusu var mı ) netler; bunun üzerinden faaliyetin hangi hukuki zeminde değerlendirilebileceğini çerçevelendiririz. Ardından mekân seçimi için ön uygunluk check-list’i çıkarılır; gerekirse mimari yerleşim ve yangın/acil çıkış gibi kritik hususları plan aşamasında tarafınıza yükseltiririz. Evrak seti oluşturma, sıralama ve uyum öncesi iyileştirme adımlarını zaman çizelgesine bağlayarak süreci tek merkezden yönetiriz.",
      surec: [
        "Ön görüşme: faaliyet modeli ve riskli alanların (bakım süresi, eğitim iddiası, beslenme-uyku, kapasite) hızlı tespiti",
        "Ruhsat yolu haritası: MEB, ASHB, belediye ve diğer idari gereksinimleri birlikte sıralama",
        "Mekân keşfi ve uygunluk özeti (akış planı + kritik uyarılar)",
        "Fiziki düzen önerisi: güvenlik, görünür veli beklemesi, oyun alanı bölümleri ve risk azaltma",
        "Evrak ve başvuru planı ile paydaş sırası (kira/tapu, uygunluklar, bildirimler)",
        "Açılış öncesi denetlenebilirlik kontrolü ve düzeltme listesi",
        "Açılış sonrası kısa uyum özeti ile kayıt ve işleyiş ilkelerinin netleştirilmesi"
      ],
      belgeler: [
        "Şirket veya işletme tüzel yapısı belgeleri (faaliyet konusu ile uyumlu)",
        "Mekân kira ya da kullanım hakkına ilişkin belgeler, tapu ve yapı kullanma ile ilgili belgeler (sürece göre talep)",
        "Belediye işyeri açma ve çalışma ruhsatına yönelik başvuru evrakları",
        "Yangın çıkış ve acil durum yaklaşımını destekleyen plan ve güvenlik notları (işletme profiline göre)",
        "Temizlik-dezenfeksiyon rutini için düzen özeti ile hijyen yaklaşımı",
        "Personel özgeçmiş, sağlık ve görev tanımları (modelin gerektirdiği kapsama göre)",
        "Kimlik bildirimi, zorunlu eğitim ve iş güvenliği kayıtlarına yönelik şablon ve kontroller",
        "Veli iletişimi, fotoğraf-paylaşım ve KVK açısından temel uyum taslağı (ihtiyaç olduğunda genişletilir)"
      ]
    },
    guide: {
      lead:
        "Çocuk oyun evleri pazar olarak hızlı büyürken günlük işletmenin sırrını bir cümleye sığdırmak zordur çünkü asıl mesele oyuncaktan fazlasıdır. Asıl kritik süreç, \"burada gerçekte ne yapıyoruz\" sorusuna verdiğiniz cevaba göre resmî olarak hangi zeminde görüleceğinizdir. Parti ve kısa süreli aktivite ile gün boyu süren bakım, beslenme veya müfredata yakın akademik içerik aynı tabela önünde bile farklı yükümlülükleri beraberinde getirebilir. Bu yüzden en iyi yaklaşım, romantik bir sloganla değil; faaliyet tanımına dayalı net bir hukuki ve fiziki tasarımla başlamaktır. Bu rehber, oyun evi açılış danışmanlığında izlediğimiz kurguyu şeffaf şekilde anlatır ve yatırımınızı geciktiren ama sonra pahalıya patlayan kararları erkenden filtreden geçirir.",
      sections: [
        {
          id: "oyun-evi-baglami",
          title: "Çocuk Oyun Evi Nedir ve Neden Her Model Aynı Değildir?",
          paragraphs: [
            "Genel kullanımda oyun evi, oyun grubu, etkinlik alanı ya da parti evi birbirinin yerine geçer; fakat başvuru ve denetlenebilirlik açısından fark yaratan şey tabeladaki isimden çok günlük operasyondur. Kısa süreli doğum günü etkinlikleri ile haftanın büyük kısmında çocukların bırakıldığı düzenli bir alan farklı risk profillerine sahiptir. Bu profil değişince; mekânda beklenen hijyen düzeyi, personel görevleri, kayıt tutma ihtiyacı ve çocuk güvenliği beklentisi de değişir.",
            "Danışmanlıkta ilk adımımız konsepti sektör jargonuyla değil \"süre, yoğunluk, yaş aralığı ve ebeveyn beklentisi\" üzerinden okumaktır. Örneğin yalnızca hafta sonu parti odaklı bir modelde sirkülasyon ve bekleme alanı daha belirgin hale gelir; gün içi yoğun bir modelde ise dinlenme alanı, el yıkama erişimi ve hijyen rutinleri ön plana çıkar. Bu ayrım, hem tahmini yatırım maliyetini hem de idari yükümlülük setini etkiler.",
            "Unutulmaması gereken bir diğer gerçek de şudur: çocukları ağırlayan her mekân ziyaretçi tarafından \"güvenli ve hijyenik\" addedilir. Denetim veya şikâyet senaryolarında idare, bu beklentiyi objektif kriterlere indirgemek ister. Bu nedenle düzen; rastgele malzeme yığınından ziyade, kontrol edilebilir ve açıklanabilir bir sistem olmalıdır."
          ]
        },
        {
          id: "hukuki-cerceve",
          title: "MEB Anaokulu, ASHB Kayıtlı Tesisler ve Belediye Ruhsatı Üçgeni",
          paragraphs: [
            "Türkiye’de erken yaş hizmetleri birkaç farklı mevzuat çatısında ele alınabilir. MEB nezdinde tanımlı anaokulu veya benzeri özel öğretim kurumu modelleri ile Aile ve Sosyal Hizmetler Bakanlığı çatısında yürütülen çocuk hizmetleri kayıtlı tesis modelleri farklı yaş aralıkları ve farklı idari süreçlerle ilişkilidir. Belediye tarafında ise işyeri açma ve çalışma ruhsatı gibi genel yerel yönetim süreçleri devreye girer. Bu üç başlık pratikte üst üste binen ama aynı olmayan ihtiyaçlar üretir.",
            "Oyun evi girişimcisi için en riskli senaryo, faaliyeti yalnızca belediye ruhsatıyla sınırlı sanıp modelin günlükte eğitim veya bakım boyutuna kaymasıdır. Bu kayma; broşürde bir cümle, sosyal medyada bir içerik veya veli sözleşmesindeki bir ifade ile başlayabilir. Bu yüzden metinleriniz, personel görev tanımlarınız ve paket isimleriniz faaliyet tanımıyla çelişmemelidir.",
            "Danışmanlık sürecinde hedefimiz \"en kolay yol\"u değil, iş modelinize uygun ve savunulabilir yolu seçmektir. Bazı modellerde belediye ruhsatı ve genel işyeri yükümlülükleri yeterli olabilir; bazı modellerde ek idari kayıt veya farklı bir kurum statüsü gündeme gelebilir. Nihai gereklilikler kurum türüne, il ve uygulama pratiğine göre değişebileceğinden, burada paylaşılanlar bilgilendirme amaçlıdır ve somut dosya planı ön değerlendirme sonrası netleşir."
          ]
        },
        {
          id: "faaliyet-tanimi",
          title: "Faaliyet Tanımı: Eğitim İddiası, Bakım ve Atölye Ayrımı",
          paragraphs: [
            "Müşteriye satılan şey \"atölye\" veya \"gelişim programı\" gibi görünse bile, uygulamada tekrarlayan ders benzeri içerikler veya belirli yaş grubuna yönelik sistemli etkinlikler faaliyetin niteliğini değiştirebilir. Bu nedenle paket isimlerinizi, eğitmen rolünüzü ve içerik sürelerinizi faaliyet tanımıyla uyumlu kurgulamak önemlidir. Eğitim veya gelişim iddiası güçlendikçe, kurumunuzun idare tarafından nasıl sınıflandırılabileceği konusu daha hassas hale gelir.",
            "Bakım unsurlarının (beslenme, uyku düzeni, uzun süreli kalış) devreye girdiği modellerde ise hem fiziki alan hem de personel planı farklı bir disiplin gerektirir. Bu modellerde veli beklentisi ve kayıt düzeni de artar. Danışmanlıkta bu başlıkları erken konuşmak, sonradan tadilat veya personel değişimine gitmekten daha az maliyetlidir.",
            "Parti ve etkinlik modelinde riskler farklıdır: yoğun kısa süreli kalabalık, ebeveyn trafiği, giriş-çıkış disiplini ve fotoğraf paylaşımı gibi konular öne çıkar. Her modelde ortak olan ise acil durum ve çocuk güvenliği yaklaşımının net olmasıdır."
          ]
        },
        {
          id: "mekan-ve-fiziki",
          title: "Mekân Seçimi: Konum Kadar İç Akış da Belirleyici",
          paragraphs: [
            "Oyun evi için lokasyon seçimi pazarlama açısından cazip olsa da, operasyon ve uygunluk açısından \"iç akış\" en az cephe kadar önemlidir. Girişten oyun alanına giden hat, veli bekleme bölümünün görünürlüğü, zemin kaplamasının kayganlık riski, köşe ve düşme alanları gibi konular ilk günden tartışılmalıdır. Güzel bir vitrin; dar bir koridor, riskli görüş hattı veya yetersiz el yıkama erişimi ile birlikte geliyorsa modeliniz sahada zorlanır.",
            "Kiralık mekânlarda sık yapılan hata, tadilatı sona bırakmaktır. Oysa yangın çıkışı yaklaşımı, bazı bölmelerde tavan yüksekliği, zemin kaplaması ve kapı açılımları gibi hususlar geç müdahale edildiğinde maliyeti katlayabilir. Bu yüzden kira görüşmesinden önce minimum bir uygunluk özeti çıkarmak, sürprizi azaltır.",
            "Çocuk alanlarında malzeme seçimi teknik bir konudur: kolay temizlenebilir yüzeyler, yuvarlatılmış hatlar ve sabit mobilyanın devrilme riskinin azaltılması gibi prensipler uygulanmalıdır. Burada amaç \"göz alıcı\" olmaktan önce güvenli ve sürdürülebilir bir düzen kurmaktır."
          ]
        },
        {
          id: "guvenlik-hijyen",
          title: "Güvenlik, Hijyen ve Kayıt Düzeni: İşletmenin Omurgası",
          paragraphs: [
            "Güvenlik sadece birkaç uyarı levhasından ibaret değildir. Acil durum senaryosu, personel görev dağılımı, ilk yardım yaklaşımı ve veli teslim-teslim protokolü yazılı bir çerçevede tanımlanmalıdır. Kısa süreli kalabalık dönemlerinde bu protokollerin pratikliği test edilir; bu yüzden basit ve uygulanabilir olması gerekir.",
            "Hijyen tarafında rutinler belirginleştirilmelidir: yüzey temizliği, oyuncak rotasyonu, çocuk tuvaletlerinin kullanımı ve atık yönetimi gibi başlıklar işletme gününün parçası hâline gelmelidir. İyi bir hijyen düzeni hem veli güvenini artırır hem de olası şikâyet süreçlerinde savunulabilirlik sağlar.",
            "Kayıt düzeni çoğu girişimci için sıkıcı görünür; fakat doğru kurulduğunda operasyonu hızlandırır. Kim hangi çocuğu teslim aldı, özel sağlık notu var mı, fotoğraf izni sınırı nedir gibi sorular netleşmelidir. Bu alan danışmanlıkta şablon ve kontrol listeleriyle desteklenir."
          ]
        },
        {
          id: "teknik-basvurular",
          title: "Yapı, Yangın ve Sağlık Boyutu: Hangi Projelerde Öne Çıkar?",
          paragraphs: [
            "Her oyun evi için aynı teknik paket talep edilmeyebilir; ancak mekânın niteliği, kapasitesi ve kullanım şekli arttıkça itfaiye ve yapı uygunluğu ile sağlık-hijyen boyutunun gündeme gelme olasılığı artar. Bu başlıklar genellikle \"sonradan halledilir\" denip ertelenir; oysa en pahalı gecikmeleri bunlar üretir.",
            "Danışmanlıkta bu aşamada yapmaya çalıştığımız şey, paydaş sırasını ve beklentileri netleştirmektir. Hangi belgenin hangi idare sürecinde istenebileceği, süreç öncesi hazırlık ile daha öngörülebilir hale gelir. Bu sayede tadilat ve belge takvimi birbirini kilitlemez.",
            "Özellikle çok katlı veya karma kullanımlı binalarda, çıkış hatları ve kullanıcı yoğunluğu gibi konular daha erken tartışılmalıdır. Aksi halde \"dekorasyon bitti\" dediğiniz anda teknik bir uyumsuzluk tüm takvimi geri sarabilir."
          ]
        },
        {
          id: "belediye-ve-ticari",
          title: "Belediye ve Ticari Yükümlülükler: İşletme Kimliğini Kurmak",
          paragraphs: [
            "Belediye işyeri açma ve çalışma ruhsatı süreçleri, faaliyet konusu ve işletme unvanı ile uyumlu ilerlediğinde daha az sürtünme yaratır. NACE ve faaliyet tanımı ile günlük operasyonunuz arasında çelişki varsa, bu çelişki hem ruhsat hem de sonraki denetimlerde soru işareti doğurur.",
            "Danışmanlıkta işletme kimliğini kurarken sadece \"yasal zorunluluk\" değil, aynı zamanda müşteriye anlattığınız değer önerisini de hizalarız. Çünkü resmî taraftaki tanım ile pazarlama dili birbirinden kopuk olmamalıdır.",
            "Vergi ve muhasebe süreçleri bu metnin odağı değildir; ancak kurum açılışı planlanırken fatura kesimi ve kayıtlı ticaret disiplininin işletme modeline uyumu erken düşünülmelidir."
          ]
        },
        {
          id: "personel-veya-etkinlik-kadrosu",
          title: "Personel Planı ve Görev Tanımları Modelle Birlikte Şekillenir",
          paragraphs: [
            "Oyun evi modeliniz sürekli gözetim gerektiren bir yapıdaysa görev tanımlarını netleştirmek zorundasınız. Kim sahada sürekli gözetimde olacak, kim karşılamada görevli olacak, yoğun gün protokolü nedir sorularına yanıtlar yazılı olmalıdır.",
            "Atölye ve etkinlik modelinde ise eğitmen veya aktivite liderinin rol tanımı, kullanılacak materyallerin güvenliği ve çocuk sayısı-kapasite dengesi kritik olur. Burada sık yapılan hata, teoride düşük kapasite planlayıp pratikte yoğun günlerde sınırın aşılmasıdır.",
            "Çalışanlara ilişkin zorunlu bildirimler ve iş güvenliği kayıtları gibi hususları da süreç planına dahil etmek, sonradan panik yaşamayı engeller."
          ]
        },
        {
          id: "yanlis-varsayimlar",
          title: "Yaygın Yanılgılar: Süreci Kilitleyen Cümleler",
          paragraphs: [
            "\"Herkes yapıyor, biz de açarız\" cümlesi, hukuki uygunluk yerine sosyal kanıya dayalı riskli bir stratejidir. Piyasada görünen örneklerin her zaman aynı faaliyet tanımına sahip olmadığı unutulmamalıdır.",
            "\"Önce süsleyelim, ruhsata sonra bakarız\" yaklaşımı ise genelde iki kez tadilata veya sıkışık bir takvime çıkar. Ruhsat ve teknik gereksinimler dekorasyon ile birlikte planlandığında toplam maliyet daha kontrol altında kalır.",
            "\"Ruhsatı halleden birisi bulurum\" düşüncesi, dosyanın içeriği ve sürdürülebilir uyum görünmez olduğunda yönetimi zorlaştırır. Danışmanlığın katkısı yalnızca bir kartvizit bulmak değil; başvurunun mantığını ve izlenebilirliğini kurmaktır."
          ]
        },
        {
          id: "surec-butun",
          title: "Uçtan Uca Danışmanlıkta Size Ne Sunarız?",
          paragraphs: [
            "Çocuk oyun evi danışmanlığında yaklaşımımız üç katmanlıdır: tanım katmanında faaliyeti netler; fiziki katmanda riskleri azaltır; evrak katmanında tutarlı bir dosya standardı oluşturur. Bu üçü birbirinden kopuk olduğunda süreç yarım kalır.",
            "Takvim yönetiminde kritik tarihleri sıraya koyar, belge temin süreleri uzun süren kalemlerde erken uyarı üretir ve paydaşlar arası iletişimi sadeleştiririz. Amaç, başvuru anında değil, mekân seçiminden itibaren doğru adımlarla ilerlemektir.",
            "Bu rehberde anlatılanlar genel bir çerçevedir. Sizin projenizde yaşa özel koridor netliği, ek hizmet hatları veya franchising gibi ek katmanlar olabilir. Bu durumda kapsamı genişleterek aynı disiplinle ilerleriz."
          ]
        },
        {
          id: "iletisim-ve-sonuc",
          title: "Sonuç: Doğru Model, Doğru Mekân ve Savunulabilir Bir Dosya",
          paragraphs: [
            "Başarılı bir oyun evi açılışının özeti, misafiri etkilemekten önce modelin savunulabilir olmasıdır. Savunulabilir model; faaliyet tanımı ile uyumlu işletme kimliği, güvenli ve hijyenik bir mekân düzeni ve takip edilebilir bir evrak akışı üzerine kurulur.",
            "Bu sayfada paylaştığımız içerikler bilgilendirme amaçlıdır; nihai gereklilikler güncel mevzuat, idari uygulama ve proje özelinize göre değişebilir. En doğru yol haritası kısa bir ön değerlendirme ile çıkar.",
            "Siz de konseptinizi, hedef yaş aralığınızı ve açılış tarihinizi paylaşarak süreci birlikte planlayabilirsiniz; biz de riskleri erken gösterip dosyayı ve mekânı aynı çizgide buluştururuz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "Çocuk oyun evi açmak ile MEB anaokulu açmak aynı şey midir?",
        a: "Hayır. Anaokulu modeli farklı yaş aralığı, farklı mevzuat çerçevesi ve farklı kurum statüsü ile ilişkilidir. Oyun evi veya oyun grubu tanımıyla yürütülen modellerde faaliyet içeriğine göre farklı idari yollar gündeme gelebilir. Bu yüzden önce faaliyet tanımı netleştirilir."
      },
      {
        q: "Sadece belediye ruhsatı yeterli olur mu?",
        a: "Bazı modellerde belediye işyeri açma ve çalışma ruhsatı ve ilgili yükümlülükler ana çerçeveyi oluşturabilir. Ancak faaliyetinizde bakım, belirli kayıtlı çocuk hizmetleri veya sistemli eğitim içeriği gibi boyutlar güçlenirse ek idari gereksinimler gündeme gelebilir. Netlik için ön değerlendirme şarttır."
      },
      {
        q: "Kiralık mekânda açılış yapılabilir mi?",
        a: "Evet, birçok projede mümkündür; ancak kira ilişkisinin belgelenmesi ve mekânın kullanıma uygunluğunun süreçlerle uyumlu olması önemlidir. İskân ve yapı kullanım gibi hususlar proje bazında kontrol edilmelidir."
      },
      {
        q: "Parti odaklı işletmede en sık risk nedir?",
        a: "Giriş-çıkış ve veli tesliminde disiplinin zayıflaması, görüş hatlarının kapanması ve kısa sürede oluşan yoğunluğun güvenlik protokolünü zorlaması sık görülür. Operasyon tasarımı ve personel görev dağılımı bu riski düşürür."
      },
      {
        q: "Atölye ve yaz okulu paketleri hukuki olarak riskli midir?",
        a: "İsim değil içerik risk yaratır. Tekrarlayan, sistematik ve yaş grubuna göre yapılandırılmış içerikler ile eğitim iddiası güçlenirse uyum gereksinimleri de tartışılır hale gelir. Paketleri ve sosyal medya iletişimini faaliyet tanımına göre dengelemek gerekir."
      },
      {
        q: "Yangın ve itfaiye süreçleri her projede başlar mı?",
        a: "Her projede talep doğmayabilir; ancak kullanıcı yoğunluğu, yapı özellikleri ve mekânın niteliği arttıkça teknik gereksinimlerin daha erken masaya gelmesini bekleriz. Erken kontrol düzeltmeyi ucuzlatır."
      },
      {
        q: "Açılış ne kadar sürer?",
        a: "Mekânın hazırlığı, istenebilecek teknik uygunluklar ve seçilen başvuru hattına göre değişir. Gerçekçi bir tarih çıkarmak için önce model ve mekân keşfidir."
      },
      {
        q: "Siz garanti veriyor musunuz?",
        a: "Resmî süreç nihai kararı yetkili idarelere bağlıdır. Biz, tutarlı dosya hazırlığı, riskleri erken görme ve denetlenebilir bir işletme düzeni kurmanız için metod ve kontrol sunarız."
      }
    ]
  },
  {
    slug: "psikolojik-danismanlik-merkezi-kurulumu",
    title: "Psikolojik Danışmanlık Merkezi Kurulumu",
    summary:
      "Merkezinizin sunduğu hizmet tipine göre (eğitsel danışmanlık, test süreçleri, kurumsal iş birlikleri vb.) mekân-oda düzeni, KVK ve gizlilik hattı, kadro evrakları ve başvuru dosyası bütünlüğünü uçtan uca tasarlamak.",
    icon: HeartHandshake,
    seo: {
      metaTitle:
        "Psikolojik Danışmanlık Merkezi Kurulumu | MEB Rehberlik Modeli, Oda Planı ve Evrak Süreçleri",
      metaDescription:
        "Psikolojik danışmanlık ve rehberlik merkezi kurulumunda hizmet kapsamı analizi, oda-mekân planı, gizlilik ve kayıt standardı, uzman kadro evrakları ve başvuru takibi.",
      keywords: [
        "psikolojik danışmanlık merkezi kurulumu",
        "rehberlik ve psikolojik danışma merkezi",
        "PDR merkezi açılışı bilgilendirme",
        "merkez oda planı danışmanlığı",
        "KVK ve gizlilik süreçleri",
        "test uygulama odası düzeni",
        "danışan kayıt ve randevu sistemi",
        "uzman diploma ve atanabilirlik evrakları",
        "denetim hazırlığı merkez",
        "MEB özel öğretim kurumu bilgilendirme",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Merkezinizde yapılacak işin tanımı (bireysel görüşme, aile görüşmesi, test bataryası, mesleki rehberlik vb.) önce netleştirilir. Buna göre bekleme-danışma-test depolama alanları ve personelin görüşebileceği süpervizyon ihtiyacı değerlendirilir. KVK uyumu için aydınlatma metni, saklama süreleri ve erişim rolleri çerçevesinde kayıt hattı önerilir. Ardından kurum türü ve başvuru hattına göre evrak seti çıkarılır; dosya düzeni ve takvim üzerinden süreç yürütülür.",
      surec: [
        "Hizmet menüsü ve riskli sınırların (tanı/tedavi iddiası, reklam dili) ön görüşmesi",
        "Kurum modeli ve başvuru hattının netleştirilmesi",
        "Mekân keşfi veya plan üzerinden oda düzeni önerisi",
        "KVK/gizlilik ve kayıt akışı için işletme standardı taslağı",
        "Uzman kadro planı ve sözleşme-evrak kontrolü",
        "Başvuru dosyası hazırlığı ve takip",
        "Açılış öncesi denetlenebilirlik kontrolü"
      ],
      belgeler: [
        "Kurucu/kurucu temsilcisi ve şirket evrakları (modele göre)",
        "Uzmanların diploma, unvan, görev tanımı ve istihdam evrakları",
        "Mekân kira/tapu ve yerleşim planları",
        "Danışan bilgi formları, onam metinleri ve KVK dokümanları (taslak/yönlendirme)",
        "Randevu ve dosyalama süreç şeması",
        "İşyeri bildirim, vergi ve SMM işlemleri için yönlendirme listesi"
      ]
    },
    guide: {
      lead:
        "Psikolojik danışmanlık merkezi kurmayı düşünen girişimci çoğu zaman mekânı güzelleştirerek başlar; oysa ilk kırılma noktası genelde hizmet tanımıdır. Sunulan hizmetin “eğitsel rehberlik ve danışmanlık” çizgisinde mi kalacağı, yoksa klinik algı uyandıracak bir dile mi kayacağı hem mevzuat hem pazarlama hem de KVK açısından kritiktir. Bu rehber; merkezinizi kurumsal, savunulabilir ve sürdürülebilir biçimde ayağa kaldırmanız için hazırlandı. Bilgiler bilgilendirme amaçlıdır; nihai gereklilikler güncel düzenlemeler ve proje özelinize göre ayrıca ele alınır.",
      sections: [
        {
          id: "hizmet-kimligi",
          title: "Hizmet Kimliği: Ne Satıyorsunuz, Ne Satmadığınız Net Olmalı",
          paragraphs: [
            "Merkezin web sitesi, broşürü ve sosyal medya dili, fiilen sunduğunuz hizmetle uyumlu olmalıdır. Danışmanlık ve rehberlik ile tıbbi tedavi iddiası arasındaki çizgi pazarlama sırasında kolayca bulanıklaşır.",
            "Hizmet kimliğini netleştirmek; oda sayısı, kayıt formu alanları, uzman görev tanımı ve süpervizyon ihtiyacını da belirler.",
            "Danışmanlıkta bu başlığı ön görüşmede sert ama net sorularla açıyoruz; çünkü yanlış kimlik kurmak en pahalı geri dönüşleri üretir."
          ]
        },
        {
          id: "meb-vs-ticari",
          title: "MEB Modeli ve Ticari Danışmanlık Statüsü: Karma Yolu Doğru Okumak",
          paragraphs: [
            "Bazı merkezler özel öğretim kurumları çatısı altında konumlanır; bazı modellerde ise ticari işletme ve hizmet tanımı farklı yürür. Hangi modelin sizin için anlamlı olduğu; hedef kitle, hizmet süresi ve kurumsal kimliğe bağlıdır.",
            "Model seçimi yapılmadan sadece “oda sayısı” ile başvuruya girildiğinde, ileride kadro ve evrak uyumsuzluğu çıkabilir.",
            "Burada anlatılanlar genel çerçevedir; somut yol haritası ön değerlendirme ile çıkar."
          ]
        },
        {
          id: "oda-ve-akisi",
          title: "Oda Düzeni ve Ziyaretçi Akışı: İlk İzlenim Değil, Gizlilik ve Güven",
          paragraphs: [
            "Bekleme alanının danışma odalarına görüş mesafesi, ses geçirgenliği ve ziyaretçi trafiği açısından değerlendirilmesi gerekir. Test uygulaması yapılacaksa dikkat dağıtıcı uyaranların azaltılması ve sakince bekleme hattı ayrı planlanmalıdır.",
            "Oda sayısı büyüdükçe randevu ve dosya trafiği karmaşıklaşır; bu yüzden kayıt düzeni baştan tasarlanmalıdır.",
            "Ergonomi ve güvenlik kadar, “danışanın mahremiyeti nasıl korunuyor?” sorusunun cevabı da mekânda hissedilmelidir."
          ]
        },
        {
          id: "kvkk-ve-kayit",
          title: "KVKK ve Kayıt: Excel Değil, Süreç Sahibi Olan Bir Düzen",
          paragraphs: [
            "Danışan verisi; sadece dijital dosya değildir. Kim hangi kaydı görür, ne kadar süre saklanır, hangi hallerde paylaşılır sorularının yazılı karşılığı olmalıdır.",
            "Randevu sistemi, ödeme kayıtları ve test materyali saklama gibi başlıklar birbirinden kopuk olmamalıdır.",
            "Danışmanlıkta şablon ve kontrol listeleriyle “minimum savunulabilir düzey” kurmayı hedefleriz; kapsam büyüdükçe hukuki danışmanlıkla genişletilir."
          ]
        },
        {
          id: "uzman-kadro",
          title: "Uzman Kadro ve Görev Tanımı: Diplomanın Ötesinde Organizasyon",
          paragraphs: [
            "Uzmanların unvan kullanımı, sorumluluk alanı ve süpervizyon ilişkisi yazılı olmalıdır. Kurumda çalışan ile dışarıdan hizmet alınan uzman ayrımı da evrakta görünür olmalıdır.",
            "Yarı zamanlı modelde bile kapasite planı yapılmazsa randevu kalitesi düşer; bu da hem ticari hem uyum riski doğurur.",
            "Sözleşme ve SGK bildirimi gibi başlıklar erken ele alınmalıdır."
          ]
        },
        {
          id: "test-ve-materyal",
          title: "Test ve Materyal Yönetimi: Depolama ve Erişim Disiplini",
          paragraphs: [
            "Test kitapçıkları ve ölçme araçları için saklama koşulları ve erişim yetkileri tanımlanmalıdır. Materyalin kaybı veya yetkisiz erişimi ciddi uyum ve etik risk oluşturabilir.",
            "Uygulayıcıların yetkinliği ve kullanılan araçların kapsamı da merkezin hizmet kimliğiyle uyumlu olmalıdır.",
            "Bu başlık özellikle çok uzmanlı merkezlerde operasyonel bir disiplin gerektirir."
          ]
        },
        {
          id: "acil-risk",
          title: "Acil Durum ve Riskli Danışan Yaklaşımı: Bariz Olmayan Ama Kritik",
          paragraphs: [
            "Psikolojik hizmet sunan merkezlerde acil durum protokolü, yalnızca yangın kaçışından ibaret değildir. Kriz anında kimin devreye gireceği, hangi kurumlarla iletişim hatlarının bulunacağı ve sınırların nasıl iletileceği önceden düşünülmelidir.",
            "Bu protokoller etik ve hukuki sınırların da eğitimini gerektirir.",
            "Operasyonel olarak basit, yazılı olarak net bir çerçeve hedeflenir."
          ]
        },
        {
          id: "pazarlama-sinir",
          title: "Pazarlama ve İletişim Sınırları: Vaat Değil Bilgi Vermek",
          paragraphs: [
            "“%100 çözüm”, “kesin sonuç” gibi ifadeler hem etik hem hukuki açıdan risklidir. Merkezin vaadi ile sözleşme ve bilgilendirme metinleri uyumlu olmalıdır.",
            "İndirim kampanyaları ve paket satışlarında danışanın bilgilendirilmesi ve iptal koşulları netleştirilmelidir.",
            "Danışmanlıkta iletişim dilinin hizmet kimliğiyle örtüşmesini kontrol ederiz."
          ]
        },
        {
          id: "basvuru-butunlugu",
          title: "Başvuru Dosyasında Bütünlük: Mekân, Kadro ve Hizmet Aynı Masada",
          paragraphs: [
            "Başvuruda sunulan yerleşim planı ile gerçek oda kullanımı, uzman kadro ile hizmet menüsü ve işletme unvanı ile faaliyet konusu birbirini tamamlamalıdır.",
            "Tutarsızlıklar, “küçük düzeltme” sanılıp büyük gecikmeye dönüşebilir.",
            "Dosyayı parça parça değil, tek hikâye olarak okumak danışmanlığın merkezinde durur."
          ]
        },
        {
          id: "denetim-surdur",
          title: "Denetim ve Sürdürülebilirlik: Açılış Günü Değil, 6 Ay Sonrası da Önemli",
          paragraphs: [
            "Merkez açıldıktan sonra kayıt düzeni gevşeyebilir. Bu, hem şikâyet riskini artırır hem denetimde zayıf görünürsünüz.",
            "Periyodik iç kontrol listesi ve personel devrinde bilgi aktarım standardı kurulmalıdır.",
            "Danışmanlıkta açılış sonrası için kısa bir uyum özeti sunarız."
          ]
        },
        {
          id: "sonuc-cagri",
          title: "Sonuç: Merkezinizi Güvenle Kurmak İçin Önce Tanımını Yazmak",
          paragraphs: [
            "Başarılı bir psikolojik danışmanlık merkezi; gösterişli dekorasyonla değil, tanımlı hizmet, disiplinli kayıt ve uyumlu kadro ile ölçülür.",
            "Siz vizyonunuzu ve hedef danışan profilinizi paylaştığınızda biz de o vizyona uygun mekân, evrak ve risk çerçevesini birlikte oluştururuz.",
            "Ön değerlendirme için iletişim formunu veya telefon hattını kullanabilirsiniz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "Psikolojik danışmanlık merkezi ile klinik hizmet aynı şey midir?",
        a: "Hayır. Hizmet tanımı, kullanılan unvanlar, mekân düzeni ve hatta pazarlama dili farklı yükümlülükler doğurabilir. Merkezinizin çizgisini önce netleştirmek gerekir."
      },
      {
        q: "KVKK için ne kadar detay gerekir?",
        a: "İşlediğiniz veri, saklama süresi ve erişim rolleri netleştikçe aydınlatma ve teknik-organizasyonel tedbirler de şekillenir. Danışmanlıkta minimum savunulabilir düzey için şablon ve kontrol sağlar; kapsam büyüdükçe hukuki uzman desteği önerilir."
      },
      {
        q: "Kaç oda ile başlamalıyım?",
        a: "Hizmet menünüz ve randevu kapasiteniz belirleyicidir. Erken planlama yapılmadan çok oda açmak maliyet; az oda ile kalabalık program ise gizlilik riski doğurur."
      },
      {
        q: "Uzmanları ben mi bulurum?",
        a: "İstihdam genellikle işletmeci sorumluluğundadır; biz görev tanımı, evrak seti ve uygunluk kontrolü ile yönlendiririz."
      },
      {
        q: "Test uygulayabilir miyim?",
        a: "Uygulama yapılacaksa araçların kullanım koşulları ve uygulayıcı yetkinliği ayrıca değerlendirilmelidir. Bu başlık merkez modeline göre şekillenir."
      },
      {
        q: "Mekân kiralık olabilir mi?",
        a: "Evet. Kira süresi, kullanım hakkı ve yerleşim değişikliklerinin başvuru dosyasıyla uyumu takip edilmelidir."
      },
      {
        q: "Süreç ne kadar sürer?",
        a: "Mekân durumu, tadilat, kadro tamamlanması ve başvuru hattına göre değişir. Ön inceleme sonrası takvim çıkarılır."
      },
      {
        q: "Resmî onay garantisi var mı?",
        a: "Yetkili idarelerin kararına bağlıdır. Biz dosya bütünlüğü ve risk azaltma ile yanınızdayız."
      }
    ]
  },
  {
    slug: "dk-ergoterapi-merkezi-acilisi",
    title: "Dil ve Konuşma (DK) / Ergoterapi Merkezi Açılışı",
    summary:
      "Dil ve konuşma terapisi ile ergoterapi hizmetini aynı çatı altında veya ayrı hatlarla kurgularken bireysel seans odaları, grup/düzey destek alanları, duyu ve motor beceri ihtiyaçları ve uzman kadro evraklarını tek plana bağlamak.",
    icon: Building2,
    seo: {
      metaTitle:
        "DK ve Ergoterapi Merkezi Açılışı | Uzman Kadro, Oda Planı, Ekipman ve Başvuru Dosyası",
      metaDescription:
        "Dil konuşma ve ergoterapi merkezi açılışında kurum modeli, yerleşim ve ekipman uyumu, uzman istihdam evrakları ve başvuru bütünlüğü. Denetim öncesi kontrol desteği.",
      keywords: [
        "DK merkezi açılışı",
        "ergoterapi merkezi kurulumu",
        "dil ve konuşma terapisi merkezi",
        "bireysel terapi odası planı",
        "duyu bütünleme alanı bilgilendirme",
        "ergoterapi ekipman listesi",
        "uzman kadro MEB kurumu bilgilendirme",
        "özel öğretim kurumu başvuru evrakları",
        "denetim hazırlığı terapi merkezi",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Hizmet menüsü (bireysel seans, grup çalışması, ebeveyn eğitimi vb.) netleştikten sonra buna uygun oda sayısı, hol-sirkülasyon, malzeme depoları ve steril-el yıkama hatları değerlendirilir. Ergoterapi tarafında salınım ve düşme emniyeti gibi riskler planlanır; DK tarafında akustik mahremiyet ve dikkat dağıtıcı uyaranların azaltılması hedeflenir. Kadro planı bu kurguya bağlanır; ardından yerleşim planı ile evrak seti aynı hikâyede birleştirilir.",
      surec: [
        "Program ve hedef kitle (yaş, tanı profili, seans yoğunluğu) analizi",
        "Kurum modeli başvuru hattının doğrulanması",
        "Mekân keşfi veya planlar üzerinden yerleşim ve ekipman taslağı",
        "Uzman kadro ve sözleşme-evrak kontrolü",
        "Başvuru dosyası, teknik rapor sırası ve takip",
        "Açılış öncesi denetlenebilirlik kontrolü ve düzeltme listesi"
      ],
      belgeler: [
        "Kurucu ve kurum/şirket evrakları",
        "Uzmanların diploma, görev tanımı ve istihdam belgeleri",
        "Mekân kira-tapu, yerleşim ve kullanım belgeleri",
        "Ekipman ve malzeme envanteri (kapsama göre)",
        "Hijyen ve malzeme saklama ile ilgili işletme notları",
        "Veli iletişimi ve KVK dokümanları (uygulanabilirse)",
        "Başvuru dilekçeleri ve formlar"
      ]
    },
    guide: {
      lead:
        "Dil ve konuşma ile ergoterapi merkezleri, hem uzmanlık hem de fiziki alan açısından en çok “sonradan keşfedilen ihtiyaçlarla” büyür. Bir salıncak sisteminin tavan taşıyıcılara bağlanması, oda ses yalıtımı veya depo alanı gibi konular dekorasyon bittikten sonra ele alınınca bütçeyi zorlar. Bu rehberde, DK/ergoterapi merkezi açılışında süreci tek bir çizgide tutmanın yollarını anlatıyoruz. Paylaşılan bilgiler bilgilendirme amaçlıdır; klinik/sağlık tüzükleriyle ilişkili özel durumlar ayrıca değerlendirilmelidir.",
      sections: [
        {
          id: "hizmet-modeli",
          title: "Hizmet Modeli: Bireysel mi, Karma mı, Hangi Yoğunlukta?",
          paragraphs: [
            "Aynı merkezde DK ve ergoterapi birlikte sunulacaksa oda paylaşımı ve seans çakışmaları erken planlanmalıdır. Grupla bireysel seansların aynı koridorda üst üste binmesi hem gürültü hem mahremiyet riski oluşturur.",
            "Hedef yoğunluk ve kapasite belirlenmeden yerleşim planı çizmek, sonradan “oda yetmiyor” çıkmazına götürür.",
            "Haftalık seans takvimi ve personel çalışma modelini konuşuruz; plan buna göre şekillenir."
          ]
        },
        {
          id: "oda-duzeni-dk",
          title: "Dil ve Konuşma Odaları: Mahremiyet ve Uygulama Alanı Dengesi",
          paragraphs: [
            "DK odalarında hem çocuk hem ebeveyn oturma düzeni, materyal dolapları ve görsel dikkat dağıtıcılar kontrol altında tutulmalıdır. Oda küçük sanılıp depo dışarıda unutulursa seans verimi düşer.",
            "Akustik ve kapı-pencere detayı pratikte göz ardı edilir; fakat komşu odayı rahatsız etmemek için erken düşünülmelidir.",
            "Her odanın görev tanımı yazılı olmalı; aksi halde dosyadaki plan ile sahada yaşanan kullanım farklılaşır."
          ]
        },
        {
          id: "alan-ergoterapi",
          title: "Ergoterapi Alanı: Salınım, Düşme Emniyeti ve Zemin Mantığı",
          paragraphs: [
            "Motor ve duyu becerileri için kullanılan alanlarda zemin sürtünmesi, köşe koruyucular ve asılı ekipmanların statik güvenliği kritiktir. Bu başlıklar “atölye gibi” geçiştirilmemelidir.",
            "Çok amaçlı salon ile bireysel odalar arasındaki trafik, yoğun saatlerde kilitlenme yaratabilir; sirkülasyon planı buna göre yapılmalıdır.",
            "Ekipman envanteri başvuru ve işletme disiplinini güçlendirir; sonradan yapılan büyük alışverişler dosya ile çelişebilir."
          ]
        },
        {
          id: "kadro-surevision",
          title: "Kadro, Süpervizyon ve Vekâlet: Tek Uzmanla Başlayıp Çökmeyin",
          paragraphs: [
            "Çok disiplinli merkezlerde süpervizyon hattı ve vekâlet planı yazılı değilse izinli günlerde operasyon aksar. Bu hem ticari kayıp hem uyum zaafıdır.",
            "Yarı zamanlı uzman modelinde bile minimum saat ve sorumluluk netleştirilmelidir.",
            "SGK ve sözleşme evrakları kadro planıyla uyumlu olmalıdır."
          ]
        },
        {
          id: "ekipman-bütçe",
          title: "Ekipman ve Bütçe: Önce Liste, Sonra Satın Alma",
          paragraphs: [
            "Ergoterapi ve DK materyalleri hızlı şekilde listeyi şişirir. Listeyi önceliklendirip seans içeriğiyle eşleştirmek nakit akışını korur.",
            "Bazı ekipmanlar yapısal bağlantı gerektirir; bu da tadilat sırasına bağlanmalıdır.",
            "Danışmanlıkta “aşamalı ekipman planı” ile açılışı riske atmadan ilerlemeyi hedefleriz."
          ]
        },
        {
          id: "veli-bekleme",
          title: "Veli Bekleme ve Gizlilik: Koridor Trafiği Yönetimi",
          paragraphs: [
            "Veli bekleme alanı bazen küçük düşünülür; oysa kardeşler, bebek arabaları ve yoğun saat trafiği operasyonu kilitler.",
            "Görüş açısı ve personel denetimi açısından bekleme-karşılama hattı net olmalıdır.",
            "Broşür ve ekran içerikleri gizlilik ve etik sınırlara uygun olmalıdır."
          ]
        },
        {
          id: "hijyen-malzeme",
          title: "Malzeme Hijyeni ve Saklama: Oyuncak Değil Operasyonel Varlık",
          paragraphs: [
            "Paylaşılan materyallerin temizlik döngüsü ve kişiye özel set ihtiyacı planlanmalıdır. Depo alanı kapısı kilitlenebilir mi, kim erişir soruları yanıtlanmalıdır.",
            "Atık ve küçük parça yönetimi özellikle erken yaş gruplarında risk içerir.",
            "İşletme kontrol listesine bu başlıklar dâhil edilmelidir."
          ]
        },
        {
          id: "basvuru-uclu",
          title: "Başvuru Üçlüsü: Mekân, Kadro ve Hizmet Menüsü Tek Cümlede",
          paragraphs: [
            "Dosyada anlatılan hizmet ile yerleşim planı ve uzman unvanları örtüşmelidir. Bir uzmanın yapmadığı işi sunduğunuzu ima eden metin risk yaratır.",
            "Randevu sistemi çıktıları bazen gerçek kapasiteyi gösterir; bu veri plan revizyonu için kullanılabilir.",
            "Danışmanlık, bu üçlünün tutarlılığını dosya hazırlığı boyunca korur."
          ]
        },
        {
          id: "teknik-surecler",
          title: "Teknik Süreçler: Proje Büyüdükçe Masaya Çıkanlar",
          paragraphs: [
            "Kapasite ve kat sayısı arttıkça yangın çıkışı, tabela, asansör ihtiyacı gibi başlıklar önem kazanır. Bunlar açılıştan haftalar önce sıraya konmalıdır.",
            "Teknik raporlar bazen paralel yürütülemez; bağımlılık zinciri yazılı olmalıdır.",
            "Danışmanlıkta paydaş sırasını bozmamak için mini bir kritik yol analizi çıkarırız."
          ]
        },
        {
          id: "sonuc-dk",
          title: "Sonuç: İyi Merkez, İyi Planlanmış Sirkülasyon ve Kadrodur",
          paragraphs: [
            "DK ve ergoterapi merkezleri başarılı olduğunda bile operasyonel olarak yorucudur; bu yüzden açılış günü değil ilk altı ayın planı da düşünülmelidir.",
            "Siz hizmet menünüzü ve hedef büyümenizi paylaştığınızda biz de o hedefe uygun dosya ve mekân disiplinini kurarız.",
            "Ön görüşme ile süreci netleştirmenizi öneririz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "DK ve ergoterapi aynı merkezde olabilir mi?",
        a: "Evet, birçok modelde birlikte kurgulanır; ancak oda paylaşımı, seans trafiği ve uzman sorumlulukları erken planlanmalıdır."
      },
      {
        q: "En sık görülen mimari hata nedir?",
        a: "Yetersiz depo ve dar sirkülasyon hatları. Malzeme koridorlara taşınca hem güvenlik hem hijyen zaafa düşer."
      },
      {
        q: "Minimum kaç uzmanla başlanır?",
        a: "Hedeflenen kapasite ve süpervizyon modeline bağlıdır. Tek uzmanla başlayan ama yoğun takvim kurgulanan modellerde vekâlet riski erken hesaplanmalıdır."
      },
      {
        q: "Ekipmanı sonra alsam olur mu?",
        a: "Temel liste başvuru ve yerleşim ile uyumlu olmalıdır. Büyük ve yapısal ekipmanlar için erteleme maliyetli olabilir."
      },
      {
        q: "Ses yalıtımı şart mı?",
        a: "Komşu oda ve bekleme alanı düzenine göre değişir. Mahremiyet ve uygulama kalitesi açısından çoğu projede en azından temel önlemler önerilir."
      },
      {
        q: "Kiralık mekân uygun mu?",
        a: "Evet; fakat asılı sistem ve zemin müdahaleleri için kira sözleşmesi ve tahliye koşulları netleştirilmelidir."
      },
      {
        q: "Süreç ne kadar sürer?",
        a: "Tadilat, teknik raporlar ve kadro tamamlanmasına göre değişir. Ön inceleme sonrası takvim çıkarılır."
      },
      {
        q: "Onay garantisi veriyor musunuz?",
        a: "Hayır. Yetkili kurum kararlarına bağlıdır. Tutarlı dosya ve risk kontrolü sunarız."
      }
    ]
  },
  {
    slug: "ozel-egitim-rehabilitasyon-merkezi-acilisi",
    title: "Özel Eğitim ve Rehabilitasyon Merkezi Açılışı",
    summary:
      "Özel Öğretim Kurumları Yönetmeliği ve Özel Eğitim Kurumları Yönetmeliği çerçevesinde OEEL açılışında bina-bağımsız giriş şartları, program onayı, uzman kadro evrakları ve çift katmanlı inceleme sürecini tek dosyada yönetmek.",
    icon: Accessibility,
    seo: {
      metaTitle:
        "Özel Eğitim ve Rehabilitasyon Merkezi Açılışı | MEB Başvuru, Bina Şartları ve Özel Eğitim Yönetmeliği Rehberi",
      metaDescription:
        "Özel eğitim ve rehabilitasyon merkezi (OEEL) açılışında müstakil bina ve bağımsız giriş şartları, m. 5–6 belge seti, Özel Eğitim Kurumları Yönetmeliği müracaat şartları ve denetim hazırlığı danışmanlığı.",
      keywords: [
        "özel eğitim rehabilitasyon merkezi açmak",
        "OEEL kurulumu",
        "özel eğitim kurumları yönetmeliği",
        "özel öğretim kurumları yönetmeliği",
        "MEB özel eğitim merkezi başvurusu",
        "bağımsız giriş şartı OEEL",
        "özel eğitim merkezi evrakları",
        "rehabilitasyon merkezi ruhsatı",
        "özel eğitim program onayı",
        "kurum açma izni özel eğitim",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Ön görüşmede hedef öğrenci profili (yaş, destek türü, bireysel/grup yoğunluğu) ve mekânın mevcut durumu netleştirilir. Özel Öğretim Kurumları Yönetmeliği m. 11’deki müstakil kullanım ve bağımsız giriş şartları ile Özel Eğitim Kurumları Yönetmeliği müracaat şartları aynı takvimde eşlenir. Yerleşim planı, program onayı, kurucu-kadro evrakları ve inceleme raporu beklentisi (m. 6) baştan dosyaya işlenir; geçici nakil veya kontenjan artışı senaryoları için risk notu çıkarılır.",
      surec: [
        "Kurum modeli ve Özel Eğitim Kurumları Yönetmeliği kapsamı ön analizi",
        "Mekân keşfi: müstakil kullanım, bağımsız giriş ve erişilebilirlik ön taraması",
        "Yerleşim planı, dış cephe fotoğrafları ve standartlara uygun oda düzeni",
        "Talim ve Terbiye Kurulu program onayı ve taahhüt evrakları",
        "Kurucu, kurucu temsilcisi ve özel eğitim öğretmeni kadro evrak seti",
        "İl millî eğitim müdürlüğü inceleme süreci (m. 6) ve geri bildirim yönetimi",
        "Ruhsat sonrası yerleşim/kontenjan değişikliği ve sürdürülebilir uyum kontrolü"
      ],
      belgeler: [
        "Form dilekçe (EK-1) ve kurucu şartlarına ilişkin yazılı beyan (m. 5)",
        "Kurucu temsilcisi yetki belgesi; tüzel kişi ise ana sözleşme ve ortaklık bilgileri",
        "35x50 cm veya A3 yerleşim planı, dış cephe ve bahçe fotoğrafları, elektronik kayıt",
        "Uygulanacak öğretim programının TTK onay kararı (tarih ve sayı)",
        "Özel Eğitim Kurumları Yönetmeliği kapsamında istenen ek müracaat belgeleri",
        "Yönetici ve eğitim personeli çalışma izin tekliflerine dair kurucu beyanı",
        "Tapu veya en az bir yıllık kira sözleşmesi (onaylı örnek)",
        "Deprem, yangın, sağlık-hijyen ve engelli erişilebilirliğine ilişkin süreç belgeleri (istenmesi hâlinde)"
      ]
    },
    guide: {
      lead:
        "Özel eğitim ve rehabilitasyon merkezi (OEEL) açmak; yalnızca bir rehabilitasyon salonu kurmakla sınırlı değildir. Süreç, Özel Öğretim Kurumları Yönetmeliği ile Özel Eğitim Kurumları Yönetmeliğinin birlikte okunmasını gerektirir. Bina seçiminde müstakil kullanım ve bağımsız giriş, evrakta ise program onayı ile uzman kadronun aynı hikâyeyi anlatması kritiktir. Bu rehber, paylaştığınız yönetmelik metninden türetilmiş bilgilendirme çerçevesidir; il uygulamaları ve güncel RG değişiklikleri projenize göre ayrıca değerlendirilir.",
      sections: [
        {
          id: "oeel-tanim",
          title: "OEEL Nedir? DK/Ergo Merkezinden Farkı",
          paragraphs: [
            "Özel Öğretim Kurumları Yönetmeliği, özel eğitim ve rehabilitasyon merkezini örgün öğretim kurumları yanında ayrı bir kurum türü olarak tanımlar. Dil-konuşma ve ergoterapi merkezi ile örtüşen hizmetler sunulsa bile kurum türü, beklenen program, personel ve fiziki standartları değiştirir.",
            "Yanlış kurum türüyle başvurmak; yanlış program onayı, eksik öğretmen evrakı veya binanın bağımsız giriş şartını karşılamaması gibi geri dönüşlere yol açar.",
            "Danışmanlıkta ilk adım, sunduğunuz destek paketinin OEEL tanımına uyup uymadığını netleştirmektir."
          ]
        },
        {
          id: "cift-mevzuat",
          title: "Çift Mevzuat: Özel Öğretim + Özel Eğitim Yönetmeliği",
          paragraphs: [
            "m. 6 uyarınca OEEL açılışında, Genel Müdürlük standartlarına ek olarak Özel Eğitim Kurumları Yönetmeliğindeki müracaat şartları da aranır. Yalnızca genel öğretim kurumları yönetmeliğine göre dosya hazırlamak eksik kalabilir.",
            "İnceleme ekibi görevlendirme tebliğinden itibaren en geç on beş iş günü içinde rapor düzenler; bu süre planlanmadan yürütülürse tadilat ve personel atamaları çakışır.",
            "Sitemizdeki PDF, Özel Öğretim Kurumları Yönetmeliğinin tam metnidir; OEEL’e özgü fiziki ve personel ayrıntıları için Özel Eğitim Kurumları Yönetmeliği de birlikte ele alınmalıdır."
          ]
        },
        {
          id: "bina-sartlari",
          title: "Bina Şartları: Müstakil Kullanım ve Bağımsız Giriş",
          paragraphs: [
            "m. 11’e göre merkez, kullanım hakkının tamamı kuruma ait müstakil binalarda açılır. Giriş katında ticari işletme varsa, ticari bölümler dışındaki katların tamamını kapsayan ve ayrı bağımsız girişi bulunan yapılar istisna kapsamında değerlendirilebilir.",
            "Kira görüşmesinden önce “bağımsız giriş var mı, ticari alanla geçiş var mı” sorularına cevap aramak, yanlış yatırımı erken keser.",
            "Geçici nakilde müstakil bina şartı aranmayabilir; ancak bağımsız giriş şartı devam eder (m. 16). Geçici süre sonunda uygun binaya nakil planı yazılmalıdır."
          ]
        },
        {
          id: "program-kadro",
          title: "Program Onayı ve Özel Eğitim Öğretmeni Kadrosu",
          paragraphs: [
            "m. 5 (f) kapsamında uygulanacak öğretim programının Talim ve Terbiye Kurulu kararı ve taahhütleri dosyada yer almalıdır. Program ile fiilen verilen destek (bireysel eğitim, grup, aile danışmanlığı vb.) örtüşmelidir.",
            "Özel eğitim öğretmeni ve ilgili uzmanların çalışma izin teklifleri, kontenjan ve oda planıyla tutarlı olmalıdır. Yarı zamanlı modelde bile kapasite planı yazılı değilse denetimde zayıf görünürsünüz.",
            "Veli sözleşmesi, kayıt formu ve tanıtım metinleri; kurumun özel eğitim hizmeti sunduğunu açık ve ölçülü biçimde ifade etmelidir."
          ]
        },
        {
          id: "erisilebilirlik",
          title: "Engelli Erişilebilirliği ve Ders Katları",
          paragraphs: [
            "m. 10’da engelli erişilebilirliği; TSE ve Aile, Çalışma ve Sosyal Hizmetler Bakanlığı kat-merdiven-yük şartlarıyla bağlanmıştır. Zemin kat dışı kurumlarda, engellilere yönelik hizmetlerin zemin katta verilmesi hâlinde üst katlar için erişim şartı aranmayabilir.",
            "OEEL’de sık kullanılan terapi odaları, bekleme alanı ve tuvalet hatları bu mantıkla erken planlanmalıdır.",
            "Kullanılmayan kat veya bölümler belgelerde açıkça belirtilmeli; bu alanlarda faaliyet yapılmamalıdır."
          ]
        },
        {
          id: "belge-butunlugu",
          title: "Evrak Bütünlüğü: Yerleşim Planı ile Kadro Aynı Masada",
          paragraphs: [
            "Yerleşim planındaki oda sayısı ve kontenjan, program onayı ve öğretmen atamalarıyla çelişmemelidir. Bir odada planlanan grup sayısı ile fiili seans yoğunluğu farklıysa dosya güvenilirliği düşer.",
            "Tapu-kira, adres ve şirket unvanı zinciri tek hikâye anlatmalıdır. Dijital kopya ile asıl belge formatı uyumsuzluğu sık geri dönüş sebebidir.",
            "Danışmanlıkta dosya isimlendirme ve sıra standardı kurarak iletişimi hızlandırırız."
          ]
        },
        {
          id: "inceleme-sure",
          title: "İnceleme ve Ruhsat Süreleri",
          paragraphs: [
            "m. 6’ya göre il millî eğitim müdürlüğü beş iş günü içinde en az iki kişilik inceleme ekibi görevlendirir. Rapor on beş iş günü içinde tamamlanır.",
            "Olumlu rapor ve güvenlik soruşturması sonrası birçok kurum türünde valilik on beş iş günü içinde kurum açma izni ve iş yeri ruhsatı düzenler; özel eğitim okullarında süreç Bakanlık onayına uzanabilir.",
            "Sürelerin evrak giriş tarihinden hesaplandığını unutmamak, takvim disiplini için önemlidir."
          ]
        },
        {
          id: "nakil-kontenjan",
          title: "Nakil, Geçici İzin ve Kontenjan Artışı",
          paragraphs: [
            "İller arası nakil yapılamaz; OEEL için ilçeler arası nakil de sınırlıdır (Özel Eğitim Kurumları Yönetmeliği EK-1 istisnası hariç). Adres değişikliği planlanırken bu sınır göz önünde bulundurulmalıdır.",
            "Geçici nakilde bağımsız giriş şartı sürer; bir yıl sonunda uygun binaya taşınmama hâlinde izin iptali riski doğar.",
            "Kontenjan veya kat ilavesi için m. 17 başvurusu, m. 5’teki belge setiyle birlikte yapılır; yalnızca değişen bölümler incelenir."
          ]
        },
        {
          id: "denetim-hazirlik",
          title: "Denetim Hazırlığı: Kayıt, Veli İletişimi ve Mahremiyet",
          paragraphs: [
            "OEEL’de öğrenci kayıt dosyası, bireyselleştirilmiş eğitim planına ilişkin kayıtlar ve veli bilgilendirme izinleri düzenli tutulmalıdır. KVK ve özel eğitim etiği sınırları pazarlama diline de yansıtılmalıdır.",
            "Son haftaya bırakılan fiziki düzenlemeler maliyeti artırır; ön kontrol listesi ile eksikler önceliklendirilir.",
            "Amaç yalnızca ruhsat almak değil, sürdürülebilir ve savunulabilir bir merkez işletmektir."
          ]
        },
        {
          id: "sonuc-oeel",
          title: "Sonuç: Yönetmeliği Okuyarak Planlanan Açılış",
          paragraphs: [
            "Başarılı bir OEEL açılışı; doğru kurum türü, yönetmeliklere uygun bina, onaylı program ve tutarlı kadro evrakının aynı çizgide buluşmasıdır.",
            "Sitemizde yönetmelik PDF’ini indirebilir; bu sayfadaki madde özetleriyle sürecinizi karşılaştırabilirsiniz.",
            "Ön değerlendirme için iletişim formunu kullanarak mekân ve hedef kontenjan bilginizi paylaşmanız yeterlidir."
          ]
        }
      ]
    },
    faq: [
      {
        q: "Paylaştığım PDF hangi yönetmelik?",
        a: "Dosya adı özel eğitim kurumları yönetmeliği olsa da metin, Millî Eğitim Bakanlığı Özel Öğretim Kurumları Yönetmeliğidir. OEEL açılışında buna ek olarak Özel Eğitim Kurumları Yönetmeliği (RG 28296) müracaat şartları da aranır."
      },
      {
        q: "OEEL için müstakil bina şart mı?",
        a: "Genel kural, kullanım hakkının tamamının kuruma ait olduğu müstakil binadır. Ticari giriş katı istisnaları ve geçici nakilde bağımsız giriş şartı ayrıca değerlendirilir. Mekân ön keşfi şarttır."
      },
      {
        q: "DK/ergoterapi merkezi ile aynı başvuru yapılır mı?",
        a: "Hayır. Kurum türü, program onayı ve personel beklentisi farklıdır. Hizmet menünüz OEEL kapsamındaysa dosya buna göre hazırlanmalıdır."
      },
      {
        q: "İnceleme ne kadar sürer?",
        a: "Görevlendirme sonrası rapor için en geç on beş iş günü öngörülür. Evrak eksikliği veya bina uyumsuzluğu bu süreyi uzatır."
      },
      {
        q: "Geçici nakilde nelere dikkat edilir?",
        a: "Müstakil bina şartı aranmayabilir; bağımsız giriş şartı aranır. Bir yıl sonunda uygun binaya nakil planı yapılmazsa izin riski doğar."
      },
      {
        q: "Kontenjan artırmak için ne gerekir?",
        a: "m. 17 kapsamında yerleşim ve kontenjan değişikliği başvurusu; m. 5’te sayılan belgelerle birlikte yapılır. Değişen bölümler ayrıca incelenir."
      },
      {
        q: "Danışmanlık resmî başvuruyu benim yerime yapar mı?",
        a: "Nihai başvuru ve imza yetkisi başvuru sahibindedir. Biz dosya standardı, mevzuat eşlemesi ve takvim ile yönlendiririz."
      },
      {
        q: "Onay garantisi veriyor musunuz?",
        a: "Hayır. Yetkili idare kararlarına bağlıdır. Yönetmelik maddelerine uygun hazırlıkla riskleri azaltırız."
      }
    ]
  },
  {
    slug: "kurum-devir-islemleri",
    title: "Kurum Devir İşlemleri",
    summary:
      "Mevcut kurumun dosyası, mali-idari görünürlüğü ve kurucu değişikliği süreçlerini aynı masada okuyarak; noter sonrası MEB/il hayatında devrin tamamlanması için uçtan uca risk kontrollü devir danışmanlığı.",
    icon: RefreshCw,
    seo: {
      metaTitle:
        "Kurum Devir İşlemleri Danışmanlığı | Ön İnceleme, Risk Analizi ve Başvuru Takibi",
      metaDescription:
        "Özel öğretim kurumu ve benzeri yapılarda devir öncesi dosya taraması, kurucu değişikliği ve başvuru takibi. Noter ile idari süreç ayrımı ve gecikme risklerinin azaltılması.",
      keywords: [
        "kurum devir işlemleri",
        "MEB kurum devri bilgilendirme",
        "kurucu değişikliği başvurusu",
        "özel öğretim kurumu devir",
        "kurum dosyası ön inceleme",
        "devir sözleşmesi ve evrak uyumu",
        "personel ve öğrenci kayıtları devir",
        "SGK vergi risk analizi bilgilendirme",
        "devir danışmanlığı Türkiye",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Devir görüşmesinde taraf sayısı, hisse yapısı ve mevcut kurumun fiili işletme biçimi netleştirilir. Ardından mevcut izin dosyası, yerleşim uygunluğu, personel ve kayıt düzeni başlıklarında risk taraması yapılır. Kritik bulgular kapatılmadan idari başvuru sırasına girilmez. Devir sonrasında yeni kurucu adına düzenlenmesi gereken başlıklar kısa bir uyum listesiyle özetlenir.",
      surec: [
        "Gizlilik çerçevesinde ön bilgi ve devir modelinin anlaşılması",
        "Mevcut kurum dosyası ve müsait belgeler üzerinden ön tarama",
        "Risk özeti ve kapatılması gereken maddelerin önceliklendirilmesi",
        "Ticari hukuk ve idari süreç için eylem planı (paydaş rolleriyle)",
        "Kurucu değişikliği / devir başvuru dosyasının hazırlanması ve takibi",
        "Geri bildirim ve revizyon yönetimi",
        "Devir sonrası kısa uyum kontrol listesi"
      ],
      belgeler: [
        "Mevcut kurum izin ve yazışma özetleri",
        "Tarafların kimlik ve şirket evrakları",
        "Hisse devri veya kurum devrine ilişkin noter ve ek sözleşmeler",
        "Kurucu/kurucu temsilcisi için adli sicil ve diploma seti (kurum türüne göre)",
        "Güncel yerleşim ve mekân kullanım belgeleri",
        "Personel özetleri ve kritik sözleşmeler (kapsama göre)",
        "Mali temsil yetkisi ve imza sirküleri (uygulanabilirse)"
      ]
    },
    guide: {
      lead:
        "Kurum devri çoğu yatırımcıya “hisse devri bitti, kurum bizim” gibi görünür; oysa noter kağıdı ile sınıf kapısının önündeki tabela aynı şey değildir. Mevcut kurumun geçmiş uyumsuzlukları, eksik yazışmaları veya binanın güncel şartlarla çelişen kullanımı yeni kurucunun masasına sessizce taşınabilir. Bu rehber, devirde gözden kaçan başlıkları görünür kılar. Buradaki bilgiler bilgilendirme amaçlıdır; hukuki ve mali konularda ek uzman desteği gerekebilir.",
      sections: [
        {
          id: "devir-yanilsama",
          title: "En Büyük Yanılgı: Noter Bitti Sandığı An",
          paragraphs: [
            "Noterde yapılan düzenleme ticari devrin parçasıdır; kurumun idari nezdindeki kurucu ve yetkili değişiklikleri ise ayrı bir hat üzerinden yürütülür. Bu iki hattın zamanlaması ve sırası projeye göre kritiktir.",
            "“Noter halletti” yaklaşımı ile başvuruya çıkmak, eksik evrakla geri dönmeye ve ödeme takviminin kaymasına yol açabilir.",
            "Danışmanlıkta önce hangi işlemin önce tamamlanması gerektiğini yazılı plana dökeriz."
          ]
        },
        {
          id: "on-inceleme",
          title: "Ön İnceleme: Satın Aldığınız Şey Tabela mı Dosya mı?",
          paragraphs: [
            "Devirde satın alınan varlık çoğu zaman marka ve öğrenci portföyü gibi görünür; fakat aslında taşınan şey mevcut kurumun hukuki ve operasyonel geçmişidir. Bu geçmiş; ruhsat düzeyi, yazışma tutarlılığı ve mekân uygunluğu üzerinden okunmalıdır.",
            "Ön inceleme mümkün olduğunca erken yapılmalıdır; çünkü pazarlık aşamasında keşfedilen bir risk fiyatı ve koşulları değiştirir.",
            "Gizlilik nedeniyle bilgi sınırlı olabilir; bu durumda minimum doğrulama listesi ve teminat mantığı konuşulmalıdır."
          ]
        },
        {
          id: "fiziki-ve-uygunluk",
          title: "Mekân ve Güncel Uygunluk: Kazanılmış Hak Her Zaman Aynı Okunmaz",
          paragraphs: [
            "Devir sonrası bakanlık veya il müdürlüğü süreçlerinde mekânın güncel düzenlemelerle uyumu yeniden tartışılabilir. Bu risk özellikle uzun yıllar aynı binada kalmış kurumlarda artar.",
            "Tadilat, ilave kat veya komşu işyeri değişimi gibi başlıklar dosyada görünmüyorsa soru işareti doğurur.",
            "Ön incelemede mimari ve kullanım değişiklikleri sorulur; gerekiyorsa teknik ön değerlendirme önerilir."
          ]
        },
        {
          id: "personel-ogrenci",
          title: "Personel ve Öğrenci Kayıtları: Süreklilik mi Temiz Sayfa mı?",
          paragraphs: [
            "Personel devri veya yeniden yapılandırma kararı, iş sözleşmeleri ve özlük dosyalarıyla birlikte ele alınmalıdır. Belirsiz bırakılan tazminat ve ihbar yükümlülükleri sonra çıkar.",
            "Öğrenci tarafında kayıt sözleşmeleri, ücret iadeleri ve program sürekliliği pazarlığı etkiler.",
            "Bu başlıklar yalnızca hukuk değil operasyon planının da parçasıdır."
          ]
        },
        {
          id: "mali-idari",
          title: "Mali ve İdari Risk: Geçmiş Kapanmadan Gelecek Açılmaz",
          paragraphs: [
            "Vergi, SGK ve idari para cezalarına ilişkin görünür olmayan yükümlülükler devir sonrası sürpriz doğurabilir. Bu alan danışmanlığın tamamı değildir; ancak süreçte uyarılacak başlıklar olarak not edilmelidir.",
            "Şeffaf olmayan defter kayıtları veya gayri resmi işleyiş, devir fiyatını değil riskini büyütür.",
            "Gerekirse muhasebe ve hukuk ile paralel çalışma önerilir."
          ]
        },
        {
          id: "sozlesme-yapi",
          title: "Devir Sözleşmesi Yapısı: Şartlar, Teminat ve Geri Alma",
          paragraphs: [
            "İyi bir devir sözleşmesi; koşullu ödeme, slayt tarihleri ve temerrüt hallerini netleştirir. “Oldu oldu” sözleşmeleri uzun dava ve kayıpla biter.",
            "Kritik varlıkların (alan adı, öğrenci listesi, materyal envanteri) devri yazılı olmalıdır.",
            "Danışmanlıkta idari başvuru takvimini sözleşme tarihleriyle hizalarız."
          ]
        },
        {
          id: "basvuru-hatti",
          title: "İdari Başvuru Hattı: Dosya Hazır mı, Kim Başvuracak?",
          paragraphs: [
            "Kurucu değişikliği başvurusunda sunulan diplomalar, adli sicil özetleri ve şirket evrakları güncel ve tutarlı olmalıdır.",
            "Başvuru sahibi ile imza yetkilileri netleşmelidir.",
            "Geri dönüşlerde hızlı düzeltme disiplini gecikmeyi azaltır."
          ]
        },
        {
          id: "entegrasyon",
          title: "Devir Sonrası Entegrasyon: İlk 90 Gün Planı",
          paragraphs: [
            "Devir tamamlandıktan sonra kurumsal kimlik, veli iletişimi ve personel eğitimi ile süreklilik sağlanmalıdır.",
            "Kayıt sistemleri ve e-posta erişimleri zamanında devredilmezse operasyon kilitlenir.",
            "Kısa bir 90 günlük entegrasyon kontrol listesi faydalıdır."
          ]
        },
        {
          id: "yanlis-zamanlama",
          title: "Yanlış Zamanlama: Ödemeyi Öne, İmzayı Geriye Almak",
          paragraphs: [
            "Ödeme takvimini idari onaylardan bağımsız kurmak, alıcı için yüksek risktir. Sıra ve koşullar net değilse sürtüşme kaçınılmazdır.",
            "Danışmanlıkta milestone mantığıyla ilerlemek her iki taraf için de daha sağlıklıdır.",
            "Detaylı zaman çizelgesi, sadece hukuk bürosu değil operasyon ekibi tarafından da onaylanmalıdır."
          ]
        },
        {
          id: "sonuc-devir",
          title: "Sonuç: Devir Bir Satın Alma Değil, Kurumsal Geçiş Projesi",
          paragraphs: [
            "Başarılı devir; dosyanın temizliği, sözleşmenin disiplini ve idari hattın takibiyle mümkün olur.",
            "Siz hedef kurumu ve bütçenizi paylaştığınızda biz de risk sırasını ve evrak hattını birlikte çıkarırız.",
            "Ön görüşme ile süreci netleştirmenizi öneririz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "Noterde hisse devri yeterli midir?",
        a: "Ticari tarafta bir adımdır; kurumun idari nezdindeki kurucu ve yetkili değişiklikleri için ayrı başvuru ve onay süreçleri gerekebilir. Proje bazında netleştirilir."
      },
      {
        q: "Devir öncesi neyi mutlaka istemeliyim?",
        a: "Mümkün olan en güncel kurum dosyası özetini, mekân kullanım belgelerini ve personel/öğrenci sürekliliğine dair temel bilgileri. Gizlilik sınırları içinde minimum bir doğrulama listesi hedeflenir."
      },
      {
        q: "Kurum borçları devralır mı?",
        a: "Tüzel yapı ve sözleşme modeline göre değişir. Bu konu mali ve hukuki inceleme gerektirir; danışmanlıkta riskin görünür kılınması için yönlendirme yapılır."
      },
      {
        q: "Mekân değişikliği yapabilir miyim?",
        a: "Yeni adres genellikle ayrı bir uygunluk ve başvuru mantığı doğurur. Devir anında veya sonrasında planlanması takvimi etkiler."
      },
      {
        q: "Öğrenciler kaybolur mu?",
        a: "İletişim ve program sürekliliği yönetilmezse kayıp riski artar. Devir sözleşmesi ve açılış planı bu riski azaltacak şekilde kurgulanmalıdır."
      },
      {
        q: "Süreç ne kadar sürer?",
        a: "Mevcut dosyanın temizliği, tarafların hazırlığı ve idari geri dönüşlere göre değişir. Ön tarama sonrası tahmini takvim paylaşılır."
      },
      {
        q: "Siz hukuk bürosu gibi mi davranıyorsunuz?",
        a: "Hayır. Biz kurum açılışı ve devir proje yönetimi, evrak bütünlüğü ve başvuru disiplininde yanınızdayız. Hukuki ve mali konularda yetkili meslek mensuplarıyla çalışılmasını öneririz."
      },
      {
        q: "Devir garantisi veriyor musunuz?",
        a: "Hayır. Resmî mercilerin kararına bağlıdır. Riskleri erken gösterme ve dosyayı güçlendirme hedefleriz."
      }
    ]
  },
  {
    slug: "diger-danismanlik-turleri",
    title: "Diğer Danışmanlık Türleri",
    summary:
      "Kurum türü gri alanda kalan, birden fazla mevzuatın kesiştiği veya pilot proje niteliğindeki başvurularda; karar defteri, alternatif modeller ve uygulanabilir yol haritası üretmek.",
    icon: Languages,
    seo: {
      metaTitle:
        "Diğer Danışmanlık Türleri | Karma Projeler, Mevzuat Analizi ve Süreç Tasarımı",
      metaDescription:
        "Kurum türü netleşmemiş projelerde mevzuat kesişimi analizi, riskli gri alanların haritalanması, evrak ve takvim disiplini. Özel kapsamlı kurum açılışı danışmanlığı.",
      keywords: [
        "özel kurum açılışı danışmanlığı",
        "mevzuat analizi eğitim",
        "kurum türü seçimi danışmanlık",
        "karma hizmet modeli uyum",
        "proje yönetimi kurum açılışı",
        "evrak kontrol listesi",
        "risk analizi kurum",
        "MEB Kurum Açma Danışmanlık"
      ]
    },
    details: {
      kapsam:
        "Ön görüşmede hedeflenen faaliyetler tek tek yazılır; her biri için olası kurum çerçeveleri ve gri alanlar listelenir. Ardından en az riskli model veya aşamalı geçiş senaryosu önerilir. Paydaş haritası (mimar, hukuk, muhasebe, BT) çıkarılır; evrak ve takvim tek merkezden izlenir. Pilot açılış veya kademeli genişleme gerekiyorsa buna uygun kontrol listesi hazırlanır.",
      surec: [
        "Kapsam haritası ve varsayım listesi",
        "Alternatif kurum modellerinin karşılaştırılması",
        "Seçilen model için gereksinim ve risk özeti",
        "Evrak ve süreç planının oluşturulması",
        "Paydaş koordinasyonu ve durum raporları",
        "Başvuru veya hazırlık aşamasında revizyon yönetimi",
        "Operasyonel uyum için kısa kontrol listesi"
      ],
      belgeler: [
        "Mevcut işletme veya şirket evrakları",
        "Hedef faaliyet tanımı ve örnek program/broşür",
        "Mekân bilgisi veya planlar",
        "Mevcut sözleşmeler ve iş ortaklıkları (varsa)",
        "Personel ve hizmet sunumu özeti",
        "Önceki başvuru veya yazışma örnekleri (varsa)"
      ]
    },
    guide: {
      lead:
        "Bazı projeler baştan “tek bir kurum türü” kutusuna sığmaz. Aynı mekânda farklı yaş gruplarına hitap eden atölyeler, kurumsal anlaşmalı hizmetler veya hibrit eğitim-danışmanlık modelleri gibi kurgular sık görülür. Bu rehberde, belirsizliği azaltmak için kullandığımız çerçeveyi paylaşıyoruz. Nihai model seçimi ve resmî yorumlar yetkili mercilere bağlıdır; biz uygulanabilir plan ve risk görünürlüğü üretiriz.",
      sections: [
        {
          id: "belirsizlik-kaynagi",
          title: "Belirsizliğin Kaynağı: Çoğu Zaman ‘Hepsini Yapalım’ Cümlesi",
          paragraphs: [
            "Karma projelerde risk, kötü niyetten çok kapsam şişmesinden doğar. Aynı anda çok fazla vaat verildiğinde hem mekân hem evrak hem kadro aynı anda yetişmeye çalışır.",
            "İlk adım, vaatleri tek tek yazıp her birinin hangi kurumsal zeminde durduğunu sorgulamaktır.",
            "Bu liste çıktığında “şimdi / sonra / hiç” ayrımı yapmak mümkün olur."
          ]
        },
        {
          id: "alternatif-modeller",
          title: "Alternatif Modeller Tablosu: Artıları Eksileri Görünür Kılın",
          paragraphs: [
            "İki veya üç kurum modelini yan yana koyduğunuzda gereksinim farkları netleşir. Bu tablo yalnızca hukuk değil yatırım ve operasyon kararını da kolaylaştırır.",
            "Bazen en doğru yol, tek seferde büyük model yerine kademeli büyümektir.",
            "Danışmanlıkta bu tabloyu sizinle birlikte doldurur, karar notlarını yazılı bırakırız."
          ]
        },
        {
          id: "gri-alan",
          title: "Gri Alanları Haritalamak: ‘Belki Olur’u Planlamaktan Ayırmak",
          paragraphs: [
            "Her projede gri alan vardır; mesele gri alanı görmezden gelmek değil, yönetilebilir hale getirmektir. Gri alan için B planı veya ek uzman görüşü önceden konuşulmalıdır.",
            "Riskli başlıklar için “varsayım + doğrulama adımı” formatı kullanılır.",
            "Bu yaklaşım hem bütçeyi hem zamanı korur."
          ]
        },
        {
          id: "paydaslar",
          title: "Paydaş Disiplini: Herkes Konuşunca Kimse Takip Etmez",
          paragraphs: [
            "Karma projelerde mimar, hukuk, muhasebe ve pazarlama aynı anda devrededir. Net bir sorumluluk matrisi olmazsa belgeler gecikir.",
            "Danışmanlıkta tek bir iletişim ritmi ve haftalık durum özeti standardı kurarız.",
            "Böylece “kim neyi bekliyor” sorusu cevapsız kalmaz."
          ]
        },
        {
          id: "mvp",
          title: "MVP Mantığı: Önce Ayakta Duran Model, Sonra Genişleme",
          paragraphs: [
            "Pilot açılış veya sınırlı hizmet menüsü ile başlamak, riski düşürür. MVP burada yazılım değil; minimum sürdürülebilir kurum modeli anlamındadır.",
            "Genişleme adımları önceden tanımlanırsa yatırımcı ve ekip aynı dili konuşur.",
            "Bu strateji özellikle yeni segment denemelerinde işe yarar."
          ]
        },
        {
          id: "veri-ve-kvk",
          title: "Veri, CRM ve KVKK: Karma Hizmette İkinci Bir Risk Katmanı",
          paragraphs: [
            "Birden fazla hattın olduğu işletmelerde veri akışı karmaşıklaşır. Hangi veri hangi hizmet için, ne kadar süre saklanır soruları netleşmelidir.",
            "Basit bir veri envanteri çıkarmak bile ileride şikâyet riskini azaltır.",
            "Gerekirse KVK uzmanı ile genişletilir."
          ]
        },
        {
          id: "pazarlama-uyumu",
          title: "Pazarlama Dili ve Uyum: Sitede Yazılan Her Cümle Dosyayı Etkiler",
          paragraphs: [
            "Karma modellerde web sitesi ve sosyal medya metinleri bazen dosyadaki kurum tanımıyla çelişir. Bu çelişki soru işareti doğurur.",
            "İletişim dilini faaliyet tanımıyla hizalamak danışmanlığın parçasıdır.",
            "Özellikle kampanya dönemlerinde kontrol listesi kullanılmalıdır."
          ]
        },
        {
          id: "butce-takvim",
          title: "Bütçe ve Takvim: Paralel Giden İki Ray",
          paragraphs: [
            "Karma projelerde nakit akışı ve belge takvimi birbirini bekler. Bir ray ileri gidip diğeri geride kalırsa proje durur.",
            "Kritik yol analizi mini haliyle bile fayda sağlar.",
            "Danışmanlıkta bu iki rayı aynı tabloda izleriz."
          ]
        },
        {
          id: "olcek",
          title: "Ölçek ve Franchising Düşüncesi: Erken mi Geç mi?",
          paragraphs: [
            "Henüz tek şube bile açılmadan franchising hayali kurmak operasyonu zayıflatır. Ölçek kararı veriyle verilmelidir.",
            "Standart operasyon prosedürü oluşmadan çoğaltmak risklidir.",
            "Danışmanlıkta ölçek adımlarını gerçekçi sıraya koyarız."
          ]
        },
        {
          id: "sonuc-diger",
          title: "Sonuç: Özel Proje, Özel Disiplin Gerektirir",
          paragraphs: [
            "Diğer danışmanlık türleri aslında “standart paketin dışına çıkan” projeler içindir. Bu projelerde başarı, esnek zihinle disiplinli takvimin birleşmesinden gelir.",
            "Siz fikrinizi ve kısıtlarınızı paylaştığınızda biz de seçenekleri ve riskleri sıraya koyarız.",
            "Ön görüşme ile başlamanızı öneririz."
          ]
        }
      ]
    },
    faq: [
      {
        q: "Kurum türüm net değilse ne yapmalıyım?",
        a: "Önce faaliyetleri tek tek yazıp her biri için olası kurumsal çerçeveleri karşılaştırmalısınız. Danışmanlıkta bu çalışmayı birlikte yapar, karar notunu yazılı bırakırız."
      },
      {
        q: "Bu hizmet sadece eğitim kurumları için mi?",
        a: "Hayır. Karma veya özel kapsamlı kurumsallaşma ihtiyacı olan farklı modeller için de uygulanabilir. Ön görüşmede kapsam netleştirilir."
      },
      {
        q: "Birden fazla uzmanlık firmasıyla çalışıyorum, rolünüz ne?",
        a: "Süreç disiplini, kontrol listeleri ve evrak bütünlüğünü sağlamak; paydaşlar arasında kopuklukları erken görmek. Gerekirse toplantı gündemi ve aksiyon takibi formatı sunarız."
      },
      {
        q: "Hukuki görüşü siz veriyor musunuz?",
        a: "Hayır. Mevzuat okuması ve danışmanlık yönlendirmesi yapılır; bağlayıcı hukuki yorum için avukat desteği önerilir."
      },
      {
        q: "Pilot açılış mantıklı mı?",
        a: "Risk yüksek ve belirsizlik fazlaysa kademeli model sık tercih edilir. Operasyonel öğrenme sağlar."
      },
      {
        q: "Ücretlendirme nasıl olur?",
        a: "Kapsam keşfine göre proje bazlı veya aşama bazlı tekliflenir. Ön görüşmede çerçeve konuşulur."
      },
      {
        q: "Uzaktan çalışabilir misiniz?",
        a: "Evet. Doküman ve toplantı odaklı ilerleme mümkündür. Yerinde ihtiyaç varsa planlanır."
      },
      {
        q: "Kesin sonuç garantisi var mı?",
        a: "Hayır. Yetkili merciler ve proje özelinize bağlıdır. Riskleri görünür kılıp planı güçlendiririz."
      }
    ]
  }
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

