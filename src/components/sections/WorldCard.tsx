"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { m } from "framer-motion";
import type { World } from "@/data/worlds";

type Corner = "bottom-left" | "bottom-right" | "top-left" | "top-right";

/* Very wide, very subtle diagonal gradient — covers ~55% of image softly */
const GRADIENT: Record<Corner, string> = {
  "bottom-left":
    "linear-gradient(to top right, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.38) 18%, rgba(10,10,10,0.12) 36%, rgba(10,10,10,0.03) 50%, transparent 62%)",
  "bottom-right":
    "linear-gradient(to top left, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.38) 18%, rgba(10,10,10,0.12) 36%, rgba(10,10,10,0.03) 50%, transparent 62%)",
  "top-left":
    "linear-gradient(to bottom right, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.38) 18%, rgba(10,10,10,0.12) 36%, rgba(10,10,10,0.03) 50%, transparent 62%)",
  "top-right":
    "linear-gradient(to bottom left, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.38) 18%, rgba(10,10,10,0.12) 36%, rgba(10,10,10,0.03) 50%, transparent 62%)",
};

/* Text position within the card */
const FLEX_POS: Record<Corner, string> = {
  "bottom-left": "items-end justify-start",
  "bottom-right": "items-end justify-end",
  "top-left": "items-start justify-start",
  "top-right": "items-start justify-end",
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
      className="break-inside-avoid mb-5 sm:mb-6"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        onClick={() => router.push(`/worlds/${world.id}`)}
        className="group relative cursor-pointer overflow-hidden rounded-lg border border-ash/40 transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)]"
      >
        {/* Full image — natural ratio, zero cropping */}
        {world.image && (
          <Image
            src={world.image}
            alt={world.imageAlt || world.title}
            width={world.imageWidth || 1200}
            height={world.imageHeight || 800}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="w-full h-auto block transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Subtle wide diagonal gradient */}
        <div
          className="absolute inset-0"
          style={{ background: GRADIENT[corner] }}
        />

        {/* Text floating over image */}
        <div
          className={`absolute inset-0 flex ${FLEX_POS[corner]} p-3.5 sm:p-4 lg:p-5`}
        >
          <div
            className={`max-w-[70%] sm:max-w-[60%] ${
              isRight ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 ${
                isRight ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className="text-sm sm:text-base"
                role="img"
                aria-label={world.title}
              >
                {world.icon}
              </span>
              <h3 className="font-display text-sm sm:text-base lg:text-lg font-bold tracking-wider text-bone">
                {world.title}
              </h3>
            </div>

            <div
              className={`mt-1.5 h-px w-5 bg-gold/30 ${
                isRight ? "ml-auto" : ""
              }`}
            />

            <p className="mt-1 text-[10px] sm:text-xs font-medium text-gold">
              {world.subtitle}
            </p>

            <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-smoke">
              {world.description}
            </p>

            <p className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-gold/40 transition-colors duration-300 group-hover:text-gold">
              Explore &rarr;
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
}
