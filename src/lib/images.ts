export function unsplash(id: string, params = "auto=format&fit=crop&q=80") {
  if (id.startsWith("/") || id.startsWith("http")) return id;
  return `https://images.unsplash.com/photo-${id}?${params}`;
}

export const images = {
  heroBg: "1500382017468-9049fed747ef",
  bannerBg: "1495107334309-fcf20504a5ab",
  aboutMain: "/images/greenhouse-team.jpeg",
  aboutSmall: "/images/seeds.jpeg",
  serviceAgriculture: "1560493676-04071c5f467b",
  serviceOrganic: "1591857177580-dc82b9ac4e1e",
  serviceVegetables: "/images/vegetables.jpeg",
  serviceDairy: "1500595046743-cd271d694d30",
  serviceFruit: "/images/fruits.jpeg",
  serviceOnions: "/images/onions.jpeg",
  serviceDucks: "1653382724747-ba799386d133",
  splitPhoto: "1416879595882-3373a0480b5b",
  ctaBg: "1499529112087-3cb3b73cec95",
  blogSoil: "1416879595882-3373a0480b5b",
  blogField: "1592982537447-7440770cbfc9",
  blogGrazing: "1500595046743-cd271d694d30",
  footerNews1: "1461354464878-ad92f492a5a0",
  footerNews2: "1500651230702-0e2d8a49d4ad",
  testimonial1: "1508214751196-bcfd4ca60f91",
  testimonial2: "1500648767791-00dcc994a43e",
  testimonial3: "1494790108377-be9c29b29330",
  ceo: "1522075469751-3a6694fb2f61",
};
