import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/blog/auth";
import { generateBlogPostWithGemini } from "@/lib/gemini/generate-post";
import { insertBlogDraft, isBlogDbConfigured } from "@/lib/blog/db";
import { slugify } from "@/lib/blog/slug";

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { topic?: string; save?: boolean };
    const topic = body.topic?.trim();
    if (!topic || topic.length < 10) {
      return NextResponse.json({ error: "Konu en az 10 karakter olmalı." }, { status: 400 });
    }

    const draft = await generateBlogPostWithGemini(topic);
    const slug = draft.suggestedSlug || slugify(draft.title);

    if (body.save) {
      if (!isBlogDbConfigured()) {
        return NextResponse.json(
          {
            error: "Kayıt için Supabase gerekli. Vercel ortam değişkenlerini ekleyin veya save:false ile önizleme alın.",
            draft
          },
          { status: 503 }
        );
      }
      const saved = await insertBlogDraft({
        slug,
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        keywords: draft.keywords
      });
      return NextResponse.json({ draft, saved });
    }

    return NextResponse.json({ draft, slug });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Üretim hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
