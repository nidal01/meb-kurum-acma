import { getGeminiModel } from "@/lib/gemini/client";
import type { GeneratedTopicPlan } from "@/lib/blog/types";
import { TOPICS_PER_WEEK } from "@/lib/blog/week";

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  const objStart = text.indexOf("{");
  const objEnd = text.lastIndexOf("}");
  if (objStart >= 0 && objEnd > objStart) return text.slice(objStart, objEnd + 1);
  return text.trim();
}

export async function generateWeeklyTopicPlan(input: {
  keywords: string[];
  existingTopics: string[];
  publishedTitles: string[];
  weekKey: string;
}): Promise<GeneratedTopicPlan[]> {
  const model = getGeminiModel();

  const prompt = `Sen Türkiye'de özel öğretim kurumu açma danışmanlığı veren bir sitenin SEO stratejistisin.
Yanıtın YALNIZCA geçerli JSON olmalı.

Görev: ${TOPICS_PER_WEEK} adet blog konusu planla (haftalık 7 gün × günde 2 yazı).
Her konu hedef anahtar kelimeye odaklanmalı ve Google'da üst sıralara çıkmaya uygun olmalı.

Kurallar:
- Konular Türkçe, spesifik ve arama niyetine uygun (bilgilendirme/rehber)
- Her konu farklı bir hedef anahtar kelimeye hizmet etsin
- Öncelik: yüksek priority kelimeler daha çok kullanılsın
- "%100 onay garantisi" gibi ifadeler KULLANMA
- Mevcut konu/yazı başlıklarını TEKRARLAMA
- Konular MEB, kurum açma, özel eğitim, evrak, denetim alanında kalsın
- slotOrder 0-${TOPICS_PER_WEEK - 1} arası benzersiz olmalı (0=Pazartesi sabah, 1=Pazartesi öğleden sonra …)

Hafta: ${input.weekKey}

Hedef anahtar kelimeler:
${input.keywords.map((k) => `- ${k}`).join("\n")}

Daha önce planlanan/üretilen konular (tekrarlama):
${input.existingTopics.slice(0, 30).map((t) => `- ${t}`).join("\n") || "- yok"}

Yayınlanmış yazı başlıkları (tekrarlama):
${input.publishedTitles.slice(0, 30).map((t) => `- ${t}`).join("\n") || "- yok"}

JSON şeması (dizi):
[
  {
    "topic": "string (blog yazısı konusu, min 20 karakter)",
    "targetKeyword": "string (hedef SEO kelimesi)",
    "seoRationale": "string (neden bu konu sıralama getirir, max 120 karakter)",
    "slotOrder": 0
  }
]`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const parsed = JSON.parse(extractJson(raw)) as GeneratedTopicPlan[] | { topics?: GeneratedTopicPlan[] };

  const items = Array.isArray(parsed) ? parsed : (parsed.topics ?? []);
  if (items.length < TOPICS_PER_WEEK) {
    throw new Error(`Gemini yeterli konu üretmedi (${items.length}/${TOPICS_PER_WEEK}).`);
  }

  const seen = new Set<number>();
  return items.slice(0, TOPICS_PER_WEEK).map((item, i) => {
    const slotOrder = typeof item.slotOrder === "number" ? item.slotOrder : i;
    if (seen.has(slotOrder)) throw new Error("slotOrder çakışması.");
    seen.add(slotOrder);
    return {
      topic: String(item.topic).trim(),
      targetKeyword: String(item.targetKeyword ?? input.keywords[i % input.keywords.length]).trim(),
      seoRationale: String(item.seoRationale ?? "").trim(),
      slotOrder
    };
  });
}
