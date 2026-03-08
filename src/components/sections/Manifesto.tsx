"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { MANIFESTO_QUOTE, MANIFESTO_BODY } from "@/data/manifesto";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Manifesto() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <SectionWrapper id={SECTIONS.manifesto} className="py-20 sm:py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="max-w-xl">
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

        {/* Photo with parallax */}
        <div
          ref={imageRef}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <m.div style={{ y }} className="absolute inset-[-20%]">
            <Image
              src="/images/jp-speaking.jpg"
              alt="JP Kuroda speaking at Kuroda Business Forum"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </m.div>
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
        </div>
      </div>
    </SectionWrapper>
  );
}
