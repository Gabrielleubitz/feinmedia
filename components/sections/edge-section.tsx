import { FadeImage } from "@/components/fade-image";
import { Reveal } from "@/components/reveal";

export function EdgeSection() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:gap-12 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-20 lg:px-20">
        {/* Image */}
        <Reveal variant="right" duration={1100} className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <FadeImage
              src="/images/wix/edit-suite.jpg"
              alt="Professional video editing suite with multi-monitor workflow"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal variant="left">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              The Fein <span className="text-primary">Edge</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-7 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Every frame is intentional. We combine cinematic craft with
              platform-native pacing — vertical-first edits, bold color grading,
              and hooks that land in the first three seconds. Your story deserves
              production that feels as sharp as it looks.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-9 sm:gap-4">
            {[
              { value: "3s", label: "Hook window" },
              { value: "9:16", label: "Native framing" },
              { value: "24h", label: "Fast turnaround" },
            ].map((stat, i) => (
              <Reveal key={stat.label} variant="up" delay={250 + i * 110}>
                <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
                  <p className="text-lg font-semibold text-primary sm:text-2xl md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase leading-tight tracking-wide text-muted-foreground sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
