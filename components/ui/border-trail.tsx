"use client";
import { cn } from "@/lib/utils";
import { motion, Transition } from "framer-motion";

type BorderTrailProps = {
  className?: string;
  size?: number;
  transition?: Transition;
  delay?: number;
  onAnimationComplete?: () => void;
  style?: React.CSSProperties;
};

export function BorderTrail({
  className,
  size = 60,
  transition,
  delay,
  onAnimationComplete,
  style,
}: BorderTrailProps) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: "linear",
  };

  const mergedTransition: Transition = {
    repeat: transition?.repeat ?? BASE_TRANSITION.repeat,
    duration: transition?.duration ?? BASE_TRANSITION.duration,
    // ease: transition?.ease ?? BASE_TRANSITION.ease,
    delay: delay ?? transition?.delay,
  };

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square bg-zinc-500", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          ...style,
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={mergedTransition}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
