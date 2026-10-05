import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ActionForm, ConfirmButton } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { db } from "@/db";
import { deleteBlock, saveBlock } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { BlockMetaFields, blockConfig, isBlockKind } from "../../blocks";
import { ImagePreview } from "../../ImagePreview";

export default async function EditBlockPage({ params }: PageProps<"/admin/content/[kind]/[id]">) {
  await requireAdmin();
  const { kind, id: rawId } = await params;
  const id = Number(rawId);
  if (!isBlockKind(kind) || !Number.isInteger(id)) notFound();
  const config = blockConfig[kind];
  const [row] = (await db.select().from(config.table).where(eq(config.table.id, id))) as Record<string, unknown>[];
  if (!row) notFound();
  const { Fields } = config;

  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-4">
            <ImagePreview src={config.image(row)} round={kind === "testimonials"} />
            {config.label(row)}
          </span>
        }
        back={{ href: `/admin/content/${kind}`, label: config.title }}
        actions={<ConfirmButton action={deleteBlock.bind(null, kind, id)} confirm={`Delete this ${config.singular} from the website?`} />}
      />
      <Card className="max-w-3xl">
        <ActionForm action={saveBlock.bind(null, kind, id)}>
          <Fields row={row} />
          <BlockMetaFields row={row} />
        </ActionForm>
      </Card>
    </>
  );
}
