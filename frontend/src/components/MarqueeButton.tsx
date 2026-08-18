import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface Props {
  text?: string;
  to?: string;
  className?: string;
  tone?: "dark" | "light";
}

export function MarqueeButton({
  text = "Shop now",
  to = "/shop",
  className,
  tone = "dark",
}: Props) {
  const items = Array.from({ length: 12 }, () => text);
  return (
    <Link
      to={to}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-xs tracking-[0.3em] uppercase transition-colors",
        tone === "dark"
          ? "bg-ink text-cream hover:bg-ink/90"
          : "bg-cream text-ink border border-ink/20 hover:bg-beige",
        className,
      )}
    >
      <span className="relative z-10 transition-opacity group-hover:opacity-0">
        {text}
      </span>
      <span className="absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="flex animate-marquee whitespace-nowrap">
          {items.map((t, i) => (
            <span key={i} className="px-4">
              {t} ✦
            </span>
          ))}
          {items.map((t, i) => (
            <span key={`b${i}`} className="px-4">
              {t} ✦
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}
