import { FadeImage } from "@/components/fade-image";
import { Reveal } from "@/components/reveal";

const gallery = [
  {
    src: "/images/fein-slate.png",
    alt: "Film clapperboard slate on set",
    caption: "On Set",
  },
  {
    src: "/images/fein-editor.png",
    alt: "Editor color grading footage",
    caption: "Edit Workflow",
  },
  {
    src: "/images/fein-reel.png",
    alt: "Golden film reel close-up",
    caption: "Reel Magic",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="relative overflow-hidden border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="mb-12 text-center">
          <Reveal variant="up">
            <h2 className="text-balance text-4xl font-semibold uppercase tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Scroll-Stopping
              <br />
              Content
            </h2>
          </Reveal>
          <Reveal variant="up" delay={150}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-primary md:text-lg">
              Fast cuts that hook viewers in the first 3 seconds. Vertical-first
              framing for native app experiences. Social-native ideas turned into
              high-energy reels.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {gallery.map((item, i) => (
            <Reveal key={item.caption} variant="scale" delay={i * 140} duration={1000}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border">
                <FadeImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  fadeDelay={i * 120}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  {item.caption}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
