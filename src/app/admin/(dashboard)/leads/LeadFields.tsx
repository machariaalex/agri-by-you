import { SelectField, TextArea, TextField } from "@/components/admin/form";
import { schema } from "@/db";

type Lead = Partial<typeof schema.leads.$inferSelect>;

export function LeadFields({ lead = {} }: { lead?: Lead }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Name" defaultValue={lead.name} required />
        <TextField name="interest" label="Interested in" defaultValue={lead.interest} placeholder="e.g. Weekly onions, 50kg" />
        <TextField name="email" label="Email" type="email" defaultValue={lead.email} />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" defaultValue={lead.phone} />
        <SelectField name="status" label="Status" options={schema.leadStatus.enumValues} defaultValue={lead.status ?? "new"} />
        <SelectField name="source" label="Source" options={schema.leadSource.enumValues} defaultValue={lead.source ?? "phone"} />
        <TextField name="followUpOn" label="Follow up on" type="date" defaultValue={lead.followUpOn} />
      </div>
      <TextArea name="message" label="Message / details" rows={5} defaultValue={lead.message} />
    </>
  );
}
