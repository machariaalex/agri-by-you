import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth/session";
import { OrderForm } from "../OrderForm";

export const metadata = { title: "New order" };

export default async function NewOrderPage({ searchParams }: PageProps<"/admin/orders/new">) {
  await requireAdmin();
  const { customer } = await searchParams;
  const customerId = Number(customer) || undefined;
  return (
    <>
      <PageHeader title="New order" back={{ href: "/admin/orders", label: "Orders" }} />
      <Card>
        <OrderForm customerId={customerId} />
      </Card>
    </>
  );
}
