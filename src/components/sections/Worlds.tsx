"use client";

import { useRef } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { WORLDS } from "@/data/worlds";
import SectionWrapper from "@/components/ui/SectionWrapper";
import WorldCard from "@/components/sections/WorldCard";

/* Diamond formation positions & fly-in directions
 *
 *           BUILD (top)
 *    THINK (left)    SPEAK (right)
 *          CREATE (bottom)
 */
const FORMATION = [
  // BUILD → top center, flies in from above
  { position: { left: "25%", top: "0%" }, from: { x: 0, y: -180 }, delay: 0 },
  // SPEAK → right center, flies in from right
  { position: { left: "50%", top: "25%" }, from: { x: 180, y: 0 }, delay: 0.1 },
  // THINK → left center, flies in from left
  { position: { left: "0%", top: "25%" }, from: { x: -180, y: 0 }, delay: 0.15 },
  // CREATE → bottom center, flies in from below
  { position: { left: "25%", top: "50%" }, from: { x: 0, y: 180 }, delay: 0.25 },
];

export default function Worlds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "start 10%"],
  });

  return (
    <SectionWrapper id={SECTIONS.worlds} className="py-20 sm:py-28">
      <h2 className="text-center font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        Worlds I Inhabit
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-smoke">
        Not a portfolio of projects — a map of territories. Each world feeds the
        others.
      </p>

      <div
        ref={containerRef}
        className="relative mx-auto mt-16 w-full max-w-[850px] aspect-square"
      >
        {WORLDS.map((world, i) => (
          <WorldCard
            key={world.id}
            world={world}
            scrollProgress={scrollYProgress}
            from={prefersReducedMotion ? { x: 0, y: 0 } : FORMATION[i].from}
            delay={prefersReducedMotion ? 0 : FORMATION[i].delay}
            position={FORMATION[i].position}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
