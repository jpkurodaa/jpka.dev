"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";
import type { World } from "@/data/worlds";

type Corner = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export default function WorldCard({
  world,
  index,
}: {
  world: World;
  index: number;
}) {
  const router = useRouter();
  const corner: Corner = (world.textAlign as Corner) || "bottom-left";
  const isRight = corner.includes("right");
  const isTextLeft = corner.includes("left");
  const isTop = corner.includes("top");

  /* Gradient on the seam: fades image edge into the dark text side */
  const seamGradient = isTextLeft
    ? "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.25) 18%, transparent 40%)"
    : "linear-gradient(to left, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.25) 18%, transparent 40%)";

  return (
    <m.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 1.2,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        onClick={() => router.push(`/worlds/${world.id}`)}
        className="group cursor-pointer overflow-hidden rounded-xl border border-ash/40 bg-void transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)]"
      >
        <div
          className={`flex flex-col ${
            isTextLeft ? "sm:flex-row" : "sm:flex-row-reverse"
          }`}
        >
          {/* ── Text side ── */}
          <div
            className={`relative z-[2] p-5 sm:p-6 lg:p-8 sm:w-[38%] flex flex-col ${
              isTop ? "sm:justify-start" : "sm:justify-end"
            } ${
              isRight ? "sm:text-right" : "sm:text-left"
            } max-sm:order-2 max-sm:text-center`}
          >
            <div>
              <div
                className={`flex items-center gap-2.5 ${
                  isRight ? "sm:justify-end" : "sm:justify-start"
                } max-sm:justify-center`}
              >
                <span
                  className="text-xl lg:text-2xl"
                  role="img"
                  aria-label={world.title}
                >
                  {world.icon}
                </span>
                <h3 className="font-display text-lg lg:text-2xl font-bold tracking-wider text-bone">
                  {world.title}
                </h3>
              </div>

              <div
                className={`mt-2.5 h-px w-8 bg-gold/30 ${
                  isRight ? "sm:ml-auto" : ""
                } max-sm:mx-auto`}
              />

              <p className="mt-2.5 text-xs lg:text-sm font-medium text-gold">
                {world.subtitle}
              </p>

              <p className="mt-2 text-xs leading-relaxed text-smoke sm:text-sm">
                {world.description}
              </p>

              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gold/40 transition-colors duration-300 group-hover:text-gold">
                Explore &rarr;
              </p>
            </div>
          </div>

          {/* ── Image side — FULL image, no cropping ── */}
          {world.image && (
            <div className="sm:w-[62%] relative overflow-hidden max-sm:order-1">
              <Image
                src={world.image}
                alt={world.imageAlt || world.title}
                width={world.imageWidth || 1200}
                height={world.imageHeight || 800}
                sizes="(max-width: 640px) 100vw, 62vw"
                className="w-full h-auto block transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />

              {/* Seam gradient — fades image into the dark text side */}
              <div
                className="absolute inset-0 max-sm:hidden"
                style={{ background: seamGradient }}
              />

              {/* Mobile: subtle bottom fade into text below */}
              <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-transparent via-transparent via-70% to-void" />
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
}
