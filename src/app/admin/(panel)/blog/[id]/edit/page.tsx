import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { getDbBlogPostById } from "@/lib/blog/db";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getDbBlogPostById(id);
  return buildPageMetadata({
    title: post ? `Düzenle: ${post.title}` : "Yazı Düzenle",
    description: "Blog yazısı düzenleme.",
    path: `/admin/blog/${id}/edit`,
    noIndex: true
  });
}

export default async function AdminEditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getDbBlogPostById(id);
  if (!post || post.source === "static") notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-gray-900">Yazıyı Düzenle</h1>
      <PostEditor post={post} />
    </div>
  );
}
