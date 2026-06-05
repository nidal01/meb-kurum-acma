import { getAllBlogPosts } from "@/lib/blog";
import { generateBlogPostWithGemini } from "@/lib/gemini/generate-post";
import { insertBlogDraft, isBlogDbConfigured, publishBlogPost } from "@/lib/blog/db";
import { markTopicUsed, pickTopicForSlot } from "@/lib/blog/topic-db";
import { pickNextBlogTopic } from "@/lib/blog/topics";
import { notifyBlogPostPublished } from "@/lib/seo/notify";

export type BlogCronResult = {
  topic: string;
  slot: number;
  post: Awaited<ReturnType<typeof insertBlogDraft>>;
  autoPublished: boolean;
};

export async function runBlogCron(slot: 0 | 1): Promise<BlogCronResult> {
  if (!isBlogDbConfigured()) {
    throw new Error("Supabase yapılandırılmamış");
  }

  const autoPublish = process.env.BLOG_AUTO_PUBLISH === "true";
  const existingPosts = await getAllBlogPosts();
  const picked = await pickNextBlogTopic(slot);
  const topic = picked.topic;

  const draft = await generateBlogPostWithGemini(topic, existingPosts);

  const saved = await insertBlogDraft({
    slug: draft.suggestedSlug,
    title: draft.title,
    excerpt: draft.excerpt,
    content: draft.content,
    keywords: draft.keywords,
    coverImage: draft.coverImage
  });

  if (picked.topicPoolId) {
    await markTopicUsed(picked.topicPoolId, saved.id);
  } else {
    const poolItem = await pickTopicForSlot(slot);
    if (poolItem && poolItem.topic === topic) {
      await markTopicUsed(poolItem.id, saved.id);
    }
  }

  if (autoPublish) {
    const published = await publishBlogPost(saved.id);
    notifyBlogPostPublished(published.slug).catch((err) =>
      console.error("[cron] arama motoru bildirimi başarısız:", err)
    );
    return { topic, slot, post: published, autoPublished: true };
  }

  return { topic, slot, post: saved, autoPublished: false };
}
