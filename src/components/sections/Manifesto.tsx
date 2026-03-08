"use client";

import { SECTIONS } from "@/lib/constants";
import { MANIFESTO_QUOTE, MANIFESTO_BODY } from "@/data/manifesto";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Manifesto() {
  return (
    <SectionWrapper id={SECTIONS.manifesto} className="py-32 sm:py-40">
      <div className="max-w-3xl">
        <AnimatedText
          text={MANIFESTO_QUOTE}
          className="font-display text-2xl leading-relaxed sm:text-3xl lg:text-4xl"
        />

        <div className="mt-16 border-l-2 border-gold pl-6">
          <p className="text-base leading-relaxed text-smoke sm:text-lg">
            {MANIFESTO_BODY}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
