import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/blog/auth";
import { getDraftBlogPosts } from "@/lib/blog";

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  try {
    const drafts = await getDraftBlogPosts();
    return NextResponse.json({ drafts });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Liste hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
