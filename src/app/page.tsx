import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Worlds from "@/components/sections/Worlds";
import Timeline from "@/components/sections/Timeline";
import Now from "@/components/sections/Now";
import Connect from "@/components/sections/Connect";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import type { NowItem } from "@/lib/supabase/types";

export const revalidate = 3600;

const FALLBACK_NOW: Record<string, string[]> = {
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

async function getNowData(): Promise<Record<string, string[]>> {
  try {
    const supabase = await createClient();
    const { data: items } = await supabase
      .from("now_items")
      .select("category, content, sort_order")
      .eq("active", true)
      .order("sort_order")
      .returns<Pick<NowItem, "category" | "content" | "sort_order">[]>();

    if (!items || items.length === 0) return FALLBACK_NOW;

    const grouped: Record<string, string[]> = {};
    for (const item of items) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item.content);
    }
    return grouped;
  } catch {
    return FALLBACK_NOW;
  }
}

export default async function Home() {
  const nowData = await getNowData();

  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <Manifesto />
        <Worlds />
        <Timeline />
        <Now data={nowData} />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
