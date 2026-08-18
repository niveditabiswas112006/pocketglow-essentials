export function AnnouncementBar() {
  const messages = [
    "Free shipping on orders over ₹999",
    "Snap. Squeeze. Glow.",
    "New: Tinted Lip Sachet",
    "Travel-friendly single-use beauty",
  ];
  // Duplicate for seamless marquee
  const loop = [...messages, ...messages, ...messages, ...messages];
  return (
    <div className="bg-ink text-cream text-[11px] tracking-[0.25em] uppercase overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee py-2">
        {loop.map((m, i) => (
          <span key={i} className="px-8 flex items-center gap-8">
            {m}
            <span className="opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
