export type BlogPostStatus = "draft" | "published";

export type AdminRole = "super_admin" | "editor" | "author";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  keywords: string[];
  coverImage: string | null;
  authorId: string | null;
  createdAt: string;
  updatedAt: string | null;
  publishedAt: string | null;
  source: "static" | "database";
};

export type GeneratedBlogDraft = {
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  suggestedSlug: string;
  coverImage: string;
};

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
};

export type PostWriteInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  coverImage?: string | null;
  status?: BlogPostStatus;
  authorId?: string | null;
};

export type SeoKeyword = {
  id: string;
  keyword: string;
  priority: number;
  source: "manual" | "site" | "ai";
  active: boolean;
  createdAt: string;
};

export type TopicPoolItem = {
  id: string;
  weekKey: string;
  topic: string;
  targetKeyword: string;
  slotOrder: number;
  status: "pending" | "used" | "skipped";
  source: "ai" | "manual";
  seoRationale: string;
  usedAt: string | null;
  postId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GeneratedTopicPlan = {
  topic: string;
  targetKeyword: string;
  seoRationale: string;
  slotOrder: number;
};
