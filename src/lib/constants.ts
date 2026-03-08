export const SECTIONS = {
  hero: "hero",
  manifesto: "manifesto",
  worlds: "worlds",
  timeline: "timeline",
  now: "now",
  connect: "connect",
} as const;

export const NAV_ITEMS = [
  { id: SECTIONS.manifesto, label: "Manifesto" },
  { id: SECTIONS.worlds, label: "Worlds" },
  { id: SECTIONS.timeline, label: "Timeline" },
  { id: SECTIONS.now, label: "Now" },
  { id: SECTIONS.connect, label: "Connect" },
] as const;

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/jpkuroda",
  github: "https://github.com/jpkuroda",
  twitter: "https://x.com/jpkuroda",
  email: "mailto:jp@jpka.dev",
} as const;

export const SITE = {
  name: "JP Kuroda",
  url: "https://jpka.dev",
  description:
    "Speaker. Artist. Builder. Philosopher. Building at the intersection of business, technology, and human experience.",
  ogImage: "/og.png",
} as const;
