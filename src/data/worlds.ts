export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  caption: string;
}

export interface World {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  image?: string;
  imageAlt?: string;
  longDescription: string;
  media: MediaItem[];
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
    longDescription:
      "Kuroda is a 70-year-old family business — 60+ locations across northern Mexico, thousands of products, and the kind of operational complexity that breaks most digital transformations. When I took over as Director of Kuroda Online, the e-commerce channel existed but wasn't thriving. I learned Adobe Commerce from zero, rebuilt integrations with SAP HANA, restructured the team, and grew digital revenue 300% year over year. The real product isn't the website — it's the omnichannel experience that lets a plumber in Hermosillo get what they need, however they need it.",
    media: [
      {
        type: "image",
        src: "/images/jp-profile.jpg",
        alt: "JP Kuroda at Kuroda headquarters",
        caption:
          "At Kuroda HQ in Hermosillo — where 70 years of plumbing expertise meets digital commerce.",
      },
      {
        type: "image",
        src: "/images/kuroda-team.jpg",
        alt: "JP Kuroda with the Kuroda team",
        caption:
          "The team that makes it happen. Building an omnichannel operation is a team sport.",
      },
      {
        type: "image",
        src: "/images/interceramic.jpg",
        alt: "JP Kuroda with the Interceramic team",
        caption:
          "Before Kuroda Online — running an Interceramic franchise and learning retail from the inside.",
      },
    ],
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
    longDescription:
      "I believe the most important skill in business isn't technical — it's the ability to communicate a complex idea simply. Whether I'm on stage at AMMJE, presenting strategy to the board, or explaining Adobe Commerce architecture to the dev team, the challenge is the same: make the invisible visible. Speaking isn't performance — it's translation. Taking what lives in your head and making it live in someone else's.",
    media: [
      {
        type: "image",
        src: "/images/jp-ammje.jpg",
        alt: "JP Kuroda speaking at AMMJE conference",
        caption:
          "Speaking at AMMJE — the Mexican Association of Women Entrepreneurs. Sharing our digital transformation story.",
      },
      {
        type: "image",
        src: "/images/jp-speaking.jpg",
        alt: "JP Kuroda presenting on stage",
        caption:
          "Every talk is a chance to compress months of learning into minutes of clarity.",
      },
    ],
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
    longDescription:
      "The best business decisions I've made didn't come from spreadsheets — they came from questioning the assumptions behind the spreadsheet. I read voraciously: philosophy, strategy, psychology, spirituality. I've sat in ayahuasca ceremonies in the jungle and boardrooms in Monterrey, and the questions are surprisingly similar: What's real? What matters? What are we actually building here? Thinking isn't separate from doing — it's the foundation that makes doing meaningful.",
    media: [
      {
        type: "image",
        src: "/images/jp-ayahuasca.jpg",
        alt: "JP Kuroda at a spiritual retreat",
        caption:
          "In the jungle — some questions can only be asked far from the noise of everyday life.",
      },
      {
        type: "image",
        src: "/images/jp-bridge.jpg",
        alt: "JP Kuroda on a bridge, contemplative",
        caption:
          "Between worlds. The best ideas come from the spaces in between.",
      },
    ],
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
    longDescription:
      "Art is my counterweight. After days of optimizing conversion funnels and debugging commerce integrations, I need something that exists purely for its own sake. I make music, explore immersive installations, go to theater, and experiment with visual art. Creativity isn't a hobby — it's the part of my brain that keeps the rest honest. The best solutions in business come from the same place as the best art: the willingness to try something that might not work.",
    media: [
      {
        type: "image",
        src: "/images/jp-art-immersive.jpg",
        alt: "JP Kuroda in an immersive art installation",
        caption:
          "Inside an immersive art installation — where technology meets raw human experience.",
      },
      {
        type: "image",
        src: "/images/jp-teatro.jpg",
        alt: "JP Kuroda at the theater",
        caption:
          "Theater, live performance, the unedited. Art that only exists in the moment.",
      },
      {
        type: "image",
        src: "/images/jp-portrait-artistic.jpg",
        alt: "Artistic portrait of JP Kuroda",
        caption:
          "Self-expression through visual art — a portrait that captures more than a headshot ever could.",
      },
    ],
  },
];
