"use client";

import { useState } from "react";
import type { BlogPost } from "@/lib/blog/types";
import { slugify } from "@/lib/blog/slug";

type Props = {
  post?: BlogPost;
  onSaved?: (post: BlogPost) => void;
};

export function PostEditor({ post, onSaved }: Props) {
  const isEdit = Boolean(post);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [keywords, setKeywords] = useState(post?.keywords.join(", ") ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function save() {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        title,
        slug: slug || slugify(title),
        excerpt,
        content,
        coverImage: coverImage || null,
        keywords: keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      };

      const url = isEdit ? `/api/admin/posts/${post!.id}` : "/api/admin/posts";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Kayıt başarısız");
      setMessage("Kaydedildi.");
      onSaved?.(data.post);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-sm border border-border bg-white p-5 shadow-card">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-900">Başlık</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900">Slug (URL)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
            placeholder={slugify(title)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900">Kapak görseli URL</label>
          <input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
            placeholder="/images/hero-stripe.svg"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-900">Özet</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-900">Anahtar kelimeler (virgülle)</label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-900">İçerik (Markdown)</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="mt-1 w-full rounded-sm border border-border px-3 py-2 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={save}
          className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-[#c90510] disabled:opacity-50"
        >
          {loading ? "Kaydediliyor…" : "Kaydet"}
        </button>
        {!slug && title && (
          <button
            type="button"
            onClick={() => setSlug(slugify(title))}
            className="rounded-sm border border-border px-4 py-2 text-sm font-semibold hover:bg-surface"
          >
            Slug üret
          </button>
        )}
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
}
