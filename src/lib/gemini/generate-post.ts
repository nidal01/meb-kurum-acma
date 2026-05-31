import type { GeneratedBlogDraft } from "@/lib/blog/types";
import { slugify } from "@/lib/blog/slug";
import { getGeminiModel } from "@/lib/gemini/client";

const SYSTEM_PROMPT = `Sen Türkiye'de özel öğretim kurumu açma danışmanlığı veren bir kurumun içerik yazarısın.
Yanıtın YALNIZCA geçerli JSON olmalı; markdown kod bloğu veya açıklama ekleme.

Kurallar:
- Dil: Türkçe, kurumsal ve anlaşılır
- Konu MEB, özel öğretim kurumları, kurum açma, evrak, denetim, özel eğitim vb. ile ilgili olmalı
- "%100 onay garantisi", "kesin ruhsat" gibi ifadeler KULLANMA
- Son paragrafta bilgilendirme amaçlı olduğunu ve güncel mevzuat için uzman görüşü alınması gerektiğini belirt
- content alanı markdown formatında; H2/H3 başlıklar, madde işaretleri kullan
- 800-1200 kelime civarı
- keywords: 5-8 SEO anahtar kelimesi dizisi`;

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

export async function generateBlogPostWithGemini(topic: string): Promise<GeneratedBlogDraft> {
  const model = getGeminiModel();

  const prompt = `${SYSTEM_PROMPT}

Konu: ${topic}

JSON şeması:
{
  "title": "string",
  "excerpt": "string (max 160 karakter)",
  "content": "string (markdown gövde)",
  "keywords": ["string"]
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const parsed = JSON.parse(extractJson(raw)) as {
    title: string;
    excerpt: string;
    content: string;
    keywords: string[];
  };

  if (!parsed.title || !parsed.content) {
    throw new Error("Gemini yanıtı eksik alan içeriyor.");
  }

  return {
    title: parsed.title.trim(),
    excerpt: parsed.excerpt.trim(),
    content: parsed.content.trim(),
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [],
    suggestedSlug: slugify(parsed.title)
  };
}
