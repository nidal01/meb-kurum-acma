export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  keywords: string[];
  createdAt: string;
  publishedAt: string | null;
  source: "static" | "database";
};

export type GeneratedBlogDraft = {
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  suggestedSlug: string;
};
