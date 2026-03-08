export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  published: boolean;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface NowItem {
  id: string;
  category: "building" | "reading" | "playing" | "thinking";
  content: string;
  sort_order: number;
  active: boolean;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  world: "build" | "speak" | "think" | "create";
  featured: boolean;
  created_at: string;
}
