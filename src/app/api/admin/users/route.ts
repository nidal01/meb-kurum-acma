import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/admin/password";
import { can } from "@/lib/admin/permissions";
import { AuthError, requireSession } from "@/lib/blog/auth";
import { createAdminUser, listAdminUsers } from "@/lib/blog/db";
import type { AdminRole } from "@/lib/blog/types";

export async function GET(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "users:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const users = await listAdminUsers();
    return NextResponse.json({ users });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Liste hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = requireSession(req);
    if (!can(session, "users:manage")) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
    }

    const body = (await req.json()) as {
      email?: string;
      name?: string;
      password?: string;
      role?: AdminRole;
    };

    if (!body.email?.trim() || !body.password || body.password.length < 8) {
      return NextResponse.json({ error: "Geçerli e-posta ve en az 8 karakter şifre gerekli." }, { status: 400 });
    }

    const role = body.role ?? "author";
    if (!["super_admin", "editor", "author"].includes(role)) {
      return NextResponse.json({ error: "Geçersiz rol." }, { status: 400 });
    }

    const user = await createAdminUser({
      email: body.email.trim(),
      name: body.name?.trim() || body.email.trim(),
      role,
      passwordHash: await hashPassword(body.password)
    });

    return NextResponse.json({ user });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: e.message }, { status: 401 });
    const message = e instanceof Error ? e.message : "Kullanıcı oluşturma hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
