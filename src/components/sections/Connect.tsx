"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { SECTIONS, SOCIAL_LINKS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";

const QUOTES = [
  "The best way to predict the future is to build it.",
  "Ship fast. Learn faster.",
  "Legacy is not what you inherit — it's what you create.",
  "Stay curious. Stay hungry. Stay kind.",
];

const SOCIALS = [
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { name: "Instagram", href: SOCIAL_LINKS.instagram },
  { name: "GitHub", href: SOCIAL_LINKS.github },
  { name: "X / Twitter", href: SOCIAL_LINKS.twitter },
];

export default function Connect() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setQuoteIndex((i) => (i + 1) % QUOTES.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <SectionWrapper id={SECTIONS.connect} className="py-32 sm:py-40">
      <div className="text-center">
        {/* Rotating quote */}
        <div className="relative mx-auto h-[3em] max-w-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <m.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-x-0 font-display text-lg italic text-smoke sm:text-xl"
            >
              &ldquo;{QUOTES[quoteIndex]}&rdquo;
            </m.p>
          </AnimatePresence>
        </div>

        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          Let&apos;s Connect
        </m.h2>

        <m.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-smoke"
        >
          Always open to interesting conversations and collaborations.
        </m.p>

        {/* CTA */}
        <m.a
          href={SOCIAL_LINKS.email}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-block rounded-full border border-gold bg-transparent px-10 py-4 font-display text-sm font-semibold tracking-wider text-gold transition-colors hover:bg-gold hover:text-void"
        >
          SAY HELLO
        </m.a>

        {/* Social links */}
        <div className="mt-12 flex justify-center gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-smoke transition-colors hover:text-gold"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
