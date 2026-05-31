import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/blog/auth";
import { getAdminUserById } from "@/lib/blog/db";

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) return NextResponse.json({ user: null }, { status: 401 });

  const user = await getAdminUserById(session.userId);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({ user });
}
