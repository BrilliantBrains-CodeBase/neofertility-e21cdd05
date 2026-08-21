import type { ComponentType } from "react";
import type { TileLink } from "@/components/sections/blocks";

/**
 * Everything the listing, sidebar and article template need about one post.
 *
 * Deliberately no `date`: the site has never carried publish dates for these articles,
 * and inventing them would put fabricated values into the page and into the BlogPosting
 * schema. Add `date` here (and `datePublished` in articleSchema) once real dates exist.
 */
export type BlogPostMeta = {
  /** URL segment only — no slashes. Frozen once published; these hold search rankings. */
  slug: string;
  title: string;
  /** Card dek on the listing. Two lines at card width. */
  excerpt: string;
  /** Longer standfirst under the article's H1. */
  intro: string;
  /** Free text, e.g. "Male Fertility". The category list is derived from these — see index.ts. */
  category: string;
  /**
   * Derived from the body's word count at 200wpm, not estimated. Recount with the
   * command in src/content/blog/README.md if the body changes materially.
   */
  readMinutes: number;
  author: { name: string; avatar: string };
  cover: { src: string; alt: string; width: number; height: number };
  /** <title> and meta description — these differ from the on-page H1 and excerpt. */
  metaTitle: string;
  metaDescription: string;
  /** Tiles for the RelatedLinks band at the foot of the article. */
  related: TileLink[];
  cta: { heading: string; copy: string; sourcePage: string; whatsappMessage: string };
};

/**
 * A post module is its metadata plus the article body as a component, which is what lets
 * posts keep inline <Link>s and <DataTable>s. A serialisable block union cannot express
 * those without reinventing a renderer.
 */
export type BlogPost = BlogPostMeta & { Body: ComponentType };
