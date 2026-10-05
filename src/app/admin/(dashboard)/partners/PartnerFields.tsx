import { SelectField, TextArea, TextField } from "@/components/admin/form";
import { schema } from "@/db";

export function PartnerFields({ partner = {} }: { partner?: Partial<typeof schema.partners.$inferSelect> }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Organisation name" defaultValue={partner.name} required />
        <SelectField name="kind" label="Relationship" options={schema.partnerKind.enumValues} defaultValue={partner.kind ?? "supplier"} />
        <SelectField name="status" label="Status" options={schema.partnerStatus.enumValues} defaultValue={partner.status ?? "active"} />
        <TextField name="contactName" label="Contact person" defaultValue={partner.contactName} />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" defaultValue={partner.phone} />
        <TextField name="email" label="Email" type="email" defaultValue={partner.email} />
        <TextField name="location" label="Location" defaultValue={partner.location} />
        <TextField name="offering" label="Supplies / offers" defaultValue={partner.offering} placeholder="e.g. Onion seed, drip kits, transport" />
      </div>
      <TextArea name="notes" label="Notes" defaultValue={partner.notes} placeholder="Terms, pricing, reliability…" />
    </>
  );
}
