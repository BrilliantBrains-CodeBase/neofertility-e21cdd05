import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { PostCardCompact } from "./PostCard";
import { BlogSearch } from "./BlogSearch";
import { withCategory } from "./search";
import type { BlogCategory, BlogPost } from "@/content/blog";

const CARD = "rounded-2xl border border-line bg-white p-6";
const CARD_TITLE = "text-[0.9375rem] font-semibold text-plum-900";

/**
 * The reference's right rail: search, recent posts, categories with counts.
 *
 * Sticky from lg, stacked under the post list below it. Search and the category list both
 * write to the URL, so a filtered view is shareable and survives back/forward.
 */
export function BlogSidebar({
  categories,
  recent,
  activeCategory,
  query,
  filtersList = false,
}: {
  categories: BlogCategory[];
  recent: BlogPost[];
  activeCategory?: string | undefined;
  query: string;
  /** True only on /blogs/, where the box also narrows the list below it. See BlogSearch. */
  filtersList?: boolean;
}) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className={CARD}>
        <p className={CARD_TITLE}>Search</p>
        <div className="mt-3">
          <BlogSearch query={query} filtersList={filtersList} />
        </div>
      </div>

      {recent.length > 0 && (
        <div className={CARD}>
          <h2 className={CARD_TITLE}>Recent Posts</h2>
          <ul className="mt-4 space-y-4">
            {recent.map((post) => (
              <li key={post.slug}>
                <PostCardCompact post={post} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={CARD}>
        <h2 className={CARD_TITLE}>Categories</h2>
        <ul className="mt-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;
            return (
              <li key={category.slug} className="border-b border-line last:border-b-0">
                <Link
                  to="/blogs/"
                  /* Clicking the active category clears it, so the row doubles as its own
                     "off" switch — otherwise the only way back to All is the chip row. */
                  search={(prev) => withCategory(prev, isActive ? undefined : category.slug)}
                  activeOptions={{ exact: true }}
                  {...(isActive ? { "aria-current": "true" as const } : {})}
                  className={cn(
                    "flex items-center justify-between gap-3 py-2.5 text-[0.875rem] transition-colors",
                    isActive ? "font-medium text-pink-700" : "text-plum-900 hover:text-pink-700",
                  )}
                >
                  {category.label}
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full text-[0.6875rem] font-medium",
                      isActive ? "bg-pink-600 text-paper" : "bg-pink-50 text-pink-700",
                    )}
                  >
                    {category.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
