import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hashPassword, verifyPassword } from "@/lib/admin/password";
import { COOKIE_NAME, createSessionToken, sessionCookieOptions } from "@/lib/admin/session";
import {
  countAdminUsers,
  createAdminUser,
  getAdminUserByEmail,
  isBlogDbConfigured
} from "@/lib/blog/db";

export async function POST(req: NextRequest) {
  if (!isBlogDbConfigured()) {
    return NextResponse.json({ error: "Supabase yapılandırılmamış." }, { status: 503 });
  }

  try {
    const { email, password } = (await req.json()) as { email?: string; password?: string };
    if (!email?.trim() || !password) {
      return NextResponse.json({ error: "E-posta ve şifre gerekli." }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = await getAdminUserByEmail(normalizedEmail);

    if (!user) {
      const adminCount = await countAdminUsers();
      const bootstrapEmail = (process.env.ADMIN_EMAIL ?? "admin@meboyunevi.com").toLowerCase();
      const bootstrapPassword = process.env.ADMIN_PASSWORD;

      if (adminCount === 0 && bootstrapPassword && normalizedEmail === bootstrapEmail && password === bootstrapPassword) {
        await createAdminUser({
          email: bootstrapEmail,
          name: "Süper Admin",
          role: "super_admin",
          passwordHash: await hashPassword(bootstrapPassword)
        });
        user = await getAdminUserByEmail(bootstrapEmail);
      }
    }

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Geçersiz e-posta veya şifre." }, { status: 401 });
    }

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

    const store = await cookies();
    store.set(COOKIE_NAME, token, sessionCookieOptions());

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Giriş hatası";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
