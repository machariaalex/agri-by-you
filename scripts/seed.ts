/**
 * Loads the site's original static content into the database. Safe to re-run:
 * each table is only seeded while it is empty.
 *   npm run db:seed
 */
import { count } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { projects, services, testimonials } from "./seed-data";
import { db, schema } from "./db";

async function isEmpty(table: PgTable) {
  const [{ n }] = await db.select({ n: count() }).from(table);
  return n === 0;
}

async function seed<T extends PgTable>(label: string, table: T, rows: T["$inferInsert"][]) {
  if (!(await isEmpty(table))) return console.log(`· ${label}: already has rows, skipped`);
  await db.insert(table).values(rows);
  console.log(`✓ ${label}: ${rows.length} rows`);
}

async function main() {
  await seed(
    "services",
    schema.services,
    services.map((s, i) => ({ title: s.title, description: s.description, icon: s.icon, image: s.image, sortOrder: i })),
  );
  await seed(
    "projects",
    schema.projects,
    projects.map((p, i) => ({ name: p.name, location: p.location, tag: p.tag, image: p.image, sortOrder: i })),
  );
  await seed(
    "testimonials",
    schema.testimonials,
    testimonials.map((t, i) => ({ quote: t.quote, name: t.name, role: t.role, photo: t.photo, sortOrder: i })),
  );
  await seed("posts", schema.posts, [
    {
      slug: "siaya-organic-onions",
      title: "By You, For You: Why We Got Our Hands Dirty in Siaya's Fields",
      excerpt:
        "Behind the scenes of AgriByYou's organic onion project in Siaya County — soil preparation, drip irrigation, and raising the nursery from the ground up.",
      coverImage: "/images/blog/siaya-field.jpeg",
      published: true,
      publishedOn: "2026-09-03",
    },
    {
      slug: "sourcing-farming-inputs",
      title: "Building AgriByYou: Why Sourcing the Right Farming Inputs Matters",
      coverImage: "/images/blog/sourcing-load1.jpeg",
      published: true,
      publishedOn: "2026-09-01",
    },
  ]);
  // Prices start at 0 so nobody invoices from a guessed number; set them in Admin → Products.
  await seed("products", schema.products, [
    { name: "Organic onions", unit: "kg" },
    { name: "Fresh vegetables", unit: "kg" },
    { name: "Organic fruits", unit: "kg" },
    { name: "Farm-raised duck", unit: "bird" },
  ]);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
