"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";
import type { World } from "@/data/worlds";

export default function WorldCard({
  world,
  index,
}: {
  world: World;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const isEven = index % 2 === 0;

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <m.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={() => router.push(`/worlds/${world.id}`)}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ash bg-ash/30 will-change-transform transition-[border-color] duration-300 ease-out hover:border-gold/40"
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(201,168,76,0.08),transparent_40%)]" />

        {/* Full-bleed background image */}
        {world.image && (
          <div className="absolute inset-0">
            <Image
              src={world.image}
              alt={world.imageAlt || world.title}
              fill
              sizes="100vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                isEven ? "object-left" : "object-right"
              }`}
            />
          </div>
        )}

        {/* Gradient — fades image into dark on the text side */}
        <div
          className={`absolute inset-0 ${
            isEven
              ? "bg-gradient-to-r from-transparent via-void/60 via-45% to-void/95"
              : "bg-gradient-to-l from-transparent via-void/60 via-45% to-void/95"
          } max-sm:bg-gradient-to-b max-sm:from-transparent max-sm:via-void/50 max-sm:to-void/90`}
        />

        {/* Content — positioned on the text side */}
        <div
          className={`relative z-[2] flex min-h-[240px] items-center sm:min-h-[280px] ${
            isEven ? "sm:justify-end" : "sm:justify-start"
          }`}
        >
          <div className={`p-6 sm:w-3/5 sm:p-8 lg:p-10 ${isEven ? "sm:pl-4" : "sm:pr-4"}`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label={world.title}>
                {world.icon}
              </span>
              <h3 className="font-display text-xl font-bold tracking-wider text-bone lg:text-2xl">
                {world.title}
              </h3>
            </div>

            <p className="mt-1 text-sm font-medium text-gold">
              {world.subtitle}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-smoke">
              {world.description}
            </p>

            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold/60 transition-colors group-hover:text-gold">
              Explore &rarr;
            </p>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}
