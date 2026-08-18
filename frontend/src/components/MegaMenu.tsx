import { Link } from "@tanstack/react-router";
import { categories } from "@/data/products";

interface Props {
  onClose: () => void;
}

export function MegaMenu({ onClose }: Props) {
  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 right-0 top-full border-t border-border shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] animate-fade-in"
      style={{ backgroundColor: "var(--navbar)" }}
    >
      <div className="mx-auto max-w-7xl px-8 py-12 grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr] gap-12">
        {/* Shop by category */}
        <div>
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold"
            style={{ color: "var(--muted-foreground)" }}
          >
            Shop by category
          </div>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/shop"
                  search={{ category: c.id }}
                  onClick={onClose}
                  className="font-display text-2xl transition-colors hover:opacity-70"
                  style={{ color: "var(--foreground)" }}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured */}
        <div>
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold"
            style={{ color: "var(--muted-foreground)" }}
          >
            Featured
          </div>
          <ul className="space-y-3 text-sm">
            {[
              { label: "New arrivals", discount: null },
              { label: "Best sellers", discount: null },
              { label: "Travel kits", discount: null },
              { label: "Gifts under ₹500", discount: "Save up to 20%" },
            ].map(({ label, discount }) => (
              <li key={label}>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="group flex flex-col transition-opacity hover:opacity-70"
                  style={{ color: "var(--foreground)" }}
                >
                  <span className="group-hover:underline">{label}</span>
                  {discount && (
                    <span
                      className="text-[10px] tracking-wider mt-0.5"
                      style={{ color: "var(--blush)" }}
                    >
                      {discount}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand image panel */}
        <Link to="/shop" onClick={onClose} className="group block">
          <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden">
            <img
              src="/assets/pocketglow-banner.png"
              alt="PocketGlow — Snap. Squeeze. Glow."
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span
              className="font-display text-xl"
              style={{ color: "var(--foreground)" }}
            >
              The Pocket Routine
            </span>
            <span
              className="text-xs tracking-[0.25em] uppercase group-hover:underline"
              style={{ color: "var(--muted-foreground)" }}
            >
              Discover →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
