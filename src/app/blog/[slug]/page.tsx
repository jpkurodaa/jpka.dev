import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single<Pick<Post, "title" | "excerpt">>();

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single<Post>();

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/blog"
        className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-gold"
      >
        &larr; All Posts
      </Link>

      <article className="mt-8">
        {post.cover_image && (
          <div className="relative mb-8 aspect-[2/1] overflow-hidden rounded-xl">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="672px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/40 to-transparent" />
          </div>
        )}

        <time className="text-xs text-smoke">
          {new Date(post.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-12 max-w-none text-base leading-relaxed text-bone/90 [&>p]:mb-6">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
