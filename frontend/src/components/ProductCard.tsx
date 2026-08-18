import { Link } from "@tanstack/react-router";
import { Placeholder } from "./Placeholder";
import { cartStore } from "@/lib/cart-store";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block overflow-hidden rounded-3xl"
        style={{ backgroundColor: "var(--card)" }}
      >
        <div className="transition-transform duration-700 group-hover:scale-[1.03]">
          <Placeholder
            src={product.images[0]?.src}
            alt={product.images[0]?.alt}
            label={product.images[0]?.label}
            aspect="square"
            rounded={false}
          />
        </div>
        {product.badge && (
          <span
            className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)", opacity: 0.92 }}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            cartStore.add(product.id, 1);
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-[10px] tracking-[0.3em] uppercase px-5 py-2.5 rounded-full"
          style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
        >
          Add to cart
        </button>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="font-display text-lg leading-tight hover:underline"
            style={{ color: "var(--foreground)" }}
          >
            {product.name}
          </Link>
          <p
            className="mt-0.5 text-xs line-clamp-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            {product.tagline}
          </p>
        </div>
        <div
          className="shrink-0 text-sm tabular-nums font-medium"
          style={{ color: "var(--foreground)" }}
        >
          ₹{product.price}
        </div>
      </div>
    </div>
  );
}
