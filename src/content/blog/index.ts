import type { BlogPost } from "./types";
import {
  meta as whenToSeekMeta,
  Body as WhenToSeekBody,
} from "./when-should-a-couple-seek-fertility-treatment";
import { meta as ivfMeta, Body as IvfBody } from "./ivf-treatment-in-bangalore";
import {
  meta as maleInfertilityMeta,
  Body as MaleInfertilityBody,
} from "./male-infertility-causes-diagnosis-and-treatment";

/**
 * Every post, in display order.
 *
 * There are no publish dates on this site, so source order *is* display order — newest
 * goes on top by convention. This order matches what /blogs/ listed before the rebuild.
 *
 * Each post's `slug` must stay in sync with its entry in ROUTES (blogWhenToSeek,
 * blogIvfBangalore, blogMaleInfertility). Nothing links through those constants any more
 * — they stay in the frozen URL map as the record of which paths hold search rankings.
 */
export const POSTS: BlogPost[] = [
  { ...whenToSeekMeta, Body: WhenToSeekBody },
  { ...ivfMeta, Body: IvfBody },
  { ...maleInfertilityMeta, Body: MaleInfertilityBody },
];

export type BlogCategory = { label: string; slug: string; count: number };

/** "Male Fertility" -> "male-fertility". Used only in the ?category= search param. */
export function categorySlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Categories are derived from the posts, never declared up front. A category exists only
 * because a post claims it, so the sidebar can never show an empty one.
 */
export const CATEGORIES: BlogCategory[] = POSTS.reduce<BlogCategory[]>((acc, post) => {
  const existing = acc.find((c) => c.label === post.category);
  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ label: post.category, slug: categorySlug(post.category), count: 1 });
  }
  return acc;
}, []);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug);
}

/**
 * The "Next post" card at the foot of an article: the following post in display order,
 * wrapping to the first so the last article is never a dead end. Returns undefined only
 * when there is a single post.
 */
export function getNextPost(post: BlogPost): BlogPost | undefined {
  if (POSTS.length < 2) return undefined;
  const index = POSTS.findIndex((p) => p.slug === post.slug);
  return POSTS[(index + 1) % POSTS.length];
}

/** Recent-posts rail on an article page, with the article you are reading left out. */
export function getOtherPosts(post: BlogPost, limit = 3): BlogPost[] {
  return POSTS.filter((p) => p.slug !== post.slug).slice(0, limit);
}

/**
 * The one place a search term is matched against a post. The listing's filtered results
 * and the search box's suggestions both go through it, so the dropdown can never propose
 * a post the list would then drop.
 */
export function matchesQuery(post: BlogPost, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(needle);
}

/** Suggestions for the search dropdown. Empty query means no suggestions, not all posts. */
export function suggestPosts(query: string, limit = 5): BlogPost[] {
  if (!query.trim()) return [];
  return POSTS.filter((post) => matchesQuery(post, query)).slice(0, limit);
}

/** Router is configured with trailingSlash: "always", so every post URL carries one. */
export function postPath(slug: string): string {
  return `/${slug}/`;
}

export type { BlogPost, BlogPostMeta } from "./types";
