import { SelectField, TextArea, TextField, Checkbox } from "@/components/admin/form";
import { schema } from "@/db";
import type { BlockKind } from "@/lib/actions/content";
import { serviceIconNames } from "@/lib/serviceIcons";

const imageHint = "A site path (/images/…), a full https:// URL, or an Unsplash photo id.";

type Row = Record<string, unknown> & { id?: number; sortOrder?: number; published?: boolean };

export const blockConfig: Record<
  BlockKind,
  {
    title: string;
    singular: string;
    description: string;
    table: typeof schema.testimonials | typeof schema.projects | typeof schema.services;
    label: (row: Row) => string;
    sub: (row: Row) => string;
    image: (row: Row) => string;
    Fields: (props: { row?: Row }) => React.ReactNode;
  }
> = {
  services: {
    title: "Services",
    singular: "service",
    description: "Cards in the “Services we're offering” section.",
    table: schema.services,
    label: (r) => String(r.title),
    sub: (r) => String(r.description),
    image: (r) => String(r.image),
    Fields: ({ row = {} }) => (
      <>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="title" label="Title" defaultValue={row.title as string} />
          <SelectField name="icon" label="Icon" options={serviceIconNames.map((n) => ({ value: n, label: n }))} defaultValue={(row.icon as string) ?? "Sprout"} />
        </div>
        <TextArea name="description" label="Description" rows={3} defaultValue={row.description as string} />
        <TextField name="image" label="Image" defaultValue={row.image as string} hint={imageHint} />
      </>
    ),
  },
  projects: {
    title: "Projects",
    singular: "project",
    description: "Featured farms on the Projects page.",
    table: schema.projects,
    label: (r) => String(r.name),
    sub: (r) => `${r.tag} · ${r.location}`,
    image: (r) => String(r.image),
    Fields: ({ row = {} }) => (
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" label="Name" defaultValue={row.name as string} />
        <TextField name="location" label="Location" defaultValue={row.location as string} />
        <TextField name="tag" label="Tag" defaultValue={row.tag as string} placeholder="e.g. Vegetables" />
        <TextField name="image" label="Image" defaultValue={row.image as string} hint={imageHint} />
      </div>
    ),
  },
  testimonials: {
    title: "Testimonials",
    singular: "testimonial",
    description: "Customer quotes on the home and About pages.",
    table: schema.testimonials,
    label: (r) => String(r.name),
    sub: (r) => `${r.role} — “${String(r.quote).slice(0, 90)}…”`,
    image: (r) => String(r.photo),
    Fields: ({ row = {} }) => (
      <>
        <TextArea name="quote" label="Quote" rows={4} defaultValue={row.quote as string} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="name" label="Name" defaultValue={row.name as string} />
          <TextField name="role" label="Role / business" defaultValue={(row.role as string) ?? "Customer"} />
        </div>
        <TextField name="photo" label="Photo" defaultValue={row.photo as string} hint={imageHint} />
      </>
    ),
  },
};

export function isBlockKind(kind: string): kind is BlockKind {
  return kind in blockConfig;
}

export function BlockMetaFields({ row = {} }: { row?: Row }) {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <TextField name="sortOrder" label="Display order" type="number" step="1" defaultValue={row.sortOrder ?? 0} hint="Lower numbers show first." />
      <div className="pb-6">
        <Checkbox name="published" label="Show on website" defaultChecked={row.published ?? true} />
      </div>
    </div>
  );
}
