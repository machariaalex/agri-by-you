import { unsplash } from "@/lib/images";

/** Small thumbnail for content images (site paths, URLs or Unsplash ids). */
export function ImagePreview({ src, round = false }: { src: string; round?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail of arbitrary sources
    <img
      src={unsplash(src, "auto=format&fit=crop&q=60&w=160&h=160")}
      alt=""
      className={`h-12 w-12 shrink-0 object-cover ${round ? "rounded-full" : "rounded-lg"} bg-cream-dark`}
    />
  );
}
