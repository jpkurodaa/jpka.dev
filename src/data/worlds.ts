export interface World {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image?: string;
  imageAlt?: string;
}

export const WORLDS: World[] = [
  {
    id: "build",
    title: "BUILD",
    subtitle: "Commerce & Technology",
    description:
      "Leading Kuroda's digital transformation. E-commerce, supply chains, and the systems that move physical goods through digital channels.",
    icon: "⚡",
    image: "/images/jp-profile.jpg",
    imageAlt: "JP Kuroda at Kuroda headquarters",
  },
  {
    id: "speak",
    title: "SPEAK",
    subtitle: "Ideas & Communication",
    description:
      "Turning complex ideas into clear stories. From boardroom strategy to public talks — language as a tool for change.",
    icon: "🎙",
    image: "/images/jp-ammje.jpg",
    imageAlt: "JP Kuroda speaking at AMMJE conference",
  },
  {
    id: "think",
    title: "THINK",
    subtitle: "Philosophy & Strategy",
    description:
      "Reading, writing, and questioning everything. Where business strategy meets existential inquiry and first-principles thinking.",
    icon: "🧠",
    image: "/images/jp-ayahuasca.jpg",
    imageAlt: "JP Kuroda at a spiritual retreat in the jungle",
  },
  {
    id: "create",
    title: "CREATE",
    subtitle: "Art & Expression",
    description:
      "Music, visual art, and creative experiments. The counterweight to analytical thinking — making things that exist for their own sake.",
    icon: "🎨",
    image: "/images/jp-art-immersive.jpg",
    imageAlt: "JP Kuroda in an immersive art experience",
  },
];
