import { ActionForm } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { savePost } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { PostFields } from "../PostFields";

export const metadata = { title: "New article" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader title="New article" back={{ href: "/admin/content/posts", label: "Journal" }} />
      <Card className="max-w-4xl">
        <ActionForm action={savePost.bind(null, null)} submitLabel="Create article">
          <PostFields />
        </ActionForm>
      </Card>
    </>
  );
}
