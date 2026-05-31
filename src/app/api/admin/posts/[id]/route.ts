import { NextRequest, NextResponse } from "next/server";
import { can, canDeletePost, canEditPost } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { deleteBlogPost, getDbBlogPostById, updateBlogPost } from "@/lib/blog/db";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    const { id } = await ctx.params;
    const post = await getDbBlogPostById(id);
    if (!post) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });

    if (session.role === "author" && post.authorId !== session.userId) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Okuma hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    if (!can(session, "posts:update")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { id } = await ctx.params;
    const existing = await getDbBlogPostById(id);
    if (!existing) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    if (!canEditPost(session, existing)) {
      return NextResponse.json({ error: "Bu yazıyı düzenleme yetkiniz yok." }, { status: 403 });
    }

    const body = (await req.json()) as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      keywords?: string[];
      coverImage?: string | null;
    };

    const post = await updateBlogPost(id, {
      title: body.title?.trim(),
      slug: body.slug?.trim(),
      excerpt: body.excerpt?.trim(),
      content: body.content?.trim(),
      keywords: body.keywords,
      coverImage: body.coverImage
    });

    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Güncelleme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    if (!can(session, "posts:delete")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { id } = await ctx.params;
    const existing = await getDbBlogPostById(id);
    if (!existing) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });
    if (!canDeletePost(session, existing)) {
      return NextResponse.json({ error: "Bu yazıyı silme yetkiniz yok." }, { status: 403 });
    }

    await deleteBlogPost(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Silme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
