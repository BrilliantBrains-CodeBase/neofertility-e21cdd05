import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/content/blog";

/**
 * The end-of-article hand-off. One post, not a related grid: with three articles a grid
 * would show the reader everything they have already seen.
 */
export function NextPost({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/$slug/"
      params={{ slug: post.slug }}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all hover:border-pink-600 hover:shadow-rail sm:gap-5 sm:p-5"
    >
      <img
        src={post.cover.src}
        alt=""
        width={post.cover.width}
        height={post.cover.height}
        loading="lazy"
        className="size-20 shrink-0 rounded-xl object-cover sm:size-24"
      />
      <span className="min-w-0">
        <span className="eyebrow flex items-center gap-1.5">
          Next post
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="mt-2 block text-[1.0625rem] leading-snug font-semibold text-plum-900 transition-colors group-hover:text-pink-700">
          {post.title}
        </span>
        <span className="mt-1.5 block text-[0.875rem] font-medium text-pink-700">Read more</span>
      </span>
    </Link>
  );
}
