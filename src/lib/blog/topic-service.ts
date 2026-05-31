import { getPublishedBlogPosts } from "@/lib/blog";
import { generateWeeklyTopicPlan } from "@/lib/gemini/generate-topics";
import {
  listRecentTopicTexts,
  listSeoKeywords,
  seedDefaultSeoKeywordsIfEmpty
} from "@/lib/blog/topic-db";
import type { GeneratedTopicPlan } from "@/lib/blog/types";

export async function buildWeeklyTopicPool(weekKey: string): Promise<GeneratedTopicPlan[]> {
  await seedDefaultSeoKeywordsIfEmpty();

  const keywords = await listSeoKeywords(true);
  const keywordList =
    keywords.length > 0
      ? keywords.sort((a, b) => b.priority - a.priority).map((k) => k.keyword)
      : [];

  const [existingTopics, publishedPosts] = await Promise.all([
    listRecentTopicTexts(40),
    getPublishedBlogPosts()
  ]);

  return generateWeeklyTopicPlan({
    keywords: keywordList,
    existingTopics,
    publishedTitles: publishedPosts.map((p) => p.title),
    weekKey
  });
}
