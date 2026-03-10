"use client";

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
  const router = useRouter();
  const align = world.textAlign || "center";

  return (
    <m.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: "easeOut" }}
    >
      <div
        onClick={() => router.push(`/worlds/${world.id}`)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ash/50 transition-[border-color,box-shadow] duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
      >
        {/* Full-bleed background image */}
        {world.image && (
          <div className="absolute inset-0">
            <Image
              src={world.image}
              alt={world.imageAlt || world.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1100px"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              style={{ objectPosition: world.imagePosition || "center center" }}
            />
          </div>
        )}

        {/* Gradient overlay — adapts to text alignment */}
        {/* Desktop gradients */}
        {align === "right" && (
          <div className="absolute inset-0 max-sm:hidden bg-gradient-to-l from-void/95 via-void/55 via-50% to-transparent" />
        )}
        {align === "left" && (
          <div className="absolute inset-0 max-sm:hidden bg-gradient-to-r from-void/95 via-void/55 via-50% to-transparent" />
        )}
        {align === "center" && (
          <div className="absolute inset-0 max-sm:hidden bg-gradient-to-t from-void/90 via-void/45 via-45% to-void/20" />
        )}
        {/* Mobile: always bottom gradient */}
        <div className="absolute inset-0 sm:hidden bg-gradient-to-t from-void/95 via-void/50 via-50% to-transparent" />

        {/* Content */}
        <div
          className={`relative z-[2] flex min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] items-center ${
            align === "right"
              ? "sm:justify-end"
              : align === "left"
                ? "sm:justify-start"
                : "sm:justify-center"
          } max-sm:items-end`}
        >
          <div
            className={`p-6 sm:p-8 lg:p-12 ${
              align === "right"
                ? "sm:w-[55%] sm:text-left"
                : align === "left"
                  ? "sm:w-[55%] sm:text-left"
                  : "sm:w-[65%] sm:text-center"
            } max-sm:text-center`}
          >
            <div
              className={`flex items-center gap-3 ${
                align === "center" ? "sm:justify-center" : ""
              } max-sm:justify-center`}
            >
              <span className="text-2xl lg:text-3xl" role="img" aria-label={world.title}>
                {world.icon}
              </span>
              <h3 className="font-display text-xl lg:text-3xl font-bold tracking-wider text-bone">
                {world.title}
              </h3>
            </div>

            {/* Gold separator */}
            <div
              className={`mt-3 h-px w-10 bg-gold/40 ${
                align === "center" ? "sm:mx-auto" : ""
              } max-sm:mx-auto`}
            />

            <p className="mt-3 text-sm lg:text-base font-medium text-gold">
              {world.subtitle}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-smoke lg:text-base">
              {world.description}
            </p>

            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold/50 transition-colors duration-300 group-hover:text-gold">
              Explore &rarr;
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
}
