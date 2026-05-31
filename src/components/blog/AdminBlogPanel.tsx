"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog/types";

export function AdminBlogPanel() {
  const [password, setPassword] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<BlogPost[]>([]);

  const headers = () => ({
    "Content-Type": "application/json",
    "x-admin-password": password
  });

  async function loadDrafts() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/blog/drafts", { headers: headers() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Taslaklar yüklenemedi");
      setDrafts(data.drafts ?? []);
      setMessage(`${data.drafts?.length ?? 0} taslak listelendi.`);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  async function generate(save: boolean) {
    if (!topic.trim()) {
      setMessage("Lütfen bir konu girin.");
      return;
    }
    setLoading(true);
    setMessage(null);
    setPreview(null);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ topic, save })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Üretim başarısız");

      if (data.draft) {
        setPreview(`# ${data.draft.title}\n\n${data.draft.excerpt}\n\n---\n\n${data.draft.content.slice(0, 500)}...`);
      }
      setMessage(save ? "Taslak kaydedildi." : "Önizleme oluşturuldu (kaydedilmedi).");
      if (save) await loadDrafts();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  async function publish(id: string) {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/blog/publish", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Yayın başarısız");
      setMessage(`Yayınlandı: ${data.post?.title}`);
      await loadDrafts();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-sm border border-border bg-surface p-4">
        <label className="block text-sm font-semibold text-gray-900">Admin şifresi</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-sm border border-border px-3 py-2 text-sm"
          placeholder="ADMIN_PASSWORD (Vercel env)"
        />
      </div>

      <div className="rounded-sm border border-border bg-white p-4 shadow-card">
        <label className="block text-sm font-semibold text-gray-900">Yazı konusu</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-sm border border-border px-3 py-2 text-sm"
          placeholder="Örn: Özel eğitim rehabilitasyon merkezi açılış evrakları"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => generate(false)}
            className="rounded-sm border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-50"
          >
            Gemini ile önizle
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => generate(true)}
            className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
          >
            Üret ve taslağa kaydet
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={loadDrafts}
            className="rounded-sm border border-border bg-white px-4 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-50"
          >
            Taslakları listele
          </button>
        </div>
      </div>

      {message && (
        <p className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-gray-700">{message}</p>
      )}

      {preview && (
        <pre className="max-h-64 overflow-auto rounded-sm border border-border bg-surface p-4 text-xs text-gray-700 whitespace-pre-wrap">
          {preview}
        </pre>
      )}

      {drafts.length > 0 && (
        <ul className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
          {drafts.map((d) => (
            <li key={d.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{d.title}</p>
                <p className="text-xs text-gray-500">/{d.slug}</p>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => publish(d.id)}
                className="rounded-sm bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
              >
                Yayınla
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
