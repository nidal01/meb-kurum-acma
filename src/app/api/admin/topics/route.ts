import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { createTopicPoolItem, listTopicPool } from "@/lib/blog/topic-db";
import { getIsoWeekKey } from "@/lib/blog/week";

export async function GET(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const weekKey = req.nextUrl.searchParams.get("week") ?? getIsoWeekKey();
    const topics = await listTopicPool(weekKey);
    return NextResponse.json({ weekKey, topics });
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

    const body = (await req.json()) as {
      weekKey?: string;
      topic?: string;
      targetKeyword?: string;
      slotOrder?: number;
      seoRationale?: string;
    };

    if (!body.topic?.trim() || body.slotOrder === undefined) {
      return NextResponse.json({ error: "Konu ve slot zorunlu." }, { status: 400 });
    }

    const topic = await createTopicPoolItem({
      weekKey: body.weekKey ?? getIsoWeekKey(),
      topic: body.topic.trim(),
      targetKeyword: body.targetKeyword?.trim() ?? "",
      slotOrder: body.slotOrder,
      seoRationale: body.seoRationale
    });

    return NextResponse.json({ topic });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Oluşturma hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
