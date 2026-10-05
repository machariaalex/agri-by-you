import { and, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { formatDate } from "@/components/admin/format";
import { Badge, Filters, LinkButton, PageHeader, RowLink, Table, Td } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Leads" };

const { leads } = schema;

export default async function LeadsPage({ searchParams }: PageProps<"/admin/leads">) {
  await requireAdmin();
  const { q, status } = (await searchParams) as { q?: string; status?: string };

  const where: SQL[] = [];
  if (q) where.push(or(ilike(leads.name, `%${q}%`), ilike(leads.email, `%${q}%`), ilike(leads.phone, `%${q}%`), ilike(leads.interest, `%${q}%`))!);
  if (status && (schema.leadStatus.enumValues as readonly string[]).includes(status)) {
    where.push(eq(leads.status, status as (typeof schema.leadStatus.enumValues)[number]));
  }

  const rows = await db.select().from(leads).where(and(...where)).orderBy(desc(leads.createdAt)).limit(200);

  return (
    <>
      <PageHeader
        title="Leads"
        description="Inquiries from the website contact form, calls, WhatsApp and referrals."
        actions={<LinkButton href="/admin/leads/new">+ New lead</LinkButton>}
      />
      <Filters q={q} status={status} statuses={schema.leadStatus.enumValues} placeholder="Search name, phone, interest…" />
      <Table head={["Name", "Interest", "Contact", "Source", "Status", "Follow up", "Received"]} empty="No leads match. Contact form submissions will appear here.">
        {rows.map((l) => (
          <tr key={l.id} className="hover:bg-cream/50">
            <Td>
              <RowLink href={`/admin/leads/${l.id}`}>{l.name}</RowLink>
            </Td>
            <Td className="max-w-[16rem] truncate text-ink/70">{l.interest ?? l.message ?? "—"}</Td>
            <Td className="text-ink/70">
              {l.phone && <div>{l.phone}</div>}
              {l.email && <div className="text-xs">{l.email}</div>}
            </Td>
            <Td className="text-ink/70">{l.source}</Td>
            <Td>
              <Badge value={l.status} />
            </Td>
            <Td className="text-ink/70">{formatDate(l.followUpOn)}</Td>
            <Td className="text-ink/50">{formatDate(l.createdAt)}</Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
