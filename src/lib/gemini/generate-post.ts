import type { GeneratedBlogDraft } from "@/lib/blog/types";
import { buildInternalLinkContext } from "@/lib/blog/internal-links";
import { injectBlogImages, resolveBlogImages } from "@/lib/blog/resolve-images";
import { slugify } from "@/lib/blog/slug";
import { getGeminiModel } from "@/lib/gemini/client";
import type { BlogPost } from "@/lib/blog/types";

const SYSTEM_PROMPT = `Sen Türkiye'de özel öğretim kurumu açma danışmanlığı veren bir kurumun içerik yazarısın.
Yanıtın YALNIZCA geçerli JSON olmalı; markdown kod bloğu veya açıklama ekleme.

Kurallar:
- Dil: Türkçe, kurumsal ve anlaşılır
- Konu MEB, özel öğretim kurumları, kurum açma, evrak, denetim, özel eğitim vb. ile ilgili olmalı
- "%100 onay garantisi", "kesin ruhsat" gibi ifadeler KULLANMA
- Son paragrafta bilgilendirme amaçlı olduğunu ve güncel mevzuat için uzman görüşü alınması gerektiğini belirt
- content alanı markdown formatında; H2/H3 başlıklar, madde işaretleri kullan
- 800-1200 kelime civarı
- keywords: 5-8 SEO anahtar kelimesi dizisi
- İçerikte en az 2 adet site içi link kullan (aşağıdaki URL listesinden seç)
- İçerikte en az 1 adet görsel ekle: ![açıklayıcı alt metin](IMAGE_INLINE_1) formatında
- İkinci bölümde bir görsel daha eklenebilir: ![alt metin](IMAGE_INLINE_2)
- imageQueries: İngilizce, konuya özel 3 arama/üretim ifadesi (cover, inline1, inline2)`;

function extractJson(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) return text.slice(start, end + 1);
  return text.trim();
}

export async function generateBlogPostWithGemini(
  topic: string,
  existingPosts: BlogPost[] = []
): Promise<GeneratedBlogDraft> {
  const model = getGeminiModel();
  const linkContext = buildInternalLinkContext(existingPosts);

  const prompt = `${SYSTEM_PROMPT}

Site içi link seçenekleri (mutlaka 2-4 tane kullan):
${linkContext}

Konu: ${topic}

JSON şeması:
{
  "title": "string",
  "excerpt": "string (max 160 karakter)",
  "content": "string (markdown gövde, IMAGE_INLINE_1 ve IMAGE_INLINE_2 placeholder kullan)",
  "keywords": ["string"],
  "imageQueries": {
    "cover": "English search phrase for main cover photo",
    "inline1": "English phrase for first inline image",
    "inline2": "English phrase for second inline image"
  }
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const parsed = JSON.parse(extractJson(raw)) as {
    title: string;
    excerpt: string;
    content: string;
    keywords: string[];
    imageQueries?: { cover?: string; inline1?: string; inline2?: string };
  };

  if (!parsed.title || !parsed.content) {
    throw new Error("Gemini yanıtı eksik alan içeriyor.");
  }

  const keywords = Array.isArray(parsed.keywords) ? parsed.keywords.map(String) : [];
  const suggestedSlug = slugify(parsed.title);

  const images = await resolveBlogImages({
    slug: suggestedSlug,
    title: parsed.title,
    topic,
    keywords,
    imageQueries: parsed.imageQueries
  });

  const content = injectBlogImages(parsed.content.trim(), images);

  return {
    title: parsed.title.trim(),
    excerpt: parsed.excerpt.trim(),
    content,
    keywords,
    suggestedSlug,
    coverImage: images.coverImage
  };
}
