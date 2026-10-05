import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getPublishedPost } from "@/lib/content";
import { unsplash } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} — Journal`, description: post.excerpt ?? undefined };
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();

  const date = new Date(`${post.publishedOn}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const minutes = Math.max(1, Math.round(post.body.split(/\s+/).length / 220));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-16">
          <Image
            src={unsplash(post.coverImage, "auto=format&fit=crop&q=80&w=2000")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/50 to-forest-dark/20" />

          <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 lg:px-10">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cream/70 transition-colors hover:text-gold-light"
            >
              <ArrowLeft size={15} />
              Back to Journal
            </Link>
            <h1 className="mt-6 text-balance font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
              <span className="flex items-center gap-1.5">
                <User size={14} /> AgriByYou Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {minutes} min read
              </span>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          {post.excerpt && (
            <p className="mb-8 text-balance font-display text-2xl leading-snug text-forest sm:text-3xl">
              {post.excerpt}
            </p>
          )}
          <ArticleBody body={post.body} />
          <div className="mt-16 border-t border-forest/10 pt-10 text-center">
            <p className="font-display text-2xl text-forest sm:text-3xl">
              AgriByYou &mdash; We farm the way you would farm it.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-gold"
            >
              Get in touch
              <ArrowUpRight size={16} />
            </a>
          </div>
        </article>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
