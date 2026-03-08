"use client";

import { m } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";

const NOW_DATA = {
  building: [
    "Scaling Kuroda.com — Adobe Commerce + SAP",
    "This portfolio (jpka.dev)",
    "TikTok Shop integration for Kuroda",
  ],
  reading: [
    "The Almanack of Naval Ravikant",
    "Staff Engineer by Will Larson",
    "Meditations by Marcus Aurelius",
  ],
  playing: [
    "Learning piano",
    "Exploring generative art",
    "Being a dad to Nova",
  ],
};

function NowColumn({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <h3 className="font-display text-lg font-bold text-gold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-smoke"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
            {item}
          </li>
        ))}
      </ul>
    </m.div>
  );
}

export default function Now() {
  return (
    <SectionWrapper id={SECTIONS.now} className="py-32 sm:py-40">
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        Now
      </h2>
      <p className="mt-4 max-w-xl text-smoke">
        What I&apos;m focused on right now.{" "}
        <a href="/now" className="text-gold underline underline-offset-4 hover:no-underline">
          Full /now page →
        </a>
      </p>

      <div className="mt-16 grid gap-12 sm:grid-cols-3">
        <NowColumn title="Building" items={NOW_DATA.building} index={0} />
        <NowColumn title="Reading" items={NOW_DATA.reading} index={1} />
        <NowColumn title="Playing" items={NOW_DATA.playing} index={2} />
      </div>
    </SectionWrapper>
  );
}
