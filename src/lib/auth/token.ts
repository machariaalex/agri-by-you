import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "abyu_admin";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionPayload = { userId: number; expiresAt: string };

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.expiresAt))
    .sign(key());
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, key(), { algorithms: ["HS256"] });
    return typeof payload.userId === "number" ? payload : null;
  } catch {
    return null;
  }
}
