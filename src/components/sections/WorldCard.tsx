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

  const range: [number, number] = [delay, Math.min(delay + 0.45, 1)];
  const x = useTransform(scrollProgress, range, [from.x, 0]);
  const y = useTransform(scrollProgress, range, [from.y, 0]);
  const opacity = useTransform(scrollProgress, range, [0, 1]);
  const scale = useTransform(scrollProgress, range, [0.6, 1]);

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
      onClick={() => router.push(`/worlds/${world.id}`)}
      className="absolute w-1/2 aspect-square cursor-pointer group will-change-transform diamond-glow"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/worlds/${world.id}`);
      }}
    >
      <div className="relative w-full h-full diamond-clip overflow-hidden">
        {/* Background image */}
        {world.image && (
          <Image
            src={world.image}
            alt={world.imageAlt || world.title}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ objectPosition: world.imagePosition || "center center" }}
          />
        )}

        {/* Dark gradient — clear top (image subject), dark bottom (text) */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/10 via-void/30 via-45% to-void/85" />

        {/* Holographic sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,transparent_20%,rgba(201,168,76,0.1)_45%,rgba(201,168,76,0.18)_50%,rgba(201,168,76,0.1)_55%,transparent_80%)]" />

        {/* Text content — positioned in bottom-center of diamond */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-[20%] text-center px-[18%]">
          <span
            className="text-lg sm:text-2xl lg:text-3xl"
            role="img"
            aria-label={world.title}
          >
            {world.icon}
          </span>
          <h3 className="mt-0.5 font-display text-[11px] sm:text-base lg:text-xl font-bold tracking-wider text-bone">
            {world.title}
          </h3>
          <p className="mt-0.5 hidden sm:block text-[9px] lg:text-xs font-medium text-gold">
            {world.subtitle}
          </p>
          <p className="mt-1 hidden lg:block text-[10px] leading-relaxed text-smoke/80 line-clamp-2">
            {world.description}
          </p>
          <p className="mt-1 sm:mt-2 text-[7px] sm:text-[9px] lg:text-[11px] uppercase tracking-[0.15em] text-gold/40 transition-colors duration-300 group-hover:text-gold">
            Explore &rarr;
          </p>
        </div>
      </div>
    </m.div>
  );
}
