export type Category = "skin" | "lip" | "kits" | "bestsellers";

import pocketglowLipBalm1 from "@/assets/products/pocketglow-lip-balm-1.png.asset.json";
import pocketglowLipBalm2 from "@/assets/products/pocketglow-lip-balm-2.png.asset.json";
import pocketglowLipBalm3 from "@/assets/products/pocketglow-lip-balm-3.png.asset.json";
import pocketglowGlowSerum1 from "@/assets/products/pocketglow-glow-serum-1.png.asset.json";
import pocketglowGlowSerum2 from "@/assets/products/pocketglow-glow-serum-2.png.asset.json";
import pocketglowGlowSerum3 from "@/assets/products/pocketglow-glow-serum-3.png.asset.json";
import pocketglowHydrationMist1 from "@/assets/products/pocketglow-hydration-mist-1.png.asset.json";
import pocketglowHydrationMist2 from "@/assets/products/pocketglow-hydration-mist-2.png.asset.json";
import pocketglowHydrationMist3 from "@/assets/products/pocketglow-hydration-mist-3.png.asset.json";
import pocketglowBarrierCream1 from "@/assets/products/pocketglow-barrier-cream-1.png.asset.json";
import pocketglowBarrierCream2 from "@/assets/products/pocketglow-barrier-cream-2.png.asset.json";
import pocketglowBarrierCream3 from "@/assets/products/pocketglow-barrier-cream-3.png.asset.json";
import pocketglowTravelTrio1 from "@/assets/products/pocketglow-travel-trio-1.png.asset.json";
import pocketglowTravelTrio2 from "@/assets/products/pocketglow-travel-trio-2.png.asset.json";
import pocketglowTravelTrio3 from "@/assets/products/pocketglow-travel-trio-3.png.asset.json";
import pocketglowTintedLip1 from "@/assets/products/pocketglow-tinted-lip-1.png.asset.json";
import pocketglowTintedLip2 from "@/assets/products/pocketglow-tinted-lip-2.png.asset.json";
import pocketglowTintedLip3 from "@/assets/products/pocketglow-tinted-lip-3.png.asset.json";
import pocketglowTravelKit1 from "@/assets/products/pocketglow-travel-kit-1.png.asset.json";
import pocketglowTravelKit2 from "@/assets/products/pocketglow-travel-kit-2.png.asset.json";
import pocketglowTravelKit3 from "@/assets/products/pocketglow-travel-kit-3.png.asset.json";
import pocketglowOvernightMask1 from "@/assets/products/pocketglow-overnight-mask-1.png.asset.json";
import pocketglowOvernightMask2 from "@/assets/products/pocketglow-overnight-mask-2.png.asset.json";
import pocketglowOvernightMask3 from "@/assets/products/pocketglow-overnight-mask-3.png.asset.json";

export interface ProductImage {
  src?: string;
  alt: string;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  categories: Category[];
  badge?: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string;
  images: ProductImage[];
}

export const products: Product[] = [
  {
    id: "glow-serum-sachet",
    name: "Glow Serum Sachet",
    tagline: "Daily luminosity, on the go",
    description:
      "A single-use snap-and-squeeze sachet delivering a precise dose of hydrating glow serum. Niacinamide and peptides for a soft, dewy finish.",
    price: 449,
    category: "skin",
    categories: ["skin", "bestsellers"],
    badge: "Bestseller",
    benefits: ["Hydrates instantly", "Smooths texture", "Travel-safe dose"],
    howToUse: ["Snap the sachet", "Squeeze a pearl-sized drop", "Press into clean skin morning or night"],
    ingredients: "Aqua, Niacinamide, Glycerin, Sodium Hyaluronate, Panthenol, Peptide Complex, Squalane.",
    images: [
      { src: pocketglowGlowSerum1.url, alt: "PocketGlow Essentials Glow Serum sachet product image", label: "Serum sachet — front" },
      { src: pocketglowGlowSerum2.url, alt: "PocketGlow Essentials Glow Serum sachet ingredient benefits card", label: "Serum sachet — benefits" },
      { src: pocketglowGlowSerum3.url, alt: "PocketGlow Essentials Glow Serum sachet how to use card", label: "Serum sachet — how to use" },
    ],
  },
  {
    id: "pocket-lip-balm",
    name: "Pocket Lip Balm",
    tagline: "Cushioned shine, pocket-sized",
    description:
      "A nourishing lip balm sachet with shea, squalane and a whisper of peptides for a soft, plush finish.",
    price: 299,
    category: "lip",
    categories: ["lip", "bestsellers"],
    badge: "New",
    benefits: ["Long-lasting hydration", "Soft natural sheen", "Mess-free single use"],
    howToUse: ["Snap the corner", "Squeeze onto lips", "Reapply throughout the day"],
    ingredients: "Shea Butter, Squalane, Castor Oil, Vitamin E, Peptide Complex.",
    images: [
      { src: pocketglowLipBalm1.url, alt: "PocketGlow Essentials Lip Balm sachet product image", label: "Lip balm — front" },
      { src: pocketglowLipBalm2.url, alt: "PocketGlow Essentials Lip Balm sachet feature card", label: "Lip balm — benefits" },
      { src: pocketglowLipBalm3.url, alt: "PocketGlow Essentials Lip Balm sachet how to use card", label: "Lip balm — how to use" },
    ],
  },
  {
    id: "hydration-mist",
    name: "Hydration Moisturizer Sachet",
    tagline: "A refreshing pause, anywhere",
    description: "A fine mist sachet that revives, hydrates and preps skin for makeup or rest.",
    price: 349,
    category: "skin",
    categories: ["skin"],
    benefits: ["Refreshes instantly", "Sets makeup", "Travel friendly"],
    howToUse: ["Snap open", "Spritz at arm's length", "Pat in lightly"],
    ingredients: "Aqua, Rose Water, Glycerin, Panthenol, Sodium PCA.",
    images: [
      { src: pocketglowHydrationMist1.url, alt: "PocketGlow Essentials Hydration Moisturizer sachet product image", label: "Hydration moisturizer — front" },
      { src: pocketglowHydrationMist2.url, alt: "PocketGlow Essentials Hydration Moisturizer sachet ingredient benefits card", label: "Hydration moisturizer — benefits" },
      { src: pocketglowHydrationMist3.url, alt: "PocketGlow Essentials Hydration Moisturizer sachet how to use card", label: "Hydration moisturizer — how to use" },
    ],
  },
  {
    id: "barrier-cream",
    name: "Barrier Cream Sachet",
    tagline: "Soft, soothed, restored",
    description: "A rich-but-light cream sachet with ceramides and centella for a calm, comforted complexion.",
    price: 499,
    category: "skin",
    categories: ["skin", "bestsellers"],
    badge: "Bestseller",
    benefits: ["Restores barrier", "Calms redness", "All-day comfort"],
    howToUse: ["Snap the sachet", "Squeeze a small amount", "Massage into face and neck"],
    ingredients: "Aqua, Ceramide NP, Centella Asiatica, Squalane, Shea Butter, Panthenol.",
    images: [
      { src: pocketglowBarrierCream1.url, alt: "PocketGlow Essentials Barrier Cream sachet product image", label: "Barrier cream — front" },
      { src: pocketglowBarrierCream2.url, alt: "PocketGlow Essentials Barrier Cream sachet ingredient benefits card", label: "Barrier cream — benefits" },
      { src: pocketglowBarrierCream3.url, alt: "PocketGlow Essentials Barrier Cream sachet how to use card", label: "Barrier cream — how to use" },
    ],
  },
  {
    id: "essentials-kit",
    name: "Pocket Essentials Kit",
    tagline: "Your everyday glow, packed",
    description: "Seven days of glow: serum, cream and lip — all in single-use sachets in a refillable pouch.",
    price: 1499,
    category: "kits",
    categories: ["kits", "bestsellers"],
    badge: "Kit",
    benefits: ["7-day routine", "Refillable pouch", "Carry-on friendly"],
    howToUse: ["Tuck pouch in your bag", "Use one sachet each morning", "Refill when empty"],
    ingredients: "See individual products.",
    images: [
      { src: pocketglowTravelKit1.url, alt: "PocketGlow Essentials Pocket Essentials Kit flat lay image", label: "Kit — flat lay" },
      { src: pocketglowTravelKit2.url, alt: "PocketGlow Essentials Pocket Essentials Kit pouch image", label: "Kit — pouch" },
      { src: pocketglowTravelKit3.url, alt: "PocketGlow Essentials Pocket Essentials Kit open pouch image", label: "Kit — open" },
    ],
  },
  {
    id: "travel-trio",
    name: "Travel Trio",
    tagline: "Three steps. Anywhere.",
    description: "Mist, serum and cream sachets bundled for the road.",
    price: 999,
    category: "kits",
    categories: ["kits"],
    benefits: ["Compact routine", "TSA-friendly", "Refillable"],
    howToUse: ["Mist, serum, cream", "Morning and night"],
    ingredients: "See individual products.",
    images: [
      { src: pocketglowTravelTrio1.url, alt: "PocketGlow Essentials Travel Trio product image", label: "Travel trio — front" },
      { src: pocketglowTravelTrio2.url, alt: "PocketGlow Essentials Travel Trio packed pouch image", label: "Travel trio — pouch" },
      { src: pocketglowTravelTrio3.url, alt: "PocketGlow Essentials Travel Trio open pouch image", label: "Travel trio — open" },
    ],
  },
  {
    id: "overnight-mask",
    name: "Overnight Mask Sachet",
    tagline: "Wake up glowing",
    description: "A silky overnight mask sachet that drenches skin in nourishment while you sleep.",
    price: 379,
    category: "skin",
    categories: ["skin"],
    benefits: ["Deep hydration", "Plumped morning skin", "Non-sticky"],
    howToUse: ["Use after serum", "Leave on overnight", "Rinse in the morning"],
    ingredients: "Aqua, Glycerin, Hyaluronic Acid, Squalane, Bakuchiol.",
    images: [
      { src: pocketglowOvernightMask1.url, alt: "PocketGlow Essentials Overnight Mask Sachet product image", label: "Mask — front" },
      { src: pocketglowOvernightMask2.url, alt: "PocketGlow Essentials Overnight Mask Sachet packaging image", label: "Mask — packaging" },
      { src: pocketglowOvernightMask3.url, alt: "PocketGlow Essentials Overnight Mask Sachet how to use image", label: "Mask — how to use" },
    ],
  },
  {
    id: "tinted-lip",
    name: "Tinted Lip Sachet",
    tagline: "A flush of color",
    description: "A sheer, buildable lip tint sachet in a soft nude blush.",
    price: 329,
    category: "lip",
    categories: ["lip"],
    badge: "New",
    benefits: ["Sheer color", "Hydrating finish", "Single-use hygiene"],
    howToUse: ["Snap", "Squeeze onto fingertip or lips", "Build to desired color"],
    ingredients: "Shea Butter, Castor Oil, Mica, Iron Oxides, Vitamin E.",
    images: [
      { src: pocketglowTintedLip1.url, alt: "PocketGlow Essentials Tinted Lip Sachet product image", label: "Tint — front" },
      { src: pocketglowTintedLip2.url, alt: "PocketGlow Essentials Tinted Lip Sachet product feature image", label: "Tint — benefits" },
      { src: pocketglowTintedLip3.url, alt: "PocketGlow Essentials Tinted Lip Sachet how to use image", label: "Tint — how to use" },
    ],
  },
];

export const categories: { id: Category; label: string }[] = [
  { id: "skin", label: "Skin" },
  { id: "lip", label: "Lip" },
  { id: "kits", label: "Travel Kits" },
  { id: "bestsellers", label: "Best Sellers" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getRelated = (id: string, n = 4) =>
  products.filter((p) => p.id !== id).slice(0, n);
