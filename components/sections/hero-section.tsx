"use client";

import Link from "next/link";
import { ScrollExpandMedia } from "@/components/scroll-expand-media";

export function HeroSection() {
  return (
    <div id="work">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/hero-bg.mp4"
        posterSrc="/videos/hero-poster.jpg"
        bgImageSrc="/videos/hero-poster.jpg"
        title="Fein Media"
        date="Est. 2026"
        scrollToExpand="Scroll to expand"
      >
        <div className="mx-auto max-w-4xl border-t border-border pt-16 md:pt-20">
          <p className="font-display text-balance text-center text-2xl font-medium leading-snug text-foreground md:text-3xl lg:text-4xl">
            At Fein Media Productions, we help businesses, brands, and
            organizations stand out through{" "}
            <span className="text-primary">powerful visual content</span>.
          </p>

          <p className="mx-auto mt-8 max-w-3xl text-pretty text-center text-base leading-relaxed text-muted-foreground md:text-lg">
            From professional videography and video editing to social media
            management, we create content designed to capture attention, tell
            your story, and grow your audience. Whether it&apos;s event coverage,
            promotional videos, or online branding, we bring creative ideas to
            life with a modern, professional touch.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/feinmediaproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Book a call now
            </a>
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View the reels
            </Link>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Videography · Editing · Social Media Management
          </p>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
