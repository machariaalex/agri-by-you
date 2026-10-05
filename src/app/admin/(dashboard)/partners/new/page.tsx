import { ActionForm } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { savePartner } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { PartnerFields } from "../PartnerFields";

export const metadata = { title: "New partner" };

export default async function NewPartnerPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New partner" back={{ href: "/admin/partners", label: "Partners & suppliers" }} />
      <Card className="max-w-3xl">
        <ActionForm action={savePartner.bind(null, null)} submitLabel="Create partner">
          <PartnerFields />
        </ActionForm>
      </Card>
    </>
  );
}
