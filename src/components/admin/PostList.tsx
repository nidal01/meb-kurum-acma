"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/lib/blog/types";

export function PostList() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const q = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/admin/posts${q}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Liste alınamadı");
      setPosts(data.posts ?? []);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function action(id: string, type: "publish" | "unpublish" | "delete") {
    setMessage(null);
    const url =
      type === "delete"
        ? `/api/admin/posts/${id}`
        : `/api/admin/posts/${id}/${type === "publish" ? "publish" : "unpublish"}`;
    const method = type === "delete" ? "DELETE" : "POST";
    const res = await fetch(url, { method });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "İşlem başarısız");
      return;
    }
    setMessage("İşlem tamamlandı.");
    await load();
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-gray-900">Blog Yazıları</h1>
        <div className="flex gap-2">
          {(["all", "draft", "published"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "rounded-sm px-3 py-1.5 text-xs font-semibold",
                filter === f ? "bg-primary text-white" : "border border-border bg-white hover:bg-surface"
              ].join(" ")}
            >
              {f === "all" ? "Tümü" : f === "draft" ? "Taslak" : "Yayında"}
            </button>
          ))}
        </div>
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}

      {loading ? (
        <p className="text-sm text-gray-600">Yükleniyor…</p>
      ) : posts.length === 0 ? (
        <p className="rounded-sm border border-border bg-white p-4 text-sm text-gray-600">Henüz yazı yok.</p>
      ) : (
        <ul className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.title}</p>
                <p className="text-xs text-gray-500">/{post.slug}</p>
                <span
                  className={[
                    "mt-1 inline-block rounded-sm px-2 py-0.5 text-xs font-medium",
                    post.status === "published" ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"
                  ].join(" ")}
                >
                  {post.status === "published" ? "Yayında" : "Taslak"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="rounded-sm border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface"
                >
                  Düzenle
                </Link>
                {post.status === "draft" ? (
                  <button
                    type="button"
                    onClick={() => action(post.id, "publish")}
                    className="rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#c90510]"
                  >
                    Yayınla
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => action(post.id, "unpublish")}
                    className="rounded-sm border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface"
                  >
                    Taslağa al
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Bu yazıyı kalıcı olarak silmek istediğinize emin misiniz?")) {
                      action(post.id, "delete");
                    }
                  }}
                  className="rounded-sm border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/5"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
