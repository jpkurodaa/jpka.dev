"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { WORLDS } from "@/data/worlds";
import SectionWrapper from "@/components/ui/SectionWrapper";
import WorldCard from "@/components/sections/WorldCard";

/* Diamond formation positions & fly-in directions
 *
 *           BUILD (top)
 *    THINK (left)    SPEAK (right)
 *          CREATE (bottom)
 *
 * Each diamond is 50% of the container, positioned so their
 * clip-path diamonds tile into a larger diamond shape.
 */
const FORMATION = [
  // BUILD → top center, flies in from above
  { position: { left: "25%", top: "0%" }, from: { x: 0, y: -160 }, delay: 0 },
  // SPEAK → right center, flies in from right
  { position: { left: "50%", top: "25%" }, from: { x: 160, y: 0 }, delay: 0.1 },
  // THINK → left center, flies in from left
  { position: { left: "0%", top: "25%" }, from: { x: -160, y: 0 }, delay: 0.15 },
  // CREATE → bottom center, flies in from below
  { position: { left: "25%", top: "50%" }, from: { x: 0, y: 160 }, delay: 0.25 },
];

/* Diamond centers in SVG viewBox coordinates (0-100) */
const CENTERS = {
  build: { x: 50, y: 25 },
  think: { x: 25, y: 50 },
  speak: { x: 75, y: 50 },
  create: { x: 50, y: 75 },
};

export default function Worlds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 40%"],
  });

  // Constellation lines — staggered after diamonds assemble
  const lineOpacity1 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const lineOpacity2 = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const lineOpacity3 = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const lineOpacity4 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  const lineOpacities = [lineOpacity1, lineOpacity2, lineOpacity3, lineOpacity4];

  // Constellation line paths: BUILD↔THINK, BUILD↔SPEAK, THINK↔CREATE, SPEAK↔CREATE
  const lines = [
    { x1: CENTERS.build.x, y1: CENTERS.build.y, x2: CENTERS.think.x, y2: CENTERS.think.y },
    { x1: CENTERS.build.x, y1: CENTERS.build.y, x2: CENTERS.speak.x, y2: CENTERS.speak.y },
    { x1: CENTERS.think.x, y1: CENTERS.think.y, x2: CENTERS.create.x, y2: CENTERS.create.y },
    { x1: CENTERS.speak.x, y1: CENTERS.speak.y, x2: CENTERS.create.x, y2: CENTERS.create.y },
  ];

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
        className="relative mx-auto mt-16 aspect-square w-[260px] sm:w-[480px] lg:w-[640px]"
      >
        {/* Diamond cards */}
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

        {/* Constellation lines connecting diamond centers */}
        <svg
          className="absolute inset-0 z-10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          {lines.map((line, i) => (
            <m.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(201,168,76,0.2)"
              strokeWidth="0.3"
              style={{ opacity: prefersReducedMotion ? 1 : lineOpacities[i] }}
            />
          ))}

          {/* Center nexus glow */}
          <m.circle
            cx="50"
            cy="50"
            r="1.5"
            fill="rgba(201,168,76,0.5)"
            className="nexus-pulse"
            style={{ opacity: prefersReducedMotion ? 0.5 : centerOpacity }}
          />
        </svg>
      </div>
    </SectionWrapper>
  );
}
