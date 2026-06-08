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
const WHEEL_PROGRESS_FACTOR = 0.00135;

function getTouchProgressFactor() {
  return window.matchMedia("(max-width: 767px)").matches ? 0.005 : 0.0028;
}

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
  const touchBaselineProgressRef = useRef(0);
  const touchVelocityRef = useRef(0);
  const lastTouchMoveRef = useRef<{ y: number; time: number } | null>(null);
  const progressAnimationRef = useRef<number | null>(null);
  const userHasUnmutedRef = useRef(false);

  const isExpansionComplete = () =>
    mediaFullyExpandedRef.current || scrollProgressRef.current >= 1;

  const syncProgressState = (newProgress: number) => {
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
  };

  const applyProgressValue = (newProgress: number, fromUserGesture: boolean) => {
    const clamped = Math.min(Math.max(newProgress, 0), 1);
    if (clamped === scrollProgressRef.current) return;

    syncProgressState(clamped);

    if (!fromUserGesture) return;

    const video = videoRef.current;
    if (!video || mediaType !== "video") return;

    const wantAudio =
      clamped >= AUDIO_START_PROGRESS && isVideoInViewRef.current;

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

  const applyProgressDelta = (delta: number, fromUserGesture: boolean) => {
    applyProgressValue(scrollProgressRef.current + delta, fromUserGesture);
  };

  const cancelProgressAnimation = () => {
    if (progressAnimationRef.current !== null) {
      cancelAnimationFrame(progressAnimationRef.current);
      progressAnimationRef.current = null;
    }
  };

  const animateProgressTo = (target: number, fromUserGesture: boolean) => {
    cancelProgressAnimation();

    const start = scrollProgressRef.current;
    if (Math.abs(start - target) < 0.001) {
      applyProgressValue(target, fromUserGesture);
      return;
    }

    const startTime = performance.now();
    const duration = 320;

    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      applyProgressValue(start + (target - start) * eased, fromUserGesture);

      if (t < 1) {
        progressAnimationRef.current = requestAnimationFrame(step);
      } else {
        progressAnimationRef.current = null;
      }
    };

    progressAnimationRef.current = requestAnimationFrame(step);
  };

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

    const hijacking = !mediaFullyExpanded && scrollProgress < 1;
    document.body.style.overflow = hijacking ? "hidden" : "";
    document.documentElement.style.overscrollBehaviorY = hijacking ? "none" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, [reducedMotion, mediaFullyExpanded, scrollProgress]);

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

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
          applyProgressDelta(e.deltaY * WHEEL_PROGRESS_FACTOR, true);
        }
        return;
      }

      e.preventDefault();
      applyProgressDelta(e.deltaY * WHEEL_PROGRESS_FACTOR, true);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      cancelProgressAnimation();
      const y = e.touches[0].clientY;
      touchStartYRef.current = y;
      touchBaselineProgressRef.current = scrollProgressRef.current;
      touchVelocityRef.current = 0;
      lastTouchMoveRef.current = { y, time: performance.now() };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      const startY = touchStartYRef.current;
      if (startY === null) return;

      const touchY = e.touches[0].clientY;
      const now = performance.now();
      const lastMove = lastTouchMoveRef.current;

      if (lastMove) {
        const dt = now - lastMove.time;
        if (dt > 0) {
          touchVelocityRef.current = (lastMove.y - touchY) / dt;
        }
      }

      lastTouchMoveRef.current = { y: touchY, time: now };

      const deltaY = startY - touchY;
      const nextProgress =
        touchBaselineProgressRef.current + deltaY * getTouchProgressFactor();

      if (isExpansionComplete()) {
        if (deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault();
          applyProgressValue(nextProgress, true);
        }
        return;
      }

      e.preventDefault();
      applyProgressValue(nextProgress, true);
    };

    const handleTouchEnd = () => {
      const progress = scrollProgressRef.current;
      const velocity = touchVelocityRef.current;
      const atTop = window.scrollY <= 5;

      if (!isExpansionComplete()) {
        if (progress >= 0.72 || (progress >= 0.34 && velocity > 0.35)) {
          animateProgressTo(1, true);
        } else if (progress <= 0.18 || (progress < 0.34 && velocity < -0.35)) {
          animateProgressTo(0, true);
        }
      } else if (atTop && progress < 1) {
        if (progress >= 0.5 || velocity > 0.25) {
          animateProgressTo(1, true);
        } else {
          animateProgressTo(0, true);
        }
      }

      touchStartYRef.current = null;
      lastTouchMoveRef.current = null;
      touchVelocityRef.current = 0;
    };

    const handleTouchCancel = () => {
      handleTouchEnd();
    };

    const handleScroll = () => {
      if (!isExpansionComplete()) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    section.addEventListener("touchstart", handleTouchStart, { passive: false });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });
    section.addEventListener("touchend", handleTouchEnd);
    section.addEventListener("touchcancel", handleTouchCancel);

    return () => {
      cancelProgressAnimation();
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
      section.removeEventListener("touchend", handleTouchEnd);
      section.removeEventListener("touchcancel", handleTouchCancel);
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
  const textTranslateX = scrollProgress * (isMobileState ? 52 : 150);
  const heroTextOpacity = isMobileState
    ? Math.max(0, 1 - scrollProgress * 2.75)
    : Math.max(0, 1 - scrollProgress * 1.1);
  const expandHint =
    scrollToExpand && isMobileState
      ? scrollToExpand.replace(/scroll/i, "Swipe")
      : scrollToExpand;

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="overflow-x-hidden bg-background transition-colors duration-700 ease-in-out"
      style={{
        touchAction: mediaFullyExpanded || scrollProgress >= 1 ? "auto" : "none",
      }}
    >
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
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center pt-[calc(5rem+env(safe-area-inset-top))]">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: isMobileState ? "72vh" : "85vh",
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

                <div
                  className="relative z-10 mt-4 flex flex-col items-center text-center transition-none"
                  style={{ opacity: heroTextOpacity }}
                >
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
                      className="mt-2 px-2 text-xs text-muted-foreground sm:text-sm"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {expandHint}
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                className={`relative z-10 flex w-full max-w-[100vw] flex-col items-center justify-center gap-1 px-3 text-center transition-none sm:gap-2 md:gap-4 ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
                animate={{ opacity: heroTextOpacity }}
                transition={{ duration: 0.08 }}
                style={{
                  pointerEvents: heroTextOpacity <= 0.05 ? "none" : "auto",
                }}
                aria-hidden={heroTextOpacity <= 0.05}
              >
                <motion.h1
                  className="font-display text-4xl font-bold tracking-tighter text-foreground transition-none sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h1>
                <motion.h1
                  className="font-display text-4xl font-bold tracking-tighter text-primary transition-none sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h1>
              </motion.div>
            </div>

            <motion.section
              className="flex w-full flex-col bg-background px-4 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:px-6 md:px-12 md:pb-24 lg:px-20 lg:pb-24"
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
