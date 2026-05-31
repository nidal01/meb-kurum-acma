import type { AdminRole, AdminSession } from "@/lib/blog/types";

export type AdminAction =
  | "posts:read"
  | "posts:create"
  | "posts:update"
  | "posts:delete"
  | "posts:publish"
  | "users:manage"
  | "topics:manage";

const ROLE_PERMISSIONS: Record<AdminRole, AdminAction[]> = {
  super_admin: [
    "posts:read",
    "posts:create",
    "posts:update",
    "posts:delete",
    "posts:publish",
    "users:manage",
    "topics:manage"
  ],
  editor: ["posts:read", "posts:create", "posts:update", "posts:delete", "posts:publish", "topics:manage"],
  author: ["posts:read", "posts:create", "posts:update"]
};

export function can(session: AdminSession | null, action: AdminAction): boolean {
  if (!session) return false;
  return ROLE_PERMISSIONS[session.role].includes(action);
}

export function canEditPost(
  session: AdminSession | null,
  post: { authorId: string | null; status: string }
): boolean {
  if (!session) return false;
  if (session.role === "super_admin" || session.role === "editor") return true;
  if (session.role === "author") {
    return post.authorId === session.userId && post.status === "draft";
  }
  return false;
}

export function canDeletePost(
  session: AdminSession | null,
  post: { authorId: string | null; status: string }
): boolean {
  if (!session) return false;
  if (session.role === "super_admin" || session.role === "editor") return true;
  if (session.role === "author") {
    return post.authorId === session.userId && post.status === "draft";
  }
  return false;
}

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Süper Admin",
  editor: "Editör",
  author: "Yazar"
};
