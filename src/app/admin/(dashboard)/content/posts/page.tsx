import { desc } from "drizzle-orm";
import { formatDate } from "@/components/admin/format";
import { Badge, LinkButton, PageHeader, RowLink, Table, Td } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { ImagePreview } from "../ImagePreview";

export const metadata = { title: "Journal" };

export default async function PostsPage() {
  await requireAdmin();
  const posts = await db.select().from(schema.posts).orderBy(desc(schema.posts.publishedOn), desc(schema.posts.id));

  return (
    <>
      <PageHeader title="Journal" description="Articles on the Journal page and in the footer." actions={<LinkButton href="/admin/content/posts/new">+ New article</LinkButton>} />
      <Table head={["", "Title", "Date", "Status", ""]} empty="No articles yet.">
        {posts.map((p) => (
          <tr key={p.id} className="hover:bg-cream/50">
            <Td className="w-16">
              <ImagePreview src={p.coverImage} />
            </Td>
            <Td>
              <RowLink href={`/admin/content/posts/${p.id}`}>{p.title}</RowLink>
              <div className="text-xs text-ink/45">/journal/{p.slug}</div>
            </Td>
            <Td className="text-ink/70">{formatDate(p.publishedOn)}</Td>
            <Td>
              <Badge value={p.published ? "published" : "draft"} />
            </Td>
            <Td>
              {p.published && (
                <a href={`/journal/${p.slug}`} target="_blank" className="text-sm font-bold text-forest hover:text-gold">
                  View ↗
                </a>
              )}
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
