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
  imagePosition?: string;
  textAlign?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  longDescription: string;
  media: MediaItem[];
}

const STORAGE_URL =
  "https://moizuchvvckkbvvibems.supabase.co/storage/v1/object/public/media";

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
    imagePosition: "center 30%",
    textAlign: "bottom-left",
    longDescription:
      "Kuroda is a 70-year-old family business — 60+ locations across northern Mexico, thousands of products, and the kind of operational complexity that breaks most digital transformations. When I took over as Director of Kuroda Online, the e-commerce channel existed but wasn't thriving. I learned Adobe Commerce from zero, rebuilt integrations with SAP HANA, restructured the team, and grew digital revenue 300% year over year. The real product isn't the website — it's the omnichannel experience that lets a plumber in Hermosillo get what they need, however they need it.",
    media: [
      {
        type: "image",
        src: "/images/jp-kuroda-crowd.jpg",
        alt: "JP Kuroda selfie with the full Kuroda team",
        caption:
          "The whole Kuroda family — 100+ people building something that's been alive for 70 years.",
      },
      {
        type: "image",
        src: "/images/jp-profile.jpg",
        alt: "JP Kuroda at Kuroda headquarters",
        caption:
          "At Kuroda HQ in Hermosillo — where decades of plumbing expertise meet digital commerce.",
      },
      {
        type: "image",
        src: "/images/jp-kuroda-site.jpg",
        alt: "kuroda.com e-commerce platform on screen",
        caption:
          "kuroda.com — the digital channel I direct. Adobe Commerce, SAP HANA, and a lot of lessons learned the hard way.",
      },
      {
        type: "image",
        src: "/images/jp-salesforce.jpg",
        alt: "JP Kuroda at a tech conference with Salesforce mascot",
        caption:
          "At a tech expo — always looking for the next integration, the next tool, the next edge.",
      },
      {
        type: "image",
        src: "/images/jp-corporate-team.jpg",
        alt: "JP Kuroda with the corporate team at a retreat",
        caption:
          "Corporate retreat with the leadership team. Strategy is a team sport.",
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
    imagePosition: "30% 30%",
    textAlign: "bottom-right",
    longDescription:
      "I believe the most important skill in business isn't technical — it's the ability to communicate a complex idea simply. Whether I'm on stage at AMMJE, presenting strategy to the board, or explaining Adobe Commerce architecture to the dev team, the challenge is the same: make the invisible visible. Speaking isn't performance — it's translation. Taking what lives in your head and making it live in someone else's.",
    media: [
      {
        type: "video",
        src: `${STORAGE_URL}/jp-speech-1.mp4`,
        alt: "JP Kuroda speaking on stage",
        caption:
          "On stage — where complex ideas get compressed into moments of clarity.",
      },
      {
        type: "video",
        src: `${STORAGE_URL}/jp-speech-2.mp4`,
        alt: "JP Kuroda delivering a presentation",
        caption:
          "Every talk is a chance to make the invisible visible. Language as a tool for change.",
      },
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
          "Turning months of learning into minutes of clarity.",
      },
      {
        type: "image",
        src: "/images/jp-radio-studio.jpg",
        alt: "JP Kuroda at W Radio studio",
        caption:
          "At W Radio — bringing business stories to a different kind of audience.",
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
    imagePosition: "center 20%",
    textAlign: "top-left",
    longDescription:
      "The best business decisions I've made didn't come from spreadsheets — they came from questioning the assumptions behind the spreadsheet. I read voraciously: philosophy, strategy, psychology, spirituality. I've sat in ayahuasca ceremonies in the jungle and boardrooms in Monterrey, and the questions are surprisingly similar: What's real? What matters? What are we actually building here? Thinking isn't separate from doing — it's the foundation that makes doing meaningful.",
    media: [
      {
        type: "image",
        src: "/images/jp-mountain-summit.jpg",
        alt: "JP Kuroda standing on a mountain summit",
        caption:
          "On top of the world — some perspectives only come from climbing.",
      },
      {
        type: "image",
        src: "/images/jp-ayahuasca.jpg",
        alt: "JP Kuroda at a spiritual retreat",
        caption:
          "In the jungle — some questions can only be asked far from the noise of everyday life.",
      },
      {
        type: "image",
        src: "/images/jp-hobbiton-bridge.jpg",
        alt: "JP Kuroda on a bridge in a lush green landscape",
        caption:
          "New Zealand — walking through stories. The best ideas come from wandering.",
      },
      {
        type: "image",
        src: "/images/jp-waterfall.jpg",
        alt: "JP Kuroda at a waterfall in nature",
        caption:
          "Standing before forces bigger than yourself. A good reminder of scale.",
      },
      {
        type: "image",
        src: "/images/jp-sikh-temple.jpg",
        alt: "JP Kuroda visiting a Sikh temple",
        caption:
          "At a Gurdwara — exploring faith traditions far from home. Every culture holds a piece of the answer.",
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
    imagePosition: "30% 55%",
    textAlign: "top-right",
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
        src: "/images/jp-immersive-cosmos.jpg",
        alt: "JP Kuroda surrounded by cosmic projections in an immersive installation",
        caption:
          "Surrounded by the cosmos — digital art that makes you feel infinitely small and completely alive.",
      },
      {
        type: "image",
        src: "/images/jp-theater-bw.jpg",
        alt: "JP Kuroda performing on a theater stage in black and white",
        caption:
          "On stage in a theater production. The unedited, the unrepeatable — art that only exists in the moment.",
      },
      {
        type: "image",
        src: "/images/jp-teatro.jpg",
        alt: "JP Kuroda at the theater",
        caption:
          "Theater, live performance, the raw. A counterweight to the digital world.",
      },
      {
        type: "image",
        src: "/images/jp-artist-portrait.jpg",
        alt: "Artistic portrait of JP Kuroda",
        caption:
          "A portrait that captures more than a headshot ever could.",
      },
    ],
  },
];
