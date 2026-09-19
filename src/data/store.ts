import bespokePink from "@/assets/hans-bespoke-pink.jpg";
import blueFloral from "@/assets/hans-look-blue-floral.jpg";
import brownFloral from "@/assets/hans-look-brown-floral.jpg";
import blueStudio from "@/assets/hans-look-blue-studio.jpg";
import hollandPink from "@/assets/hans-rtw-holland.jpg";
import rtw160 from "@/assets/hans-rtw-160.jpg";
import rtw70 from "@/assets/hans-rtw-70.jpg";
import bespokeBlue from "@/assets/hans-bespoke-blue.jpg";

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  collection: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  stock: number;
  sku: string;
};

export const brand = {
  name: "HANS Apparel",
  instagram: "@hans_apparel",
  location: "Abuja, Nigeria",
  hours: "Mon-Sat | 9AM-6PM",
  whatsappNumber: "2340000000000", // Replace once the verified HANS number is supplied.
};

const base: Omit<Product, "description">[] = [
  {
    id: "1",
    name: "Blue Circle Kaftan",
    slug: "blue-circle-kaftan",
    category: "Ready-to-Wear",
    collection: "The HANS Apparel Edit",
    price: 230000,
    images: [blueStudio],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Gold"],
    featured: true,
    bestSeller: true,
    newArrival: true,
    stock: 3,
    sku: "HNS-RTW-001",
  },
  {
    id: "2",
    name: "Brown Floral Boubou",
    slug: "brown-floral-boubou",
    category: "Ready-to-Wear",
    collection: "The HANS Apparel Edit",
    price: 230000,
    images: [brownFloral],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown", "Gold"],
    featured: true,
    bestSeller: true,
    newArrival: true,
    stock: 4,
    sku: "HNS-RTW-002",
  },
  {
    id: "3",
    name: "Sky Floral Set",
    slug: "sky-floral-set",
    category: "Bespoke",
    collection: "Modern Heritage",
    price: 185000,
    images: [blueFloral],
    sizes: ["Custom"],
    colors: ["Sky Blue", "Gold"],
    featured: true,
    bestSeller: false,
    newArrival: true,
    stock: 2,
    sku: "HNS-BSP-003",
  },
  {
    id: "4",
    name: "Pink Holland Wax Look",
    slug: "pink-holland-wax-look",
    category: "Ready-to-Wear",
    collection: "Modern Heritage",
    price: 230000,
    images: [hollandPink],
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Black"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    stock: 1,
    sku: "HNS-RTW-004",
  },
  {
    id: "5",
    name: "Olive Patterned Agbada",
    slug: "olive-patterned-agbada",
    category: "Ready-to-Wear",
    collection: "Exclusive Pieces",
    price: 160000,
    images: [rtw160],
    sizes: ["S", "M", "L"],
    colors: ["Olive", "Burgundy"],
    featured: true,
    bestSeller: false,
    newArrival: true,
    stock: 2,
    sku: "HNS-RTW-005",
  },
  {
    id: "6",
    name: "Pink Circle Boubou",
    slug: "pink-circle-boubou",
    category: "Ready-to-Wear",
    collection: "Exclusive Pieces",
    price: 70000,
    images: [rtw70],
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Black"],
    featured: false,
    bestSeller: true,
    newArrival: true,
    stock: 1,
    sku: "HNS-RTW-006",
  },
  {
    id: "7",
    name: "Rose Bespoke Lace",
    slug: "rose-bespoke-lace",
    category: "Bespoke",
    collection: "Bespoke Atelier",
    price: 155000,
    images: [bespokePink],
    sizes: ["Custom"],
    colors: ["Rose", "Teal"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    stock: 1,
    sku: "HNS-BSP-007",
  },
  {
    id: "8",
    name: "Blue Bespoke Lace",
    slug: "blue-bespoke-lace",
    category: "Bespoke",
    collection: "Bespoke Atelier",
    price: 155000,
    images: [bespokeBlue],
    sizes: ["Custom"],
    colors: ["Blue", "Navy"],
    featured: false,
    bestSeller: false,
    newArrival: false,
    stock: 1,
    sku: "HNS-BSP-008",
  },
];

export const products: Product[] = base.map((p) => ({
  ...p,
  description:
    "A refined HANS Apparel silhouette shaped with considered structure, premium fabric and precise finishing for memorable occasions.",
}));

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export function whatsappUrl(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const testimonials = [
  {
    name: "Adaeze",
    location: "Abuja",
    review:
      "The fit felt considered from every angle. HANS Apparel made the entire experience calm, personal and beautifully refined.",
  },
  {
    name: "Mariam",
    location: "Lagos",
    review:
      "My piece arrived beautifully finished and looked even more striking in person. It has become an occasion favourite.",
  },
  {
    name: "Halima",
    location: "Abuja",
    review: "From fabric selection to the final fitting, the bespoke process was thoughtful and precise.",
  },
];

export const journalPosts = [
  {
    category: "STYLE",
    title: "The Art of Dressing for Presence",
    excerpt: "A considered guide to silhouettes that hold a room without asking for attention.",
  },
  {
    category: "BEHIND THE SCENES",
    title: "From First Line to Final Finish",
    excerpt: "Inside the careful decisions that shape a HANS Apparel piece.",
  },
  {
    category: "BESPOKE",
    title: "What to Expect from Your First Fitting",
    excerpt: "How we move from your vision to a piece made specifically for you.",
  },
];
