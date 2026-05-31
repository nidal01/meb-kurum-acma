import type { BlogPost } from "@/lib/blog/types";
import { getDbBlogPosts, getDbBlogPostBySlug } from "@/lib/blog/db";
import { getStaticBlogPosts } from "@/lib/blog/static";

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const [staticPosts, dbPosts] = await Promise.all([
    Promise.resolve(getStaticBlogPosts()),
    getDbBlogPosts()
  ]);

  const bySlug = new Map<string, BlogPost>();
  for (const post of [...staticPosts, ...dbPosts]) {
    bySlug.set(post.slug, post);
  }
  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishedAt ?? b.createdAt).getTime() - new Date(a.publishedAt ?? a.createdAt).getTime()
  );
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const all = await getAllBlogPosts();
  return all.filter((p) => p.status === "published");
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const dbPost = await getDbBlogPostBySlug(slug);
  if (dbPost?.status === "published") return dbPost;

  const staticPost = getStaticBlogPosts().find((p) => p.slug === slug);
  if (staticPost?.status === "published") return staticPost;

  return null;
}

export async function getDraftBlogPosts(): Promise<BlogPost[]> {
  return getDbBlogPosts("draft");
}
