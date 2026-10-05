import { ActionForm } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { saveLead } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { LeadFields } from "../LeadFields";

export const metadata = { title: "New lead" };

export default async function NewLeadPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New lead" back={{ href: "/admin/leads", label: "Leads" }} />
      <Card className="max-w-3xl">
        <ActionForm action={saveLead.bind(null, null)} submitLabel="Create lead">
          <LeadFields />
        </ActionForm>
      </Card>
    </>
  );
}
