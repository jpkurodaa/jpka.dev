"use client";

import { useRef, useState } from "react";
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
  const imgRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [expanding, setExpanding] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleClick = () => {
    if (expanding) return;
    setExpanding(true);

    const img = imgRef.current;
    if (!img) {
      router.push(`/worlds/${world.id}`);
      return;
    }

    const rect = img.getBoundingClientRect();
    const clone = img.cloneNode(true) as HTMLElement;

    // Position clone exactly where original is
    clone.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 9999;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(clone);

    // Trigger expand to full viewport top
    requestAnimationFrame(() => {
      clone.style.top = "0px";
      clone.style.left = "0px";
      clone.style.width = "100vw";
      clone.style.height = "60vh";
      clone.style.borderRadius = "0px";
    });

    setTimeout(() => {
      router.push(`/worlds/${world.id}`);
    }, 400);
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
        onClick={handleClick}
        whileTap={{ scale: 0.985 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-ash bg-ash/30 will-change-transform transition-[border-color] duration-300 ease-out hover:border-gold/40 ${
          expanding ? "opacity-0" : ""
        }`}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(201,168,76,0.08),transparent_40%)]" />

        <div
          className={`flex flex-col sm:flex-row ${
            !isEven ? "sm:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          {world.image && (
            <div
              ref={imgRef}
              className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-2/5"
            >
              <Image
                src={world.image}
                alt={world.imageAlt || world.title}
                fill
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r ${
                  !isEven ? "sm:bg-gradient-to-l" : ""
                } from-transparent to-ash/30`}
              />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
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
