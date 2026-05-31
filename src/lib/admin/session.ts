import { createHmac, timingSafeEqual } from "crypto";
import type { AdminSession } from "@/lib/blog/types";

const COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET ?? process.env.CRON_SECRET;
  if (!secret) throw new Error("SESSION_SECRET tanımlı değil.");
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(session: Omit<AdminSession, "exp">): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ ...session, exp });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${signPayload(encoded)}`;
}

export function parseSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = signPayload(encoded);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;

  try {
    const session = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSession;
    if (!session.userId || !session.role || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SESSION_DAYS };

export function sessionCookieOptions(maxAge = SESSION_DAYS * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge
  };
}
