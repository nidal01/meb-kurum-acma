import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { BlogPost, BlogPostStatus } from "@/lib/blog/types";

export type DbBlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  keywords: string[] | null;
  created_at: string;
  published_at: string | null;
};

function mapRow(row: DbBlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    status: row.status,
    keywords: row.keywords ?? [],
    createdAt: row.created_at,
    publishedAt: row.published_at,
    source: "database"
  };
}

export function isBlogDbConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function getDbBlogPosts(status?: BlogPostStatus): Promise<BlogPost[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data as DbBlogRow[]).map(mapRow);
}

export async function getDbBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as DbBlogRow) : null;
}

export async function insertBlogDraft(input: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
}): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error("Supabase yapılandırılmamış. SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY ekleyin.");
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      keywords: input.keywords,
      status: "draft"
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as DbBlogRow);
}

export async function publishBlogPost(id: string): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("blog_posts")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as DbBlogRow);
}
