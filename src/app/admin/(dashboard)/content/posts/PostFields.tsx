import { Checkbox, TextArea, TextField } from "@/components/admin/form";
import { todayISO } from "@/components/admin/format";
import type { schema } from "@/db";

export function PostFields({ post, customLayout = false }: { post?: typeof schema.posts.$inferSelect; customLayout?: boolean }) {
  return (
    <>
      <TextField name="title" label="Title" defaultValue={post?.title} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="slug" label="URL slug" defaultValue={post?.slug} hint="agribyyou.com/journal/your-slug" placeholder="harvest-update-october" />
        <TextField name="publishedOn" label="Date" type="date" defaultValue={post?.publishedOn ?? todayISO()} />
      </div>
      <TextField name="coverImage" label="Cover image" defaultValue={post?.coverImage} hint="A site path (/images/…), a full https:// URL, or an Unsplash photo id." />
      <TextArea name="excerpt" label="Intro / summary" rows={2} defaultValue={post?.excerpt} hint="Shown as the lead paragraph and in search results." />
      {customLayout ? (
        <p className="rounded-xl bg-cream p-4 text-sm text-ink/60">
          This article has a custom-designed page, so its body is edited in the codebase. Title, date, cover image and visibility here still control how it
          appears in the journal list and footer.
        </p>
      ) : (
        <TextArea
          name="body"
          label="Article"
          rows={18}
          defaultValue={post?.body}
          hint={
            <>
              Leave a blank line between paragraphs. Start a line with <code>## </code> for a heading, <code>&gt; </code> for a pull quote, and use{" "}
              <code>![Caption](/images/photo.jpeg)</code> for an image.
            </>
          }
        />
      )}
      <Checkbox name="published" label="Published on the website" defaultChecked={post?.published ?? false} />
    </>
  );
}
