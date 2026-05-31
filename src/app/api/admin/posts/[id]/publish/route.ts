import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { getDbBlogPostById, publishBlogPost } from "@/lib/blog/db";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    if (!can(session, "posts:publish")) {
      return NextResponse.json({ error: "Yayınlama yetkiniz yok." }, { status: 403 });
    }

    const { id } = await ctx.params;
    const existing = await getDbBlogPostById(id);
    if (!existing) return NextResponse.json({ error: "Yazı bulunamadı." }, { status: 404 });

    const post = await publishBlogPost(id);
    return NextResponse.json({ post });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Yayın hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
