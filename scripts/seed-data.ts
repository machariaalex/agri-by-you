/** Original static site content, loaded into the database by scripts/seed.ts. */
import { images } from "../src/lib/images";

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
