import { NextRequest, NextResponse } from "next/server";
import { assertCronAuthorized, cronError } from "@/lib/cron/cron-route";
import { runBlogCron } from "@/lib/cron/run-blog-cron";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const unauthorized = assertCronAuthorized(req);
  if (unauthorized) return unauthorized;

  try {
    const result = await runBlogCron(1);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Cron hatası";
    return cronError(message);
  }
}
