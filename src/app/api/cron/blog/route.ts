import { NextRequest, NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/blog/auth";
import { getAllBlogPosts } from "@/lib/blog";
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

  const slotParam = req.nextUrl.searchParams.get("slot");
  const slot = slotParam === "2" ? 1 : 0;
  const autoPublish = process.env.BLOG_AUTO_PUBLISH === "true";

  try {
    const existingPosts = await getAllBlogPosts();
    const topic = pickNextBlogTopic(slot);
    const draft = await generateBlogPostWithGemini(topic, existingPosts);

    const saved = await insertBlogDraft({
      slug: draft.suggestedSlug,
      title: draft.title,
      excerpt: draft.excerpt,
      content: draft.content,
      keywords: draft.keywords,
      coverImage: draft.coverImage
    });

    if (autoPublish) {
      const published = await publishBlogPost(saved.id);
      return NextResponse.json({ topic, slot, post: published, autoPublished: true });
    }

    return NextResponse.json({ topic, slot, post: saved, autoPublished: false });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Cron hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
