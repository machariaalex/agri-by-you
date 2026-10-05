import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ActivityLog } from "@/components/admin/ActivityLog";
import { ActionForm, ConfirmButton } from "@/components/admin/form";
import { formatDate } from "@/components/admin/format";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { convertLead, deleteLead, saveLead } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { LeadFields } from "../LeadFields";

export default async function LeadPage({ params }: PageProps<"/admin/leads/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [lead] = await db.select().from(schema.leads).where(eq(schema.leads.id, id));
  if (!lead) notFound();

  return (
    <>
      <PageHeader
        title={lead.name}
        description={
          <>
            <Badge value={lead.status} /> <span className="ml-2">Received {formatDate(lead.createdAt, true)} via {lead.source}</span>
          </>
        }
        back={{ href: "/admin/leads", label: "Leads" }}
        actions={
          <>
            {lead.customerId ? (
              <Link href={`/admin/customers/${lead.customerId}`} className="text-sm font-bold text-forest hover:text-gold">
                View customer →
              </Link>
            ) : (
              <ConfirmButton
                action={convertLead.bind(null, lead.id)}
                label="Convert to customer"
                confirm="Create a customer record from this lead and mark it won?"
                variant="primary"
              />
            )}
            <ConfirmButton action={deleteLead.bind(null, lead.id)} />
          </>
        }
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <Card title="Details" className="lg:col-span-3">
          <ActionForm action={saveLead.bind(null, lead.id)}>
            <LeadFields lead={lead} />
          </ActionForm>
        </Card>
        <div className="lg:col-span-2">
          <ActivityLog entityType="lead" entityId={lead.id} />
        </div>
      </div>
    </>
  );
}
