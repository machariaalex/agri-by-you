import Link from "next/link";
import { and, desc, eq, ilike, type SQL } from "drizzle-orm";
import { formatDate, formatKES, titleCase } from "@/components/admin/format";
import { Badge, buttonClass, LinkButton, PageHeader, RowLink, Table, Td } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Orders" };

const { customers, orders } = schema;
const selectClass = "rounded-full border border-forest/10 bg-white px-4 py-2 text-sm focus:border-forest focus:outline-none";

export default async function OrdersPage({ searchParams }: PageProps<"/admin/orders">) {
  await requireAdmin();
  const { q, status, payment } = (await searchParams) as { q?: string; status?: string; payment?: string };

  const where: SQL[] = [];
  if (q) where.push(ilike(customers.name, `%${q}%`));
  if (status && (schema.orderStatus.enumValues as readonly string[]).includes(status)) {
    where.push(eq(orders.status, status as (typeof schema.orderStatus.enumValues)[number]));
  }
  if (payment && (schema.paymentStatus.enumValues as readonly string[]).includes(payment)) {
    where.push(eq(orders.paymentStatus, payment as (typeof schema.paymentStatus.enumValues)[number]));
  }

  const rows = await db
    .select({
      id: orders.id,
      orderDate: orders.orderDate,
      deliveryDate: orders.deliveryDate,
      status: orders.status,
      paymentStatus: orders.paymentStatus,
      total: orders.total,
      amountPaid: orders.amountPaid,
      customerId: customers.id,
      customer: customers.name,
    })
    .from(orders)
    .innerJoin(customers, eq(customers.id, orders.customerId))
    .where(and(...where))
    .orderBy(desc(orders.orderDate), desc(orders.id))
    .limit(300);

  const shown = rows.filter((r) => r.status !== "cancelled");
  const total = shown.reduce((s, r) => s + r.total, 0);
  const owed = shown.reduce((s, r) => s + Math.max(0, r.total - r.amountPaid), 0);

  return (
    <>
      <PageHeader
        title="Orders"
        description={`${shown.length} orders · ${formatKES(total)} · ${formatKES(owed)} unpaid`}
        actions={<LinkButton href="/admin/orders/new">+ New order</LinkButton>}
      />
      <form className="mb-4 flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Search customer…" aria-label="Search customer" className={`${selectClass} min-w-0 basis-full sm:max-w-xs sm:flex-1 sm:basis-auto`} />
        <select name="status" defaultValue={status ?? ""} aria-label="Order status" className={selectClass}>
          <option value="">All statuses</option>
          {schema.orderStatus.enumValues.map((s) => (
            <option key={s} value={s}>
              {titleCase(s)}
            </option>
          ))}
        </select>
        <select name="payment" defaultValue={payment ?? ""} aria-label="Payment status" className={selectClass}>
          <option value="">Any payment</option>
          {schema.paymentStatus.enumValues.map((s) => (
            <option key={s} value={s}>
              {titleCase(s)}
            </option>
          ))}
        </select>
        <button className={buttonClass("secondary")}>Apply</button>
      </form>
      <Table head={["Order", "Customer", "Date", "Delivery", "Total", "Paid", "Status", "Payment"]} empty="No orders match.">
        {rows.map((o) => (
          <tr key={o.id} className="hover:bg-cream/50">
            <Td>
              <RowLink href={`/admin/orders/${o.id}`}>#{o.id}</RowLink>
            </Td>
            <Td>
              <Link href={`/admin/customers/${o.customerId}`} className="hover:text-forest">
                {o.customer}
              </Link>
            </Td>
            <Td className="text-ink/70">{formatDate(o.orderDate)}</Td>
            <Td className="text-ink/70">{formatDate(o.deliveryDate)}</Td>
            <Td className="font-bold">{formatKES(o.total)}</Td>
            <Td className="text-ink/70">{formatKES(o.amountPaid)}</Td>
            <Td>
              <Badge value={o.status} />
            </Td>
            <Td>
              <Badge value={o.paymentStatus} />
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
