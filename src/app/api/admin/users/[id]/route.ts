import { NextRequest, NextResponse } from "next/server";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { deleteAdminUser, getAdminUserById } from "@/lib/blog/db";

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    const session = requireSession(req);
    if (!can(session, "users:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const { id } = await ctx.params;
    if (id === session.userId) {
      return NextResponse.json({ error: "Kendi hesabınızı silemezsiniz." }, { status: 400 });
    }

    const user = await getAdminUserById(id);
    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });

    await deleteAdminUser(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Silme hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
