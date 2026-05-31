import { NextRequest, NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/blog/auth";

export const dynamic = "force-dynamic";

export function cronUnauthorized() {
  return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
}

export function cronError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function assertCronAuthorized(req: NextRequest): NextResponse | null {
  if (!verifyCronRequest(req)) return cronUnauthorized();
  return null;
}
