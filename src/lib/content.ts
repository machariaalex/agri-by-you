import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";

const { posts, projects, services, testimonials } = schema;

/** Journal posts with hand-built pages under app/(site)/journal/<slug>; their body field is not rendered. */
export const CUSTOM_POST_SLUGS = ["siaya-organic-onions", "sourcing-farming-inputs"];

export type JournalCard = {
  title: string;
  date: { day: string; month: string };
  image: string;
  href: string;
};

export function toJournalCard(post: typeof posts.$inferSelect): JournalCard {
  const d = new Date(`${post.publishedOn}T00:00:00`);
  return {
    title: post.title,
    date: {
      day: String(d.getDate()).padStart(2, "0"),
      month: d.toLocaleString("en-US", { month: "short" }),
    },
    image: post.coverImage,
    href: `/journal/${post.slug}`,
  };
}

export async function getPublishedPosts(limit?: number) {
  const q = db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedOn), desc(posts.id));
  return (limit ? await q.limit(limit) : await q).map(toJournalCard);
}

export async function getPublishedPost(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)));
  return post ?? null;
}

export function getServices() {
  return db.select().from(services).where(eq(services.published, true)).orderBy(asc(services.sortOrder), asc(services.id));
}

export function getProjects() {
  return db.select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder), asc(projects.id));
}

export function getTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.published, true))
    .orderBy(asc(testimonials.sortOrder), asc(testimonials.id));
}
