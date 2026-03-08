"use client";

import { useRef } from "react";
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <m.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative overflow-hidden rounded-2xl border border-ash bg-ash/30 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40"
    >
      {/* Background image */}
      {world.image && (
        <div className="relative h-72 overflow-hidden">
          <Image
            src={world.image}
            alt={world.imageAlt || world.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-void" />
        </div>
      )}

      <div className="relative p-8">
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(201,168,76,0.08),transparent_40%)]" />

        <span className="text-3xl" role="img" aria-label={world.title}>
          {world.icon}
        </span>

        <h3 className="mt-4 font-display text-xl font-bold tracking-wider text-bone">
          {world.title}
        </h3>

        <p className="mt-1 text-sm font-medium text-gold">{world.subtitle}</p>

        <p className="mt-4 text-sm leading-relaxed text-smoke">
          {world.description}
        </p>
      </div>
    </m.div>
  );
}
