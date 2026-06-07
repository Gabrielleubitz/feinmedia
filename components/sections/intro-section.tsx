import { Reveal } from "@/components/reveal";

export function IntroSection() {
  return (
    <section className="border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-20">
        <Reveal variant="up">
          <p className="font-display text-balance text-2xl font-medium leading-snug text-foreground md:text-3xl lg:text-4xl">
            At Fein Media Productions, we help businesses, brands, and
            organizations stand out through{" "}
            <span className="text-primary">powerful visual content</span>.
          </p>
        </Reveal>

        <Reveal variant="up" delay={150}>
          <p className="mt-8 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From professional videography and video editing to social media
            management, we create content designed to capture attention, tell
            your story, and grow your audience. Whether it&apos;s event coverage,
            promotional videos, or online branding, we bring creative ideas to
            life with a modern, professional touch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
