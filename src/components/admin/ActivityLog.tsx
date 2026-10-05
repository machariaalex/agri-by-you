import { and, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { addActivity, deleteActivity } from "@/lib/actions/crm";
import { ActionForm, ConfirmButton, SelectField, TextArea } from "./form";
import { formatDate, titleCase } from "./format";
import { Card } from "./ui";

const { activities, adminUsers } = schema;

export async function ActivityLog({ entityType, entityId }: { entityType: "lead" | "customer" | "partner"; entityId: number }) {
  const rows = await db
    .select({
      id: activities.id,
      kind: activities.kind,
      body: activities.body,
      createdAt: activities.createdAt,
      author: adminUsers.name,
    })
    .from(activities)
    .leftJoin(adminUsers, eq(adminUsers.id, activities.authorId))
    .where(and(eq(activities.entityType, entityType), eq(activities.entityId, entityId)))
    .orderBy(desc(activities.createdAt));

  return (
    <Card title="Activity">
      <ActionForm action={addActivity.bind(null, entityType, entityId)} submitLabel="Log it" resetOnSuccess>
        <SelectField name="kind" label="Type" options={schema.activityKind.enumValues} defaultValue="call" />
        <TextArea name="body" label="What happened?" rows={3} placeholder="e.g. Called Jane, wants 50kg onions weekly from November" />
      </ActionForm>

      <ol className="mt-6 space-y-4 border-l-2 border-forest/10 pl-4">
        {rows.length === 0 && <li className="text-sm text-ink/45">No activity logged yet.</li>}
        {rows.map((a) => (
          <li key={a.id} className="group relative">
            <span className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full bg-forest ring-4 ring-white" />
            <p className="text-xs font-bold text-ink/45">
              {titleCase(a.kind)} · {formatDate(a.createdAt, true)}
              {a.author && ` · ${a.author}`}
            </p>
            <p className="mt-1 whitespace-pre-line text-sm text-ink/80">{a.body}</p>
            <div className="mt-1 hidden group-hover:block group-focus-within:block">
              <ConfirmButton action={deleteActivity.bind(null, a.id)} label="Remove" confirm="Remove this entry?" variant="secondary" />
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
