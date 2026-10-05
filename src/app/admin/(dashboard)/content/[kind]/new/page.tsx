import { notFound } from "next/navigation";
import { ActionForm } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { saveBlock } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { BlockMetaFields, blockConfig, isBlockKind } from "../../blocks";

export default async function NewBlockPage({ params }: PageProps<"/admin/content/[kind]/new">) {
  await requireAdmin();
  const { kind } = await params;
  if (!isBlockKind(kind)) notFound();
  const { Fields, singular, title } = blockConfig[kind];

  return (
    <>
      <PageHeader title={`New ${singular}`} back={{ href: `/admin/content/${kind}`, label: title }} />
      <Card className="max-w-3xl">
        <ActionForm action={saveBlock.bind(null, kind, null)} submitLabel={`Create ${singular}`}>
          <Fields />
          <BlockMetaFields />
        </ActionForm>
      </Card>
    </>
  );
}
