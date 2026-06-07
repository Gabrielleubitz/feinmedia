"use client";

import { Eye, Smartphone, Target, Zap } from "lucide-react";
import { ExpandingCards, type CardItem } from "@/components/expanding-cards";
import { Reveal } from "@/components/reveal";

const advantageCards: CardItem[] = [
  {
    id: 1,
    title: "Maximized Views",
    description:
      "Engineered for engagement. We create high-impact social media videos that grab attention in the first 3 seconds.",
    imgSrc: "/images/wix/social-portfolio-phone.jpg",
    icon: <Eye className="h-6 w-6 text-primary" />,
    linkHref: "#gallery",
  },
  {
    id: 2,
    title: "Rapid Turnaround",
    description:
      "Never miss a trend. Our streamlined post-production delivers polished event coverage and reels in record time.",
    imgSrc: "/images/wix/edit-suite.jpg",
    icon: <Zap className="h-6 w-6 text-primary" />,
    linkHref: "#gallery",
  },
  {
    id: 3,
    title: "Vertical-First Edits",
    description:
      "Native content for mobile. We specialize in 9:16 framing that feels right at home on Instagram and TikTok.",
    imgSrc: "/images/wix/hand-holding-phone.jpg",
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    linkHref: "#gallery",
  },
  {
    id: 4,
    title: "Tailored Strategy",
    description:
      "Content with a purpose. Every frame is edited to match your brand voice and platform-specific algorithms.",
    imgSrc: "/images/wix/pro-camera-night.jpg",
    icon: <Target className="h-6 w-6 text-primary" />,
    linkHref: "#contact",
  },
];

export function AdvantageSection() {
  return (
    <section id="advantage" className="border-t border-border bg-background py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-14 sm:gap-6 md:flex-row md:items-end">
          <Reveal variant="up">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              The Fein <span className="text-primary">Advantage</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Four pillars that turn passive scrollers into engaged audiences for
              your brand. Hover or tap to explore.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={180}>
          <div className="flex justify-center">
            <ExpandingCards items={advantageCards} defaultActiveIndex={0} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
