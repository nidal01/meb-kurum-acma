import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { getAllBlogPosts } from "@/lib/blog";
import { insertBlogPost, isBlogDbConfigured } from "@/lib/blog/db";
import { slugify } from "@/lib/blog/slug";
import { generateBlogPostWithGemini } from "@/lib/gemini/generate-post";

export async function POST(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "posts:create")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const body = (await req.json()) as { topic?: string; save?: boolean };
    const topic = body.topic?.trim();
    if (!topic || topic.length < 10) {
      return NextResponse.json({ error: "Konu en az 10 karakter olmalı." }, { status: 400 });
    }

    const existingPosts = await getAllBlogPosts();
    const draft = await generateBlogPostWithGemini(topic, existingPosts);
    const slug = draft.suggestedSlug || slugify(draft.title);

    if (body.save) {
      if (!isBlogDbConfigured()) {
        return NextResponse.json(
          { error: "Kayıt için Supabase gerekli.", draft },
          { status: 503 }
        );
      }
      const saved = await insertBlogPost({
        slug,
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        keywords: draft.keywords,
        coverImage: draft.coverImage,
        authorId: session.userId,
        status: "draft"
      });
      return NextResponse.json({ draft, saved });
    }

    return NextResponse.json({ draft, slug });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Üretim hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
