import { NextResponse } from "next/server";
import { getIndexNowKey } from "@/lib/seo/indexnow";

export const dynamic = "force-dynamic";

/**
 * IndexNow doğrulama dosyası — düz metin olarak yalnızca anahtarı döner.
 * keyLocation alanında bu URL bildirilir.
 */
export function GET() {
  const key = getIndexNowKey();
  if (!key) {
    return new NextResponse("IndexNow key not configured", { status: 404 });
  }
  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
