import { images } from "./images";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    icon: "Carrot",
    title: "Fresh Vegetables",
    description:
      "Nurtured through sustainable farming, our crisp, hand-picked vegetables go straight from our fields to bring health and vital nutrition to every meal.",
    image: images.serviceVegetables,
  },
  {
    icon: "Apple",
    title: "Organically Grown Fruits",
    description:
      "Sun-ripened and naturally cultivated, our succulent organic fruits offer rich, natural sweetness and wholesome goodness with zero artificial additives.",
    image: images.serviceFruit,
  },
  {
    icon: "Layers",
    title: "Organic Onions",
    description:
      "Cultivated in nutrient-rich soil without chemical fertilizers, our premium organic onions deliver bold flavor, exceptional quality, and long-lasting freshness.",
    image: images.serviceOnions,
  },
  {
    icon: "Bird",
    title: "Farm-Raised Ducks",
    description:
      "Raised in healthy, free-range environments on natural diets, our pasture-raised ducks yield high-quality, nutrient-dense poultry products.",
    image: images.serviceDucks,
  },
];

export const splitFeatures = [
  { icon: "Tractor", label: "Harvesting" },
  { icon: "Sprout", label: "Growth" },
  { icon: "ShieldCheck", label: "Maintenance" },
];

export const projects = [
  { name: "Willowmere Grain Co-op", location: "Cedar Valley", tag: "Grain", image: images.heroBg },
  { name: "Bramblewick Dairy", location: "Northfold", tag: "Dairy", image: images.serviceDairy },
  { name: "Hollow Creek Vineyard", location: "Ashbourne", tag: "Vineyard", image: images.ctaBg },
  { name: "Thistledown Pastures", location: "Marrow Fen", tag: "Livestock", image: images.aboutMain },
  { name: "Riverbend Vegetable Farm", location: "Coldwater", tag: "Vegetables", image: images.serviceOrganic },
  { name: "Amber Row Orchards", location: "Sutton Ridge", tag: "Orchard", image: images.splitPhoto },
];

export const testimonials = [
  {
    quote: "Lorem ipsum is simply free text dolor sit amet, consect notted adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Amara Osei",
    role: "Customer",
    photo: images.testimonial1,
  },
  {
    quote: "AgriByYou completely changed how I think about local produce. Knowing that my vegetables are grown strictly using organic methods with full transparency gives me total peace of mind.",
    name: "Ndegwa Alex",
    role: "Brient Sizzlers",
    photo: images.testimonial2,
  },
  {
    quote: "Lorem ipsum is simply free text dolor sit amet, consect notted adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Sarah Albert",
    role: "Customer",
    photo: images.testimonial3,
  },
];

type JournalPost = {
  title: string;
  date: { day: string; month: string };
  image: string;
  href?: string;
};

export const journal: JournalPost[] = [
  {
    title: "By You, For You: Why We Got Our Hands Dirty in Siaya's Fields",
    date: { day: "03", month: "Sep" },
    image: "/images/blog/siaya-field.jpeg",
    href: "/journal/siaya-organic-onions",
  },
  {
    title: "Building AgriByYou: Why Sourcing the Right Farming Inputs Matters",
    date: { day: "01", month: "Sep" },
    image: "/images/blog/sourcing-load1.jpeg",
    href: "/journal/sourcing-farming-inputs",
  },
];

export const footerExplore = [
  { label: "About", href: "/about" },
  { label: "Our Farmers", href: "/about" },
  { label: "Services", href: "/services" },
];
