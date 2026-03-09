"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { m, type MotionValue, useTransform } from "framer-motion";
import type { World } from "@/data/worlds";

interface WorldCardProps {
  world: World;
  scrollProgress: MotionValue<number>;
  from: { x: number; y: number };
  delay: number;
  position: { left: string; top: string };
}

export default function WorldCard({
  world,
  scrollProgress,
  from,
  delay,
  position,
}: WorldCardProps) {
  const router = useRouter();

  // Slow, smooth scroll-driven animation
  const range: [number, number] = [delay, Math.min(delay + 0.55, 1)];
  const x = useTransform(scrollProgress, range, [from.x, 0]);
  const y = useTransform(scrollProgress, range, [from.y, 0]);
  const opacity = useTransform(scrollProgress, range, [0, 1]);
  const scale = useTransform(scrollProgress, range, [0.75, 1]);

  return (
    <m.div
      style={{
        x,
        y,
        opacity,
        scale,
        left: position.left,
        top: position.top,
      }}
      className="absolute w-1/2 aspect-square pointer-events-none will-change-transform diamond-glow"
    >
      {/* Inner diamond — clip-path handles both visual and pointer events */}
      <div
        className="relative w-full h-full diamond-clip overflow-hidden pointer-events-auto cursor-pointer group"
        onClick={() => router.push(`/worlds/${world.id}`)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") router.push(`/worlds/${world.id}`);
        }}
      >
        {/* Background image */}
        {world.image && (
          <Image
            src={world.image}
            alt={world.imageAlt || world.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 425px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ objectPosition: world.imagePosition || "center center" }}
          />
        )}

        {/* Radial vignette — dark center for text, clear edges for image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_52%,rgba(10,10,10,0.65),rgba(10,10,10,0.15)_65%,transparent_90%)]" />

        {/* Holographic sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,transparent_20%,rgba(201,168,76,0.08)_45%,rgba(201,168,76,0.15)_50%,rgba(201,168,76,0.08)_55%,transparent_80%)]" />

        {/* Text content — centered in diamond */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-[18%]">
          <span
            className="text-xl sm:text-3xl lg:text-4xl"
            role="img"
            aria-label={world.title}
          >
            {world.icon}
          </span>
          <h3 className="mt-1 font-display text-xs sm:text-xl lg:text-2xl font-bold tracking-wider text-bone">
            {world.title}
          </h3>
          {/* Elegant gold separator */}
          <div className="mt-1.5 hidden sm:block h-px w-8 bg-gold/30" />
          <p className="mt-1.5 hidden sm:block text-[10px] lg:text-sm font-medium text-gold">
            {world.subtitle}
          </p>
          <p className="mt-2 hidden lg:block text-[11px] leading-relaxed text-smoke/70 line-clamp-2 max-w-[280px]">
            {world.description}
          </p>
          <p className="mt-2 sm:mt-3 text-[7px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] text-gold/40 transition-colors duration-300 group-hover:text-gold">
            Explore &rarr;
          </p>
        </div>
      </div>
    </m.div>
  );
}
