import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User, ShoppingBag } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { ThemeToggle } from "./ThemeToggle";
import { useCartCount } from "@/lib/cart-store";

export function Navbar(_: { transparentOnTop?: boolean } = {}) {
  const [megaOpen, setMegaOpen] = useState(false);
  const count = useCartCount();

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "var(--navbar)", color: "var(--foreground)" }}
    >
      <nav className="relative mx-auto max-w-7xl px-6 md:px-8 h-[80px] grid grid-cols-3 items-center">
        {/* Left — nav links */}
        <div className="flex items-center gap-8 text-[13px] tracking-[0.28em] uppercase font-medium">
          <button
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((v) => !v)}
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            Shop
          </button>
          <Link
            to="/about"
            className="hover:opacity-60 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            About
          </Link>
        </div>

        {/* Centre — wordmark */}
        <Link
          to="/"
          className="justify-self-center font-display text-2xl md:text-[28px] tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          PocketGlow Essentials
        </Link>

        {/* Right — icons */}
        <div className="justify-self-end flex items-center gap-5">
          <button
            aria-label="Search"
            className="hover:opacity-60 transition-opacity hidden sm:block"
            style={{ color: "var(--foreground)" }}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/login"
            aria-label="Account"
            className="hover:opacity-60 transition-opacity hidden sm:block"
            style={{ color: "var(--foreground)" }}
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex items-center gap-2 hover:opacity-60 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>

        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </nav>
    </header>
  );
}
