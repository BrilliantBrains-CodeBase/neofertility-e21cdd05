# Blog content

One module per post. `index.ts` aggregates them; `/blogs/` and the `/$slug` route read
only from there.

## Adding a post

1. Create `src/content/blog/<slug>.tsx` exporting `meta: BlogPostMeta` and `Body()`.
   Copy an existing post as the template — `ivf-treatment-in-bangalore.tsx` is the one
   that shows a `DataTable` and an inline `<Link>` inside prose.
2. Register it in `POSTS` in `index.ts`. Source order is display order (newest first) —
   there are no publish dates on this site, so nothing sorts for you.
3. `category` is free text. The category list, its counts, and the `?category=` slugs are
   all derived from it, so a new value creates a new category and nothing else needs
   editing. Reuse an existing label exactly if the post belongs with them.
4. Add the URL to `public/sitemap.xml` — it is maintained by hand.

## Slugs are frozen

`meta.slug` is the whole URL: posts live at `/<slug>/`, not under `/blog/`. The three
original articles hold search rankings at those paths, which is why the route is a
root-level catch-all. Never rename a published slug. Keep `slug` in sync with the
matching entry in `ROUTES` (`src/data/navigation.ts`).

## Read time

`readMinutes` is derived from the body, not estimated. Recount after a material edit:

```sh
sed -n '/^export function Body/,/^}/p' src/content/blog/<slug>.tsx \
  | sed -e '1,2d' -e 's/{"[^"]*"}/ /g' -e 's/<[^>]*>/ /g' -e 's/[{}();]//g' \
  | tr -s ' \n' ' ' | wc -w
```

(`1,2d` drops the `export function Body() {` / `return (` wrapper so the count is prose
only. Verified to reproduce the three recorded counts exactly.)

Divide by 200 and round, minimum 1. Leave the word count in the trailing comment.

## No dates

`BlogPostMeta` has no `date` field on purpose: the site has never carried publish dates
for these articles, and a fabricated one would end up in the visible byline and in the
`BlogPosting` schema. To add them, add `date` here, render it in `PostCard` and the
article meta row, and pass `datePublished` in `articleSchema` (`src/lib/seo.ts`).
