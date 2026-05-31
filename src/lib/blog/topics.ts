/** Cron ve otomatik üretim için konu havuzu */
export const BLOG_TOPICS = [
  "Özel eğitim ve rehabilitasyon merkezi açılışında bina ve bağımsız giriş şartları",
  "MEB kurum açma başvurusunda en sık eksik kalan evraklar",
  "Özel öğretim kurumları yönetmeliğine göre kurum açma izni süreci",
  "Çocuk oyun evi ile MEB anaokulu arasındaki farklar ve ruhsat yolu",
  "Psikolojik danışmanlık merkezi kurulumunda gizlilik ve kayıt düzeni",
  "Dil konuşma ve ergoterapi merkezi açılışında kadro ve oda planı",
  "Kiralık binada özel öğretim kurumu açarken dikkat edilecekler",
  "Kurum devir işlemlerinde noter sonrası idari başvuru adımları",
  "Denetim öncesi kontrol listesi: fiziki şartlar ve evrak bütünlüğü",
  "Özel eğitim okulu ile rehabilitasyon merkezi: hangi kurum türü seçilmeli"
] as const;

export function pickNextBlogTopic(): string {
  const index = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)) % BLOG_TOPICS.length;
  return BLOG_TOPICS[index];
}
