import type { Metadata } from "next";
import { PostList } from "@/components/admin/PostList";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Yönetimi",
  description: "Blog yazılarını yönetin.",
  path: "/admin/blog",
  noIndex: true
});

export default function AdminBlogPage() {
  return <PostList />;
}
