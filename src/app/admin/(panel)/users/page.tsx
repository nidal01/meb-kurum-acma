import type { Metadata } from "next";
import { UserManager } from "@/components/admin/UserManager";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kullanıcı Yönetimi",
  description: "Admin kullanıcıları yönetin.",
  path: "/admin/users",
  noIndex: true
});

export default function AdminUsersPage() {
  return <UserManager />;
}
