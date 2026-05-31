"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Giriş başarısız");
      const next = searchParams.get("next") || "/admin/blog";
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4 rounded-sm border border-border bg-white p-6 shadow-card">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Admin Girişi</h1>
        <p className="mt-1 text-sm text-gray-600">Blog yönetimi ve içerik paneli</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900">E-posta</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
          placeholder="admin@meboyunevi.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900">Şifre</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="rounded-sm bg-primary/5 px-3 py-2 text-sm text-primary">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
      >
        {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>

      <p className="text-xs leading-6 text-gray-500">
        İlk girişte ADMIN_EMAIL ve ADMIN_PASSWORD ortam değişkenleri ile süper admin hesabı otomatik oluşturulur.
      </p>
    </form>
  );
}
