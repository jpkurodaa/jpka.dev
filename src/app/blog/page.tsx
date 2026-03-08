import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on business, technology, philosophy, and building.",
};

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .returns<
      Pick<Post, "id" | "title" | "slug" | "excerpt" | "cover_image" | "created_at">[]
    >();

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-gold"
      >
        &larr; Back
      </Link>

      <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl">
        Blog
      </h1>
      <p className="mt-4 text-sm text-smoke">
        Thoughts on business, technology, philosophy, and building.
      </p>

      <div className="mt-16 space-y-12">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.cover_image && (
                  <div className="relative mb-4 aspect-[2/1] overflow-hidden rounded-lg">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 672px) 100vw, 672px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
                  </div>
                )}
                <time className="text-xs text-smoke">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-smoke">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          ))
        ) : (
          <p className="text-smoke">Coming soon.</p>
        )}
      </div>
    </main>
  );
}
