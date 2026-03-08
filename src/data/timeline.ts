export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1992",
    title: "Culiacán, Sinaloa",
    description: "Born into a family of entrepreneurs. Third generation.",
  },
  {
    year: "2010",
    title: "First Ventures",
    description: "Early business experiments and finding my own path.",
    image: "/images/jp-kobra.jpg",
    imageAlt: "JP Kuroda at Kobra offices during early ventures",
  },
  {
    year: "2018",
    title: "Interceramic",
    description: "Family franchise — learning retail operations from the inside.",
    image: "/images/interceramic.jpg",
    imageAlt: "JP Kuroda with the Interceramic team",
  },
  {
    year: "2021",
    title: "Kuroda Online",
    description:
      "Took the helm of Kuroda's digital channel. Built the e-commerce operation from scratch.",
    image: "/images/kuroda-team.jpg",
    imageAlt: "JP Kuroda with the Kuroda team",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description:
      "Scaling Kuroda.com — SAP integrations, Adobe Commerce, omnichannel strategy.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "Building at the intersection of commerce, technology, and human experience.",
  },
];
