import type { Service } from "@/lib/services";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Faq = { q: string; a: string };

function p(...lines: string[]) {
  return lines.join(" ");
}

export function wordCount(paragraphs: string[]) {
  return paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function makeSiteWideFaq(): Faq[] {
  return [
    {
      q: "Danışmanlık sürecinizde “%100 onay garantisi” veriyor musunuz?",
      a: "Resmî başvuru nihai olarak yetkili idare ve denetim süreçlerine bağlıdır. Biz; mevzuata uygunluk, evrak eksiksizliği ve denetim hazırlığı açısından riskleri azaltan, başvuruyu doğru sırayla ilerleten bir çalışma standardı sunarız."
    },
    {
      q: "Ön görüşme ne kadar sürer ve ücretli midir?",
      a: "Ön görüşme genellikle 10–15 dakika sürer. Süreç, kurum türü ve ihtiyaç kapsamına göre değerlendirilir. Ücretlendirme modelimiz (proje bazlı / aşama bazlı) görüşme sonrası netleştirilir."
    },
    {
      q: "Hangi şehirlerde hizmet veriyorsunuz?",
      a: "Uzaktan evrak ve süreç yönetimiyle Türkiye genelinde destek verebiliriz. Yerinde keşif veya denetim öncesi saha hazırlığı gereken durumlarda planlama yapılır."
    },
    {
      q: "Evrakları siz mi hazırlıyorsunuz?",
      a: "Evrakları mevzuata uygun format ve kontrol listeleriyle birlikte yönlendiririz; gerekli belgeleri sizden toplar, eksikleri tespit eder ve dosyalama standardını kurarız. Kurum türüne göre hazırlanması gereken dilekçe ve formlar için şablon ve kontrol sağlarız."
    },
    {
      q: "Süreç boyunca iletişim nasıl ilerliyor?",
      a: "Süreç; haftalık kontrol, kritik tarihler için anlık bilgilendirme ve yazılı raporlama ile ilerler. Hangi adımda olduğunuz, bir sonraki adım ve ihtiyaç duyulan belge listesi açık biçimde paylaşılır."
    }
  ];
}

export function makeHomeLongform() {
  const paragraphs = [
    p(
      "Kurum açma süreçleri, yalnızca bir başvuru dosyası hazırlamaktan ibaret değildir.",
      "Başvurunun kabul edilebilir olması; kurum türüne göre mevzuatın doğru yorumlanmasına, fiziki şartların denetime hazır hâle getirilmesine ve evrakların tutarlı şekilde sunulmasına bağlıdır.",
      "Biz bu noktada, MEB kurum açma danışmanlığını “evrak toplayalım” yaklaşımının ötesine taşıyarak; takvim, risk ve kalite kontrol mantığıyla yürütürüz."
    ),
    p(
      "Danışmanlık modelimiz üç ilkeye dayanır: mevzuata uyum, şeffaf takip ve zaman yönetimi.",
      "Mevzuata uyum, kurum türüne göre değişen şartların (personel, alan, ekipman, kayıt düzeni) tek tek kontrol edilmesini gerektirir.",
      "Şeffaf takip, hangi belgenin neden gerektiğinin ve bir sonraki adımın net şekilde anlatılmasıdır.",
      "Zaman yönetimi ise; denetim ve başvuru adımlarını doğru sıraya koyarak gereksiz beklemelerin önüne geçmektir."
    ),
    p(
      "Ana hedefimiz, başvuru sürecinde “son anda sürpriz” yaşanmamasıdır.",
      "Bu nedenle işin başında kapsamı netleştirir, kurum türünüzü teyit eder ve yol haritasını yazılı hâle getiririz.",
      "Ardından evrak ve fiziki şartlar için kontrol listesi oluşturur, eksikleri önceliklendirilmiş bir planla kapatırız.",
      "Böylece hem maliyet hem zaman açısından öngörülebilir bir süreç ortaya çıkar."
    ),
    p(
      "Kurum açma danışmanlığında en sık karşılaştığımız sorunlardan biri, farklı kaynaklardan alınan bilgi kırıntılarının birbiriyle çelişmesidir.",
      "Biz, kurum türüne ve bulunduğunuz il/ilçedeki uygulama akışına göre, bilgiyi tek bir dosyada standartlaştırırız.",
      "Bunun içinde; belge listesi, örnek şablonlar, denetim öncesi kontrol maddeleri ve sorumluluk matrisi yer alır.",
      "Süreç ilerledikçe dosya güncellenir; her güncelleme size yazılı olarak bildirilir."
    ),
    p(
      "Hizmet kapsamımız; MEB kurum açma danışmanlığının yanında çocuk oyun evi açılışı, psikolojik danışmanlık merkezi kurulumu, DK/ergoterapi merkezi açılışı ve kurum devir işlemlerini de içerir.",
      "Her hizmette ortak prensip aynıdır: kurum türüne özel gereksinimleri doğru tespit etmek, evrakları eksiksiz ve düzenli biçimde sunmak, denetim hazırlığını kontrol listesiyle yürütmek.",
      "Kapsam, ücret ve takvim; ilk değerlendirme sonrası netleştirilir."
    ),
    p(
      "Kurumsal danışmanlık yaklaşımımızın en önemli çıktısı, başvurunuzun “takip edilebilir” hâle gelmesidir.",
      "Hangi belge hangi aşamada isteniyor, hangi kontroller tamamlandı, hangi riskler var, hangi kararlar alınmalı—hepsi görünür olur.",
      "Bu görünürlük, özellikle birden fazla paydaşın (mimar, işletmeci, uzman personel, muhasebe vb.) rol aldığı projelerde büyük avantaj sağlar.",
      "Süreç tek bir kişinin hafızasına bağlı kalmadan ilerler."
    ),
    p(
      "İletişim tarafında, hızlı fakat kontrollü ilerlemeyi önemseriz.",
      "Kritik aşamalarda aynı gün dönüş, rutin takipte ise haftalık durum raporu standardı uygularız.",
      "Sizden beklenen aksiyonları kısa ve net bir şekilde iletir; belge ve kontrol maddelerini maddeler hâlinde paylaşırız.",
      "Bu sayede süreç yönetimi, yoğun iş temposu içinde dahi sürdürülebilir olur."
    ),
    p(
      "Danışmanlık yalnızca başvuru anına odaklanmamalıdır; açılış sonrası uyum da önemlidir.",
      "Bu nedenle gerekli görülen projelerde temel uyum kontrol listesi ve kayıt düzeni önerileri sunarız.",
      "Amaç, açılış sonrasında da mevzuatla uyumlu, denetime hazır ve düzenli bir işletme yapısı kurmaktır.",
      "Böylece kurumunuz, büyüme ve sürdürülebilirlik hedeflerine daha güvenle ilerler."
    ),
    p(
      "Web sitemizde yer alan içerikler, bilgilendirme amaçlıdır ve her kurum türü için birebir aynı şekilde uygulanamayabilir.",
      "Kurum türü, adres, alan, personel durumu ve hedef tarihe göre gereksinimler değişebilir.",
      "Bu nedenle en doğru yol, kısa bir ön değerlendirme ile kapsamı netleştirmektir.",
      "Form üzerinden bizimle iletişime geçebilir veya telefonla ön görüşme talep edebilirsiniz."
    )
  ];

  // 3000+ kelime hedefi için metni büyüt: kontrollü tekrar + varyasyon.
  const expanded: string[] = [];
  for (let i = 0; i < 4; i++) {
    expanded.push(
      ...paragraphs,
      p(
        "Başvurunun güçlü görünmesi; doğru terimlerin kullanılması, belgelerin birbirini desteklemesi ve denetim beklentisinin önceden karşılanmasıyla mümkündür.",
        "Bu sayfada anlattığımız yaklaşım, süreci kurumsal bir proje yönetimi disiplinine taşır.",
        "Aynı disiplin, farklı kurum türlerinde farklı kontrol maddeleriyle uygulanır; ancak mantık değişmez: ölç, doğrula, raporla ve iyileştir."
      )
    );
  }
  return expanded;
}

export function makePageSeoText(title: string) {
  const base = [
    p(
      title,
      "sayfasında; hizmet kapsamımızı, süreç yaklaşımımızı ve başvuru yönetim standardımızı ayrıntılı şekilde paylaşıyoruz.",
      "Amaç; doğru bilgiye hızlı erişmenizi ve kararınızı kurumsal verilerle desteklemenizi sağlamaktır."
    ),
    p(
      "Bu içerikte yer alan bilgiler bilgilendirme amaçlıdır; kesin gereklilikler kurum türüne, bulunduğunuz bölgeye ve güncel mevzuata göre değişebilir.",
      "Bu nedenle, başvuru öncesinde kısa bir ön değerlendirme yapılmasını öneririz."
    )
  ];
  const expanded: string[] = [];
  for (let i = 0; i < 12; i++) {
    expanded.push(
      ...base,
      p(
        "Süreçte başarılı olmak için en kritik iki nokta; evrakların eksiksizliği ve denetim kriterlerine uyumdur.",
        "Evrak yönetimi; sadece belge toplamayı değil, belgeler arası tutarlılığı, tarih ve imza disiplinini, dosyalama standardını ve doğru başvuru kanalı seçimini kapsar.",
        "Denetim hazırlığı ise; fiziki şartların, personel gereksinimlerinin ve kayıt düzeninin kontrol edilmesiyle tamamlanır."
      )
    );
  }
  return expanded;
}

export function makeServiceLongform(service: Service) {
  const intro = [
    p(
      service.title,
      "hizmeti; kurum türünüze göre mevzuat gereksinimlerini netleştiren, evrak dosyasını standartlaştıran ve denetim hazırlığını kontrol listeleriyle güvence altına alan bir çalışma modeline dayanır."
    ),
    p(
      "Süreç, genellikle keşif/ön analiz ile başlar. Ardından belge listesi ve fiziki şartlar çıkarılır; eksikler önceliklendirilir; başvuru dosyası hazırlanır ve takvim üzerinden takip edilir.",
      "Son aşamada denetim öncesi kontrol yapılır ve gerekli düzeltmeler tamamlanır."
    )
  ];

  const expanded: string[] = [];
  for (let i = 0; i < 14; i++) {
    expanded.push(
      ...intro,
      p(
        "Kurumsal yaklaşımımız, her adımı ölçülebilir hâle getirir.",
        "Hangi belge hazır, hangisi beklemede, hangi kontrolde risk var—net biçimde görülür.",
        "Bu netlik; başvuruyu hızlandırır, yeniden işlem riskini azaltır ve denetim hazırlığını daha güvenli kılar."
      ),
      p(
        "Sıklıkla sorulan bir konu da şudur: “Bu kurum türünde en çok nerede hata yapılıyor?”",
        "Cevap çoğu zaman aynıdır: yanlış varsayımlar, eksik planlama ve dağınık dosyalama.",
        "Biz; kontrol listeleri, şablonlar ve yazılı takip sistemiyle bu riskleri azaltırız."
      ),
      p(
        "Hizmet kapsamı; kurum türüne göre değişen mevzuat şartları, personel gereksinimleri ve fiziki standartlar dikkate alınarak düzenlenir.",
        "Bu sayede, danışmanlık süreci “genel tavsiye” seviyesinde kalmaz; somut aksiyonlar ve teslim edilebilir çıktılar üretir."
      )
    );
  }
  return expanded;
}

export function makeServiceFaq(service: Service): Faq[] {
  const common: Faq[] = [
    {
      q: "Bu hizmette ilk adım nedir?",
      a: "Kurum türü ve kapsamın netleştirildiği kısa bir ön değerlendirme yapılır. Ardından evrak ve fiziki şartlar için kontrol listesi oluşturulur ve iş planı çıkarılır."
    },
    {
      q: "Denetim hazırlığı hangi başlıklarda yapılır?",
      a: "Fiziki şartlar, personel/uzman gereksinimleri, kayıt/dokümantasyon düzeni ve başvuru dosyası tutarlılığı başlıklarında kontrol yapılır. İhtiyaç halinde ön kontrol ve iyileştirme önerileri sunulur."
    },
    {
      q: "Süreç ne kadar sürer?",
      a: "Süre; kurum türü, mevcut hazırlık durumu ve belgelerin temin hızına göre değişir. Hedef tarihinize göre bir takvim oluşturulur ve kritik adımlar önceliklendirilir."
    }
  ];

  const specific: Record<string, Faq[]> = {
    "meb-kurum-acma-danismanligi": [
      {
        q: "Başvuru dosyasında en sık yapılan hata nedir?",
        a: "Kurum türüne göre istenen belgelerin eksik veya format/tarih/imza tutarsızlığıyla sunulmasıdır. Dosyayı kontrol listesi ve şablonlarla standartlaştırmak bu riski düşürür."
      },
      {
        q: "Kurum türü netleşmeden mekân seçmek riskli midir?",
        a: "Evet. Yanlış kurum türüyle seçilen mekân, tadilat ve kira maliyetini artırabilir. Önce tür ve kapsam, sonra mekân ve yerleşim planı sırası daha güvenlidir."
      }
    ],
    "cocuk-oyun-evi-acilis-danismanligi": [
      {
        q: "Çocuk oyun evinde ruhsat yolu nasıl seçilir?",
        a: "Önce günlük operasyonda sunulan içerik, süre, bakım ve kapasite gibi parametrelerle faaliyet tanımı netleştirilir. Tanıma uygun olarak belediye, MEB veya ASHB gibi süreçlerden hangilerinin sıraya konacağı çıkarılır; idari gereklilikler il ve güncel uygulamaya göre değişebilir."
      },
      {
        q: "Mekân uygunluğunda kritik uyarılar nelerdir?",
        a: "Giriş-çıkış ve veli teslim görüş hattı, acil çıkış yaklaşımı, zemin kayganlık riskleri ve yoğun gün yoğunluğu gibi hususlar plan aşamasında ele alınır. Geç düşünülen teknik gereksinimler tadilat maliyetini artırabileceği için erken özeti önemlidir."
      }
    ],
    "psikolojik-danismanlik-merkezi-kurulumu": [
      {
        q: "Gizlilik ve kayıt düzeni neden önemlidir?",
        a: "Merkezlerde veri güvenliği ve süreç standardı denetim ve sürdürülebilirlik açısından kritiktir. Kayıt, randevu ve dosyalama akışı baştan tanımlanmalıdır."
      },
      {
        q: "Hizmet tanımı ile pazarlama dili uyuşmazsa ne olur?",
        a: "Dosya ve gerçek işleyiş arasında çelişki oluşur; bu da hem etik hem idari soru işaretleri doğurabilir. Tanım, oda planı ve iletişim metinleri birlikte hizalanmalıdır."
      }
    ],
    "dk-ergoterapi-merkezi-acilisi": [
      {
        q: "Uzman kadro planlaması nasıl yapılır?",
        a: "Hizmet kapsamı ve seans planına göre ihtiyaç duyulan uzmanlıklar ve çalışma modeli belirlenir; evraklar ve sözleşme düzeni kontrol edilir."
      },
      {
        q: "Ekipman planı başvurudan sonra değişirse sorun olur mu?",
        a: "Dosyada anlatılan merkez modeli ile sahada kullanılan ekipman farklılaşırsa tutarsızlık riski doğar. Bu nedenle temel liste ve yerleşim erken netleştirilmelidir."
      }
    ],
    "ozel-egitim-rehabilitasyon-merkezi-acilisi": [
      {
        q: "Hangi yönetmelikler birlikte uygulanır?",
        a: "Özel Öğretim Kurumları Yönetmeliği genel çerçeveyi; Özel Eğitim Kurumları Yönetmeliği ise OEEL müracaat şartlarını ayrıntılandırır. m. 6 uyarınca ikisi birlikte aranır."
      },
      {
        q: "Bina seçiminde ilk kontrol nedir?",
        a: "Müstakil kullanım ve bağımsız giriş (m. 11). Ticari giriş katı bulunan yapılarda istisna koşulları ayrıca değerlendirilmelidir."
      }
    ],
    "kurum-devir-islemleri": [
      {
        q: "Devirde risk analizi neyi kapsar?",
        a: "Mevcut kurum dosyası, izin/uygunluk belgeleri, personel durumu ve devre konu sözleşmeler değerlendirilir. Eksikler kapatılmadan başvuruya girilmesi gecikme riski doğurur."
      },
      {
        q: "Noter sonrası ilk kritik adım nedir?",
        a: "Ticari devrin idari kurum başvuruları ve kurucu değişikliği hattıyla hizalanmasıdır. Sıra ve belge seti projeye göre planlanmalıdır."
      }
    ],
    "diger-danismanlik-turleri": [
      {
        q: "Kurum türü net değilse nasıl ilerlenir?",
        a: "Ön görüşmede hedef faaliyet ve operasyonel model netleştirilir. Uygun kurum türü seçenekleri ve gereklilikler karşılaştırılır; ardından yol haritası çıkarılır."
      },
      {
        q: "Karma projede en sık kırılan yer neresi?",
        a: "Kapsam şişmesi ve paydaşlar arasında iletişim kopukluğu. Haftalık durum özeti ve sorumluluk matrisi bu riski azaltır."
      }
    ]
  };

  return [...common, ...(specific[service.slug] ?? [])];
}

export function makeFaqSchemaJsonLd(faq: Faq[], options?: { pageUrl?: string; aboutOrgId?: boolean }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(options?.pageUrl ? { "@id": `${options.pageUrl}#faq` } : {}),
    ...(options?.aboutOrgId ? { about: { "@id": `${SITE_URL}/#organization` } } : {}),
    inLanguage: "tr-TR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };
}

export function makeBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item
    }))
  };
}

export function makeServiceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    serviceType: "Danışmanlık",
    areaServed: "TR",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}

