import { NextRequest, NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/blog/auth";
import { isBlogDbConfigured } from "@/lib/blog/db";
import { buildWeeklyTopicPool } from "@/lib/blog/topic-service";
import { replaceWeeklyTopicPool, seedDefaultSeoKeywordsIfEmpty } from "@/lib/blog/topic-db";
import { getIsoWeekKey } from "@/lib/blog/week";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyCronRequest(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  if (!isBlogDbConfigured()) {
    return NextResponse.json({ error: "Supabase yapılandırılmamış" }, { status: 503 });
  }

  try {
    const weekKey = req.nextUrl.searchParams.get("week") ?? getIsoWeekKey();
    await seedDefaultSeoKeywordsIfEmpty();

    const items = await buildWeeklyTopicPool(weekKey);
    const saved = await replaceWeeklyTopicPool(weekKey, items, "ai");

    return NextResponse.json({
      weekKey,
      count: saved.length,
      topics: saved.map((t) => ({
        slotOrder: t.slotOrder,
        topic: t.topic,
        targetKeyword: t.targetKeyword
      }))
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "SEO konu cron hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
