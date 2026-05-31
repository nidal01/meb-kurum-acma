import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/lib/blog/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getStaticBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug as string) ?? file.replace(/\.(mdx|md)$/, "");

    return {
      id: `static-${slug}`,
      slug,
      title: String(data.title ?? slug),
      excerpt: String(data.excerpt ?? ""),
      content,
      status: (data.status as BlogPost["status"]) ?? "published",
      keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
      createdAt: String(data.date ?? new Date().toISOString()),
      publishedAt: data.status === "draft" ? null : String(data.date ?? new Date().toISOString()),
      source: "static"
    };
  });
}
