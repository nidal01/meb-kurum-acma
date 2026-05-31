import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/blog/auth";
import { publishBlogPost } from "@/lib/blog/db";

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });

    const post = await publishBlogPost(id);
    return NextResponse.json({ post });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Yayın hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
