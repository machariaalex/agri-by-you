import { getPublishedPosts, getServices } from "@/lib/content";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { SectionTag } from "./SectionTag";
import { SolutionsGrid, type Solution } from "./SolutionsGrid";
import { Squiggle } from "./Squiggle";

/** Service icons that mark an animal product rather than a crop. */
const LIVESTOCK_ICONS = new Set(["Bird", "Egg", "Milk", "Fish"]);

/** What we offer beyond the produce itself. */
const farmServices: Solution[] = [
  {
    id: "svc-partners",
    category: "services",
    size: "wide",
    icon: "Sprout",
    title: "Agribusiness Partnerships",
    description: "Grow with us. We work with farmers, suppliers and buyers who share our organic, soil-first standard.",
    href: "/contact",
    cta: "Partner with us",
  },
  {
    id: "svc-bulk",
    category: "services",
    size: "normal",
    icon: "Truck",
    title: "Bulk & Custom Orders",
    description: "Farm-fresh produce in the quantities you need, for homes and businesses.",
    href: "/contact",
    cta: "Request a quote",
  },
  {
    id: "svc-visits",
    category: "services",
    size: "normal",
    icon: "Tractor",
    title: "Farm Visits",
    description: "See how your food is grown. Available on appointment.",
    href: "/contact",
    cta: "Book a visit",
  },
];

export async function Solutions() {
  const [services, posts] = await Promise.all([getServices(), getPublishedPosts(2)]);

  const produce: Solution[] = services.map((s, i) => ({
    id: `service-${s.id}`,
    category: LIVESTOCK_ICONS.has(s.icon) ? "livestock" : "produce",
    size: i === 0 ? "feature" : i % 3 === 1 ? "tall" : "normal",
    icon: s.icon,
    title: s.title,
    description: s.description,
    image: s.image,
    href: "/contact",
    cta: "Order now",
  }));

  const insights: Solution[] = posts.map((p) => ({
    id: `post-${p.href}`,
    category: "insights",
    size: "wide",
    icon: "Leaf",
    title: p.title,
    description: `From the journal · ${p.date.day} ${p.date.month}`,
    image: p.image,
    href: p.href,
    cta: "Read story",
  }));

  return (
    <section id="solutions" className="relative overflow-hidden bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <SectionTag>From Our Fields</SectionTag>
            </Reveal>
            <RevealText as="h2" className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
              AGRICULTURAL SOLUTIONS
            </RevealText>
            <Reveal delay={0.1}>
              <Squiggle className="mt-4" />
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md leading-relaxed text-ink/60">
              Fresh produce, farm-raised livestock and new ways to work with us, all held to the
              same organic, soil-first standard.
            </p>
          </Reveal>
        </div>

        <SolutionsGrid items={[...produce, ...farmServices, ...insights]} />
      </div>
    </section>
  );
}
