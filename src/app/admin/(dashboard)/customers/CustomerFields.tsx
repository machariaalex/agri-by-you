import { SelectField, TextArea, TextField } from "@/components/admin/form";
import { schema } from "@/db";

export function CustomerFields({ customer = {} }: { customer?: Partial<typeof schema.customers.$inferSelect> }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Customer / business name" defaultValue={customer.name} required />
        <SelectField name="type" label="Type" options={schema.customerType.enumValues} defaultValue={customer.type ?? "household"} />
        <TextField name="contactName" label="Contact person" defaultValue={customer.contactName} />
        <TextField name="location" label="Location" defaultValue={customer.location} placeholder="e.g. Westlands, Nairobi" />
        <TextField name="phone" label="Phone / WhatsApp" type="tel" defaultValue={customer.phone} />
        <TextField name="email" label="Email" type="email" defaultValue={customer.email} />
      </div>
      <TextArea name="notes" label="Notes" defaultValue={customer.notes} placeholder="Delivery preferences, payment terms…" />
    </>
  );
}
