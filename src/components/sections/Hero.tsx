"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import RotatingSubtitle, { ROLES } from "@/components/ui/RotatingSubtitle";
import { SECTIONS } from "@/lib/constants";

const ParticleField = dynamic(
  () => import("@/components/ui/ParticleField"),
  { ssr: false }
);

const ROLE_IMAGES: Record<string, string> = {
  Speaker: "/images/jp-ammje.jpg",
  Artist: "/images/jp-art-immersive.jpg",
  Builder: "/images/jp-profile.jpg",
  Philosopher: "/images/jp-ayahuasca.jpg",
};

const INTERVAL = 2000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      INTERVAL
    );
    return () => clearInterval(timer);
  }, []);

  const currentRole = ROLES[index];

  return (
    <section
      id={SECTIONS.hero}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* Crossfading background images */}
      <AnimatePresence mode="popLayout">
        <m.div
          key={currentRole}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={ROLE_IMAGES[currentRole]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--void)_80%)]" />
          <div className="absolute inset-0 bg-void/40" />
        </m.div>
      </AnimatePresence>

      <ParticleField />

      <div className="relative z-10 text-center">
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          JP Kuroda
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 font-display text-xl sm:text-2xl lg:text-3xl text-smoke"
        >
          <RotatingSubtitle index={index} />
        </m.p>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-smoke">
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="text-gold"
          >
            <path
              d="M7.293 23.707a1 1 0 001.414 0l6.364-6.364a1 1 0 00-1.414-1.414L8 21.586l-5.657-5.657A1 1 0 00.93 17.343l6.364 6.364zM7 0v23h2V0H7z"
              fill="currentColor"
            />
          </svg>
        </m.div>
      </m.div>
    </section>
  );
}
