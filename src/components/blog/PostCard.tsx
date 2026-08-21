import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { BlogPost } from "@/content/blog";

/**
 * The listing card: cover, category chip, read time, title, two-line dek, author row.
 *
 * Shell matches the treatment cards in TreatmentGrid — same radius, hairline, lift and
 * image scale — so the blog does not read as a different site. Posts are linked through
 * the `/$slug` route with params rather than a built path string, which keeps the link
 * typed against the route tree.
 */
export function PostCard({ post, eager = false }: { post: BlogPost; eager?: boolean }) {
  return (
    <Link
      to="/$slug/"
      params={{ slug: post.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-pink-600 hover:shadow-card-lift"
    >
      <div className="overflow-hidden">
        {/* alt="" deliberately: the photo illustrates the headline directly below it and
            carries nothing the heading does not already say. */}
        <img
          src={post.cover.src}
          alt=""
          width={post.cover.width}
          height={post.cover.height}
          loading={eager ? "eager" : "lazy"}
          className="aspect-2/1 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full bg-pink-50 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.14em] text-pink-700 uppercase">
            {post.category}
          </span>
          <span className="text-[0.8125rem] text-ink-muted">{post.readMinutes} min read</span>
        </div>

        <h3 className="mt-4 text-[1.25rem] leading-[1.25] font-semibold text-plum-900 transition-colors group-hover:text-pink-700">
          {post.title}
        </h3>

        {/* Clamped to two lines, matching the reference. The full string stays in the DOM,
            so it is still announced and still indexed. */}
        <p className="mt-2.5 mb-6 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-4">
          <span className="flex min-w-0 items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt=""
              width={28}
              height={28}
              loading="lazy"
              className="size-7 shrink-0 rounded-full object-cover"
            />
            <span className="truncate text-[0.8125rem] font-medium text-plum-900">
              {post.author.name}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[0.875rem] font-medium text-pink-700">
            Read more
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Sidebar variant — thumbnail beside a clamped title. No dek, no chip, no card shell. */
export function PostCardCompact({ post }: { post: BlogPost }) {
  return (
    <Link to="/$slug/" params={{ slug: post.slug }} className="group flex items-start gap-3">
      <img
        src={post.cover.src}
        alt=""
        width={post.cover.width}
        height={post.cover.height}
        loading="lazy"
        className="size-16 shrink-0 rounded-lg object-cover"
      />
      <span className="min-w-0">
        <span className="line-clamp-2 text-[0.875rem] leading-snug font-medium text-plum-900 transition-colors group-hover:text-pink-700">
          {post.title}
        </span>
        <span className="mt-1 block text-[0.75rem] text-ink-muted">{post.author.name}</span>
      </span>
    </Link>
  );
}
