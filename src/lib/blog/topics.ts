/** Cron ve otomatik üretim için yedek konu havuzu (DB yoksa) */
export const BLOG_TOPICS_FALLBACK = [
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

export async function pickNextBlogTopic(slot = 0): Promise<{ topic: string; topicPoolId: string | null }> {
  try {
    const { pickTopicForSlot } = await import("@/lib/blog/topic-db");
    const { getSlotOrder } = await import("@/lib/blog/week");
    const item = await pickTopicForSlot(slot as 0 | 1);

    if (item) {
      return { topic: item.topic, topicPoolId: item.id };
    }

    // Bu hafta için slot boşsa yedek: aynı slot_order'daki used/skipped veya fallback
    const { listTopicPool } = await import("@/lib/blog/topic-db");
    const { getIsoWeekKey } = await import("@/lib/blog/week");
    const pool = await listTopicPool(getIsoWeekKey());
    const slotOrder = getSlotOrder(slot as 0 | 1);
    const anyForSlot = pool.find((p) => p.slotOrder === slotOrder);
    if (anyForSlot) return { topic: anyForSlot.topic, topicPoolId: null };
  } catch {
    // Supabase yoksa fallback
  }

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const index = (dayIndex * 2 + slot) % BLOG_TOPICS_FALLBACK.length;
  return { topic: BLOG_TOPICS_FALLBACK[index], topicPoolId: null };
}

/** @deprecated BLOG_TOPICS_FALLBACK kullanın */
export const BLOG_TOPICS = BLOG_TOPICS_FALLBACK;
