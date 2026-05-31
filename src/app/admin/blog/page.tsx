import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { AdminBlogPanel } from "@/components/blog/AdminBlogPanel";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog Yönetimi",
  description: "Gemini ile blog yazısı üretimi ve yayın yönetimi.",
  path: "/admin/blog",
  noIndex: true
});

export default function AdminBlogPage() {
  return (
    <Container className="py-10 sm:py-12">
      <PageHeader
        title="Blog Yönetimi"
        subtitle="Google Gemini (ücretsiz API) ile taslak oluşturun; onayladıktan sonra yayınlayın."
      />
      <AdminBlogPanel />
    </Container>
  );
}
