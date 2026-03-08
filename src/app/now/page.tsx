import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { NowItem } from "@/lib/supabase/types";
import VideoEasterEgg from "./VideoEasterEgg";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Now",
  description: "What JP Kuroda is focused on right now.",
};

const CATEGORY_LABELS: Record<string, string> = {
  building: "Building",
  reading: "Reading",
  playing: "Playing",
  thinking: "Thinking About",
};

export default async function NowPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("now_items")
    .select("category, content, sort_order")
    .eq("active", true)
    .order("sort_order")
    .returns<Pick<NowItem, "category" | "content" | "sort_order">[]>();

  const grouped: Record<string, string[]> = {};
  if (items) {
    for (const item of items) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.content);
    }
  }

  const categories = Object.keys(grouped);

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-gold"
      >
        &larr; Back
      </Link>

      <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl">Now</h1>
      <p className="mt-4 text-sm text-smoke">
        What I&apos;m focused on right now.
      </p>
      <p className="mt-2 text-sm text-smoke/60">
        Inspired by{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-4 hover:no-underline"
        >
          nownownow.com
        </a>
      </p>

      <div className="mt-16 space-y-12">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat}>
              <h2 className="font-display text-xl font-bold text-gold">
                {CATEGORY_LABELS[cat] || cat}
              </h2>
              <ul className="mt-4 space-y-3">
                {grouped[cat].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-smoke"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-smoke">Loading...</p>
        )}
      </div>

      {/* Easter egg */}
      <VideoEasterEgg />
    </main>
  );
}
