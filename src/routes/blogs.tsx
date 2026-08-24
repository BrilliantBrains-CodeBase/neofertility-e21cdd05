import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/sections/blocks";
import { PostCard } from "@/components/blog/PostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { CategoryChips } from "@/components/blog/CategoryChips";
import { parseBlogSearch } from "@/components/blog/search";
import { POSTS, CATEGORIES, categorySlug, matchesQuery, postPath } from "@/content/blog";
import { ROUTES } from "@/data/navigation";
import { breadcrumbSchema, itemListSchema, jsonLd, pageMeta } from "@/lib/seo";

const PATH = ROUTES.blogs;

export const Route = createFileRoute("/blogs")({
  /* Filters live in the URL, not component state, so a filtered view is shareable and
     back/forward moves through it. */
  validateSearch: parseBlogSearch,
  head: () => ({
    ...pageMeta({
      title: "Fertility & Gynecology Blog | Neo Fertility Clinic",
      description:
        "Articles from Neo Fertility Clinic, Marathahalli, Bangalore on fertility treatment, IVF and male infertility, written for patients.",
      path: PATH,
    }),
    scripts: [
      jsonLd(
        itemListSchema({
          path: PATH,
          title: "Fertility & Gynecology Blog",
          items: POSTS.map((post) => ({ name: post.title, path: postPath(post.slug) })),
        }),
      ),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", path: ROUTES.home },
          { name: "Blogs", path: PATH },
        ]),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  const { category, q } = Route.useSearch();

  /* matchesQuery is shared with the search dropdown so the suggestions and the list
     below can never disagree about what a term matches. */
  const posts = POSTS.filter(
    (post) =>
      (!category || categorySlug(post.category) === category) && matchesQuery(post, q ?? ""),
  );

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Fertility & gynecology articles"
        intro="Plain-language guides from Dr. Payal Mahapatra and the Neo Fertility Clinic team, to help you understand your options."
        trail={[{ name: "Home", to: ROUTES.home }, { name: "Blogs" }]}
      />

      <div className="container-page py-14 lg:py-16">
        {/* Sidebar drops below the list under lg rather than squeezing into a second column. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div>
            <CategoryChips categories={CATEGORIES} active={category} />

            {posts.length > 0 ? (
              /* One card per row, matching the reference — the cards are image-led and a
                 two-up grid would halve the covers. */
              <div className="mt-8 space-y-8">
                {posts.map((post, index) => (
                  <PostCard key={post.slug} post={post} eager={index === 0} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-line bg-white p-10 text-center">
                <p className="text-[1.0625rem] font-medium text-plum-900">
                  No articles match your filters.
                </p>
                <p className="mt-2 text-[0.9375rem] text-ink-muted">
                  Try a different category, or clear what you have selected.
                </p>
                <Link
                  to="/blogs/"
                  search={{}}
                  className="mt-5 inline-flex items-center rounded-full bg-pink-600 px-5 py-2.5 text-[0.875rem] font-medium text-paper transition-colors hover:bg-pink-700"
                >
                  Show all articles
                </Link>
              </div>
            )}
          </div>

          <BlogSidebar
            categories={CATEGORIES}
            recent={POSTS.slice(0, 3)}
            activeCategory={category}
            query={q ?? ""}
            filtersList
          />
        </div>
      </div>
    </>
  );
}
