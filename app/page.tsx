import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { AdvantageSection } from "@/components/sections/advantage-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { EdgeSection } from "@/components/sections/edge-section";
import { GalleryBentoSection } from "@/components/sections/gallery-bento-section";
import { FooterSection } from "@/components/sections/footer-section";
import { IganiBadge, IganiCredit } from "@/components/igani-badge";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background pb-[env(safe-area-inset-bottom)]">
      <Header />
      <HeroSection />
      <AdvantageSection />
      <MarqueeSection />
      <EdgeSection />
      <GalleryBentoSection />
      <IganiCredit />
      <FooterSection />
      <IganiBadge />
    </main>
  );
}
