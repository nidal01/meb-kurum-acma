"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AiGeneratePanel() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function generate(save: boolean) {
    if (!topic.trim()) {
      setMessage("Lütfen bir konu girin.");
      return;
    }
    setLoading(true);
    setMessage(null);
    setPreview(null);
    try {
      const res = await fetch("/api/admin/posts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, save })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Üretim başarısız");

      if (data.draft) {
        setPreview(`# ${data.draft.title}\n\n${data.draft.excerpt}\n\n---\n\n${data.draft.content.slice(0, 600)}...`);
      }
      setMessage(save ? "Taslak kaydedildi." : "Önizleme oluşturuldu.");
      if (save && data.saved?.id) {
        router.push(`/admin/blog/${data.saved.id}/edit`);
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Gemini ile Yazı Üret</h1>
      <div className="rounded-sm border border-border bg-white p-5 shadow-card">
        <label className="block text-sm font-semibold text-gray-900">Yazı konusu</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-sm border border-border px-3 py-2 text-sm"
          placeholder="Örn: Özel eğitim rehabilitasyon merkezi açılış evrakları"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => generate(false)}
            className="rounded-sm border border-border px-4 py-2 text-sm font-semibold hover:bg-surface disabled:opacity-50"
          >
            Önizle
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => generate(true)}
            className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
          >
            Üret ve taslağa kaydet
          </button>
        </div>
      </div>
      {message && <p className="text-sm text-gray-700">{message}</p>}
      {preview && (
        <pre className="max-h-80 overflow-auto rounded-sm border border-border bg-surface p-4 text-xs whitespace-pre-wrap text-gray-700">
          {preview}
        </pre>
      )}
    </div>
  );
}
