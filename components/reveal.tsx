"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** Only animate the first time it enters the viewport */
  once?: boolean;
}

const hiddenByVariant: Record<RevealVariant, string> = {
  up: "translate-y-10 opacity-0",
  down: "-translate-y-10 opacity-0",
  left: "translate-x-12 opacity-0",
  right: "-translate-x-12 opacity-0",
  fade: "opacity-0",
  scale: "scale-95 opacity-0",
  blur: "opacity-0 blur-md",
};

export function Reveal({
  children,
  as,
  variant = "up",
  delay = 0,
  duration = 900,
  className,
  once = true,
}: RevealProps) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Component
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-all ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0" : hiddenByVariant[variant],
        className,
      )}
    >
      {children}
    </Component>
  );
}
