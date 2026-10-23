import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs, RelatedLinks, FaqBlock } from "@/components/sections/blocks";
import { ClosingCta } from "@/components/conversion/ClosingCta";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { ShareArticle } from "@/components/blog/ShareArticle";
import { NextPost } from "@/components/blog/NextPost";
import { CATEGORIES, getPost, getNextPost, getOtherPosts, postPath } from "@/content/blog";
import { ROUTES } from "@/data/navigation";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  absoluteAsset,
} from "@/lib/seo";

/**
 * Blog article template.
 *
 * A root-level catch-all by necessity: the published articles sit at frozen root slugs
 * that hold search rankings, so they cannot move under /blog/. TanStack ranks static
 * segments above dynamic ones, so every other route still wins; anything reaching here
 * that is not a post 404s as before.
 */
export const Route = createFileRoute("/$slug")({
  /* Validates only — it deliberately returns nothing. Loader data is dehydrated into the
     SSR payload, and a post carries its `Body` component, which cannot be serialised. */
  loader: ({ params }) => {
    if (!getPost(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) return {};

    const path = postPath(post.slug);
    /* The cover doubles as the share card. Its real intrinsic size travels with it so
       og:image:width/height describe the file rather than guessing 1200x630. */
    const image = {
      src: post.cover.ogSrc ?? post.cover.src,
      width: post.cover.width,
      height: post.cover.height,
      alt: post.cover.alt,
    };

    return {
      ...pageMeta({
        title: post.metaTitle,
        description: post.metaDescription,
        path,
        image,
        type: "article",
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: "Home", path: ROUTES.home },
            { name: "Blogs", path: ROUTES.blogs },
            { name: post.title, path },
          ]),
        ),
        jsonLd(
          articleSchema({
            title: post.title,
            description: post.metaDescription,
            path,
            image: absoluteAsset(post.cover.ogSrc ?? post.cover.src),
            author: post.author.name,
          }),
        ),
        ...(post.faqs?.length ? [jsonLd(faqSchema(post.faqs))] : []),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  if (!post) throw notFound();

  const { Body } = post;
  const next = getNextPost(post);

  return (
    <>
      <div className="container-page py-10 lg:py-14">
        {/* Sidebar leads on desktop and trails on mobile: the article is what the reader
            came for, so it must not sit under three widgets on a phone. */}
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
          <div className="order-2 lg:order-1">
            <BlogSidebar categories={CATEGORIES} recent={getOtherPosts(post)} query="" />
          </div>

          <article className="order-1 lg:order-2">
            <Breadcrumbs
              trail={[
                { name: "Home", to: ROUTES.home },
                { name: "Blogs", to: ROUTES.blogs },
                { name: post.title },
              ]}
            />

            <div className="relative mt-5 overflow-hidden rounded-2xl">
              <img
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                /* The lead image is the LCP element on this page — never lazy. */
                className="aspect-2/1 w-full object-cover"
              />
              {/* The covers are light-heavy stock, so a plain white pill disappeared into
                  the image. A scrim under the bottom strip gives it something to sit on
                  whatever the photo does. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-plum-900/55 to-transparent"
              />
              {/* aria-hidden: the meta row below names the same category, and announcing
                  it twice adds nothing. */}
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] text-plum-900 uppercase shadow-sm"
              >
                {post.category}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full bg-pink-600 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.14em] text-paper uppercase">
                {post.category}
              </span>
              <span className="text-[0.875rem] text-ink-muted">{post.readMinutes} min read</span>
              <span aria-hidden="true" className="text-ink-muted opacity-50">
                ·
              </span>
              <span className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 rounded-full object-cover"
                />
                <span className="text-[0.875rem] font-medium text-plum-900">
                  {post.author.name}
                </span>
              </span>
            </div>

            <h1 className="mt-5">{post.title}</h1>
            <p className="mt-4 text-[1.125rem] text-ink-muted">{post.intro}</p>

            <div className="mt-10 space-y-10">
              <Body />
            </div>

            <hr className="mt-12 border-line" />
            <div className="py-6">
              <ShareArticle slug={post.slug} title={post.title} />
            </div>
            <hr className="border-line" />

            {next && (
              <div className="mt-8 sm:ml-auto sm:max-w-md">
                <NextPost post={next} />
              </div>
            )}
          </article>
        </div>
      </div>

      {post.faqs?.length ? (
        <FaqBlock items={post.faqs} heading="Frequently Asked Questions" />
      ) : null}

      <RelatedLinks links={post.related} />

      <ClosingCta
        heading={post.cta.heading}
        copy={post.cta.copy}
        sourcePage={post.cta.sourcePage}
        whatsappMessage={post.cta.whatsappMessage}
      />
    </>
  );
}
