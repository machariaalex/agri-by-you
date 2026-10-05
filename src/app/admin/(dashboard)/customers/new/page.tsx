import { ActionForm } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { saveCustomer } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { CustomerFields } from "../CustomerFields";

export const metadata = { title: "New customer" };

export default async function NewCustomerPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New customer" back={{ href: "/admin/customers", label: "Customers" }} />
      <Card className="max-w-3xl">
        <ActionForm action={saveCustomer.bind(null, null)} submitLabel="Create customer">
          <CustomerFields />
        </ActionForm>
      </Card>
    </>
  );
}
