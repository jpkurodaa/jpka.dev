"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { TIMELINE } from "@/data/timeline";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Timeline() {
  return (
    <SectionWrapper id={SECTIONS.timeline} className="py-20 sm:py-28">
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        The Path
      </h2>
      <p className="mt-4 max-w-xl text-smoke">
        Not a résumé — a sequence of pivots, each one sharpening the next.
      </p>

      <div className="relative mt-16">
        {/* Gold line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2 sm:-translate-x-px" />

        <div className="space-y-12">
          {TIMELINE.map((event, i) => (
            <div key={event.year} className="relative">
              {/* Node — outside animated div so it always sits on the gold line */}
              <m.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute top-1 left-4 h-3 w-3 rounded-full border-2 border-gold bg-void sm:left-1/2 sm:-translate-x-1/2 z-10"
              />

              <m.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span className="text-sm font-bold tracking-wider text-gold">
                  {event.year}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-bone">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  {event.description}
                </p>

                {event.image && (
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={event.image}
                      alt={event.imageAlt || event.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
                  </div>
                )}
              </m.div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
