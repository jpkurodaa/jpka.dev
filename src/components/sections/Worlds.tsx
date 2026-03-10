"use client";

import { SECTIONS } from "@/lib/constants";
import { WORLDS } from "@/data/worlds";
import SectionWrapper from "@/components/ui/SectionWrapper";
import WorldCard from "@/components/sections/WorldCard";

export default function Worlds() {
  return (
    <SectionWrapper id={SECTIONS.worlds} className="py-20 sm:py-28">
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        Worlds I Inhabit
      </h2>
      <p className="mt-4 max-w-xl text-smoke">
        Not a portfolio of projects — a map of territories. Each world feeds the
        others.
      </p>

      <div className="mt-16 grid gap-8">
        {WORLDS.map((world, i) => (
          <WorldCard key={world.id} world={world} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
