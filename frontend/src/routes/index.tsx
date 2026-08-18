import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Placeholder } from "@/components/Placeholder";
import { MarqueeButton } from "@/components/MarqueeButton";
import { products, categories } from "@/data/products";
import { productAPI, formAPI } from "@/lib/api";
import { toast } from "sonner";
import categorySkin from "@/assets/categories/category-skin.png.asset.json";
import categoryLip from "@/assets/categories/category-lip.png.asset.json";
import categoryKits from "@/assets/categories/category-kits.png.asset.json";
import categoryBestsellers from "@/assets/categories/category-bestsellers.png.asset.json";
import lifestyleVideo from "@/assets/lifestyle/lifestyle-pocket-routine.mp4.asset.json";

const categoryImages: Record<string, { url: string }> = {
  skin: categorySkin,
  lip: categoryLip,
  kits: categoryKits,
  bestsellers: categoryBestsellers,
};

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [dbProducts, setDbProducts] = useState<typeof products>(products);
  const [newsEmail, setNewsEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await productAPI.getAll();
        if (res.success && res.data && res.data.length > 0) {
          setDbProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch featured products from backend:", err);
      }
    };
    fetchFeatured();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubmitting(true);
    try {
      const res = await formAPI.subscribeNewsletter(newsEmail);
      if (res.success) {
        toast.success(res.message || "Subscribed successfully!");
        setNewsEmail("");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to subscribe.");
    } finally {
      setSubmitting(false);
    }
  };

  const featured = dbProducts.slice(0, 4);

  return (
    <SiteLayout transparentNav padTop={false}>
      <Hero />

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
              The essentials
            </div>
            <h2 className="font-display text-4xl md:text-5xl">Bestsellers</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline text-[11px] tracking-[0.3em] uppercase hover:underline"
          >
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Category blocks */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/shop"
              search={{ category: c.id }}
              className="group relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div className="transition-transform duration-700 group-hover:scale-105">
                <Placeholder
                  src={categoryImages[c.id]?.url}
                  alt={`${c.label} category`}
                  label={`${c.label} category`}
                  aspect="portrait"
                  rounded={false}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/40 to-transparent">
                <div className="font-display text-2xl text-cream">{c.label}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-cream/80 mt-1">
                  Shop →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lifestyle */}
      <section className="relative">
        <div className="relative w-full aspect-[16/7] overflow-hidden">
          <video
            src={lifestyleVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-cream px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-6xl">
              Less waste. More glow.
            </h2>
            <div className="mt-8 inline-block">
              <MarqueeButton text="Discover the ritual" tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-28">
        <div className="text-center mb-16">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Why PocketGlow Essentials
          </div>
          <h2 className="font-display text-4xl md:text-5xl">A routine that travels</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { t: "Travel friendly", d: "Slim sachets that slide into any pocket or pouch." },
            { t: "Single-use sachets", d: "Hygienic, precise dosing — every time." },
            { t: "Clean beauty", d: "Thoughtful, dermatologist-considered formulas." },
            { t: "Snap & squeeze", d: "Mess-free application in one fluid motion." },
          ].map((f) => (
            <div key={f.t} className="text-center">
              <div className="mx-auto mb-5 h-14 w-14 rounded-full bg-blush/60 grid place-items-center font-display text-xl">
                ✦
              </div>
              <div className="font-display text-xl mb-2">{f.t}</div>
              <p className="text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-3xl px-6 md:px-8 pb-28 text-center">
        <h2 className="font-display text-4xl md:text-5xl">Be the first to glow</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          Early access, rituals and the occasional love letter.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="mt-10 mx-auto flex max-w-md border-b focus-within:border-foreground"
          style={{ borderColor: "var(--border)" }}
        >
          <input
            type="email"
            required
            placeholder="Your email"
            value={newsEmail}
            onChange={(e) => setNewsEmail(e.target.value)}
            className="flex-1 bg-transparent py-3 outline-none placeholder:text-ink/40 text-sm text-center text-foreground"
          />
          <button
            type="submit"
            disabled={submitting}
            className="text-[10px] tracking-[0.3em] uppercase hover:opacity-60 disabled:opacity-50 cursor-pointer"
            style={{ color: "var(--foreground)" }}
          >
            {submitting ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}
