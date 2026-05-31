import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { AdminRole, AdminUser, BlogPost, BlogPostStatus, PostWriteInput } from "@/lib/blog/types";

export type DbBlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogPostStatus;
  keywords: string[] | null;
  cover_image: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
};

export type DbAdminRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: AdminRole;
  created_at: string;
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
    coverImage: row.cover_image,
    authorId: row.author_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    source: "database"
  };
}

function mapAdmin(row: DbAdminRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    createdAt: row.created_at
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

export async function getDbBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as DbBlogRow) : null;
}

export async function getDbBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as DbBlogRow) : null;
}

export async function insertBlogPost(input: PostWriteInput & { status?: BlogPostStatus }): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const status = input.status ?? "draft";
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      keywords: input.keywords,
      cover_image: input.coverImage ?? null,
      author_id: input.authorId ?? null,
      status,
      published_at: status === "published" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as DbBlogRow);
}

/** @deprecated insertBlogPost kullanın */
export async function insertBlogDraft(input: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  keywords: string[];
  coverImage?: string | null;
  authorId?: string | null;
}): Promise<BlogPost> {
  return insertBlogPost({ ...input, status: "draft" });
}

export async function updateBlogPost(id: string, input: Partial<PostWriteInput>): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (input.slug !== undefined) patch.slug = input.slug;
  if (input.title !== undefined) patch.title = input.title;
  if (input.excerpt !== undefined) patch.excerpt = input.excerpt;
  if (input.content !== undefined) patch.content = input.content;
  if (input.keywords !== undefined) patch.keywords = input.keywords;
  if (input.coverImage !== undefined) patch.cover_image = input.coverImage;
  if (input.authorId !== undefined) patch.author_id = input.authorId;

  const { data, error } = await supabase.from("blog_posts").update(patch).eq("id", id).select("*").single();
  if (error) throw error;
  return mapRow(data as DbBlogRow);
}

export async function publishBlogPost(id: string): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as DbBlogRow);
}

export async function unpublishBlogPost(id: string): Promise<BlogPost> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("blog_posts")
    .update({ status: "draft", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data as DbBlogRow);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

// --- Admin users ---

export async function countAdminUsers(): Promise<number> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return 0;
  const { count, error } = await supabase.from("admin_users").select("*", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

export async function getAdminUserByEmail(email: string): Promise<(AdminUser & { passwordHash: string }) | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("admin_users").select("*").eq("email", email.toLowerCase()).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const row = data as DbAdminRow;
  return { ...mapAdmin(row), passwordHash: row.password_hash };
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("admin_users").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapAdmin(data as DbAdminRow) : null;
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return (data as DbAdminRow[]).map(mapAdmin);
}

export async function createAdminUser(input: {
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
}): Promise<AdminUser> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email: input.email.toLowerCase(),
      name: input.name,
      role: input.role,
      password_hash: input.passwordHash
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapAdmin(data as DbAdminRow);
}

export async function deleteAdminUser(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  const { error } = await supabase.from("admin_users").delete().eq("id", id);
  if (error) throw error;
}
