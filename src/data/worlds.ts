export interface World {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const WORLDS: World[] = [
  {
    id: "build",
    title: "BUILD",
    subtitle: "Commerce & Technology",
    description:
      "Leading Kuroda's digital transformation. E-commerce, supply chains, and the systems that move physical goods through digital channels.",
    icon: "⚡",
  },
  {
    id: "speak",
    title: "SPEAK",
    subtitle: "Ideas & Communication",
    description:
      "Turning complex ideas into clear stories. From boardroom strategy to public talks — language as a tool for change.",
    icon: "🎙",
  },
  {
    id: "think",
    title: "THINK",
    subtitle: "Philosophy & Strategy",
    description:
      "Reading, writing, and questioning everything. Where business strategy meets existential inquiry and first-principles thinking.",
    icon: "🧠",
  },
  {
    id: "create",
    title: "CREATE",
    subtitle: "Art & Expression",
    description:
      "Music, visual art, and creative experiments. The counterweight to analytical thinking — making things that exist for their own sake.",
    icon: "🎨",
  },
];
