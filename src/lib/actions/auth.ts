"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { createSession, deleteSession, requireAdmin } from "@/lib/auth/session";
import { parseForm, type FormState } from "@/lib/forms";
import { requiredText } from "@/lib/validation";

const { adminUsers } = schema;

// Compared against when the email is unknown, so response time doesn't reveal which emails exist.
const DUMMY_HASH = "$2b$12$VCcZl.j55vENmkkjN8NJxeSm4YjUEo.zAW/RQVEJ6rs5Q0Sa8.OEW";

const loginSchema = z.object({
  email: requiredText("Email").transform((v) => v.toLowerCase()),
  password: requiredText("Password"),
  next: z.string().optional(),
});

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parseForm(loginSchema, formData);
  if (parsed.error) return parsed.error;
  const { email, password, next } = parsed.data;

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
  const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !valid) return { ok: false, message: "That email and password don't match." };

  await createSession(user.id);
  // Only allow same-site admin paths as the post-login destination.
  redirect(next && /^\/admin(\/|$)/.test(next) ? next : "/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

const passwordRule = z.string().min(10, "Use at least 10 characters");

export async function changePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const me = await requireAdmin();
  const parsed = parseForm(
    z
      .object({ current: requiredText("Current password"), password: passwordRule, confirm: z.string() })
      .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords don't match" }),
    formData,
  );
  if (parsed.error) return parsed.error;

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, me.id));
  if (!(await bcrypt.compare(parsed.data.current, user.passwordHash))) {
    return { ok: false, fieldErrors: { current: "Current password is wrong" } };
  }
  await db
    .update(adminUsers)
    .set({ passwordHash: await bcrypt.hash(parsed.data.password, 12) })
    .where(eq(adminUsers.id, me.id));
  return { ok: true, message: "Password updated." };
}

export async function addAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(
    z.object({
      name: requiredText("Name"),
      email: z.email("Enter a valid email").transform((v) => v.toLowerCase()),
      password: passwordRule,
    }),
    formData,
  );
  if (parsed.error) return parsed.error;

  const { name, email, password } = parsed.data;
  const [existing] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email));
  if (existing) return { ok: false, fieldErrors: { email: "There's already an admin with this email" } };

  await db.insert(adminUsers).values({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  return { ok: true, message: `${name} can now sign in.` };
}

export async function removeAdmin(id: number) {
  const me = await requireAdmin();
  if (id === me.id) return { ok: false, message: "You can't remove your own account." };
  await db.delete(adminUsers).where(eq(adminUsers.id, id));
  redirect("/admin/settings");
}
