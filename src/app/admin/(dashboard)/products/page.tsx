import { asc } from "drizzle-orm";
import { ActionForm, Checkbox, ConfirmButton, TextField } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { deleteProduct, saveProduct } from "@/lib/actions/sales";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  await requireAdmin();
  const products = await db.select().from(schema.products).orderBy(asc(schema.products.name));

  return (
    <>
      <PageHeader title="Products" description="Price list used to fill order lines. Prices are per unit, in KES." />
      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id}>
            <div className="flex flex-wrap items-start gap-4">
              <ActionForm action={saveProduct.bind(null, p.id)} className="grid flex-1 items-end gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
                <TextField name="name" label="Name" defaultValue={p.name} />
                <TextField name="unit" label="Unit" defaultValue={p.unit} />
                <TextField name="price" label="Price (KES)" type="number" step="1" defaultValue={p.price} />
                <div className="pb-2.5">
                  <Checkbox name="active" label="Active" defaultChecked={p.active} />
                </div>
              </ActionForm>
              <ConfirmButton action={deleteProduct.bind(null, p.id)} confirm={`Delete ${p.name}? Existing orders keep their lines.`} variant="secondary" />
            </div>
          </Card>
        ))}
        <Card title="Add a product">
          <ActionForm action={saveProduct.bind(null, null)} submitLabel="Add product" resetOnSuccess className="grid items-end gap-3 sm:grid-cols-[2fr_1fr_1fr_auto]">
            <TextField name="name" label="Name" placeholder="e.g. Red onions" />
            <TextField name="unit" label="Unit" defaultValue="kg" />
            <TextField name="price" label="Price (KES)" type="number" step="1" defaultValue={0} />
            <div className="pb-2.5">
              <Checkbox name="active" label="Active" defaultChecked />
            </div>
          </ActionForm>
        </Card>
      </div>
    </>
  );
}
