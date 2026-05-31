import type { Metadata } from "next";
import { AiGeneratePanel } from "@/components/admin/AiGeneratePanel";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "AI ile Yazı Üret",
  description: "Gemini ile blog yazısı üretin.",
  path: "/admin/blog/generate",
  noIndex: true
});

export default function AdminGeneratePage() {
  return <AiGeneratePanel />;
}
