import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { buildWeeklyTopicPool } from "@/lib/blog/topic-service";
import { replaceWeeklyTopicPool, seedDefaultSeoKeywordsIfEmpty } from "@/lib/blog/topic-db";
import { getIsoWeekKey } from "@/lib/blog/week";

export async function POST(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "topics:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const body = (await req.json()) as { weekKey?: string };
    const weekKey = body.weekKey ?? getIsoWeekKey();

    await seedDefaultSeoKeywordsIfEmpty();
    const items = await buildWeeklyTopicPool(weekKey);
    const topics = await replaceWeeklyTopicPool(weekKey, items, "ai");

    return NextResponse.json({ weekKey, count: topics.length, topics });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Yenileme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
