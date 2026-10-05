import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { ActionForm, ConfirmButton } from "@/components/admin/form";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { deletePost, savePost } from "@/lib/actions/content";
import { requireAdmin } from "@/lib/auth/session";
import { CUSTOM_POST_SLUGS } from "@/lib/content";
import { PostFields } from "../PostFields";

export default async function EditPostPage({ params }: PageProps<"/admin/content/posts/[id]">) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [post] = await db.select().from(schema.posts).where(eq(schema.posts.id, id));
  if (!post) notFound();

  return (
    <>
      <PageHeader
        title={post.title}
        description={
          <>
            <Badge value={post.published ? "published" : "draft"} />
            {post.published && (
              <a href={`/journal/${post.slug}`} target="_blank" className="ml-3 font-bold text-forest hover:text-gold">
                View on site ↗
              </a>
            )}
          </>
        }
        back={{ href: "/admin/content/posts", label: "Journal" }}
        actions={<ConfirmButton action={deletePost.bind(null, post.id)} confirm="Delete this article?" />}
      />
      <Card className="max-w-4xl">
        <ActionForm action={savePost.bind(null, post.id)}>
          <PostFields post={post} customLayout={CUSTOM_POST_SLUGS.includes(post.slug)} />
        </ActionForm>
      </Card>
    </>
  );
}
