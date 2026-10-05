import Link from "next/link";
import { and, count, desc, eq, gte, inArray, lte, ne, sql, sum } from "drizzle-orm";
import { formatDate, formatKES, todayISO } from "@/components/admin/format";
import { Badge, Card, LinkButton, PageHeader, Stat } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

const { customers, leads, orders, partners } = schema;

export default async function OverviewPage() {
  const me = await requireAdmin();
  const today = todayISO();
  const monthStart = `${today.slice(0, 7)}-01`;

  const [pipeline, [month], [outstanding], [customerCount], [partnerCount], recentLeads, recentOrders, followUps] =
    await Promise.all([
      db.select({ status: leads.status, n: count() }).from(leads).groupBy(leads.status),
      db
        .select({ n: count(), revenue: sum(orders.total).mapWith(Number) })
        .from(orders)
        .where(and(gte(orders.orderDate, monthStart), ne(orders.status, "cancelled"))),
      db
        .select({ amount: sql<number>`coalesce(sum(${orders.total} - ${orders.amountPaid}), 0)`.mapWith(Number), n: count() })
        .from(orders)
        .where(and(ne(orders.paymentStatus, "paid"), ne(orders.status, "cancelled"))),
      db.select({ n: count() }).from(customers),
      db.select({ n: count() }).from(partners).where(eq(partners.status, "active")),
      db.select().from(leads).orderBy(desc(leads.createdAt)).limit(6),
      db
        .select({ id: orders.id, total: orders.total, status: orders.status, paymentStatus: orders.paymentStatus, orderDate: orders.orderDate, customer: customers.name })
        .from(orders)
        .innerJoin(customers, eq(customers.id, orders.customerId))
        .orderBy(desc(orders.orderDate), desc(orders.id))
        .limit(6),
      db
        .select()
        .from(leads)
        .where(and(lte(leads.followUpOn, today), inArray(leads.status, ["new", "contacted", "qualified"])))
        .orderBy(leads.followUpOn)
        .limit(8),
    ]);

  const byStatus = Object.fromEntries(pipeline.map((p) => [p.status, p.n]));
  const totalLeads = pipeline.reduce((s, p) => s + p.n, 0);
  const openLeads = (byStatus.new ?? 0) + (byStatus.contacted ?? 0) + (byStatus.qualified ?? 0);

  return (
    <>
      <PageHeader
        title={`Hello, ${me.name.split(" ")[0]}`}
        description="Here's what's happening across the farm business."
        actions={
          <>
            <LinkButton href="/admin/leads/new" variant="secondary">
              + Lead
            </LinkButton>
            <LinkButton href="/admin/orders/new">+ Order</LinkButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="New leads" value={byStatus.new ?? 0} hint={`${openLeads} open in pipeline`} href="/admin/leads?status=new" />
        <Stat label="Sales this month" value={formatKES(month.revenue ?? 0)} hint={`${month.n} orders`} href="/admin/orders" />
        <Stat label="Unpaid balance" value={formatKES(outstanding.amount)} hint={`${outstanding.n} orders`} href="/admin/orders?payment=unpaid" />
        <Stat label="Customers" value={customerCount.n} hint={`${partnerCount.n} active partners`} href="/admin/customers" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Lead pipeline" className="lg:col-span-1">
          <ul className="space-y-3">
            {schema.leadStatus.enumValues.map((status) => {
              const n = byStatus[status] ?? 0;
              return (
                <li key={status}>
                  <Link href={`/admin/leads?status=${status}`} className="group block">
                    <div className="flex justify-between text-sm">
                      <Badge value={status} />
                      <span className="font-bold text-forest">{n}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-dark">
                      <div className="h-full rounded-full bg-forest transition-all group-hover:bg-leaf" style={{ width: `${totalLeads ? (n / totalLeads) * 100 : 0}%` }} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card title="Follow-ups due" className="lg:col-span-2" actions={<Link href="/admin/leads" className="text-sm font-bold text-forest hover:text-gold">All leads →</Link>}>
          {followUps.length === 0 ? (
            <p className="text-sm text-ink/45">Nothing due. Set a follow-up date on a lead to see it here.</p>
          ) : (
            <ul className="divide-y divide-forest/5">
              {followUps.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-3 py-2.5">
                  <Link href={`/admin/leads/${l.id}`} className="min-w-0 truncate font-bold text-forest hover:text-gold">
                    {l.name}
                    {l.interest && <span className="font-normal text-ink/50"> · {l.interest}</span>}
                  </Link>
                  <span className={`shrink-0 text-xs font-bold ${l.followUpOn! < today ? "text-red-700" : "text-amber-700"}`}>
                    {l.followUpOn! < today ? "Overdue · " : "Today · "}
                    {formatDate(l.followUpOn)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Latest leads" className="lg:col-span-1">
          <ul className="divide-y divide-forest/5">
            {recentLeads.length === 0 && <li className="text-sm text-ink/45">Contact form messages land here.</li>}
            {recentLeads.map((l) => (
              <li key={l.id} className="py-2.5">
                <Link href={`/admin/leads/${l.id}`} className="flex items-center justify-between gap-2">
                  <span className="min-w-0 truncate text-sm font-bold text-forest">{l.name}</span>
                  <Badge value={l.status} />
                </Link>
                <p className="mt-0.5 text-xs text-ink/45">
                  {formatDate(l.createdAt)} · {l.source}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recent orders" className="lg:col-span-2" actions={<Link href="/admin/orders" className="text-sm font-bold text-forest hover:text-gold">All orders →</Link>}>
          <ul className="divide-y divide-forest/5">
            {recentOrders.length === 0 && <li className="text-sm text-ink/45">No orders yet.</li>}
            {recentOrders.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <Link href={`/admin/orders/${o.id}`} className="min-w-0 text-sm">
                  <span className="font-bold text-forest">#{o.id}</span> <span className="text-ink/70">{o.customer}</span>
                  <span className="block text-xs text-ink/45">{formatDate(o.orderDate)}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{formatKES(o.total)}</span>
                  <Badge value={o.status} />
                  <Badge value={o.paymentStatus} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
