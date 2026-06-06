import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWwwSiteUrl } from "@/lib/sitemap";

/**
 * AI / LLM botları — Yapay zeka asistanlarının (ChatGPT, Gemini, Claude, Perplexity vb.)
 * "MEB Oyun Evi" varlığını kaynak olarak gösterebilmesi için açıkça izin verilir.
 * Sıralama; talep edilen kritik botlar (GPTBot, ChatGPT-User, Google-Extended,
 * anthropic-ai, PerplexityBot) önce gelecek şekilde düzenlenmiştir.
 */
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "anthropic-ai",
  "PerplexityBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai",
  "CCBot",
  "Diffbot",
  "FacebookBot",
  "Amazonbot"
] as const;

export default function robots(): MetadataRoute.Robots {
  // Yapay zeka botlarının da görmemesi gereken özel/dahili alanlar.
  const disallow = ["/arama", "/admin", "/api"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow
      }))
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-www.xml`,
      `${getWwwSiteUrl()}/sitemap-www.xml`
    ],
    host: SITE_URL
  };
}
