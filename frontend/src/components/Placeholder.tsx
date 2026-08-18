import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label?: string;
  aspect?: "square" | "video" | "portrait" | "wide" | "hero";
  variant?: "image" | "video";
  className?: string;
  rounded?: boolean;
  src?: string;
  alt?: string;
}

const aspectMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
  hero: "aspect-[16/9] md:aspect-[21/9]",
};

/**
 * A clean placeholder block to swap with your real image/video later.
 * Just replace `<Placeholder ... />` with an <img /> or <video /> when ready.
 */
export function Placeholder({
  label,
  aspect = "square",
  variant = "image",
  className,
  rounded = true,
  src,
  alt,
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspectMap[aspect],
        rounded && "rounded-2xl",
        className,
      )}
      style={{
        background:
          "linear-gradient(135deg, #F4EFEA 0%, #DCD1C7 55%, #D9C7C0 100%)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? label ?? "Product image"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-1"
                style={{ color: "#917E71", opacity: 0.7 }}
              >
                {variant === "video" ? "Video placeholder" : "Image placeholder"}
              </div>
              {label && (
                <div
                  className="font-display text-base md:text-lg italic"
                  style={{ color: "#917E71", opacity: 0.7 }}
                >
                  {label}
                </div>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
        </>
      )}
    </div>
  );
}
