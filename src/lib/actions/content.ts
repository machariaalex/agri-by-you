"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { parseForm, type FormState } from "@/lib/forms";
import { serviceIconNames } from "@/lib/serviceIcons";
import { checkbox, optionalText, requiredText, wholeNumber } from "@/lib/validation";

const { posts, projects, services, testimonials } = schema;

/** Public pages are statically rendered; refresh all of them after any content change. */
function refreshSite() {
  revalidatePath("/", "layout");
}

const image = requiredText("Image").refine((v) => v.startsWith("/") || v.startsWith("https://") || /^\d{6,}-\w+$/.test(v), {
  message: "Use a site path like /images/onions.jpeg, a full https:// URL, or an Unsplash photo id",
});

/* ---------- Journal ---------- */

const postSchema = z.object({
  title: requiredText("Title"),
  slug: requiredText("URL slug").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only"),
  excerpt: optionalText,
  coverImage: image,
  body: z.string().default(""),
  publishedOn: z.iso.date("Enter a date"),
  published: checkbox,
});

export async function savePost(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(postSchema, formData);
  if (parsed.error) return parsed.error;

  const [clash] = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, parsed.data.slug));
  if (clash && clash.id !== id) return { ok: false, fieldErrors: { slug: "Another post already uses this slug" } };

  if (id === null) {
    const [row] = await db.insert(posts).values(parsed.data).returning({ id: posts.id });
    refreshSite();
    redirect(`/admin/content/posts/${row.id}`);
  }
  await db.update(posts).set(parsed.data).where(eq(posts.id, id));
  refreshSite();
  return { ok: true, message: parsed.data.published ? "Saved and live on the site." : "Saved as draft." };
}

export async function deletePost(id: number) {
  await requireAdmin();
  await db.delete(posts).where(eq(posts.id, id));
  refreshSite();
  redirect("/admin/content/posts");
}

/* ---------- Testimonials, projects, services ---------- */

const blockFields = { sortOrder: wholeNumber("Order"), published: checkbox };

const blockSchemas = {
  testimonials: z.object({ quote: requiredText("Quote"), name: requiredText("Name"), role: requiredText("Role"), photo: image, ...blockFields }),
  projects: z.object({ name: requiredText("Name"), location: requiredText("Location"), tag: requiredText("Tag"), image, ...blockFields }),
  services: z.object({
    title: requiredText("Title"),
    description: requiredText("Description"),
    icon: z.enum(serviceIconNames as [string, ...string[]]),
    image,
    ...blockFields,
  }),
};

const blockTables = { testimonials, projects, services };

export type BlockKind = keyof typeof blockTables;

export async function saveBlock(kind: BlockKind, id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(blockSchemas[kind], formData);
  if (parsed.error) return parsed.error;

  const table = blockTables[kind];
  if (id === null) {
    await db.insert(table).values(parsed.data as never);
    refreshSite();
    redirect(`/admin/content/${kind}`);
  }
  await db.update(table).set(parsed.data).where(eq(table.id, id));
  refreshSite();
  return { ok: true, message: "Saved and live on the site." };
}

export async function deleteBlock(kind: BlockKind, id: number) {
  await requireAdmin();
  const table = blockTables[kind];
  await db.delete(table).where(eq(table.id, id));
  refreshSite();
  redirect(`/admin/content/${kind}`);
}

