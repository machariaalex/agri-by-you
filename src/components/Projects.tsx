import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { unsplash } from "@/lib/images";
import { projects } from "@/lib/data";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-xl text-center">
        <SectionTag>Featured Farms</SectionTag>
        <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
          RECENTLY COMPLETED PROJECTS
        </h2>
        <div className="mt-4 flex justify-center">
          <Squiggle />
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.name} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src={unsplash(project.image, "auto=format&fit=crop&q=80&w=700")}
              alt={project.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/10 to-transparent" />

            <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest-dark">
              {project.tag}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-2xl text-white">{project.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin size={14} />
                {project.location}
              </p>
            </div>

            <div className="absolute right-5 top-5 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white text-forest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
