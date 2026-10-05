import { and, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { formatDate, formatKES } from "@/components/admin/format";
import { Badge, Filters, LinkButton, PageHeader, RowLink, Table, Td } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Customers" };

const { customers, orders } = schema;

export default async function CustomersPage({ searchParams }: PageProps<"/admin/customers">) {
  await requireAdmin();
  const { q, status: type } = (await searchParams) as { q?: string; status?: string };

  const where: SQL[] = [];
  if (q) where.push(or(ilike(customers.name, `%${q}%`), ilike(customers.phone, `%${q}%`), ilike(customers.email, `%${q}%`), ilike(customers.location, `%${q}%`))!);
  if (type && (schema.customerType.enumValues as readonly string[]).includes(type)) {
    where.push(eq(customers.type, type as (typeof schema.customerType.enumValues)[number]));
  }

  const rows = await db
    .select({
      id: customers.id,
      name: customers.name,
      type: customers.type,
      phone: customers.phone,
      location: customers.location,
      orderCount: sql<number>`count(${orders.id})`.mapWith(Number),
      spent: sql<number>`coalesce(sum(${orders.total}) filter (where ${orders.status} <> 'cancelled'), 0)`.mapWith(Number),
      lastOrder: sql<string | null>`max(${orders.orderDate})`,
    })
    .from(customers)
    .leftJoin(orders, eq(orders.customerId, customers.id))
    .where(and(...where))
    .groupBy(customers.id)
    .orderBy(desc(customers.createdAt))
    .limit(300);

  return (
    <>
      <PageHeader
        title="Customers"
        description="Households, restaurants and businesses buying from the farm."
        actions={<LinkButton href="/admin/customers/new">+ New customer</LinkButton>}
      />
      <Filters q={q} status={type} statuses={schema.customerType.enumValues} placeholder="Search name, phone, location…" />
      <Table head={["Name", "Type", "Phone", "Location", "Orders", "Total spent", "Last order"]} empty="No customers yet. Convert a lead or add one.">
        {rows.map((c) => (
          <tr key={c.id} className="hover:bg-cream/50">
            <Td>
              <RowLink href={`/admin/customers/${c.id}`}>{c.name}</RowLink>
            </Td>
            <Td>
              <Badge value={c.type} />
            </Td>
            <Td className="text-ink/70">{c.phone ?? "—"}</Td>
            <Td className="text-ink/70">{c.location ?? "—"}</Td>
            <Td>{c.orderCount}</Td>
            <Td className="font-bold">{formatKES(c.spent)}</Td>
            <Td className="text-ink/50">{formatDate(c.lastOrder)}</Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
