import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
  description: "What JP Kuroda is focused on right now.",
};

const NOW = {
  lastUpdated: "March 2026",
  sections: [
    {
      title: "Building",
      items: [
        "Scaling Kuroda.com on Adobe Commerce + SAP HANA",
        "This portfolio — jpka.dev",
        "TikTok Shop integration for Kuroda",
        "Internal tools and automations for the team",
      ],
    },
    {
      title: "Reading",
      items: [
        "The Almanack of Naval Ravikant",
        "Staff Engineer by Will Larson",
        "Meditations by Marcus Aurelius",
      ],
    },
    {
      title: "Playing",
      items: [
        "Learning piano",
        "Exploring generative art with code",
        "Being a dad to Nova",
      ],
    },
    {
      title: "Thinking About",
      items: [
        "How 70-year-old businesses can compete digitally",
        "The intersection of philosophy and product design",
        "Building in public vs. building in silence",
      ],
    },
  ],
};

export default function NowPage() {
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
        Last updated: {NOW.lastUpdated}
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
        {NOW.sections.map((section) => (
          <div key={section.title}>
            <h2 className="font-display text-xl font-bold text-gold">
              {section.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
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
        ))}
      </div>
    </main>
  );
}
