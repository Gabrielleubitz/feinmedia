"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const AUDIO_START_PROGRESS = 0.5;

export function ScrollExpandMedia({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrollProgressRef = useRef(0);
  const mediaFullyExpandedRef = useRef(false);
  const isVideoInViewRef = useRef(true);
  const touchStartYRef = useRef<number | null>(null);
  const userHasUnmutedRef = useRef(false);

  const isExpansionComplete = () =>
    mediaFullyExpandedRef.current || scrollProgressRef.current >= 1;

  const applyProgressDelta = (delta: number, fromUserGesture: boolean) => {
    const newProgress = Math.min(
      Math.max(scrollProgressRef.current + delta, 0),
      1,
    );
    scrollProgressRef.current = newProgress;
    setScrollProgress(newProgress);

    if (newProgress >= 1) {
      mediaFullyExpandedRef.current = true;
      setMediaFullyExpanded(true);
      setShowContent(true);
    } else {
      mediaFullyExpandedRef.current = false;
      setMediaFullyExpanded(false);
      if (newProgress < 0.75) {
        setShowContent(false);
      }
    }

    if (!fromUserGesture) return;

    const video = videoRef.current;
    if (!video || mediaType !== "video") return;

    const wantAudio =
      newProgress >= AUDIO_START_PROGRESS && isVideoInViewRef.current;

    if (wantAudio) {
      userHasUnmutedRef.current = true;
      video.muted = false;
      void video.play().catch(() => {
        video.muted = true;
        userHasUnmutedRef.current = false;
        void video.play().catch(() => {});
      });
    } else {
      video.muted = true;
      void video.play().catch(() => {});
    }
  };

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = mq.matches;
      setReducedMotion(reduced);
      if (reduced) {
        scrollProgressRef.current = 1;
        mediaFullyExpandedRef.current = true;
        setScrollProgress(1);
        setShowContent(true);
        setMediaFullyExpanded(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== "video") return;

    video.loop = true;

    const replay = () => {
      video.currentTime = 0;
      const wantAudio =
        userHasUnmutedRef.current &&
        scrollProgressRef.current >= AUDIO_START_PROGRESS &&
        isVideoInViewRef.current;
      video.muted = !wantAudio;
      void video.play().catch(() => {
        video.muted = true;
        void video.play().catch(() => {});
      });
    };

    video.addEventListener("ended", replay);

    return () => {
      video.removeEventListener("ended", replay);
    };
  }, [mediaType]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaType !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVideoInViewRef.current = entry.isIntersecting;

        const video = videoRef.current;
        if (video && !entry.isIntersecting) {
          video.muted = true;
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [mediaType]);

  useEffect(() => {
    if (reducedMotion) return;
    scrollProgressRef.current = 0;
    mediaFullyExpandedRef.current = false;
    userHasUnmutedRef.current = false;
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerDown = () => {
      const video = videoRef.current;
      if (!video || mediaType !== "video") return;

      if (
        scrollProgressRef.current >= AUDIO_START_PROGRESS &&
        isVideoInViewRef.current
      ) {
        userHasUnmutedRef.current = true;
        video.muted = false;
        void video.play().catch(() => {
          video.muted = true;
          userHasUnmutedRef.current = false;
          void video.play().catch(() => {});
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isExpansionComplete()) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault();
          applyProgressDelta(e.deltaY * 0.0009, true);
        }
        return;
      }

      e.preventDefault();
      applyProgressDelta(e.deltaY * 0.0009, true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const startY = touchStartYRef.current;
      if (startY === null) return;

      const touchY = e.touches[0].clientY;
      const deltaY = startY - touchY;

      if (isExpansionComplete()) {
        if (deltaY < -20 && window.scrollY <= 5) {
          e.preventDefault();
          applyProgressDelta(deltaY * 0.005, true);
        }
        return;
      }

      e.preventDefault();
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      applyProgressDelta(deltaY * scrollFactor, true);
      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const handleScroll = () => {
      if (!isExpansionComplete()) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [reducedMotion, mediaType]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="overflow-x-hidden bg-background transition-colors duration-700 ease-in-out">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="h-screen w-screen object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-background/70" />
          </motion.div>

          <div className="container relative z-10 mx-auto flex flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center pt-20">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: scrollProgress > 0.3 ? "0 0 80px rgba(34, 211, 238, 0.15)" : "0 0 50px rgba(0, 0, 0, 0.4)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="pointer-events-none relative h-full w-full">
                    <video
                      ref={videoRef}
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full rounded-2xl object-cover"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-black/40"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-black/50"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  {date && (
                    <p
                      className="text-sm font-medium uppercase tracking-[0.25em] text-primary"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && scrollProgress < 0.85 && (
                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center transition-none md:gap-4 ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h1
                  className="font-display text-5xl font-bold tracking-tighter text-foreground transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className="font-display text-5xl font-bold tracking-tighter text-primary transition-none md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h1>
              </div>
            </div>

            <motion.section
              className="flex w-full flex-col bg-background px-6 pb-16 md:px-12 lg:px-20 lg:pb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
