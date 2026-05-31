import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { AdminSession } from "@/lib/blog/types";
import { COOKIE_NAME, parseSessionToken } from "@/lib/admin/session";

export function getSessionFromRequest(req: NextRequest): AdminSession | null {
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  return parseSessionToken(cookie);
}

export async function getSessionFromCookies(): Promise<AdminSession | null> {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;
  return parseSessionToken(cookie);
}

/** Cron için eski header auth; admin API artık oturum kullanır */
export function verifyAdminRequest(req: NextRequest): boolean {
  return getSessionFromRequest(req) !== null;
}

export function verifyCronRequest(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export function requireSession(req: NextRequest): AdminSession {
  const session = getSessionFromRequest(req);
  if (!session) throw new AuthError("Oturum gerekli.");
  return session;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
