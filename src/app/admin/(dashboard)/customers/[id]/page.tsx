import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { ActivityLog } from "@/components/admin/ActivityLog";
import { ActionForm, ConfirmButton } from "@/components/admin/form";
import { formatDate, formatKES } from "@/components/admin/format";
import { Badge, Card, LinkButton, PageHeader, Stat } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { deleteCustomer, saveCustomer } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { CustomerFields } from "../CustomerFields";

const { customers, orders } = schema;

export default async function CustomerPage({ params }: PageProps<"/admin/customers/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [customer] = await db.select().from(customers).where(eq(customers.id, id));
  if (!customer) notFound();

  const history = await db.select().from(orders).where(eq(orders.customerId, id)).orderBy(desc(orders.orderDate), desc(orders.id));
  const live = history.filter((o) => o.status !== "cancelled");
  const spent = live.reduce((s, o) => s + o.total, 0);
  const owed = live.reduce((s, o) => s + Math.max(0, o.total - o.amountPaid), 0);

  return (
    <>
      <PageHeader
        title={customer.name}
        description={
          <>
            <Badge value={customer.type} /> <span className="ml-2">Customer since {formatDate(customer.createdAt)}</span>
          </>
        }
        back={{ href: "/admin/customers", label: "Customers" }}
        actions={
          <>
            <LinkButton href={`/admin/orders/new?customer=${customer.id}`}>+ New order</LinkButton>
            <ConfirmButton action={deleteCustomer.bind(null, customer.id)} />
          </>
        }
      />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <Stat label="Orders" value={live.length} />
        <Stat label="Total spent" value={formatKES(spent)} />
        <Stat label="Balance owed" value={formatKES(owed)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Card title="Orders">
            {history.length === 0 ? (
              <p className="text-sm text-ink/45">No orders yet.</p>
            ) : (
              <ul className="divide-y divide-forest/5">
                {history.map((o) => (
                  <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                    <Link href={`/admin/orders/${o.id}`} className="text-sm">
                      <span className="font-bold text-forest">#{o.id}</span> <span className="text-ink/50">{formatDate(o.orderDate)}</span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{formatKES(o.total)}</span>
                      <Badge value={o.status} />
                      <Badge value={o.paymentStatus} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <Card title="Details">
            <ActionForm action={saveCustomer.bind(null, customer.id)}>
              <CustomerFields customer={customer} />
            </ActionForm>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <ActivityLog entityType="customer" entityId={customer.id} />
        </div>
      </div>
    </>
  );
}
