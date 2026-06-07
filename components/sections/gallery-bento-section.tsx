"use client";

import InteractiveBentoGallery, { type MediaItemType } from "@/components/interactive-bento-gallery";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "video",
    title: "Showreel",
    desc: "Powerful visuals that tell your story.",
    url: "/videos/hero-bg.mp4",
    span: "sm:col-span-2 sm:row-span-4",
  },
  {
    id: 2,
    type: "image",
    title: "On Set",
    desc: "Professional videography in action.",
    url: "/images/fein-slate.png",
    span: "sm:col-span-1 sm:row-span-3",
  },
  {
    id: 3,
    type: "image",
    title: "Edit Suite",
    desc: "Cinematic color grading and post-production.",
    url: "/images/fein-editor.png",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Reel Magic",
    desc: "Scroll-stopping short-form content.",
    url: "/images/fein-reel.png",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Vertical First",
    desc: "Social-native 9:16 delivery.",
    url: "/images/fein-phone.png",
    span: "sm:col-span-1 sm:row-span-3",
  },
  {
    id: 6,
    type: "image",
    title: "Event Coverage",
    desc: "High-energy event films and highlights.",
    url: "/images/fein-hero-poster.png",
    span: "sm:col-span-2 sm:row-span-2",
  },
];

export function GalleryBentoSection() {
  return (
    <section id="gallery" className="border-t border-border bg-background py-16 md:py-24">
      <InteractiveBentoGallery
        title="Scroll-Stopping Content"
        description="Tap to expand. Drag tiles to reorder. Fast cuts, vertical-first framing, and social-native ideas turned into high-energy reels."
        mediaItems={mediaItems}
      />
    </section>
  );
}
