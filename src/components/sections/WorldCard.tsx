"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";
import type { World } from "@/data/worlds";

type Corner = "bottom-left" | "bottom-right" | "top-left" | "top-right";

/* Diagonal gradient — dark only in the text corner, rest is pure image */
const GRADIENT: Record<Corner, string> = {
  "bottom-left":
    "linear-gradient(to top right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.4) 28%, transparent 52%)",
  "bottom-right":
    "linear-gradient(to top left, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.4) 28%, transparent 52%)",
  "top-left":
    "linear-gradient(to bottom right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.4) 28%, transparent 52%)",
  "top-right":
    "linear-gradient(to bottom left, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.4) 28%, transparent 52%)",
};

/* Flex alignment to push content into the correct corner */
const FLEX_POS: Record<Corner, string> = {
  "bottom-left": "sm:items-end sm:justify-start",
  "bottom-right": "sm:items-end sm:justify-end",
  "top-left": "sm:items-start sm:justify-start",
  "top-right": "sm:items-start sm:justify-end",
};

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

  return (
    <m.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: "easeOut" }}
    >
      <div
        onClick={() => router.push(`/worlds/${world.id}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-ash/40 transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)]"
      >
        {/* Full-bleed image */}
        {world.image && (
          <div className="absolute inset-0">
            <Image
              src={world.image}
              alt={world.imageAlt || world.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: world.imagePosition || "center center" }}
            />
          </div>
        )}

        {/* Corner gradient — desktop */}
        <div
          className="absolute inset-0 max-sm:hidden"
          style={{ background: GRADIENT[corner] }}
        />
        {/* Mobile: bottom gradient always */}
        <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-void/90 via-void/45 via-50% to-transparent" />

        {/* Content — pushed into the specified corner */}
        <div
          className={`relative z-[2] flex min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] ${FLEX_POS[corner]} max-sm:items-end`}
        >
          <div
            className={`p-5 sm:p-6 lg:p-8 sm:w-[42%] ${
              isRight ? "sm:text-right" : "sm:text-left"
            } max-sm:text-center max-sm:w-full`}
          >
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
      </div>
    </m.div>
  );
}
