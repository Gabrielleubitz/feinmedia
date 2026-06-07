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
    desc: "Live view from the camera — real production, real results.",
    url: "/images/wix/on-set-camera.jpg",
    span: "sm:col-span-1 sm:row-span-3",
  },
  {
    id: 3,
    type: "image",
    title: "Edit Workflow",
    desc: "Multi-monitor editing suite built for fast turnaround.",
    url: "/images/wix/edit-suite.jpg",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Reel Magic",
    desc: "Cinematic film craft in every frame.",
    url: "/images/wix/reel-magic.jpg",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Hand Holding Phone",
    desc: "Vertical-first content engineered for the feed.",
    url: "/images/wix/hand-holding-phone.jpg",
    span: "sm:col-span-1 sm:row-span-3",
  },
  {
    id: 6,
    type: "image",
    title: "Pro Camera",
    desc: "High-end gear for high-impact production.",
    url: "/images/wix/pro-camera-night.jpg",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Social Portfolio",
    desc: "Scroll-stopping portraits and brand content.",
    url: "/images/wix/social-portfolio-phone.jpg",
    span: "sm:col-span-1 sm:row-span-2",
  },
  {
    id: 8,
    type: "image",
    title: "Clapperboard",
    desc: "Every project starts with a vision.",
    url: "/images/wix/clapperboard-on-set.jpg",
    span: "sm:col-span-1 sm:row-span-2",
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
