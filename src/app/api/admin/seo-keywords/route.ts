import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import {
  createSeoKeyword,
  listSeoKeywords,
  seedDefaultSeoKeywordsIfEmpty
} from "@/lib/blog/topic-db";

export async function GET(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    await seedDefaultSeoKeywordsIfEmpty();
    const keywords = await listSeoKeywords(false);
    return NextResponse.json({ keywords });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Liste hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const body = (await req.json()) as { keyword?: string; priority?: number };
    if (!body.keyword?.trim()) {
      return NextResponse.json({ error: "Anahtar kelime zorunlu." }, { status: 400 });
    }

    const keyword = await createSeoKeyword({
      keyword: body.keyword.trim(),
      priority: body.priority ?? 5
    });

    return NextResponse.json({ keyword });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Oluşturma hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
