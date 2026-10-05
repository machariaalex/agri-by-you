import Image from "next/image";
import { unsplash } from "@/lib/images";
import { Squiggle } from "./Squiggle";

type Block =
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "image"; src: string; caption: string }
  | { kind: "paragraph"; text: string };

/**
 * Parses the journal body format used in the admin editor:
 * blank lines split blocks; "## " starts a heading, "> " a pull quote,
 * and "![caption](/images/…)" an image.
 */
export function parseArticle(body: string): Block[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { kind: "heading", text: chunk.slice(3).trim() };
      if (chunk.startsWith("> ")) return { kind: "quote", text: chunk.replace(/^>\s?/gm, "").trim() };
      const img = chunk.match(/^!\[(.*?)\]\((\S+?)\)$/);
      if (img) return { kind: "image", caption: img[1], src: img[2] };
      return { kind: "paragraph", text: chunk.replace(/\n/g, " ") };
    });
}

export function ArticleBody({ body }: { body: string }) {
  return (
    <div className="space-y-6 text-[17px] leading-relaxed text-ink/70">
      {parseArticle(body).map((block, i) => {
        switch (block.kind) {
          case "heading":
            return (
              <div key={i} className="pt-8">
                <h2 className="font-display text-2xl text-forest sm:text-3xl">{block.text}</h2>
                <Squiggle className="mt-3" />
              </div>
            );
          case "quote":
            return (
              <blockquote key={i} className="relative my-10 overflow-hidden rounded-3xl bg-forest px-8 py-10 sm:px-12">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
                <p className="relative text-balance font-display text-2xl leading-snug text-cream sm:text-3xl">
                  &ldquo;{block.text}&rdquo;
                </p>
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={unsplash(block.src, "auto=format&fit=crop&q=80&w=1400")}
                    alt={block.caption}
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-ink/45">{block.caption}</figcaption>
                )}
              </figure>
            );
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
