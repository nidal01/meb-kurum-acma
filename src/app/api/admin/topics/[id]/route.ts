import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { deleteTopicPoolItem, updateTopicPoolItem } from "@/lib/blog/topic-db";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { id } = await ctx.params;
    const body = (await req.json()) as {
      topic?: string;
      targetKeyword?: string;
      slotOrder?: number;
      status?: "pending" | "used" | "skipped";
      seoRationale?: string;
    };

    const topic = await updateTopicPoolItem(id, body);
    return NextResponse.json({ topic });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Güncelleme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(_req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { id } = await ctx.params;
    await deleteTopicPoolItem(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Silme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
