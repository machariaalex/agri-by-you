import { asc, eq } from "drizzle-orm";
import { ActionForm, SelectField, TextArea, TextField } from "@/components/admin/form";
import { todayISO } from "@/components/admin/format";
import { OrderLines, type OrderLine } from "@/components/admin/OrderLines";
import { db, schema } from "@/db";
import { saveOrder } from "@/lib/actions/sales";

type Order = typeof schema.orders.$inferSelect;

export async function OrderForm({ order, items = [], customerId }: { order?: Order; items?: OrderLine[]; customerId?: number }) {
  const [customers, products] = await Promise.all([
    db.select({ id: schema.customers.id, name: schema.customers.name }).from(schema.customers).orderBy(asc(schema.customers.name)),
    db
      .select({ id: schema.products.id, name: schema.products.name, unit: schema.products.unit, price: schema.products.price })
      .from(schema.products)
      .where(eq(schema.products.active, true))
      .orderBy(asc(schema.products.name)),
  ]);

  return (
    <ActionForm action={saveOrder.bind(null, order?.id ?? null)} submitLabel={order ? "Save order" : "Create order"}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SelectField
          name="customerId"
          label="Customer"
          className="sm:col-span-2"
          emptyLabel="Choose a customer…"
          options={customers.map((c) => ({ value: c.id, label: c.name }))}
          defaultValue={order?.customerId ?? customerId}
          hint={customers.length === 0 ? "Add a customer first." : undefined}
        />
        <SelectField name="status" label="Status" options={schema.orderStatus.enumValues} defaultValue={order?.status ?? "pending"} />
        <TextField name="amountPaid" label="Amount paid (KES)" type="number" step="1" defaultValue={order?.amountPaid ?? 0} hint="Payment status updates from this." />
        <TextField name="orderDate" label="Order date" type="date" defaultValue={order?.orderDate ?? todayISO()} />
        <TextField name="deliveryDate" label="Delivery date" type="date" defaultValue={order?.deliveryDate} />
      </div>
      <OrderLines products={products} initial={items} />
      <TextArea name="notes" label="Notes" rows={3} defaultValue={order?.notes} placeholder="Delivery address, M-Pesa reference…" />
    </ActionForm>
  );
}
