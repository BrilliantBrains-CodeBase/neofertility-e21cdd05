/**
 * The /blogs search params, and the updaters the chips, sidebar and search box share.
 *
 * Both keys are genuinely optional — that is what keeps `search` optional on every
 * existing `<Link to={ROUTES.blogs}>` in the header and footer. And because the project
 * runs with exactOptionalPropertyTypes, "no filter" has to mean *omitting* the key, not
 * setting it to undefined; hence the destructure-and-drop below rather than a spread.
 */
export type BlogSearch = { category?: string; q?: string };

export function parseBlogSearch(search: { category?: unknown; q?: unknown }): BlogSearch {
  const next: BlogSearch = {};
  if (typeof search.category === "string" && search.category) next.category = search.category;
  if (typeof search.q === "string" && search.q) next.q = search.q;
  return next;
}

/** Set the category filter, or drop it entirely when `slug` is absent. */
export function withCategory(prev: BlogSearch, slug?: string | undefined): BlogSearch {
  const { category: _dropped, ...rest } = prev;
  return slug ? { ...rest, category: slug } : rest;
}

/** Set the search query, or drop it entirely when the box is emptied. */
export function withQuery(prev: BlogSearch, query: string): BlogSearch {
  const { q: _dropped, ...rest } = prev;
  return query ? { ...rest, q: query } : rest;
}
