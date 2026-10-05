import Link from "next/link";
import { notFound } from "next/navigation";
import { asc } from "drizzle-orm";
import { Badge, LinkButton, PageHeader } from "@/components/admin/ui";
import { db } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { blockConfig, isBlockKind } from "../blocks";
import { ImagePreview } from "../ImagePreview";

export default async function BlockListPage({ params }: PageProps<"/admin/content/[kind]">) {
  await requireAdmin();
  const { kind } = await params;
  if (!isBlockKind(kind)) notFound();
  const config = blockConfig[kind];
  const rows = (await db.select().from(config.table).orderBy(asc(config.table.sortOrder), asc(config.table.id))) as Record<string, unknown>[];

  return (
    <>
      <PageHeader
        title={config.title}
        description={config.description}
        actions={<LinkButton href={`/admin/content/${kind}/new`}>+ New {config.singular}</LinkButton>}
      />
      <ul className="space-y-2">
        {rows.length === 0 && <li className="rounded-2xl bg-white p-8 text-center text-sm text-ink/45">Nothing yet.</li>}
        {rows.map((row) => (
          <li key={row.id as number}>
            <Link
              href={`/admin/content/${kind}/${row.id}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 ring-1 ring-forest/5 transition-colors hover:ring-forest/20"
            >
              <ImagePreview src={config.image(row)} round={kind === "testimonials"} />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-forest">{config.label(row)}</p>
                <p className="truncate text-sm text-ink/50">{config.sub(row)}</p>
              </div>
              <span className="text-xs text-ink/40">#{row.sortOrder as number}</span>
              <Badge value={row.published ? "published" : "draft"} label={row.published ? "Live" : "Hidden"} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
