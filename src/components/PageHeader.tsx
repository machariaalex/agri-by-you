import Image from "next/image";
import { unsplash } from "@/lib/images";

export function PageHeader({ title, image }: { title: string; image: string }) {
  return (
    <section className="relative flex min-h-[38vh] items-center overflow-hidden pt-16">
      <Image
        src={unsplash(image, "auto=format&fit=crop&q=70&w=1600")}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest-dark/70" />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-14 text-center">
        <h1 className="font-display text-4xl text-white sm:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
