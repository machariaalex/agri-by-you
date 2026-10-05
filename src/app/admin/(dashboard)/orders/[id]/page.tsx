import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { ConfirmButton } from "@/components/admin/form";
import { formatDate, formatKES } from "@/components/admin/format";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { deleteOrder } from "@/lib/actions/sales";
import { requireAdmin } from "@/lib/auth/session";
import { OrderForm } from "../OrderForm";

const { customers, orderItems, orders } = schema;

export default async function OrderPage({ params }: PageProps<"/admin/orders/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [row] = await db.select({ order: orders, customer: customers }).from(orders).innerJoin(customers, eq(customers.id, orders.customerId)).where(eq(orders.id, id));
  if (!row) notFound();
  const { order, customer } = row;
  const items = await db
    .select({ productId: orderItems.productId, description: orderItems.description, quantity: orderItems.quantity, unitPrice: orderItems.unitPrice })
    .from(orderItems)
    .where(eq(orderItems.orderId, id))
    .orderBy(asc(orderItems.id));

  return (
    <>
      <PageHeader
        title={`Order #${order.id}`}
        description={
          <>
            <Badge value={order.status} /> <Badge value={order.paymentStatus} />
            <span className="ml-2">
              <Link href={`/admin/customers/${customer.id}`} className="font-bold text-forest hover:text-gold">
                {customer.name}
              </Link>{" "}
              · {formatDate(order.orderDate)} · {formatKES(order.total)}
              {order.total > order.amountPaid && ` · ${formatKES(order.total - order.amountPaid)} owed`}
            </span>
          </>
        }
        back={{ href: "/admin/orders", label: "Orders" }}
        actions={<ConfirmButton action={deleteOrder.bind(null, order.id)} confirm="Delete this order and its items?" />}
      />
      <Card>
        <OrderForm order={order} items={items} />
      </Card>
    </>
  );
}
