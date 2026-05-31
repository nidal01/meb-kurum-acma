import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import {
  deleteBlogPost,
  getDbBlogPostById,
  getDbBlogPosts,
  insertBlogPost,
  isBlogDbConfigured,
  publishBlogPost,
  unpublishBlogPost,
  updateBlogPost
} from "@/lib/blog/db";
import { slugify } from "@/lib/blog/slug";
import type { BlogPostStatus } from "@/lib/blog/types";

export async function GET(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "posts:read")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const status = req.nextUrl.searchParams.get("status") as BlogPostStatus | null;
    let posts = await getDbBlogPosts(status ?? undefined);

    if (session.role === "author") {
      posts = posts.filter((p) => p.authorId === session.userId);
    }

    return NextResponse.json({ posts });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Liste hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isBlogDbConfigured()) {
    return NextResponse.json({ error: "Supabase yapılandırılmamış." }, { status: 503 });
  }

  try {
    const session = requireSession(req);
    if (!can(session, "posts:create")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const body = (await req.json()) as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      keywords?: string[];
      coverImage?: string | null;
      status?: BlogPostStatus;
    };

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json({ error: "Başlık ve içerik zorunlu." }, { status: 400 });
    }

    const slug = body.slug?.trim() || slugify(body.title);
    const status = body.status ?? "draft";

    if (status === "published" && !can(session, "posts:publish")) {
      return NextResponse.json({ error: "Yayınlama yetkiniz yok." }, { status: 403 });
    }

    const post = await insertBlogPost({
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt?.trim() ?? "",
      content: body.content.trim(),
      keywords: body.keywords ?? [],
      coverImage: body.coverImage ?? null,
      status,
      authorId: session.userId
    });

    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Oluşturma hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
