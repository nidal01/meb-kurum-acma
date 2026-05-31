import type { Metadata } from "next";
import { PostEditor } from "@/components/admin/PostEditor";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Yeni Blog Yazısı",
  description: "Manuel blog yazısı oluşturun.",
  path: "/admin/blog/new",
  noIndex: true
});

export default function AdminNewPostPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Yeni Yazı</h1>
      <PostEditor />
    </div>
  );
}
