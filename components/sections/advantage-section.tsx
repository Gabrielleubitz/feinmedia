import { Eye, Zap, Smartphone, Target } from "lucide-react";
import { Reveal } from "@/components/reveal";

const advantages = [
  {
    icon: Eye,
    title: "Maximized Views",
    description:
      "Engineered for engagement. We create high-impact social media videos that grab attention in the first 3 seconds.",
  },
  {
    icon: Zap,
    title: "Rapid Turnaround",
    description:
      "Never miss a trend. Our streamlined post-production delivers polished event coverage and reels in record time.",
  },
  {
    icon: Smartphone,
    title: "Vertical-First Edits",
    description:
      "Native content for mobile. We specialize in 9:16 framing that feels right at home on Instagram and TikTok.",
  },
  {
    icon: Target,
    title: "Tailored Strategy",
    description:
      "Content with a purpose. Every frame is edited to match your brand voice and platform-specific algorithms.",
  },
];

export function AdvantageSection() {
  return (
    <section id="advantage" className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal variant="up">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              The Fein <span className="text-primary">Advantage</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Four pillars that turn passive scrollers into engaged audiences for
              your brand.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item, i) => (
            <Reveal key={item.title} variant="up" delay={i * 110}>
              <div className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50">
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon size={22} />
                </span>
                <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
