import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { z } from "zod";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductGrid } from "@/components/ProductGrid";
import { products, categories, type Category } from "@/data/products";
import { cn } from "@/lib/utils";
import { productAPI } from "@/lib/api";

const searchSchema = z.object({
  category: z.enum(["skin", "lip", "kits", "bestsellers"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  component: ShopPage,
});

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

function ShopPage() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState<SortKey>("featured");

  const [dbProducts, setDbProducts] = useState<typeof products>(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productAPI.getAll();
        if (res.success && res.data && res.data.length > 0) {
          setDbProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch products from backend:", err);
        setError("Could not load fresh products. Using offline catalog.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let list = category
      ? dbProducts.filter((p) => p.categories.includes(category))
      : dbProducts;
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, sort, dbProducts]);

  const setCategory = (c?: Category) =>
    navigate({ search: c ? { category: c } : {} });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            All essentials
          </div>
          <h1 className="font-display text-5xl md:text-6xl" style={{ color: "var(--foreground)" }}>
            Shop
          </h1>
        </div>

        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 border-y py-5"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.25em] uppercase">
            <button
              onClick={() => setCategory(undefined)}
              className={cn(
                "rounded-full px-4 py-1.5 border transition-colors",
                !category
                  ? "border-foreground text-background"
                  : "border-border hover:opacity-80",
              )}
              style={
                !category
                  ? { backgroundColor: "var(--foreground)", color: "var(--background)" }
                  : { backgroundColor: "transparent", color: "var(--foreground)", borderColor: "var(--border)" }
              }
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 border transition-colors",
                  category === c.id
                    ? ""
                    : "hover:opacity-80",
                )}
                style={
                  category === c.id
                    ? { backgroundColor: "var(--foreground)", color: "var(--background)", borderColor: "var(--foreground)" }
                    : { backgroundColor: "transparent", color: "var(--foreground)", borderColor: "var(--border)" }
                }
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <label
            className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--foreground)" }}
          >
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="py-1 outline-none text-xs tracking-normal bg-transparent border-b"
              style={{
                color: "var(--foreground)",
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="text-center py-24 text-sm text-muted-foreground">
            Loading products...
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-8 text-center text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 p-3.5 rounded-2xl max-w-md mx-auto">
                ⚠️ {error}
              </div>
            )}
            <ProductGrid products={filtered} />
          </>
        )}
      </section>
    </SiteLayout>
  );
}
