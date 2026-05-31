"use client";

import { useCallback, useEffect, useState } from "react";
import type { SeoKeyword, TopicPoolItem } from "@/lib/blog/types";
import { slotOrderLabel } from "@/lib/blog/week";

export function TopicPoolManager() {
  const [weekKey, setWeekKey] = useState("");
  const [topics, setTopics] = useState<TopicPoolItem[]>([]);
  const [keywords, setKeywords] = useState<SeoKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [newKeyword, setNewKeyword] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newSlot, setNewSlot] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const [topicsRes, kwRes] = await Promise.all([
        fetch("/api/admin/topics"),
        fetch("/api/admin/seo-keywords")
      ]);
      const topicsData = await topicsRes.json();
      const kwData = await kwRes.json();
      if (!topicsRes.ok) throw new Error(topicsData.error ?? "Konular yüklenemedi");
      if (!kwRes.ok) throw new Error(kwData.error ?? "Anahtar kelimeler yüklenemedi");
      setWeekKey(topicsData.weekKey);
      setTopics(topicsData.topics ?? []);
      setKeywords(kwData.keywords ?? []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function regenerate() {
    if (!confirm("Bu haftanın bekleyen konuları AI ile yeniden planlansın mı? (Kullanılmış konular korunur)")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/topics/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekKey })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Yenileme başarısız");
      setMessage(`${data.count} konu planlandı.`);
      await load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  async function addKeyword(e: React.FormEvent) {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    const res = await fetch("/api/admin/seo-keywords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword: newKeyword, priority: 7 })
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Kelime eklenemedi");
      return;
    }
    setNewKeyword("");
    await load();
  }

  async function toggleKeyword(id: string, active: boolean) {
    await fetch(`/api/admin/seo-keywords/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !active })
    });
    await load();
  }

  async function deleteKeyword(id: string) {
    if (!confirm("Bu anahtar kelime silinsin mi?")) return;
    await fetch(`/api/admin/seo-keywords/${id}`, { method: "DELETE" });
    await load();
  }

  async function addTopic(e: React.FormEvent) {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const res = await fetch("/api/admin/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weekKey,
        topic: newTopic,
        targetKeyword: newTarget,
        slotOrder: newSlot
      })
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Konu eklenemedi");
      return;
    }
    setNewTopic("");
    setNewTarget("");
    await load();
  }

  async function updateTopic(id: string, patch: Partial<TopicPoolItem>) {
    const res = await fetch(`/api/admin/topics/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: patch.topic,
        targetKeyword: patch.targetKeyword,
        status: patch.status,
        seoRationale: patch.seoRationale
      })
    });
    const data = await res.json();
    if (!res.ok) setMessage(data.error ?? "Güncellenemedi");
    await load();
  }

  async function deleteTopic(id: string) {
    if (!confirm("Bu konu silinsin mi?")) return;
    await fetch(`/api/admin/topics/${id}`, { method: "DELETE" });
    await load();
  }

  const statusLabel = (s: TopicPoolItem["status"]) =>
    s === "pending" ? "Bekliyor" : s === "used" ? "Kullanıldı" : "Atlandı";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">SEO Konu Havuzu</h1>
          <p className="text-sm text-gray-600">
            Hafta: <span className="font-medium">{weekKey || "—"}</span> · AI her Pazartesi yeni plan oluşturur
          </p>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={regenerate}
          className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
        >
          AI ile yeniden planla
        </button>
      </div>

      {message && <p className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-gray-700">{message}</p>}

      <section className="rounded-sm border border-border bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-gray-900">Hedef anahtar kelimeler</h2>
        <p className="mt-1 text-sm text-gray-600">AI konu planını bu kelimelere göre oluşturur.</p>

        <form onSubmit={addKeyword} className="mt-4 flex flex-wrap gap-2">
          <input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder="Yeni anahtar kelime"
            className="min-w-[200px] flex-1 rounded-sm border border-border px-3 py-2 text-sm"
          />
          <button type="submit" className="rounded-sm border border-border px-4 py-2 text-sm font-semibold hover:bg-surface">
            Ekle
          </button>
        </form>

        <ul className="mt-4 divide-y divide-border">
          {keywords.map((kw) => (
            <li key={kw.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
              <span className={kw.active ? "text-gray-900" : "text-gray-400 line-through"}>
                {kw.keyword} <span className="text-xs text-gray-500">(öncelik {kw.priority})</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleKeyword(kw.id, kw.active)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {kw.active ? "Pasif yap" : "Aktif yap"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteKeyword(kw.id)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-sm border border-border bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-gray-900">Haftalık konu planı</h2>
        {loading ? (
          <p className="mt-3 text-sm text-gray-600">Yükleniyor…</p>
        ) : topics.length === 0 ? (
          <p className="mt-3 text-sm text-gray-600">
            Bu hafta için plan yok. &quot;AI ile yeniden planla&quot; butonuna tıklayın.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {topics.map((t) => (
              <li key={t.id} className="py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-primary">{slotOrderLabel(t.slotOrder)}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{t.topic}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Hedef: {t.targetKeyword || "—"} · {statusLabel(t.status)} · {t.source === "ai" ? "AI" : "Manuel"}
                    </p>
                    {t.seoRationale && <p className="mt-1 text-xs text-gray-600">{t.seoRationale}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            const topic = prompt("Konu", t.topic);
                            if (topic) updateTopic(t.id, { topic });
                          }}
                          className="rounded-sm border border-border px-2 py-1 text-xs font-semibold hover:bg-surface"
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          onClick={() => updateTopic(t.id, { status: "skipped" })}
                          className="rounded-sm border border-border px-2 py-1 text-xs font-semibold hover:bg-surface"
                        >
                          Atla
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTopic(t.id)}
                          className="rounded-sm border border-primary/30 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/5"
                        >
                          Sil
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={addTopic} className="mt-6 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Manuel konu ekle"
            className="rounded-sm border border-border px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            placeholder="Hedef anahtar kelime"
            className="rounded-sm border border-border px-3 py-2 text-sm"
          />
          <select
            value={newSlot}
            onChange={(e) => setNewSlot(Number(e.target.value))}
            className="rounded-sm border border-border px-3 py-2 text-sm"
          >
            {Array.from({ length: 14 }, (_, i) => (
              <option key={i} value={i}>
                {slotOrderLabel(i)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510] sm:col-span-2"
          >
            Konu ekle
          </button>
        </form>
      </section>
    </div>
  );
}
