import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORLDS } from "@/data/worlds";
import WorldDetail from "./WorldDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WORLDS.map((w) => ({ slug: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const world = WORLDS.find((w) => w.id === slug);
  if (!world) return {};
  return {
    title: `${world.title} — ${world.subtitle}`,
    description: world.description,
  };
}

export default async function WorldPage({ params }: Props) {
  const { slug } = await params;
  const world = WORLDS.find((w) => w.id === slug);
  if (!world) notFound();

  return <WorldDetail world={world} />;
}
