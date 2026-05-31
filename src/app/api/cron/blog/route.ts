import { NextRequest, NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/blog/auth";
import { generateBlogPostWithGemini } from "@/lib/gemini/generate-post";
import { insertBlogDraft, isBlogDbConfigured, publishBlogPost } from "@/lib/blog/db";
import { pickNextBlogTopic } from "@/lib/blog/topics";

export async function GET(req: NextRequest) {
  if (!verifyCronRequest(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  if (!isBlogDbConfigured()) {
    return NextResponse.json({ error: "Supabase yapılandırılmamış" }, { status: 503 });
  }

  try {
    const topic = pickNextBlogTopic();
    const draft = await generateBlogPostWithGemini(topic);
    const autoPublish = process.env.BLOG_AUTO_PUBLISH === "true";

    const saved = await insertBlogDraft({
      slug: draft.suggestedSlug,
      title: draft.title,
      excerpt: draft.excerpt,
      content: draft.content,
      keywords: draft.keywords
    });

    if (autoPublish) {
      const published = await publishBlogPost(saved.id);
      return NextResponse.json({ topic, post: published, autoPublished: true });
    }

    return NextResponse.json({ topic, post: saved, autoPublished: false });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Cron hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
