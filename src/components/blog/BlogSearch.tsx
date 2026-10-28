import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { suggestPosts } from "@/content/blog";
import { withQuery } from "./search";

const LISTBOX_LIMIT = 5;

/**
 * Search box with a suggestion dropdown, built on the ARIA combobox pattern.
 *
 * `filtersList` distinguishes the two places it appears. On /blogs/ the box also narrows
 * the list underneath as you type, so it syncs `?q=` on every keystroke. On an article
 * page there is no list to narrow, and syncing would navigate the reader off the article
 * on their first character — there it stays local until they pick a suggestion or submit.
 */
export function BlogSearch({
  query,
  filtersList = false,
}: {
  query: string;
  filtersList?: boolean;
}) {
  const navigate = useNavigate();
  const id = useId();
  const listboxId = `${id}-listbox`;
  const wrapper = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(query);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  /* Keeps the box honest when the URL changes underneath it — a back/forward step, or
     the empty state's "Show all articles" clearing ?q=. */
  useEffect(() => setValue(query), [query]);

  const suggestions = suggestPosts(value, LISTBOX_LIMIT);
  const showList = open && value.trim().length > 0;

  function change(next: string) {
    setValue(next);
    setOpen(true);
    setActive(-1);
    if (filtersList) {
      /* replace: one history entry for the whole search, not one per keystroke. */
      void navigate({ to: "/blogs/", search: (prev) => withQuery(prev, next), replace: true });
    }
  }

  function openPost(slug: string) {
    setOpen(false);
    void navigate({ to: "/$slug/", params: { slug } });
  }

  function submit() {
    setOpen(false);
    void navigate({ to: "/blogs/", search: (prev) => withQuery(prev, value) });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const picked = suggestions[active];
      if (showList && picked) openPost(picked.slug);
      else submit();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    if (!showList || suggestions.length === 0) return;
    event.preventDefault();
    const delta = event.key === "ArrowDown" ? 1 : -1;
    setActive((prev) => {
      const next = prev + delta;
      if (next < 0) return suggestions.length - 1;
      if (next >= suggestions.length) return 0;
      return next;
    });
  }

  return (
    <div
      ref={wrapper}
      className="relative"
      /* Closes when focus leaves the box and the list together — a plain input onBlur
         would fire before a click on an option could land. */
      onBlur={(event) => {
        if (!wrapper.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-ink-muted"
      />
      <Input
        id={id}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={showList}
        aria-controls={listboxId}
        aria-autocomplete="list"
        {...(active >= 0 && suggestions[active]
          ? { "aria-activedescendant": `${id}-opt-${active}` }
          : {})}
        value={value}
        placeholder="Search articles…"
        onChange={(event) => change(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-10 pl-9"
      />

      {showList && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Article suggestions"
          className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-rail"
        >
          {suggestions.length === 0 ? (
            <li className="px-4 py-3 text-[0.875rem] text-ink-muted">No articles match.</li>
          ) : (
            suggestions.map((post, index) => (
              <li
                key={post.slug}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={index === active}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => openPost(post.slug)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                    index === active ? "bg-pink-50" : "bg-white",
                  )}
                >
                  <img
                    src={post.cover.src}
                    alt={post.cover.alt}
                    aria-hidden="true"
                    width={post.cover.width}
                    height={post.cover.height}
                    loading="lazy"
                    className="size-10 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[0.8125rem] leading-snug font-medium text-plum-900">
                      {post.title}
                    </span>
                    <span className="mt-0.5 block text-[0.6875rem] tracking-[0.12em] text-pink-700 uppercase">
                      {post.category}
                    </span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
