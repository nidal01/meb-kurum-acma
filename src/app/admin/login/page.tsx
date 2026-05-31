import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Admin Girişi",
  description: "Blog yönetim paneli girişi.",
  path: "/admin/login",
  noIndex: true
});

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface px-4 py-12">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
