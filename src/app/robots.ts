import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "cohere-ai"
] as const;

export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
