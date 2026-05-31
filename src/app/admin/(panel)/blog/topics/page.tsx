import type { Metadata } from "next";
import { TopicPoolManager } from "@/components/admin/TopicPoolManager";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO Konu Havuzu",
  description: "Haftalık AI blog konu planı ve anahtar kelime yönetimi.",
  path: "/admin/blog/topics",
  noIndex: true
});

export default function AdminTopicsPage() {
  return <TopicPoolManager />;
}
