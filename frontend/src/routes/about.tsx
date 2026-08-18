import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Placeholder } from "@/components/Placeholder";
import { MarqueeButton } from "@/components/MarqueeButton";
import lifestyleVideo from "@/assets/lifestyle/lifestyle-pocket-routine.mp4.asset.json";
import studioStillLife from "@/assets/about/studio-still-life.png.asset.json";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero text */}
      <section className="mx-auto max-w-4xl px-6 md:px-8 pt-24 pb-20 text-center">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
          Our story
        </div>
        <h1
          className="font-display text-5xl md:text-7xl leading-[1]"
          style={{ color: "var(--foreground)" }}
        >
          Skincare, in your pocket.
        </h1>
        <p
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          PocketGlow Essentials began with a simple question — what if your favorite routine
          fit in your back pocket? We make single-use sachets of considered,
          beautifully-formulated skincare for people who move through the world.
        </p>
      </section>

      {/* Lifestyle video */}
      <section className="px-6 md:px-8">
        <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl">
          <video
            src={lifestyleVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Our promise */}
      <section className="mx-auto max-w-5xl px-6 md:px-8 py-28 grid md:grid-cols-2 gap-12 items-center">
        <Placeholder src={studioStillLife.url} alt="Studio still life" label="Studio still life" aspect="portrait" />
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Our promise
          </div>
          <h2
            className="font-display text-4xl md:text-5xl mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Considered, every step.
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Each formula is dermatologist-considered, fragrance-conscious and
            packed in recyclable single-dose sachets. No more half-empty jars,
            no more spilled travel bottles.
          </p>
          <div className="mt-8">
            <MarqueeButton text="Shop the range" />
          </div>
        </div>
      </section>

      {/* Values cards */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 pb-32 grid md:grid-cols-3 gap-8 text-center">
        {[
          { t: "Clean", d: "Free from parabens, sulfates, mineral oils and synthetic dyes." },
          { t: "Considered", d: "Made in small batches with traceable, ethically-sourced actives." },
          { t: "Conscious", d: "Recyclable mono-material sachets and refillable pouches." },
        ].map((b) => (
          <div
            key={b.t}
            className="rounded-3xl p-10"
            style={{ backgroundColor: "var(--card)" }}
          >
            <div
              className="font-display text-3xl mb-3"
              style={{ color: "var(--foreground)" }}
            >
              {b.t}
            </div>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {b.d}
            </p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
