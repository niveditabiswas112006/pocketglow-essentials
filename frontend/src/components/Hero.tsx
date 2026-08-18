import heroVideo from "@/assets/hero/hero-video.mp4.asset.json";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo.url}
      />
    </section>
  );
}
