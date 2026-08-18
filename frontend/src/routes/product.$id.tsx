import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, getRelated, type Product } from "@/data/products";
import { cartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { productAPI } from "@/lib/api";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }): Promise<{ product: Product }> => {
    try {
      const res = await productAPI.getById(params.id);
      if (res.success && res.data) {
        return { product: res.data };
      }
    } catch (err) {
      console.error("Failed to fetch product details from backend, falling back:", err);
    }

    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-5xl mb-4" style={{ color: "var(--foreground)" }}>
          Not found
        </h1>
        <p className="text-muted-foreground">This product doesn't exist.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block text-[11px] tracking-[0.3em] uppercase underline"
          style={{ color: "var(--foreground)" }}
        >
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl mb-4" style={{ color: "var(--foreground)" }}>
          Something went wrong
        </h1>
        <button
          onClick={reset}
          className="text-[11px] tracking-[0.3em] uppercase underline"
          style={{ color: "var(--foreground)" }}
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const related = getRelated(product.id);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("benefits");

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div
              className="rounded-3xl overflow-hidden"
              style={{ backgroundColor: "var(--card)" }}
            >
              <Placeholder
                src={product.images[active]?.src}
                alt={product.images[active]?.alt}
                label={product.images[active]?.label}
                aspect="square"
                rounded={false}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.src ?? img.label}
                  onClick={() => setActive(i)}
                  className={cn(
                    "overflow-hidden rounded-xl border transition-all",
                    active === i ? "border-foreground" : "border-border hover:border-foreground/50",
                  )}
                >
                  <Placeholder
                    src={img.src}
                    alt={img.alt}
                    label={img.src ? undefined : `${i + 1}`}
                    aspect="square"
                    rounded={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:pt-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              PocketGlow Essentials
            </div>
            <h1
              className="mt-2 font-display text-4xl md:text-5xl"
              style={{ color: "var(--foreground)" }}
            >
              {product.name}
            </h1>
            <p className="mt-2 italic text-muted-foreground">{product.tagline}</p>
            <div
              className="mt-6 text-2xl tabular-nums"
              style={{ color: "var(--foreground)" }}
            >
              ₹{product.price}
            </div>
            <p
              className="mt-6 text-sm leading-relaxed max-w-md"
              style={{ color: "var(--muted-foreground)" }}
            >
              {product.description}
            </p>

            {/* Qty + Add to cart */}
            <div className="mt-10 flex items-center gap-4">
              <div
                className="flex items-center border rounded-full"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:opacity-60"
                  aria-label="Decrease"
                  style={{ color: "var(--foreground)" }}
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span
                  className="px-3 text-sm tabular-nums w-8 text-center"
                  style={{ color: "var(--foreground)" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-3 py-2 hover:opacity-60"
                  aria-label="Increase"
                  style={{ color: "var(--foreground)" }}
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                onClick={() => cartStore.add(product.id, qty)}
                className="flex-1 rounded-full text-[11px] tracking-[0.3em] uppercase py-3.5 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
              >
                Add to cart — ₹{product.price * qty}
              </button>
            </div>

            {/* Accordion */}
            <div className="mt-12 border-t" style={{ borderColor: "var(--border)" }}>
              <Accordion
                open={openAcc === "benefits"}
                onToggle={() => setOpenAcc(openAcc === "benefits" ? null : "benefits")}
                title="Benefits"
              >
                <ul className="space-y-2 text-sm">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex gap-3" style={{ color: "var(--muted-foreground)" }}>
                      <span className="text-blush">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion
                open={openAcc === "how"}
                onToggle={() => setOpenAcc(openAcc === "how" ? null : "how")}
                title="How to use"
              >
                <ol
                  className="space-y-2 text-sm list-decimal list-inside"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {product.howToUse.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ol>
              </Accordion>
              <Accordion
                open={openAcc === "ing"}
                onToggle={() => setOpenAcc(openAcc === "ing" ? null : "ing")}
                title="Ingredients"
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {product.ingredients}
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-20">
        <div className="mb-12 text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            You may also love
          </div>
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: "var(--foreground)" }}>
            Pair the ritual
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          style={{ color: "var(--foreground)" }}
        />
      </button>
      {open && <div className="pb-6 animate-fade-in">{children}</div>}
    </div>
  );
}
