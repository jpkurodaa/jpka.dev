"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import type { NowItem } from "@/lib/supabase/types";
import SectionWrapper from "@/components/ui/SectionWrapper";

const FALLBACK: Record<string, string[]> = {
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

const CATEGORY_LABELS: Record<string, string> = {
  building: "Building",
  reading: "Reading",
  playing: "Playing",
  thinking: "Thinking About",
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
  const [data, setData] = useState<Record<string, string[]>>(FALLBACK);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("now_items")
      .select("category, content, sort_order")
      .eq("active", true)
      .order("sort_order")
      .returns<Pick<NowItem, "category" | "content" | "sort_order">[]>()
      .then(({ data: items }) => {
        if (items && items.length > 0) {
          const grouped: Record<string, string[]> = {};
          for (const item of items) {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push(item.content);
          }
          setData(grouped);
        }
      });
  }, []);

  const categories = Object.keys(data);

  return (
    <SectionWrapper id={SECTIONS.now} className="py-32 sm:py-40">
      <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        Now
      </h2>
      <p className="mt-4 max-w-xl text-smoke">
        What I&apos;m focused on right now.{" "}
        <a
          href="/now"
          className="text-gold underline underline-offset-4 hover:no-underline"
        >
          Full /now page &rarr;
        </a>
      </p>

      <div className="mt-16 grid gap-12 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <NowColumn
            key={cat}
            title={CATEGORY_LABELS[cat] || cat}
            items={data[cat]}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
