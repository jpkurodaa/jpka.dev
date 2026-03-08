"use client";

import { AnimatePresence, m } from "framer-motion";

export const ROLES = ["Speaker", "Artist", "Builder", "Philosopher"];

export default function RotatingSubtitle({ index }: { index: number }) {
  return (
    <span className="relative inline-block h-[1.3em] w-[280px] sm:w-[320px] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <m.span
          key={ROLES[index]}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-0 text-gold"
        >
          {ROLES[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
