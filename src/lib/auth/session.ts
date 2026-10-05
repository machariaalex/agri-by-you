import "server-only";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, schema } from "@/db";
import { SESSION_COOKIE, SESSION_TTL_MS, signSession, verifySessionToken } from "./token";

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + SESSION_TTL_MS);
  const token = await signSession({ userId, expiresAt: expires.toISOString() });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** The signed-in admin, or null. Checks the user still exists, so deleted admins lose access. */
export const getCurrentAdmin = cache(async () => {
  const session = await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const [user] = await db
    .select({ id: schema.adminUsers.id, name: schema.adminUsers.name, email: schema.adminUsers.email })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.id, session.userId));
  return user ?? null;
});

/** Use in every admin page and Server Action. Redirects to the login page when signed out. */
export async function requireAdmin() {
  const user = await getCurrentAdmin();
  if (!user) redirect("/admin/login");
  return user;
}
