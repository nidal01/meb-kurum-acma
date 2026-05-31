import { NextRequest } from "next/server";

export function verifyAdminRequest(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const header = req.headers.get("x-admin-password");
  const auth = req.headers.get("authorization");
  if (header === password) return true;
  if (auth === `Bearer ${password}`) return true;
  return false;
}

export function verifyCronRequest(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}
