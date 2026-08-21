import { useEffect, useState } from "react";
import { Facebook, Link2, Check } from "lucide-react";
import { SITE_URL } from "@/data/navigation";
import { track } from "@/lib/clinic";

/* lucide dropped its Twitter glyph and has no X mark, so the wordmark is inlined. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const disc =
  "grid size-10 place-items-center rounded-full border border-line text-plum-900 transition-colors hover:border-pink-600 hover:bg-pink-50 hover:text-pink-700";

export function ShareArticle({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/${slug}/`;

  /* Clears the confirmation, and cancels the timer if the reader navigates first. */
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("article_share", { network: "copy_link", slug });
    } catch {
      /* Clipboard is blocked outside a secure context and on some in-app browsers.
         Silently leaving the button inert is better than throwing at the reader. */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="eyebrow">Share this article</p>
      <ul className="flex items-center gap-2.5">
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share "${title}" on Facebook`}
            onClick={() => track("article_share", { network: "facebook", slug })}
            className={disc}
          >
            <Facebook className="size-4" />
          </a>
        </li>
        <li>
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Share "${title}" on X`}
            onClick={() => track("article_share", { network: "x", slug })}
            className={disc}
          >
            <XIcon className="size-4" />
          </a>
        </li>
        <li>
          <button type="button" onClick={copy} className={disc}>
            {copied ? <Check className="size-4 text-success" /> : <Link2 className="size-4" />}
            <span className="sr-only">Copy link to this article</span>
          </button>
        </li>
      </ul>
      {/* Announced rather than shown as a tooltip: the icon swap alone is invisible to a
          screen reader, and role=status keeps it from stealing focus. */}
      <span role="status" aria-live="polite" className="text-[0.8125rem] text-ink-muted">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
