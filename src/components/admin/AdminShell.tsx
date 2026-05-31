"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/blog/types";
import { ROLE_LABELS } from "@/lib/admin/permissions";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
          return;
        }
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-surface text-sm text-gray-600">
        Yükleniyor…
      </div>
    );
  }

  if (!user) return null;

  const nav = [
    { href: "/admin/blog", label: "Blog Yazıları" },
    { href: "/admin/blog/new", label: "Yeni Yazı" },
    { href: "/admin/blog/generate", label: "AI Üret" }
  ];

  if (user.role === "super_admin") {
    nav.push({ href: "/admin/users", label: "Kullanıcılar" });
  }

  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
            <p className="text-xs text-gray-500">
              {user.name} · {ROLE_LABELS[user.role]}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-gray-600 hover:text-primary">
              Siteye dön
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-sm border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <nav className="space-y-1 rounded-sm border border-border bg-white p-3 shadow-card">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/admin/blog" && pathname.startsWith(`${item.href}/`));
              return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "block rounded-sm px-3 py-2 text-sm font-medium",
                  active ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-surface"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
            })}
          </nav>
        </aside>
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
