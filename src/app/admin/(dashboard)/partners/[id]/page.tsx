import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ActivityLog } from "@/components/admin/ActivityLog";
import { ActionForm, ConfirmButton } from "@/components/admin/form";
import { titleCase } from "@/components/admin/format";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { deletePartner, savePartner } from "@/lib/actions/crm";
import { requireAdmin } from "@/lib/auth/session";
import { PartnerFields } from "../PartnerFields";

export default async function PartnerPage({ params }: PageProps<"/admin/partners/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [partner] = await db.select().from(schema.partners).where(eq(schema.partners.id, id));
  if (!partner) notFound();

  return (
    <>
      <PageHeader
        title={partner.name}
        description={
          <>
            <Badge value={partner.status} /> <span className="ml-2">{titleCase(partner.kind)}</span>
          </>
        }
        back={{ href: "/admin/partners", label: "Partners & suppliers" }}
        actions={<ConfirmButton action={deletePartner.bind(null, partner.id)} />}
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <Card title="Details" className="lg:col-span-3">
          <ActionForm action={savePartner.bind(null, partner.id)}>
            <PartnerFields partner={partner} />
          </ActionForm>
        </Card>
        <div className="lg:col-span-2">
          <ActivityLog entityType="partner" entityId={partner.id} />
        </div>
      </div>
    </>
  );
}
