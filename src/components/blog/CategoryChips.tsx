import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { withCategory } from "./search";
import type { BlogCategory } from "@/content/blog";

/**
 * Category filter above the post list. Mirrors the sidebar's category list — both write
 * the same `?category=` param, so whichever the reader uses, the other reflects it.
 *
 * Scrolls horizontally on narrow screens rather than wrapping to three ragged rows.
 */
export function CategoryChips({
  categories,
  active,
}: {
  categories: BlogCategory[];
  active?: string | undefined;
}) {
  /* inline-flex, not the anchor's default inline: an inline box's vertical padding paints
     but does not add to its parent's height, so the row measured 28px around a 34px pill
     and sliced the tops off. */
  const chip =
    "inline-flex shrink-0 items-center rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors";

  return (
    <nav aria-label="Filter articles by category">
      {/* overflow-x:auto forces overflow-y to auto too, so the row clips its own pills
          vertically. p-1 opens room for the full pill height (and any focus ring) inside
          the scroll box; -m-1 pulls that padding back out so the row still lines up with
          the cards below it. */}
      <ul className="-m-1 flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li>
          <Link
            to="/blogs/"
            search={(prev) => withCategory(prev)}
            /* exact, because search matching is partial by default: the All chip's empty
               search is a subset of every filtered URL, so without this it stays active
               alongside the selected category and two chips announce aria-current at once. */
            activeOptions={{ exact: true }}
            {...(active ? {} : { "aria-current": "true" as const })}
            className={cn(
              chip,
              active
                ? "border-line bg-white text-plum-900 hover:border-pink-300 hover:text-pink-700"
                : "border-pink-600 bg-pink-600 text-paper",
            )}
          >
            All
          </Link>
        </li>
        {categories.map((category) => {
          const isActive = active === category.slug;
          return (
            <li key={category.slug}>
              <Link
                to="/blogs/"
                search={(prev) => withCategory(prev, category.slug)}
                activeOptions={{ exact: true }}
                {...(isActive ? { "aria-current": "true" as const } : {})}
                className={cn(
                  chip,
                  isActive
                    ? "border-pink-600 bg-pink-600 text-paper"
                    : "border-line bg-white text-plum-900 hover:border-pink-300 hover:text-pink-700",
                )}
              >
                {category.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
