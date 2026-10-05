import { and, asc, eq, ilike, or, type SQL } from "drizzle-orm";
import { titleCase } from "@/components/admin/format";
import { Badge, Filters, LinkButton, PageHeader, RowLink, Table, Td } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Partners & suppliers" };

const { partners } = schema;

export default async function PartnersPage({ searchParams }: PageProps<"/admin/partners">) {
  await requireAdmin();
  const { q, status: kind } = (await searchParams) as { q?: string; status?: string };

  const where: SQL[] = [];
  if (q) where.push(or(ilike(partners.name, `%${q}%`), ilike(partners.offering, `%${q}%`), ilike(partners.location, `%${q}%`), ilike(partners.contactName, `%${q}%`))!);
  if (kind && (schema.partnerKind.enumValues as readonly string[]).includes(kind)) {
    where.push(eq(partners.kind, kind as (typeof schema.partnerKind.enumValues)[number]));
  }
  const rows = await db.select().from(partners).where(and(...where)).orderBy(asc(partners.name));

  return (
    <>
      <PageHeader
        title="Partners & suppliers"
        description="Input suppliers, buyers, co-ops, transporters and investors."
        actions={<LinkButton href="/admin/partners/new">+ New partner</LinkButton>}
      />
      <Filters q={q} status={kind} statuses={schema.partnerKind.enumValues} placeholder="Search name, supplies, location…" />
      <Table head={["Name", "Relationship", "Supplies / offers", "Contact", "Location", "Status"]} empty="No partners yet.">
        {rows.map((p) => (
          <tr key={p.id} className="hover:bg-cream/50">
            <Td>
              <RowLink href={`/admin/partners/${p.id}`}>{p.name}</RowLink>
            </Td>
            <Td className="text-ink/70">{titleCase(p.kind)}</Td>
            <Td className="max-w-[16rem] truncate text-ink/70">{p.offering ?? "—"}</Td>
            <Td className="text-ink/70">
              {p.contactName && <div>{p.contactName}</div>}
              {p.phone && <div className="text-xs">{p.phone}</div>}
            </Td>
            <Td className="text-ink/70">{p.location ?? "—"}</Td>
            <Td>
              <Badge value={p.status} />
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
