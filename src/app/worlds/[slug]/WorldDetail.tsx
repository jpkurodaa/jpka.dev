"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { World, MediaItem } from "@/data/worlds";

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
    >
      <div className="group overflow-hidden rounded-xl border border-ash/50 bg-ash/20 transition-colors hover:border-gold/30">
        {item.type === "image" ? (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden">
            <video
              src={item.src}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <p className="p-4 text-sm leading-relaxed text-smoke">
          {item.caption}
        </p>
      </div>
    </m.div>
  );
}

export default function WorldDetail({ world }: { world: World }) {
  return (
    <main className="min-h-svh bg-void">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        {world.image && (
          <>
            <m.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={world.image}
                alt={world.imageAlt || world.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </m.div>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void" />
            <div className="absolute inset-0 bg-void/30" />
          </>
        )}

        {/* Back link */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-6 top-8 z-20 sm:left-10"
        >
          <Link
            href="/#worlds"
            className="text-xs uppercase tracking-[0.2em] text-smoke/80 transition-colors hover:text-gold"
          >
            &larr; Back to Worlds
          </Link>
        </m.div>

        {/* Title overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-start justify-end px-6 pb-12 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-5xl">
            <m.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl"
              role="img"
              aria-label={world.title}
            >
              {world.icon}
            </m.span>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 font-display text-4xl font-bold tracking-wider text-bone sm:text-6xl"
            >
              {world.title}
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-2 text-lg font-medium text-gold sm:text-xl"
            >
              {world.subtitle}
            </m.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10 lg:px-16">
        {/* Long description */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl"
        >
          <p className="text-base leading-relaxed text-smoke sm:text-lg">
            {world.longDescription}
          </p>
        </m.div>

        {/* Divider */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-16 h-px origin-left bg-gradient-to-r from-gold/50 to-transparent"
        />

        {/* Media gallery */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {world.media.map((item, i) => (
            <MediaCard key={item.src} item={item} index={i} />
          ))}
        </div>

        {/* Bottom nav */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <Link
            href="/#worlds"
            className="rounded-full border border-gold/40 px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-void"
          >
            Back to Worlds
          </Link>
        </m.div>
      </div>
    </main>
  );
}
